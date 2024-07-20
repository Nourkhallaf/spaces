export class User {
  id?: number;
  email!: string;
  first_name!: string;
  last_name!: string;
  avatar?: string;
}

export class UserReqModel{
  name!: string;
  job!: string;
}
