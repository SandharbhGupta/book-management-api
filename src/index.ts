import app from './app';
import env from './config/env';

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Server running in ${env.nodeEnv} mode on port ${PORT}`);
});