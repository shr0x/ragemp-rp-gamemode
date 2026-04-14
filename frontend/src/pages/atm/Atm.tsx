import { observer } from "mobx-react-lite";
import { createComponent } from "src/hoc/registerComponent";
import { atmStore } from "store/Atm.store";
import style from "./atm.module.scss";

interface IAtmProps {
    atmStore: typeof atmStore;
}

const quickAmounts = [100, 500, 1000, 5000];

const Atm = observer(({ atmStore }: IAtmProps) => {
    if (!atmStore.isVisible) return null;

    return (
        <div className={style.atmRoot}>
            <div className={style.overlay} onClick={() => atmStore.closeAtm()} />

            <div className={style.window}>
                <div className={style.header}>
                    <div>
                        <p className={style.eyebrow}>Banking</p>
                        <h1 className={style.title}>ATM</h1>
                    </div>

                    <button className={style.close} onClick={() => atmStore.closeAtm()}>
                        ×
                    </button>
                </div>

                <div className={style.body}>
                    <aside className={style.sidebar}>
                        <button className={atmStore.activeTab === "home" ? style.active : ""} onClick={() => atmStore.setActiveTab("home")}>
                            Overview
                        </button>

                        <button className={atmStore.activeTab === "deposit" ? style.active : ""} onClick={() => atmStore.setActiveTab("deposit")}>
                            Deposit
                        </button>

                        <button className={atmStore.activeTab === "withdraw" ? style.active : ""} onClick={() => atmStore.setActiveTab("withdraw")}>
                            Withdraw
                        </button>
                    </aside>

                    <main className={style.main}>
                        {atmStore.activeTab === "home" && (
                            <div className={style.home}>
                                <div className={style.card}>
                                    <span>Account Holder</span>
                                    <strong>{atmStore.accountName}</strong>
                                </div>

                                <div className={style.cardGrid}>
                                    <div className={style.card}>
                                        <span>Cash</span>
                                        <strong>${atmStore.formattedCash}</strong>
                                    </div>

                                    <div className={style.card}>
                                        <span>Bank</span>
                                        <strong>${atmStore.formattedBank}</strong>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(atmStore.activeTab === "deposit" || atmStore.activeTab === "withdraw") && (
                            <div className={style.actionPanel}>
                                <div className={style.balanceBar}>
                                    <div>
                                        <span>Cash</span>
                                        <strong>${atmStore.formattedCash}</strong>
                                    </div>
                                    <div>
                                        <span>Bank</span>
                                        <strong>${atmStore.formattedBank}</strong>
                                    </div>
                                </div>

                                <div className={style.inputSection}>
                                    <label>{atmStore.activeTab === "deposit" ? "Deposit amount" : "Withdraw amount"}</label>

                                    <input type="text" value={atmStore.amountInput} onChange={(e) => atmStore.setAmountInput(e.target.value)} placeholder="Enter amount..." />
                                </div>

                                <div className={style.quickGrid}>
                                    {quickAmounts.map((amount) => (
                                        <button key={amount} onClick={() => atmStore.setAmountInput(String(amount))}>
                                            ${amount.toLocaleString()}
                                        </button>
                                    ))}

                                    <button onClick={() => atmStore.setAmountInput(String(atmStore.activeTab === "deposit" ? atmStore.cash : atmStore.bank))}>Max</button>
                                </div>

                                <div className={style.actions}>
                                    <button className={style.secondary} onClick={() => atmStore.clearAmount()}>
                                        Clear
                                    </button>

                                    {atmStore.activeTab === "deposit" && (
                                        <button className={style.primary} onClick={() => atmStore.deposit()}>
                                            Confirm Deposit
                                        </button>
                                    )}

                                    {atmStore.activeTab === "withdraw" && (
                                        <button className={style.primary} onClick={() => atmStore.withdraw()}>
                                            Confirm Withdraw
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
});

export default createComponent({
    pageName: "atm",
    component: Atm,
    props: {
        atmStore
    }
});
