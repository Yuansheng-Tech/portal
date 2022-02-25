import dayjs from 'dayjs'
import styles from './card.module.scss'

export default function({
  data,
  children = null
}) {
  return (<div className={styles.card_three}>
    {data.banner && <img
      src={data.banner || ''}
      alt={data.name}
      width="100%"
      height="100%"
      className={styles.card_three_img}
    />}
    {!data.banner && <div className={styles.card_three_desc}>
      <div className={styles.card_three_title}>{data.name}</div>
      <div className={styles.card_three_time}>{dayjs(data.updated_time).format('YYYY.MM.DD')}</div>
    </div>}
  </div>);
}