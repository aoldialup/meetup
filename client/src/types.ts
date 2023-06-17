export interface Club {
  address: {
    id: number;
    street: string;
    city: string;
    state: string;
  };
  clubCategory: string;
  description: string;
  id: number;
  image: string;
  title: string;
}

export interface State {
  id: number,
  short: string;
  name: string;
  createdAt: string;
}