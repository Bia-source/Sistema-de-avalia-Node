import { Request, Response } from "express";
import { DeleteUserService } from "../../services/UserService/DeleteUserService";

class DeleteUserController{
    async handle(request: Request, response: Response) {
        const { id } = request.body;
        const deleteUserService = new DeleteUserService();
        const userDelete = await deleteUserService.execute(id);
        return response.json({ user: userDelete });
    }
}

export { DeleteUserController }