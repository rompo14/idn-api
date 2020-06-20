import { Request, Response } from "express";
import { setError, StatusError } from './utils/errors';
import { LooseObject } from './utils/types';
const domain = require('domain-info');
const punycodeRegex = require("punycode-regex");

export class Controller {
    public static encodePuny(req: Request, res: Response): void {
        try {
            const {d} = req.query;

            if (!d) throw new StatusError('param domain as "d" is required', 400);

            if (punycodeRegex().test(d))
                throw new StatusError('Указанная строка уже зашифрована', 400);

            res.json({success: true, result: domain.punycode((d as string).toLowerCase())}).status(200);
        } catch (e) {
            setError(e, res);
        }
    }

    public static decodePuny(req: Request, res: Response): void {
        try {
            const {d} = req.query;

            if (!d) throw new StatusError('param domain as "d" is required', 400);

            if (!punycodeRegex().test(d))
                throw new StatusError('Указанная строка не является ACE-последовательностью', 400);

            res.json({success: true, result: domain.punycode((d as string).toLowerCase())});
        } catch (e) {
            setError(e, res);
        }
    }

    public static convertPuny(req: Request, res: Response): void {
        try {
            const {d} = req.query;

            if (!d) throw new StatusError('param domain as "d" is required', 400);

            res.json({success: true, result: domain.punycode((d as string).toLowerCase())}).status(200);
        } catch (e) {
            setError(e, res);
        }
    }

    public static testPuny(req: Request, res: Response): void {
        try {
            const {d} = req.query;

            if (!d) throw new StatusError('param domain as "d" is required', 400);

            res.json({success: true, result: punycodeRegex().test((d as string).toLowerCase())}).status(200);
        } catch (e) {
            setError(e, res);
        }
    }

    public static getDomainInfo(req: Request, res: Response): void {
        try {
            const {d, type} = req.query;

            if (!d) throw new StatusError('param domain as "d" is required', 400);

            const _type = (type as string)?.split(',') ?? [];

            domain.groper(d,  {type: _type}, (error: Error, data: any) => {
                if (error) throw new StatusError('something wrong', 400);

                const obj: LooseObject = {};
                _type.forEach(key => obj[key] = data[key]);
                res.json({success: true, result: _type.length ? obj : data}).status(200);
            });
        } catch (e) {
            setError(e, res);
        }
    }

    public static getDomainByIp(req: Request, res: Response): void {
        try {
            const {ip} = req.query;

            if (!ip) throw new StatusError('param "ip" is required', 400);

            domain.reverse(ip, (error: Error, data: any[]) => {
                if (error) throw new StatusError('something wrong', 400);
                res.json({success: true, result: data.shift()}).status(200);
            });
        } catch (e) {
            setError(e, res);
        }
    }

    public static convertEmail(req: Request, res: Response): void {
        try {
            const {e} = req.query;

            if (!e) throw new StatusError('param email as "e" is required', 400);

            const parts = (e as string).split('@');
            const result = domain.punycode(parts[0].toLowerCase()) + '@' + domain.punycode(parts[1].toLowerCase());

            res.json({success: true, result}).status(200);
        } catch (e) {
            setError(e, res);
        }
    }
}
