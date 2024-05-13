import { FC, useRef, useState } from "react";
import style from "./auth.module.scss";
import { AuthForm } from "./components/AuthForm";
import { RegisterForm } from "./components/RegisterForm";

export const Authentication: FC = () => {
    const [form, setForm] = useState("auth");
    return <div className={style.main}>{form === "auth" ? <AuthForm setForm={setForm} /> : <RegisterForm setForm={setForm} />}</div>;
};
