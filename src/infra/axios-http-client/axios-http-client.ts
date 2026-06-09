import type { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
import type { AccountModel } from "@/domain/models";
import type { AuthenticationParams } from "@/domain/usecases";
import axios, { AxiosError, type AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient<AuthenticationParams, AccountModel>{
  
  async post(params: HttpPostParams<AuthenticationParams>): Promise<HttpResponse<AccountModel>> {
    let httpResponse: AxiosResponse;

    try {
      httpResponse =  await axios.post(params.url, params.body) as AxiosResponse;
    } 
    catch (error) {
      httpResponse = (error as AxiosError).response as AxiosResponse
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}