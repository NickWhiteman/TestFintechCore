import { expect } from 'chai';
import { NumberCoderBase26 } from '../../src/NumberCoder/NumberCoder.js';

describe('NumberCoder.js', () => {
  it('should encode sequential numbers correctly', () => {
    const pairs = [
      { number: 1, expected: 'AAAAAD' },
      { number: 2, expected: 'AAAAAH' },
      { number: 3, expected: 'AAAAAK' },
    ];

    pairs.forEach(({ number, expected }) => {
      expect(NumberCoderBase26.encode(number)).to.equal(expected);
    });
  });

  it('should handle boundary value 135487', () => {
    const encoded = NumberCoderBase26.encode(135487);
    const decoded = NumberCoderBase26.decode(encoded);
    expect(encoded).to.equal('ABCDEF');
    expect(decoded).to.equal(135487);
  });

  it('should preserve leading A characters', () => {
    const smallNumber = 10;
    const encoded = NumberCoderBase26.encode(smallNumber);
    expect(encoded.startsWith('AAAA')).to.be.true;
  });

  it('should handle maximum allowed value', () => {
    const maxValue = Math.pow(26, 6) - 1;
    const encoded = NumberCoderBase26.encode(maxValue);
    expect(encoded).to.have.lengthOf(6);
    expect(encoded).to.match(/^[A-Z]{6}$/);
  });

  it('should throw error for negative numbers', () => {
    expect(() => NumberCoderBase26.encode(-1)).to.throw('Number must be non-negative integer');
  });

  it('should throw error for invalid code characters', () => {
    expect(() => NumberCoderBase26.decode('ABC123')).to.throw('Code must be 6 uppercase letters A-Z');
  });

  it('should throw error for incorrect code length', () => {
    expect(() => NumberCoderBase26.decode('ABCDE')).to.throw('Code must be 6 uppercase letters A-Z');
    expect(() => NumberCoderBase26.decode('ABCDEFG')).to.throw('Code must be 6 uppercase letters A-Z');
  });

  it('should throw error for non-string code input', () => {
    expect(() => NumberCoderBase26.decode(123 as any)).to.throw('Code must be 6 uppercase letters A-Z');
    expect(() => NumberCoderBase26.decode(null as any)).to.throw('Code must be 6 uppercase letters A-Z');
    expect(() => NumberCoderBase26.decode(undefined as any)).to.throw('Code must be 6 uppercase letters A-Z');
  });
});
