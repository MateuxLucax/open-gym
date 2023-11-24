import { Product, defaultProducts } from "./product";

export type SaleProduct = {
  product: Product;
  quantity: number;
}

export const defaultSaleProducts: SaleProduct[] = [
  {
    product: defaultProducts[0],
    quantity: 2
  },
  {
    product: defaultProducts[1],
    quantity: 1
  },
];