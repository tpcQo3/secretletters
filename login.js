// Import Firebase
import { getFirestore, setDoc, doc } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// CẤU HÌNH CỦA BẠN (copy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBznlEjaRHE7my7mFZTKgldokLGmkL609A",
  authDomain: "screctletters.firebaseapp.com",
  projectId: "screctletters",
  storageBucket: "screctletters.firebasestorage.app",
  messagingSenderId: "916940604225",
  appId: "1:916940604225:web:faf88856504271362ed7c0",
  measurementId: "G-KJFKX7M26P"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginBtn").addEventListener("click", () => {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Đăng nhập thành công!");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("Lỗi: " + error.message);
        });

});