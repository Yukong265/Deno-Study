import { Application, FlashServer, hasFlash } from "https://deno.land/x/oak/mod.ts";

const appOptions = hasFlash() ? { severConstructor: FlashServer } : undefined;

const app = new Application(appOptions);

app.listen();