# BDAG NestJS

**@bdag/nestjs** is a toolkit designed to simplify the creation of administrative dashboards. It provides a set of decorators and utilities for defining DTOs, entities, fields, authentication flows, and more, using metadata to efficiently create and manage complex admin interfaces.

**Important**: This package is part of the @bdag ecosystem

## Features

- **Decorators**: Easily annotate classes and properties with metadata for DTOs, entities, validation rules, login/logout/refresh handlers, and more.
- **Metadata Management**: Utilizes `reflect-metadata` to store and retrieve configuration data.
- **Type Safety**: Built with TypeScript to ensure type safety and improved developer experience.
- **CLI Support**: Includes a CLI tool for scaffolding and managing BDAG components within your NestJS project.
- **Rollup Bundling**: Packaged and optimized using Rollup, with TypeScript declaration support for seamless integration.

## Installation

Install the package via npm:

```bash
npm install @bdag/nestjs
```

## Peer Dependencies

Make sure to install and configure the following in your project:

- reflect-metadata: Required for metadata reflection.
- TypeScript: Ensure emitDecoratorMetadata and experimentalDecorators are enabled in your tsconfig.json.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    // ...other options
  }
}
```

## Usage
### Importing Decorators
Import the necessary decorators from the package to annotate your classes and properties.

```ts
import { BdagEntity, BdagField, BdagDto, BdagValidation } from '@bdag/nestjs';

// Example: Define an entity with fields and validations
@BdagEntity({ key: 'user', endpoint: { url: '/api/users', method: 'GET' } })
export class User {
    @BdagField({ type: 'string', sort: true, search: true })
    name: string;
    
    @BdagField({ type: 'number' })
    age: number;
    
    // ...additional properties and methods
}
```

### Configuring DTOs
Use the `BdagDto` decorator to define Data Transfer Objects linked to entities and configure endpoints, actions, and roles.

```ts
import { BdagDto } from '@bdag/nestjs';

@BdagDto({
  action: {
    type: "create",
    endpoint: { url: "/api/users/create", method: "POST" },
  },
  entityKey: "user",
  roles: ["admin"],
})
export class CreateUserDto {
    @BdagValidation({ type: 'string', required: true, min: 3, max: 50 })
    name: string;
  
    @BdagValidation({ type: 'number', required: true })
    age: number;
    // ...other properties
}
```

### Authentication Handlers
Set up login, logout, and refresh handlers using the provided decorators.

```ts
import { BdagLogin, BdagLogout, BdagRefresh, BdagValidation } from '@bdag/nestjs';

@BdagLogin({
  endpoint: { url: "/login", method: "POST" },
  response: { accessKey: "access_token", refreshKey: "refresh_token" },
})
export class LoginDto {
    @BdagValidation({
        type: "string",
        required: true,
        min: 8,
    })
    login: string;

    @BdagValidation({
        type: "string",
        required: true,
        min: 8,
    })
    password: string;
}

@BdagLogout({
  endpoint: { url: "/api/auth/logout", method: "POST" },
})
export class LogoutDto {
    @BdagValidation({
        type: "token",
    })
    refresh_token: string;
}

@BdagRefresh({
  endpoint: { url: "/api/auth/refresh", method: "POST" },
  response: { refreshKey: "refresh_token" },
})
export class RefreshService {
    @BdagValidation({
        type: "token",
    })
    refresh_token: string;
}
```

### Running CLI
The package includes a CLI for scaffolding and management tasks. After installing globally or locally, you can invoke the CLI:

```bash
npx @bdag/nestjs [command] [options]
```

Use --help with the CLI to get a list of available commands and options:

```bash
npx @bdag/nestjs --help
```

## Building from Source
If you are interested in building or modifying the package:
1. Clone the repository:
```bash
git clone https://github.com/Backend-driven-Admin-Generator/bdag-nestjs
cd bdag-nestjs
```

2. Install dependencies:
```bash
npm install
```

3. Build the package:
```bash
npm run build
```

This will run Rollup to bundle the library, generate a CLI bundle, and create TypeScript declaration files.

## Contributing
Contributions are welcome! Please open issues for any bugs or feature requests. Follow the repository guidelines for pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.