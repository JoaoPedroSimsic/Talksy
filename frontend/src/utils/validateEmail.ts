import validator from 'validator';

const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  if (!validator.isEmail(email)) return "Invalid email address";
  return null;
};

export default validateEmail;

