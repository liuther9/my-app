"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = void 0;
const supabaseClient_1 = require("../utils/supabaseClient");
const session = supabaseClient_1.supabase.auth.session();
const fetchApi = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `${session?.access_token}` }),
        credentials: 'same-origin',
        body: JSON.stringify(body)
    });
    return res;
};
exports.fetchApi = fetchApi;
//# sourceMappingURL=index.js.map