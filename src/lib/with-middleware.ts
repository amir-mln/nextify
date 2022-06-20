import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// inspired by: https://stackoverflow.com/a/69973169/12217559
// read more at: https://expressjs.com/en/guide/using-middleware.html

export type HigherApiHandler<HigherReqFields = any> = (
  req: NextApiRequest & HigherReqFields,
  res: NextApiResponse
) => ReturnType<NextApiHandler>;

function withMiddleware(middleware: (...args: any[]) => void, apiHandler: HigherApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await new Promise((resolve, reject) => {
        middleware(req, res, (result: any) => {
          result instanceof Error ? reject(result) : resolve(result);
        });
      });
      return apiHandler(req, res);
    } catch (e) {
      return res.status(401).json({ message: (e as Error).message });
    }
  };
}

export default withMiddleware;
