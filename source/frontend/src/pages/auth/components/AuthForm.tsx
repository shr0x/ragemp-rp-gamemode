import { FC, useCallback, useRef } from "react";
import style from "../auth.module.scss";
import EventManager from "utils/EventManager.util";
import { Bounce, toast } from "react-toastify";

export const AuthForm: FC<{ setForm: (page: string) => void }> = ({ setForm }) => {
    const authForm = useRef<HTMLDivElement>(null);

    const authUsername = useRef<HTMLInputElement>(null),
        authPassword = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        const username = authUsername.current?.value;
        const password = authPassword.current?.value;

        if (!username || !password || !username.length || !password.length) {
            toast.error("Fill out the forms!", { theme: "dark", transition: Bounce });
            return;
        }

        EventManager.emitServer("auth", "loginPlayer", { username, password });

        authUsername.current.value = "";
        authPassword.current.value = "";
        console.log("test");
    }, []);

    return (
        <div className={style.authform} ref={authForm} onSubmit={(e) => onSubmit(e)}>
            <form autoComplete="off">
                <div className={style.content}>
                    <input className={style.usernameInput} ref={authUsername} type="text" name="auth_username" maxLength={32} placeholder="Username" autoComplete="off" />
                    <input ref={authPassword} type="password" name="auth_password" maxLength={74} placeholder="Password" />
                    <input className={style.submit} type="submit" name="auth_submit" value="Login" />
                </div>
            </form>
            <div>
                Don't have an account?
                <span onClick={() => setForm("reg")}>Register now!</span>
            </div>
        </div>
    );
};
