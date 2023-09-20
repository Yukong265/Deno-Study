import {
  Application,
  Router,
  helpers,
  Context,
} from "https://deno.land/x/oak/mod.ts";
import client from "./db/client.ts";


const { getQuery } = helpers;

const app = new Application();
const router = new Router();
const port = 8000;

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

router
  .get("/post", async (ctx: Context) => {
    ctx.response.body = await client.query(`SELECT * FROM post`);
  })
  .post("/post", async (ctx: Context) => {
    if (!ctx.request.hasBody){
      ctx.throw(415);
    }
    const body = await ctx.request.body().value;
    await client.execute(`INSERT INTO post(title, content) VALUES(?, ?)`, [body.title, body.content]);
    ctx.response.status = 200;
    ctx.response.body = {
      "message" : "success",
      "code" : 200
    }
  });

router
  .get("/users/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
  })
  .get("/users/email/:email", async (ctx: Context) => {
    const { email } = getQuery(ctx, { mergeParams: true });
  })
  .get("/users/:id/address", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
  })
  .post("/users", async (ctx: Context) => {
    const body = ctx.request.body();
    const user = await body.value;
  })
  .post("/users/:id/address", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    const body = ctx.request.body();
    const address = await body.value;
  })
  .delete("/users/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
  });

console.log(`server running on port ${port}`);

await app.listen({ port: 8000 });
