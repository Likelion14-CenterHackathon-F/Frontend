import { useState } from "react";

import SplashStep from "./components/SplashStep";

function SplashPreviewPage() {
  const [replayKey, setReplayKey] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const replay = () => setReplayKey((key) => key + 1);

  return (
    <div className="relative min-h-dvh">
      <SplashStep
        key={replayKey}
        forceMotion
        onFinish={() => {
          if (isLooping) replay();
        }}
      />

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={replay}
            className="cursor-pointer rounded-full bg-[#473787] px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95"
          >
            다시 재생
          </button>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#473787]">
            <input
              type="checkbox"
              checked={isLooping}
              onChange={(event) => setIsLooping(event.target.checked)}
              className="size-4 accent-[#473787]"
            />
            자동 반복
          </label>
        </div>
      </div>
    </div>
  );
}

export default SplashPreviewPage;
