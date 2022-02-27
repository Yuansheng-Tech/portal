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

import styles from './nav.header.module.scss';


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
  return (<div className={styles.nav_header}>
    <a href="/" className={styles.nav_header_a}>
      <Edit filter="logo_slogen" />
      {logoAndSlogenData[0].logo && <Image
        className={styles.nav_header_logo}
        src={logoAndSlogenData[0].logo}
        alt="logo"
        width="62px"
        height="62px"
      />}
    </a>
    <div className={styles.navs}>
      <Edit filter="top" />
      {(stashData['parent'] || []).sort((a: IPageConfigData, b: IPageConfigData) => a.sort - b.sort).map((v: IPageConfigData, k: number) => {
        return <div className={styles.nav_item} key={k}>
          <div className={styles.nav_item_title}>
            {/\.png$/.test(v.icon) ? <img
              className={styles.nav_item_icon}
              src={v.icon}
              alt="logo"
              width="36px"
              height="36px"
            /> : <svg className="icon" aria-hidden="true">
              <use xlinkHref={"#" + v.icon}></use>
            </svg>}
            <div className={styles.nav_item_title}>{v.name}</div>
          </div>
          <div className={styles.nav_item_child}>
            {(stashData[v.id] || []).sort((a: IPageConfigData, b: IPageConfigData) => a.sort - b.sort).map((val: IPageConfigData, key: number) => {
              return <a href={val.action || '#'} className={styles.nav_item_child_title} key={key}>{val.name}</a>
            })}
          </div>
        </div>
      })}
    </div>
    <div className={styles.navs_user}>
      <Edit filter="user_profile" />
      {username ? <><Button
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
            return <MenuItem key={k} onClick={(e) => router.push(v.action)} className={styles.portal_menu_item}>
              <ListItemIcon className={styles.portal_menu_icon}>
                {v.action === '/apps' && <Settings fontSize="small" />}
                {v.action === '/logout' && <Logout fontSize="small" />}
              </ListItemIcon>
              {v.name}
            </MenuItem>
          })}
          {/* <MenuItem onClick={(e) => router.push('/apps')} className={styles.portal_menu_item}>
          <ListItemIcon className={styles.portal_menu_icon}>
            <Settings fontSize="small" />
          </ListItemIcon>
          应用列表
        </MenuItem> */}
          {/* <MenuItem onClick={handleClose} className={styles.portal_menu_item}>
          <ListItemIcon className={styles.portal_menu_icon}>
            <Settings fontSize="small" />
          </ListItemIcon>
          <span>我的账号</span>
        </MenuItem> */}
          {/* <MenuItem onClick={logout} className={styles.portal_menu_item}>
          <ListItemIcon className={styles.portal_menu_icon}>
            <Logout fontSize="small" />
          </ListItemIcon>
          退出
        </MenuItem> */}
        </Menu></> : <>
        <Link href="/login"><a className={styles.nav_item_login}>登录</a></Link>
        <Link href="/register"><a className={styles.nav_item_register}>注册</a></Link>
      </>}
    </div>
  </div>)
}
