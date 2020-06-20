import { Response } from "express";

export class StatusError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'StatusError';
        this.status = status;
    }
}

export function setError(err: Error, res: Response) {
    if (err instanceof StatusError) {
        res.status(err.status);
        res.json({success: false, result: err.message});
    } else {
        res.status(400);
        res.json({success: false, result: err});
    }
}
