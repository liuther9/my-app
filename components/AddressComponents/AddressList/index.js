"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addresslist_module_scss_1 = __importDefault(require("./addresslist.module.scss"));
const RadioButton_1 = __importDefault(require("../../RadioButton"));
const AddressList = ({ selectedRadio, data, handleRadioChange }) => {
    return <div className={addresslist_module_scss_1.default.address_list}>
		<h3>Выберите адрес:</h3>
		{data?.map((address) => <div className={addresslist_module_scss_1.default.address_list_item} key={address.id}>
				<RadioButton_1.default label={`${address.address.street} ${address.address.building}, квартира ${address.address.appartment}`} value={selectedRadio === address.id} name='radio' onChange={() => handleRadioChange(address.id)}/>
			</div>)}
	</div>;
};
exports.default = AddressList;
//# sourceMappingURL=index.js.map