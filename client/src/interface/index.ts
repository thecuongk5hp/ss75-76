export interface Product {
    id: number;
    productName: string;
    description: string;
    stock_quantity: number;
    price: number;
    image: string;
  }
  
  export interface Cart {
    id: number;
    product: Product;
    quantity: number;
  }