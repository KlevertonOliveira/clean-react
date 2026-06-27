import { describe, expect, test } from 'vitest';

import { HttpPostClientSpy } from '@/data/test';
import type { AccountModel } from '@/domain/models';
import type { AddAccountParams, AuthenticationParams } from '@/domain/usecases';

import { mockAccountModel, mockAddAccountParams } from "@/domain/test";
import { faker } from '@faker-js/faker';
import { RemoteAddAccount } from "./remote-add-account";
import { HttpStatusCode } from "@/data/protocols/http";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>();

  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  };
};

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.add(mockAddAccountParams());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();

    await sut.add(addAccountParams);

    expect(httpPostClientSpy.body).toBe(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpPostClient returns 403', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };

    const accountModel = await sut.add(mockAddAccountParams());

    expect(accountModel).toBe(httpResult);
  });
});