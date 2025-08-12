import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";

import prisma from "../config/prismaClient";
import isValidPassword from "../utils/isValidPassword";
import handleError from "../utils/handleError";

const baseCookieOptions: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	path: "/",
};

class AuthController {
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, rememberMe } = req.body;

			if (!email || !password) {
				res.status(401).json({ errors: ["Missing credentials"] });
				return;
			}

			if (password.length < 6) {
				res
					.status(401)
					.json({ errors: ["Password must be at least 6 characters"] });
				return;
			}

			const user = await prisma.user.findUnique({ where: { email } });

			if (!user) {
				res.status(404).json({ errors: ["User not found"] });
				return;
			}

			if (!user || !(await isValidPassword(password, user.password))) {
				res.status(401).json({ errors: ["Email or password incorrect"] });
				return;
			}

			if (!process.env.JWT_SECRET) {
				throw new Error("JWT_SECRET not set");
			}

			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});

			const cookieOptions: CookieOptions = { ...baseCookieOptions };

			if (rememberMe) {
				cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
			}

			res.cookie("authToken", token, cookieOptions);
			res.status(200).json({ username: user.username, id: user.id, token });
		} catch (err) {
			handleError(err, res, "Error setting up auth Token");
		}
	}

	public logout(_req: Request, res: Response): void {
		const cookieOption: CookieOptions = {
			...baseCookieOptions,
			expires: new Date(0),
		};

		res.cookie("authToken", "", cookieOption);

		res.status(200).json({ message: "Logout successfully" });
	}
}

export default new AuthController();
