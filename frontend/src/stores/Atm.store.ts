import { makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";

export type AtmTab = "home" | "deposit" | "withdraw";

class _AtmStore {
    isVisible = true; // set false when fully wired
    activeTab: AtmTab = "home";

    cash = 0;
    bank = 0;
    accountName = "Unknown";

    amountInput = "";

    constructor() {
        makeAutoObservable(this);
        this.createEvents();

        // preview data
        this.setBalances({
            cash: 1250,
            bank: 8200,
            accountName: "Shrox Dev"
        });
    }

    setVisible(state: boolean) {
        this.isVisible = state;
    }

    setActiveTab(tab: AtmTab) {
        this.activeTab = tab;
        this.amountInput = "";
    }

    setBalances(data: { cash: number; bank: number; accountName: string }) {
        this.cash = data.cash;
        this.bank = data.bank;
        this.accountName = data.accountName;
    }

    setAmountInput(value: string) {
        this.amountInput = value.replace(/[^\d]/g, "");
    }

    appendAmount(value: string) {
        this.amountInput = `${this.amountInput}${value}`.replace(/[^\d]/g, "");
    }

    clearAmount() {
        this.amountInput = "";
    }

    get parsedAmount() {
        return Number(this.amountInput) || 0;
    }

    get formattedCash() {
        return this.cash.toLocaleString();
    }

    get formattedBank() {
        return this.bank.toLocaleString();
    }

    openAtm() {
        this.setVisible(true);
        EventManager.emitServer("atm", "open");
    }

    closeAtm() {
        this.setVisible(false);
        this.setActiveTab("home");
        EventManager.emitServer("atm", "close");
    }

    deposit() {
        if (!this.parsedAmount || this.parsedAmount <= 0) return;
        EventManager.emitServer("atm", "deposit", { amount: this.parsedAmount });
    }

    withdraw() {
        if (!this.parsedAmount || this.parsedAmount <= 0) return;
        EventManager.emitServer("atm", "withdraw", { amount: this.parsedAmount });
    }

    createEvents() {
        EventManager.addHandler("atm", "setVisible", (state: boolean) => this.setVisible(state));
        EventManager.addHandler(
            "atm",
            "setBalances",
            (data: { cash: number; bank: number; accountName: string }) => this.setBalances(data)
        );
    }
}

export const atmStore = new _AtmStore();