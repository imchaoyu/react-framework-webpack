import { request } from '@/utils';

export async function getKeyByDemo(data, options) {
  return request('/key', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
