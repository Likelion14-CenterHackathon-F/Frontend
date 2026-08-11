// src/hooks/useConsultationMedia.ts

import { useEffect, useRef, useState } from 'react';
import i18n from '@/i18n';

export type FacingMode = 'user' | 'environment';

export function useConsultationMedia() {
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceFrameRef = useRef<number | null>(null);

  const cameraOnRef = useRef(true);
  const microphoneOnRef = useRef(true);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [microphoneOn, setMicrophoneOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [facingMode, setFacingMode] = useState<FacingMode>('user');

  useEffect(() => {
    let cancelled = false;
    let previousSpeakingState = false;

    async function startMedia() {
      setIsLoading(true);
      setErrorMessage('');
      setIsSpeaking(false);
      setStream(null);

      stopCurrentMedia();

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(i18n.t('mediaError.unsupported', { ns: 'consultationWaiting' }));
        }

        const nextStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: facingMode,
            },
            width: {
              ideal: 720,
            },
            height: {
              ideal: 960,
            },
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        if (cancelled) {
          nextStream.getTracks().forEach((track) => {
            track.stop();
          });

          return;
        }

        nextStream.getVideoTracks().forEach((track) => {
          track.enabled = cameraOnRef.current;
        });

        nextStream.getAudioTracks().forEach((track) => {
          track.enabled = microphoneOnRef.current;
        });

        streamRef.current = nextStream;
        setStream(nextStream);
        setIsLoading(false);

        startVoiceDetection(nextStream);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setIsLoading(false);
        setErrorMessage(getMediaErrorMessage(error));
      }
    }

    function startVoiceDetection(mediaStream: MediaStream) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(mediaStream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;

      const samples = new Uint8Array(analyser.fftSize);

      source.connect(analyser);
      audioContextRef.current = audioContext;

      void audioContext.resume();

      function detectVoice() {
        if (cancelled) {
          return;
        }

        analyser.getByteTimeDomainData(samples);

        let sum = 0;

        for (const sample of samples) {
          const normalized = (sample - 128) / 128;
          sum += normalized * normalized;
        }

        const rms = Math.sqrt(sum / samples.length);

        const nextSpeakingState = microphoneOnRef.current && rms > 0.03;

        if (nextSpeakingState !== previousSpeakingState) {
          previousSpeakingState = nextSpeakingState;
          setIsSpeaking(nextSpeakingState);
        }

        voiceFrameRef.current = requestAnimationFrame(detectVoice);
      }

      detectVoice();
    }

    function stopCurrentMedia() {
      if (voiceFrameRef.current !== null) {
        cancelAnimationFrame(voiceFrameRef.current);

        voiceFrameRef.current = null;
      }

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;

      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    }

    void startMedia();

    return () => {
      cancelled = true;
      stopCurrentMedia();
    };
  }, [facingMode]);

  function toggleCamera() {
    const nextValue = !cameraOnRef.current;

    streamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = nextValue;
    });

    cameraOnRef.current = nextValue;
    setCameraOn(nextValue);
  }

  function toggleMicrophone() {
    const nextValue = !microphoneOnRef.current;

    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = nextValue;
    });

    microphoneOnRef.current = nextValue;
    setMicrophoneOn(nextValue);

    if (!nextValue) {
      setIsSpeaking(false);
    }
  }

  function switchCamera() {
    setFacingMode((current) => (current === 'user' ? 'environment' : 'user'));
  }

  return {
    stream,
    cameraOn,
    microphoneOn,
    isSpeaking,
    isLoading,
    errorMessage,
    facingMode,
    toggleCamera,
    toggleMicrophone,
    switchCamera,
  };
}

function getMediaErrorMessage(error: unknown) {
  if (!(error instanceof DOMException)) {
    return i18n.t('mediaError.unavailable', { ns: 'consultationWaiting' });
  }

  switch (error.name) {
    case 'NotAllowedError':
      return i18n.t('mediaError.permissionDenied', { ns: 'consultationWaiting' });

    case 'NotFoundError':
      return i18n.t('mediaError.deviceNotFound', { ns: 'consultationWaiting' });

    case 'NotReadableError':
      return i18n.t('mediaError.deviceInUse', { ns: 'consultationWaiting' });

    case 'OverconstrainedError':
      return i18n.t('mediaError.unsupportedSettings', { ns: 'consultationWaiting' });

    default:
      return i18n.t('mediaError.startFailed', { ns: 'consultationWaiting' });
  }
}
