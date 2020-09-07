import { NextFunction, Response, Request } from "express";
export default class SSE {
    private clients;
    private retryTime;
    constructor(retryTime?: number | null);
    private _init;
    init: (req: Request, res: Response, next: NextFunction) => void;
    private _send;
    send: (data: string, eventName?: string | undefined, id?: string | number | undefined) => void;
}
