import mongoose from "mongodb";

import app from "./app";
import keys from "./config/keys";

mongoose.connect(keys.databaseUrl);

const port = keys.port || 5000;

app.listen(port, () => `Listening on ${port}`);
