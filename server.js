const express = require("express");
const app = express();
const averageRoutes = require("./routes/averageRoutes");

app.use(express.json());
app.use("/numbers", averageRoutes);

const PORT = 9876;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
