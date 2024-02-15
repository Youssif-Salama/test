import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email format"),

    password: Yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Example: Youssif@123"),

})