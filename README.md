# 🏦 WhatsApp Ledger Bot

A simple and powerful **WhatsApp-based personal finance tracker** built with Node.js.
Track your daily transactions just by sending messages like `+1000` or `-500` directly in WhatsApp.

Built with ❤️ while exploring automation and backend architecture.

---

## 🚀 Features

* ➕ Add money using `+amount`
* ➖ Deduct money using `-amount`
* 💰 Check current balance
* 📊 View today’s summary
* 📜 Get last 10 transactions (statement)
* 🔄 Reset ledger
* 🤖 Smart command handling
* 🔐 Access restricted to a single user

---

## 💬 Example Commands

```
+1000       → Add money
-300        → Deduct money
balance     → Check balance
statement   → Last 10 transactions
today       → Today's summary
menu        → Show all commands
reset       → Reset ledger
```

---

## 🛠 Tech Stack

* Node.js
* whatsapp-web.js
* JavaScript
* dotenv
* JSON (for local data storage)

---

## 📂 Project Structure

```
src
 ├── bot
 │   └── whatsappClient.js
 │
 ├── services
 │   └── ledgerService.js
 │
 ├── constants
 │   ├── messages.js
 │   ├── commands.js
 │   └── greetings.js
 │
 ├── utils
 │   └── formatDate.js
```

---

## ⚙️ Setup & Installation

1. Clone the repository

```
git clone <your-repo-link>
cd whatsapp-ledger-bot
```

2. Install dependencies

```
npm install
```

3. Create `.env` file

```
ALLOWED_USER=your_number_with_country_code
```

Example:

```
ALLOWED_USER=919XXXXXXXXX
```

4. Run the bot

```
node src/index.js
```

5. Scan the QR code using WhatsApp

---

## 🔐 Note

* This bot uses **WhatsApp Web automation**
* Intended for **personal use and learning**
* Avoid heavy usage to prevent account restrictions

---

## 💡 What I Learned

* Building real-world automation using Node.js
* Working with WhatsApp Web APIs
* Structuring backend projects professionally
* Using environment variables securely
* Writing clean and maintainable code

---

## 🚧 Future Improvements

* Google Sheets integration
* Web dashboard (React)
* Cloud deployment (24/7 uptime)
* PDF statement generation

---

## 🙌 Acknowledgement

Built as a learning project to explore automation, backend development, and real-world problem solving.
