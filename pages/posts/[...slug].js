import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import ShowPost from "../../components/showPost";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Post({ post, locale, locales }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <ShowPost post={post}></ShowPost>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, locales }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
      locale,
      locales,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  const posts = getAllPosts(["slug"]);

  posts.forEach((post) => {
    locales.forEach((locale) =>
      paths.push({ params: { slug: post.slug }, locale })
    );
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}
