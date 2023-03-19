import otpGenerator from "otp-generator";
import { OTP_CONFIG,OTP_LENGTH } from "../constants/constant.js";

export function generateOTP(){
    return otpGenerator.generate(OTP_LENGTH,OTP_CONFIG);
}