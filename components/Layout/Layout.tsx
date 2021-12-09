import Footer from './Footer'
import Header from './Header'
import s from './layout.module.scss'

interface Type {
	children: React.ReactNode,
}

const Layout:React.FC<Type> = ({children}) => {

	return <div className={s.wrapper}>
			<Header />
			<div className={s.container}>
				{children}
			</div>
			<Footer />
		</div>
}

export default Layout
