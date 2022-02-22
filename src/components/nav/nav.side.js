// import Image from "next/image"
import classnames from "classnames"

import styles from './nav.side.module.scss'

import { navData } from './nav.side.data'

export default function({
  children
}) {
  return (<div className={styles.nav_side}>
      {navData.map((v, k) => {
        return <div className={styles.nav_item} key={k}>
          <div className={styles.nav_item_title}>
            {/* <Image
              className={styles.nav_item_icon}
              src="https://admin.yuanshengyoupin.com/logo.png"
              alt="logo"
              width="28px"
              height="28px"
            /> */}
            {/* <i
              className={classnames({
                iconfont: true,
                [v.icon]: true
              })}></i> */}
            <svg className="icon2" aria-hidden="true">
                <use xlinkHref={"#"+v.icon}></use>
            </svg>
            <div className={styles.nav_item_title}>{v.title}</div>
          </div>
          {/\.png/.test(v.url) && <img src={v.url} className={styles.nav_item_hover_img} />}
        </div>
      })}
  </div>)
}