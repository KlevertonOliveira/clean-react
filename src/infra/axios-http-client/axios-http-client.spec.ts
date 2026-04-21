import { describe, test, expect, vi } from 'vitest';
import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker'

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL', async() => { 
    const sut = new AxiosHttpClient();
    const url = faker.internet.url();

    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url);
   })
})