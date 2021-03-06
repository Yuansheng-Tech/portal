import Head from 'next/head';
import Layout from '@/components/layout/layout';
import { renderMap } from '@/components/card/index';

import {   getAllSideData, getIndexData, indexDataApi, logoApi } from '@/api/data';
import { useFetcher } from '@/api/fetcher';
import { Edit } from '@/components/common/edit';
import { IfallbackOptions } from '@/types/common';

export default function Home({ fallback }: IfallbackOptions) {
  const { data: resuldData = [] } = useFetcher(indexDataApi, { fallbackData: fallback[indexDataApi]  });
  const logoData = fallback[logoApi]
  return (
    <Layout>
      <Head>
        {logoData && <title>{logoData[0]?.name} - {logoData[0]?.desc}</title>}
      </Head>

      <main className="container mx-auto px-2 md:px-20 mt-12 md:mt-32 relative">
        <Edit url="/app/pages" />
        {renderMap(resuldData)}
      </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  return {
      props: {
        fallback: {
          [indexDataApi]: await getIndexData(),
          ...await getAllSideData()
        }
      }
  }
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       fallback: {
//         [indexDataApi]: await getIndexData(),
//         ...await getAllSideData()
//       }
//     }
//   }
// }