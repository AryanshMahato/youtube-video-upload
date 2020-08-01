import { startServer } from "./startServer";
import { uploadToYoutube } from "./controller/UploadToYoutube";

const app = startServer();

app.post("/upload", uploadToYoutube);
