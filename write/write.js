const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");
const form = document.getElementById("letterForm");

messageInput.addEventListener("input", () => {
  const length = messageInput.value.length;
  charCount.textContent = `${length} / 2000`;

  if (length > 2000) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "white";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const to = document.getElementById("to").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = messageInput.value.trim();
  const password = document.getElementById("password").value;
  const expiry = document.getElementById("expiry").value;

  if (!message) {
    alert("Bạn chưa viết nội dung 💌");
    return;
  }

  console.log({ to, subject, message, password, expiry });

  // Sau này bạn sẽ gọi API Firebase ở đây
});