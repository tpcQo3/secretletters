// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBznlEjaRHE7my7mFZTKgldokLGmkL609A",
  authDomain: "screctletters.firebaseapp.com",
  projectId: "screctletters",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Lấy id từ URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const letterDiv = document.getElementById("letter");

if (id) {
  db.collection("letters").doc(id).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();

        letterDiv.innerText = data.content;
        letterDiv.style.fontFamily = data.font;
        letterDiv.style.fontSize = data.size + "px";
        letterDiv.style.color = data.color;

      } else {
        letterDiv.innerText = "Không tìm thấy thư 😢";
      }
    });
} else {
  letterDiv.innerText = "Thiếu ID thư";
}