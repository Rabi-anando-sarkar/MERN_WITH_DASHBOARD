require('dotenv').config();
const express = require('express');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();

//middleware
app.use(express.json());

//mounting
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);
const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
});

