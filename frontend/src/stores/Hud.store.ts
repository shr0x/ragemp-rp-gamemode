import {action, makeObservable, observable} from "mobx";

interface IMenuItems {
    id: number;
    text: string;
    type: number;
    subItems?: IMenuItems[]
}

interface IInteractionMenu {
    isActive: boolean;
    items: IMenuItems[];
}

class HudStore {

    @observable interactionMenu: IInteractionMenu = observable.object({
        isActive: false,
        items: [

        ]
    })


    constructor() {
        makeObservable(this);
    }
    @action.bound setInteractionMenu(data: IInteractionMenu) {
        this.interactionMenu = data;
    }
    @action.bound hideInteraction(){
        this.setInteractionMenu({isActive: false, items:[]})
    }
}


export default HudStore;