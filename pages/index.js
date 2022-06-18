import Head from 'next/head';
import Main from '../src/components/Main';
import axios from 'axios';
export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Main categories={categories} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.get('https://opentdb.com/api_category.php');
  const categories = res.data.trivia_categories;
  return {
    props: {
      categories,
    },
  };
}
