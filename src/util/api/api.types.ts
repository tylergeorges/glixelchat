import { User } from "@prisma/client";

export interface ApiResponseError {
  message: string;
}

export type PathParams<TPath extends string> =
  TPath extends `/${infer Head}/:${infer Param}/${infer Tail}` ? string : TPath;

export type ArgPath<T extends string> = T extends keyof Paths
  ? PathParams<T>
  : never;

export interface Paths {
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

export type Path = keyof Paths;

// export type Path = <TPath extends keyof Paths>(
//   path: TPath,
//   ...pathParam: PathParam<TPath>
// ) => void;
