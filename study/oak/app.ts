import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router()
const port = 8000


router.get('/', (context: RouterContext) => {
    context.response.body = {
        message: "hello world"
    }
})

app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({ port:8000 });