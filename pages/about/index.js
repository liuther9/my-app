"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_module_scss_1 = __importDefault(require("./about.module.scss"));
const react_yandex_maps_1 = require("react-yandex-maps");
const About = () => {
    return <main className={about_module_scss_1.default.container}>
		<h1>РАБОЧИЕ ЧАСЫ И ЛОКАЦИЯ</h1>
		<a href='https://go.2gis.com/gwb330' target='_blank' rel="noopener noreferrer" className={about_module_scss_1.default.location}>​Әлихан Бөкейхан 27/4, Есиль район, Нур-Султан</a>
		<p className={about_module_scss_1.default.work_hours}>Сб-Вс: 9:30 - 22:00</p>
		<p className={about_module_scss_1.default.work_hours}>Пн-Пт: 8:00 - 22:00</p>
		<br />
		<react_yandex_maps_1.YMaps>
			<div className={about_module_scss_1.default.map_container}>
				<react_yandex_maps_1.Map defaultState={{ center: [51.084267, 71.428432], zoom: 16, controls: ['zoomControl', 'fullscreenControl'] }} className={about_module_scss_1.default.map} modules={['control.ZoomControl', 'control.FullscreenControl']}>
    			<react_yandex_maps_1.Placemark geometry={[51.084267, 71.428432]}/>
				</react_yandex_maps_1.Map>
			</div>
		</react_yandex_maps_1.YMaps>
	</main>;
};
exports.default = About;
//# sourceMappingURL=index.js.map