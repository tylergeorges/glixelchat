import { Post, PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type PostBody = {
  authorId: string;
  content: string;
};

export type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
  (Post & { author: User }) | ErrorResponse
  >
) {
  if (req.method === "POST") {
    const post_body = JSON.parse(req.body) as PostBody;

    console.log("POST BODY: ", post_body);
    const post = await prisma.post.create({
      data: {
        authorId: post_body.authorId,
        content: post_body.content,
      },
      include: {
        author: true,
      },
    });

    console.log("POST CREATED: ", post);
    return res.status(201).json(post);
  }
}
