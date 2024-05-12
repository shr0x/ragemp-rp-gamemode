# Introduction


# Frontend Events
>
[EventManager.util.ts]
```
EventManager.addHandler(pagename: string, pointer: string, handler() => void): void;

EventManager.updateHandler(pagename: string, pointer: string, handler() => void):void

EventManager.callHandler(event: string, ...args: any[]): void;

EventManager.removeTargetHandler(pagename: string, pointer: string, handler() => void): void;

EventManager.emitServer(target: string, pointer: string, ...args: any[]): void;

```

# Clientside
```
```

# Server side
>

```
CefEvent.register(target: string, name: string, handler: EventHandler | EventHandlerAsync): void;

CefEvent.remove(target: string): void;

CefEvent.removeAll(target: string): void;

CefEvent.emit<T extends keyof CefEventMap, K extends keyof CefEventMap[T]>(player: PlayerMp, target: T, name: K, obj: CefEventMap[T][K]): void;

CefEvent.emitAsync<T extends keyof CefEventMap, K extends keyof CefEventMap[T]>(player: PlayerMp, target: T, name: K, obj: CefEventMap[T][K]): Promise<void>
```
