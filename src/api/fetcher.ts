
import useSWR from 'swr'
import { AnyMap, IPageConfigData } from '@/types/common'
import { baseApi, isFetcherLock } from './base'

export interface ResponseData<T = unknown> {
  statusCode: number;
  data: T;
  message: string;
}

export enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface RequestOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';// EHttpMethods;
  query?: AnyMap;
  data?: AnyMap;
  body?: string;
  timeout?: number;
  credentials?: 'include' | 'same-origin';
  mode?: 'cors' | 'same-origin';
  cache?: 'no-cache' | 'default' | 'force-cache';

  fallbackData?: IPageConfigData[]
}

export default async function fetcher(url: string, options?: RequestOptions): Promise<ResponseData>{
  const res = await fetch(baseApi + url, options)
  const result = await res.json()
  return result.data
}

export function useFetcher(url: string, options?: RequestOptions, ...args: any[]) {
  const { fallbackData } = options || {}
  if (isFetcherLock) {
    return {
      data: fallbackData,
      error: null
    }
  }
  //@ts-ignore
  return useSWR(url, options, ...args)
}