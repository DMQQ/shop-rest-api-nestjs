# Backend server for <a href="https://github.com/DMQQ/shop-mobile-react-native" target="_blank">Mobile shop app</a>

### **Tech stack**:

- **MySQL** database
- **NestJS** server framework
- **Typescript**
- **Typeorm** sql ORM
- **bcrypt** password hashing
- **jsonwebtoken** user authentication
- **sendgrid** mailing
- **stripe** payments
- **graphql/apollo** graphql query
- **expo-server-sdk** mobile notifications
- **class-transformer, class-validator** for input validation
- **nodejs** runtime

### Set enviroment variables

- STRIPE_TEST_SECRET
- SENDGRID_KEY
- EMAIL (for sendgrid)

### Create database

```mysql
CREATE DATABASE shop;
```

### Use your IPv4 Address as backend address in src/main.ts or .env PORT

```bash
ipconfig
```

### Replace ormconfig.json with your settings

```JSON
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "",
  "password": "",
  "database": "",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}

```

### Run

```bash
npm start
```

[comment]: <> (popraw)

### About app

User can create account with email and password, verify account by link sent on provided email

User can manage his account credentials like phone number, name, surname or address

Authenticated user can upload product photos, and retrive them
