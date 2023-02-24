const svgCaptcha = require('svg-captcha');




module.exports = ()=>{
    //创建svg对象
    let cap = svgCaptcha.create({
        size:4,
        ignoreChars: '0o1i',
        width: 115, // 验证码的宽度
        height: 40,
    });
    return cap
}