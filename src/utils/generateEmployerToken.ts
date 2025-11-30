import jwt from "jsonwebtoken";

export function generateEmployerToken(id: number, email: string) {
    console.log("Gerando token:",id,email)
    return jwt.sign(
        {id, email},
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
}
