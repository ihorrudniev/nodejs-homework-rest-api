import { Router } from "express";
import repositoriyContacts from "../../../repositoriy/contacts";
import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
} from "./validation";

const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await repositoriyContacts.listContacts();
  console.log(contacts);
  res.status(200).json(contacts);
});

router.get("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoriyContacts.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", validateCreate, async (req, res, next) => {
  const newContact = await repositoriyContacts.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoriyContacts.removeContact(id);
  if (contact) {
    return res.status(200).json({ contact });
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:id", validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoriyContacts.updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.patch(
  "/:id/favorite",
  validateId,
  validateUpdateFavorite,
  async (req, res, next) => {
    const { id } = req.params;
    const contact = await repositoriyContacts.updateContact(id, req.body);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  }
);

export default router;
