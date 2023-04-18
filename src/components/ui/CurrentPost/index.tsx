/** Current post being viewed. */
export function CurrentPost({ post }: { post: Glixel.Post }) {
  return (
    <div>
      <div>
        <h3 className="username text-2xl">{post.author.username}</h3>
      </div>
      <div className="h-full     ">
        <span className="text-xl line-clamp-4">{post.content}</span>
      </div>
      <div className="w-full  text-left">
        <span className="h-10 ">{post.createdAt}</span>
      </div>
    </div>
  );
}
