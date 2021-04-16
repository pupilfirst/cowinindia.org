import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import ShowPost from "../../components/showPost";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Post({ post }) {
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

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.locale, params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      locale: params.locale,
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  const paths = [];

  posts.map((p) => {
    p.posts.map((post) => {
      paths.push({
        params: {
          locale: p.locale,
          slug: post.slug.split("/"),
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}
