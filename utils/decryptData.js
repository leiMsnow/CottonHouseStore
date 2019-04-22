var WXBizDataCrypt = require('./WXBizDataCrypt');

var appId = 'wx45561479cd1e3fdd';

function decryptData(sessionKey, encryptedData, iv) {
	var pc = new WXBizDataCrypt(appId, sessionKey);
	var data = pc.decryptData(encryptedData, iv);
	console.log('解密后 data: ', data);
	return data;
}
module.exports = {
	decryptData: decryptData,
	appId: appId,
};
