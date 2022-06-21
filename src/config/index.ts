import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

import Config from './configuration';

export default Config();
