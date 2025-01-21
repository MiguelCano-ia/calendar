type status = "checking" | "authenticated" | "not-authenticated";

export interface User {
  uid?: string;
  name?: string;
  token?: string;
}
export interface AuthState {
  status: status;
  user: User;
  errorMessage?: string;
}

export const initialState: AuthState = {
  status: "not-authenticated",
  user: {},
  errorMessage: undefined,
};
