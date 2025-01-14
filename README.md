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
### Define the entities

```ts
import { BdagEntity, BdagBehavior } from '@bdag/nestjs';
import { Get } from "@nestjs/common";

@Controller("users")
@BdagEntity({ name: "users" })
export class UserController {
    @Get()
    @BdagBehavior({ 
        type: [UserController], 
        endpoint: { 
            url: "/users", 
            method: "GET"
        } 
    })
    findAll() { /* ... */ }

    @Post("/create")
    @BdagBehavior({
        type: UserCreateDto,
        endpoint: {
            url: "/users/create",
            method: "POST"
        }
    })
    create() { /* ... */ }
    
    // ...other methods
}
```

### Configure fields & validation

```ts
import { BdagField, BdagValidation } from '@bdag/nestjs';

export class UserEntity {
    @BdagField({ type: 'string', sort: true, search: true })
    name: string;
  
    @BdagField({ type: 'number', sort: true })
    age: number;
    
    // ...other properties
}

export class UserCreateDto {
    @BdagValidation({
        type: 'string',
        unique: true,
        required: true
    })
    name: string;

    @BdagValidation({
        type: 'number',
        required: true,
        min: 16,
        max: 60
    })
    age: number;

    // ...other properties
}
```

### 

### Initialize authentication

```ts
import { BdagAuth, BdagLogin, BdagRefresh, BdagLogout } from '@bdag/nestjs';

@BdagAuth({
    accessKey: "access_token",
    refreshKey: "refresh_token"
})
export class AuthController {
    @Post("/login")
    @BdagLogin({
        endpoint: {
            url: "/login",
            method: "POST"
        },
        type: LoginDto
    })
    signIn() { /* ... */ }

    @Post("/refresh")
    @BdagRefresh({
        endpoint: {
            url: "/refresh",
            method: "POST"
        }
    })
    refresh() { /* ... */ }

    @Post("/logout")
    @BdagLogout({
        endpoint: {
            url: "/logout",
            method: "POST"
        }
    })
    logOut() { /* ... */ }
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