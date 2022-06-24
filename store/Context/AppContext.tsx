import { createContext } from "react";
import { Product } from "types";

type Type = {
	cart: {
		items: Product[],
		total: number,
		itemCount: number,
	},
	addProduct: (item: Product) => void,
	removeItem: (item: Product) => void,
	clearCart: () => void,
}
const initialValue = {
	cart: {
		items: [],
		total: 0,
		itemCount: 0,
	},
	addProduct: () => {},
	removeItem: () => {},
	clearCart: () => {},
}

const AppContext = createContext<Partial<Type>>(initialValue)

export default AppContext
