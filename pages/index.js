import Layout from "../components/layout";
import { getAllPostsByLocale } from "../lib/api";
import IndexQuestionList from "../components/indexQuestionList";

export default function Home({ allPosts }) {
  return (
    <Layout>
      <IndexQuestionList posts={allPosts} locale={"en"}></IndexQuestionList>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPostsByLocale("en", [
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
  ]);

  return {
    props: { allPosts: allPosts },
  };
}
