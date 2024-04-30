import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const wordListPath = path.join(__dirname, 'words.txt');

export default wordListPath;
