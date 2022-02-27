import { getAllSideData } from "@/api/data";

/**
 * For Micro Application 404 page
 * @returns null
 */
 export default function Index() {
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