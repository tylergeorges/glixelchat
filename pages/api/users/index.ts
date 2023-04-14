import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

type UserBody = {
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  if (req.method === "GET") {
    const username = req.query.username;

    if (!username)
      return res
        .status(400)
        .json({ message: "Error fetching user, no username was provided." });

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(400)
        .json({ message: `[ERROR] User ${username} does not exist.` });
    }
  }
  if (req.method === "POST") {
    const user = JSON.parse(req.body) as UserBody;

    const user_exists = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    if (!user_exists) {
      const new_user = await prisma.user.create({
        data: {
          username: user.username,
        },
      });

      return res.status(201).json(new_user);
    } else {
      return res.status(400).json({ message: "user exists" });
    }
  }
}
