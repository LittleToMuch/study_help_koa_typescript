import Router, {RouterContext} from "koa-router";
import * as IndexService from '../service/index'

export const indexSwiper = async (ctx: Router.RouterContext, next: any) => {
    try {
        console.log(ctx.request.query);
        const data = await IndexService.indexSwiper()
        ctx.body = data
    } catch (e) {
        console.error(e)
        ctx.body = { code: 400, err: e }
    }
};

export const indexSlider = async (ctx: Router.RouterContext, next: any) => {
    try {
        console.log(ctx.request.query);
        const data = await IndexService.indexSlider()
        ctx.body = data
    } catch (e) {
        console.error(e)
        ctx.body = { code: 400, err: e }
    }
};