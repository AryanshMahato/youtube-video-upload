import { startServer } from "./startServer";
import { uploadToYoutube } from "./controller/UploadToYoutube";
import cors from "cors";
import bodyParser from "body-parser";

const app = startServer();

//? Middlewares
app.use(cors());
app.use(bodyParser.json());

//? Routes
app.post("/upload", uploadToYoutube);
