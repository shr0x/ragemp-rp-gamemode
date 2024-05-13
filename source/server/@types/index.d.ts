import { AccountEntity } from "../database/entity/Account.entity";

declare global {
    interface PlayerMp {
        account: AccountEntity | null;
        lastPosition: Vector3 | null;
        showNotify(type: "loading" | "promise" | "success" | "info" | "error" | "warning" | "warn" | "dark", message: string, skin?: "light" | "dark" | "colored"): void;
    }
}
export {};
