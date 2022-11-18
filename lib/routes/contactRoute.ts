import { Request, Response } from "express";
import { ContactController } from "../controllers/contactController";

export class Routes {
    public contactController: ContactController = new ContactController();
    
    public routes(app): void {
        app.route('/')
            .get((_req: Request, res: Response) => {
                let response = {
                    message: 'GET Response Successfull'
                }
                res.status(200).send(response);
            });

        app.route('/contact')
            .get(this.contactController.getContacts)
            .post(this.contactController.addNewContact);

        app.route('/contact/:id')
            .get(this.contactController.getContactById)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }
}