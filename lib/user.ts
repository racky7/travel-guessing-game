export const validateUsername = (
  username: string
): { isValid: boolean; error: string } => {
  if (!username.trim()) {
    return { isValid: false, error: "Username is required" };
  }

  // Check length (3-20 characters)
  if (username.length < 3 || username.length > 20) {
    return {
      isValid: false,
      error: "Username must be between 3 and 20 characters",
    };
  }

  // Only allow letters, numbers, underscores, and hyphens
  const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!validUsernameRegex.test(username)) {
    return {
      isValid: false,
      error: "Illegal characters not allowed",
    };
  }

  return { isValid: true, error: "" };
};
