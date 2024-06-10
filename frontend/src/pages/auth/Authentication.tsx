import { FC, useState } from "react";
import style from "./auth.module.scss";
import { AuthForm } from "./components/AuthForm";
import { RegisterForm } from "./components/RegisterForm";
import { createComponent } from "src/hoc/registerComponent";

const Authentication: FC = () => {
    const [form, setForm] = useState("auth");
    return <div className={style.main}>{form === "auth" ? <AuthForm setForm={setForm} /> : <RegisterForm setForm={setForm} />}</div>;
};

export default createComponent({
    props: {},
    component: Authentication,
    pageName: "auth"
});
