import { Application, Router } from "https://deno.land/x/oak/mod.ts"

const app = new Application();
const router = new Router();
const port = 8000

app.use(router.routes())
app.use(router.allowedMethods())

router.get("/", (ctx) => {
    ctx.response.body =  "Hello World!"
})

console.log(`server running on port ${port}`)

await app.listen({ port:8000 })