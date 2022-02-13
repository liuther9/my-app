"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const radiobutton_module_scss_1 = __importDefault(require("./radiobutton.module.scss"));
const RadioButton = ({ name, label, value, onChange }) => {
    return <label className={radiobutton_module_scss_1.default.container}>
		<input type='radio' name={name} checked={value ? value : false} onChange={onChange}/>
		{label}
		<span className={radiobutton_module_scss_1.default.checkmark}></span>
	</label>;
};
exports.default = RadioButton;
//# sourceMappingURL=index.js.map