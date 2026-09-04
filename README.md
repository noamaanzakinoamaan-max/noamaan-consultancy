# Noamaan Consultancy Services — Website

Premium single-page website for **Noamaan Consultancy Services** — real estate,
lawsuits, settlements, documentation, advisory and dispute resolution.
Based in Andheri West, Mumbai.

🌐 **Domain:** [noamaanconsultancy.in](https://noamaanconsultancy.in)
📧 **Email:** hello@noamaanconsultancy.in
📞 **Phone:** +91 83699 40174

---

## ✨ Features

- **Real WebGL 3D background** — an animated crystalline particle network + rotating
  wireframe crystals with mouse parallax, built on [Three.js](https://threejs.org) (MIT).
- **3D tilt cards** using [VanillaTilt.js](https://micku7zu.github.io/vanilla-tilt.js/) (MIT).
- Premium **dark + gold** luxury theme, fully responsive (desktop → mobile).
- Scroll-reveal animations, animated count-up stats, accordion FAQ.
- Sections: Hero, Trust strip, Services, About, Process, Stats, Testimonials, FAQ, Contact, Footer.
- **SEO-ready**: meta tags, Open Graph, JSON-LD structured data, `sitemap.xml`, `robots.txt`.
- Contact form (opens a pre-filled email) + floating WhatsApp button + click-to-call.
- **Zero build step** — pure HTML/CSS/JS. Libraries are vendored locally (no CDN required).
- Accessible: respects `prefers-reduced-motion` and degrades gracefully without WebGL.

## 📁 Structure

```
noamaan-consultancy/
├── index.html
├── CNAME                 # custom domain for GitHub Pages
├── robots.txt
├── sitemap.xml
├── README.md
├── LICENSE
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── main.js            # interactions + WebGL scene
    │   ├── three.min.js       # Three.js (MIT)
    │   └── vanilla-tilt.min.js# VanillaTilt (MIT)
    └── img/about.jpg
```

## 🚀 Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## 🌍 Deploy on GitHub Pages (with your domain)

1. Create a new repo on GitHub (e.g. `noamaan-consultancy`) and push this folder (see steps below).
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `root` → **Save**.
3. The `CNAME` file already points to `noamaanconsultancy.in`. In **Settings → Pages → Custom domain**, confirm `noamaanconsultancy.in` is set and enable **Enforce HTTPS**.
4. At your domain registrar, add DNS records:
   - Four `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` for `www` → `<your-github-username>.github.io`
5. Wait for DNS to propagate (minutes to a few hours). Done. ✅

## 🛠 Customising

- **Address / phone / email** — edit in `index.html` (search for `Andheri West`, `8369940174`, `hello@`).
- **Colors** — change the CSS variables at the top of `assets/css/style.css` (`--gold`, `--bg`, etc.).
- **Stats & copy** — all in `index.html`; stat numbers use `data-count`.
- **About photo** — replace `assets/img/about.jpg`.

## 📜 License

Site code © Noamaan Consultancy Services. Bundled libraries (Three.js, VanillaTilt.js)
are under their respective MIT licenses.
