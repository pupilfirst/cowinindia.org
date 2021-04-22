export default function ShowPost({ post }) {
  return (
    <div className="mx-auto container max-w-4xl p-5 prose lg:prose-xl">
      <div className="mt-2 rounded bg-white p-10 shadow-md">
        <h2 className=" mb-5">{post.title}</h2>
        <div
          className="prose lg:prose-xl text-justify"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
