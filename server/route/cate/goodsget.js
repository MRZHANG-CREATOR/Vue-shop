module.exports = ctx => {
    // console.log(ctx.query)
    const { query, pagenum, pagesize } = ctx.query
    console.log(query, pagenum, pagesize)
    ctx.body = {
        data: {
            total: 50,
            pagenum: 1,
            goods: [
                {
                    goods_id: 144,
                    goods_name: '大电视',
                    goods_price: 1,
                    goods_number: 1,
                    goods_weight: 1,
                    goods_state: null,
                    add_time: 1512954923,
                    upd_time: 1512954923,
                    hot_mumber: 0,
                    is_promote: false
                },
                {
                    goods_id: 145,
                    goods_name: '小电视',
                    goods_price: 1,
                    goods_number: 1,
                    goods_weight: 1,
                    goods_state: null,
                    add_time: 1512954923,
                    upd_time: 1512954923,
                    hot_mumber: 0,
                    is_promote: false
                }
            ]
        },
        meta: {
             msg: '获取成功',
             status: 200
        }
    }
}
