import { footerGovLinkApi, footerLinkApi, logoApi } from '@/api/data';
import { useFetcher } from '@/api/fetcher';
import { Edit } from '@/components/common/edit';
import { IfallbackOptions, IPageConfigData } from  '@/types/common';;
import styles from './footer.module.scss'

export default function Footer({
  fallback
}: IfallbackOptions) {
  const { data: footerLinkData = [] } = useFetcher(footerLinkApi, {
    fallbackData: fallback[footerLinkApi]
  })
  const { data: footerGovLinkData = [] } = useFetcher(footerGovLinkApi, {
    fallbackData: fallback[footerGovLinkApi]
  })
  // const { cache } = useSWRConfig()
  // const solgen = cache.get(logoApi) || [{}]
  const slogen = fallback[logoApi] ? fallback[logoApi][0] : {} as IPageConfigData

  return (<div className={styles.footer}>
    <div className={styles.footer_inner}>
      <div className={styles.footer_desc}>
        <div className={styles.footer_logo}>
          <Edit filter="logo_slogen" />
          {slogen.desc}
        </div>
        <div className={styles.footer_main}>
          <p className={styles.footer_portal}>
            <Edit filter="logo_slogen" />
            ©2022 {slogen.name} {slogen.action}
          </p>
          <p className={styles.footer_icp}>
            <Edit filter="logo_slogen" />
            {footerGovLinkData.map((v: IPageConfigData, k: number) => (<><a key={k} target="_blank" className="normal" href={v.action}>{v.name}</a><br /></>))}
            {/* <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备06017533号-9</a>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402000846" target="_blank">
              沪公网安备 31010402000846号
            </a> */}
          </p>
          <p className={styles.footer_follow_us}>
            <Edit filter="logo_slogen" />
            {footerLinkData.map((v: IPageConfigData, k: number) => (<><a key={k} className="normal" href={v.action}>{v.name}</a></>))}
            {/* <a className="normal" href="https://www.mcdonalds.com.cn/page/Privacy-Policy">隐私政策</a><i></i>
            <a className="normal" href="https://www.mcdonalds.com.cn/page/McDonalds-Internet-Site-Terms-and-Conditions">使用条款</a>
            <a className="normal normal2" href="https://www.mcdonalds.com.cn/page/member-service-agreement">会员协议</a>
            <a className="normal" href="https://www.mcdonalds.com.cn/page/contact">联系我们</a> */}
            {/* <span>关注我们</span> */}
            {/* <a className="sns" onclick="$('.follow-box').show();" href="javascript:;"><i class="iconfont"></i></a>
            <a classNameclassName="sns" target="_blank" href="http://weibo.com/u/1947211342?topnav=1&amp;wvr=6&amp;topsug=1"><i class="iconfont"></i></a> */}
          </p>
          {/* <div className={styles.footer_back}>
            <a>回到顶部<i className="iconfont icon-narrow-top"></i></a>
          </div> */}
        </div>
      </div>
    </div>
  </div>)
}
