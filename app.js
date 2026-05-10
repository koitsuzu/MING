/* 
  =========================================
  饈菓子（Shiu Guoji）頂級手作和菓子專賣店
  互動邏輯與產品渲染系統 - app.js
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initSakuraFalling();
  initProductsGallery();
  initInteractiveGame();
  initCartSystem();
  initAIAssistant();
  initSpotlightTutorial();
});

// 全局聚光燈與導覽管理變數
let spotlightTimeout;
let currentTourTargets = [];
let currentTourIndex = 0;

function initSpotlightTutorial() {
  // 1. 背景帷幕層
  const overlay = document.createElement('div');
  overlay.className = 'spotlight-overlay';
  overlay.id = 'spotlight-overlay';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    window.clearSpotlight();
  });

  // 2. 產品導覽浮動控制條 (✨ 新增核心組件)
  const controller = document.createElement('div');
  controller.className = 'tour-controller';
  controller.id = 'tour-controller';
  controller.innerHTML = `
    <div class="tour-status" id="tour-status">點心巡禮中</div>
    <button class="tour-nav-btn" id="tour-prev-btn">← 上一個</button>
    <button class="tour-nav-btn primary" id="tour-next-btn">下一個 ➔</button>
    <button class="tour-close-btn" id="tour-close-btn" title="結束導覽">×</button>
  `;
  document.body.appendChild(controller);

  // 綁定按鈕交互邏輯
  document.getElementById('tour-prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentTourIndex > 0) window.runTourStep(currentTourIndex - 1);
  });
  document.getElementById('tour-next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentTourIndex < currentTourTargets.length - 1) {
      window.runTourStep(currentTourIndex + 1);
    } else {
      window.clearSpotlight(); // 最後一個，點擊即結束
    }
  });
  document.getElementById('tour-close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    window.clearSpotlight();
  });
}

// 暴露到全域：核心單步導覽邏輯渲染器
window.runTourStep = function(index) {
  if (!currentTourTargets.length || index < 0 || index >= currentTourTargets.length) return;
  
  currentTourIndex = index;
  const overlay = document.getElementById('spotlight-overlay');
  const controller = document.getElementById('tour-controller');
  const currentTarget = currentTourTargets[index];

  // 1. 清除舊定時器與視覺狀態（手動中斷自動機制）
  clearTimeout(spotlightTimeout);
  document.querySelectorAll('.spotlight-focus').forEach(el => el.classList.remove('spotlight-focus'));
  document.querySelectorAll('.spotlight-btn-pulse').forEach(el => el.classList.remove('spotlight-btn-pulse'));

  // 2. 更新導覽控制台 UI
  overlay.classList.add('active');
  
  // 只有多個項目時，才顯示底部控制浮條
  if (currentTourTargets.length > 1) {
    controller.classList.add('active');
    document.getElementById('tour-status').innerText = `點心巡禮 (${index + 1} / ${currentTourTargets.length})`;
    
    const prevBtn = document.getElementById('tour-prev-btn');
    const nextBtn = document.getElementById('tour-next-btn');
    
    prevBtn.disabled = (index === 0);
    if (index === currentTourTargets.length - 1) {
      nextBtn.innerText = '完成導覽 ✓';
    } else {
      nextBtn.innerText = '下一個 ➔';
    }
  } else {
    controller.classList.remove('active');
  }

  // 3. 平滑滑動到目標
  currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // 4. 稍微等待滾動就位，觸發高亮
  spotlightTimeout = setTimeout(() => {
    if (!overlay.classList.contains('active')) return;

    const parentCard = currentTarget.closest('.product-card');
    if (parentCard && parentCard !== currentTarget) {
      parentCard.classList.add('spotlight-focus');
    }
    currentTarget.classList.add('spotlight-focus');

    if (currentTarget.classList.contains('btn-add-cart') || currentTarget.classList.contains('add-to-cart-trigger')) {
      currentTarget.classList.add('spotlight-btn-pulse');
    }

    // 【自動管理】：如果是單一商品，4秒後自動淡出；如果是多商品巡禮，就停留在這直到用戶按「下一個」！
    if (currentTourTargets.length === 1) {
      spotlightTimeout = setTimeout(() => {
        window.clearSpotlight();
      }, 4000);
    }
  }, 500);
};

// 暴露到全域，提供給 AI Assistant 做入口呼叫
window.activateSpotlight = function(selector) {
  if (!selector) return;
  
  // 【絕殺修正】：徹底消滅舊版單一分頁跳轉的死胡同，直接強力開啟「全部模式」以跨區匯聚所有商品 DOM！
  if (selector.includes('data-id')) {
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn && !allBtn.classList.contains('active')) {
      allBtn.click();
      // 等待過濾動畫，然後遞迴匯集
      setTimeout(() => {
        window.activateSpotlight(selector);
      }, 350);
      return;
    }
  }

  const targets = document.querySelectorAll(selector);
  if (targets.length === 0) return;

  // 寫入全域隊列，準備啟動引擎
  currentTourTargets = Array.from(targets);
  currentTourIndex = 0;

  // 正式開跑第一步！
  window.runTourStep(0);
};

window.clearSpotlight = function() {
  const overlay = document.getElementById('spotlight-overlay');
  const controller = document.getElementById('tour-controller');
  
  if(overlay) overlay.classList.remove('active');
  if(controller) controller.classList.remove('active');
  
  document.querySelectorAll('.spotlight-focus').forEach(el => el.classList.remove('spotlight-focus'));
  document.querySelectorAll('.spotlight-btn-pulse').forEach(el => el.classList.remove('spotlight-btn-pulse'));
  
  clearTimeout(spotlightTimeout);
  currentTourTargets = [];
};


/* 
  1. 頂部主輪播看板 (Hero Carousel)
*/
function initHeroCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // 點擊監聽
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });

  // 自動播放
  function startInterval() {
    carouselInterval = setInterval(nextSlide, 6000);
  }

  function resetInterval() {
    clearInterval(carouselInterval);
    startInterval();
  }

  startInterval();
}

/* 
  2. 櫻花漂落特效 (Sakura Falling Effect)
*/
function initSakuraFalling() {
  const container = document.getElementById('sakura-container');
  if (!container) return;

  const maxPetals = 20;

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('sakura-petal');
    
    // 隨機尺寸 (15px 至 30px)
    const size = Math.random() * 15 + 15;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    // 隨機水平起始位置 (0% 至 100%)
    petal.style.left = `${Math.random() * 100}%`;
    
    // 隨機動畫時間 (6s 至 12s)
    const duration = Math.random() * 6 + 6;
    petal.style.animationDuration = `${duration}s`;
    
    // 隨機起始延遲
    petal.style.animationDelay = `${Math.random() * 4}s`;

    // 隨機水平漂移量與旋轉
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(petal);

    // 動態結束後刪除，重新生成，避免內存洩漏
    setTimeout(() => {
      petal.remove();
      createPetal();
    }, (duration + 4) * 1000);
  }

  // 初始化部分花瓣
  for (let i = 0; i < maxPetals; i++) {
    createPetal();
  }
}

/* 
  3. 商品資料庫與分類渲染系統
*/
const productDatabase = [
  // 1. 生菓子系列 (Namagashi)
  {
    id: 'namagashi-1',
    name: '手作櫻綻・生菓子',
    category: 'namagashi',
    image: 'image/生菓子產品圖/namagashi.png',
    price: 180,
    haiku: '春風拂面處，緋櫻初綻放',
    badge: 'image/推薦與精選/best1.png'
  },
  {
    id: 'namagashi-2',
    name: '松風落雪・生菓子',
    category: 'namagashi',
    image: 'image/生菓子產品圖/p1.jpg',
    price: 160,
    haiku: '歲寒知松柏，落雪映翠微',
    badge: ''
  },
  {
    id: 'namagashi-3',
    name: '翠竹流年・生菓子',
    category: 'namagashi',
    image: 'image/生菓子產品圖/p2.jpg',
    price: 160,
    haiku: '竹林深幽處，流光映澄溪',
    badge: ''
  },
  {
    id: 'namagashi-4',
    name: '紅豆沙山・生菓子',
    category: 'namagashi',
    image: 'image/生菓子產品圖/p3.jpg',
    price: 150,
    haiku: '紅豆揉白砂，靜臥小山間',
    badge: ''
  },
  {
    id: 'namagashi-5',
    name: '秋楓霜露・生菓子',
    category: 'namagashi',
    image: 'image/生菓子產品圖/p4.jpg',
    price: 170,
    haiku: '寒霜著紅楓，秋意溢掌心',
    badge: ''
  },
  {
    id: 'namagashi-6',
    name: '菊綻金秋・生菓子',
    category: 'namagashi',
    image: 'image/生菓子產品圖/p5.jpg',
    price: 170,
    haiku: '傲菊傲金秋，清香入和菓子',
    badge: ''
  },

  // 2. 羊羹系列 (Yokan)
  {
    id: 'yokan-1',
    name: '金栗凝脂羊羹',
    category: 'yokan',
    image: 'image/羊羹產品圖/yokan.png',
    price: 220,
    haiku: '晶瑩如美玉，金栗嵌秋風',
    badge: 'image/推薦與精選/best2.png'
  },
  {
    id: 'yokan-2',
    name: '宇治抹茶羊羹',
    category: 'yokan',
    image: 'image/羊羹產品圖/y1.jpg',
    price: 190,
    haiku: '茶意香溢深，凝膏留餘甘',
    badge: ''
  },
  {
    id: 'yokan-3',
    name: '清泉錦鯉羊羹',
    category: 'yokan',
    image: 'image/羊羹產品圖/y2.jpg',
    price: 240,
    haiku: '澄澈小溪水，雙鯉躍流光',
    badge: ''
  },
  {
    id: 'yokan-4',
    name: '醇厚黑糖羊羹',
    category: 'yokan',
    image: 'image/羊羹產品圖/y3.jpg',
    price: 180,
    haiku: '沖繩極醇黑，潤甜留舌尖',
    badge: ''
  },

  // 3. 大福系列 (Daifuku)
  {
    id: 'daifuku-1',
    name: '十勝紅豆草莓大福',
    category: 'daifuku',
    image: 'image/大福產品圖/d1.jpg',
    price: 90,
    haiku: '冰皮裹粉嫩，草莓蜜紅豆',
    badge: 'image/推薦與精選/best3.png'
  },
  {
    id: 'daifuku-2',
    name: '鹽漬八重櫻大福',
    category: 'daifuku',
    image: 'image/大福產品圖/d2.jpg',
    price: 95,
    haiku: '鹽漬八重櫻，Q彈綻芬芳',
    badge: ''
  },
  {
    id: 'daifuku-3',
    name: '靜岡濃抹茶大福',
    category: 'daifuku',
    image: 'image/大福產品圖/d3.jpg',
    price: 95,
    haiku: '苦甜抹茶餡，飽滿茶意濃',
    badge: ''
  },
  {
    id: 'daifuku-4',
    name: '溫潤黑芝麻大福',
    category: 'daifuku',
    image: 'image/大福產品圖/d4.jpg',
    price: 85,
    haiku: '芝麻磨細沙，綿延黑金意',
    badge: ''
  },

  // 4. 糰子系列 (Dango)
  {
    id: 'dango-1',
    name: '春遊極致三色糰子',
    category: 'dango',
    image: 'image/團子產品圖/dango.png',
    price: 80,
    haiku: '紅綠白三色，童年春遊夢',
    badge: 'image/推薦與精選/best4.png'
  },
  {
    id: 'dango-2',
    name: '古法焦香甜醬油糰子',
    category: 'dango',
    image: 'image/團子產品圖/01.jpg',
    price: 75,
    haiku: '微焦糰子串，甜醬油香溢',
    badge: ''
  },
  {
    id: 'dango-3',
    name: '萌動可愛熊糰子',
    category: 'dango',
    image: 'image/團子產品圖/d8.jpg',
    price: 90,
    haiku: '萌小熊笑臉，糯甜暖指尖',
    badge: ''
  },

  // 5. 經典和菓子系列 (Classic)
  {
    id: 'classic-1',
    name: '八重櫻御賞禮盒',
    category: 'classic',
    image: 'image/和菓子系列圖/w1.jpg',
    price: 450,
    haiku: '精緻和紙盒，贈予一期一會',
    badge: 'image/推薦與精選/best5.png'
  },
  {
    id: 'classic-2',
    name: '手作金栗燒',
    category: 'classic',
    image: 'image/和菓子系列圖/w2.jpg',
    price: 110,
    haiku: '微火烘焙香，金栗蜜甜飽',
    badge: ''
  },
  {
    id: 'classic-3',
    name: '紅豆御中原',
    category: 'classic',
    image: 'image/和菓子系列圖/w3.jpg',
    price: 120,
    haiku: '香脆和餅皮，飽滿紅豆餡',
    badge: ''
  }
];

function initProductsGallery() {
  const grid = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  function renderProducts(category = 'all') {
    grid.innerHTML = '';
    const filtered = category === 'all' 
      ? productDatabase 
      : productDatabase.filter(p => p.category === category);

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.setAttribute('data-id', p.id);
      
      const badgeHTML = ''; // 強制移除不需要的右上角小圖

      card.innerHTML = `
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
          ${badgeHTML}
        </div>
        <div class="product-info">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-haiku">「${p.haiku}」</p>
          <div class="product-footer">
            <span class="product-price">NT$ ${p.price}</span>
            <button class="btn-add-cart add-to-cart-trigger" data-id="${p.id}" aria-label="加入購物車">
              <img src="image/介面與圖示/bag.png" alt="加到購物車">
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // 重新綁定購物按鈕點擊事件
    bindAddToCartTriggers();
  }

  // 分類篩選點擊
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProducts(filter);
    });
  });

  // 初次渲染
  renderProducts();
}

/* 
  4. 小狐狸茶道配對遊戲 (Mascot Interactive Quiz)
*/
function initInteractiveGame() {
  const steps = document.querySelectorAll('.quiz-step');
  const mascotImg = document.getElementById('mascot-character');
  const mascotText = document.getElementById('mascot-text');
  const recDisplay = document.getElementById('recommended-product-display');
  const quizCard = document.getElementById('quiz-card');
  const restartBtn = document.getElementById('restart-quiz');
  const addRecToCartBtn = document.getElementById('add-recommended-to-cart');

  let selectedMood = '';
  let selectedTea = '';
  let matchedProduct = null;

  // 點擊選項邏輯
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parentStep = btn.closest('.quiz-step');
      const currentStepNum = parseInt(parentStep.getAttribute('data-step'));
      const nextTarget = btn.getAttribute('data-next');

      if (currentStepNum === 1) {
        selectedMood = btn.getAttribute('data-answer');
        // 切換小狐狸表情與對話
        mascotImg.src = 'image/互動與問答/bo2.png'; // 驚喜/期待
        mascotText.innerText = '「太棒了！這種四季情調真優雅。那麼，您打算用哪款和風茗茶來佐以品茗呢？」';
        
        // 切換到下一步
        parentStep.classList.remove('active');
        document.querySelector(`.quiz-step[data-step="2"]`).classList.add('active');
      } else if (nextTarget === 'result') {
        selectedTea = btn.getAttribute('data-answer');
        // 計算配對結果
        calculateMatchingResult();
      }
    });
  });

  function calculateMatchingResult() {
    // 依據心情與茶飲搭配推薦商品
    let targetProductId = '';
    let teaName = '';

    if (selectedMood === 'spring') {
      targetProductId = 'namagashi-1'; // 手作櫻綻生菓子
      teaName = selectedTea === 'matcha' ? '宇治抹茶' : '靜岡煎茶';
    } else if (selectedMood === 'summer') {
      targetProductId = 'yokan-3'; // 清泉錦鯉羊羹
      teaName = selectedTea === 'sencha' ? '靜岡煎茶' : '京都焙茶';
    } else if (selectedMood === 'autumn') {
      targetProductId = 'yokan-1'; // 金栗羊羹
      teaName = selectedTea === 'houjicha' ? '京都焙茶' : '阿里山烏龍';
    } else {
      targetProductId = 'daifuku-1'; // 草莓大福
      teaName = selectedTea === 'oolong' ? '阿里山烏龍' : '宇治抹茶';
    }

    matchedProduct = productDatabase.find(p => p.id === targetProductId) || productDatabase[0];

    // 更新小狐狸開心狀態
    mascotImg.src = 'image/互動與問答/bo1.png'; // 雙手比讚 / 超開心
    mascotText.innerText = `「配對成功！您今日的心靈茶席已經安排妥當。這款【${matchedProduct.name}】搭配【${teaName}】，絕對是頂級享受！」`;

    // 渲染推薦區域
    recDisplay.innerHTML = `
      <img src="${matchedProduct.image}" alt="${matchedProduct.name}" class="rec-product-img">
      <div>
        <h5 class="rec-info-title">${matchedProduct.name}</h5>
        <p class="rec-tea-text">茶席推薦：佐以 ${teaName}</p>
        <p class="rec-info-desc">「${matchedProduct.haiku}」— 完美契合您此時的心境。</p>
        <p class="product-price" style="margin-top: 4px;">組合優惠價: NT$ ${matchedProduct.price}</p>
      </div>
    `;

    // 顯示結果
    document.querySelector(`.quiz-step[data-step="2"]`).classList.remove('active');
    document.getElementById('quiz-result').classList.add('active');
  }

  // 加入購物袋
  if (addRecToCartBtn) {
    addRecToCartBtn.addEventListener('click', () => {
      if (matchedProduct) {
        addToCart(matchedProduct.id);
        // 吉祥物提醒
        mascotImg.src = 'image/互動與問答/do1.png'; // 導引/結帳
        mascotText.innerText = `「配對和菓子已經放進茶袋囉！歡迎點選右下角小狐狸，或是右上方購物袋進行結帳喔！」`;
      }
    });
  }

  // 重新測驗
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      selectedMood = '';
      selectedTea = '';
      matchedProduct = null;
      mascotImg.src = 'image/互動與問答/bobo.png';
      mascotText.innerText = '「讓我們重新探索心靈與和菓子的奇妙連結吧，順從您的直覺～」';

      document.getElementById('quiz-result').classList.remove('active');
      document.querySelector(`.quiz-step[data-step="1"]`).classList.add('active');
    });
  }

  // 常駐右下角小狐狸點擊，平滑滾動到遊戲區
  const widget = document.getElementById('mascot-widget');
  if (widget) {
    widget.addEventListener('click', () => {
      const gameSec = document.getElementById('interactive-game');
      if (gameSec) gameSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* 
  5. 臻品購物車系統 (Cart System)
*/
let cart = [];

function initCartSystem() {
  const drawer = document.getElementById('cart-drawer');
  const cartBtn = document.getElementById('cart-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const overlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn-cta');

  if (!drawer || !cartBtn) return;

  // 打開與關閉購物袋
  cartBtn.addEventListener('click', () => drawer.classList.add('active'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  overlay.addEventListener('click', () => drawer.classList.remove('active'));

  // 結帳按鈕提示
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showCheckoutModal(cart.length > 0);
    });
  }

  // 頂級和風模擬結帳彈出視窗 (Wagashi Checkout Modal) 交互邏輯
  const modal = document.getElementById('checkout-modal');
  const modalCloseOverlay = document.getElementById('modal-close-overlay');
  const modalCloseBtnX = document.getElementById('modal-close-btn-x');
  const modalActionBtn = document.getElementById('modal-action-btn');

  function showCheckoutModal(isSuccess) {
    const mascot = document.getElementById('modal-mascot');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');
    const actionBtn = document.getElementById('modal-action-btn');

    if (isSuccess) {
      mascot.src = 'image/互動與問答/bo1.png'; // 超開心
      title.innerText = '訂單謹製提交完成！';
      text.innerHTML = '「饈菓子」感謝您的支持！已成功為您預留手作珍饈名額，客服狐 <strong>Bobo</strong> 將盡快與您聯繫確認。';
      actionBtn.innerText = '再逛逛';
      
      // 清空購物車
      cart = [];
      updateCartUI();
    } else {
      mascot.src = 'image/互動與問答/do1.png'; // 指引
      title.innerText = '您的茶袋還是空的呢';
      text.innerText = '快去挑選一些極致美味的手作和菓子，開啟今日的雅緻茶席吧！';
      actionBtn.innerText = '探尋臻品';
    }

    modal.classList.add('active');
    if (drawer) drawer.classList.remove('active');
  }

  function closeCheckoutModal() {
    modal.classList.remove('active');
  }

  if (modalCloseOverlay) modalCloseOverlay.addEventListener('click', closeCheckoutModal);
  if (modalCloseBtnX) modalCloseBtnX.addEventListener('click', closeCheckoutModal);
  if (modalActionBtn) {
    modalActionBtn.addEventListener('click', () => {
      closeCheckoutModal();
      if (modalActionBtn.innerText === '探尋臻品') {
        const prodSec = document.getElementById('products');
        if (prodSec) prodSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

function bindAddToCartTriggers() {
  const triggers = document.querySelectorAll('.add-to-cart-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-id');
      addToCart(id);
    });
  });
}

function addToCart(productId) {
  const product = productDatabase.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCartUI();
  
  // 自動滑出購物車
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('active');
}

function updateCartUI() {
  const container = document.getElementById('cart-items-container');
  const countBadge = document.querySelector('.cart-count');
  const subtotalEl = document.querySelector('.subtotal-amount');
  const emptyMsg = document.getElementById('cart-empty-message');

  if (!container) return;

  // 總數量與小計
  let totalCount = 0;
  let subtotal = 0;

  // 清除現出品項（保留 empty message）
  const items = container.querySelectorAll('.cart-item');
  items.forEach(el => el.remove());

  if (cart.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'flex';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';

    cart.forEach(item => {
      totalCount += item.quantity;
      subtotal += item.product.price * item.quantity;

      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      itemEl.innerHTML = `
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.product.name}</h4>
          <span class="cart-item-price">NT$ ${item.product.price}</span>
          <div class="cart-item-qty">
            <button class="qty-btn dec-qty" data-id="${item.product.id}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn inc-qty" data-id="${item.product.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.product.id}">&times;</button>
      `;
      container.appendChild(itemEl);
    });
  }

  // 更新徽章與總價
  if (countBadge) countBadge.innerText = totalCount;
  if (subtotalEl) subtotalEl.innerText = `NT$ ${subtotal.toLocaleString()}`;

  // 綁定增減數量與刪除事件
  bindCartItemEvents();
}

function bindCartItemEvents() {
  const decBtns = document.querySelectorAll('.dec-qty');
  const incBtns = document.querySelectorAll('.inc-qty');
  const removeBtns = document.querySelectorAll('.cart-item-remove');

  decBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = cart.find(i => i.product.id === id);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.product.id !== id);
        }
        updateCartUI();
      }
    });
  });

  incBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = cart.find(i => i.product.id === id);
      if (item) {
        item.quantity += 1;
        updateCartUI();
      }
    });
  });

  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      cart = cart.filter(i => i.product.id !== id);
      updateCartUI();
    });
  });
}

/* 
  6. AI 智能兔子助理互動與智能問答系統 (AI Rabbit Assistant System)
*/
function initAIAssistant() {
  // 💡 已改為呼叫後端安全代理，金鑰存放於後端 .env 中
  const BACKEND_URL = 'http://localhost:3000/api/chat';

  const aiBtn = document.getElementById('ai-btn');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-close-btn');
  const chatInput = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const chatMessages = document.getElementById('ai-chat-messages');
  const hintBubble = document.getElementById('ai-hint-bubble');
  const quickBtns = document.querySelectorAll('.quick-opt-btn');

  if (!aiBtn || !chatWindow) return;

  // 1. 開啟/關閉對話視窗
  aiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWindow.classList.toggle('active');
    
    // 一旦點擊，隱藏提示氣泡
    if (hintBubble) {
      hintBubble.classList.add('hide');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatWindow.classList.remove('active');
    });
  }

  // 點擊視窗外部關閉
  document.addEventListener('click', (e) => {
    if (chatWindow.classList.contains('active') && !chatWindow.contains(e.target) && !aiBtn.contains(e.target)) {
      chatWindow.classList.remove('active');
    }
  });

  // 滾動網頁時，也優雅隱藏提示氣泡
  window.addEventListener('scroll', () => {
    if (hintBubble && window.scrollY > 100) {
      hintBubble.classList.add('hide');
    }
  }, { passive: true });

  // 2. 智能自動回覆引擎 (NLP Keyword Matching Engine)
  function getAIResponse(userText) {
    const text = userText.toLowerCase().trim();

    // 20週年紀念
    if (text.includes('20') || text.includes('二十') || text.includes('周年') || text.includes('週年')) {
      return {
        replyText: `🎉 饈菓子 20 週年紀念特別企劃：
      自 2003 年創立以來，我們已與無數饕客共度了 20 年的甜蜜歲月。
      
      今年我們特別推出了全新的「20週年櫻綻限定版大福」，融合金箔與櫻花甘露，感謝您一路上對我們的支持！您可以在頂部看板的大圖中一睹它的絕美風采喔！`,
        targetSelector: '#hero'
      };
    }

    // 抹茶專案系列 (高優先序過濾)
    if (text.includes('抹茶大福')) {
      return {
        replyText: `🍵 茶韻極致首選：【靜岡濃抹茶大福】($95)
      
      選用日本靜岡優質茶粉揉入特製苦甜抹茶餡，入口即化且餘韻綿長。
      
      已為您鎖定這款濃郁飽滿的抹茶大福！`,
        targetSelector: "[data-id='daifuku-3']"
      };
    }
    if (text.includes('抹茶')) {
      return {
        replyText: `🍵 饈菓子 經典抹茶系列推薦：
      我們精選了多款日式純厚抹茶逸品！包含：
      1. 【宇治抹茶羊羹】：凝脂般晶瑩，回甘無窮。
      2. 【靜岡濃抹茶大福】：濃郁苦甜，飽滿茶香。
      
      已啟動「自動導覽系統」，正依序帶您參訪這兩款絕佳抹茶臻品供您鑑賞！`,
        targetSelector: "[data-id='yokan-2'], [data-id='daifuku-3']"
      };
    }

    // 1. 大福系列與商品
    if (text.includes('草莓大福') || text.includes('草莓')) {
      return {
        replyText: `🍓 嚴選新鮮大草莓：【十勝紅豆草莓大福】($90)
      
      嚴選新鮮大草莓與京都十勝紅豆餡，酸甜適口。每一口都能嘗到草莓的清香與豆沙的綿密！`,
        targetSelector: "[data-id='daifuku-1']"
      };
    }
    if (text.includes('櫻綻大福') || text.includes('櫻花大福') || text.includes('櫻綻') || text.includes('櫻花')) {
      return {
        replyText: `🌸 絕美高雅逸品：【鹽漬八重櫻大福】($95)
      
      融合當季櫻花瓣與特製生餡，Q彈綻芬芳。是最受歡迎的春季經典！`,
        targetSelector: "[data-id='daifuku-2']"
      };
    }
    if (text.includes('大福')) {
      return {
        replyText: `🌸 臻品大福系列推薦：
      我們有最受歡迎的【櫻綻大福】、【草莓大福】、【濃抹茶大福】等經典系列，每一口都是極致享受。
      
      已啟動「全系列巡禮」，將引領您飽覽所有的極品大福！`,
        targetSelector: "[data-id='daifuku-1'], [data-id='daifuku-2'], [data-id='daifuku-3'], [data-id='daifuku-4']"
      };
    }

    // 2. 生菓子系列
    if (text.includes('生菓子') || text.includes('生果子') || text.includes('手工') || text.includes('三角棒') || text.includes('雕刻') || text.includes('工藝')) {
      return { 
        replyText: `✨ 職人代表作：頂級生菓子系列
      
      由職人傾注一生手藝，將四季的流轉具象化。包含【手作櫻綻】、【松風落雪】、【翠竹流年】與極涼逸品【葛饅頭】。
      
      已為您啟動「生菓子全系列豪華巡禮」，邀您細細品味極致的和風禪意與指尖藝術！`,
        targetSelector: "[data-id='namagashi-1'], [data-id='namagashi-2'], [data-id='namagashi-3'], [data-id='namagashi-4'], [data-id='namagashi-5'], [data-id='namagashi-6']"
      };
    }

    // 3. 羊羹系列
    if (text.includes('羊羹') || text.includes('清泉錦鯉') || text.includes('金栗')) {
      return {
        replyText: `🎋 絕代風雅：羊羹臻品系列
      
      晶瑩剔透的瓊脂猶如流動的光輝，包含大氣優雅的【金栗凝脂羊羹】、匠心獨具的【清泉錦鯉羊羹】與濃醇的【宇治抹茶羊羹】。
      
      已啟動「羊羹全系列大賞巡禮」，請隨步調細細品味這場味覺雙重盛宴。`,
        targetSelector: "[data-id='yokan-1'], [data-id='yokan-2'], [data-id='yokan-3'], [data-id='yokan-4']"
      };
    }

    // 4. 糰子系列
    if (text.includes('糰子') || text.includes('團子') || text.includes('三色') || text.includes('醬油')) {
      return {
        replyText: `🍡 療癒和風：經典糰子大賞
      
      復刻兒時的賞櫻滋味！包含絕美的【三色糰子】、甜中帶鹹的【古法焦香甜醬油糰子】，以及孩子們最愛的【萌動可愛熊糰子】。
      
      已啟動「全系列糰子巡禮」，讓我們一起感受最樸實溫暖的日式美味！`,
        targetSelector: "[data-id='dango-1'], [data-id='dango-2'], [data-id='dango-3']"
      };
    }

    // 5. 禮盒與伴手禮
    if (text.includes('禮盒') || text.includes('送禮') || text.includes('伴手禮') || text.includes('經典') || text.includes('和菓子') || text.includes('和果子')) {
      return {
        replyText: `🎁 精緻送禮首選：經典和菓子禮盒系列
      
      嚴選極致臻品組成禮物，並採用日本進口友禪紙手工包裝。無論是【八重櫻御賞禮盒】或是【手作金栗燒】，均是大器典雅的致贈首選。
      
      已為您啟動「頂級禮盒專場巡禮」，一覽所有貴氣獻禮！`,
        targetSelector: "[data-id='classic-1'], [data-id='classic-2'], [data-id='classic-3']"
      };
    }

    // 茶席配對 / 搭配
    if (text.includes('茶') || text.includes('搭配') || text.includes('配對') || text.includes('茶席') || text.includes('焙茶') || text.includes('煎茶')) {
      return {
        replyText: `🍵 饈菓子獨家茶席搭配秘訣：
      1. 【大福類】建議搭配「焙茶」或「玄米茶」，完美帶出豆沙純粹麥香。
      2. 【生菓子】與「日本濃抹茶」是絕配，甘苦交織。
      
      網頁設有「茶席配對」互動遊戲，快來測測您的專屬茶譜！`,
        targetSelector: '#interactive-game'
      };
    }

    // 四大堅持 (優先序拉高，避免被包含「精神」二字的句子誤導到品牌故事)
    if (text.includes('堅持') || text.includes('特色')) {
      return {
        replyText: `🌟 饈菓子的四大品牌堅持：
      1. 【純天然食材】：絕無人工色素。
      2. 【當日現做】：封存最新鮮的一刻。
      3. 【極致禪意】：體現極致生活哲學。
      4. 【一期一會】：傾注一生的熱情與心意。
      
      已為您打光聚焦在頂部的「四大堅持」專區！`,
        targetSelector: '.featured-section'
      };
    }

    // 品牌故事 / 職人精神
    if (text.includes('精神') || text.includes('故事') || text.includes('理念') || text.includes('關於') || text.includes('職人')) {
      return {
        replyText: `📜 饈菓子的職人故事：
      傳承百年的頂級手藝，將四季的流轉融入每一顆菓子。堅持「一期一會」的初心，用一生的心意為您呈現最極致的和風美學。
      
      已為您引導至「職人故事」區塊，帶您深入探索我們的品牌深度！`,
        targetSelector: '#about'
      };
    }

    // 購物流程 - 如何加入購物車 (優先判定具體按鈕)
    if (text.includes('加入購物車') || text.includes('怎麼買') || text.includes('如何買')) {
      return {
        replyText: `📦 如何購買說明：
      請在看中的點心卡片右下角，點擊【加入購物車】圓形按鈕（已為您打光圈選範例按鈕），該商品就會優雅地滑入您的購物袋中囉！`,
        targetSelector: "[data-id='daifuku-1'] .btn-add-cart"
      };
    }

    // 購物流程 - 結帳/運費/購物車查看
    if (text.includes('買') || text.includes('購買') || text.includes('運費') || text.includes('結帳') || text.includes('購物車')) {
      return {
        replyText: `🛒 購物車與配送說明：
      1. 點擊右上角兔子旁的「購物袋圖示」可展開您的採購清單。
      2. 在清單下方點擊【模擬結帳】即可體驗流程。
      3. 訂單滿 $1,000 元即可享有低溫免運優惠！`,
        targetSelector: '#cart-btn'
      };
    }

    // 聯絡方式 / 地址 / 電話 / 營業時間 / 店址 / 位置
    if (text.includes('聯絡') || text.includes('地址') || text.includes('電話') || text.includes('時間') || text.includes('營業') || text.includes('店休') || text.includes('地圖') || text.includes('位置') || text.includes('在哪') || text.includes('客服')) {
      return {
        replyText: `📍 饈菓子 聯絡資訊與營業時間：
      - 【店面地址】：台北市大安區和風禪意路 88 號 1 樓
      - 【聯絡電話】：02-2735-8899
      - 【營業時間】：週一至週日 11:00 - 19:30 (每週二店休，請注意不要白跑一趟喔！)
      
      歡迎您在營業時間撥打電話諮詢預購，或前來實體店面感受最極致的和風美學體驗喔！🌸`,
        targetSelector: '.footer-contact-column'
      };
    }

    // 基礎問候
    if (text.includes('哈囉') || text.includes('你好') || text.includes('您好') || text.includes('hi') || text.includes('hello') || text.includes('嗨') || text.includes('在嗎')) {
      return {
        replyText: `🌸 您好！我是饈菓子的兔子助理。很高興與您相遇！
      
      不論您想了解臻品和菓子、茶席配對秘訣，還是我們的職人故事，我都能為您解答。
      請問今天想聊聊哪一樣臻品呢？`,
        targetSelector: null
      };
    }

    // 默認 Fallback
    return {
      replyText: `🌸 謝謝您的提問！關於您提到的話題，我是專屬饈菓子的智能問答助手，主要為您解答這個網站內部的和菓子相關知識。
    
    您可以試著這樣詢問我：
    - 「你們在哪裡？電話是多少？」
    - 「櫻綻大福特色是什麼？」
    - 「我想了解三角棒生菓子」
    - 「和菓子應該搭配什麼茶？」
    - 「你們有什麼禮盒或品牌堅持嗎？」
    
    您也可以直接點擊下方常駐的快捷按鈕（例如：🌸 當季熱銷推薦、🍵 點心茶席配對），讓我為您解答喔！`,
      targetSelector: null
    };
  }

  // 2.5 呼叫後端安全代理 API 獲取 Gemini 回覆
  async function fetchGeminiResponse(userPrompt) {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userPrompt })
    });

    if (!response.ok) {
      throw new Error(`Backend API error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // 現在後端會直接回傳 { replyText, targetSelector } 結構
  }

  // 輔助函式：將 Markdown 轉為 HTML 顯示 (支援粗體與換行)
  function formatMarkdownToHTML(text) {
    if (!text) return '';
    let html = escapeHTML(text);
    // 粗體 **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // 斜體 *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // 點清單 - text -> • text
    html = html.replace(/^\s*-\s+(.*?)$/gm, '• $1');
    // 換行符轉成 <br>
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  // 3. 發送訊息邏輯 (支援異步 Gemini API & 本地備份)
  async function sendMessage(text) {
    if (!text.trim()) return;

    // A. 添加使用者訊息
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.innerHTML = `<div class="message-content">${escapeHTML(text)}</div>`;
    chatMessages.appendChild(userMsgDiv);
    
    chatInput.value = '';
    scrollToBottom();

    // B. 顯示 AI 輸入中動畫 (Typing Indicator)
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator-wrapper';
    typingDiv.innerHTML = `
      <div class="message-content">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();

    // C. 獲取回覆 (優先呼叫後端 API，若後端未啟動或連線失敗，自動降級為本地關鍵字引擎)
    try {
      let replyData = null;
      try {
        replyData = await fetchGeminiResponse(text);
      } catch (backendError) {
        console.warn('Backend proxy is not responding, falling back to local engine:', backendError);
        // 模擬短暫打字延遲後使用本地關鍵字回覆
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
        replyData = getAIResponse(text);
      }

      // 相容性處理 (如果回傳的是字串就包裝成物件)
      if (typeof replyData === 'string') {
        replyData = { replyText: replyData, targetSelector: null };
      }

      const { replyText, targetSelector } = replyData;

      // 移除 typing indicator
      typingDiv.remove();

      const aiMsgDiv = document.createElement('div');
      aiMsgDiv.className = 'message ai-message animate-fade-in';
      aiMsgDiv.innerHTML = `<div class="message-content">${formatMarkdownToHTML(replyText)}</div>`;
      chatMessages.appendChild(aiMsgDiv);
      
      scrollToBottom();

      // 觸發新手導覽聚光燈特效
      if (targetSelector && window.activateSpotlight) {
        window.activateSpotlight(targetSelector);
      }
    } catch (error) {
      console.error('AI Response Error:', error);
      typingDiv.remove();
      
      const errorMsgDiv = document.createElement('div');
      errorMsgDiv.className = 'message ai-message animate-fade-in';
      errorMsgDiv.innerHTML = `<div class="message-content">🌸 哎呀，兔子助理的思緒稍微塞車了（連線異常）。您可以先看看底下常駐的快捷按鈕，或稍後再試試看喔！</div>`;
      chatMessages.appendChild(errorMsgDiv);
      scrollToBottom();
    }
  }

  // 發送按鈕點擊
  sendBtn.addEventListener('click', () => {
    sendMessage(chatInput.value);
  });

  // Enter 鍵發送
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(chatInput.value);
    }
  });

  // 4. 快捷按鈕點擊
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      if (question) {
        sendMessage(question);
      }
    });
  });

  // 輔助函式：防 XSS 轉義
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 輔助函式：平滑滾動至底
  function scrollToBottom() {
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  }
}
