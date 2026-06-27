import { describe, test, expect, vi, type MockedFunction } from 'vitest';
import type { AxiosStatic } from 'axios';

import { AxiosHttpClient } from './axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockPostRequest } from '@/data/test/mock-http';

vi.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: MockedFunction<AxiosStatic>;
};

const makeSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: mockAxios(),
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = sut.post(mockPostRequest());

    // Index 0 = resolved value / Index 1 = rejected value
    const resolvedValue = mockedAxios.post.mock.results[0].value;

    expect(httpResponse).toEqual(resolvedValue);
  });

  test("Should return the correct statusCode and body on failure", () => {
    const { sut, mockedAxios } = makeSut();

    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    });

    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});