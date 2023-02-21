import server from "./server/Server";
import 'dotenv/config'
import { Knex } from "./server/database/knex";

if(process.env.IS_LOCALHOST !== 'true'){
    Knex.migrate.latest()
        .then(() => {
            server.listen(process.env.PORT || 3000)
        })
}else{
    server.listen(process.env.PORT || 3000)
}