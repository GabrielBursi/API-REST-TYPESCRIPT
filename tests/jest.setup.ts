import supertest from "supertest"
import server from "../src/server/Server"

const testServer = supertest(server)