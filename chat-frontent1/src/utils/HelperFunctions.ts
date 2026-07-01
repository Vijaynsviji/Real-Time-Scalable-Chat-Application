import moment from "moment";
import type { Message } from "./types/Types";
import type { CurrentUser } from "../store/slicers/users";

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

export async function CryptoKeyToBuffer(
  key: CryptoKey,
): Promise<ArrayBuffer | null> {
  if (!key) return null;
  return await crypto.subtle.exportKey("raw", key);
}


export function ConvertBufferToBase64String(buffer: ArrayBuffer | Uint8Array | null): string | null{
  try{

    if(!buffer) return null;

    const convertedDataBasedOnUintCondition = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

    return btoa(
      String.fromCharCode(...convertedDataBasedOnUintCondition)
    );
  }catch(e){
    console.error("Error in ConvertBufferToBase64String " + e);
    return null;
  }
}

export async function generatePrivateAndPublicKeyPair() {
  try {
    const keyPair = await crypto.subtle.generateKey(
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

// export async function storePrivateAndPublicKeyPair(keyPair: CryptoKeyPair) {
//   try {
//     const request = indexedDB.open("crypto-db", 1);

//     request.onupgradeneeded = () => {
//       const db = request.result;
//       db.createObjectStore("keys");
//     };

//     request.onsuccess = async () => {
//       const db = request.result;

//       const tx = db.transaction("keys", "readwrite");
//       const store = tx.objectStore("keys");

//       await store.put(keyPair.privateKey, "privateKey");
//       await store.put(keyPair.publicKey, "publicKey");

//       console.log("Keys stored");
//       return true;
//     };
//   } catch (e) {
//     console.error("Error in storePrivateAndPublicKeyPair " + e);
//     return false;
//   }
// }

export function storePrivateAndPublicKeyPair(
  keyPair: CryptoKeyPair
  
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("crypto-db", 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("keys")) {
        db.createObjectStore("keys");
      }
    };

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      const db = request.result;

      const tx = db.transaction("keys", "readwrite");
      const store = tx.objectStore("keys");

      store.put(keyPair.privateKey, "privateKey");
      store.put(keyPair.publicKey, "publicKey");

      tx.oncomplete = () => {
        resolve(true);
      };

      tx.onerror = () => {
        reject(tx.error);
      };
    };
  });
}

// export async function getPrivateKey(): Promise<any | null> {
//   return new Promise<any>((resolve,reject)=>{
//     try {
//       const request = indexedDB.open("crypto-db", 1);
  
//       request.onsuccess = async () => {
//         const db = request.result;
  
//         const tx = db.transaction("keys", "readonly");
//         const store = tx.objectStore("keys");
  
//         const getReq = store.get("privateKey");
  
//         getReq.onsuccess = async () => {
//           const privateKey = getReq.result;
//           resolve(privateKey);
//         };
//         getReq.onerror = () => {
//           reject("Not able to Get Private Key");
//         };
//       };
  
//       request.onerror = () => {
//         reject("Not able to Get Private Key");
//       };
//     } catch (e) {
//       console.error("Error in getPrivateKey " + e);
//       resolve(null);
//     }
//   })
// }

// export async function getPublicKey(): Promise<any | null> {
//   return new Promise<any>((resolve,reject)=>{
//       const request = indexedDB.open("crypto-db", 1);
  
//       request.onsuccess = async () => {
//         const db = request.result;
  
//         const tx = db.transaction("keys", "readonly");
//         const store = tx.objectStore("keys");
  
//         const getReq = store.get("publicKey");
  
//         getReq.onsuccess = async () => {
//           const publicKey = getReq.result;
//           resolve(publicKey);
//         };
//         getReq.onerror = () => {
//           reject("Not able to Get publicKey Key");
//         };
//       };
  
//       request.onerror = () => {
//         reject("Not able to Get publicKey Key");
//       };
//     // } catch (e) {
//     //   console.error("Error in getPublicKey " + e);
//     //   return null;
//     // }
//   }
//   )
// }

export function getFromKeyStore(key: "privateKey" | "publicKey"): Promise<any | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open("crypto-db", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("keys")) {
        db.createObjectStore("keys");
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("keys", "readonly");
      const store = tx.objectStore("keys");
      const getReq = store.get(key);

      getReq.onsuccess = () => resolve(getReq.result ?? null);
      getReq.onerror = () => {
        console.error(`Not able to get ${key}`);
        resolve(null);
      };
    };

    request.onerror = () => {
      console.error(`Not able to open crypto-db to get ${key}`);
      resolve(null);
    };
  });
}

export async function generateSymmetricKeyAndEncryptMessage(
  message: string,
): Promise<{ encryptedMessage: string; encryptKey: CryptoKey } | null> {
  try {
    if (!message) return null;
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const symmetricKeyGenerated = await crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const EncryptedMessage =  await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      symmetricKeyGenerated,
      data
    );

    // const EncryptedString = ConvertBufferToBase64String(EncryptedMessage);

    // if (!EncryptedString) {
    //   throw "Unable to Decode Encrypted Message";
    // }

    const cipherBytes = new Uint8Array(EncryptedMessage);

    const combined = new Uint8Array(
      iv.length + cipherBytes.length
    );

    combined.set(iv, 0);
    combined.set(cipherBytes, iv.length);

    const EncryptedString = ConvertBufferToBase64String(combined);

    
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
    const EncrpytedSymmetricKey = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      SymmetricKeyBuffer,
    );

    return ConvertBufferToBase64String(EncrpytedSymmetricKey);
  } catch (e) {
    console.error("Error in encryptSymmetricKeyWithPublicKey " + e);
    return null;
  }
}


export async function ConvertCrypotKeyToString(key: CryptoKey | null): Promise<string | null>{
  try{

    if(!key) return null;
    
    const exportedBuffer = await crypto.subtle.exportKey(
      "spki",
      key
    );

    if(!exportedBuffer) return null;

    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(exportedBuffer))
    );

    return base64String;

  }catch(e){
    console.error("Error in ConvertCrypotKeyToString " + e);
    return null;
  }
}

export async function Base64ToBuffer(base64Stirng: string | null | undefined): Promise<ArrayBuffer | null>{
  try{

    if(!base64Stirng) return null;

    const binaryString = atob(base64Stirng);

    if(!binaryString) return null;

    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;

  }catch(e){
    console.error("Error in Base64ToBuffer " + e);
    return null;
  }
}

export async function Base64StringToCryptoKey(base64Stirng: string | null): Promise<CryptoKey | null> {
  try{
    if(!base64Stirng) return null;

    // const binaryString = atob(base64Stirng);

    // if(!binaryString) return null;

    // const bytes = new Uint8Array(binaryString.length);

    // for (let i = 0; i < binaryString.length; i++) {
    //   bytes[i] = binaryString.charCodeAt(i);
    // }

    const arrayBuffer = await Base64ToBuffer(base64Stirng);

    if(!arrayBuffer) return null;

    const importedPublicKey = await ArrayBufferToCryptoKey(arrayBuffer);

    if(!importedPublicKey){
      throw("Not able to Convert the buffer to Public Key");
    }

    return importedPublicKey;
  }catch(e){
    console.error("Error in Base64StringToCryptoKey " + e);
    return null;
  }
}

export async function ArrayBufferToCryptoKey(buffer:ArrayBuffer | null,isEncrypt=true): Promise<CryptoKey | null>{
  try{
    if(!buffer) return null;

    if(isEncrypt){
      const importedPublicKey = await crypto.subtle.importKey(
        "spki",
        buffer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"]
      );
  
      if(!importedPublicKey){
        throw("Not able to Convert the buffer to Public Key");
      }
  
      return importedPublicKey;
    }else{
          const importedKey = await crypto.subtle.importKey(
          "pkcs8",
          buffer,
          { name: "RSA-OAEP", hash: "SHA-256" },
          true,
          ["decrypt"]
        );
        if(!importedKey){
           throw("Not able to Convert the buffer to Crypto Key");
        }
        return importedKey;
    }

  }catch(e){
    console.error("Error in ArrayBufferToCryptoKey " + e);
    return null;
  }
}

export async function BufferToSymmetricKey(buffer: ArrayBuffer | null): Promise<CryptoKey | null> {
  try {
    if (!buffer) return null;

    const symmetricKey = await crypto.subtle.importKey(
      "raw",
      buffer,
      { name: "AES-GCM" }, // or AES-CBC, depending on what you used to encrypt messages
      true,
      ["encrypt", "decrypt"]
    );

    return symmetricKey;
  } catch (e) {
    console.error("Error in BufferToSymmetricKey " + e);
    return null;
  }
}


export async function DecryptMessage(message: Message,currentUserDetails:CurrentUser): Promise<string | null>{
  try{

    if(!message) return null;
    const PrivateKey = await getFromKeyStore("privateKey");
    const isMessageSentByCurrentUser = message?.sender_id == currentUserDetails?.user_id;

    if(!PrivateKey){
      throw("Error Unable to Query Private Key!");
    }

    const cipherKeyOfMessageBasedUserSentMessage = isMessageSentByCurrentUser ? message?.sender_cipher_key : message?.cipher_key;

    const MessageCyperKeyToBuffer = await Base64ToBuffer(cipherKeyOfMessageBasedUserSentMessage);

    if(!MessageCyperKeyToBuffer){
      throw("unable to conver Ciper Key to Buffer");
    }
  
    const decryptedSymmetricKeyBuffer = await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      PrivateKey,
      MessageCyperKeyToBuffer
    )

    if(!decryptedSymmetricKeyBuffer){
      throw("Uable to Decrypt Cipher key");
    }

    const decryptedSymmetricKey = await BufferToSymmetricKey(decryptedSymmetricKeyBuffer);

    if(!decryptedSymmetricKey) return null;

    const bufferedMessageData = await Base64ToBuffer(message?.message_encrypt);

    if(!bufferedMessageData){
      throw("Uable to convert Message to Buffer")
    }

    const FromArrayBufferToUintBuffer =  new Uint8Array(bufferedMessageData);

    const EncryptedIV = FromArrayBufferToUintBuffer.slice(0, 12);

    const EncryptedMessageData = FromArrayBufferToUintBuffer.slice(12);

   const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: EncryptedIV,
      },
      decryptedSymmetricKey,
      EncryptedMessageData
    );

    if(!decryptedBuffer){
      throw new Error("Unable to Decrypt Message");
    }

    return new TextDecoder().decode(decryptedBuffer);
  }catch(e){
    console.error("Error in DecryptMessage " + e);
    return null;
  }
}
