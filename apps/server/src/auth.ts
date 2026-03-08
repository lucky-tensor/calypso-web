import { Context, Next } from 'hono';
import { sign, verify } from 'hono/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'calypso-elite-secret';

/**
 * Auth Service
 * Minimalist JWT implementation as per Calypso Blueprint.
 */
export const AuthService = {
    generateToken: async (userId: string) => {
        return await sign({ sub: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, JWT_SECRET, 'HS256');
    },


    middleware: async (c: Context, next: Next) => {
        const token = c.req.header('Authorization')?.split(' ')[1];
        if (!token) return c.json({ error: 'Unauthorized' }, 401);

        try {
            const payload = await verify(token, JWT_SECRET, 'HS256');
            c.set('userId', payload.sub as string);
            await next();
        } catch (e) {

            return c.json({ error: 'Invalid Token' }, 401);
        }
    }
};
