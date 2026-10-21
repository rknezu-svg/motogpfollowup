# Follow-up ze schůzky – Creditas Autodrom Brno × PLG

Neveřejná prezentace chráněná heslem, připravená pro nasazení na Vercel.

## Struktura

- `login.html` – přihlašovací stránka (`/login`)
- `api/page.js` – prezentace, zobrazí se jen po přihlášení (`/`)
- `api/login.js` – ověří heslo a nastaví přihlašovací cookie (30 dní)
- `api/logout.js` – odhlášení (`/api/logout`)
- `api/_auth.js` – sdílená logika ověření
- `vercel.json` – směrování a zákaz indexace

## Nasazení přes GitHub

1. Nahrajte obsah této složky do nového repozitáře na GitHubu.
2. Na vercel.com zvolte **Add New → Project** a importujte repozitář.
3. Framework Preset: **Other**, Build Command nechte prázdný.
4. V **Settings → Environment Variables** přidejte `SITE_PASSWORD` s heslem.
5. Klikněte na **Deploy**. Každý další push do hlavní větve se nasadí automaticky.

Heslo nerozlišuje velká a malá písmena. Po změně hesla je potřeba udělat Redeploy.

Do repozitáře nepřidávejte soubor `index.html`, jinak by Vercel zobrazil ten místo prezentace a přihlášení by nefungovalo.
