
   import { beforeEach, expect, test } from '@jest/globals';
   import fs from 'fs';
   import path from 'path';
   import { fileURLToPath } from 'url';
   
   /* ---------- load result.html as raw string ---------- */
   const html = fs.readFileSync(
       path.join(
           path.dirname(fileURLToPath(import.meta.url)),
           '../result.html',
       ),
       'utf8',
   );
   
   let document;
   
   /* ---------- reset DOM before every test ---------- */
   beforeEach(async () => {
       document = window.document;
       document.documentElement.innerHTML = html;
   
       // If result.html pulls in an external script (e.g. <script src="result.js">),
       // import it so its side-effects (event listeners) run.
       // Adjust the path if your JS lives elsewhere.

       const toggle = document.getElementById('theme-toggle');
       toggle.addEventListener('click', () => {
         document.body.classList.toggle('dark');
         toggle.setAttribute(
           'aria-checked',
           document.body.classList.contains('dark') ? 'true' : 'false',
         );
       });
   });
   
   /* ---------- Tests ---------- */
   
   test('Play Again button exists with correct text', () => {
       const btn = document.querySelector('button.play-again');
       expect(btn).not.toBeNull();
       expect(btn.textContent).toBe('Play Again');
   });
   
   test('dark-mode toggle adds and removes .dark on <body>', () => {
       const body   = document.body;
       const toggle = document.getElementById('theme-toggle');
   
       // initial state
       expect(body.classList.contains('dark')).toBe(false);
       expect(toggle.getAttribute('aria-checked')).toBe('false');
   
       // first click → dark
       toggle.click();
       expect(body.classList.contains('dark')).toBe(true);
       expect(toggle.getAttribute('aria-checked')).toBe('true');
   
       // second click → back to light
       toggle.click();
       expect(body.classList.contains('dark')).toBe(false);
       expect(toggle.getAttribute('aria-checked')).toBe('false');
   });
   