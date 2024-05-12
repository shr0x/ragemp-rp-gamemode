import { Bounce, toast } from "react-toastify";

class Notify {
    constructor() {}

    show(type: "loading" | "promise" | "success" | "info" | "error" | "warning" | "warn" | "dark", message: string, skin: "light" | "dark" | "colored" = "dark") {
        //@ts-ignore
        return toast[type](message, { theme: skin });
    }

    error(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.error(message, { theme: skin });
    }
    loading(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.loading(message, { theme: skin });
    }
    success(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.success(message, { theme: skin });
    }
    info(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.info(message, { theme: skin });
    }
    warning(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.warning(message, { theme: skin });
    }
    warn(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.warn(message, { theme: skin });
    }
    dark(message: string, skin: "light" | "dark" | "colored" = "dark") {
        return toast.dark(message, { theme: skin });
    }
    clear() {
        return toast.dismiss();
    }
}

const Notification = new Notify();
export default Notification;
