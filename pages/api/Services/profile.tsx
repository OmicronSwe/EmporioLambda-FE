import getlambdaResponse from "../lib/lambdas"
import { decode } from 'jsonwebtoken'
import { Profile } from "../../../src/objects/Profile";

export const getProfile = async (session): Promise<Profile> => {
    const response = (await getlambdaResponse(`user/${decode(session.accessToken).sub}`, "GET", session)).props.response.result;
    return response;
}