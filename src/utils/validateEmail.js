const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("===email===", email);
  return emailRegex.test(email) ? true : false;
};
export default isValidEmail;
