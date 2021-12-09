import { useState } from 'react'
import s from './headersearch.module.scss'

type Props = {
	dark: boolean,
}

const HeaderSearch:React.FC<Props> = ({ dark }) => {
	const [value, setValue] = useState<string>('')

	return <input
		autoCorrect='off'
		spellCheck={false}
		className={!dark ? s.input : s.input + ' ' + s.dark}
		value={value}
		onChange={e => setValue(e.target.value)}
	/>
}

export default HeaderSearch
