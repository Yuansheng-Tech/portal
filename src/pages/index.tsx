import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/common/layout/layout';
// import CardOne from '../components/card/card.one';
// import CardTwo from '../components/card/card.two';
// import CardThree from '../components/card/card.three';
import useFetchData from '../components/common/hooks/useFetchData';

import { renderMap } from '../components/card/index'

import { appId } from '../api/base';

export default function Home() {
  const { data = {}, loading, error } = useFetchData('/app/pages', {
    query: {
      where: JSON.stringify({
        wechat: {
          id: appId,
        },
        type: 'richtext'
      })
    }
  });
  const { data: resuldData = [] } = data;

  console.log('data, loading, error', data, loading, error);
  return (
    <Layout className="container">
      <Head>
        <title>原生优品官网</title>
      </Head>

      <main>
        {renderMap(resuldData)}
          {/* {resuldData.map((v, k) => {
            const roundNum = Math.round(Math.random() * 10) % 3;
            const num = k % 3;
            return <>
              {num === 0 && <Link key={k} href={`/p/${v.id}`}><a><CardOne data={v} /></a></Link>}
              {num === 1 && <Link key={k} href={`/p/${v.id}`}><a><CardTwo data={v} /></a></Link>}
              {num === 2 && <Link key={k} href={`/p/${v.id}`}><a><CardThree data={v} /></a></Link>}
            </>
          })} */}
      </main>
    </Layout>
  )
}
