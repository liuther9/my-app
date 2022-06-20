import { useEffect, useRef } from 'react'
import DG from '2gis-maps'
import s from './map.module.scss'

const Map = () => {
	const map = useRef<any>(null)
	
	useEffect(() => {
		map.current = DG.map('map', {
			'center': [51.084242, 71.428507],
			'zoom': 15
		});
		DG.marker([51.084242, 71.428507]).addTo(map.current);
    return () => map.current.remove()
	}, [])
	
	return <div className={s.wrapper}>
		<div id='map' />
	</div>
}

export default Map