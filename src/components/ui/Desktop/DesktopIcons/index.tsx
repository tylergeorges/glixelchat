import { MessagesIcon, PostsIcon } from "@icons";

export function DesktopIcons({
  openPostsClick,
  openMessagesClick,
}: {
  openPostsClick: () => void;
  openMessagesClick: () => void;
}) {
  return (
    <div className="flex h-full w-full items-start justify-start p-4">
      <div className="flex h-1/6 items-center justify-center">
        <PostsIcon className="w-20" openPostsClick={openPostsClick} />
        <MessagesIcon className="w-16" openMessagesClick={openMessagesClick} />
      </div>
    </div>
  );
}
