# Backend server for <a href="https://github.com/DMQQ/shop-mobile-react-native" target="_blank">Mobile shop app</a>

url: <a href="http://srv11.mikr.us:20220/">Backend</a>

## **Tech stack**:

- **MySQL** database
- **NestJS** server framework
- **Typescript**
- **Typeorm** SQL ORM
- **bcrypt** password hashing
- **jsonwebtoken** user authentication
- **sendgrid** mailing
- **stripe** payments
- **graphql/apollo** graphQL query
- **expo-server-sdk** mobile notifications
- **class-transformer, class-validator** input validation
- **nodejs**

## **Set enviroment variables**

- STRIPE_TEST_SECRET
- SENDGRID_KEY
- EMAIL (for sendgrid)
- STRIPE_WEBHOOK_KEY
- JWTTOKEN
- APP_PORT

#### **Database connection env**

- CONNECTION (mysql)
- HOST
- NAME (user)
- DATABASE (database name)
- PORT
- SYNCHRONIZE
- PASS (user password)

## Run test payments on local device

1. Download [stripe cli](https://stripe.com/docs/stripe-cli)
2. Run stripe cli via cmd
3. Run command `stripe login`
4. Run command `stripe listen --forward-to {URL}/payments/webhook `
5. Copy webhook signing secret and set env STRIPE_WEBHOOK_KEY

### Create database

```mysql
CREATE DATABASE shop;
```

### Use your IPv4 Address as backend address in src/main.ts or .env URL

```bash
ipconfig
```

### Run

```bash
npm start
```

[comment]: <> (popraw)

### About app
