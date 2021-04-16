import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import IndexQuestionList from "../components/indexQuestionList";
import { useRouter } from "next/router";

export default function Home({ allPosts, locale, locales }) {
  const router = useRouter();
  console.log(router.locale);
  return (
    <Layout>
      <IndexQuestionList posts={allPosts}></IndexQuestionList>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "excerpt"]);

  return {
    props: { allPosts: allPosts, locale },
  };
}
