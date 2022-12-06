import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router()
const port = 8000


router.get('/response', (context: RouterContext) => {
    context.response.body = {
        message: "hello world"
    }
})

router.post('/request', async ( {request, response} :  RouterContext) => {
    const { username, id } = await request.body().value

    console.log(username, id)

    response.body = {username, id}
})

app.use(router.routes())    
app.use(router.allowedMethods())

console.log(`server running on port ${port}`)

await app.listen({ port:8000 });