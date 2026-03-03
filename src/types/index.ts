export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

export interface CodeListing {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  code_content: string;
}

export interface Order {
  id: number;
  user_id: number;
  item_id: number;
  item_type: 'product' | 'code';
  amount: number;
  status: string;
  created_at: string;
}
