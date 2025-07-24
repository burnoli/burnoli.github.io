
const homeBtn = document.createElement("a");
homeBtn.href = "index.html";
homeBtn.className = "popout-icon";
homeBtn.title = "Go to homepage";
homeBtn.innerHTML = "⬅️"; 


const style = document.createElement("style");
style.textContent = `
  .popout-icon {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    padding: 10px;
    z-index: 9999;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
    text-decoration: none;
    color: black;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
  }
  .popout-icon:hover {
    background-color: #eee;
    transform: scale(1.1);
  }
`;
document.head.appendChild(style);
document.body.appendChild(homeBtn);
