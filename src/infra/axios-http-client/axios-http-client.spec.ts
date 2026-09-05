import { describe, test, expect, vi, type MockedFunction } from 'vitest';
import type { AxiosStatic } from 'axios';

import { AxiosHttpClient } from './axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockGetRequest, mockPostRequest } from '@/data/test/mock-http';

vi.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient<unknown, unknown>;
  mockedAxios: MockedFunction<AxiosStatic>;
};

const makeSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: mockAxios(),
  };
};

describe('AxiosHttpClient', () => {
  describe('POST', () => {
    test('Should call axios.post with correct values', async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();

      await sut.post(request);

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut();

      const httpResponse = await sut.post(mockPostRequest());
      const mockedAxiosResponse = await mockedAxios.post.mock.results[0].value;

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        body: mockedAxiosResponse.body,
      });
    });

    test("Should return correct error on axios.post", () => {
      const { sut, mockedAxios } = makeSut();

      mockedAxios.post.mockRejectedValueOnce({
        request: {
          response: mockHttpResponse()
        }
      });

      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe('GET', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();

      await sut.get(request);

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers });
    });

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut();

      const httpResponse = await sut.get(mockGetRequest());
      const mockedAxiosResponse = await mockedAxios.get.mock.results[0].value;

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        body: mockedAxiosResponse.body,
      });
    });

    test("Should return correct error on axios.post", async () => {
      const { sut, mockedAxios } = makeSut();

      mockedAxios.get.mockRejectedValueOnce({
        request: {
          response: mockHttpResponse()
        }
      });

      const promise = sut.get(mockGetRequest());

      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});