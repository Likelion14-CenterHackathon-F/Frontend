const MAX_PAYLOAD_SIZE = 32_768;
const EMPTY = new Uint8Array();
type Field = { number: number; value: bigint | Uint8Array };

export interface DecodedCaption {
  sentenceId: string;
  sequenceNumber: number;
  speakerAgoraUid: number;
  sourceLanguage?: string;
  sourceText?: string;
  sourceFinal?: boolean;
  targetLanguage?: string;
  translatedText?: string;
  translationFinal?: boolean;
  textTimestamp?: number;
  durationMs?: number;
}

function varint(bytes: Uint8Array, start: number) {
  let value = 0n;
  let shift = 0n;
  let offset = start;
  while (offset < bytes.length && shift <= 63n) {
    const byte = bytes[offset++];
    value |= BigInt(byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) return { value, offset };
    shift += 7n;
  }
  throw new Error("Invalid protobuf varint");
}

function fields(bytes: Uint8Array) {
  const result: Field[] = [];
  let offset = 0;
  while (offset < bytes.length) {
    const tag = varint(bytes, offset);
    offset = tag.offset;
    const numericTag = Number(tag.value);
    const number = Math.floor(numericTag / 8);
    const wire = numericTag & 7;
    if (wire === 0) {
      const item = varint(bytes, offset);
      result.push({ number, value: item.value });
      offset = item.offset;
    } else if (wire === 2) {
      const item = varint(bytes, offset);
      const length = Number(item.value);
      offset = item.offset;
      const end = offset + length;
      if (length > MAX_PAYLOAD_SIZE || end > bytes.length) {
        throw new Error("Invalid protobuf length");
      }
      result.push({ number, value: bytes.subarray(offset, end) });
      offset = end;
    } else if (wire === 1) offset += 8;
    else if (wire === 5) offset += 4;
    else throw new Error("Unsupported protobuf wire type");
  }
  return result;
}

const find = (items: Field[], number: number) =>
  items.find((item) => item.number === number)?.value;
const bytes = (value?: bigint | Uint8Array) =>
  value instanceof Uint8Array ? value : EMPTY;
const text = (value?: bigint | Uint8Array) =>
  new TextDecoder().decode(bytes(value));
const integer = (value?: bigint | Uint8Array) =>
  typeof value === "bigint" && value <= BigInt(Number.MAX_SAFE_INTEGER)
    ? Number(value)
    : undefined;

export function decodeSttMessage(
  payload: Uint8Array,
  language: string,
): DecodedCaption | null {
  if (payload.byteLength > MAX_PAYLOAD_SIZE) return null;

  try {
    const root = fields(payload);
    const sourceLanguageField = find(root, 12);

    if (import.meta.env.DEV) {
      console.info("[STT][Agora 원본 Protobuf]", {
        payload,
        payloadSize: payload.byteLength,
        rootFields: root.map((field) => ({
          fieldNumber: field.number,
          valueType:
            field.value instanceof Uint8Array ? "bytes" : "varint",
          value:
            field.value instanceof Uint8Array
              ? field.value
              : field.value.toString(),
        })),
        field12: {
          received: sourceLanguageField !== undefined,
          rawValue:
            sourceLanguageField instanceof Uint8Array
              ? sourceLanguageField
              : sourceLanguageField?.toString(),
          decodedText: text(sourceLanguageField),
        },
        messageType: text(find(root, 13)),
      });
    }

    const sentenceValue = find(root, 19);
    if (typeof sentenceValue !== "bigint") return null;

    const common = {
      sentenceId: sentenceValue.toString(),
      sequenceNumber: integer(find(root, 3)) ?? 0,
      speakerAgoraUid: integer(find(root, 4)) ?? 0,
      textTimestamp: integer(find(root, 18)),
      durationMs: integer(find(root, 15)),
    };

    if (text(find(root, 13)) === "translate") {
      const translations = root
        .filter((item) => item.number === 14)
        .map((item) => {
          const nested = fields(bytes(item.value));
          return {
            language: text(find(nested, 2)),
            value: nested
              .filter((part) => part.number === 3)
              .map((part) => text(part.value))
              .join(""),
            final: find(nested, 1) === 1n,
          };
        });
      const selected =
        translations.find(
          (item) => item.language.toLowerCase() === language.toLowerCase(),
        ) ?? translations[0];
      return selected?.value
        ? {
            ...common,
            targetLanguage: selected.language,
            translatedText: selected.value,
            translationFinal: selected.final,
          }
        : null;
    }

    const words = root
      .filter((item) => item.number === 10)
      .map((item) => fields(bytes(item.value)));
    const sourceText = words
      .map((word) => text(find(word, 1)))
      .join("");

    return sourceText
      ? {
          ...common,
          sourceLanguage: text(find(root, 12)),
          sourceText,
          sourceFinal:
            find(root, 11) === 1n ||
            (words.length > 0 &&
              words.every((word) => find(word, 4) === 1n)),
        }
      : null;
  } catch (error) {
    console.warn("Agora STT message decode failed", error);
    return null;
  }
}
