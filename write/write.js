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

const fontSelect = document.getElementById("fontFamily");
const fontSizeInput = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
const colorPicker = document.getElementById("colorPicker");
const colorText = document.getElementById("colorText");
const previewText = document.getElementById("previewText");

// Update preview content
messageInput.addEventListener("input", () => {
  previewText.textContent = messageInput.value || 
  "Nội dung thư của bạn sẽ hiển thị ở đây...";
});

// Font change
fontSelect.addEventListener("change", () => {
  previewText.style.fontFamily = fontSelect.value;
});

// Font size change
fontSizeInput.addEventListener("input", () => {
  previewText.style.fontSize = fontSizeInput.value + "px";
  fontSizeValue.textContent = fontSizeInput.value + "px";
});

// Color picker change
colorPicker.addEventListener("input", () => {
  previewText.style.color = colorPicker.value;
  colorText.value = colorPicker.value;
});

// Manual color input
colorText.addEventListener("input", () => {
  previewText.style.color = colorText.value;
});