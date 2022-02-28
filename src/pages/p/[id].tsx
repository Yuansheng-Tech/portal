import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import dayjs from 'dayjs';

import { pageAPI, getPageData, getAllSideData } from '@/api/data';
import { useFetcher } from '@/api/fetcher';
import Layout from '@/components/layout/layout';
import { Edit } from '@/components/common/edit';
import { IfallbackOptions } from '@/types/common';

export default function Article({ id, fallback }: IfallbackOptions & { id: string }) {
  if (!id) {
    return null
  }
  const { data: resuldData = {} } = useFetcher(pageAPI + id, {
    fallbackData: fallback[pageAPI + id]
  });
  return (
    <Layout>
      <Head>
        <title>{resuldData.name}</title>
      </Head>
      <main className="container mx-auto px-2 mt-16 md:mt-40 md:px-20 relative">
        <Edit url={`/app/pages/${resuldData.id}`} />
        <h2 className="text-2xl">{resuldData.name}</h2>
        {resuldData.updated_time && <div className="mt-4 mb-10">{dayjs(resuldData.updated_time).format('YYYY.MM.DD')}</div>}
        {/* https://rushgo.wiki/architecture/react-ssr-cannot-render-a-alone-dev-with-dangerouslySetInnerHTML/ */}
        <p>
          <p dangerouslySetInnerHTML={{
            __html: resuldData.data,
          }}></p>
        </p>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: {
      fallback: {
        ...await getAllSideData(),
        [pageAPI + query.id]: await getPageData(query.id)
      },
      id: query.id
    }
  }
}
