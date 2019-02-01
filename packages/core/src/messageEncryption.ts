import { createCipher, createDecipher } from 'browserify-cipher';
import createECDH from 'create-ecdh';
const AES256 = 'aes256';
const UTF8 = 'utf8';
const HEX = 'hex';

export default class MessageEncryption {

  private ec = createECDH('secp256k1');
  private key = this.ec.generateKeys();
  private shared;
  private nonceMap = {};

  getPublicKey() {
    return this.key;
  }

  setSharedKey(key) {
    this.shared = this.ec.computeSecret(key);
  }

  hasSharedKey(): boolean {
    return Boolean(this.shared);
  }

  encrypt(message: string): string {
    const data = {
      message,
      nonce: Date.now() + Math.floor(Math.random() * 100000000000000000),
    };
    const cipher = createCipher(AES256, this.shared);
    return cipher.update(JSON.stringify(data), UTF8, HEX) + cipher.final(HEX);
  }

  decrypt(input: string): {message, error?: string} {
      try {
        const decipher = createDecipher(AES256, this.shared);
        const data = JSON.parse(decipher.update(input, HEX, UTF8) + decipher.final(UTF8));
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
