/// <reference types="qs" />
import { NextFunction, Response, Request } from "express";
export default class SSE {
    private clients;
    private retryTime;
    constructor(retryTime?: number | null);
    private _init;
    init: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>, next: NextFunction) => void;
    private _send;
    send: (data: string, event?: string | undefined, id?: string | number | undefined) => void;
}
