import { AccountEntity } from "../database/entity/Account.entity";
import { CharacterEntity } from "../database/entity/Character.entity";

declare global {
    interface PlayerMp {
        this: PlayerMp;
        account: AccountEntity | null;
        character: CharacterEntity | null;
        lastPosition: Vector3 | null;
        showNotify(type: RageShared.Enums.NotifyType, message: string, skin?: "light" | "dark" | "colored"): void;
        setVariable<K extends keyof RageShared.Interfaces.PlayerVars>(name: K, value: RageShared.Interfaces.PlayerVars[K]): void;
        getVariable<K extends keyof RageShared.Interfaces.PlayerVars>(key: K): RageShared.Interfaces.PlayerVars[K];
        getAdminLevel(): number;
    }
    interface ColshapeMp {
        enterHandler: (player: PlayerMp) => void;
        exitHandler: (player: PlayerMp) => void;
    }
}
export {};
