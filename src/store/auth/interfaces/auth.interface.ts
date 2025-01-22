type status = "checking" | "authenticated" | "not-authenticated";

export interface User {
  _id?: string;
  name?: string;
  token?: string;
}
export interface AuthState {
  status: status;
  user: User;
  errorMessage?: string;
}

export const initialState: AuthState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};
