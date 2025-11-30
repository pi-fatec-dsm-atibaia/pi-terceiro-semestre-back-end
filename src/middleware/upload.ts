import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (_req: Request, _file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (_req: Request, file, cb) => {
        const timestamp = Date.now();

        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, `${timestamp}=${safeName}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedMimes = [
            "application/pdf",
            "application/octet-stream", // alguns PDFs vêm assim
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo não permitido. Use PDF/JPEG/PNG."));
        }
    }
});