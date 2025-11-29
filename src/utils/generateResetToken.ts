import jwt from "jsonwebtoken";

export function generateResetToken(id: number, tipo: "aluno" | "orientador") {
    return jwt.sign(
        { id, tipo },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
}
