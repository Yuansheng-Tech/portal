import Router from 'next/router';
import useSWR from 'swr';
import fetcher from './fetcher';
import { baseApi, logoutApi } from './base';

export const logout = async () => {
  if (typeof window !== 'undefined') {
    const apiKey = window.localStorage.getItem('apiKey') || '';
    await fetcher(logoutApi, {
      method: "POST"
    });
    window.localStorage.clear();
    window.localStorage.setItem('apiKey', apiKey);
    Router.push('/');
  }
  return
}

// demo
function useUser(id: string) {
  const { data, error } = useSWR(`/api/user/${id}`)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}