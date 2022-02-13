"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md_1 = require("react-icons/md");
const ordernavigationbar_module_scss_1 = __importDefault(require("./ordernavigationbar.module.scss"));
const OrderNavigationBar = ({ pageSwitched, setPageSwitched, nextButtonAction }) => {
    return <div className={ordernavigationbar_module_scss_1.default.wrapper}>
		<button onClick={() => setPageSwitched(false)} disabled={pageSwitched === false}><md_1.MdArrowBackIos />Назад</button>
		<button onClick={nextButtonAction}>{pageSwitched === false ? 'Далее' : 'Заказать'}<md_1.MdArrowForwardIos /></button>
	</div>;
};
exports.default = OrderNavigationBar;
//# sourceMappingURL=index.js.map