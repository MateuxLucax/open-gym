import { Member, defaultMembers } from './member';
import { Product, defaultProducts } from './product';
import { SaleProduct, defaultSaleProducts } from './saleProduct';

export type Sale = {
  id: number;
  salesProducts: SaleProduct[];
  date: Date;
  member: Member;
};

export const defaultSales: Sale[] = [
  {
    id: 1,
    salesProducts: defaultSaleProducts,
    date: new Date(2023, 21, 11),
    member: defaultMembers[0]
  },
  {
    id: 2,
    salesProducts: [
      {
        product: defaultProducts[2],
        quantity: 3
      },
      {
        product: defaultProducts[5],
        quantity: 4
      }
    ],
    member: defaultMembers[0],
    date: new Date(2023, 20, 11)
  },
  {
    id: 3,
    salesProducts: [
      {
        product: defaultProducts[4],
        quantity: 6
      },
      {
        product: defaultProducts[7],
        quantity: 3
      }
    ],
    member: defaultMembers[1],
    date: new Date(2023, 21, 11)
  },
  {
    id: 4,
    salesProducts: [
      {
        product: defaultProducts[6],
        quantity: 1
      },
      {
        product: defaultProducts[8],
        quantity: 2
      }
    ],
    member: defaultMembers[2],
    date: new Date(2023, 22, 11)
  }
];
