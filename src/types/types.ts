export enum TodoStatus {
    Pending = 'pending',
    inProgress = 'inProgress',
    Completed = 'completed'
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}