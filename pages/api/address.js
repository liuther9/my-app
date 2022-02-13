"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = require("../../utils/supabaseClient");
async function handler(req, res) {
    if (req.method === 'POST') {
        const { address, phone, user_id } = req.body;
        const JWT = req.headers.authorization;
        supabaseClient_1.supabase.auth.setAuth(JWT ? JWT : '');
        const { data, error } = await supabaseClient_1.supabase.from('USER_INFO').insert([
            { user_id, address, phone }
        ], { returning: "minimal" });
        if (error)
            return res.status(400).json({ error: error.message });
        res.send(data);
    }
    if (req.method === 'GET') {
        const { data, error } = await supabaseClient_1.supabase.from('USER_INFO').select('*').eq('user_id', req.query.id);
        if (error)
            return res.status(400).json({ error: error.message });
        res.send(data);
    }
}
exports.default = handler;
//# sourceMappingURL=address.js.map