import { expect } from 'chai';
import { NumberCoderBase36 } from '../../src/NumberCoder/NumberCoder.js';

describe('NumberCoder.js', () => {
  describe('general finction', () => {
    it('should encode sequential numbers correctly', () => {
      const pairs = [
        { number: 1, expected: 'AAAAAN' },
        { number: 2, expected: 'AAAAA0' },
        { number: 3, expected: 'AAAABD' },
      ];

      pairs.forEach(({ number, expected }) => {
        expect(NumberCoderBase36.encode(number)).to.equal(expected);
      });
    });

    it('should handle boundary value 135487', () => {
      const encoded = NumberCoderBase36.encode(135487);
      const decoded = NumberCoderBase36.decode(encoded);
      expect(encoded).to.equal('ABCDEF');
      expect(decoded).to.equal(135487);
    });

    it('should preserve leading A characters', () => {
      const smallNumber = 10;
      const encoded = NumberCoderBase36.encode(smallNumber);
      expect(encoded.startsWith('AAAA')).to.be.true;
    });

    it('should handle maximum allowed value', () => {
      const maxValue = Math.pow(26, 6) - 1;
      const encoded = NumberCoderBase36.encode(maxValue);
      expect(encoded).to.have.lengthOf(6);
      expect(encoded).to.match(/^[A-Z0-9]{6}$/);
    });

    it('should throw error for negative numbers', () => {
      expect(() => NumberCoderBase36.encode(-1)).to.throw('Number must be non-negative integer');
    });
  });

  describe('encode validation', () => {
    it('should throw error for negative numbers', () => {
      expect(() => NumberCoderBase36.encode(-1)).to.throw('Number must be non-negative integer.');
    });

    it('should throw error for non-integer numbers', () => {
      expect(() => NumberCoderBase36.encode(1.5)).to.throw('Number must be non-negative integer.');
    });

    it('should throw error for too large numbers', () => {
      const maxValue = Math.pow(36, 6);
      expect(() => NumberCoderBase36.encode(maxValue + 1)).to.throw(`Number must not exceed ${maxValue}`);
    });
  });

  describe('decode validation', () => {
    it('should throw error for non-string input', () => {
      expect(() => NumberCoderBase36.decode(123 as any)).to.throw('Code must be a string.');
    });

    it('should throw error for invalid length', () => {
      expect(() => NumberCoderBase36.decode('ABC')).to.throw('Code length must be 6 characters.');
    });

    it('should throw error for invalid characters', () => {
      expect(() => NumberCoderBase36.decode('ABC#EF')).to.throw(
        'Code must contain only uppercase letters A-Z and numbers 0-9.',
      );
    });
  });

  describe('isValidCode', () => {
    it('should return true for valid codes', () => {
      expect(NumberCoderBase36.isValidCode('ABC123')).to.be.true;
      expect(NumberCoderBase36.isValidCode('123456')).to.be.true;
      expect(NumberCoderBase36.isValidCode('ABCDEF')).to.be.true;
    });

    it('should return false for invalid codes', () => {
      expect(NumberCoderBase36.isValidCode('abc123')).to.be.false;
      expect(NumberCoderBase36.isValidCode('ABC12')).to.be.false;
      expect(NumberCoderBase36.isValidCode('ABC#EF')).to.be.false;
    });
  });
});

