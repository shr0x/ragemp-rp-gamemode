# CEF HANDLER

---
## Introduction:
Creating a new page in our frontend is quite easy, the code is well connected with the backend when it comes to data that a page needs or pointers that you may have to call to send or receive data.


### `CEFPages`

CEF Pages, located in `source/client/assets` as `CEFPages.asset.ts` is an object where you describe each page and what the game is supposed to do while that page is open.
Below, you will find a list of options and what they do:

```typescript
blur: boolean; //Whether to enable background game blur or not
radar: boolean; //Whether to enable or disable game radar (minimap)
pause: boolean; //Whether the player can open the pause menu while page is shown
controls: boolean; //Whether to enable or disable movement controls for the player while a page is shown.
close: boolean; //Whether a player can close the page or the page must be closed by the server (from code)
```



### CefEventMap & CEFPages assets

When creating a new page in frontend, it is necessary to describe the page in `CEFPages` object.

```typescript
interface CefEventMap {
    pageName: {
        firstPointer: string;
        secondPointer: { name: string, value: number };
    }
}
```
This pointers come from page store, if you're creating a page and has a store then inside that store you are required to create events that will receive and update data to render in that page.

An example of how to create a page and a page store, let's say you're creating a vehicle list 

Let's create a store named `VehicleList.store.ts` in `frontend/src/stores`
```typescript
import { makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";


interface VehicleData {
    model: string;
}

class _VehicleStore {
    //here we describe the vehicle list array
    vehicleList: VehicleData[] = [];
    
    constructor() {
        //we make everything declared in this class observable, meaning that everytime a variable changes in the class, mobx will try to re-render it where ever its being used in pages.
        makeAutoObservable(this);
        
        //A method to create events with pointers, is how we call frontend from the backend.
        this.createEvents();
    }
    
    setVehicleList(data: VehicleData[]) {
        this.vehicleList = data;
    }
    
    public createEvents() {
        //EventManager.addHandler(pageName, pointer, handler() => void);
        EventManager.addHandler("vehicleList", "setData", (data: VehicleData) => this.setVehicleList(data));
        EventManager.stopAddingHandler("vehicleList");
    }
}

//Export the created store
export const vehicleStore = new _VehicleStore();

//Now this store is ready to be used, in any page.
```

Now let's create a page named `VehicleList.tsx` in `frontend/src/pages`

```typescript
import { FC } from 'react';
import { observer } from "mobx-react-lite";
import { createComponent } from "src/hoc/registerComponent";
import { vehicleStore } from "store/VehicleList.store"; //importing the store we just created above

//by exporting this component as observable, `observer`, 
//we basically tell mobx to keep an eye on this component for any change that we may do in the store linked to it.
const VehicleList: FC<{store: typeof vehicleStore}> = observer(({ store }) => {
    return (<div>
        {store.vehicleList.map((data, idx) => {
            return <div key={idx}>{data}</div>
        })}
    </div>)
});

//Now we export this newley created page using our component handler

export default createComponent({
    component: VehicleList, //Component that you want to render
    props: { store: vehicleStore }, //props are the props that you pass on component
    pageName: "vehicleList" //page name that you will call from backend to open
});

```

Now that we have the page and the store setup in the frontend, it's time to move to the backend and make sure the page data is setup there too.

The first thing we would want to do is open up `CEFPages.asset.ts` in `source/client/assets`

Now `CEFPages.asset.ts` should look like this:
```typescript
interface ICefPages {
    [key: string]: {
        blur: boolean;
        radar: boolean;
        pause: boolean;
        controls: boolean;
        close: boolean;
        freezeCamera?: boolean;
    };
}
const CEFPages: ICefPages = {};
export { CEFPages };
```

We have to add our newly created page in `CEFPages` object.
```typescript
interface ICefPages {
    [key: string]: {
        blur: boolean;
        radar: boolean;
        pause: boolean;
        controls: boolean;
        close: boolean;
        freezeCamera?: boolean;
    };
}
const CEFPages: ICefPages = {
    //We have to add the same name that we gave the page we created in the frontend, which in our case it was vehicleList
    vehicleList: { blur: true, radar: false, pause: true, controls: true, close: true}
};
export { CEFPages };
```

Now we're pretty much done with adding the page  data to client side, it's time to move on to the server side.

The first thing we would do is open up `CefData.ts` located in `source/shared`

When in this page, you would see that an exported namespace is there containing generally used CEF stuff in server-side.

The first thing we would do once we're into the file, is describe the new page data in `CefEventMap`

```typescript
export namespace CefData {
    export namespace Interfaces {
        export interface CefEventMap {
            /* we have to set the page and its pointers here,
            in our case the page name was vehicleList, and the first pointer was 
            setData which was created in createEvents on the page store file. */
            
            //EventManager.addHandler("vehicleList", "setData", (data: VehicleData) => this.setVehicleList(data));
            
            vehicleList: { //page name
                //pointer | the data type the pointer takes
                setData: {model: string}[];
            }
        }
    }
}
```

Now we're pretty much set and ready to open the new page we created as well as send data in the pointers we created.


Let's create a new command that will show up this page with a list of vehicles.
```typescript
import { RAGERP } from "@api";

RAGERP.commands.add({
    name: "vehiclelist",
    run: (player: PlayerMp) => {
        
        //let's create a list of vehicles to send to the frontend
        const vehicleList = ["sultanrs", "bati", "blista", "club"];
        
        //Let's send the data to the newly created page and open it up.
        RAGERP.cef.emit(player, "vehicleList", "setData", vehicleList);
        
        //once we've sent data to the page we then display it to the player.        
        RAGERP.cef.emit(player, "system", "setPage", "vehicleList");
    }
});
```

That's pretty much it, if you're still struggling feel free to open a general question in issues by [clicking here](https://github.com/shr0x/ragemp-rp-gamemode/issues/new/choose)

You can also check this video, of how the process of creating a page works, but it does not involve a page with store in it.

[![IMAGE ALT TEXT](http://img.youtube.com/vi/Q-RpLBSZNlQ/0.jpg)](https://www.youtube.com/watch?v=Q-RpLBSZNlQ "How to create a page")




# Bridge

[Browser.class.ts](https://github.com/shr0x/ragemp-rp-gamemode/blob/main/source/client/classes/Browser.class.ts) contains the 'bridge' code, bridge allows you to call server-events directly from frontend and frontend events directly from server.

If you have a look at [CEFEvent.class.ts](https://github.com/shr0x/ragemp-rp-framework/blob/main/source/server/classes/CEFEvent.class.ts) on backend server side, you can see there's a class made to handle frontend events or to be more clear events that are triggered from frontend but also trigger frontend events directly from the server.

  

If you have a look at [AuthForm.tsx](https://github.com/shr0x/ragemp-rp-framework/blob/main/frontend/src/pages/auth/components/AuthForm.tsx) there we trigger a server event when the player logs in like:

```ts
EventManager.emitServer("auth", "loginPlayer", { username, password });
```

And this event can be handled on backend server side by adding it using the CEFEvent class methods:

```ts
CefEvent.register("auth", "loginPlayer", async (player:  PlayerMp, data:  string) => {
    const { username, password } =  JSON.parse(data);
    //do what you want
})
```

Alternatively you could also add this event using the RAGEMP API like:

```ts
mp.events.add('server::auth:loginPlayer', async (player:  PlayerMp, data:  string) => {
    //do what you want
})
```
