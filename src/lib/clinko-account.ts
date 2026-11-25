// Talks to Clinko's Supabase project: email OTP, then the delete-account function. Publishable key only.
const URL_ = process.env.NEXT_PUBLIC_CLINKO_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_CLINKO_SUPABASE_KEY;

export type Preview = { coins: number; diamonds: number; pending_withdrawals: number; pending_rupees: number; blocking_withdrawals: number };

const GENERIC = "Something went wrong. Please try again in a moment.";
const EXPIRED = "Your verification has expired. Please start again.";

async function post(path: string, body: unknown, token?: string) {
  if (!URL_ || !KEY) throw new Error("Account deletion isn't available right now. Please contact support.");
  let res: Response;
  try {
    res = await fetch(URL_ + path, {
      method: "POST",
      headers: { apikey: KEY, "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("We couldn't connect. Check your internet and try again.");
  }
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
}

export async function sendCode(email: string) {
  const { ok, status, data } = await post("/auth/v1/otp", { email, create_user: false });
  if (status === 429) throw new Error("Too many requests. Please wait a little and try again.");
  // An unknown email looks the same as a known one, so the page doesn't reveal who has an account.
  if (!ok && data.error_code !== "otp_disabled" && data.error_code !== "user_not_found") throw new Error(GENERIC);
}

export async function verifyCode(email: string, token: string): Promise<string> {
  const { ok, status, data } = await post("/auth/v1/verify", { type: "email", email, token });
  if (status === 429) throw new Error("Too many attempts. Please wait a little and try again.");
  if (status >= 500) throw new Error(GENERIC);
  if (!ok || !data.access_token) throw new Error("That code is incorrect or has expired.");
  return data.access_token;
}

async function callFunction(token: string, body: unknown) {
  const { ok, status, data } = await post("/functions/v1/delete-account", body, token);
  if (ok && data.success) return data;
  if (data.error === "WITHDRAWAL_IN_PROGRESS")
    throw new Error("A redemption is being processed. You can delete your account once it's complete.");
  if (status === 401 || data.error === "OTP_REQUIRED") throw new Error(EXPIRED);
  throw new Error(GENERIC);
}

export const loadPreview = (token: string): Promise<Preview> => callFunction(token, { action: "preview" });
export const deleteAccount = (token: string) => callFunction(token, { action: "delete", confirm: "DELETE" });

/** Ends only this page's session; the app stays signed in. */
export const endSession = (token: string) => post("/auth/v1/logout?scope=local", {}, token).catch(() => {});
