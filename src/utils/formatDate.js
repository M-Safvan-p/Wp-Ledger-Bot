function formatDate(dateInput) {
  const d = new Date(dateInput);

  const date =
    d.toLocaleDateString() +
    " " +
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return date;
}

module.exports = formatDate;