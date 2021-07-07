import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);


routes.post('/users', upload.array('avatar'), UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);

export default routes;