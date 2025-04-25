const apiResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export default apiResponse;