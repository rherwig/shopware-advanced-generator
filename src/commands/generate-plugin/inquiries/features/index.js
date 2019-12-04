import inquirer from 'inquirer';

const questions = [
    {
        type: 'checkbox',
        name: 'features',
        message: 'Which features do you want to use for development?',
        choices: [
            'Stylelint',
            'ESLint',
            'Psalm PHP',
        ],
        default: [],
    },
];

export default async () => inquirer.prompt(questions);
