const MAX_PAYLOAD_SIZE = 32_768;
const EMPTY = new Uint8Array();
type Field = { number: number; value: bigint | Uint8Array };

export interface DecodedCaption {
  sentenceId: string;
  text: string;
  isFinal: boolean;
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
      if (length > MAX_PAYLOAD_SIZE || end > bytes.length) throw new Error("Invalid protobuf length");
      result.push({ number, value: bytes.subarray(offset, end) });
      offset = end;
    } else if (wire === 1) offset += 8;
    else if (wire === 5) offset += 4;
    else throw new Error("Unsupported protobuf wire type");
  }
  return result;
}

const find = (items: Field[], number: number) => items.find((item) => item.number === number)?.value;
const bytes = (value?: bigint | Uint8Array) => value instanceof Uint8Array ? value : EMPTY;
const text = (value?: bigint | Uint8Array) => new TextDecoder().decode(bytes(value));

export function decodeSttMessage(payload: Uint8Array, language: string): DecodedCaption | null {
  if (payload.byteLength > MAX_PAYLOAD_SIZE) return null;
  try {
    const root = fields(payload);
    const sentenceValue = find(root, 19);
    const sentenceId = typeof sentenceValue === "bigint" ? sentenceValue.toString() : "0";
    if (text(find(root, 13)) === "translate") {
      const translations = root.filter((item) => item.number === 14).map((item) => {
        const nested = fields(bytes(item.value));
        return {
          language: text(find(nested, 2)),
          value: nested.filter((part) => part.number === 3).map((part) => text(part.value)).join(""),
          final: find(nested, 1) === 1n,
        };
      });
      const selected = translations.find((item) => item.language.toLowerCase() === language.toLowerCase()) ?? translations[0];
      return selected?.value ? { sentenceId, text: selected.value, isFinal: selected.final } : null;
    }
    const words = root.filter((item) => item.number === 10).map((item) => fields(bytes(item.value)));
    const value = words.map((word) => text(find(word, 1))).join("");
    return value ? { sentenceId, text: value, isFinal: words.length > 0 && words.every((word) => find(word, 4) === 1n) } : null;
  } catch (error) {
    console.warn("Agora STT message decode failed", error);
    return null;
  }
}
