require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on PORT ${PORT}`);
    } catch (err) {
        console.error("Failed to connect to Database:", err.message);
    }
});