const MESSAGES = {
  WELCOME: (balance) => `Hey Munnas 👋
Welcome to Safvan's Bank 🏦
Your current balance is: ₹${balance}`,

  MENU: `🏦 Safvan's Bank

Commands:

+amount   → Add money
-amount   → Deduct money
balance   → Check balance
statement → Last 10 transactions
today     → Today's summary
reset     → Reset ledger
menu      → Show commands`,

  INVALID_AMOUNT: "Invalid amount.",

  INSUFFICIENT_BALANCE: "Insufficient balance.",

  RESET_SUCCESS: "Ledger reset. Balance: ₹0",

  UNKNOWN_COMMAND: `Unknown command.

Type "menu" to see available commands.`,

  TODAY_SUMMARY: (credit, debit) => `📊 Today's Summary

Credit: ₹${credit}
Debit: ₹${debit}
Net: ₹${credit - debit}`,
};

module.exports = MESSAGES;
