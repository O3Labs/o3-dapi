import { Buffer } from 'buffer';
import { randomFillSync } from 'randomfill';
import { createCipheriv, createDecipheriv } from 'browserify-cipher';
import createECDH from 'create-ecdh';
import createHmac from 'create-hmac';
const AES256 = 'aes256';
const SHA256 = 'sha256';
const UTF8 = 'utf8';
const HEX = 'hex';

export default class MessageEncryption {

  private ec = createECDH('secp256k1');
  private key = this.ec.generateKeys();
  private senderKey;
  private shared;
  private nonceMap = {};

  getPublicKey() {
    return this.key;
  }

  setSharedKey(key) {
    this.senderKey = key;
    this.shared = this.ec.computeSecret(key);
  }

  hasSharedKey(): boolean {
    return Boolean(this.shared);
  }

  encrypt(message: string): [string, string] {
    const data = {
      message,
      nonce: Date.now() + Math.floor(Math.random() * 100000000000000000),
    };
    const iv = Buffer.alloc(16);
    randomFillSync(iv);
    const cipher = createCipheriv(AES256, this.shared, iv);
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), UTF8), cipher.final()]);
    const dataToMac = Buffer.concat([iv, this.key, encrypted]);
    const mac = createHmac(SHA256, this.shared).update(dataToMac).digest(HEX);
    return [`${iv.toString(HEX)}:${encrypted.toString(HEX)}`, mac];
  }

  decrypt(input: string, mac?: string): {message, error?: string} {
    try {
      const textParts = input.split(':');
      const iv = Buffer.from(textParts.shift(), HEX);
      const encryptedText = Buffer.from(textParts.join(':'), HEX);

      if (mac) {
        const dataToMac = Buffer.concat([iv, this.senderKey, encryptedText]);
        const realMac = createHmac(SHA256, this.shared).update(dataToMac).digest(HEX);
        if (realMac !== mac) {
          return {
            message: input,
            error: 'Encrypted message didn\'t pass authenticity check.',
          };
        }
      }

      const decipher = createDecipheriv(AES256, this.shared, iv);
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
}
