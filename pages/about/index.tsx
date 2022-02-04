import type { NextPage } from 'next'
import styles from './about.module.scss'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

const About: NextPage = () => {
	return <main className={styles.container}>
		<h1>РАБОЧИЕ ЧАСЫ И ЛОКАЦИЯ</h1>
		<a href='https://go.2gis.com/gwb330' target='_blank' rel="noopener noreferrer" className={styles.location}>​Әлихан Бөкейхан 27/4, Есиль район, Нур-Султан</a>
		<p className={styles.work_hours}>Сб-Вс: 9:30 - 22:00</p>
		<p className={styles.work_hours}>Пн-Пт: 8:00 - 22:00</p>
		<br />
		<YMaps>
			<div className={styles.map_container}>
				<Map
					defaultState={{ center: [51.084267, 71.428432], zoom: 16, controls: ['zoomControl', 'fullscreenControl'] }}
					className={styles.map}
					modules={['control.ZoomControl', 'control.FullscreenControl']}
				>
    			<Placemark geometry={[51.084267, 71.428432]} />
				</Map>
			</div>
		</YMaps>
	</main>
}

export default About
