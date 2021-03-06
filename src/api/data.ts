import fetcher from './fetcher';
import { appId, indexPageId } from './base';

export const pageAPI = `/app/pages/`
export const getPageData = async (id: string | string[] | undefined) => {
  return await fetcher(pageAPI + id);
}

export const headerDataApi = `/app/page/configs?where=${JSON.stringify({
  "position":"top",
  "status": 1,
  "page": {
    id: indexPageId
  }
})}`
export const getHeaderData = async () => {
  return await fetcher(headerDataApi);
}

export const headerUserDataApi = `/app/page/configs?where=${JSON.stringify({
  "position":"user_profile",
  "status": 1,
  "page": {
    id: indexPageId
  }
})}`
export const getHeaderUserData = async () => {
  return await fetcher(headerUserDataApi);
}

export const rightSideDataApi = `/app/page/configs?where=${JSON.stringify({
  "position": "right_side",
  "status": 1,
  "page": {
    id: indexPageId
  }
})}`
export const getRightSideData = async () => {
  return await fetcher(rightSideDataApi);
}

export const indexDataApi = `/app/pages?where=${JSON.stringify({
  wechat: {
    id: appId,
  },
  type: 'richtext',
  "status": 1
})}`
export const getIndexData = async () => {
  return await fetcher(indexDataApi);
}

export const footerLinkApi = `/app/page/configs?where=${JSON.stringify({
  "position":"bottom",
  "status": 1,
  "page": {
    id: indexPageId
  }
})}`
export const getFooterLinkData = async () => {
  return await fetcher(footerLinkApi);
}

export const footerGovLinkApi = `/app/page/configs?where=${JSON.stringify({
  "position":"footer_gov_link",
  "status": 1,
  "page": {
    id: indexPageId
  }
})}`
export const getFooterGovLinkData = async () => {
  return await fetcher(footerGovLinkApi);
}

export const logoApi = `/app/page/configs?where=${JSON.stringify({
  "position":"logo_slogen",
  "status": 1,
  "page": {
    id: indexPageId
  }
})}`
export const getLogoData = async () => {
  return await fetcher(logoApi);
}

export const getAllSideData = async () => ({
  [logoApi]: await getLogoData(),
  [headerDataApi]: await getHeaderData(),
  [headerUserDataApi]: await getHeaderUserData(),
  [rightSideDataApi]: await getRightSideData(),
  [footerLinkApi]: await getFooterLinkData(),
  [footerGovLinkApi]: await getFooterGovLinkData(),
})