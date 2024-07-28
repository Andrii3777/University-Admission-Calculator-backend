const express = require('express');
const env = require('./config');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const createAndFillTables = require('./sql/tablesInfill');
require('./sql/mysqlConnection'); // Ensure database connection is established

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(env.API_BASE_PATH, routes);

createAndFillTables();

app.listen(env.APP_PORT, () => {
    console.log(`Server is running: http://localhost:${env.APP_PORT}${env.API_BASE_PATH}`);
});