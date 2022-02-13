"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = require("./supabaseClient");
const react_1 = require("react");
const Auth = () => {
    const [session, setSession] = (0, react_1.useState)();
    const setServerSession = async (event, session) => fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session })
    }).then((res) => res.json());
    (0, react_1.useEffect)(() => {
        const { data: authListener } = supabaseClient_1.supabase.auth.onAuthStateChange(async (event, session) => {
            await setServerSession(event, session);
            setSession(session);
        });
        return () => authListener?.unsubscribe();
    }, []);
    return { session };
};
exports.default = Auth;
//# sourceMappingURL=Auth.js.map