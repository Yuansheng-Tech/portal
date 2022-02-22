import Image from 'next/image'
import styles from './card.module.scss'

export default function({
  children
}) {
  return (<div className={styles.card_three}>
    <img
      src="https://admin.yuanshengyoupin.com/logo.png"
      alt=""
      width="100%"
      height="100%"
      className={styles.card_three_img}
    />
    <div className={styles.card_three_desc}>
      <div className={styles.card_three_title}>title</div>
      <div className={styles.card_three_time}>time</div>
    </div>
  </div>);
}