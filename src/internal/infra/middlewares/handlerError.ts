import { Request, Response, NextFunction} from 'express';

export function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    const status = error.statusCode || 500;
    const message = error.message

    res.status(status);
    res.json({
        status,
        message,
    });
}