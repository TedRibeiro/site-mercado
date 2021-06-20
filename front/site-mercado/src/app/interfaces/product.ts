export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  photoUrl: string;
}

export type ProductList = Array<Product>;
