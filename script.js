function evaluatePassword() {
  const password = document.getElementById("passwordInput").value;
  const bar = document.getElementById("strengthBar");
  const feedback = document.getElementById("feedback");

  let score = 0;
  const conditions = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^a-zA-Z0-9]/.test(password)
  ];

  conditions.forEach(cond => { if (cond) score++; });

  // Simplified entropy scoring based on character pool and length
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
  const entropy = password.length * Math.log2(poolSize || 1);

  let label = "Weak";
  let color = "bg-danger";
  let width = "20%";
  let hint = "Use 8+ characters, mix upper/lowercase, numbers, and symbols.";

  if (entropy >= 40 && score >= 3) {
    label = "Moderate";
    color = "bg-warning";
    width = "60%";
    hint = "Good! Consider adding special characters or more length.";
  }
  if (entropy >= 60 && score === 5) {
    label = "Strong";
    color = "bg-success";
    width = "100%";
    hint = "Great! Your password is strong and secure.";
  }

  bar.className = `progress-bar strength-meter ${color}`;
  bar.style.width = width;
  feedback.innerText = `Strength: ${label} (Entropy: ${entropy.toFixed(1)} bits)
Hint: ${hint}`;
}
