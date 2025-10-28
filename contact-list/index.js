import readline from 'readline/promises';
import {stdin as input, stdout as output} from 'process';

const rl = readline.createInterface({input,output});

const contactsList = [];
// const in this line help us to fix type of variable

const firstName = await rl.question('First name: ');
const lastName = await rl.question('Last name: ');

const newContact = {
    id: contactsList.length,
    firstName,
    lastName,
};

contactsList.push(newContact);
const formattedContactsList =
    contactsList.map(({id, firstName, lastName}) => `#${id} ${firstName} ${lastName}`)
        .join('\n');

console.log('Contact List: ', formattedContactsList);

rl.close()