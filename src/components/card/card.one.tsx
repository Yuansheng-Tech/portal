import dayjs from 'dayjs'
import { IPageConfigData } from '@/types/common';
import styles from './card.module.scss'

export default function({
  data
}: { 
  data: IPageConfigData
}) {
  return (<div className={styles.card_one}>
    <img
      src={data.banner || ''}
      alt={''}
      width="100%"
      height="100%"
      className={styles.card_one_img}
    />
    <div className={styles.card_one_desc}>
      <div className={styles.card_one_title}>{data.name}</div>
      <div className={styles.card_one_time}>{dayjs(data.updated_time).format('YYYY.MM.DD')}</div>
    </div>
  </div>);
}