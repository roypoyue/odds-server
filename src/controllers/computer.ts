import { Request, Response, NextFunction } from "express";

// interface RequestParams {
//   odds: Array<OddsObject>;
//   parameter: number;
// }

interface OddsObject {
  value?: number;
  name?: String;
}

export const getReflexByOdds = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const getReverseOdds = (oddsList: Array<OddsObject>) => {
    let sum: number = 0;
    oddsList.forEach((odds) => {
      sum = sum + 1 / (odds.value as number);
    });
    return sum;
  };
  const requestParams = req.query;

  let result: Array<OddsObject> = new Array();
  const parameter = (requestParams.parameter as unknown) as number;
  const oddsString: string = requestParams.odds as string;
  const odds = JSON.parse(oddsString) as Array<OddsObject>;
  let reverseOddsSum = getReverseOdds(odds);

  odds.forEach((o) => {
    let originalProbability = 1 - 1 / (o.value as number) / reverseOddsSum;
    let newValue =
      originalProbability + (1 - originalProbability) * (1 - parameter);
    let computedOdds: OddsObject = {
      name: o.name,
      value: 1 / newValue,
    };
    result.push(computedOdds);
  });

  res.json({
    result: { success: true },
    data: result,
  });
};
