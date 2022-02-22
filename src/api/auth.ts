import Router from 'next/router';
import request from './fetcher';
import { baseApi } from './base';

export const logout = async () => {
  const apiKey = localStorage.getItem('apiKey') || '';
  await request(`${baseApi}/admin/logout`, {
    method: 'POST',
  });
  localStorage.clear();
  localStorage.setItem('apiKey', apiKey);
  Router.push('/');
}
