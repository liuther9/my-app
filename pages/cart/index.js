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
exports.getServerSideProps = void 0;
const react_1 = require("react");
const swr_1 = __importStar(require("swr"));
const AddressForm_1 = __importDefault(require("../../components/AddressComponents/AddressForm"));
const AddressList_1 = __importDefault(require("../../components/AddressComponents/AddressList"));
const AppContext_1 = __importDefault(require("../../store/Context/AppContext"));
const OrderNavigationBar_1 = __importDefault(require("../../components/OrderNavigationBar"));
const RadioButton_1 = __importDefault(require("../../components/RadioButton"));
const supabaseClient_1 = require("../../utils/supabaseClient");
const cart_module_scss_1 = __importDefault(require("./cart.module.scss"));
const api_1 = require("../../api");
const paymentTypes = [
    {
        name: 'cash',
        label: 'Оплата наличными',
    },
    {
        name: 'card',
        label: 'Оплата картой',
    },
];
const Cart = ({ user, loggedIn }) => {
    const [selectedRadio, setSelectedRadio] = (0, react_1.useState)('');
    const [pageSwitched, setPageSwitched] = (0, react_1.useState)(false);
    const [paymentType, setPaymentType] = (0, react_1.useState)('cash');
    const { cart } = (0, react_1.useContext)(AppContext_1.default);
    const { mutate } = (0, swr_1.useSWRConfig)();
    const fetcher = (url) => fetch(url + `?id=${user.id}`).then((res) => res.json());
    const { data, error } = (0, swr_1.default)('/api/address', fetcher);
    const handleRadioChange = (item) => setSelectedRadio(item);
    const submitOrder = async () => {
        const res = (0, api_1.fetchApi)('/api/order', {
            user_id: user.id,
            order_list: cart?.items,
            payment_type: paymentType,
            address: selectedRadio,
            total: cart?.total,
        });
    };
    const nextButtonAction = () => pageSwitched === false ? setPageSwitched(true) : submitOrder();
    (0, react_1.useEffect)(() => handleRadioChange(data && data?.at(-1) && data.at(-1).id), [data]);
    return <div className={cart_module_scss_1.default.wrapper}>
		<main className={cart_module_scss_1.default.container}>
			<OrderNavigationBar_1.default setPageSwitched={setPageSwitched} pageSwitched={pageSwitched} nextButtonAction={nextButtonAction}/>
			<div style={{ position: 'absolute' }} className={!pageSwitched ? cart_module_scss_1.default.page + ' ' + cart_module_scss_1.default.page_switched : cart_module_scss_1.default.page}>
				<div className={cart_module_scss_1.default.payment_container}>
					{paymentTypes.map(payment => <RadioButton_1.default label={payment.label} name={payment.name} value={paymentType === payment.name} onChange={() => setPaymentType(payment.name)}/>)}
				</div>
			</div>
			<div className={!pageSwitched ? cart_module_scss_1.default.page : cart_module_scss_1.default.page + ' ' + cart_module_scss_1.default.page_switched}>
				{data?.length > 0 &&
            <AddressList_1.default selectedRadio={selectedRadio} handleRadioChange={handleRadioChange} data={data}/>}
				<AddressForm_1.default id={user.id} mutate={mutate}/>
			</div>
		</main>
	</div>;
};
exports.default = Cart;
const getServerSideProps = async ({ req }) => {
    const { user } = await supabaseClient_1.supabase.auth.api.getUserByCookie(req);
    if (!user) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        };
    }
    return {
        props: {
            user,
            loggedIn: !!user,
        }
    };
};
exports.getServerSideProps = getServerSideProps;
//# sourceMappingURL=index.js.map