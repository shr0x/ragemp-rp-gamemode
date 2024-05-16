import { FC, useCallback, useRef } from "react";
import style from "../auth.module.scss";
import EventManager from "utils/EventManager.util";
import Notification from "utils/NotifyManager.util";
import registerIcon from "assets/images/auth/icons/register.svg";
export const RegisterForm: FC<{ setForm: (page: string) => void }> = ({ setForm }) => {
    const authForm = useRef<HTMLDivElement>(null);

    const registerUsername = useRef<HTMLInputElement>(null),
        registerEmail = useRef<HTMLInputElement>(null),
        registerPassword = useRef<HTMLInputElement>(null),
        confirmRegisterPassword = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const [name, email, password, confirmPass] = [registerUsername.current, registerEmail.current, registerPassword.current, confirmRegisterPassword.current];

        if (!name || !password || !email || !confirmPass || !name.value.length || !password.value.length) {
            Notification.error("Fill out the forms!");
            return;
        }

        EventManager.emitServer("auth", "register", {
            username: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPass.value
        });

        name.value = "";
        email.value = "";
        password.value = "";
        confirmPass.value = "";
        console.log("test");
    }, []);

    return (
        <div className={style.authform} ref={authForm} onSubmit={(e) => onSubmit(e)}>
            <form autoComplete="off">
                <div className={style.content}>
                    <input className={style.usernameInput} ref={registerUsername} type="text" name="auth_username" maxLength={32} placeholder="Username" autoComplete="off" />
                    <input ref={registerEmail} type="email" name="auth_email" maxLength={32} placeholder="Email" autoComplete="off" />

                    <input ref={registerPassword} type="password" name="auth_password" maxLength={74} placeholder="Password" />
                    <input ref={confirmRegisterPassword} type="password" name="auth_confirm_password" maxLength={74} placeholder="Confirm Password" />

                    <button className={style.submit} type="submit" name="auth_submit">
                        Register <img src={registerIcon} alt="register" />
                    </button>
                </div>
            </form>
            <div className={style.footer}>
                Already have an account?
                <span onClick={() => setForm("auth")}>Login now!</span>
            </div>
        </div>
    );
};
