import { Request, Response, NextFunction } from "express";
import multer, { Field, MulterError } from "multer";
import { upload as uploader } from "../middleware/upload";

export function createMulterHandler(fields: Field[]) {
    const upload = uploader.fields(fields);

    return function (
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        upload(req, res, (err: any) => {
            if (err) {
                if (err instanceof MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                    return res.status(400).json({
                        error: "Campo inesperado enviado.",
                        campoRecebido: err.field,
                    });
                }

                return res.status(400).json({ error: err.message });
            }

            return next();
        });
    };
}