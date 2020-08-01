const { google } = require("googleapis");
import fs from "fs";
const service = google.youtube("v3");

interface Options {
  title: string;
  video: fs.ReadStream;
  description: string;
  status: string;
}

export const uploadVideo = (
  auth: any,
  options: Options,
  callback: (error: string | null, videoUrl: string | null) => void
) => {
  console.log("Uploading...");
  service.videos.insert(
    {
      auth: auth,
      part: "snippet,contentDetails,status",
      resource: {
        // Video title and description
        snippet: {
          title: options.title,
          description: options.description,
        },
        // I set to private for tests
        status: {
          privacyStatus: options.status,
        },
      },

      // Create the readable stream to upload the video
      media: {
        body: options.video,
      },
    },
    (error: any, data: any) => {
      if (error) {
        console.log("Error While Uploading");
        return callback("Error While Uploading" + error, null);
      }
      const videoUrl = "https://www.youtube.com/watch?v=" + data.data.id;
      console.log(videoUrl);
      callback(null, videoUrl);
    }
  );
};
