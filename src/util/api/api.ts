import { User } from "@prisma/client";
import { ApiResponseError, Paths } from "src/util/api/api.types";
import { get, post } from "src/util/api/methods";

const paths: Paths = {
  "/posts": {
    post: async ({ authorId, content, queryParams }) => {
      const data = await post<Glixel.Post>(
        "/posts",
        {
          authorId,
          content,
        },
        queryParams
      )
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },
  "/users": {
    post: async ({ username, email, queryParams }) => {
      const data = await post<User>("/users", { email, username }, queryParams)
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
    get: async ({ queryParams }) => {
      const data = await get<User, "/users">("/users", queryParams)
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },

  "/users/:user_id/feed": {
    get: async ({ user_id, queryParams }) => {
      const data = await get<Glixel.Post[], "/users/:user_id/feed">(
        `/users/${user_id}/feed`,
        queryParams
      )
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },

  "/users/:user_id/posts": {
    get: async ({ user_id, queryParams }) => {
      const data = await get<Glixel.Post[], "/users/:user_id/posts">(
        `/users/${user_id}/posts`,
        queryParams
      )
        .then((data) => data)
        .catch((err) => ({ message: err.message } as ApiResponseError));

      return data;
    },
  },
};

/** Wrapper for all requests to the glixel api. */
export function glixelApi<Path extends keyof Paths>(path: Path): Paths[Path] {
  return paths[path];
}
