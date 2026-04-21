import { describe, test, expect, vi } from 'vitest';
import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker'
import type { HttpPostParams } from '@/data/protocols/http';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
}

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: { test: faker.internet.exampleEmail() }
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async() => { 
    const request = mockPostRequest();
    const sut = makeSut();

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
   })
})