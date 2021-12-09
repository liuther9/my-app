import type { NextPage } from 'next'
import styles from './about.module.scss'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

const About: NextPage = () => {
	return <div className={styles.container}>
		<h1>РАБОЧИЕ ЧАСЫ И ЛОКАЦИЯ</h1>
		<div className={styles.location}>​Әлихан Бөкейхан 27/4, Есиль район, Нур-Султан</div>
		<div className={styles.work_hours}>Сб-Вс: 9:30 - 22:00</div>
		<div className={styles.work_hours}>Пн-Пт: 8:00 - 22:00</div>
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
	</div>
}

export default About
