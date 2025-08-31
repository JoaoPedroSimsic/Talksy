const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6 || password.length > 30) return "Password must be 6 to 30 charaters long";
  return null;
};

export default validatePassword;
