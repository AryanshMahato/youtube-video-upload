import { Request, Response } from "express";
import path from "path";
import GoogleAuth from "../services/GoogleAuth";
import { uploadVideo } from "../services/YoutubeUpload";
const fs = require("fs");

export const uploadToYoutube = async (req: Request, res: Response) => {
  const { description, title, status } = req.body;
  if (!description || !title || !status) {
    const missing: Array<string | undefined> = [];
    missing.push(missingResponse(description, "description"));
    missing.push(missingResponse(title, "title"));
    missing.push(missingResponse(status, "status"));

    const filteredMissing = missing.filter((data) => data);

    return res.status(400).json({
      message: "Missing Required Data",
      missing: filteredMissing,
    });
  }
  try {
    const clientSecret = fs
      .readFileSync(path.join(__dirname, "..", "..", "client_secret.json"))
      .toString();

    //TODO: Accept video from API Request
    const video = fs.createReadStream(
      path.join(__dirname, "..", "..", "upload.mp4")
    );

    // Authorize a client with the loaded credentials
    const oauthClient = await GoogleAuth.authorize(
      JSON.parse(clientSecret?.toString())?.web
    );

    uploadVideo(
      oauthClient,
      {
        video,
        description,
        title,
        status,
      },
      (error, videoUrl) => {
        if (error) {
          return res.status(500).json({
            message: "Video Upload Failed",
            __type: error,
          });
        }
        res.status(200).json({
          videoUrl,
          description,
          title,
          status,
        });
      }
    );
  } catch (e) {
    if (e === "Upload Error") {
      console.log("Error Occurred while uploading video");
    }
    console.log("Error loading client secret file: " + e);
    res.status(500).json({
      message: "Video Upload Failed",
      __type: e,
    });
  }
};

const missingResponse = (
  property: string,
  name: string
): string | undefined => {
  if (!property) return `${name} is required`;
  return undefined;
};
