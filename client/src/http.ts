import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Club, CategoriesResult, State } from './types';

export const BASE_URL = "http://localhost:3000";

export const useFetch = (url: string) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        const json = await response.data;
        setData(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  return data;
};

export async function getClub(id: number): Promise<Club> {
  const result = await axios.get(`${BASE_URL}/clubs/${id}`);
  return result.data[0];
}

export async function getClubs(): Promise<Club[]> {
  const result = await axios.get(`${BASE_URL}/clubs`);
  console.log(result);
  return result.data;
}

export async function getCategories(): Promise<string[]> {
  const result = await axios.get<string[]>(`${BASE_URL}/clubs/categories`);
  return result.data;
}

export async function getStates(): Promise<State[]> {
  const result = await axios.get<State[]>(`${BASE_URL}/clubs/states`);
  return result.data;
}

export async function deleteClub(id: number) {
  const result = await axios.delete(`${BASE_URL}/clubs/${id}`);
  return result;
}
