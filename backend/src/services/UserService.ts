import prisma from "../config/prismaClient";
import supabase from "../config/supabaseClient";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

class UserService {
  public async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (err) {
      console.log("Error finding users: ", err);
      throw new Error("Could not find users");
    }
  }

  public async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (err) {
      console.log("Error finding user: ", err);
      throw new Error("Could not find user");
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (err) {
      console.log("Error finding user: ", err);
      throw new Error("Could not find user");
    }
  }

  public async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      return user;
    } catch (err) {
      console.log("Error finding user: ", err);
      throw new Error("Could not find user");
    }
  }

  public async updateUser(
    userId: number,
    data: { username?: string; email?: string; password?: string },
  ): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data,
      });
      return user;
    } catch (err) {
      console.log("Error finding user: ", err);
      throw new Error("Could not find user");
    }
  }

  public async deleteUser(userId: number): Promise<User> {
    try {
      const user = await prisma.user.delete({
        where: { id: userId },
      });
      return user;
    } catch (err) {
      console.log("Error finding user: ", err);
      throw new Error("Could not find user");
    }
  }

  public async uploadPhoto(userId: number, file: Express.Multer.File) {
    const { error } = await supabase.storage
      .from("avatars")
      .upload(`${userId}/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${userId}/${file.originalname}`);

    return prisma.user.update({
      where: { id: userId },
      data: { photo: data.publicUrl },
    });
  }
}

export default new UserService();
