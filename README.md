# NestJS REST-API for <a href="https://github.com/DMQQ/shop-mobile-react-native" target="_blank">React Native shop</a>

## To run server on local machine required is NODE & MySQL

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
