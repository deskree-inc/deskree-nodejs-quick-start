# express-boilerplate
A template project to express js apps

## Setup for integrations

In order for the template to run the following things needs to be considered and configured.

### Folder structure

The project has the following directory structure:

```
.
+-- .github - contains GitHub Actions files
|   +-- workflows
|      +-- publish-wiki.yml - GitHub action to generate and publish code documentation
|      +-- test.yml - GitHub action to run unit tests upon push
+-- src - contains all functional files
|   +-- ___test___ - unit test files for JEST
|      +-- integration - directory for all integration tests
|          +-- controllers - directory for all controller integration tests
|              +-- postmanController.test.ts - integration test for postmanController
|      +-- unit - directory for all unit tests
|          +-- models - directory for all models unit tests
|              +-- postmanModel.test.ts - unit test for postmanModel
|          +-- app.test.ts - unit test of express base class
|   +-- controllers - API controllers responsible for routing endpoints to particular models
|      +-- expressController.ts - main express controller for routing extends PostmanController from @deskree/postman-collection-generator
|      +-- postmanController.ts - controller handling getting Postman collection
|   +-- interfaces - API interfaces for requests and response data
|      +-- IControllerBase.ts - base interface object
|   +-- models - models reserved for business logic
|      +-- postmanModel.ts - model for reading the Postman collection
|   +-- app.ts - express app base class
|   +-- index.ts - component responsible for express setup, imports all controllers
|   +-- {{integration}}.ts - there has to be a base component per integration on which all models will based on
+-- .env - environmental variables different per integrations
+-- .eslintrcon - ESLint configuration file
+-- .gitignore - gitignore file 
+-- jest.config.js - JEST testing configuration file
+-- package.json - Node packages
+-- README.md - README file
+-- tsconfig.json - TypeScript configuration file
+-- tslint.json - TypeScript Lint configuration file
```

### Commands

The project has the following directory structure:

```
npm run lint - lint command
npm run clean - rimraf clean
npm run serve - start Express app
npm run docs - generate GitHub Wiki via TypeDocs
npm run test - run full JEST tests with coverage
npm run test:controllers - run JEST tests on controllers only (integration tests)
npm run test:unit - run JEST tests on models only (unit tests)
npm run postman - generate Postman collection
 ```
 
### Rules

1. The git structure has to follow the main conventions. Development is done in separate branches named accordingly (ex. new functionality should be in branches `feature/...`). Once the function is made a pull request is submitted to the `main` branch. It is not possible to merge anything into the `main` branch without PR. First, the system will run unit tests, if they pass, a reviewer needs to approve the PR before merge.
2. Each function needs to be documented including controllers, models, and interfaces. Documentation of methods needs to include name, description, parameters and return types. Documentation of files needs to include file names and purpose. For guidelines, please follow: [https://typedoc.org/guides/doccomments/]
3. Each model must have unit test described in the `___test___/unit/models` folder. Unit tests should mock Axios and cover all use cases including both resolved and rejected values.
4. Each controller must have integration test described in the `___test___/integration/controllers` folder. Integration tests should mick the model the controller is using and cover all use cases including both resolved and rejected values. 
5. The `npm run test` coverage report must cover and pass 100% of the tests.
6. Each controller should also contain a Postman collection description in the format described in [postman-collection-generator package](https://github.com/deskree-inc/postman-collection-generator).

### Flow

When creating an integration, it is advisable to follow the pattern described below:

1. **Create a controller that will contain a group of API endpoints.** 
   * It is advisable to group them by endpoint path. For example `blogs/{{id}}/articles` and `blog/{{id}}` should be in the same controller.
   * Controller only functions as router to certain models and handling errors. No business logic should be expressed here. 
   * It is also advisable to group endpoints using wildcard. For example `products/:id*?` endpoint can redirect to one method that will handle 2 scenarios - get list of products and get product by id. To see a working example visit [deskree-v2-integrations-shopifye](https://github.com/deskree-inc/deskree-v2-integrations-shopify).
2. **Create interface for each request**
   * For all requests where `body` is present, create an interface in `/src/interfaces`
3. **Create model for each method in the controller.** 
    * Each model contains business logic of a particular controller. The main objective of the model is to send axios requests to a particular integration endpoint.
    * Each model should extend the base integration class `{{integration}}.ts` located in the `/src` directory. That class handles axios requests routing.  To see a working example see `shopify.ts` in  [deskree-v2-integrations-shopifye](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/shopify.ts).
4. **Create unit test for each model**
5. **Create integration test for each controller**
6. **Document each route in controller for Postman**
7. **Run `npm run test` to test your coverage - it must be 100%**
   * When running `npm run test` on your local machine, make sure to add `APP_BASE_PATH` env variable.

### Class Structure

Please, see the examples of Class structures below:

* [Model Base Class Structure](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/shopify.ts)
* [Controller Structure](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/controllers/shopifyProductsController.ts)
* [Interface Structure](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/interfaces/ShopifyProduct.ts)
* [Model Structure](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/models/shopifyProductsModel.ts)
* [Unit Test Structure](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/___test___/unit/models/shopifyProductsModel.test.ts)
* [Integration Test Structure](https://github.com/deskree-inc/deskree-v2-integrations-shopify/blob/main/src/___test___/integration/controllers/shopifyProductsController.test.ts)

## .env Structure

The following is the base project `.env` structure. All additional `.env` variables should be added as per integration requirements.
```
APP_BASE_PATH = '/v1/integration-name'
API_BASE_URL = 'user.deskree.com/api'
PROTOCOL = 'https://'
INTEGRATION_NAME = 'Deskree {{integration_name}} Integration'
```

* `APP_BASE_PATH` - path of the app including API version number and name of the integration
* `API_BASE_URL` - base url of the project always ending with `/api`
* `PROTOCOL` - `http://` or `https://`
* `INTEGRATION_NAME` - name of the integration for Postman collection. Should follow this format: `Deskree {{integration_name}} Integration`