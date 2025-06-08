export const validateIndianPhoneNumber = (phoneNumber) => {
  const indianPhoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
  return indianPhoneRegex.test(phoneNumber) ? true : false;
};
