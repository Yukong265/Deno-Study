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

app.use(async (ctx:Context) => {
  const result = ctx.request.body({ type:"json" })
  const text = await result.value;
  ctx.request.body = text[0];
})

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

router
  .get("/posts", async (ctx: Context) => {
    ctx.response.body = await client.query(`SELECT * FROM post`);
  })
  .get("/post/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    const post = await client.query("SELECT * FROM post WHERE id = ?", [
      Number(id),
    ]);
    if (post.length == 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        message: "post not found",
        code: 404,
      };
    } else {
      ctx.response.body = post;
    }
  })
  .post("/post", async (ctx: Context) => {
    if (!ctx.request.hasBody) {
      ctx.throw(415);
    }
    const body = await ctx.request.body().value;
    await client.execute(`INSERT INTO post(title, content) VALUES(?, ?)`, [
      body.title,
      body.content,
    ]);
    ctx.response.status = 201;
    ctx.response.body = {
      message: "success",
      code: 201,
    };
  })
  .put("/post/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    if (!ctx.request.body) {
      ctx.throw(415);
    } else {
      const body = await ctx.request.body().value;
      const post = await client.execute(
        `UPDATE post SET title = ?, content = ? WHERE id = ?`,
        [body.title, body.content, id]
      );
      if (!post) {
        ctx.throw(404);
      }
      ctx.response.body = {
        message: "success",
        code: 200,
      };
    }
  })
  .delete("/post/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    if (!ctx.request.body) {
      ctx.throw(415);
    } else {
      await client.execute(`DELETE FROM post WHERE id = ?`, [id]);
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
