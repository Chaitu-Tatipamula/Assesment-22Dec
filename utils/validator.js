const {body} = require("express-validator")

exports.validateRegistration = [
    body("username").notEmpty().isAlphanumeric().withMessage("Invalid UserName"),
    body("dob").isDate().withMessage("Invalid DOB"),
    body("referralCode").notEmpty().withMessage("Referral code required"),
    body("passCode").isLength({min : 6}).withMessage("PassCode must be atleast 6 Chars")
]

exports.validateLogin = [
    body("username").notEmpty().isAlphanumeric().withMessage("Username required"),
    body("passCode").notEmpty().withMessage("PassCode required")
]