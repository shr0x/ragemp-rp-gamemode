
#  Getting started with frontend
>

## Introduction:
> Our frontend is built in react typescript using mobx as a data storage if not management.

[About MobX · MobX](https://mobx.js.org/README.html)<br>
[React](https://react.dev/)


Understanding how store works:
* Each page in the frontend has its own storage class described in the src/stores page
* This store is used to hold data and methods which control and update page components.
* Methods are then called by backend using EventManager and data is rendered on page right after.

>

Understanding bridge, events and its functions within the code.<br>

[EventManager.util.ts](https://github.com/shr0x/ragemp-rp-gamemode/blob/main/frontend/src/utils/EventManager.util.ts) is used on frontend to store events that can be called from backend but also trigger backend server or client side events.

Example initializing chat events which then can be called from the backend:



And then using the CEFEvent.class.ts (described below) you're able to trigger this event from the server itself:

* This function will trigger the event initialized above which then will trigger EventManager.callHandler and callHandler will update the chat store which is being observabled by mobx and rendered on change.

```ts
import {Cef_Event} from '@classes/CefEvent.class';

Cef_Event.emit(player, "chat", "setActive", true);// raw -> player.call('client::eventManager', ['cef::chat:setActive', true]);

```
Or using API method
```typescript
import {RAGERP} from '@api';

RAGERP.cef.emit(player, "chat", "setActive", true);// raw -> player.call('client::eventManager', ['cef::chat:setActive', true]);
```

# Bridge

[Browser.class.ts](https://github.com/shr0x/ragemp-rp-gamemode/blob/main/source/client/classes/Browser.class.ts) contains the 'bridge' code, bridge allows you to call server-events directly from frontend and frontend events directly from server.

If you have a look at [CEFEvent.class.ts](https://github.com/shr0x/ragemp-rp-framework/blob/main/source/backend/server/classes/CEFEvent.class.ts) on backend server side, you can see there's a class made to handle frontend events or to be more clear events that are triggered from frontend but also trigger frontend events directly from the server.

  

If you have a look at [AuthForm.tsx](https://github.com/shr0x/ragemp-rp-framework/blob/main/source/frontend/src/pages/auth/components/AuthForm.tsx) there we trigger a server event when the player logs in like:

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
