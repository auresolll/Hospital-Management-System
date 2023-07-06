export type InputsAuthentication = {
  usernameRequired: string;
  passwordRequired: string;
  optionOtpRequired: "Phone" | "Mail";
  otpRequired: string;
};
