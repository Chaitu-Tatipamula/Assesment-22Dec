const crypto = require("crypto");
const logger = require("../utils/logger");
const otpStore = new Map()

exports.generateOtp = (userId)=>{
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000
    otpStore.set(userId, {otp, expiresAt})
    logger.info(`Otp generated for : ${userId} : ${otp}`)
    return otp;
}

exports.verifyOtp = (userId, otp)=>{
    const record = otpStore.get(userId);
    if(!record || record.otp !== otp || record.expiresAt < Date.now()){
        logger.warn(`OTP verification failed for userId : ${userId}`)    
        return false
    };
    otpStore.delete(userId)
    logger.info(`Otp validated for userId : ${userId} : ${otp}`)
    return otp;
}
