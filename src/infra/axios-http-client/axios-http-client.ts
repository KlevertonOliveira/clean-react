import type { HttpPostParams } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post(params: HttpPostParams<unknown>): Promise<void> {
    await axios.post(params.url);
  }
}