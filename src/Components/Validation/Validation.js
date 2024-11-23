export const disAllowAfterInput = /[!#$%^&*+=[\]`~;{}|:<>?]/; // Disallowed special characters when user input after char or number
export const allowAfterCharNumber = /^[a-zA-Z0-9][a-zA-Z0-9 /.@-_()'"]*$/; // Allowed format (start with letter/number)
export const initialValue = /[!#$%^&*+=[\]`~; {}|:<>?]/;
export const emailValidate = /^[0-9]{6,8}$/ // email 

export const capitalizeEachWord = (str) => {
    return str ? str.replace(/\b\w/g, char => char.toUpperCase()) : str;
};

export const validateWebsite = (value) => {
    const regx = /^(ftp|http|https|www):\/\/[^ "]+$/;
    return regx.test(value);
};


export const validateInputValue = (formData) => {
    const error = {};
    const validators = {

        locationName: {
            required: "Location Name is required",
            invalid: "invalid characters ",
        },
        shortName: {
            required: "Short Name is required",
            invalid: "invalid characters ",
        },
        firstName: {
            required: "First name is required",
            invalid: "invalid characters ",
        },
        middleName: {
            invalid: "invalid characters ",
        },
        lastName: {
            required: "Last name is required",
            invalid: "invalid characters ",
        },
        address: {
            required: "Address is required",
            invalid: "invalid characters ",
        },
        contact1: {
            required: "Contact number is required",
            invalid: "Contact number must be 10 digits",
        },
        contact2: {
            required: "Contact number is required",
            invalid: "Contact number must be 10 digits",
        },
        zip: {
            required: "Zip code is required",
            invalid: "Invalid zip code",
        },
        state: { required: "State is required" },
        city: { required: "City is required" },
        country: { required: "Country is required" },

        departmentName: {
            required: "Department Name is required",
            invalid: "invalid characters ",
        },

        remark: {
            required: "Remark is required",
            invalid: "invalid characters ",
        },

        displayName: {
            required: 'Display Name is required',
            invalid: "invalid characters"
        },
    };

    Object.keys(validators).forEach((field) => {
        if (!formData[field]) {
            error[field] = validators[field].required;
        } else if (initialValue.test(formData[field])) {
            error[field] = `${field} invalid character`;
        } else if (disAllowAfterInput.test(formData[field]) || !allowAfterCharNumber.test(formData[field])) {
            error[field] = validators[field].invalid;
        } else {
            formData[field] = capitalizeEachWord(formData[field]);
        }
    });

    // Specific validation for email and contact numbers
    if (!formData.email1) {
        error.email1 = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email1)) {
        error.email1 = "Email is invalid";
    }

    if (!/^\d{10}$/.test(formData.contact1)) {
        error.contact1 = "Contact number must be 10 digits";
    }
    if (!/^\d{10}$/.test(formData.contact2)) {
        error.contact2 = "Contact number must be 10 digits";
    }

    if (!emailValidate.test(formData.zip)) {
        error.zip = "Zip code must be at least 6 to 8 digits.";
    }

    return { errors: error, modifiedData: formData };
};