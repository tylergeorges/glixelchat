import { ArgPath, Path, Paths } from "src/util/api/api.types";

const isDev = process.env.NODE_ENV !== "production";

const base_url = isDev
  ? "http://localhost:3000/api"
  : "https://glixelchat.vercel.app/api";

export async function post<R, PostBody = unknown>(
  path: Path,
  post_body: PostBody,
  queryParams?: string
): Promise<R> {
  //!  If query params are provided
  const req_path = queryParams
    ? base_url + path + queryParams
    : base_url + path;

  const res = await fetch(req_path, {
    method: "POST",
    body: JSON.stringify(post_body),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json().catch((err) => ({ message: err.message })) as R;
}

export async function get<R, T extends keyof Paths, P = ArgPath<T>>(
  path: P,
  queryParams?: string
): Promise<R> {
  // ! if query params are provided
  const req_path = queryParams
    ? base_url + path + queryParams
    : base_url + path;

  const res = await fetch(req_path);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json().catch((err) => ({ message: err.message })) as R;
}
