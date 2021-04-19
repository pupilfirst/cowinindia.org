import Link from "next/link";

function getCategories(posts) {
  const categories = posts.map((post) => post.slug.split("/")[0]);
  return [...new Set(categories)];
}

function getPostsByCategories(category, posts) {
  return posts.filter((post) => post.slug.split("/")[0] == category);
}

export default function IndexQuestionList({ posts, locale }) {
  return (
    <div className="mx-auto container max-w-4xl px-6">
      {getCategories(posts).map((category) => (
        <div>
          <div>{category.split("-").join(" ")}</div>
          {getPostsByCategories(category, posts).map((post) => (
            <Link
              key={post.slug}
              as={`${locale}/${post.slug}`}
              href="[locale]/[...slug]"
            >
              <div className="mt-2 rounded bg-white p-4 shadow-md cursor-pointer">
                <a className="text-indigo-800 font-semibold text-xl">
                  {post.title}
                </a>
                <div className="text-gray-600">{post.excerpt}</div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
