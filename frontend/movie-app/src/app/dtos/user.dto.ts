import { MovieDTO } from './movie.dto';

export interface UserDTO {
  id: object; //na backendu _id
  email: string;
  password: string;
  first_name: string;
  last_name: string; //na backendu lastname
  movies?: MovieDTO[];
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  token: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    userId: string;
  };
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    userId: string;
  };
}
