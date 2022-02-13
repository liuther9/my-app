"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const router_1 = require("next/router");
const react_1 = require("react");
const Auth_1 = __importDefault(require("../../utils/Auth"));
const AppContext_1 = __importDefault(require("../../store/Context/AppContext"));
const ShoppingButton_1 = __importDefault(require("../ShoppingCart/ShoppingButton"));
const ShoppingModal_1 = __importDefault(require("../ShoppingCart/ShoppingModal"));
const Footer_1 = __importDefault(require("./Footer"));
const Header_1 = __importDefault(require("./Header"));
const layout_module_scss_1 = __importDefault(require("./layout.module.scss"));
const initialState = { items: [], total: 0, itemCount: 0 };
const Layout = ({ children }) => {
    const [cart, setCart] = (0, react_1.useState)(initialState);
    const [cartOpen, setCartOpen] = (0, react_1.useState)(false);
    const { session } = (0, Auth_1.default)();
    (0, react_1.useEffect)(() => { cart.itemCount === 0 && setCartOpen(false); }, [cart.itemCount]);
    (0, react_1.useEffect)(() => {
        const cartItems = JSON.parse(window.localStorage.getItem('cart') || JSON.stringify(cart));
        setCart(cartItems);
    }, []);
    (0, react_1.useEffect)(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const router = (0, router_1.useRouter)();
    // ADD PRODUCT TO THE CART
    const addProduct = (item) => {
        let { items, total } = cart;
        const addedItem = items?.find((i) => i.id === item.id);
        if (!addedItem) {
            item.quantity = 1;
            setCart({
                items: [...items, item],
                total: total + item.price,
                itemCount: cart.itemCount + 1,
            });
        }
        else {
            setCart({
                items: items.map((item) => item.id === addedItem.id
                    ? Object.assign({}, item, { quantity: item.quantity && item.quantity + 1 })
                    : item),
                total: total + item.price,
                itemCount: cart.itemCount + 1,
            });
        }
    };
    //------------------------------------------------------------------------------------
    // REMOVE PRODUCT FROM THE CART
    const removeItem = (item) => {
        let { items, total } = cart;
        const addedItem = items?.find((i) => i.id === item.id);
        if (addedItem?.quantity && addedItem?.quantity > 1) {
            setCart({
                items: items.map((item) => item.id === addedItem.id
                    ? Object.assign({}, item, { quantity: item.quantity && item.quantity - 1 })
                    : item),
                total: total - item.price,
                itemCount: cart.itemCount - 1,
            });
        }
        else {
            const products = [...items];
            const index = products.findIndex((i) => i.id === addedItem?.id);
            products.splice(index, 1);
            setCart({
                items: products,
                total: total - item.price,
                itemCount: cart.itemCount - 1,
            });
        }
    };
    //------------------------------------------------------------------------------------
    // CLEAR CART
    const clearCart = () => setCart(initialState);
    //------------------------------------------------------------------------------------
    return <AppContext_1.default.Provider value={{
            cart,
            addProduct,
            removeItem,
            clearCart,
            session: session !== null ? session : undefined,
        }}>
		<div className={layout_module_scss_1.default.wrapper}>
      <head_1.default>
        <title>Кофейня NOOTS в Нур-Султане</title>
        <meta name="description" content="Кофейня NOOTS в Нур-Султане"/>
        <link rel="icon" href="/NOOTS-logos/NOOTS-logos.jpeg"/>
      </head_1.default>
			<Header_1.default />
			{router.pathname !== '/cart' && cart.itemCount !== 0 &&
            <react_1.Fragment>
					<ShoppingButton_1.default items={cart.itemCount} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
					<ShoppingModal_1.default items={cart.itemCount} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
				</react_1.Fragment>}
			<div className={layout_module_scss_1.default.container}>
				{children}
			</div>
			<Footer_1.default />
		</div>
	</AppContext_1.default.Provider>;
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map