import dotenv from "dotenv";
dotenv.config();

export const OTP_LENGTH = 5;
export const OTP_CONFIG = {
    upperCaseAlphabets : false,
    specialChars: false
};

export const MAIL_SETTINGS = {
    service: "gmail",
    auth: {
        user : process.env.EMAIL_ID,
        pass : process.env.EMAIL_PASS
    },
};

