import s from './addresslist.module.scss'
import RadioButton from "../../RadioButton"

type Props = {
	selectedRadio: string,
	data: {
		id: string,
		address: {
			street: string,
			building: string,
			appartment?: string,
		}
	}[],
	handleRadioChange: (item: string) => void,
}

const AddressList:React.FC<Props> = ({ selectedRadio, data, handleRadioChange }) => {
	return <div className={s.address_list}>
		<h3>Выберите адрес:</h3>
		{ data?.map((address: any) => 
			<div className={s.address_list_item} key={address.id}>
				<RadioButton
					label={`${address.address.street} ${address.address.building}, квартира ${address.address.appartment}`}
					value={selectedRadio === address.id}
					name='radio'
					onChange={() => handleRadioChange(address.id)}
				/>
			</div>
		)}
	</div>
}

export default AddressList
