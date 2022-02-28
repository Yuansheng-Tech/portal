import { logout } from '@/api/auth';
import { getAllSideData } from '@/api/data';

export default function Logout() {
  logout();
  return null;
}

export async function getServerSideProps() {
  return {
    props: {
      fallback: {
        ...await getAllSideData()
      }
    }
  }
}
