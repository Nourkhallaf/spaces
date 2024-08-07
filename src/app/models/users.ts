export interface IUser {
  id?: number,
  email: string
  first_name: string;
  last_name: string;
  avatar?: string;
}
export class User  implements IUser{
  id?: number;
  email!: string;
  first_name!: string;
  last_name!: string;
  avatar?: string;
  job? : string;
}

export class UserReqModel{
  name!: string;
  job!: string;
}
