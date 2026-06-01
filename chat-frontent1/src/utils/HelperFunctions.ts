import moment from "moment";
import type { Message } from "./types/Types";

export function debounce(func: any, delay: number) {
  let timer: any;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function safeJSONParse<T>(value: T, fallback: {} | [] | null) {
  try {
    if (Array.isArray(value)) return value;
    if (typeof value == "object") return value;

    return JSON.parse(value as string);
  } catch {
    return fallback;
  }
}

export function SortGivenMessageData(
  MessageData: Message[],
  isDescending = true,
) {
  if (!MessageData || !Array.isArray(MessageData)) return MessageData ?? [];
  if (isDescending)
    return [...MessageData].sort((a, b) =>
      moment(a?.created_at).diff(moment(b?.created_at)),
    );
  return [...MessageData].sort((a, b) =>
    moment(b?.created_at).diff(moment(a?.created_at)),
  );
}

export function EncodeStringToBuffer(message: string): ArrayBuffer | null {
  try {
    if (!message) return null;
    const encoder = new TextEncoder();
    const EncodedMessage = encoder.encode(message);
    return EncodedMessage.buffer;
  } catch (e) {
    console.error("Error in EncodeStringToBuffer " + e);
    return null;
  }
}

export async function CryptoKeyToBuffer(
  key: CryptoKey,
): Promise<ArrayBuffer | null> {
  if (!key) return null;
  return await crypto.subtle.exportKey("raw", key);
}

export function DecodeBufferToString(buffer: ArrayBuffer): string | null {
  try {
    if (!buffer) return null;
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(buffer);
  } catch (e) {
    console.error("Error in DecodeBufferToString " + e);
    return null;
  }
}

export async function generatePrivateAndPublicKeyPair() {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      false, // extractable = false
      ["encrypt", "decrypt"],
    );

    if (!keyPair) {
      throw "Unable to Create New Private Key";
    }

    return keyPair;
  } catch (e) {
    console.error("Error in generatePrivateKey " + e);
    return null;
  }
}

export async function storePrivateAndPublicKeyPair(keyPair: CryptoKeyPair) {
  try {
    const request = indexedDB.open("crypto-db", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("keys");
    };

    request.onsuccess = async () => {
      const db = request.result;

      const tx = db.transaction("keys", "readwrite");
      const store = tx.objectStore("keys");

      await store.put(keyPair.privateKey, "privateKey");
      await store.put(keyPair.publicKey, "publicKey");

      console.log("Keys stored");
      return true;
    };
  } catch (e) {
    console.error("Error in storePrivateAndPublicKeyPair " + e);
    return false;
  }
}

export async function getPrivateKey(): Promise<any | null> {
  try {
    const request = indexedDB.open("crypto-db", 1);

    request.onsuccess = async () => {
      const db = request.result;

      const tx = db.transaction("keys", "readonly");
      const store = tx.objectStore("keys");

      const getReq = store.get("privateKey");

      getReq.onsuccess = async () => {
        const privateKey = getReq.result;
        return privateKey;
      };
      getReq.onerror = () => {
        throw "Not able to Get Private Key";
      };
    };

    request.onerror = () => {
      throw "Not able to Get Private Key";
    };
  } catch (e) {
    console.error("Error in getPrivateKey " + e);
    return null;
  }
}

export async function getPublicKey(): Promise<any | null> {
  try {
    const request = indexedDB.open("crypto-db", 1);

    request.onsuccess = async () => {
      const db = request.result;

      const tx = db.transaction("keys", "readonly");
      const store = tx.objectStore("keys");

      const getReq = store.get("publicKey");

      getReq.onsuccess = async () => {
        const publicKey = getReq.result;
        return publicKey;
      };
      getReq.onerror = () => {
        throw "Not able to Get publicKey Key";
      };
    };

    request.onerror = () => {
      throw "Not able to Get publicKey Key";
    };
  } catch (e) {
    console.error("Error in getPublicKey " + e);
    return null;
  }
}

export async function generateSymmetricKeyAndEncryptMessage(
  message: string,
): Promise<{ encryptedMessage: string; encryptKey: CryptoKey } | null> {
  try {
    if (!message) return null;
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const symmetricKeyGenerated = await window.crypto.subtle.generateKey(
      {
        name: "HMAC",
        hash: { name: "SHA-512" },
      },
      true,
      ["sign", "verify"],
    );

    const EncryptedMessage = await window.crypto.subtle.encrypt(
      "RsaOaepParams",
      symmetricKeyGenerated,
      data,
    );

    const EncryptedString = DecodeBufferToString(EncryptedMessage);

    if (!EncryptedString) {
      throw "Unable to Decode Encrypted Message";
    }

    return {
      encryptedMessage: EncryptedString,
      encryptKey: symmetricKeyGenerated,
    };
  } catch (e) {
    console.error("Error in generateSymmetricKeyAndEncryptMessage " + e);
    return null;
  }
}

export async function encryptSymmetricKeyWithPublicKey(
  symmetricKey: CryptoKey,
  publicKey: CryptoKey,
) {
  try {
    if (!symmetricKey) {
      throw "No Symmetric Key to Encrypt";
    }

    if (!publicKey) {
      throw "No Public Key to Encrypt";
    }

    const SymmetricKeyBuffer = await CryptoKeyToBuffer(symmetricKey);
    if (!SymmetricKeyBuffer) {
      throw "Unable to Encode Crypto Key";
    }
    const EncrpytedSymmetricKey = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      SymmetricKeyBuffer,
    );

    return DecodeBufferToString(EncrpytedSymmetricKey);
  } catch (e) {
    console.error("Error in encryptSymmetricKeyWithPublicKey " + e);
    return null;
  }
}

export async function ConvertStringToPublicKey(key:string | undefined | null){
  try{
    if(!key) return null;
    // const encoded = new TextEncoder().encode(key);
    const encoded = await EncodeStringToBuffer(key);

    if(!encoded) return null;

      return crypto.subtle.importKey(
        "raw",
        encoded,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
      );
  }catch(e){
    console.error("Error in ConvertStringToPublicKey " + e);
    return null;
  }
}
