# 🕸️ IMF Gadget API

Secure REST API for managing Impossible Missions Force (IMF) gadgets — built with **Node.js, Express, Prisma, and PostgreSQL**, secured by **JWT**.
Deployed on **Railway** with live Swagger docs.

---

## ✨ Features

| Endpoint                          | Purpose                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| `POST /register`                  | Create a new agent (stores hashed password in DB)                     |
| `POST /login`                     | Authenticate agent, returns JWT                                       |
| `GET /gadgets`                    | List gadgets (optionally `?status=`) with random *successProbability* |
| `POST /gadgets`                   | Add gadget — auto‑generates 🕵️ codename                              |
| `PATCH /gadgets/:id`              | Edit name/status                                                      |
| `DELETE /gadgets/:id`             | Soft‑delete → marks **Decommissioned** with timestamp                 |
| `POST /gadgets/:id/self-destruct` | Simulate self‑destruct, returns confirmation code                     |
| `/docs`                           | Interactive Swagger UI                                                |

All gadget routes require the **`Authorization: Bearer <JWT>`** header.

---

## 🛠 Tech Stack

* **Node.js / Express**
* **Prisma ORM** (PostgreSQL)
* **JWT** for auth
* **Swagger‑UI‑Express** for live API docs
* **Railway** for CI/CD + hosted DB

---

## 🚀 Quick Start (Local)

```bash
# 1 Clone & install
git clone https://github.com/<your‑username>/imf‑gadget‑api.git
cd imf‑gadget‑api
npm install

# 2 Configure env
cp .env.example .env          # edit DATABASE_URL & JWT_SECRET

# 3 Run migrations & seed (adds a test agent: ethan / hunt)
npx prisma migrate dev --name init
node prisma/seed.js           # optional seed script

# 4 Start dev server
npm run dev                   # nodemon src/app.js
```

Now open [http://localhost:3000/docs](http://localhost:3000/docs).

---

## 💄 Environment Variables

| Key            | Example                                       | Notes                             |
| -------------- | --------------------------------------------- | --------------------------------- |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/imfdb` | Provided automatically on Railway |
| `JWT_SECRET`   | `supersecretimfcode`                          | Use a long, random string in prod |

---

## 📂 API Docs (Swagger)

Once the server is running:

```
GET /docs
```

Interactive “Try it out” buttons let you register, login, paste your JWT, and hit every secured endpoint.

---

## ☁️ Deployment (Railway)

1. **Provision PostgreSQL** plugin
2. Set `JWT_SECRET` in **Variables**
3. Railway auto‑builds via `npm run build` (none) & runs `node src/app.js`
4. Live app & docs at `https://<your‑service>.up.railway.app`

---

## 🦪 Testing the Flow

```bash
# Register a new agent
curl -X POST $URL/register -H "Content-Type: application/json" \
     -d '{"username":"ethan","password":"hunt"}'

# Login → copy JWT
TOKEN=$(curl -sX POST $URL/login \
        -H "Content-Type: application/json" \
        -d '{"username":"ethan","password":"hunt"}' | jq -r .token)

# Create a gadget
curl -X POST $URL/gadgets -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" -d '{"name":"Laser Pen"}'
```

---

## 📝 License

MIT — do whatever Ethan Hunt would approve of.

---

## 🤝 Author

* **Ayush Bansal** ([@bansalayush247](https://github.com/bansalayush247))
