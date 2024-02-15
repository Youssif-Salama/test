import * as Yup from "yup";
export const signupSchema = Yup.object({
    firstName: Yup.string().required("First name is required").min(3, "First name min length is 3").max(20, "First name max length is 20"),

    lastName: Yup.string().required("Last name is required").min(3, "Last name min length is 3").max(20, "Last name max length is 20"),

    email: Yup.string().required("Email is required").email("Invalid email format"),

    phone: Yup.string().required("Phone is required").matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, "Phone must be an Egyptian number starting with"),

    password: Yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Example: Youssif@123"),

    role: Yup.string().required("Role is required"),
});