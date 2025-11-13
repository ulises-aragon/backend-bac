require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { sequelize } = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

require("./models/relations");

app.use("/api", routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor.' });
});

const PORT = 3000;
(async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Sistemas BAC - Puerto ${PORT}`));
    } catch (error) {
        console.error("Base de datos corrupta:", error);
    }
})();