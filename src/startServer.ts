import express, { Express } from "express";
import { EnvConfig } from "./services/EnvConfig";

export const startServer = (): Express => {
  const PORT = EnvConfig.getServerPort();
  const app = express();

  app.listen(PORT, () => {
    console.log(`Server Started at port: ${PORT}`);
  });

  return app;
};
