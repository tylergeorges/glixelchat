import { Post, User } from "@prisma/client";

const isDev = process.env.NODE_ENV !== "production";

const base_url = isDev
  ? "http://localhost:3000/api"
  : "glixelchat.vercel.app/api";

interface ApiResponseError {
  message: string;
}

interface Paths {
  "/posts": {
    post: (post_body: {
      authorId: string;
      content: string;
      queryParams?: string;
    }) => Promise<Glixel.Post | ApiResponseError>;
  };
  "/users": {
    post: (post_body: {
      username: string;
      email: string;
      queryParams?: string;
    }) => Promise<User | ApiResponseError>;
    get: (params: { queryParams?: string }) => Promise<User | ApiResponseError>;
  };
  "/users/:user_id/feed": {
    get: (params: {
      user_id: string;
      queryParams?: string;
    }) => Promise<Glixel.Post[] | ApiResponseError>;
  };
  "/users/:user_id/posts": {
    get: (params: {
      user_id: string;
      queryParams?: string;
    }) => Promise<Glixel.Post[] | ApiResponseError>;
  };
}

async function post<R, PostBody = unknown>(
  path: keyof Paths,
  post_body: PostBody
): Promise<R> {
  const res = await fetch(base_url + path, {
    method: "POST",
    body: JSON.stringify(post_body),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json().catch((err) => ({ message: err.message })) as R;
}
async function get<R>(path: keyof Paths): Promise<R> {
  const res = await fetch(base_url + path);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json().catch((err) => ({ message: err.message })) as R;
}

const paths: Paths = {
  "/posts": {
    post: async ({ authorId, content, queryParams }) => {
      const path = queryParams ? `/posts${queryParams}` : "/posts";

      const data = await post<Post>(path, {
        authorId,
        content,
      })
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },
  "/users": {
    post: async ({ username, email, queryParams }) => {
      console.log("");
      const path = queryParams ? `/users${queryParams}` : "/users";
      const data = await post<User>(path, { email, username })
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
    get: async ({ queryParams }) => {
      const path = queryParams ? `/users${queryParams}` : "/users";
      const data = await get<User>(path)
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },

  "/users/:user_id/feed": {
    get: async ({ user_id, queryParams }) => {
      const path = queryParams
        ? `/users/${user_id}/feed${queryParams}`
        : `/users/${user_id}/feed`;

      const data = await get<Post[]>(path)
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },

  "/users/:user_id/posts": {
    get: async ({ user_id, queryParams }) => {
      const path = queryParams
        ? `/users/${user_id}/posts${queryParams}`
        : `/users/${user_id}/posts`;

      const data = await get<Post[]>(path)
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },
};

export function glixelApi<Path extends keyof Paths>(path: Path): Paths[Path] {
  return paths[path];
}
