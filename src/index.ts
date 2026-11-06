function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function bytes(v: Uint8Array, max = 1048576): void {
  if (!(v instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (v.length > max) throw new RangeError('Byte budget exceeded');
}
function config(width: 16 | 32, littleEndian: boolean): number {
  if (width !== 16 && width !== 32) throw new RangeError('Width16 or32 required');
  if (typeof littleEndian !== 'boolean') throw new TypeError('Expected endian Boolean');
  return width / 8;
}
export function encodeWords(
  values: readonly number[],
  width: 16 | 32,
  littleEndian = false,
): Uint8Array {
  const size = config(width, littleEndian);
  if (!Array.isArray(values) || values.length > 262144 || values.length * size > 1048576)
    throw new RangeError('Word budget');
  const out = new Uint8Array(values.length * size),
    view = new DataView(out.buffer);
  for (let i = 0; i < values.length; i++) {
    integer(values[i]!, 0, width === 16 ? 65535 : 4294967295);
    if (width === 16) view.setUint16(i * size, values[i]!, littleEndian);
    else view.setUint32(i * size, values[i]!, littleEndian);
  }
  return out;
}
export function decodeWords(input: Uint8Array, width: 16 | 32, littleEndian = false): number[] {
  const size = config(width, littleEndian);
  bytes(input);
  if (input.length % size) throw new RangeError('Aligned words required');
  const view = new DataView(input.buffer, input.byteOffset, input.byteLength),
    out: number[] = [];
  for (let i = 0; i < input.length; i += size)
    out.push(width === 16 ? view.getUint16(i, littleEndian) : view.getUint32(i, littleEndian));
  return out;
}
