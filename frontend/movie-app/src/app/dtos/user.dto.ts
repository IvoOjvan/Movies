import { MovieDTO } from './movie.dto';

export interface UserDTO {
  id: object; //na backendu _id
  email: string;
  password: string;
  first_name: string;
  last_name: string; //na backendu lastname
  movies?: MovieDTO[];
}

export interface UserSignUp {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
