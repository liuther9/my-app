"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const footer_module_scss_1 = __importDefault(require("./footer.module.scss"));
const image_1 = __importDefault(require("next/image"));
const Footer = () => {
    return <footer className={footer_module_scss_1.default.footer}>
		<div className={footer_module_scss_1.default.location}>​Әлихан Бөкейхан 27/4, Нур-Султан</div>
		<a href={'https://www.instagram.com/nootskz/'} target='_blank' rel="noopener noreferrer">
			<image_1.default alt='' src={'/instagram.svg'} width={25} height={25} className={footer_module_scss_1.default.instagram}/>
		</a>
	</footer>;
};
exports.default = Footer;
//# sourceMappingURL=Footer.js.map