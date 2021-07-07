import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import UserView from '../views/UserView';
import User from '../models/User';

export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User)

    const users = await usersRepository.find({
      relations: ['avatar']
    });

    return response.json(UserView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const usersRepository = getRepository(User)

    const user = await usersRepository.findOneOrFail(id, {
      relations: ['avatar']
    });

    return response.json(UserView.render(user));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password
    } = request.body;
  
    const usersRepository = getRepository(User);
  
    const requestAvatar = request.files as Express.Multer.File[];
    
    const avatar = requestAvatar.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      email,
      password,
      avatar
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      avatar: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);
  
    await usersRepository.save(user);
  
    return response.status(201).json(user);
  }
}