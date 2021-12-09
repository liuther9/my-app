import { useRouter } from 'next/router'
import Link from 'next/link'
import s from './header.module.scss'
import { useEffect, useState } from 'react'

const Header:React.FC = () => {
  const [small, setSmall] = useState(false);
	const router = useRouter()
	
  useEffect(() => {
    if (typeof window !== "undefined") {
			const handleScroll = () => setSmall(window.pageYOffset > 50)
			window.addEventListener("scroll", handleScroll)

			return () => window.removeEventListener("scroll", handleScroll)
		}
  }, []);

	return <header className={!small ? s.header : s.header + ' ' + s.header_small}>
		<h1 onClick={() => router.push('/')}>NOOTS</h1>
		<div className={s.links}>
			<Link href='/about'>О нас</Link>
			<Link href='/contacts'>Контакты</Link>
		</div>
	</header>
}

export default Header
