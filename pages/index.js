import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import IndexQuestionList from "../components/indexQuestionList";

export default function Home({ allPosts }) {
  return (
    <Layout>
      <IndexQuestionList posts={allPosts}></IndexQuestionList>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "excerpt"]);

  return {
    props: { allPosts: allPosts },
  };
}
