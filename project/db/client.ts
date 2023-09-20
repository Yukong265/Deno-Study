import { Client } from "https://deno.land/x/mysql/mod.ts";
import { DATABASE, TABLE } from "./config.ts";
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts"

const env = await load();

const client = await new Client().connect({
    hostname:"127.0.0.1",
    username: env["DATABASE_USERNAME"],
    password: env["DATABASE_PASSWORD"],
    db:"deno"
})

const run = async () => {
    await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`)

    await client.execute(`USE ${DATABASE}`)

    await client.execute(`
        CREATE TABLE IF NOT EXISTS ${TABLE.post} (
            id int(11) NOT NULL AUTO_INCREMENT,
            title varchar(30) NOT NULL,
            content varchar(100) NOT NULL,
            PRIMARY KEY(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
};

run()


export default client;