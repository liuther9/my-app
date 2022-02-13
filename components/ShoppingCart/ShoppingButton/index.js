"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shoppingButton_module_scss_1 = __importDefault(require("./shoppingButton.module.scss"));
const bs_1 = require("react-icons/bs");
const ShoppingButton = ({ items, cartOpen, setCartOpen }) => {
    return <div className={shoppingButton_module_scss_1.default.wrapper} onClick={() => setCartOpen(!cartOpen)}>
		<div className={!cartOpen ? shoppingButton_module_scss_1.default.btn : `${shoppingButton_module_scss_1.default.btn_active} + ${shoppingButton_module_scss_1.default.btn}`}>
			<bs_1.BsShop />
		</div>
		<div>{items && items > 0 ? items : ''}</div>
	</div>;
};
exports.default = ShoppingButton;
//# sourceMappingURL=index.js.map