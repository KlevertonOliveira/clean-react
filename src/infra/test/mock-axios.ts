import { vi, type MockedFunction } from 'vitest';
import { faker } from '@faker-js/faker';
import axios, { type AxiosStatic } from 'axios';

export const mockAxios = (): MockedFunction<AxiosStatic> => {
  const mockedAxios = vi.mocked(axios);
  
  mockedAxios.post.mockResolvedValue({
    data: { content: faker.string.alphanumeric()},
    status: faker.number.int()
  });

  return mockedAxios;
}