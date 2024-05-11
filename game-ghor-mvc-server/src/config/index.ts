import dotenv from 'dotenv';
import Path from 'path';
dotenv.config({ path: Path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.DB_URL || 'mongodb://localhost:27017/test',
  default_user_pass: process.env.DEFAULT_USER_FASS,
  nod_env: process.env.NODE_ENV,
};
