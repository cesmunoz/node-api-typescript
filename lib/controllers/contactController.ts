import * as mongoose from "mongoose";
import { ContactSchema } from '../models/contacModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {
    public getContacts(req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(contact);
        })
    }

    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        newContact.save((err, contact) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(contact);
            }
        });
    }

    public getContactById(req: Request, res: Response) {
        Contact.findById(req.params.id, (err, contact) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(contact);
        });
    }

    public updateContact(req: Request, res: Response) {
        Contact.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(contact);
        })
    }

    public deleteContact(req: Request, res: Response) {
        Contact.remove({_id: req.params.id }, (err, contact)=>{
            if(err){
                res.status(500).send(err);
            }
            res.json({ message: 'Successfully deleted contact!'})
        });
    }
}
