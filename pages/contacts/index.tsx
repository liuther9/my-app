import type { NextPage } from 'next'
import styles from './contacts.module.scss'

const Contacts: NextPage = () => {
	return <div className={styles.contacts}>
		<div className={styles.phone}>
			Телефон: 
			<span 
				onClick={() => {
					if (typeof window !== "undefined") window.open('tel:+7(707)3266060')
				}}
			>+7(705)3266060</span>
		</div>
	</div>
}

export default Contacts
