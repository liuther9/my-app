"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
const supabaseClient_1 = require("../../../utils/supabaseClient");
const AppContext_1 = __importDefault(require("../../../store/Context/AppContext"));
const shoppingModal_module_scss_1 = __importDefault(require("./shoppingModal.module.scss"));
const ShoppingModal = ({ items, cartOpen, setCartOpen }) => {
    const { cart, addProduct, removeItem, clearCart } = (0, react_1.useContext)(AppContext_1.default);
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined") {
            const handleRouteChange = () => setCartOpen(false);
            router.events.on('routeChangeComplete', handleRouteChange);
            return () => router.events.off("routeChangeComplete", handleRouteChange);
        }
    }, []);
    const proceedToCheckout = () => {
        const user = supabaseClient_1.supabase.auth.user();
        user ? router.push('/cart') : router.push('/auth');
    };
    return <div className={shoppingModal_module_scss_1.default.wrapper}>
		<div className={!cartOpen ? shoppingModal_module_scss_1.default.container : `${shoppingModal_module_scss_1.default.container} ${shoppingModal_module_scss_1.default.active}`}>
			<button className={shoppingModal_module_scss_1.default.close + ' ' + shoppingModal_module_scss_1.default.small_btn} onClick={() => setCartOpen(false)}>x</button>
			<ul className={shoppingModal_module_scss_1.default.list}>
				{cart?.items.map((item) => {
            return (<li key={item.id} className={shoppingModal_module_scss_1.default.item}>
							<h4>{item.name}</h4>
							<div className={shoppingModal_module_scss_1.default.item_amount}>
								<button onClick={() => addProduct && addProduct(item)} className={shoppingModal_module_scss_1.default.small_btn}>+</button>
								<span>{item.quantity} шт.</span>
								<button onClick={() => removeItem && removeItem(item)} className={shoppingModal_module_scss_1.default.small_btn}>-</button>
							</div>
						</li>);
        })}
			</ul>
			<div className={shoppingModal_module_scss_1.default.bottom_container}>
				<div className={cart?.itemCount && cart?.itemCount > 0 ? shoppingModal_module_scss_1.default.total_buy : shoppingModal_module_scss_1.default.total_buy + ' ' + shoppingModal_module_scss_1.default.total_buy_empty}>
					<span>Сумма {cart?.total} тенге</span>
					<button onClick={() => proceedToCheckout()}>Далее</button>
				</div>
				<button className={shoppingModal_module_scss_1.default.clear_btn} onClick={() => clearCart && clearCart()}>Удалить все</button>
			</div>
		</div>
	</div>;
};
exports.default = ShoppingModal;
//# sourceMappingURL=index.js.map