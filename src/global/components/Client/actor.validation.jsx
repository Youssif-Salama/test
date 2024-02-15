import * as Yup from "yup";
export const actorUpdateValidation = Yup.object({
    firstName: Yup.string().min(3, "First name min length is 3").max(20, "First name max length is 20"),

    lastName: Yup.string().min(3, "Last name min length is 3").max(20, "Last name max length is 20"),

    email: Yup.string().email("Invalid email format"),

    phone: Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, "Phone must be an Egyptian number starting with"),

    role: Yup.string(),
    DateOB: Yup.string().matches(/^([0-9]{4})(\/|-)(1[0-2]|0?[1-9])\2(3[01]|[12][0-9]|0?[1-9])$/, "date of birth example: 2002-12-12")
})


