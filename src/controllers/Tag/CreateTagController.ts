import { Request, Response } from 'express';
import { CreateTagService } from '../../services/TagService/CreateTagService';

class CreateTagController {
  async handle(request:Request, response: Response){
    const { name } = request.body;
    const tagService = new CreateTagService();
    const tag = await tagService.execute({name});
    return response.status(201).json(tag);
  }
}

export { CreateTagController }