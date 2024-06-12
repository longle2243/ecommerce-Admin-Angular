export interface Category {
  name: string;
  description: string;
  image: string;
}

export interface CategoryResponse {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface CategoriesResponse {
  page: number;
  limit: number;
  totalRow: number;
  totalPage: number;
  data: CategoryResponse[];
}
