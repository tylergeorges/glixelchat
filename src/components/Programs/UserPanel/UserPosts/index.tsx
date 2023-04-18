export function UserPosts({ posts }: { posts: Glixel.Post[] }) {
  return (
    <div className="overflow-y-auto">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="clickable posts-con  my-5 flex   flex-col      bg-lighter p-2 text-left text-white"
          >
            <div>
              <h3 className="username text-2xl">{post.author.username}</h3>
            </div>
            <div className="h-full     ">
              <span className="text-md line-clamp-2">{post.content}</span>
            </div>
            <div className="h-9 w-full  text-left">
              <span className="h-10 ">{post.createdAt}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
