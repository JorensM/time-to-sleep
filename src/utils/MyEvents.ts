export class MyEvents {

    events: Record<string, Record<string, ((...args: any[]) => void)>> = {};
    maxID = 0;

    constructor(eventNames: string[]) {
        eventNames.forEach(name => {
            this.events[name] = {};
        })
    }

    on(event: string, callback: (...args: any[]) => void) {
        const id = this.maxID++;
        this.events[event][id] = callback;
        return id;
    }

    callEvent(id: string, ...args: any[]) {
        console.log(id);
        console.log(this.events);
        Object.values(this.events[id]).forEach(cb => {
            cb(...args);
        })
    }
}