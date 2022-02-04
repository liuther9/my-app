
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { supabase } from '../../utils/supabaseClient'
import s from './ordernavigationbar.module.scss'

type Props = {
	pageSwitched: boolean,
	setPageSwitched: (i: boolean) => void,
	nextButtonAction: () => void,
}

const OrderNavigationBar:React.FC<Props> = ({ pageSwitched, setPageSwitched, nextButtonAction }) => {
	return <div className={s.wrapper}>
		<button onClick={() => setPageSwitched(false)} disabled={pageSwitched === false}><MdArrowBackIos />Назад</button>
		<button onClick={nextButtonAction}>{pageSwitched === false ? 'Далее' : 'Заказать'}<MdArrowForwardIos /></button>
	</div>
}

export default OrderNavigationBar
