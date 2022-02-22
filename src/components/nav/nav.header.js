import * as React from 'react';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { logout } from '../../api/auth'

import styles from './nav.header.module.scss'

import { navData } from './nav.header.data'

export default function({
  children
}) {
  let username = ''
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('username');
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      {navData.map((v, k) => {
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
            <div className={styles.nav_item_title}>{v.title}</div>
          </div>
          <div className={styles.nav_item_child}>
            {v.children.map((val, key) => {
              return <a className={styles.nav_item_child_title} key={key}>{val.title}</a>
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
          onClick={handleClick}
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
          {/* <MenuItem onClick={handleClose} className={styles.portal_menu_item}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            我的账号
          </MenuItem> */}
          <MenuItem onClick={logout} className={styles.portal_menu_item}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            退出
          </MenuItem>
        </Menu></> : <>
        <a href="/login" className={styles.nav_item_login}>登录</a>
        <a href="/register" className={styles.nav_item_register}>注册</a>
        </>}
      </div>}
    </div>
  </div>)
}