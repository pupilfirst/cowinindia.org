import Link from "next/link";

export default function IndexQuestionList({ posts }) {
  console.log(posts[0]);
  return (
    <div className="mx-auto container max-w-4xl px-6">
      {posts.map((post) => (
        <Link key={post.slug} as={`/posts/${post.slug}`} href="/posts/[slug]">
          <div className="mt-2 rounded bg-white p-4 shadow-md cursor-pointer">
            <a className="text-indigo-800 font-semibold text-xl">
              {post.title}
            </a>
            <div className="text-gray-600">{post.excerpt}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
