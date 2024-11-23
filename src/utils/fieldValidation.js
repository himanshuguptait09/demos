export const validateEmail = (value) => {
    const textPattern = /^[^\w]|^\./;
    return textPattern.test(value);
};

// Function to validate text fields (only letters, period, and slash)
export const validateMobile = (value) => {
    return value.replace(/\D/g, '')
    // const textPattern = /[^0-9]/;
    // return textPattern.test(value);
};