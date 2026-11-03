# San Tan Hot Rods & Restorations: static website

Plain HTML/CSS/JS with no build step. Upload the contents of this folder to any static host
(Netlify, Cloudflare Pages, GitHub Pages, S3, or regular shared hosting) and point santanhotrods.com at it.

Pages: index.html, services.html, gallery.html (Our Work), about.html, contact.html, 404.html
Old WordPress URLs (/service/, /about-us-2/, /contact-us/, /our-work/, /map/) redirect to the new pages.
If your host supports server-side redirects, add 301s for those paths too.

## TODO before launch
1. Contact form: create a Formspree (or similar) form and replace `YOUR_FORM_ID` in contact.html.
   Until then, the form shows a "please call us" message and sends nothing.
2. Email: the old site published no email address (only the theme placeholder "email@domain.com").
   Add one in contact.html (there's a commented-out block) if you want a mailto link.
3. Confirm hours. The old site listed Mon–Fri 9:00 am – 5:00 pm in most places, but its footer said
   8:00 AM – 6:00 PM and the contact page also said 7AM – 6PM. This site uses 9–5.
4. Confirm the counters taken from the old site (225 happy customers, 7 employees, 225 hot rods restored,
   "since 2017") are still accurate.
5. Confirm the X/Twitter account (twitter.com/SanTanHotRods) is still active.
6. Optional: add customer testimonials. The old site had none.
