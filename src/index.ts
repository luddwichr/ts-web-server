import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { TypeCompiler } from '@sinclair/typebox/compiler';

const X = Type.Object({                      
  x: Type.Number(),
  y: Type.Number(),
  z: Type.Number()
});
type T = Static<typeof X>;
const C = TypeCompiler.Compile(X);

const app: Express = express();
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.json('Express + TypeScript Server');
});

app.post('/validate', (req: Request, res: Response) => {
  console.log(`request body: ${JSON.stringify(req.body)}`);
  const input = req.body;
  const is_valid = C.Check(input);
  if (is_valid) {
    const value: T = Value.Cast(X, input);
    res.send(`value: ${JSON.stringify(value)}`);
  } else {
    const errors = [...C.Errors(input)];
    res.send(`Validation errors: ${JSON.stringify(errors)}`);
  };
});


app.use(function(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = 8080;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});