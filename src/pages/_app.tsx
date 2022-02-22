import Head from 'next/head'

import MainView from '../components/common/layout/MainView';
import NavHeader from '../components/nav/nav.header';
import NavSide from '../components/nav/nav.side';
import Footer from '../components/footer/footer';
import '../../styles/global.scss';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="https://admin.yuanshengyoupin.com/logo.png" />
      <script src="//at.alicdn.com/t/font_3189071_pha284yzpo9.js"></script>
      {/* <style type="text/css" src="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css"></style> */}
    </Head>
    <NavHeader />
    <NavSide />
    <MainView>
      <Component {...pageProps} />
    </MainView>
    <Footer />
    </>
}