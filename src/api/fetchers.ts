import { METHOD } from '@/constants';
import { ResponseType } from '@/types';

export const getFetcher = async <F = unknown>(url: string): Promise<ResponseType<F>> => {
  const response = await fetch(url, {
    method: METHOD.GET,
  });
  if (!response.ok) {
    throw (await response.json()).message;
  }
  return response.json();
};
export const postFetcher = async <T, F = unknown>(url: string, { arg }: { arg: T }): Promise<ResponseType<F>> => {
  const response = await fetch(url, {
    body: JSON.stringify(arg),
    method: METHOD.POST,
  });
  if (!response.ok) {
    throw (await response.json()).message;
  }
  return response.json();
};

export const deleteFetcher = async (url: string, { arg }: { arg?: string }): Promise<ResponseType<unknown>> => {
  const response = await fetch(`${url}/${arg ?? ''}`, {
    method: METHOD.DELETE,
  });
  if (!response.ok) {
    throw (await response.json()).message;
  }
  return response.json();
};
export const putFetcher = async <T, F = unknown>(url: string, { arg }: { arg: T }): Promise<ResponseType<F>> => {
  const response = await fetch(url, {
    body: JSON.stringify(arg),
    method: METHOD.PUT,
  });
  if (!response.ok) {
    throw (await response.json()).message;
  }
  return response.json();
};
