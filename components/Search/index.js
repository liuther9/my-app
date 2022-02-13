"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const search_module_scss_1 = __importDefault(require("./search.module.scss"));
const Search = ({ products }) => {
    const [value, setValue] = (0, react_1.useState)('');
    const [dropdown, setDropdown] = (0, react_1.useState)(false);
    const [filteredResults, setFilteredResults] = (0, react_1.useState)([]);
    const inputRef = (0, react_1.useRef)(null);
    const dropdownRef = (0, react_1.useRef)(null);
    const filter = () => {
        if (value.length > 0) {
            dropdown === false && setDropdown(true);
            setFilteredResults(products.filter(product => product.name.toLowerCase().includes(value.toLowerCase())));
        }
        else {
            setDropdown(false);
            setFilteredResults([]);
        }
    };
    (0, react_1.useEffect)(() => filter(), [value]);
    return <section className={search_module_scss_1.default.wrapper}>
		<input ref={inputRef} autoCorrect='off' spellCheck={false} className={search_module_scss_1.default.input} value={value} onChange={e => setValue(e.target.value)} onFocus={() => value.length > 0 && setDropdown(true)} onBlur={() => setTimeout(() => !dropdownRef.current?.contains(document.activeElement) && setDropdown(false), 10)}/>

		{dropdown &&
            <div className={search_module_scss_1.default.results} ref={dropdownRef} tabIndex={0} onBlur={() => setTimeout(() => !inputRef.current?.contains(document.activeElement) && setDropdown(false), 10)}>
				{filteredResults.map(product => <div className={search_module_scss_1.default.product} key={product.id} onClick={() => { }}>
						<div className={search_module_scss_1.default.product_image}>
							{product.image && <image_1.default src={product.image} layout='fill' objectFit='cover'/>}
						</div>
						<div className='spacer'></div>
						<h4 className={search_module_scss_1.default.product_name}>{product.name}</h4>
					</div>)}
			</div>}
	</section>;
};
exports.default = Search;
//# sourceMappingURL=index.js.map