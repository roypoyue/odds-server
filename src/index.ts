import express, { Express, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "./exceptions/HttpException";
import errorMiddleware from "./middlewares/error.middleware";
import * as computerController from "./controllers/computer";
// import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

app.get("/", (_req: Request, res: Response) => {
  res.send("hello world");
});
app.get("/getReflex", computerController.getReflexByOdds);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(
    StatusCodes.NOT_FOUND,
    "Router Not Found"
  );
  next(error);
});
app.use(errorMiddleware);

const port: any = process.env.PORT || 6060;

const main = () => {
  app.listen(port, () => {
    console.log(`running on http://localhost:${port}`);
  });
};

main();
