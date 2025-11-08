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
    // check file not empty
    if (contactsListJson) {
      contactsList.push(
        ...JSON.parse(contactsListJson)
      );
    }
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
  const lastContact = contactsList[contactsList.length-1];
  const id = lastContact ? lastContact.id+1 : 0;
  const firstName = await rl.question('First name: ');
  const lastName = await rl.question('Last name: ');

  const newContact = {
    id,
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


async function deleteContactId() {
  if (contactsList.length < 1) {
    console.error('No contact found.');
    return;
  }

  showContactsList();

  const _id = Number(await rl.question('Enter Contact ID: '));
  const i = contactsList.findIndex(({id}) => id === _id);
  if (i === -1) {
    console.error('Could not find contact with id ' + _id);
    return;
  }
  contactsList.splice(i, 1);
  saveContacts();
}


function quit() {
  rl.close();
}


async function help() {
  console.log('s: show contacts list\na: add new contact\nd: delete a contact\nq: quit');
  console.log('-----------');
  const action = await rl.question('Enter your input: ');

  switch (action) {
    case 's':
      showContactsList();
      break;
    case 'a':
      await addNewContact();
      break;
    case 'd':
      await deleteContactId();
      break;
    case 'q':
      quit();
      return;
  }
  console.log('-----------');
  help();
}


async function main() {
  await loadContacts();
  help();
}


// ------------------------------- Main code -------------------------------
console.log('--- Contacts List ---');
await main();
