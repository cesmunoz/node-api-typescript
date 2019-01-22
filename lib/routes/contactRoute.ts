import { Request, Response } from "express";
import { ContactController } from "../controllers/contactController";

export class Routes {
    public contactControlller: ContactController = new ContactController();
    
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                let response = {
                    message: 'GET Response Successfull'
                }
                res.status(200).send(response);
            });

        app.route('/contact')
            .get(this.contactControlller.getContacts)
            .post(this.contactControlller.addNewContact);

        app.route('/contact/:id')
            .get(this.contactControlller.getContactById)
            .put(this.contactControlller.updateContact)
            .delete(this.contactControlller.deleteContact)
    }
}