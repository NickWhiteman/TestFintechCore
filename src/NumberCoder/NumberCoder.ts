export class NumberCoderBase36 {
  private static readonly alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private static readonly codeLength: number = 6;
  private static readonly delta: number = 13.115391144537853;

  public static encode(number: number): string {
    if (!Number.isInteger(number) || number < 0) {
      throw new Error('Number must be non-negative integer.');
    }

    this.validateNumber(number);

    let normalizedNumber = Math.floor(number * this.delta);
    let code: string = '';

    while (normalizedNumber > 0) {
      const remainder: number = normalizedNumber % 36;
      code = this.alphabet[remainder] + code;
      normalizedNumber = Math.floor(normalizedNumber / 36);
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
    this.validateCode(code);

    let number: number = 0;

    for (let i = 0; i < code.length; i++) {
      const char: string = code[i];
      const value: number = this.alphabet.indexOf(char);
      number = number * 36 + value;
    }

    return Math.round(number / this.delta);
  }

  private static validateNumber(number: number): void {
    if (!Number.isInteger(number) || number < 0) {
      throw new Error('Number must be non-negative integer.');
    }

    const maxValue = Math.pow(36, this.codeLength);
    if (number > maxValue) {
      throw new Error(`Number must not exceed ${maxValue}`);
    }
  }

  private static validateCode(code: string): void {
    if (typeof code !== 'string') {
      throw new Error('Code must be a string.');
    }

    if (code.length !== this.codeLength) {
      throw new Error(`Code length must be ${this.codeLength} characters.`);
    }

    if (!/^[A-Z0-9]+$/.test(code)) {
      throw new Error('Code must contain only uppercase letters A-Z and numbers 0-9.');
    }

    const invalidChars = [...code].filter((char) => !this.alphabet.includes(char));
    if (invalidChars.length > 0) {
      throw new Error(`Invalid characters in code: ${invalidChars.join(', ')}`);
    }
  }

  public static isValidCode(code: string): boolean {
    try {
      this.validateCode(code);
      return true;
    } catch {
      return false;
    }
  }
}
