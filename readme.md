# AutoGraphQL

A GraphQL bundling and deployment CLI & library to make working with GraphQL and Functions as a Service (FaaS) providers easy.

The library uses Rollup and Babel for bundling and transpiling to provider specific function code. You can then use the Serverless Framework or deployment method of your choice to deploy to the supported providers.

## CLI

The CLI has two commands

### Developement

```
npx autographql dev -c ./autograph.config.json
```

Starts a local development server on local host. 

### Bundle

```
npx autograpqhl bundle -c ./autograph.config.json
```

Takes your schema and resolver code combines it with provider specific function code and outputs a bundled function. 

## Configuration

The cli only accepts one argument, `-c` which specifies the location of the configuration file.

The configuration file can the JSON or YAML. Below is a sample conifguration file

```
{
    "name": "graphql",
    "root": "./",
    "schema": "./src/schema/starwars.gql",
    "resolvers": "./src/resolvers",
    "external": [
        "package.json",
        "data"
    ],
    "providers": [
        {
            "name": "aws"
        },
        {
            "name": "now"
        },
        {
            "name": "ibm"
        },
        {
            "name": "gcp"
        },
        {
            "name": "netlify",
            "dist": "./dist/netlify"
        }
    ],
    "dev": {
        "port": 7000
    }
}
```

## Config File Options

`name` (String) - The name of the function to be exported

`root` (String) - The relative location of where the `.autographql` build folder should be located. Default value in the root of the current project.

`schema` (String) - The relative location of your GraphQL Schema file. The schema file must have a valid GraphQL schema, defined using GraphQL's Schema Definition Language. Default value is `src/schema/schema.gql`

`resolvers` (String) - Relative location of the resolver functions. Expects a folder with an `index.mjs` file and any other dependencies in it. The resolver functions must be written in JavaScript using ES module syntax. Default value is `src/resolvers/`.

`external` (Array) - An array of files and folders that need to be copied with the resolvers. The files need to be referenced relative to the resolvers location, and can include any file type. These files will be shipped with your function. Not required, and no default value.

`providers` (Array) - Array of provider configuration objects consisting of the following options.

  `name` - The provider name. Valid values are `aws`, `ibm`, `gcp`, `netlify`, `now`. More to be added later. Required.

  `dist` - Relative location where to copy the final provider specific function for deployment. Not required. No default.

`dev` (Object) - Configuration detail for the development server
  
  `port` (Number) - Port that the development server will run on. Default `7000`.

## Backlog

This project is not complete, and has a long and extensive backlog. Current backlog items to be completed before launch include.

- Complete Test suite
- Complete deployment integration with Serverless Framework & Architect Framework (arc.codes)
- Add Azure & Cloudflare as providers
- Add file watching and automatic restart for dev mode
- Detailed documentation and website

Post launch the following items are in the backlog.
- Integrate with OpenID Connect providers for authentication
- Init command for CLI
- API defintion to allow consumption programatically
- Resolver code generation
