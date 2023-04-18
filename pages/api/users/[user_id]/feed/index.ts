import { Post, PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | { message: string }>
) {
  if (req.method === "GET") {
    const { user_id } = req.query;

    if (!user_id)
      return res.status(400).json({
        message: "Error fetching feed for user, no user_id was provided.",
      });

    const posts = await prisma.post.findMany({
      where: {
        authorId: user_id as string,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return res.status(200).json(posts);
  }
}
