import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

import { describe, expect, test } from 'vitest';

describe('RemoteAuthentication', () => { 
  test('Should call HttpPostClient with correct URL', async() => {
    const url = 'any_url';
    const httpPostClientSpy = new HttpPostClientSpy()

    // sut -> System Under Test
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url);
  })
})