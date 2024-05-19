export interface INormalResponse {
    message: string;
    status: number;
  }
  
  export interface IRegisterResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
   // role: Role;
    active: boolean;
    message: string;
  }