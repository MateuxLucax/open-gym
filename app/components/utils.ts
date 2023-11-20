export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


export const user = {
  email: 'mateuxlucax@gmail.com',
  password: '12345678',
  name: 'Mateus Lucas',
  image: 'https://avatars.githubusercontent.com/u/35275029?v=4'
};