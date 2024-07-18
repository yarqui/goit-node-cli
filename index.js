import {
  listContacts,
  addContact,
  getContactById,
  removeContactById,
} from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      console.log(await addContact(data));
      break;

    case "remove":
      console.log(await removeContactById(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
