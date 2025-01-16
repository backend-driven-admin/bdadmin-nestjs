# BDAdmin NestJS

**@bdadmin/nestjs** is a toolkit designed to simplify the creation of administrative dashboards. It provides a set of decorators and utilities for defining DTOs, entities, fields, authentication flows, and more, using metadata to efficiently create and manage complex admin interfaces.

**Important**: This package is part of the @bdadmin ecosystem

## Features

- **Decorators**: Easily annotate classes and properties with metadata for DTOs, entities, validation rules, login/logout/refresh handlers, and more.
- **Metadata Management**: Utilizes `reflect-metadata` to store and retrieve configuration data.
- **Type Safety**: Built with TypeScript to ensure type safety and improved developer experience.
- **CLI Support**: Includes a CLI tool for scaffolding and managing BDAdmin components within your NestJS project.
- **Rollup Bundling**: Packaged and optimized using Rollup, with TypeScript declaration support for seamless integration.

## Installation

Install the package via npm:

```bash
npm install @bdadmin/nestjs
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
import { BDAdminEntity, BDAdminBehavior } from '@bdadmin/nestjs';
import { Get } from "@nestjs/common";

@Controller("users")
@BDAdminEntity({ name: "users" })
export class UserController {
    @Get()
    @BDAdminBehavior({ 
        type: [UserController], 
        endpoint: { 
            url: "/users", 
            method: "GET"
        } 
    })
    findAll() { /* ... */ }

    @Post("/create")
    @BDAdminBehavior({
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
import { BDAdminField, BDAdminValidation } from '@bdadmin/nestjs';

export class UserEntity {
    @BDAdminField({ type: 'string', sort: true, search: true })
    name: string;
  
    @BDAdminField({ type: 'number', sort: true })
    age: number;
    
    // ...other properties
}

export class UserCreateDto {
    @BDAdminValidation({
        type: 'string',
        unique: true,
        required: true
    })
    name: string;

    @BDAdminValidation({
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
import { BDAdminAuth, BDAdminLogin, BDAdminRefresh, BDAdminLogout } from '@bdadmin/nestjs';

@BDAdminAuth({
    accessKey: "access_token",
    refreshKey: "refresh_token"
})
export class AuthController {
    @Post("/login")
    @BDAdminLogin({
        endpoint: {
            url: "/login",
            method: "POST"
        },
        type: LoginDto
    })
    signIn() { /* ... */ }

    @Post("/refresh")
    @BDAdminRefresh({
        endpoint: {
            url: "/refresh",
            method: "POST"
        }
    })
    refresh() { /* ... */ }

    @Post("/logout")
    @BDAdminLogout({
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
npx @bdadmin/nestjs [command] [options]
```

Use --help with the CLI to get a list of available commands and options:

```bash
npx @bdadmin/nestjs --help
```

## Building from Source
If you are interested in building or modifying the package:
1. Clone the repository:
```bash
git clone https://github.com/backend-driven-admin/bdadmin-nestjs
cd bdadmin-nestjs
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