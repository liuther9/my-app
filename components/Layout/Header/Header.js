"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const link_1 = __importDefault(require("next/link"));
const header_module_scss_1 = __importDefault(require("./header.module.scss"));
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const NOOTS_logos_black_png_1 = __importDefault(require("../../../public/NOOTS-logos/NOOTS-logos_black.png"));
const Header = () => {
    const [menuActive, setMenuActive] = (0, react_1.useState)(false);
    const [small, setSmall] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => setSmall(window.pageYOffset > 50);
            window.addEventListener("scroll", handleScroll);
            const handleRouteChange = () => setMenuActive(false);
            router.events.on('routeChangeComplete', handleRouteChange);
            return () => {
                window.removeEventListener("scroll", handleScroll);
                router.events.off("routeChangeComplete", handleRouteChange);
            };
        }
    }, []);
    return <header className={!small ? header_module_scss_1.default.header : `${header_module_scss_1.default.header} ${header_module_scss_1.default.header_small}`}>
			<link_1.default href='/' passHref={true}>
				<div className={header_module_scss_1.default.logo}>
					<image_1.default src={NOOTS_logos_black_png_1.default} className={header_module_scss_1.default.logo_icon} layout='fill' objectFit='cover' alt='NOOTS'/>
				</div>
			</link_1.default>
		<div className={!menuActive ? header_module_scss_1.default.burger_btn : `${header_module_scss_1.default.burger_btn} ${header_module_scss_1.default.active}`} onClick={() => setMenuActive(!menuActive)}>
			<i />
		</div>
		<nav className={!menuActive ? header_module_scss_1.default.links : `${header_module_scss_1.default.links} ${header_module_scss_1.default.show}`}>
			<div className={header_module_scss_1.default.burger_btn_dropdown}>
				<div className={!menuActive ? header_module_scss_1.default.burger_btn : `${header_module_scss_1.default.burger_btn} ${header_module_scss_1.default.active}`} onClick={() => setMenuActive(!menuActive)}>
					<i />
				</div>
			</div>
			<link_1.default href='/'>Меню</link_1.default>
			<link_1.default href='/about'>О нас</link_1.default>
			<link_1.default href='/contacts'>Контакты</link_1.default>
		</nav>
	</header>;
};
exports.default = Header;
//# sourceMappingURL=Header.js.map