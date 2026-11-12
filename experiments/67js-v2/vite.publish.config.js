import {defineConfig} from 'vite';
import {resolve} from 'node:path';
// Build the first-lesson app and retain the review-only static comparison page in public/.
// This deliberately avoids the old root compare.html's separate input and route.
export default defineConfig({build:{rollupOptions:{input:{index:resolve(import.meta.dirname,'index.html')}}}});
