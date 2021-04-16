import Layout from "../components/layout";
import { getAllPostsByLocale, getAllLocales } from "../lib/api";
import IndexQuestionList from "../components/indexQuestionList";

export default function Home({ allPosts, locale }) {
  return (
    <Layout>
      <IndexQuestionList posts={allPosts} locale={locale}></IndexQuestionList>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPostsByLocale(params.locale, [
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
  ]);

  return {
    props: { allPosts: allPosts, locale: params.locale },
  };
}

export async function getStaticPaths() {
  const locales = getAllLocales();

  const paths = [];

  locales.map((locale) => {
    paths.push({
      params: {
        locale: locale,
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}
