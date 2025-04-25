const generateMessage = (type, name = "") => {
  const messages = {
    create: `${name} has been successfully created.`,
    read: `${name} has been successfully retrieved.`,
    update: `${name} has been successfully updated.`,
    delete: `${name} has been successfully deleted.`,
    error: `An error occurred while processing ${name}.`,
    notFound: `${name} not found.`,
    block: `${name} has been successfully blocked.`,
    unblock: `${name} has been successfully unblocked.`,
    login: `${name} has successfully logged in.`,
    logout: `${name} has successfully logged out.`,
    register: `${name} has successfully registered.`,
    invalidCredentials: `Invalid credentials provided for ${name}.`,
    serverError: `A server error occurred while processing ${name}.`,
    userExists: `A user with the provided email already exists.`,
    missingFields: `Required fields are missing for ${name}.`,
    unauthorized: "Access Denied. No token provided.",
    invalidToken : "Invalid token provided.",
    accessDenied: "Access Denied. You do not have permission to perform this action.",
  };

  return messages[type] || `Invalid operation type for ${name}.`;
};

export default generateMessage;
