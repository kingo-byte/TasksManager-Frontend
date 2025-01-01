import { Lookup } from "./models";

export interface GetLookupByTableNamesResponse {
    lookups: { [key: string]: Lookup[] };
}

export interface SignInResponse
{
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse
{
  accessToken: string;
  refreshToken: string;
}