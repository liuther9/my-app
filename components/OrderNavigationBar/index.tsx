import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import s from './ordernavigationbar.module.scss'

type Props = {
	pageSwitched: boolean,
	setPageSwitched: (i: boolean) => void,
	nextButtonAction: () => void,
	addressSelected: boolean,
}

const OrderNavigationBar:React.FC<Props> = ({ pageSwitched, setPageSwitched, nextButtonAction, addressSelected }) => {
	return <div className={s.wrapper}>
		<button
			onClick={() => setPageSwitched(false)}
			disabled={pageSwitched === false}
		>
			<MdArrowBackIos />Назад
		</button>
		<button
			onClick={nextButtonAction}
			disabled={addressSelected === false}
		>
			{pageSwitched === false ? 'Далее' : 'Заказать'}<MdArrowForwardIos />
		</button>
	</div>
}

export default OrderNavigationBar
