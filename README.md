# Funny Movie - Ung Ta Hoang Tuan

## General Information:
The share video back-end for "The Funny Movie Project" is the behind-the-scenes technology that powers the user experience on this web-based platform or mobile app. It enables users to submit, rate, and interact with funny movie content, fostering a vibrant and engaging community. Specifically, it handles user authentication, video submissions, ratings, likes, dislikes, and comments. This backend infrastructure ensures a seamless and enjoyable environment for users to explore, share, and connect over their shared love for comedic content from diverse sources.

## Techinical Information:
- **NestJS**: NestJS is a robust and innovative backend framework for building scalable and maintainable web applications. It leverages TypeScript, providing strong typing and improved developer productivity. NestJS follows a modular, dependency-injection-based architecture inspired by Angular, making it highly testable and extensible.
- **MongoDB**: MongoDB is a leading NoSQL database system known for its flexibility and scalability. It stores data in a document-oriented format, using JSON-like BSON (Binary JSON) for efficient storage and retrieval. MongoDB's schema-less design allows for dynamic and evolving data models, making it suitable for various use cases, including web applications, analytics, and content management systems.
- **Mongoose**: Mongoose is a JavaScript library for MongoDB, acting as an Object Data Modeling (ODM) tool. It simplifies the interaction between Node.js applications and MongoDB databases, providing an intuitive way to define data schemas, perform CRUD (Create, Read, Update, Delete) operations, and establish relationships between data models.
- **Bcrypt**: Bcrypt, short for "Blowfish Crypt," is a widely used cryptographic hashing library primarily employed for securely storing passwords. It employs a one-way hashing function that transforms plaintext passwords into a hashed representation, making it challenging for attackers to reverse-engineer the original password. Bcrypt is characterized by its adaptive nature, which means it can be made intentionally slow and computationally intensive, effectively thwarting brute-force and dictionary attacks.
- **Express**: Express is a minimalistic and fast web application framework for Node.js. It simplifies the creation of robust and efficient web and API servers by providing a concise and flexible set of tools and middleware. Developers can easily define routes, handle HTTP requests and responses, and manage application logic.
- **Passport**: Passport is a widely-used authentication middleware for Node.js applications. It streamlines the process of authenticating users by providing a flexible and modular framework for integrating various authentication strategies, including username/password, OAuth, and OpenID. Passport's strength lies in its simplicity and extensibility, enabling developers to select and configure authentication methods tailored to their application's needs.
- **RxJS**: RxJS, short for Reactive Extensions for JavaScript, is a powerful library for handling asynchronous and event-driven programming in JavaScript. It is built on the concept of Observables, which represent streams of data or events over time. RxJS provides a wide range of operators to manipulate, filter, transform, and combine these streams, making it an invaluable tool for handling complex asynchronous operations.
- **Jest**: Jest is a popular JavaScript testing framework developed by Facebook. It's designed for simplicity and efficiency, making it a go-to choice for testing JavaScript applications, including front-end code written in React, Angular, and Vue.js, as well as back-end code written in Node.js.

## Project Structure:
### Main Structure
```
src -> this is main folder
 |_ auth -> authenticated folder
 |  |_ auth.controller.ts -> control path, request, response for authenticated module
 |  |_ auth.controller.spec.ts -> file test for controller file
 |  |_ auth.module.ts -> this file is IMPORTANT, import external modules, services, and database
 |  |_ auth.service.ts -> process logic for request and return data and status for response
 |  |_ auth.service.spec.ts -> file test for service file
 | 
 |_ movies -> movies folder
 |  |_ schema -> declare type for the database relative to movies database
 |  |  |_ movies.schema.ts -> declare types for movies database
 |  |_...  //same auth folder
 |_ user -> user folder
    ... //same movies
...
```
## How to start?

```bash
$ yarn install
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## How to Test?

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## How to Deploy? 
> Assume you have project and do some changes

1. Go to file `docker-compose.yml`
2. Increase number for Image Tag 
3. run docker command to build
> can use options `--buil` `--no-recreate`
``` 
docker-compose up <options>
```
4. run docker command to run Image
```
docker-run -p 5000:5000 -d YOUR_IMG_TAG
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
