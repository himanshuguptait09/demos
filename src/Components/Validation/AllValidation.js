import Swal from "sweetalert2";

const disallowedChars = /[!<>+#$%^&*+~=?{}[\]]/;
const allowedStartChars = /^[a-zA-Z0-9][a-zA-Z0-9 /.@-_()'"]*$/;
const allowedCharactersPattern = /^[A-Za-z0-9][A-Za-z 0-9.,:)(@-_]*$/;

const capitalizeFirstLetter = (str) => {
    return str ?
        str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
        str;
};

export const validateInput = (value, fieldName) => {

    if (!value) {
        const errorMsg = `${capitalizeFirstLetter(fieldName)} is required`;
        console.log(errorMsg);
        Swal.fire({ icon: "error", title: "Validation Error", text: errorMsg });
        return { valid: false, errorMsg };
    }
    if (disallowedChars.test(value)) {
        const errorMsg = `${capitalizeFirstLetter(fieldName)} contains character or number`;
        Swal.fire({ icon: "error", title: "Validation Error", text: errorMsg });
        return { valid: false, errorMsg };
    }

    if (!allowedStartChars.test(value)) {
        const errorMsg = `${capitalizeFirstLetter(fieldName)} must start with a letter or number`;
        Swal.fire({ icon: "error", title: "Validation Error", text: errorMsg });
        return { valid: false, errorMsg };
    }

    if (!allowedCharactersPattern.test(value)) {
        const errorMsg = `${capitalizeFirstLetter(fieldName)} can only contain letters, numbers, spaces, and the following special characters: .,)(@-_`;
        Swal.fire({ icon: "error", title: "Validation Error", text: errorMsg });
        return { valid: false, errorMsg };
    }

    return { valid: true };
};

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

export const locationValidation = (value) => {
    return value
      .replace(/[^a-zA-Z0-9 ./\-()_'"]/g, '')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };