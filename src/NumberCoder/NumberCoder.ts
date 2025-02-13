export class NumberCoderBase26 {
  private static readonly alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly codeLength: number = 6;
  //
  private static readonly delta: number = 3.6480621757068943;

  public static encode(number: number): string {
    if (!Number.isInteger(number) || number < 0) {
      throw new Error('Number must be non-negative integer.');
    }

    let normalizedNumber = Math.floor(number * this.delta);
    let code: string = '';

    while (normalizedNumber > 0) {
      const remainder: number = normalizedNumber % 26;
      code = this.alphabet[remainder] + code;
      normalizedNumber = Math.floor(normalizedNumber / 26);
    }

    while (code.length < this.codeLength) {
      code = 'A' + code;
    }

    if (code.length > this.codeLength) {
      code = code.slice(-this.codeLength);
    }

    return code;
  }

  public static decode(code: string): number {
    if (typeof code !== 'string' || code.length !== this.codeLength || !/^[A-Z]+$/.test(code)) {
      throw new Error('Code must be 6 uppercase letters A-Z.');
    }

    let number: number = 0;

    for (let i = 0; i < code.length; i++) {
      const char: string = code[i];
      const value: number = this.alphabet.indexOf(char);
      number = number * 26 + value;
    }

    return Math.round(number / this.delta);
  }
}
