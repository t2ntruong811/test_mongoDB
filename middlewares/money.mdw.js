const createError = require('http-errors');
const moment = require('moment');
const nodeRSA = require('node-rsa');
const crypto = require('crypto');
const config = require('../config/default.json');

module.exports = function(req, res, next) {
    const headerTs = req.headers['ts'];
    const data = headerTs + JSON.stringify(req.body);

    /* Khúc tạo sign chỗ này làm để test chứ sau không cần vì
       tụi nó gửi đi đã có sign rồi mình chỉ cần dùng public_key để verify thôi */

    privateKeyB = config.RSA.privateKeyB; // dung de ky
    publicKeyB = config.RSA.publicKeyB; // dung de verify

    // tạo chữ kí
    const sign = crypto.createSign('SHA256');
    
    sign.write(data); // đưa data cần kí vào đây
    const signature = sign.sign(privateKeyB, 'hex'); // tạo chữ kí bằng private key

    console.log(signature); // in ra để copy bỏ vào postman phần header

    // Verify
    const verify = crypto.createVerify('SHA256');
    verify.write(data);
    verify.end();
    
    if(!verify.verify(publicKeyB, req.headers['sign'], 'hex')){ // truyen public key, chu ky vào để verify
        throw createError(400, 'Signature is wrong!');
    }

    //

    if(req.headers['partner-code'] !== config.interbank.partnerCode){
        throw createError(400, 'Invalid partner code!');
    }

    console.log(moment().unix());

    const ts = moment().unix();
    const timeExp = moment.unix(headerTs).add(10, 'm').unix();

    if(ts > timeExp){
        console.log(moment().unix());
        throw createError(400, 'Request expire!');
    }

    next();
}