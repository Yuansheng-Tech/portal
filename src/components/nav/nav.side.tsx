import Image from 'next/image';
import { rightSideDataApi } from '@/api/data';
import { useFetcher } from "@/api/fetcher";

import { Edit } from '@/components/common/edit';
import { IPageConfigData, IfallbackOptions } from '@/types/common';

import styles from './nav.side.module.scss';

export default function NavSide({
  fallback
}: IfallbackOptions) {
  const { data: resuldData = [], error } = useFetcher(rightSideDataApi, {
    fallbackData: fallback[rightSideDataApi]
  })
  if (!resuldData.length) return null
  
  return (<div className={styles.nav_side}>
      <Edit filter="right_side" />
      {resuldData.map((v: IPageConfigData, k: number) => {
        return <div className={styles.nav_item} key={k}>
          <div className={styles.nav_item_title}>
            <Image
              className={styles.nav_item_icon}
              src={v.icon}
              alt="logo"
              width="28px"
              height="28px"
            />
            <div className={styles.nav_item_title}>{v.name}</div>
          </div>
          {(() => {
            switch(v.action_type) {
              case 'qrcode':
                return <img src={v.action} className={styles.nav_item_hover_img} />;
                break;
              case 'phone':
                return <div className={styles.nav_item_hover_img}>{v.action}</div>;
            }
          })()}
        </div>
      })}
  </div>)
}