import { decode } from "jsonwebtoken";
import getlambdaResponse from "../../pages/api/lib/lambdas";
import Profile from "../types/Profile";

export const getProfile = async (session): Promise<Profile> => {
  const response = (
    await getlambdaResponse(`user/${decode(session.accessToken).sub}`, "GET", session.accessToken)
  ).props.response.result;
  return response;
};

export const updateProfile = async (profile: Profile, session): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `user/${profile.username}/update`,
      "POST",
      session.accessToken,
      JSON.stringify(profile)
    )
  ).props;
  if (response.err !== undefined) return false;
  return true;
};

export const removeProfile = async (profile: Profile, session): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(`user/${profile.username}/delete`, "DELETE", session.accessToken)
  ).props;
  if (response.err !== undefined) return false;
  return true;
};
