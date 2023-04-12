import type { NextFunction, Request, Response } from 'express';

export default function checkRequiredProperties(properties: string[], callback: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (let i = 0; i < properties.length; i++) {
      if (!callback(req, properties[i])) {
        return res.status(400).json({ error: `"${properties[i]}" property is required` });
      }
    }

    next();
  };
}

export function checkRequiredBodyProperties(properties: string[]) {
  return checkRequiredProperties(properties, (req: Request, property: string) => req.body[property] !== undefined);
}

export function checkRequiredQueryParameters(queryParams: string[]) {
  return checkRequiredProperties(queryParams, (req: Request, property: string) => req.query[property] !== undefined)
}
