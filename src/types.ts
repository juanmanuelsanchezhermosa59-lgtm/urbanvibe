export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  notes: string[];
  image: string;
  category: 'Floral' | 'Amaderado' | 'Cítrico' | 'Oriental';
}

export interface CartItem extends Product {
  quantity: number;
}
