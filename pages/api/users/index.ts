import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

type UserBody = {
  email: string;
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  if (req.method === "GET") {
    const email = req.query.email;

    if (!email)
      return res
        .status(400)
        .json({ message: "Error fetching user, no email was provided." });

    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(400)
        .json({ message: `[ERROR] User with email ${email} does not exist.` });
    }
  }
  if (req.method === "POST") {
    const user = JSON.parse(req.body) as UserBody;


    const user_exists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!user_exists) {
      const new_user = await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
        },
      });

      return res.status(201).json(new_user);
    } else {
      return res.status(400).json({ message: "user exists" });
    }
  }
}
