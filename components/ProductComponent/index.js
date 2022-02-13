"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const productComponent_module_scss_1 = __importDefault(require("./productComponent.module.scss"));
const AppContext_1 = __importDefault(require("../../store/Context/AppContext"));
const image_1 = __importDefault(require("next/image"));
const ProductComponent = react_1.default.memo(({ product }) => {
    const { name, price, image, id } = product;
    const { cart, addProduct } = (0, react_1.useContext)(AppContext_1.default);
    return <div className={productComponent_module_scss_1.default.product}>
		<div className={productComponent_module_scss_1.default.image}>
			{image && <image_1.default alt={name} src={image} layout='fill' objectFit='cover' priority/>}
		</div>
		<div className={productComponent_module_scss_1.default.item_info}>
			<article className={productComponent_module_scss_1.default.item_about}>
				<h2 className={productComponent_module_scss_1.default.name}>{name}</h2>
				<span className={productComponent_module_scss_1.default.price}>{price} тг</span>
			</article>
			<div className={productComponent_module_scss_1.default.item_bottom_container}>
				<button onClick={() => addProduct && addProduct(product)}>Купить</button>
			</div>
		</div>
	</div>;
});
exports.default = ProductComponent;
//# sourceMappingURL=index.js.map