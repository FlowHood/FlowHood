export const handleError = (error) => {
  let message = "An unexpected error occurred";

  if (error.response) {
    const { status, data } = error.response;

    if (status === 400 && data && data.message) {
      message = data.message;
      if (data.data && Array.isArray(data.data)) {
        const details = data.data
          .map((err) => `${err.field}: ${err.defaultMessage}`)
          .join(", ");
        message += `: ${details}`;
      }
    } else if (status === 404 && data && data.message) {
      message = data.message;
    } else {
      message = data.message || "Something went wrong";
    }
  } else if (error.request) {
    message = "No response from server. Please try again later.";
  } else {
    message = error.message;
  }

  return message;
};
