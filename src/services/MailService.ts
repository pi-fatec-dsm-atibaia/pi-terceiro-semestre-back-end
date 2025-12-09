import formData from "form-data";
import Mailgun from "mailgun.js";

export class MailService {
    private mg;

    constructor() {
        const mailgun = new Mailgun(formData);

        this.mg = mailgun.client({
            username: "api",
            key: process.env.MAILGUN_API_KEY!,
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const domain = process.env.MAILGUN_DOMAIN!;
        
        const resetLink = `${process.env.FRONTEND_URL}/recuperacao-senha/mudar-senha?token=${token}`;

        return await this.mg.messages.create(domain, {
            from: process.env.MAILGUN_FROM!,
            to: email,
            subject: "Recuperação de Senha",
            html: `
                <h2>Recuperação de Senha</h2>
                <p>Clique no link abaixo para redefinir sua senha:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>Este link expira em 1 hora.</p>
            `,
        });
    }

    async sendEmployerToken(email: string, token: string) {
        const domain = process.env.MAILGUN_DOMAIN!;
        
        const url = `${process.env.FRONTEND_URL}/test/token=${token}`;

        return await this.mg.messages.create(domain, {
            from: process.env.MAILGUN_FROM!,
            to: email,
            subject: "Confirmação de estágio",
            html: `
                <h2>Recuperação de Senha</h2>
                <p>Clique no link abaixo para confirmar dados:</p>
                <a href="${url}">${url}</a>
                <p>Este link expira em 1 hora.</p>
            `,
        });
    }
}