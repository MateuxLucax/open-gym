export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatMoney(price: number) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol'
  });
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR');
}

export const user = {
  email: 'mateuxlucax@gmail.com',
  password: '12345678',
  name: 'Mateus Lucas',
  image: 'https://avatars.githubusercontent.com/u/35275029?v=4'
};
