const crypto = require('crypto');
const fs = require('fs');

export const sign = (value) => {
    const private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');

    // File/Document to be signed
    const doc = value;

    // Signing
    const signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();

    // Returns the signature in output_format which can be 'binary', 'hex' or 'base64'
    const signature = signer.sign(private_key, 'base64')

    console.log('Digital Signature: ', signature);

    return signature
}