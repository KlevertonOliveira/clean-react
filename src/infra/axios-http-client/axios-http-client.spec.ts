import { describe, test, expect, vi } from 'vitest';
import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker'

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL', async() => { 
    const url = faker.internet.url();
    const sut = makeSut();

    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url);
   })
})