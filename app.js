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
});

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
      
      const badgeHTML = p.badge 
        ? `<img src="${p.badge}" alt="時令推薦" class="card-badge">` 
        : '';

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
      if (cart.length === 0) {
        alert('您的茶袋還是空的呢，快去商品區挑選精緻和菓子吧！');
        return;
      }
      alert('「饈菓子」感謝您的支持！已成功為您保留手作訂單名額，客服狐 Bobo 將盡快與您聯繫安排配送。');
      cart = [];
      updateCartUI();
      drawer.classList.remove('active');
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
