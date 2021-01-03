module.exports = ctx => {
  ctx.body = {
    data: [
      {
        id: 101,
        authName: '用户管理',
        path: null,
        children: [{
          id: 1011,
          authName: '用户列表',
          path: 'users',
          children: []
        }]
      },
      {
        id: 102,
        authName: '权限管理',
        path: null,
        children: [{
          id: 1021,
          authName: '角色列表',
          path: 'roles',
          children: []
        },
        {
          id: 1022,
          authName: '权限列表',
          path: 'rights',
          children: []
        }
        ]
      },
      {
        id: 103,
        authName: '商品管理',
        path: null,
        children: [{
          id: 1031,
          authName: '商品列表',
          path: 'cartlist',
          children: []
        }, {
          id: 1032,
          authName: '分类参数',
          path: 'sortpar',
          children: []
        }, {
          id: 1033,
          authName: '商品分类',
          path: 'goodclass',
          children: []
        }]
      },
      {
        id: 104,
        authName: '订单管理',
        path: null,
        children: [{
          id: 1041,
          authName: '商品列表',
          path: 'order',
          children: []
        }]
      },
      {
        id: 105,
        authName: '数据统计',
        path: null,
        children: [{
          id: 1051,
          authName: '商品列表',
          path: 'data',
          children: []
        }]
      }
    ],
    meta: {
      status: 200,
      msg: '获取菜单列表失败'
    }
  }
}
