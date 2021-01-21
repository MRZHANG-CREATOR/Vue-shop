module.exports = async ctx => {
  // const { type } = ctx.query
  // console.log(ctx.request.body)
  // console.log(ctx.query.name)
  console.log(ctx.query.type)
  const { type, sel } = ctx.query
  if (sel === 'many') {
    ctx.body = {
      data: [
        {
          attr_id: 1,
          attr_name: "cpu",
          cat_id: 22,
          attr_sel: "only",
          attr_write: "manual",
          attr_vals: "ffff"
        }
      ],
      meta: {
        msg: "获取成功",
        status: 200
      }
    }
  }

  if (type && !sel) {
    if (type === '3') {
      ctx.body =
      {
        data: {
          pagenum: 0,
          pagesize: 5,
          result: [{
            cat_id: 1,
            cat_name: '大家电',
            cat_pid: 0,
            cat_level: 0,
            cat_deleted: false,
            children: [
              {
                cat_id: 3,
                cat_name: '电视',
                cat_pid: 1,
                cat_level: 1,
                cat_deleted: false,
                children: [
                  {
                    cat_id: 6,
                    cat_name: '曲面电视',
                    cat_pid: 3,
                    cat_level: 2,
                    cat_deleted: false
                  },
                  {
                    cat_id: 7,
                    cat_name: '海信',
                    cat_pid: 3,
                    cat_level: 2,
                    cat_deleted: false
                  }
                ]
              }
            ]
          }, {
            cat_name: '热门推荐'
          }, {
            cat_name: '海外购'
          }, {
            cat_name: '苏宁房产'
          }, {
            cat_name: '手机相机'
          }],
          total: 100
        },
        meta: {
          msg: 'roles获取失败',
          status: 200
        }
      }
    } else if (type === '2') {
      ctx.body =
      {
        data:
          [{
            cat_id: 1,
            cat_name: '大家电',
            cat_pid: 0,
            cat_level: 0,
            cat_deleted: false,
            children: [
              {
                cat_id: 3,
                cat_name: '电视',
                cat_pid: 1,
                cat_level: 1,
                cat_deleted: false
              }
            ]
          }, {
            cat_name: '热门推荐'
          }, {
            cat_name: '海外购'
          }, {
            cat_name: '苏宁房产'
          }, {
            cat_name: '手机相机'
          }],
        meta: {
          msg: 'roles获取失败',
          status: 200
        }
      }
    }
  }
}
