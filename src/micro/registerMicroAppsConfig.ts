const loader = (loading: boolean) => {
  // 此处可以获取微应用是否加载成功,可以用来触发全局的 loading
  console.log('loading', loading);
};

export const Microconfig = [
  //name: 微应用的名称,
  //entry: 微应用的入口,
  //container: 微应用的容器节点的选择器或者 Element 实例,
  //activeRule: 激活微应用的规则(可以匹配到微应用的路由),
  //loader: 加载微应用的状态 true | false
  {
    name: 'companies',
    entry: 'http://admin.yuansheng.com',
    container: '#mainView',
    activeRule: '/memo/companies',
    loader,
  },
  {
    name: 'wechats',
    entry: 'http://admin.yuansheng.com',
    container: '#mainView',
    activeRule: '/wechats',
    loader,
  },
  {
    name: 'wechat',
    entry: 'http://admin.yuansheng.com',
    container: '#mainView',
    activeRule: '/wechat',
    loader,
  },
  {
    name: 'luckysheet',
    entry: 'http://admin.yuansheng.com',
    container: '#mainView',
    activeRule: '/luckysheet',
    loader,
  },
  {
    name: 'login',
    entry: 'http://admin.yuansheng.com',
    container: '#mainView',
    activeRule: '/login',
    loader: (loading: boolean) => {
      if (loading) {
        console.log('login1', loading)
      } else {
        console.log('login2', loading)
      }
      return;
    },
  },
  {
    name: 'register',
    entry: 'http://admin.yuansheng.com',
    container: '#mainView',
    activeRule: '/register',
    loader,
  },
];
