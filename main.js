<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCu0Ztd-n7hfruykfYI8jenMf5eIKKeZcE",
    authDomain: "burnoligithub.firebaseapp.com",
    projectId: "burnoligithub",
    storageBucket: "burnoligithub.firebasestorage.app",
    messagingSenderId: "973403605126",
    appId: "1:973403605126:web:992fdf57408a2f45426907",
    measurementId: "G-GWWXBJYSFE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>