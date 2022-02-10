const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json())

require("./routes/authRoutes")(app);

const PORT = 5000 | process.env.PORT;
app.listen(PORT);