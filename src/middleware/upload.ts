import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (_req: Request, _file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (_req: Request, file, cb) => {
        const timestamp = Date.now();

        // Extrai extensão real do arquivo
        const ext = path.extname(file.originalname);

        // Tira a extensão para limpar o nome
        const baseName = path.basename(file.originalname, ext);

        // Cria um nome seguro
        const safeName = baseName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "");

        // Gera o nome final preservando a extensão
        cb(null, `${timestamp}-${safeName}${ext}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedMimes = [
            "application/pdf",
            "application/octet-stream",
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
