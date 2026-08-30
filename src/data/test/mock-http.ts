import { faker } from '@faker-js/faker';
import {
  type HttpGetClient,
  type HttpGetParams,
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
  }
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: { data: faker.string.alphanumeric(10) }
});

export class HttpPostClientSpy<RequestBody, ResponseBody> implements HttpPostClient<RequestBody, ResponseBody> {
  url?: string;
  body?: RequestBody;
  response: HttpResponse<ResponseBody> = {
    statusCode: HttpStatusCode.ok
  };

  async post(params: HttpPostParams<RequestBody>): Promise<HttpResponse<ResponseBody>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}
export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
  url!: string;
  headers?: unknown;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  };

  async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}