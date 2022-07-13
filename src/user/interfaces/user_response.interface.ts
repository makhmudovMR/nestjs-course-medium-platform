interface IUserToken {
  id: number;
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
}

export interface IUserResponse {
  user: IUserToken;
}
