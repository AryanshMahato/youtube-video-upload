import { google } from "googleapis";
import { Credentials } from "../types/Auth";
import { OAuth2Client } from "google-auth-library";
import { EnvConfig } from "./EnvConfig";

const OAuth2 = google.auth.OAuth2;

class GoogleAuth {
  SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly",
  ];

  public authorize = async (credentials: Credentials) => {
    const oauth2Client = new OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0]
    );

    // Check if we have previously stored a token.
    try {
      const token = EnvConfig.getAuthToken();
      const authToken = await oauth2Client.getToken(token);
      oauth2Client.credentials = authToken.tokens;
      return oauth2Client;
    } catch (e) {
      console.log(e);
      return this.getNewToken(oauth2Client);
    }
  };

  private getNewToken = async (oauth2Client: OAuth2Client) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.SCOPES,
    });

    console.log("Authorize this app by visiting this url: ", authUrl);

    // Save Auth token in Environment Variable
  };
}

export default new GoogleAuth();
