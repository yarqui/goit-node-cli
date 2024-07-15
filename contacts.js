import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const contactsData = await readFile(contactsPath);

    return JSON.parse(contactsData);
  } catch (error) {
    console.error("Error listing contacts", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contact = contactsArr.find(({ id }) => contactId === id);

    return contact ?? null;
  } catch (error) {
    console.error("Error getting contact with this id:", error);
  }
};

const removeContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contactIdx = contactsArr.findIndex(({ id }) => contactId === id);

    if (!~contactIdx) {
      return null;
    }

    const [removedContact] = contactsArr.splice(contactIdx, 1);

    await writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

    return removedContact;
  } catch (error) {
    console.error("Error removing a contact", error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const contactsArr = await listContacts();
    contactsArr.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

    return newContact;
  } catch (error) {
    console.error("Error adding a contact", error);
  }
};

export { listContacts, getContactById, removeContactById, addContact };
