import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import _groupby from 'lodash.groupby'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useFetcher } from '@/api/fetcher';
import { headerDataApi, headerUserDataApi, logoApi } from '@/api/data';
import { Edit } from '@/components/common/edit';
import { IfallbackOptions, IPageConfigData } from '@/types/common';

export default function Nav({
  fallback
}: IfallbackOptions) {
  let username: string | null = ''
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('username');
  }

  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: resuldData = [] } = useFetcher(headerDataApi, {
    fallbackData: fallback[headerDataApi]
  });

  const { data: resuldUserData = [] } = useFetcher(headerUserDataApi, {
    fallbackData: fallback[headerUserDataApi]
  });

  const { data: logoAndSlogenData = [{}] } = useFetcher(logoApi, {
    fallbackData: fallback[logoApi]
  });

  let stashData: any = []
  if (!resuldData.length) {
    return null;
  } else {
    stashData = _groupby(resuldData, v => !v.parent.trim() ? 'parent' : v.parent)
  }
  return (<div className="border-b border-gray-200 md:border-none px-2 sm:px-10 fixed inset-x-0 top-0 z-50 bg-white">
    <div className="container relative mx-auto h-12 sm:h-28 flex flex-row justify-center items-center text-center">
    <Link href="/">
      <a className="relative sm:block sm:flex-1">
        <Edit filter="logo_slogen" />
      {logoAndSlogenData[0].logo && <Image
        className="flex-1 place-self-center md:scale-100 scale-50"
        src={logoAndSlogenData[0].logo}
        layout="fill"
        alt="logo"
        width="62px"
        height="62px"
      />}
    </a></Link>
    <div className="fixed z-50 bg-white bottom-0 h-20 py-4 flex inset-x-0 bg-white sm:top-0 md:contents">
      <Edit filter="top" />
      {(stashData['parent'] || []).sort((a: IPageConfigData, b: IPageConfigData) => a.sort - b.sort).map((v: IPageConfigData, k: number) => {
        return <div key={k} className="flex-1 hover-display">
          <div className="text-center">
            {/\.png$/.test(v.icon) ? <Image
              className="inline-block"
              src={v.icon}
              alt="logo"
              layout="responsive"
              width="36px"
              height="36px"
            /> : <svg className="inline-block icon" aria-hidden="true">
              <use xlinkHref={"#" + v.icon}></use>
            </svg>}
            <div>{v.name}</div>
          </div>
          <span className="hidden hover-display-parent fixed top-14 right-3 text-2xl w-10 h-10 z-50">x</span>
          <div className="hidden bg-white z-30 fixed md:absolute top-12 md:top-auto bottom-20 md:bottom-auto w-screen inset-x-0 border-t border-b border-gray-300 bg-white">
            {(stashData[v.id] || []).sort((a: IPageConfigData, b: IPageConfigData) => a.sort - b.sort).map((val: IPageConfigData, key: number) => {
              return <a className="border-b border-gray-300 p-4 block md:inline-block text-black hover:text-green-700 leading-10 md:leading-15 text-xl" href={val.action || '#'} key={key}>{val.name}</a>
            })}
          </div>
        </div>
      })}
    </div>
    <div className="relative flex-1 sm:block text-right md:text-center">
      <Edit filter="user_profile" />
      {!!resuldUserData.length && <>{username ? <><Button 
        className="w-84 md:q-full"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
      >
        <Avatar>{username}</Avatar>
      </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {resuldUserData.map((v: IPageConfigData, k: number) => {
            return <MenuItem className="portal_menu_item" key={k} onClick={() => router.push(v.action)}>
              <ListItemIcon className="portal_menu_icon">
                {v.action === '/apps' && <Settings fontSize="small" />}
                {v.action === '/logout' && <Logout fontSize="small" />}
              </ListItemIcon>
              {v.name}
            </MenuItem>
          })}
        </Menu></> : <>
        <Link href="/login"><a className="text-green-700 hover:text-gray-700 hover:border hover:border-green-700 p-3 md:p-4">登录</a></Link>
        <Link href="/register"><a className="hover:text-green-700 hover:border-green-700 p-3 md:p-4 border border-gray-300">注册</a></Link>
      </>}</>}
    </div>
    </div>
  </div>)
}
