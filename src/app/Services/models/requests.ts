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
    taskId: number; 
    userId: number; 
    categoryCode: string;
    title: string; 
    description: string;
    dueDate: Date;
  }
  