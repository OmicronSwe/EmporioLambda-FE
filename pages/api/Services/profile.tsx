import { decode } from "jsonwebtoken";
import getlambdaResponse from "../lib/lambdas";
import { Profile } from "../../../src/objects/Profile";

export const getProfile = async (session): Promise<Profile> => {
  const response = (
    await getlambdaResponse(`user/${decode(session.accessToken).sub}`, "GET", session)
  ).props.response.result;
  return response;
};

export const updateProfile = async (profile: Profile, session): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(
      `user/${profile.username}/update`,
      "POST",
      session,
      JSON.stringify(profile)
    )
  ).props;
  if (response.err !== undefined) return false;
  return true;
};

export const removeProfile = async (profile: Profile, session): Promise<boolean> => {
  const { response } = (
    await getlambdaResponse(`user/${profile.username}/delete`, "DELETE", session)
  ).props;
  if (response.err !== undefined) return false;
  return true;
};
