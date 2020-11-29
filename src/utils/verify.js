const crypto = require('crypto');
const fs = require('fs');

export const verify = (val, signature) => {
    const public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8');

    // Signing
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.write(val);
    verifier.end();

    // Verify file signature ( support formats 'binary', 'hex' or 'base64')
    const result = verifier.verify(public_key, signature, 'base64');

    return result
}