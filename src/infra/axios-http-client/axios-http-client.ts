import type { HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export class AxiosHttpClient<RequestBody, ResponseBody> implements HttpPostClient<RequestBody, ResponseBody> {
  async post(params: HttpPostParams<RequestBody>): Promise<HttpResponse<ResponseBody>> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.post(params.url, params.body) as AxiosResponse;
    }
    catch (error) {
      axiosResponse = (error as AxiosError).response as AxiosResponse;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }

  async get(params: HttpGetParams): Promise<void> {
    await axios.get(params.url);
  }
}