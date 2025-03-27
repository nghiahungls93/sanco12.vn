@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
}

.background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff416c, #ff4b2b, #1e90ff, #00c9ff);
    background-size: 400% 400%;
    animation: gradientBG 10s infinite ease-in-out;
    z-index: -1;
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.container {
    position: relative;
    padding: 20px;
    max-width: 500px;
}

h1 {
    font-size: 36px;
    font-weight: 600;
}

p {
    font-size: 18px;
    margin-bottom: 20px;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
}

.icon {
    font-size: 30px;
    color: white;
    text-decoration: none;
    transition: transform 0.3s ease-in-out;
}

.icon:hover {
    transform: scale(1.2);
}

.facebook:hover { color: #1877F2; }
.youtube:hover { color: #FF0000; }
.tiktok:hover { color: #000000; }

.contact {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn {
    display: block;
    padding: 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    text-decoration: none;
    color: white;
    font-weight: 600;
    transition: background 0.3s;
}

.btn:hover {
    background: rgba(255, 255, 255, 0.4);
}
