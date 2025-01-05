export interface Lookup
{
    id: number;
    tableName: string;
    code: string;
    description: string
}

export interface User {
    id: number;
    userName?: string;
    email?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    tasks?: Task[];
}

export interface Task {
    id: number;
    userId: number;
    statusCode: string;
    statusDescription?: string;
    categoryCode: string;
    categoryDescription?: string;
    title: string;
    description: string;
    dueDate: string;
    createdDate: Date;
    lastModifiedDate: Date;
}
