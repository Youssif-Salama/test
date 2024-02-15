import toast from "react-hot-toast";


export function successToaster(message) {
    toast.success(message);
}

export function failToaster(message) {
    toast.error(message);
}