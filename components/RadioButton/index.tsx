import s from './radiobutton.module.scss'

type Props = {
	value?: boolean,
	label: string,
	name: string,
	onChange: any,
}

const RadioButton:React.FC<Props> = ({ name, label, value, onChange }) => {
	return <label className={s.container}>
		<input type='radio' name={name} checked={value ? value : false} onChange={onChange}/>
		{label}
		<span className={s.checkmark}></span>
	</label>
}

export default RadioButton
