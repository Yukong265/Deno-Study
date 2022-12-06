import { serve } from "https://deno.land/std@0.157.0/http/server.ts";

const port = 8000

const handler = async (request : Request): Promise<Response> => {
    const resp = await fetch("https://api.github.com/users/denoland", {
        headers: {
            accept: "application/json",
        }
    })

    return new Response(resp.body, {
        status: resp.status,
        headers: {
            "content-type" : "application/json",
        }
    })
}

serve(handler);