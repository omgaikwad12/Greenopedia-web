/**************** TAB SWITCH ****************/
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.onclick = () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
};

registerTab.onclick = () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
};

/**************** EMAIL LOGIN ****************/
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            showMsg("loginMessage", "Login successful ✅", "green");
            setTimeout(() => location.href = "dashboard.html", 1000);
        } else {
            showMsg("loginMessage", data.message, "red");
        }
    } catch {
        showMsg("loginMessage", "Server error", "red");
    }
});

/**************** FIREBASE CONFIG ****************/
const firebaseConfig = {
    apiKey: "AIzaSyCOT186L9Jd4sbL4Cv26HEMt3NL-mAhUGE",
    authDomain: "greenopedia-825c3.firebaseapp.com",
    projectId: "greenopedia-825c3",
    storageBucket: "greenopedia-825c3.firebasestorage.app",
    messagingSenderId: "698593977610",
    appId: "1:698593977610:web:7e31110fc8882f676ec6f3"
  };
  
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/**************** GOOGLE LOGIN ****************/
document.getElementById("googleLogin").onclick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        console.log("Google User:", user);

        showMsg(
            "registerMessage",
            `Welcome ${user.displayName} 👋`,
            "green"
        );

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    } catch (error) {
        showMsg("registerMessage", error.message, "red");
    }
};

/**************** REGISTER (OPTIONAL DUMMY) ****************/
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showMsg("registerMessage", "Account created successfully ✅", "green");
});

/**************** MESSAGE HELPER ****************/
function showMsg(id, msg, color) {
    const el = document.getElementById(id);
    el.innerText = msg;
    el.style.color = color;
}

/**************** PASSWORD TOGGLE ****************/
document.querySelectorAll(".toggle-pass").forEach(icon => {
    icon.onclick = () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye-slash");
    };
});
