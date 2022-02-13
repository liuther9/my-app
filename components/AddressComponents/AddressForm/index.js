"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_number_format_1 = __importDefault(require("react-number-format"));
const react_hook_form_1 = require("react-hook-form");
const addressform_module_scss_1 = __importDefault(require("./addressform.module.scss"));
const supabaseClient_1 = require("../../../utils/supabaseClient");
const AddressForm = ({ id, mutate }) => {
    const { register, handleSubmit, getValues, control, reset } = (0, react_hook_form_1.useForm)();
    const onSubmit = async () => {
        const session = supabaseClient_1.supabase.auth.session();
        const values = getValues(["street", "building", "appartment", "phone"]);
        const res = await fetch('/api/address', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `${session?.access_token}` }),
            credentials: 'same-origin',
            body: JSON.stringify({ user_id: id, address: { street: values[0], building: values[1], appartment: values[2], }, phone: values[3], })
        });
        reset();
        reset({ phone: '' });
        mutate('/api/address');
    };
    return <react_1.Fragment>
		<form onSubmit={handleSubmit(onSubmit)} className={addressform_module_scss_1.default.form}>
			<label>Новый адрес</label>
			<div className="spacer"></div>
			<input {...register("street", { minLength: { value: 1, message: 'Обязательное поле' }, required: true })} placeholder="Улица"/>
			<div className="spacer"></div>
			<div className={addressform_module_scss_1.default.address_details}>
				<input {...register("building", { minLength: { value: 1, message: 'Обязательное поле' }, required: true })} placeholder="Дом"/>
				<div className="spacer"></div>
				<input {...register("appartment", { required: false })} placeholder="Квартира"/>
			</div>
			<div className="spacer"></div>
			<react_hook_form_1.Controller name="phone" control={control} rules={{
            required: true,
            minLength: 17,
        }} render={({ field: { ref, value, onChange } }) => <react_number_format_1.default ref={ref} value={value} onChange={onChange} format="+7 (###) ###-####" mask="" placeholder="+7 (###) ###-####"/>}/>
			<div className="spacer"></div>
			<button className={addressform_module_scss_1.default.button} onClick={() => console.log(getValues(["street", "building", "appartment", "phone"]))}>
				Добавить
			</button>
		</form>
	</react_1.Fragment>;
};
exports.default = AddressForm;
//# sourceMappingURL=index.js.map