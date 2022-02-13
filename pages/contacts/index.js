"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_module_scss_1 = __importDefault(require("./contacts.module.scss"));
const Contacts = () => {
    return <div className={contacts_module_scss_1.default.contacts}>
		<div className={contacts_module_scss_1.default.phone}>
			Телефон: 
			<span onClick={() => {
            if (typeof window !== "undefined")
                window.open('tel:+7(707)3266060');
        }}>+7(705)3266060</span>
		</div>
	</div>;
};
exports.default = Contacts;
//# sourceMappingURL=index.js.map