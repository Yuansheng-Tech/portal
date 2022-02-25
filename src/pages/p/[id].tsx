import Head from 'next/head';
import dayjs from 'dayjs';
import Layout from '../../components/common/layout/layout';
import useFetchData from '../../components/common/hooks/useFetchData';

import styles from './p.module.scss';

function Article({ params }) {
  console.log('params', params);
  if (!params) {
    return null
  }
  const { data = {}, loading, error } = useFetchData(`/app/pages/${params.id}`);
  const { data: resuldData = [] } = data;
  console.log('data, loading, error', data, loading, error);
  return (
    <Layout className="container">
      <Head>
        <title>{resuldData.name}</title>
      </Head>
      <main>
        <h2 className={styles.article_h2}>{resuldData.name}</h2>
        <time className={styles.article_time}>{dayjs(resuldData.updated_time).format('YYYY.MM.DD')}</time>
        <p dangerouslySetInnerHTML={{
          __html: resuldData.data,
        }}></p>
      </main>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticPaths(params) {
  console.log('getStaticPaths', params)
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  console.log('getStaticProps', params)

  // Pass post data to the page via props
  return {
    props: { params },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

export default Article