import Head from 'next/head';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import MainView from '@/components/layout/MainView';
import NavHeader from '@/components/header/nav.header';
import NavSide from '@/components/nav/nav.side';
import Footer from '@/components/footer/footer';
import fetcher from '@/api/fetcher';
import { logoApi } from '@/api/data';
import '@/styles/global.scss';

export default function App({
  Component,
  pageProps
}: AppProps) {
  const { fallback = {} } = pageProps
  const slogen = fallback[logoApi] ? fallback[logoApi][0] : {}
  return (
  <SWRConfig value={{
    provider: () => new Map(),
    fetcher: fetcher,
  }}>
    <>
    <Head>
      <link rel="icon" href={slogen.icon} />
      <meta id="viewport" name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
      {/* <script src="//at.alicdn.com/t/font_3189071_pha284yzpo9.js"></script> */}
      {/* <style type="text/css" src="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css"></style> */}
    </Head>
    <NavHeader fallback={fallback} />
    <NavSide fallback={fallback} />
    <MainView>
      <Component {...pageProps} />
    </MainView>
    <Footer fallback={fallback}/>
    </>
    </SWRConfig>
  )
}
