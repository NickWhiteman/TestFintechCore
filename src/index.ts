import { NumberCoderBase36 } from './NumberCoder/NumberCoder.js';

try {
  const number: number = 135_487;
  const code: string = NumberCoderBase36.encode(number);
  console.log(code);

  const decodedNumber: number = NumberCoderBase36.decode(code);
  console.log(decodedNumber);
} catch (error) {
  console.error((error as Error).message);
}
