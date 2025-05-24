import { MovieDTO } from './movie.dto';

export interface UserDTO {
  id: object;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
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
