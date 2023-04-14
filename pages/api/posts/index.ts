import { Post, PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

type PostBody = {
  authorId: string;
  content: string;
};

export type PostResponse = {
  author: User;
  id: string;
  createdAt: Date;
  content: string;
  authorId: string;
};
export type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse[] | PostResponse | ErrorResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  console.log("handler  SEssion: ", session);
  if (req.method === "GET") {
    const found_posts = await prisma.post.findMany({
      take: 100,
    });

    const users =  found_posts.map(async (post) => {
      return {
        author: await prisma.user.findFirst({
          where: {
            id: post.authorId,
          },
        }),
      };
    });

    const posts = users.map((user) => )

    return res.status(200).json(posts);
    // res.json({ posts });
  }

  if (req.method === "POST") {
    const post_body = JSON.parse(req.body) as PostBody;

    console.log("POST BODY: ", post_body);
    const created_post = await prisma.post.create({
      data: {
        authorId: post_body.authorId,
        content: post_body.content,
      },
    });

    const author = await prisma.user.findUnique({
      where: {
        id: created_post.authorId,
      },
    });

    if (author) {
      const post = { ...created_post, author: author };

      return res.status(201).json(post);
    } else {
      return res
        .status(400)
        .json({ message: "Author could not be found for new post." });
    }
  }
}
