import { describe, test, expect, vi } from 'vitest';
import axios from 'axios';
import { faker } from '@faker-js/faker';

import { AxiosHttpClient } from './axios-http-client';
import type { HttpPostParams } from '@/data/protocols/http';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);
const mockedAxiosResult = {
  data: { content: faker.string.alphanumeric()},
  status: faker.number.int()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
}

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: { test: faker.internet.exampleEmail() }
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async() => { 
    const request = mockPostRequest();
    const sut = makeSut();

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
  
  test('Should return the correct statusCode and body', async() => { 
    const sut = makeSut();

    const httpResponse = await sut.post(mockPostRequest());

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    });
  });
})