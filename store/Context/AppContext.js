"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const initialValue = {
    cart: {
        items: [],
        total: 0,
        itemCount: 0,
    },
    addProduct: () => { },
    removeItem: () => { },
    clearCart: () => { },
};
const AppContext = (0, react_1.createContext)(initialValue);
exports.default = AppContext;
//# sourceMappingURL=AppContext.js.map