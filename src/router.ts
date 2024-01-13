import express from "express";

export function createRouter(): express.Router {
  const router = express.Router();

  router.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/index.html");
  });

  router.get("/index.css", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/index.css");
  });

  return router;
}
