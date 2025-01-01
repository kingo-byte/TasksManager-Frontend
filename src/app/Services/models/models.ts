export interface task
{
    id: number;
    userId: number;
    title: string;
    description: string;
    dueDate: Date;
    createdDate: Date;
    lastModifiedDate: Date;
}

export interface user
{
    id: number;
    userName?: string;
    email?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    tasks?: task[];
}

export interface Lookup
{
    id: number;
    tableName: string;
    code: string;
    value: string;
    description: string
}