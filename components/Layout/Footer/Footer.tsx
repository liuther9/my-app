import styles from './footer.module.scss'
import Image from 'next/image'

const Footer: React.FC = () => {
	return <footer className={styles.footer}>
		<div className={styles.location}>​Әлихан Бөкейхан 27/4, Нур-Султан</div>
		<a href={'https://www.instagram.com/nootskz/'} target='_blank' rel="noopener noreferrer">
			<Image
				alt=''
				src={'/instagram.svg'}
				width={25} height={25}
				className={styles.instagram}
			/>
		</a>
	</footer>
}

export default Footer
