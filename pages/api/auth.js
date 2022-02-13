"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = require("../../utils/supabaseClient");
function handler(req, res) {
    supabaseClient_1.supabase.auth.api.setAuthCookie(req, res);
}
exports.default = handler;
//# sourceMappingURL=auth.js.map