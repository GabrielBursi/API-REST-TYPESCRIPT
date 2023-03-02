import server from "./server/Server";
import 'dotenv/config'
import { Knex } from "./server/database/knex";

const startServer = () => {
    server.listen(process.env.PORT || 3000, () => {
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
                .catch(err => console.log('erro no seed run',err));
        })
        .catch((err => console.log('erro no migrate', err)))
} else {
    startServer();
}