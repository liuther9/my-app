import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import styles from './about.module.scss'

const Map = dynamic(() => import('components/Map'), {ssr: false})

const About: NextPage = () => {

	return <main className={styles.container}>
		<h1>РАБОЧИЕ ЧАСЫ И ЛОКАЦИЯ</h1>
		<a href='https://go.2gis.com/gwb330' target='_blank' rel="noopener noreferrer" className={styles.location}>​Әлихан Бөкейхан 27/4, Есиль район, Нур-Султан</a>
		<p className={styles.work_hours}>Сб-Вс: 9:30 - 22:00</p>
		<p className={styles.work_hours}>Пн-Пт: 8:00 - 22:00</p>
		<br />
		<div className={styles.map_container}>
			<Map />
		</div>
	</main>
}

export default About
