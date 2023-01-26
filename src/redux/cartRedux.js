import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        amount: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        deleteProduct: (state, { payload }) => {
            state.products = state.products.filter((item) =>
                item.id === payload.id ? item.color !== payload.color : item.id !== payload.id,
            );
            state.quantity -= 1;
        },
        increaseProduct: (state, action) => {
            const itemId = action.payload;
            const cartProduct = state.products.find((item) => item.id === itemId);
            console.log(cartProduct);
            cartProduct.quantity = cartProduct.quantity + 1;
        },
        decreaseProduct: (state, action) => {
            const itemId = action.payload;
            const cartProduct = state.products.find((item) => item.id === itemId);
            console.log(cartProduct);
            cartProduct.quantity = cartProduct.quantity - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.products.forEach((item) => {
                amount += item.quantity;
                total += item.quantity * item.price;
            });
            state.quantity = amount;
            state.total = total;
        },
    },
});

export const { addProduct, clearCart, deleteProduct, increaseProduct, decreaseProduct, calculateTotals } =
    cartSlice.actions;
export default cartSlice.reducer;
