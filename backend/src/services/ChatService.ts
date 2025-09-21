import { Server } from "socket.io";
import prisma from "../config/prismaClient";
import { Message, Room, User } from "@prisma/client";

export type MessageWithSender = Omit<Message, "sender"> & {
	sender: Pick<User, "username">;
};

class ChatService {
	private io?: Server;

	constructor(io?: Server) {
		if (io) this.io = io;
	}

	setIO(io: Server) {
		this.io = io;
	}

	async saveMessage(
		senderId: number,
		roomId: number,
		content: string,
	): Promise<MessageWithSender> {
		const message = await prisma.message.create({
			data: { senderId, roomId, content },
			include: { sender: { select: { username: true } } },
		});

		return message as MessageWithSender;
	}

	async getMessagesInRoom(
		roomId: number,
		limit = 50,
		offset = 0,
	): Promise<MessageWithSender[]> {
		const messages = await prisma.message.findMany({
			where: { roomId },
			orderBy: { timestamp: "asc" },
			include: { sender: { select: { username: true } } },
			take: limit,
			skip: offset,
		});

		return messages as MessageWithSender[];
	}

	broadcastMessage(roomId: string, message: MessageWithSender) {
		if (!this.io)
			return console.error("Socket.IO instance not set for ChatService");

		this.io.to(roomId).emit("chat:message", {
			id: message.id,
			roomId: message.roomId,
			content: message.content,
			senderId: message.senderId,
			username: message.sender.username,
			timestamp: message.timestamp,
			createdAt: message.createdAt,
		});
	}

	async createRoom(name: string, initialMemberIds: number[]): Promise<Room> {
		return prisma.room.create({
			data: {
				name,
				members: { connect: initialMemberIds.map((id) => ({ id })) },
			},
			include: { members: { select: { id: true, username: true } } },
		});
	}

	async addUserToRoom(roomId: number, userId: number): Promise<void> {
		await prisma.room.update({
			where: { id: roomId },
			data: { members: { connect: { id: userId } } },
		});
	}

	async removeUserFromRoom(roomId: number, userId: number): Promise<void> {
		await prisma.room.update({
			where: { id: roomId },
			data: { members: { disconnect: { id: userId } } },
		});
	}
}

export default new ChatService();
