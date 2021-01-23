module.exports = ctx => {
    console.log(ctx.params.id)
    ctx.body = {
        data: null,
        meta: {
            status: 200,
            msg: '删除成功'
        }
    }
}
