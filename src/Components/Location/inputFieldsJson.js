export const locationDetailsFields = [
    {
        "label": "Address",
        "type": "text",
        "id": "address",
        "name": "address",
        "placeholder": "Address",
        "required": true,
        "onChange": "handleChange",
        "columnClass": "col-12 col-md-4"
    },
    {
        "label": "Zip Code",
        "type": "tel",
        "id": "zip",
        "name": "zip",
        "placeholder": "Zip Code",
        "maxLength": 12,
        "minLength": 6,
        "required": true,
        "onChange": "handleMobileChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Country",
        "type": "select",
        "id": "country",
        "name": "country",
        "options": "countries",
        "required": true,
        "onChange": "handleChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "State",
        "type": "select",
        "id": "state",
        "name": "state",
        "options": "states",
        "required": true,
        "onChange": "handleChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "City",
        "type": "select",
        "id": "city",
        "name": "city",
        "options": "cities",
        "required": true,
        "onChange": "handleChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Primary Contact",
        "type": "tel",
        "id": "primaryContact",
        "name": "primaryContact",
        "placeholder": "Primary",
        "required": true,
        "onChange": "handleMobileChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Secondary Contact",
        "type": "tel",
        "id": "secondaryContact",
        "name": "secondaryContact",
        "placeholder": "Secondary",
        "onChange": "handleMobileChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Contact (Optional)",
        "type": "tel",
        "id": "contactOptional1",
        "name": "contactOptional1",
        "placeholder": "Optional",
        "onChange": "handleMobileChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Contact (Optional)",
        "type": "tel",
        "id": "contactOptional2",
        "name": "contactOptional2",
        "placeholder": "Optional",
        "onChange": "handleMobileChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Primary Email",
        "type": "email",
        "id": "primaryEmail",
        "name": "primaryEmail",
        "placeholder": "Primary",
        "required": true,
        "onChange": "handleEmailChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Secondary Email",
        "type": "email",
        "id": "secondaryEmail",
        "name": "secondaryEmail",
        "placeholder": "Secondary",
        "onChange": "handleEmailChange",
        "columnClass": "col-12 col-md-2"
    },
    {
        "label": "Website",
        "type": "url",
        "id": "website",
        "name": "website",
        "placeholder": "Website Link",
        "columnClass": "col-12 col-md-4"
    },
    {
        "label": "Footer",
        "type": "text",
        "id": "footer",
        "name": "footer",
        "placeholder": "Footer",
        "onChange": "handleChange",
        "columnClass": "col-12 col-md-4"
    }
]


export const locationMainCardFiled = [
    {
        "id": "locationType",
        "name": "locationType",
        "label": "Location Type",
        "type": "select",
        "options": "locationTypes",
        "placeholder": "Select",
        "required": true,
        "onChange": "handleChange",
        "colClass": "col-12 col-md-2"
    },
    {
        "id": "locationName",
        "name": "locationName",
        "label": "Location Name",
        "type": "text",
        "placeholder": "Location Name",
        "required": true,
        "onChange": "handleChange",
        "colClass": "col-12 col-md-2"
    },
    {
        "id": "shortName",
        "name": "shortName",
        "label": "Short Name",
        "type": "text",
        "placeholder": "Short Name",
        "required": true,
        "onChange": "handleChange",
        "colClass": "col-12 col-md-2"
    },
    {
        "id": "status",
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": "statuses",
        "placeholder": "Select",
        "required": true,
        "onChange": "handleChange",
        "colClass": "col-12 col-md-2"
    }
]
