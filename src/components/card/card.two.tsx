import dayjs from 'dayjs'
import { IPageConfigData } from '@/types/common';
import styles from './card.module.scss'

export default function({
  data
}: { 
  data: IPageConfigData
}) {
  return (<div className={styles.card_two}>
    {data.banner && <img
      src={data.banner || ''}
      alt={data.name}
      width="100%"
      height="100%"
      className={styles.card_two_img}
    />}
    <div className={styles.card_two_desc}>
      <div className={styles.card_two_title}>{data.name}</div>
      <div className={styles.card_two_time}>{dayjs(data.updated_time).format('YYYY.MM.DD')}</div>
    </div>
  </div>);
}