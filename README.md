# Deno


<img align="right" src="https://deno.land/logo.svg" height="150px" alt="the deno mascot dinosaur standing in the rain">

Deno is a _simple_, _modern_ and _secure_ runtime for **JavaScript** and
**TypeScript** that uses V8 and is built in Rust.

### Features

- Secure by default. No file, network, or environment access, unless explicitly
  enabled.
- Supports TypeScript out of the box.
- Ships only a single executable file.
- [Built-in utilities.](https://deno.land/manual/tools#built-in-tooling)
- Set of reviewed standard modules that are guaranteed to work with
  [Deno](https://deno.land/std/).

### Install

Shell (Mac, Linux):

```sh
curl -fsSL https://deno.land/install.sh | sh
```

PowerShell (Windows):

```powershell
irm https://deno.land/install.ps1 | iex
```

[Homebrew](https://formulae.brew.sh/formula/deno) (Mac):

```sh
brew install deno
```

[Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```powershell
choco install deno
```

[Scoop](https://scoop.sh/) (Windows):

```powershell
scoop install deno
```

Build and install from source using [Cargo](https://crates.io/crates/deno):

```sh
cargo install deno --locked
```

See
[deno_install](https://github.com/denoland/deno_install/blob/master/README.md)
and [releases](https://github.com/denoland/deno/releases) for other options.

### Getting Started

Try running a simple program:

```sh
deno run https://deno.land/std/examples/welcome.ts
```

Or a more complex one:

```ts
const listener = Deno.listen({ port: 8000 });
console.log("http://localhost:8000/");

for await (const conn of listener) {
  serve(conn);
}

async function serve(conn: Deno.Conn) {
  for await (const { respondWith } of Deno.serveHttp(conn)) {
    respondWith(new Response("Hello world"));
  }
}
```

You can find a deeper introduction, examples, and environment setup guides in
the [manual](https://deno.land/manual).

The complete API reference is available at the runtime
[documentation](https://doc.deno.land).

### Contributing

We appreciate your help!

To contribute, please read our
[contributing instructions](https://deno.land/manual/contributing).


=======
# Deno-Study
Node.js의 업데이트가 끝나고 나온 Deno를 공부하는 레포입니다.
    
>>>>>>> Stashed changes
