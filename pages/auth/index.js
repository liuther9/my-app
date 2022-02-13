"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
const react_1 = require("react");
const supabaseClient_1 = require("../../utils/supabaseClient");
const auth_module_scss_1 = __importDefault(require("./auth.module.scss"));
const im_1 = require("react-icons/im");
const Cart = ({ user, loggedIn }) => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [linkSent, setLinkSent] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        let { user, error, session } = await supabaseClient_1.supabase.auth.signIn({ email });
        if (error === null) {
            setLinkSent(true);
            setLoading(false);
        }
        console.log('NEW USER', user, error, session);
    };
    return <div className={auth_module_scss_1.default.wrapper}>
		{loading && !linkSent && <im_1.ImSpinner size={30}/>}
		{!linkSent && !loading &&
            <form onSubmit={submitForm}>
				<label>Введите почту чтобы продолжить</label>
				<input type='email' value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" spellCheck="false" autoCorrect="off" placeholder="Почта / Логин" required/>
				<div className={auth_module_scss_1.default.spacer}></div>
				<button>Далее</button>
			</form>}
		{linkSent && !loading &&
            <p>Ссылка для входа в профиль отправлена. Проверьте вашу почту...</p>}
	</div>;
};
exports.default = Cart;
const getServerSideProps = async ({ req }) => {
    const { user } = await supabaseClient_1.supabase.auth.api.getUserByCookie(req);
    if (user) {
        return {
            redirect: {
                destination: '/cart',
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