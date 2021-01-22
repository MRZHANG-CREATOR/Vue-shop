module.exports = ctx => {
    const { id, attrid } = ctx.params
    console.log(id)
    if (id && attrid) {
        ctx.body = {
            data: null,
            meta: {
                status: 200,
                msg: '删除成功'
            }
        }
    } else {
        ctx.body = {
            data: null,
            meta: {
                status: 400,
                msg: '删除失败'
            }
        }
    }
}
