# Shopware Advanced Generator

Shopware Advanced Generator (*swag*) is a scaffolding CLI that helps you to created plugins, themes and other pieces of code, such as CMS blocks and elements.

It is designed to work with [Shopware 6](https://github.com/shopware/platform).

> **Disclaimer**
>
> This is a community project and not officially supported by [Shopware](https://www.shopware.com).

[![CircleCI](https://circleci.com/gh/rherwig/shopware-advanced-generator/tree/master.svg?style=shield)](https://circleci.com/gh/rherwig/shopware-advanced-generator/tree/master)
![npm](https://img.shields.io/npm/v/@hrwg/swag)

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Available Commands](#available-commands)
  - [Plugins](#plugins)
    - [Create](#create)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Requirements
- [NodeJS](https://nodejs.org/en/) >= 10

## Installation
Install the CLI by executing the following command in a root 
environment:

```bash
$ npm -g @hrwg/swag
```

## Available Commands
To get a list of all available commands, use the following command:

```bash
$ swag --help
```

### Plugins
The following commands are used to work with Shopware 6 plugins.

#### Create
In order to create a new plugin, execute the following command from
your projects root directory (the directory that contains the `custom/plugins`):

```bash
$ swag plugin:create
```

This will guide you through an inquiry that will query all the
required details for creating a plugin.

After the command finishes, your new plugin will be created in the
`custom/plugins` directory and is ready for installation/activation.

## Testing
Unit tests are powered by [Jest](https://jestjs.io) and can be run
after cloning the repository:

```bash
$ npm ci
$ npm t
```

## Contributing
Feel free to contribute to this project by submitting a document
pull-requests that passes existing tests.

## Changelog
For a detailed changelog, refer to the [CHANGELOG.md](CHANGELOG.md).

## License
MIT
