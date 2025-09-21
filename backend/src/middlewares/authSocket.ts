import { Socket } from "socket.io";
import { ExtendedError } from "socket.io";
import verifyToken from "../utils/verifyToken";
import "../types/socket";

type SocketAuthMiddleware = (
	socket: Socket,
	next: (err?: ExtendedError) => void,
) => void;

export const authSocket: SocketAuthMiddleware = async (socket, next) => {
	const token = socket.handshake.auth?.token;

	if (!token) {
		return next(new Error("Authentication error: Token missing"));
	}

	try {
		const user = await verifyToken(token);

		socket.userId = user.id;
		socket.userEmail = user.email;
		socket.username = user.username;

		next();
	} catch (err) {
		console.error(
			"Socket authentication error:",
			err instanceof Error ? err.message : err,
		);
		if (err instanceof Error) {
			switch (err.message) {
				case "Token Expired":
					return next(new Error("Authentication error: Token expired"));
				case "Invalid Token":
					return next(new Error("Authentication error: Invalid token"));
				case "Invalid User":
					return next(new Error("Authentication error: Invalid user"));
				default:
					return next(new Error("Authentication error"));
			}
		}
		next(new Error("Authentication error"));
	}
};
