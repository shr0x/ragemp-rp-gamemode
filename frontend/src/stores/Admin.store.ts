import { makeAutoObservable, observable } from "mobx";
import EventManager from "utils/EventManager.util";

export interface IAdminPlayer {
    id: number;
    name: string;
    ping: number;
    health: number;
    armour: number;
    adminLevel?: number;
}

export interface IAdminStats {
    onlinePlayers: number;
    onlineAdmins: number;
    serverUptime: string;
}

class _AdminStore {
    isVisible = true;
    activeTab: "dashboard" | "players" = "dashboard";
    players: IAdminPlayer[] = observable.array([
        { id: 1, name: "PlayerOne", ping: 50, health: 100, armour: 50, adminLevel: 0 },
        { id: 2, name: "PlayerTwo", ping: 70, health: 80, armour: 20, adminLevel: 1 },
        { id: 3, name: "PlayerThree", ping: 30, health: 120, armour: 100, adminLevel: 2 }
    ]);
    selectedPlayer: IAdminPlayer | null = null;
    stats: IAdminStats = observable.object({
        onlinePlayers: 33,
        onlineAdmins: 6,
        serverUptime: "0m"
    });
    loading = false;
    search = "";

    constructor() {
        makeAutoObservable(this);
        this.createEvents();
    }

    setVisible(state: boolean) {
        this.isVisible = state;
    }

    setActiveTab(tab: "dashboard" | "players") {
        this.activeTab = tab;
    }

    setPlayers(players: IAdminPlayer[]) {
        this.players = players;
    }

    setStats(stats: IAdminStats) {
        this.stats = stats;
    }

    setSelectedPlayer(player: IAdminPlayer | null) {
        this.selectedPlayer = player;
    }

    setLoading(state: boolean) {
        this.loading = state;
    }

    setSearch(value: string) {
        this.search = value;
    }

    get filteredPlayers() {
        const query = this.search.trim().toLowerCase();
        if (!query.length) return this.players;

        return this.players.filter(
            (player) =>
                player.name.toLowerCase().includes(query) ||
                String(player.id).includes(query)
        );
    }

    openPanel() {
        this.setVisible(true);
        EventManager.emitServer("admin", "requestOpen");
    }

    closePanel() {
        this.setVisible(false);
        this.setSelectedPlayer(null);
    }

    refreshPlayers() {
        EventManager.emitServer("admin", "requestPlayers");
    }

    selectPlayer(player: IAdminPlayer) {
        this.setSelectedPlayer(player);
        EventManager.emitServer("admin", "selectPlayer", player.id);
    }

    kickSelectedPlayer(reason: string) {
        if (!this.selectedPlayer) return;
        EventManager.emitServer("admin", "kickPlayer", this.selectedPlayer.id, reason);
    }

    freezeSelectedPlayer(state: boolean) {
        if (!this.selectedPlayer) return;
        EventManager.emitServer("admin", "freezePlayer", this.selectedPlayer.id, state);
    }

    gotoSelectedPlayer() {
        if (!this.selectedPlayer) return;
        EventManager.emitServer("admin", "gotoPlayer", this.selectedPlayer.id);
    }

    bringSelectedPlayer() {
        if (!this.selectedPlayer) return;
        EventManager.emitServer("admin", "bringPlayer", this.selectedPlayer.id);
    }

    healSelectedPlayer() {
        if (!this.selectedPlayer) return;
        EventManager.emitServer("admin", "healPlayer", this.selectedPlayer.id);
    }

    armourSelectedPlayer() {
        if (!this.selectedPlayer) return;
        EventManager.emitServer("admin", "armourPlayer", this.selectedPlayer.id);
    }

    createEvents() {
        EventManager.addHandler("admin", "setVisible", (state: boolean) => this.setVisible(state));
        EventManager.addHandler("admin", "setPlayers", (players: IAdminPlayer[]) => this.setPlayers(players));
        EventManager.addHandler("admin", "setStats", (stats: IAdminStats) => this.setStats(stats));
        EventManager.addHandler("admin", "setSelectedPlayer", (player: IAdminPlayer | null) => this.setSelectedPlayer(player));
        EventManager.addHandler("admin", "setLoading", (state: boolean) => this.setLoading(state));
        EventManager.stopAddingHandler("admin");
    }
}

export const adminStore = new _AdminStore();