module.exports = async ctx => {
  try {
    ctx.body = {
      data: [
        {
          id: 30,
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
                      authName: '添加商品',
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
