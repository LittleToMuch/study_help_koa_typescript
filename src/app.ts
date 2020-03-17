import Koa from 'koa';
const app: Koa = new Koa();

import Debug from 'debug';
const debug = Debug('http');

import views from 'koa-views';
import serve from 'koa-static';
import session from 'koa-session';
import koaBody from 'koa-body';
import path from 'path'

import index from './routes/index';
import users from './routes/users';
import tutsau from './routes/tutsau';
import experience from './routes/experience';
import learning from './routes/learningStrategy';
import upshow from './routes/upshow'
import admin from './routes/admin'

// koa-session
app.keys = ['hyh'];
const CONFIG: Partial<session.opts> = {
    maxAge: 8 * 60 * 60,
    httpOnly: true
}
app.use(session(CONFIG, app))
app.use(koaBody({
    multipart:true, // 支持文件上传
    formidable:{
      uploadDir:path.join(__dirname,'/public/upload/'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:(name,file) => { // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    }
}));

// body parser
// app.use(bodyParser({
//     enableTypes:['json', 'learning', 'text']
// }));


app.use(serve(__dirname + '/public'));
app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// logger
app.use(async (ctx:Koa.Context, next:Function) => {
    const start:number = Date.now();
    await next();
    const now:number = Date.now();
    const ms = now - start;
    debug(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.use(tutsau.routes()).use(tutsau.allowedMethods());
app.use(experience.routes()).use(experience.allowedMethods())
app.use(learning.routes()).use(learning.allowedMethods())
app.use(upshow.routes()).use(upshow.allowedMethods())
app.use(admin.routes()).use(admin.allowedMethods())

// error-handling
app.on('error', (err:Error, ctx:Koa.Context) => {
    console.error('server error', err, ctx)
});

export default app;
