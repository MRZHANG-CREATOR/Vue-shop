module.exports = ctx => {
    console.log(ctx.params)
    ctx.body = {
        data: [
        {
          attr_id: 1,
          attr_name: '版式',
          cat_id: 22,
          attr_sel: 'only ',
          attr_write: 'manual ',
          attr_vals: 'ffff 444 444 52525 66 62526 77 88 9 9'
        },
        {
          attr_id: 2,
          attr_name: '颜色',
          cat_id: 23,
          attr_sel: 'only ',
          attr_write: 'manual ',
          attr_vals: 'ffff 444 444 55 66 6346 77 88 9 9'
        },
        {
          attr_id: 3,
          attr_name: '尺寸',
          cat_id: 24,
          attr_sel: 'only ',
          attr_write: 'manual ',
          attr_vals: 'ffff 444 444 55 66 66 77 8435348 9 9'
        }
      ],
      meta: {
        msg: '获取成功 ',
        status: 200
      }
    }
}
