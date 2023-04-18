import Link from "next/link";
import { useCallback } from "react";
import { setCurrentProfile } from "@mainslice";
import { useAppDispatch } from "@hooks";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { glixelApi } from "@util";
import { User } from "@prisma/client";
dayjs.extend(relativeTime);

interface UsernameProps {
  user: User;
  date: string;
}

function convertDate(date: string) {
  return dayjs(date).fromNow();
}

export function UserName({ user, date }: UsernameProps) {
  const dispatch = useAppDispatch();

  const handleUsernameClick = useCallback(
    async function () {
      const get_users_posts = (await glixelApi("/users/:user_id/posts").get({
        user_id: user.id,
      })) as Glixel.Post[];

      dispatch(setCurrentProfile({ posts: get_users_posts, user: user }));
    },
    [user, dispatch]
  );
  return (
    <span className="  w-full flex items-center mb-2">
      <Link
        href={`/desktop?program=user_profile&user=${user.username}`}
        className="mr-2 clickable  "
        shallow={true}
        onClick={handleUsernameClick}
      >
        <h3 className="username text-4xl">{user.username}</h3>
      </Link>
      <span className="text-white text-lg">
      {/* {`[${convertDate(date)}]`} */}
      {` ▪ ${convertDate(date)}`}

      </span>
    </span>
  );
}
