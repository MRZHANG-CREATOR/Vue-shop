module.exports = async ctx => {
  try {
    ctx.body = {
      data: [
        {
          id: 32,
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: null,
              children: [
                {
                  id: 104,
                  authName: '商品列表',
                  path: null,
                  children: [
                    {
                      id: 105,
                      authName: '商品修改',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '更新商品图片',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '更新商品属性',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '更新商品状态',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '获取商品详情',
                      path: null
                    },
                    {
                      id: 105,
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
                      id: 105,
                      authName: '获取商品参数',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '修改商品参数',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '删除商品参数',
                      path: null
                    }
                  ]
                }, {
                  id: 104,
                  authName: '商品分类',
                  path: null,
                  children: [
                    {
                      id: 105,
                      authName: '添加商品分类',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '删除商品分类',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '获取商品分类',
                      path: null
                    }
                  ]
                }
              ]
            }, {
              id: 101,
              authName: '订单管理',
              path: null,
              children: [
                {
                  id: 101,
                  authName: '订单列表',
                  path: null,
                  children: [
                    {
                      id: 101,
                      authName: '添加订单',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '订单更新',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '获取订单详情',
                      path: null
                    }
                  ]
                }
              ]
            },
            {
              id: 101,
              authName: '权限管理',
              path: null,
              children: [
                {
                  id: 101,
                  authName: '角色列表',
                  path: null,
                  children: [
                    {
                      id: 101,
                      authName: '添加角色',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '删除角色',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '角色授权',
                      path: null
                    }
                  ]
                },
                {
                  id: 101,
                  authName: '权限列表',
                  path: null,
                  children: [
                    {
                      id: 101,
                      authName: '添加订单',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '订单更新',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '获取订单详情',
                      path: null
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 30,
          roleName: '总经理',
          roleDesc: '技术负责人',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: null,
              children: [
                {
                  id: 104,
                  authName: '商品列表',
                  path: null,
                  children: [
                    {
                      id: 105,
                      authName: '商品修改',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '更新商品图片',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '更新商品属性',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '更新商品状态',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '获取商品详情',
                      path: null
                    },
                    {
                      id: 105,
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
                      id: 105,
                      authName: '获取商品参数',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '修改商品参数',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '删除商品参数',
                      path: null
                    }
                  ]
                }, {
                  id: 104,
                  authName: '商品分类',
                  path: null,
                  children: [
                    {
                      id: 105,
                      authName: '添加商品分类',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '删除商品分类',
                      path: null
                    },
                    {
                      id: 105,
                      authName: '获取商品分类',
                      path: null
                    }
                  ]
                }
              ]
            }, {
              id: 101,
              authName: '订单管理',
              path: null,
              children: [
                {
                  id: 101,
                  authName: '订单列表',
                  path: null,
                  children: [
                    {
                      id: 101,
                      authName: '添加订单',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '订单更新',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '获取订单详情',
                      path: null
                    }
                  ]
                }
              ]
            },
            {
              id: 101,
              authName: '权限管理',
              path: null,
              children: [
                {
                  id: 101,
                  authName: '角色列表',
                  path: null,
                  children: [
                    {
                      id: 101,
                      authName: '添加角色',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '删除角色',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '角色授权',
                      path: null
                    }
                  ]
                },
                {
                  id: 101,
                  authName: '权限列表',
                  path: null,
                  children: [
                    {
                      id: 101,
                      authName: '添加订单',
                      path: null
                    },
                    {
                      id: 101,
                      authName: '订单更新',
                      path: null
                    },
                    {
                      id: 101,
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
          ]
        }
      ],
      meta: {
        msg: 'roles获取成功',
        status: 200
      }
    }
  } catch (err) {
    ctx.body =
    {
      data: {
      },
      meta: {
        msg: 'roles获取失败',
        status: 400
      }
    }
  }
}
