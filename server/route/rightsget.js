module.exports = async ctx => {
  const { type } = ctx.query
  console.log(type)
  if (type === 'list') {
    try {
      ctx.body = {
        data: [
          {
            id: 101,
            authName: '用户管理',
            path: 'users',
            level: 0,
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
            path: 'rights',
            level: 0,
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
            path: 'goods',
            level: 1,
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
            path: 'orders',
            level: 2,
            children: [{
              id: 1041,
              authName: '商品列表',
              path: 'orders',
              children: []
            }]
          },
          {
            id: 105,
            authName: '数据统计',
            path: 'datas',
            level: 2,
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
          msg: '获取权限列表失败'
        }
      }
    } catch (err) {
      ctx.body =
      {
        data: {
        },
        meta: {
          msg: '权限列表获取成功',
          status: 200
        }
      }
    }
  } else if (type === 'tree') {
    try {
      ctx.body = {
        data: [
          {
            id: 101,
            authName: '商品管理',
            path: null,
            children: [
              {
                id: 1011,
                authName: '商品列表',
                path: null,
                children: [
                  {
                    id: 1012,
                    authName: '商品修改',
                    path: null
                  },
                  {
                    id: 1013,
                    authName: '更新商品图片',
                    path: null
                  },
                  {
                    id: 1014,
                    authName: '更新商品属性',
                    path: null
                  },
                  {
                    id: 1015,
                    authName: '更新商品状态',
                    path: null
                  },
                  {
                    id: 1016,
                    authName: '获取商品详情',
                    path: null
                  },
                  {
                    id: 1017,
                    authName: '删除商品',
                    path: null
                  }
                ]
              }, {
                id: 104,
                authName: '分类参数',
                path: null,
                children: [
                  {
                    id: 1041,
                    authName: '获取商品参数',
                    path: null
                  },
                  {
                    id: 1042,
                    authName: '修改商品参数',
                    path: null
                  },
                  {
                    id: 1043,
                    authName: '删除商品参数',
                    path: null
                  }
                ]
              }, {
                id: 105,
                authName: '商品分类',
                path: null,
                children: [
                  {
                    id: 1051,
                    authName: '添加商品分类',
                    path: null
                  },
                  {
                    id: 1052,
                    authName: '删除商品分类',
                    path: null
                  },
                  {
                    id: 1053,
                    authName: '获取商品分类',
                    path: null
                  }
                ]
              }
            ]
          }, {
            id: 103,
            authName: '订单管理',
            path: null,
            children: [
              {
                id: 1031,
                authName: '订单列表',
                path: null,
                children: [
                  {
                    id: 1032,
                    authName: '添加订单',
                    path: null
                  },
                  {
                    id: 1033,
                    authName: '订单更新',
                    path: null
                  },
                  {
                    id: 1034,
                    authName: '获取订单详情',
                    path: null
                  }
                ]
              }
            ]
          },
          {
            id: 104,
            authName: '权限管理',
            path: null,
            children: [
              {
                id: 1041,
                authName: '角色列表',
                path: null,
                children: [
                  {
                    id: 1042,
                    authName: '添加角色',
                    path: null
                  },
                  {
                    id: 1043,
                    authName: '删除角色',
                    path: null
                  },
                  {
                    id: 1044,
                    authName: '角色授权',
                    path: null
                  }
                ]
              },
              {
                id: 106,
                authName: '权限列表',
                path: null,
                children: [
                  {
                    id: 1061,
                    authName: '添加订单',
                    path: null
                  },
                  {
                    id: 1062,
                    authName: '订单更新',
                    path: null
                  },
                  {
                    id: 1063,
                    authName: '获取订单详情',
                    path: null
                  }
                ]
              }
            ]
          },
          {
            id: 107,
            authName: '用户管理',
            path: null,
            children: [
              {
                id: 1071,
                authName: '角色列表',
                path: null,
                children: [
                  {
                    id: 1072,
                    authName: '添加角色',
                    path: null
                  },
                  {
                    id: 1073,
                    authName: '删除角色',
                    path: null
                  },
                  {
                    id: 1074,
                    authName: '角色授权',
                    path: null
                  }
                ]
              },
              {
                id: 108,
                authName: '权限列表',
                path: null,
                children: [
                  {
                    id: 1081,
                    authName: '添加订单',
                    path: null
                  },
                  {
                    id: 1082,
                    authName: '订单更新',
                    path: null
                  },
                  {
                    id: 1083,
                    authName: '获取订单详情',
                    path: null
                  }
                ]
              }
            ]
          },
          {
            id: 109,
            authName: '数据统计',
            path: null,
            children: [
              {
                id: 1091,
                authName: '角色列表',
                path: null,
                children: [
                  {
                    id: 1092,
                    authName: '添加角色',
                    path: null
                  },
                  {
                    id: 1093,
                    authName: '删除角色',
                    path: null
                  },
                  {
                    id: 1094,
                    authName: '角色授权',
                    path: null
                  }
                ]
              },
              {
                id: 110,
                authName: '权限列表',
                path: null,
                children: [
                  {
                    id: 1101,
                    authName: '添加订单',
                    path: null
                  },
                  {
                    id: 1102,
                    authName: '订单更新',
                    path: null
                  },
                  {
                    id: 1103,
                    authName: '获取订单详情',
                    path: null
                  }
                ]
              }
            ]
          }
        ],
        meta: {
          status: 200,
          msg: '获取权限列表失败'
        }
      }
    } catch (err) {
      ctx.body =
      {
        data: {
        },
        meta: {
          msg: '权限列表获取成功',
          status: 200
        }
      }
    }
  } else {
    ctx.body =
      {
        data: {
        },
        meta: {
          msg: '权限列表获取成功',
          status: 200
        }
      }
  }
}
