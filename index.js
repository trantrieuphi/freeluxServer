import app from "./src/server.js";
import config from "./config/dbConfig.js";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});