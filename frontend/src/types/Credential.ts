export type UserResponse = {
  username?: string;
  role?: string;
};

export type CredentialProps = {
  token?: string;
  user?: UserResponse;
  username: string;
  password: string;
};
