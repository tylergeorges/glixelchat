import { UserName } from "@ui";
import Link from "next/link";

interface PostProps {
  post: Glixel.Post;
  setCurrentPost: (post: Glixel.Post) => void;
}
export function Post({ post, setCurrentPost }: PostProps) {
  function setCurrentPostCB() {
    setCurrentPost(post);
  }
  return (
    <Link
      href={`/desktop?program=posts&post_id=${post.id}`}
      shallow={true}
      key={post.id}
      className="clickable posts-con  mb-5 mt-2 flex h-1/3  flex-col bg-lighter p-2 items-start text-left text-white"
      onClick={setCurrentPostCB}
    >
      <UserName user={post.author} date={post.createdAt} />
      <div className="h-full     ">
        <span className="text-xl line-clamp-4">{post.content}</span>
      </div>
    </Link>
  );
}
