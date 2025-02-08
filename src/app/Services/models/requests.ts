import { Task } from "./models";

export interface SignUpRequest {
    userName?: string;
    email?: string; 
    password: string;
  }
  
  export interface SignInRequest {
    userName?: string; 
    email?: string; 
    password: string;
  }
  
  export interface EditTaskRequest {
    task:Task;
  }
  
  export interface GetLookupByTableNamesRequest {
    tableNames: string;
  }

  export interface RefreshTokenRequest {
     refreshToken: string;
  }

  export interface DeleteTaskRequest{
    taskId: number;
  }