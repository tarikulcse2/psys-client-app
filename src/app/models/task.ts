export interface ITask {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    assignUserId: number;
}
