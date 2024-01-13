import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'

const initialState = {
  cartItem: [],
}

export const cartSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const existingItem = state.cartItem.find(
        (item) => item._id === action.payload._id,
      )

      if (existingItem) {
        toast.success('Item added successfully')
        existingItem.qty += 1
        existingItem.total = existingItem.price * existingItem.qty
        return
      }

      toast.success('Item added successfully')
      const total = action.payload.price
      state.cartItem.push({ ...action.payload, qty: 1, total })
    },
    deleteCartItem: (state, action) => {
      toast.success('Item Deleted')
      const index = state.cartItem.findIndex((el) => el._id === action.payload)
      state.cartItem.splice(index, 1)
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload)
      let qty = state.cartItem[index].qty
      const qtyInc = ++qty
      state.cartItem[index].qty = qtyInc

      const price = state.cartItem[index].price
      const total = price * qtyInc

      state.cartItem[index].total = total
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload)
      let qty = state.cartItem[index].qty
      if (qty > 1) {
        const qtyDec = --qty
        state.cartItem[index].qty = qtyDec

        const price = state.cartItem[index].price
        const total = price * qtyDec

        state.cartItem[index].total = total
      }
    },
    clearCart: (state) => {
      state.cartItem = []
    },
  },
})

export const {
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlide.actions

export default cartSlide.reducer
