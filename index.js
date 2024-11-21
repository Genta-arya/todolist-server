
import express from "express";
import { createServer } from "http";
import cors from "cors";


const app = express();
const PORT = 3005;
const httpServer = createServer(app);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


httpServer.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
  