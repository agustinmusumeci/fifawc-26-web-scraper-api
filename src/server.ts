import { app } from "./app.js";

const PORT: number = 4000;

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT} 🏆`);
});
