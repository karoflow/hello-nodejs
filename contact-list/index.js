import readline from 'readline/promises';
import {stdin as input, stdout as output} from 'process';
import fs from 'fs/promises';

const CONTACTS_LIST_FILE_PATH = './data/contacts-list.json';
const rl = readline.createInterface({input, output});

// const in this line help us to fix type of variable
const contactsList = [];


// ------------------------------- Functions -------------------------------
async function loadContacts() {
  try {
    const contactsListJson = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf8');
    contactsList.push(
      ...contactsListJson
    );
  } catch (error) {
    throw error;
  }
}


async function saveContacts() {
  try {
    const contactListJson = JSON.stringify(contactsList);
    await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactListJson);
  } catch (error) {
    throw error;
  }
}


async function addNewContact() {
  const firstName = await rl.question('First name: ');
  const lastName = await rl.question('Last name: ');

  const newContact = {
    id: contactsList.length,
    firstName,
    lastName,
  };

  contactsList.push(newContact);
  saveContacts();
}


function showContactsList() {
  const formattedContactsList =
    contactsList.map(({id, firstName, lastName}) => `#${id} ${firstName} ${lastName}`)
      .join('\n');

  console.log('Contact List:\n' + formattedContactsList);
}


function quit() {
  rl.close();
}


async function help() {
  console.log('a: add new contact\ns: show contacts list\nq: quit');
  let action = await rl.question('Enter your input: ');

  switch (action) {
    case 'a':
      await addNewContact();
      break;
    case 's':
      showContactsList();
      break;
    case 'q':
      quit();
      return;
  }
  help();
}


async function main() {
  await loadContacts();
  help();
}


// ------------------------------- Main code -------------------------------
console.log('--- Contacts List ---');
await main();
