const express = require("express");
const cors = require("cors");


const sequelize = require("./config/database"); 

const notesRoutes = require("./routes/notesRoutes");

require('./scheme/Notes'); 

const app = express();

app.use(cors({
    origin: ['http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! API Notes TCC Running");
});

app.use("/api", notesRoutes);

const PORT = process.env.PORT || 3000;  

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Gagal sinkronisasi database:", err);
    });