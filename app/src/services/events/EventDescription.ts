import { EventType } from "./EventType";

export type EventDescription<TPayload = void> =
    { id: EventType, state: TPayload };