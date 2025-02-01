// Key derivation function using PBKDF2
async function deriveKey(secretKey, salt) {
    const encoder = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secretKey),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-512',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}

// Encryption function
async function encryptString(plainText, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
    const encoder = new TextEncoder();
    const cipherText = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        encoder.encode(plainText)
    );

    return {
        ciphertext: btoa(String.fromCharCode(...new Uint8Array(cipherText))),
        iv: btoa(String.fromCharCode(...iv)), // Encode IV in Base64
    };
}

// Decryption function
async function decryptString(encryptedMessage, key) {
    const { ciphertext, iv } = encryptedMessage;

    const decodedCipherText = new Uint8Array(
        atob(ciphertext)
            .split('')
            .map((char) => char.charCodeAt(0))
    );
    const decodedIv = new Uint8Array(
        atob(iv)
            .split('')
            .map((char) => char.charCodeAt(0))
    );

    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: decodedIv,
        },
        key,
        decodedCipherText
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
};

