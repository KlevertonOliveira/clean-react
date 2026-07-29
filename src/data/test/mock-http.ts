import { faker } from '@faker-js/faker';
import type { AuthenticationParams } from "@/domain/usecases";
import {
  type HttpGetClient,
  type HttpGetParams,
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams<AuthenticationParams> => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
  }
});


export class HttpPostClientSpy<BodyType, ResponseType> implements HttpPostClient<BodyType, ResponseType> {
  url?: string;
  body?: BodyType;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  };

  async post(params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url!: string;

  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url;
  }
}