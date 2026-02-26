// ===== ELEMENTS =====
const editor = document.getElementById("editor");
const charCount = document.getElementById("charCount");
const form = document.getElementById("letterForm");
const previewText = document.getElementById("previewText");

const fontSelect = document.getElementById("fontFamily");
const fontSizeInput = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
const colorPicker = document.getElementById("colorPicker");
const colorText = document.getElementById("colorText");


// =========================
// PREVIEW + CHARACTER COUNT
// =========================
editor.addEventListener("input", () => {

  const htmlContent = editor.innerHTML;
  const textLength = editor.innerText.length;

  // Giữ format HTML
  previewText.innerHTML = htmlContent || 
    "Nội dung thư của bạn sẽ hiển thị ở đây...";

  // Update char count
  charCount.textContent = `${textLength} / 2000`;

  if (textLength > 2000) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "white";
  }
});


// =========================
// SUBMIT + FIREBASE SAVE
// =========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const to = document.getElementById("to").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = editor.innerHTML.trim();
  const password = document.getElementById("password").value;
  const expiryDays = document.getElementById("expiry").value;

  if (!editor.innerText.trim()) {
    alert("Bạn chưa viết nội dung 💌");
    return;
  }

  // Random ID
  const id = Math.random().toString(36).substring(2, 10);

  // Expiry timestamp
  let expiry = null;
  if (expiryDays !== "0") {
    expiry = Date.now() + (expiryDays * 24 * 60 * 60 * 1000);
  }

  // Hash password basic (base64)
  let hashedPassword = null;
  if (password) {
    hashedPassword = btoa(password);
  }

  try {

    await window.firebaseSetDoc(id, {
      to,
      subject,
      message,
      password: hashedPassword,
      expiry,
      createdAt: Date.now()
    });

    const link = `${window.location.origin}/l/${id}`;

    alert("Tạo thư thành công 💌\n\nLink của bạn:\n" + link);

    form.reset();
    editor.innerHTML = "";
    previewText.innerHTML = "Nội dung thư của bạn sẽ hiển thị ở đây...";
    charCount.textContent = "0 / 2000";

  } catch (err) {
    console.error(err);
    alert("Lỗi khi lưu thư 😢");
  }
});


// =========================
// STYLE CONTROLS (TOÀN THƯ)
// =========================
fontSelect.addEventListener("change", () => {
  editor.style.fontFamily = fontSelect.value;
  previewText.style.fontFamily = fontSelect.value;
});

fontSizeInput.addEventListener("input", () => {
  editor.style.fontSize = fontSizeInput.value + "px";
  previewText.style.fontSize = fontSizeInput.value + "px";
  fontSizeValue.textContent = fontSizeInput.value + "px";
});

colorPicker.addEventListener("input", () => {
  editor.style.color = colorPicker.value;
  previewText.style.color = colorPicker.value;
  colorText.value = colorPicker.value;
});

colorText.addEventListener("input", () => {
  editor.style.color = colorText.value;
  previewText.style.color = colorText.value;
});


// =========================
// TOOLBAR FORMAT
// =========================
function format(command) {
  editor.focus();
  document.execCommand(command, false, null);
}

function setFont(font) {
  editor.focus();
  document.execCommand("fontName", false, font);
}

function setColor(color) {
  editor.focus();
  document.execCommand("foreColor", false, color);
}