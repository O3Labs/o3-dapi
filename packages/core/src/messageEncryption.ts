import { Buffer } from 'buffer';
import { randomFillSync } from 'randomfill';
import { createCipheriv, createDecipheriv } from 'browserify-cipher';
import createECDH from 'create-ecdh';
const AES256 = 'aes256';
const UTF8 = 'utf8';
const HEX = 'hex';
export const AES128GCM = 'aes-128-gcm';

export default class MessageEncryption {

  private ec = createECDH('secp256k1');
  private key = this.ec.generateKeys();
  private shared;
  private nonceMap = {};
  private cipherAlgorithm = AES256;

  getPublicKey() {
    return this.key;
  }

  setSharedKey(key) {
    this.shared = this.ec.computeSecret(key);
  }

  hasSharedKey(): boolean {
    return Boolean(this.shared);
  }

  encrypt(message: string): string|any {
    const data = {
      message,
      nonce: Date.now() + Math.floor(Math.random() * 100000000000000000),
    };
    const iv = Buffer.alloc(16);
    randomFillSync(iv);
    const cipher = createCipheriv(this.cipherAlgorithm, this._getSharedKey(), iv);
    const encrypted = cipher.update(JSON.stringify(data), UTF8, HEX) + cipher.final(HEX);

    if (this.cipherAlgorithm === AES256) {
      return `${iv.toString(HEX)}:${encrypted.toString()}`;
    } else {
      return {
        iv: iv.toString(HEX),
        encrypted: encrypted.toString(),
        authTag: cipher.getAuthTag().toString(HEX),
      };
    }
  }

  decrypt(input: string|any): {message, error?: string} {
    try {
      let iv;
      let encryptedText;
      let authTag;
      if (this.cipherAlgorithm === AES256) {
        const textParts = input.split(':');
        iv = Buffer.from(textParts.shift(), HEX);
        encryptedText = Buffer.from(textParts.join(':'), HEX);
      } else {
        iv = Buffer.from(input.iv, HEX);
        encryptedText = Buffer.from(input.encrypted, HEX);
        authTag = Buffer.from(input.authTag, HEX);
      }
      const decipher = createDecipheriv(this.cipherAlgorithm, this._getSharedKey(), iv);
      authTag && decipher.setAuthTag(authTag);
      const data = JSON.parse(decipher.update(encryptedText, HEX, UTF8) + decipher.final(UTF8));

      if (!data || !data.nonce || this.nonceMap[data.nonce]) {
        return {
          message: data.message,
          error: 'Nonce from provider was already used, message invalid.',
        };
      }

      this.nonceMap[data.nonce] = true;
      return { message: data.message };
    } catch (err) {
      return {
        message: input,
        error: 'There was an error decrypting the message.',
      };
    }
  }

  setCipherAlgorithOverride(algorithm: string) {
    this.cipherAlgorithm = algorithm;
  }

  private _getSharedKey() {
    if (this.cipherAlgorithm === AES128GCM) {
      return this.shared.slice(0, 16);
    }
    return this.shared;
  }
}
