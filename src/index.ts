import server from "./server/Server";
import 'dotenv/config'
import { Knex } from "./server/database/knex";

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3333}`);
    });
};

if (process.env.IS_LOCALHOST !== 'true') {
    console.log('Rodando migrations');

    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed.run()
                .then(() => startServer())
                .catch(err => console.log('TESTE DEPLOY',err));
        })
        .catch((err => console.log('TESTE DEPLOY2', err)))
} else {
    startServer();
}