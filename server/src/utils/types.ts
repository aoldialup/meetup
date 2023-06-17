export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateClubParams = {
  title: string;
  description: string;
  image: string;
  street: string;
  city: string;
  state: string;
  clubCategory: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

export type SignupDto = {
  email: string;
  password: string;
  username: string;
};
