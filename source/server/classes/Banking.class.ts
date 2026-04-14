import { RageShared } from "@shared/index";

class BankingService {
    public getCash(player: PlayerMp): number {
        return player.character?.cash ?? 0;
    }

    public getBank(player: PlayerMp): number {
        return 0;
        // return player.character?.bank ?? 0;
    }

    public getAccountName(player: PlayerMp): string {
        if (!player.character) return "Unknown";
        return player.character.name ?? player.name;
    }

    public getBalances(player: PlayerMp) {
        return {
            cash: this.getCash(player),
            bank: this.getBank(player),
            accountName: this.getAccountName(player)
        };
    }

    public validateAmount(amount: number): boolean {
        return Number.isFinite(amount) && amount > 0;
    }

    public async deposit(player: PlayerMp, amount: number): Promise<boolean> {
        if (!player.character) return false;
        if (!this.validateAmount(amount)) return false;
        if (player.character.cash < amount) return false;

        player.character.cash -= amount;

        // save character here if needed
        // await player.character.save();

        return true;
    }

    public async withdraw(player: PlayerMp, amount: number): Promise<boolean> {
        if (!player.character) return false;
        if (!this.validateAmount(amount)) return false;

        player.character.cash += amount;

        // save character here if needed
        // await player.character.save();

        return true;
    }

    public sendBalances(player: PlayerMp, cef: { emit: Function }) {
        cef.emit(player, "atm", "setBalances", this.getBalances(player));
    }

    public notifyInvalidAmount(player: PlayerMp) {
        player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Invalid amount.");
    }

    public notifyInsufficientCash(player: PlayerMp) {
        player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "You do not have enough cash.");
    }

    public notifyInsufficientBank(player: PlayerMp) {
        player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "You do not have enough money in your bank account.");
    }
}

export const bankingService = new BankingService();