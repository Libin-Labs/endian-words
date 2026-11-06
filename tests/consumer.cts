import { encodeWords, decodeWords } from '@lp-labs/endian-words';
if (decodeWords(encodeWords([0x1234], 16), 16)[0] !== 0x1234) throw new Error('Endian');
// @ts-expect-error invalid argument must be rejected by declarations
encodeWords(['1'], 16);
