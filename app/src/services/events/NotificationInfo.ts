export enum NotificationType {
    Information = 0,
    Warning = 1,
    Error = 2,
    Success = 3
}

export interface NotificationInfo {
    type: NotificationType;
    title: string;
    body: string;
}