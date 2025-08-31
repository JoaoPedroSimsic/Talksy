import { Request } from 'express';

interface AuthRequest extends Request {
	userId?: number;
	userEmail?: string;
	skipAuth?: boolean;
}

export default AuthRequest;
