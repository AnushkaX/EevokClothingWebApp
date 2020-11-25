import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];
    userId: string;
    shipping: any;

    constructor(userId: string, shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.shipping = shipping;
        this.userId = userId;
        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }

}