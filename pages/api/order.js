"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = require("../../utils/supabaseClient");
async function handler(req, res) {
    const { user_id, payment_type, address, order_list, total } = req.body;
    const JWT = req.headers.authorization;
    supabaseClient_1.supabase.auth.setAuth(JWT ? JWT : '');
    const { data, error } = await supabaseClient_1.supabase.from('ORDERS').insert([
        {
            user_id,
            order_list,
            payment_type,
            address,
            total,
        }
    ]);
    if (error)
        return res.status(400).json({ error: error.message });
    const message = JSON.stringify(data);
    const sendMessage = `${data[0].order_list.map((item) => `${item.name} ${item.quantity} шт.%0A`)}%0A
	Общая сумма ${data[0].total}%0A
	${data[0].payed ? 'Оплачено' : 'Не оплачено'}%0A
	Способ оплаты ${data[0].payment_type}`;
    fetch(`https://api.telegram.org/bot5095347305:AAHUpQYNmkqlYIj2-UEq-8FjNZvrVnru-9s/sendMessage?chat_id=695738150&text=${sendMessage}`);
    res.send(data);
}
exports.default = handler;
//# sourceMappingURL=order.js.map