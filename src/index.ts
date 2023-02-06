import server from "./server/Server";
import 'dotenv/config'

server.listen(process.env.PORT || 3000)