import { Server, Socket } from "socket.io";
import ChatService, { MessageWithSender } from "../services/ChatService";

interface ChatMessagePayload {
	roomId: string;
	content: string;
}

interface RoomJoinPayload {
	roomId: string;
}

interface SocketData {
	userId?: number;
	username?: string;
	userEmail?: string;
}

type AuthenticatedSocket = Socket & SocketData;

export const handleChat = (io: Server) => {
	io.on("connection", (socket: AuthenticatedSocket) => {
		console.log(`User connected: ${socket.userId} (${socket.username})`);

		socket.on("room:join", async ({ roomId }: RoomJoinPayload) => {
			try {
				await socket.join(roomId);
				console.log(`User ${socket.username} joined room: ${roomId}`);

				const messages = await ChatService.getMessagesInRoom(Number(roomId));
				socket.emit("chat:history", messages);
			} catch (err) {
				console.error(`Error joining room ${roomId}:`, err);
				socket.emit("error:room:join", "Failed to join room");
			}
		});

		socket.on("chat:message", async (payload: ChatMessagePayload) => {
			if (!socket.userId || !socket.username) {
				return socket.emit("error:chat:message", "Authentication required");
			}

			try {
				const savedMessage: MessageWithSender = await ChatService.saveMessage(
					socket.userId,
					Number(payload.roomId),
					payload.content,
				);

				ChatService.broadcastMessage(payload.roomId, savedMessage);
				console.log(
					`Message sent to room ${payload.roomId} by ${socket.username}: ${payload.content}`,
				);
			} catch (err) {
				console.error("Error saving/broadcasting message:", err);
				socket.emit("error:chat:message", "Failed to send message");
			}
		});

		socket.on("room:leave", async ({ roomId }: RoomJoinPayload) => {
			try {
				await socket.leave(roomId);
				console.log(`User ${socket.username} left room: ${roomId}`);
			} catch (err) {
				console.error(`Error leaving room ${roomId}:`, err);
				socket.emit("error:room:leave", "Failed to leave room");
			}
		});

		socket.on("disconnect", (reason) => {
			console.log(
				`User disconnected: ${socket.username ?? socket.id}, reason: ${reason}`,
			);
		});
	});
};
