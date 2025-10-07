import CryptoJS from "crypto-js";

export function encrypt(text: string, key: string) {
  const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
  return ciphertext;
}

export function decrypt(ciphertext: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
