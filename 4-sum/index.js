import readline from 'readline/promises'
import {stdin as input, stdout as output} from 'process'

const rl = readline.createInterface({input,output})

const input1 = await rl.question('input 1: ')
const input2 = await rl.question('input 2: ')

const result = parseInt(input1) + parseInt(input2)

console.log(
    input1, ' + ', input2,' = ' ,result
)

rl.close()
