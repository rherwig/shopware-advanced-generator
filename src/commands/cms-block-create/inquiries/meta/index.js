import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your block?',
        default: 'example-block',
    },
];

export default async () => inquirer.prompt(questions);
