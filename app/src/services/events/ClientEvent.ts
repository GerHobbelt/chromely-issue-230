import { InstallState } from ".";
import { ConfigInfo } from "./ConfigInfo";
import { EventDescription } from "./EventDescription";
import { EventType } from "./EventType";

export const ClientEvent = {
    Configure: { id: EventType.Configure } as EventDescription<ConfigInfo>,
    InstallStateChanged: { id: EventType.InstallStateChanged } as EventDescription<InstallState>
}