import client from "./axios";

interface SuccessMessageResponse {
  message: string;
}

interface InitSignUpProps {
  username: string;
  email: string;
  password: string;
}

export async function initSignUp(data: InitSignUpProps) {
  const res = await client.post<string>("auth/initSignUp", data);
  return res.data;
}

interface FinishSignUpProps {
  email: string;
  confirmation_code: string | number;
}

interface LoginResponse {
  _id: string;
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export async function finishSignUp(data: FinishSignUpProps) {
  const res = await client.post<LoginResponse>("auth/finishSignUp", data);
  return res.data;
}

interface SignInProps {
  email: string; // Username or email
  password: string;
}

export async function logIn(data: SignInProps) {
  const res = await client.post<LoginResponse>("auth/logIn", data);
  return res.data;
}

export async function logOut() {
  const res = await client.post<SuccessMessageResponse>("auth/logOut");
  return res.data;
}

export async function googleAuth(data: { token: string }) {
  const res = await client.post<LoginResponse>("auth/google", data);
  return res.data;
}

interface RefreshAccessTokenResponse {
  message: string;
  data: string;
}

export async function refreshAccessToken() {
  const res = await client.get<RefreshAccessTokenResponse>(
    "auth/refreshAccessToken"
  );
  return res.data.data;
}

interface GetProfileResponse {
  username: string;
  email: string;
  _id: string;
}

export async function getProfile() {
  const res = await client.get<GetProfileResponse>("auth/profile");
  return res.data;
}

export async function initResetPassword(data: { email: string }) {
  const res = await await client.post<SuccessMessageResponse>(
    "auth/initPasswordReset",
    data
  );

  return res.data;
}

interface CheckResetPasswordCodeProps {
  email: string;
  confirmation_code: string;
}

// Check if confirmation code is correct
export async function checkResetPasswordCode(
  data: CheckResetPasswordCodeProps
) {
  const res = await client.post("auth/checkPasswordReset", data);
  return res.data;
}

interface FinishPasswordReset {
  email: string;
  confirmation_code: string;
  new_password: string;
}

export async function finishResetPassword(data: FinishPasswordReset) {
  const res = await client.post<LoginResponse>(
    "auth/finishPasswordReset",
    data
  );
  return res.data;
}
