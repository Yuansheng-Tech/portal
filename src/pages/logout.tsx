import { logout } from '@/api/auth';
import { getAllSideData } from '@/api/data';

export default function() {
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
