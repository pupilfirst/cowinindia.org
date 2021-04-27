export default function ShowPost({ post }) {
  return (
    <div className="mx-auto container max-w-4xl py-2 md:py-5 prose lg:prose-lg">
      <div className="rounded bg-white px-4 md:px-10 py-1 md:shadow">
        <h2>{post.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
