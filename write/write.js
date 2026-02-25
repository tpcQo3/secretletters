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


// ===== UPDATE PREVIEW + CHAR COUNT =====
editor.addEventListener("input", () => {

  const htmlContent = editor.innerHTML;
  const textLength = editor.innerText.length;

  // Update preview (giữ format HTML)
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


// ===== SUBMIT =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const to = document.getElementById("to").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = editor.innerHTML.trim();
  const password = document.getElementById("password").value;
  const expiry = document.getElementById("expiry").value;

  if (!editor.innerText.trim()) {
    alert("Bạn chưa viết nội dung 💌");
    return;
  }

  console.log({ to, subject, message, password, expiry });

  alert("Tạo thư thành công (demo)");
});


// ===== STYLE CONTROLS (toàn thư) =====
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


// ===== TOOLBAR FORMAT =====
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