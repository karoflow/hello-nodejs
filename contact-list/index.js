import readline from 'readline/promises';
import {stdin as input, stdout as output} from 'process';

const rl = readline.createInterface({input, output});

const contactsList = [];

// const in this line help us to fix type of variable


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
      quit()
      return;
  }
  await help();
};


async function addNewContact() {
  const firstName = await rl.question('First name: ');
  const lastName = await rl.question('Last name: ');

  const newContact = {
    id: contactsList.length,
    firstName,
    lastName,
  };

  contactsList.push(newContact);
};


function showContactsList() {
  const formattedContactsList =
    contactsList.map(({id, firstName, lastName}) => `#${id} ${firstName} ${lastName}`)
      .join('\n');

  console.log('Contact List:\n' + formattedContactsList);
};


function quit() {
  rl.close()
};

await help()
// await addNewContact();
// showContactsList();
// quit();
