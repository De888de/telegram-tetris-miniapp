const fs = require("fs");
let s = fs.readFileSync("index.html", "utf8");

// Удаляем все наши старые вставки (2.5D)
s = s.replace(/\/\* === НАСТОЯЩИЕ 3D КУБИКИ === \*\/[\s\S]*?<\/style>/, "</style>");

const newCSS = `
    /* === НАСТОЯЩИЕ 3D КУБИКИ === */
    #b {
      display: grid !important;
      grid-template-columns: repeat(10, 24px) !important;
      grid-template-rows: repeat(20, 24px) !important;
      gap: 1px !important;
      background: #232e3c !important;
      padding: 0 !important;
      margin-top: 100px !important;
      transform: rotateX(45deg) rotateZ(-45deg) !important;
      transform-style: preserve-3d !important;
      box-shadow: 10px 10px 30px rgba(0,0,0,0.8) !important;
    }
    
    .c {
      width: 24px !important;
      height: 24px !important;
      background: #0e1621 !important;
      border: 1px solid rgba(255,255,255,0.05) !important;
      box-sizing: border-box !important;
      position: relative !important;
      transform-style: preserve-3d !important;
    }

    .blk {
      background: var(--c, #007bff) !important;
      border: none !important;
      position: relative !important;
      transform-style: preserve-3d !important;
      box-shadow: none !important;
      border-radius: 3px !important;
    }

    .blk::before {
      content: "" !important;
      position: absolute !important;
      top: -12px !important;
      left: 0 !important;
      width: 24px !important;
      height: 24px !important;
      background: var(--c, #007bff) !important;
      transform: rotateX(90deg) translateZ(12px) !important;
      filter: brightness(1.4) !important;
      border-radius: 3px !important;
    }

    .blk::after {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      right: -12px !important;
      width: 24px !important;
      height: 24px !important;
      background: var(--c, #007bff) !important;
      transform: rotateY(90deg) translateZ(12px) !important;
      filter: brightness(0.6) !important;
      border-radius: 3px !important;
    }
`;

s = s.replace("</style>", newCSS + "\n</style>");

// Меняем обновление цвета в JS (аккуратно, без путаницы кавычек)
s = s.replace(/e\.className='c blk';e\.style\.backgroundColor=C\[b\.ci\]/g, "e.className='c blk';e.style.setProperty('--c', C[b.ci])");
s = s.replace(/e\.className='c blk';e\.style\.backgroundColor=F\.col/g, "e.className='c blk';e.style.setProperty('--c', F.col)");

fs.writeFileSync("index.html", s);
console.log("✅ Толстый 3D внедрен успешно!");
