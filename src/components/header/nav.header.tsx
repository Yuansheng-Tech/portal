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
import { IPageConfigData, IfallbackOptions } from '@/types/common';

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
  return (<div className="container mx-auto px-20 flex flex-row h-28 justify-center items-center text-center">
    <a href="/" className="flex-1">
      <Edit filter="logo_slogen" />
      {logoAndSlogenData[0].logo && <Image
        className="flex-1 place-self-center"
        src={logoAndSlogenData[0].logo}
        alt="logo"
        width="62px"
        height="62px"
      />}
    </a>
    <div className="contents">
      <Edit filter="top" />
      {(stashData['parent'] || []).sort((a: IPageConfigData, b: IPageConfigData) => a.sort - b.sort).map((v: IPageConfigData, k: number) => {
        return <div key={k} className="flex-1 hover-display">
          <div className="text-center">
            {/\.png$/.test(v.icon) ? <img
              className="inline-block"
              src={v.icon}
              alt="logo"
              width="36px"
              height="36px"
            /> : <svg className="inline-block icon" aria-hidden="true">
              <use xlinkHref={"#" + v.icon}></use>
            </svg>}
            <div>{v.name}</div>
          </div>
          <div className="hidden z-40 absolute w-screen inset-x-0 border-t border-b border-gray-300 bg-white">
            {(stashData[v.id] || []).sort((a: IPageConfigData, b: IPageConfigData) => a.sort - b.sort).map((val: IPageConfigData, key: number) => {
              return <a className="p-3 text-black hover:text-green-700 leading-15 text-xl" href={val.action || '#'} key={key}>{val.name}</a>
            })}
          </div>
        </div>
      })}
    </div>
    <div className="flex-1">
      <Edit filter="user_profile" />
      {username ? <><Button
        className="w-full"
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
            return <MenuItem className="portal_menu_item" key={k} onClick={(e) => router.push(v.action)}>
              <ListItemIcon className="portal_menu_icon">
                {v.action === '/apps' && <Settings fontSize="small" />}
                {v.action === '/logout' && <Logout fontSize="small" />}
              </ListItemIcon>
              {v.name}
            </MenuItem>
          })}
          {/* <MenuItem onClick={(e) => router.push('/apps')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          应用列表
        </MenuItem> */}
          {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <span>我的账号</span>
        </MenuItem> */}
          {/* <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          退出
        </MenuItem> */}
        </Menu></> : <>
        <Link href="/login"><a className="text-green-700 hover:text-gray-700 hover:border hover:border-green-700 p-4">登录</a></Link>
        <Link href="/register"><a className="hover:text-green-700 hover:border-green-700 p-4 border border-gray-300">注册</a></Link>
      </>}
    </div>
  </div>)
}