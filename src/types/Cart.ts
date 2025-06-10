
export interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export interface Address {
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
}
