const fs = require("fs");
let s = fs.readFileSync("index.html", "utf8");

// 1. Меняем стиль поля (наклоняем его)
s = s.replace(
  /#b\s*\{[^}]*\}/,
  `#b {
    display: grid;
    grid-template-columns: repeat(10, 20px);
    grid-template-rows: repeat(20, 20px);
    gap: 0;
    background: #232e3c;
    padding: 2px;
    margin-top: 60px;
    /* 3D-наклон */
    transform: rotateX(55deg) rotateZ(-45deg);
    transform-style: preserve-3d;
    box-shadow: 20px 20px 50px rgba(0,0,0,0.8);
    border-radius: 4px;
  }`
);

// 2. Делаем ячейки пустыми (прозрачными)
s = s.replace(
  /\.c\s*\{[^}]*\}/,
  `.c {
    width: 20px;
    height: 20px;
    background: #0e1621;
    border: 1px solid rgba(255,255,255,0.05);
    box-sizing: border-box;
  }`
);

// 3. Делаем блоки объемными
s = s.replace(
  /\.blk\s*\{[^}]*\}/,
  `.blk {
    background: #007bff;
    box-shadow: 
      inset 2px 2px 4px rgba(255,255,255,0.4),
      inset -2px -2px 4px rgba(0,0,0,0.5),
      0 4px 0 rgba(0,0,0,0.4);
    border-radius: 2px;
    transform: translateZ(15px);
  }`
);

// 4. Убираем фоновые цвета из JS (чтобы CSS-переменная работала)
s = s.replace(
  /e\.className='c blk';e\.style\.backgroundColor=C\[b\.ci\]/g,
  "e.className='c blk';e.style.setProperty('--c', C[b.ci])"
);
s = s.replace(
  /e\.className='c blk';e\.style\.backgroundColor=F\.col/g,
  "e.className='c blk';e.style.setProperty('--c', F.col)"
);

fs.writeFileSync("index.html", s);
console.log("✅ CSS 3D внедрен! Игра должна работать.");
