export default function ShowPost({ post }) {
  return (
    <div className="mx-auto container max-w-4xl px-6">
      <div className="mt-2 rounded bg-white p-4 shadow-md">
        <div className="text-indigo-800 font-semibold text-xl">
          {post.title}
        </div>
        <div
          className="text-gray-600 prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
