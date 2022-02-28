import { useRouter } from 'next/router'
import { appId } from '@/api/base'

const getUrls = (url: string, filter: string): string => {
  switch (url) {
    case '/app/page/configs': 
      return `${url}?displayedFilters={"position":true}&filter={"position":"${filter}"}`;
      break;
    case '/app/pages':
      return `${url}?displayedFilters={"type":true,"wechat.id":true}&filter={"wechat":{"id":"${appId}"}}`;
      break;
    default:
      return `${url}`;
      break;
  }
}
export const Edit = ({
  filter = '',
  url = '/app/page/configs'
}: {
  filter?: string;
  url?: string;
}) => {
  const router = useRouter()
  const { query: { edit } = {} } = router
  if (edit) {
    const hrefUrl = getUrls(url, filter)
    return <a href={hrefUrl} target="_blank">编辑</a>
  }
  return null
}
