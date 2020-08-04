import { useCallback, useEffect } from "react";
import { Subject } from "rxjs";
import { EventDescription } from "./events/EventDescription";
import { EventType } from "./events/EventType";

const subject = new Subject<{type: EventType, payload: unknown}>();
const dispatch = (type: EventType, payload: unknown) => subject.next({ type, payload });

(window as any).__dispatchBackendEvent = dispatch;

export function dispatchClientEvent<TPayload = void>(type: EventDescription<TPayload>, payload: TPayload) {
    dispatch(type.id, payload);
}

export function useEvent<TPayload = void>(
    type: EventDescription<TPayload>,
    callback: (payload: TPayload) => void,
    deps: React.DependencyList): void {

    const handler = useCallback((inputType: EventType, payload: TPayload) => {
        if (inputType === type.id) {
            callback(payload);
        }
    }, deps);

    useEffect(() => {
        const subscription = subject.subscribe(data => handler(data.type, data.payload as TPayload))
        return () => subscription.unsubscribe();
    }, [handler]);
}