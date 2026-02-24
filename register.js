import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore, setDoc, doc } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBznlEjaRHE7my7mFZTKgldokLGmkL609A",
  authDomain: "screctletters.firebaseapp.com",
  projectId: "screctletters",
  storageBucket: "screctletters.firebasestorage.app",
  messagingSenderId: "916940604225",
  appId: "1:916940604225:web:faf88856504271362ed7c0",
  measurementId: "G-KJFKX7M26P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

    const registerBtn = document.getElementById("registerBtn");
    const goLogin = document.getElementById("goLogin");

    registerBtn.addEventListener("click", async (e) => {

        e.preventDefault(); // 🔥 QUAN TRỌNG: tránh reload form

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!username || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                createdAt: new Date()
            });

            // 🔥 Hiện popup lá thư
            const letter = document.getElementById("successLetter");
            letter.style.display = "flex";

        } catch (error) {
            alert("Lỗi: " + error.message);
        }

    });

    goLogin.addEventListener("click", () => {
        window.location.href = "login.html";
    });

});