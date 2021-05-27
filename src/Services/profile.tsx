import { decode } from "jsonwebtoken";
import getlambdaResponse from "../../pages/api/lib/lambdas";
import Profile from "../types/Profile";

export const getProfile = async (session): Promise<Profile> => {
  const response = (
    await getlambdaResponse(`user/${decode(session.accessToken).sub}/`, "GET", session.accessToken)
  ).props.response.result;
  return response || null;
};

export const updateProfile = async (profile: Profile, session): Promise<string> => {
  const { response } = (
    await getlambdaResponse(
      `user/${profile.username}/update`,
      "POST",
      session.accessToken,
      JSON.stringify(profile)
    )
  ).props;
  if (response.error !== undefined) return response.error;
  return response.message;
};

export const updatePassword = async (profile: Profile, session, pass: string): Promise<boolean> => {
  const password = {
    password: pass,
  };
  const { response } = (
    await getlambdaResponse(
      `user/${profile.username}/updatePassword`,
      "POST",
      session.accessToken,
      JSON.stringify(password)
    )
  ).props;
  if (response.error !== undefined) return false;
  return true;
};

export const removeProfile = async (profile: Profile, session): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(`user/${profile.username}/delete`, "DELETE", session.accessToken)
  ).props;
  if (response.error !== undefined) return false;
  return true;
};
