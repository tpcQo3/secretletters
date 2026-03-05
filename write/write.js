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

const themeSelect = document.getElementById("theme");

function parseCustomTags(html){

  // ===== ESCAPE HTML (basic anti XSS)
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // ===== TITLE
  html = html.replace(/^## (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^# (.*)$/gm, "<h2>$1</h2>");

  // ===== BOLD
  html = html.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // ===== UNDERLINE
  html = html.replace(/__(.*?)__/g, "<u>$1</u>");

  // ===== SPOILER
  html = html.replace(/\|\|(.*?)\|\|/g,
    `<span class="spoiler">$1</span>`
  );

  // ===== CUSTOM LINK
  html = html.replace(/<<\s*(https?:\/\/[^>]+?)\s*:\s*(.*?)\s*>>/g,
    `<a href="$1" class="custom-link" target="_blank">$2</a>`
  );

  // ===== LINE BREAK
  html = html.replace(/\n/g,"<br>");

  return html;
}


// =========================
// PREVIEW + CHARACTER COUNT
// =========================
editor.addEventListener("input", () => {

  const htmlContent = editor.innerHTML;
  const parsed = parseCustomTags(htmlContent);

  if(previewText){
    previewText.innerHTML =
      parsed || "Nội dung thư của bạn sẽ hiển thị ở đây...";
  }

  const textLength = editor.innerText.length;

  charCount.textContent = `${textLength} / 2000`;

  charCount.style.color = textLength > 2000 ? "red" : "";

});


// =========================
// SPOILER CLICK
// =========================
previewText.addEventListener("click", (e) => {

  if(e.target.classList.contains("spoiler")){
    e.target.classList.toggle("reveal");
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
  const customIdInput = document.getElementById("customId")?.value.trim();
  const theme = document.getElementById("theme").value;

  if(!editor.innerText.trim()){
    showPopup("Bạn chưa viết nội dung 💌");
    return;
  }

  // ===== ID =====
  let id = customIdInput || Math.random().toString(36).substring(2,10);

  // ===== EXPIRY =====
  let expiry = null;

  if(expiryDays !== "0"){
    expiry = Date.now() + (expiryDays * 24 * 60 * 60 * 1000);
  }

  // ===== HASH PASSWORD =====
  let hashedPassword = null;

  if(password){
    hashedPassword = btoa(password);
  }

  try{

    await window.firebaseSetDoc(id,{
      to,
      subject,
      message,
      password: hashedPassword,
      expiry,
      theme,
      font: fontSelect?.value,
      fontSize: fontSizeInput?.value,
      color: colorPicker?.value,
      createdAt: Date.now()
    });

    const link = `${window.location.origin}/l/${id}`;

    showPopup("Tạo thư thành công 💌", link);

    form.reset();

    editor.innerHTML = "";
    previewText.innerHTML =
      "Nội dung thư của bạn sẽ hiển thị ở đây...";

    charCount.textContent = "0 / 2000";

  }
  catch(err){

    console.error(err);

    showPopup("Lỗi khi lưu thư 😢");

  }

});


// =========================
// STYLE CONTROLS
// =========================
if(fontSelect){
  fontSelect.addEventListener("change", () => {

    editor.style.fontFamily = fontSelect.value;
    previewText.style.fontFamily = fontSelect.value;

  });
}

if(fontSizeInput){
  fontSizeInput.addEventListener("input", () => {

    editor.style.fontSize = fontSizeInput.value + "px";
    previewText.style.fontSize = fontSizeInput.value + "px";

    if(fontSizeValue){
      fontSizeValue.textContent = fontSizeInput.value + "px";
    }

  });
}

if(colorPicker){
  colorPicker.addEventListener("input", () => {

    editor.style.color = colorPicker.value;
    previewText.style.color = colorPicker.value;

    if(colorText){
      colorText.value = colorPicker.value;
    }

  });
}

if(colorText){
  colorText.addEventListener("input", () => {

    editor.style.color = colorText.value;
    previewText.style.color = colorText.value;

  });
}


// =========================
// TOOLBAR FORMAT
// =========================
function format(command){

  editor.focus();
  document.execCommand(command,false,null);

}

function setFont(font){

  editor.focus();
  document.execCommand("fontName",false,font);

}

function setColor(color){

  editor.focus();
  document.execCommand("foreColor",false,color);

}


// =========================
// POPUP
// =========================
function showPopup(message,link=""){

  document.getElementById("popupMessage").innerText = message;
  document.getElementById("popupLink").value = link;

  document.getElementById("popup").classList.remove("hidden");

}

function closePopup(){

  document.getElementById("popup").classList.add("hidden");

}

function copyLink(){

  const input = document.getElementById("popupLink");
  const successText = document.getElementById("copySuccess");

  navigator.clipboard.writeText(input.value).then(()=>{

    successText.classList.remove("hidden");

    setTimeout(()=>{
      successText.classList.add("hidden");
    },2000);

  });

}


// =========================
// THEME SWITCH
// =========================
document.body.classList.add("default");

themeSelect.addEventListener("change", () => {

  const theme = themeSelect.value;

  document.body.className = "";

  document.body.classList.add(theme);

});