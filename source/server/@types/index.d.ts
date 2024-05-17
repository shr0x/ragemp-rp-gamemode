import { AccountEntity } from "../database/entity/Account.entity";
import { CharacterEntity } from "../database/entity/Character.entity";

declare global {
    interface PlayerMp {
        account: AccountEntity | null;
        character: CharacterEntity | null;
        lastPosition: Vector3 | null;
        showNotify(type: RageShared.Enums.NotifyType, message: string, skin?: "light" | "dark" | "colored"): void;
    }
    interface ColshapeMp {
        enterHandler: (player: PlayerMp) => void;
        exitHandler: (player: PlayerMp) => void;
    }
}
export {};
