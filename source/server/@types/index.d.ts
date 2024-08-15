import { InteractionMenu } from "@classes/Interaction.class";
import { AccountEntity } from "@entities/Account.entity";
import { CharacterEntity } from "@entities/Character.entity";
import { NativeMenu } from "@classes/NativeMenu.class";

declare global {
    interface PlayerMpPool {
        getPlayerByName: (stringornumber: string) => PlayerMp | undefined;
    }

    interface PlayerMp {
        this: PlayerMp;

        account: AccountEntity | null;
        character: CharacterEntity | null;
        lastPosition: Vector3 | null;
        interactionMenu: InteractionMenu | null;
        fastSlotActive: number | null;
        emoteTimeout: NodeJS.Timeout | null;

        nativemenu: NativeMenu | null;

        cdata: any;
        giveWeaponEx: (weapon: number, totalAmmo: number, ammoInClip?: number | undefined) => void;
        showNotify(type: RageShared.Enums.NotifyType, message: string, skin?: "light" | "dark" | "colored"): void;
        setVariable<K extends keyof RageShared.Players.Interfaces.PlayerVars>(name: K, value: RageShared.Players.Interfaces.PlayerVars[K]): void;
        getVariable<K extends keyof RageShared.Players.Interfaces.PlayerVars>(key: K): RageShared.Players.Interfaces.PlayerVars[K];
        getAdminLevel(): number;
        getRoleplayName(checkmask: boolean = true): string;
        requestCollisionAt(x: number, y: number, z: number): Promise<boolean>;
        startScreenEffect(effectName: string, duration: number, looped: boolean): void;
        stopScreenEffect(effectName: string): void;
        setEmoteText(color: Array4d, text: string, time: number): void;
        giveMoney(amount: number, logMessage?: string): void;
    }
    interface ColshapeMp {
        enterHandler: (player: PlayerMp) => void;
        exitHandler: (player: PlayerMp) => void;
    }
}
export {};
