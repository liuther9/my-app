import { useRouter } from 'next/router'
import Link from 'next/link'
import s from './header.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/NOOTS-logos/noots_main_logo.png'

const Header:React.FC = () => {
	const [menuActive, setMenuActive] = useState(false)
  const [small, setSmall] = useState(false);

	const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
			const handleScroll = () => setSmall(window.pageYOffset > 50)
			window.addEventListener("scroll", handleScroll)

			const handleRouteChange = () => setMenuActive(false)
			router.events.on('routeChangeComplete', handleRouteChange)

			return () => {
				window.removeEventListener("scroll", handleScroll)
				router.events.off("routeChangeComplete", handleRouteChange)
			}
		}
  }, []);

	return <header className={!small ? s.header : `${s.header} ${s.header_small}`}>
			<Link href='/' passHref={true}>
				<div className={s.logo}>
					<Image src={logo} className={s.logo_icon} layout='fill' objectFit='contain' alt='NOOTS'/>
				</div>
			</Link>
		<div className={!menuActive ? s.burger_btn : `${s.burger_btn} ${s.active}`} onClick={() => setMenuActive(!menuActive)}>
			<i />
		</div>
		<nav className={!menuActive ? s.links : `${s.links} ${s.show}`}>
			<div className={s.burger_btn_dropdown}>
				<div className={!menuActive ? s.burger_btn : `${s.burger_btn} ${s.active}`} onClick={() => setMenuActive(!menuActive)}>
					<i />
				</div>
			</div>
			<Link href='/'>Меню</Link>
			<Link href='/about'>О нас</Link>
			<Link href='/contacts'>Контакты</Link>
			<Link href='/delivery'>Доставка</Link>
		</nav>
	</header>
}

export default Header
