import express, { Application } from 'express';
import cors from 'cors';
import { Controller } from './controller';

require('dotenv').config();
const app: Application = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/api/punycode/test', Controller.testPuny);
app.get('/api/punycode/encode', Controller.encodePuny);
app.get('/api/punycode/decode', Controller.decodePuny);
app.get('/api/punycode/convert', Controller.convertPuny);

app.get('/api/email/convert', Controller.convertEmail);

app.get('/api/domain/info', Controller.getDomainInfo);
app.get('/api/domain/reverse', Controller.getDomainByIp);

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT));

