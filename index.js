const app = require('./src/app');
require('./src/repositories/task.repository'); // 👈 Add this line to force database creation on startup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});