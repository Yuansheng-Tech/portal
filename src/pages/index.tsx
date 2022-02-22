import Head from 'next/head';
import Layout from '../components/common/layout/layout';
import CardOne from '../components/card/card.one';
import CardTwo from '../components/card/card.two';
import CardThree from '../components/card/card.three';

export default function Home() {
  return (
    <Layout className="container">
      <Head>
        <title>原生优品官网加盟</title>
      </Head>

      <main>
        {new Array(20).fill(1).map((v, k) => {
          return <div key={k}>
            {Math.round(Math.random()*10)%3 === 0 && <CardOne />}
            {Math.round(Math.random()*10)%3 === 1 && <CardTwo />}
            {Math.round(Math.random()*10)%3 === 2 && <CardThree />}
          </div>
        })}
      </main>
    </Layout>
  )
}
