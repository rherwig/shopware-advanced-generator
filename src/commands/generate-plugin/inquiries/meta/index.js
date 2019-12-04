import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your plugin?',
        default: 'ExamplePlugin',
    },
    {
        type: 'input',
        name: 'vendor',
        message: 'Who is the vendor of your plugin?',
        default: 'Acme',
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is a description for your plugin?',
    },
    {
        type: 'input',
        name: 'author',
        message: 'Who is the main author of the plugin?',
    },
];

export default async () => inquirer.prompt(questions);
