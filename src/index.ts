import express, { Express, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "./exceptions/HttpException";
import errorMiddleware from "./middlewares/error.middleware";
import * as computerController from "./controllers/computer";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("hello world");
});
app.get("/Reflex", computerController.getReflexByOdds);

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
