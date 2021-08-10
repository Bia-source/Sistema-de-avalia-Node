import { Request, Response } from "express";
import { UpdateStateAdminService } from "../../services/UserService/UpdateStateAdminService";

class UpdateStatAdminController{
    async handle(request: Request, response: Response) {
        const { id } = request.body;
        const updateStateAdminService = new UpdateStateAdminService()
        const updateUser = await updateStateAdminService.execute(id);
        return response.json({ user: updateUser });
   }
}

export { UpdateStatAdminController }