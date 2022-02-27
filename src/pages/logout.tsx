import { logout } from '@/api/auth';

export default function() {
  logout();
  return null;
}
