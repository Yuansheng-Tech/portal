import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import dayjs from 'dayjs';

import { pageAPI, getPageData, getAllSideData } from '@/api/data';
import { useFetcher } from '@/api/fetcher';

import Layout from '@/components/layout/layout';
import { Edit } from '@/components/common/edit';

import styles from './p.module.scss';
import { IfallbackOptions } from '@/types/common';

export default function Article({ id, fallback }: IfallbackOptions) {
  if (!id) {
    return null
  }
  const { data: resuldData = {}, error } = useFetcher(pageAPI+id, {
    fallbackData: fallback[pageAPI+id]
  });
  return (
    <Layout>
      <Head>
        <title>{resuldData.name}</title>
      </Head>
      <main>
        <Edit url={`/app/pages/${resuldData.id}`} />
        <h2 className={styles.article_h2}>{resuldData.name}</h2>
        {resuldData.updated_time && <time className={styles.article_time}>{dayjs(resuldData.updated_time).format('YYYY.MM.DD')}</time>}
        {/* https://rushgo.wiki/architecture/react-ssr-cannot-render-a-alone-dev-with-dangerouslySetInnerHTML/ */}
        <p><p dangerouslySetInnerHTML={{
          __html: resuldData.data,
        }}></p></p>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: {
      fallback: {
        ...await getAllSideData(),
        [pageAPI+query.id]: await getPageData(query.id)
      },
      id: query.id
    }
  }
}
