/// <reference types="react-scripts" />

declare module "*.wav";
declare module "*.mp3";
declare module "*.webp";
declare module "*.webm";
declare module "*.png";

declare module "*.style.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

interface EventMpPool {
    addProc(arg0: string, processRPCCall: (event: string, ...args: any) => Promise<any>): unknown;
    add(eventName: RageEnums.EventKey | string, callback: (...args: any[]) => void): void;
    add(events: { [name: string]: (...args: any[]) => void }): void;
    call(eventName: string, ...args: any[]): void;
    remove(eventName: string, handler?: (...args: any[]) => void): void;
    remove(eventNames: string[]): void;
    invoke(arg0: string, arg1: boolean): unknown;
}

interface Mp {
    invoke(arg0: string, arg1: boolean): void;
    events: EventMpPool;
    trigger(eventName: string, params: any): void;
}
declare const mp: Mp;
