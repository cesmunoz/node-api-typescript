import * as mongoose from "mongoose";
import { ContactSchema } from '../models/contacModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {
    public async getContacts(req: Request, res: Response) {
        try {
            const contacts = await Contact.find({});
            res.status(200).json(contacts);
        } catch(err) {
            res.status(500).send(err); 
        }
    }

    public async addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        try {
            const contact = await newContact.save();
            res.status(200).json(contact);
        } catch(err) {
            res.status(500).send(err);
        }
    }

    public async getContactById(req: Request, res: Response) {
        try {
            const contact = await Contact.findById(req.params.id);
            res.status(200).json(contact);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public async updateContact(req: Request, res: Response) {
        try {
            const contact = await Contact.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.status(200).json(contact);
        } catch(err) {
            res.status(500).send(err);
        }
    }

    public async deleteContact(req: Request, res: Response) {
        try {
            await Contact.remove({_id: req.params.id });
            res.status(200).json({ message: 'Successfully deleted contact!'});
        } catch(err) {
            res.status(500).send(err);
        }
    }
}
