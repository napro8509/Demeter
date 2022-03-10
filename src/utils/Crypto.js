import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
const aesjs = require('aes-js');
const Buffer = require('buffer').Buffer;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export default {
	encryptAES(message, key = '', iv = '', options = { hideMessage: false, tag: 'Platform' }) {
		const { hideMessage, tag } = options || {};
		let messageClone = hideMessage ? '******' : message;
		let keyClone = key;
		key = key.substring(0, 32);
		try {
			key = aesjs.utils.utf8.toBytes(key, 'aes');
			iv = iv ? aesjs.utils.utf8.toBytes('') : '';
			message = aesjs.utils.utf8.toBytes(message);
			let aesCbc = new aesjs.ModeOfOperation.cbc(key, '');
			let encryptedBytes = aesCbc.encrypt(aesjs.padding.pkcs7.pad(message));
			let encryptedMessage = Buffer.from(encryptedBytes).toString('base64');
			return encryptedMessage;
		} catch (error) {
			let content = `Crypto.encryptAES failed.${
				tag ? ` Tag: ${tag}.` : ''
			} Message: '${messageClone}'. Key: '${keyClone}'. IV: '${iv}'. Error: '${error}'`;
			console.log(content);
			return '';
		}
	},

	decryptAES(encryptedMessage, key, iv = '') {
		const bytes = AES.decrypt(encryptedMessage, key);
		return bytes.toString(CryptoJS.enc.Utf8);
	},
};
