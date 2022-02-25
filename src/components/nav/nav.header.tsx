import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Link from 'next/link'

import _groupby from 'lodash.groupby'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

import { logout } from '../../api/auth'

import styles from './nav.header.module.scss'

import { navData } from './nav.header.data'

import useFetchData from '../common/hooks/useFetchData';

export default function({
  children
}) {
  let username = ''
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('username');
  }
  
  const router = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const { data = {}, loading, error } = useFetchData(`/app/page/configs`, {
    query: {
      where: JSON.stringify({
        position: 'top'
      })
    }
  });
  const { data: resuldData = [] } = data;
  let stashData = {}
  if (!resuldData.length) {
    return null;
  } else {
    stashData = _groupby(resuldData, v => !v.parent.trim() ? 'parent' : v.parent)
  }
  console.log('data, loading, error', data, loading, error, _groupby(resuldData, v => !v.parent.trim() ? 'parent' : v.parent));

  return (<div className={styles.nav_header}>
    <a href="/" className={styles.nav_header_a}>
      <Image
        className={styles.nav_header_logo}
        src="/logo.png"
        alt="logo"
        width="62px"
        height="62px"
      />
    </a>
    <div className={styles.navs}>
      {stashData['parent'].sort().map((v, k) => {
        return <div className={styles.nav_item} key={k}>
          <div className={styles.nav_item_title}>
            {/\.png$/.test(v.icon) ? <img
              className={styles.nav_item_icon}
              src={v.icon}
              alt="logo"
              width="36px"
              height="36px"
            /> : <svg className="icon" aria-hidden="true">
                <use xlinkHref={"#"+v.icon}></use>
            </svg>}
            <div className={styles.nav_item_title}>{v.name}</div>
          </div>
          <div className={styles.nav_item_child}>
            {stashData[v.id].sort().map((val, key) => {
              return <a href={val.url} className={styles.nav_item_child_title} key={key}>{val.name}</a>
            })}
          </div>
        </div>
      })}
      {<div className={styles.nav_item2}>
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
          <MenuItem onClick={(e) => router.push('/apps')} className={styles.portal_menu_item}>
            <ListItemIcon className={styles.portal_menu_icon}>
              <Settings fontSize="small" />
            </ListItemIcon>
            应用列表
          </MenuItem>
          {/* <MenuItem onClick={handleClose} className={styles.portal_menu_item}>
            <ListItemIcon className={styles.portal_menu_icon}>
              <Settings fontSize="small" />
            </ListItemIcon>
            <span>我的账号</span>
          </MenuItem> */}
          <MenuItem onClick={logout} className={styles.portal_menu_item}>
            <ListItemIcon className={styles.portal_menu_icon}>
              <Logout fontSize="small" />
            </ListItemIcon>
            退出
          </MenuItem>
        </Menu></> : <>
        <Link href="/login"><a className={styles.nav_item_login}>登录</a></Link>
        <Link href="/register"><a className={styles.nav_item_register}>注册</a></Link>
        </>}
      </div>}
    </div>
  </div>)
}