# @lp-labs/endian-words

Explicit endian unsigned16/32bit word serialization.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/endian-words
```

## Working example

```js
import { encodeWords, decodeWords } from '@lp-labs/endian-words';
if (decodeWords(encodeWords([0x1234], 16), 16)[0] !== 0x1234) throw new Error('Endian');
```

CommonJS: `const api = require('@lp-labs/endian-words')`.

## Behavior, customization and limits

encodeWords(values,width,littleEndian=false) uses width16 or32 and nonnegative safe integer words in range; up to262144 words,total bytes<=1048576. decodeWords accepts Uint8Array<=1048576,aligned length,width16/32,strict Boolean endian. Returns number[] and fresh bytes via DataView. O(n)time/storage. No floats,signed words,struct padding or host-endian inference.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function encodeWords(
  values: readonly number[],
  width: 16 | 32,
  littleEndian?: boolean,
): Uint8Array;
export declare function decodeWords(
  input: Uint8Array,
  width: 16 | 32,
  littleEndian?: boolean,
): number[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
