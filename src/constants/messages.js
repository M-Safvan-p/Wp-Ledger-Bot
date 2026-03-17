const MESSAGES = {
  WELCOME: (balance) => `Hey Munnas 👋
Welcome to Safvan's Bank 🏦
Your current balance is ₹${balance}`,

  MENU: `🏦 Safvan's Bank

Commands:

+amount   → Add money
-amount   → Deduct money
balance   → Check balance
statement → Last 10 transactions
today     → Today's summary
reset     → Reset ledger
menu      → Show commands`,

  INVALID_AMOUNT: "Please enter a valid amount 👍",

  INSUFFICIENT_BALANCE: "Oops! Not enough balance 😅",

  ADD_SUCCESS: (amount, balance) =>
    `₹${amount} added successfully 💰
New balance: ₹${balance}`,

  DEDUCT_SUCCESS: (amount, balance) =>
    `₹${amount} deducted successfully 💸
Remaining balance: ₹${balance}`,

  BALANCE: (balance) =>
    `Your current balance is ₹${balance}`,

  RESET_SUCCESS:
    "Your account has been reset 🔄\nBalance is now ₹0",

  UNKNOWN_COMMAND: `I didn’t understand that 🤔

Type "menu" to see available commands.`,

  TODAY_SUMMARY: (credit, debit) => `📊 Today's Summary

Money added: ₹${credit}
Money spent: ₹${debit}
Balance change: ₹${credit - debit}`,
};

module.exports = MESSAGES;