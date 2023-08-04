import { CartItem } from "./cartItem";

export type OrderSatus = 'pending' | 'done';

export interface OrderUser {
    name: string;
    email: string;
}

export interface OrderForm {
    user: OrderUser,
    order: CartItem[],
    status: OrderSatus,
    total: number
}
