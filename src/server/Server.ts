import express from 'express';
import cors from 'cors'

import { router } from './routes';

import './shared/services/Traducoes'

const server = express();

server.use(express.json())
server.use(cors({
    origin: process.env.ENABLE_CORS?.split(';') || []
}))
server.use(router)

export default server