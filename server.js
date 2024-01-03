require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();

//middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());


//mounting
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use(errorMiddleware);
const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
});

