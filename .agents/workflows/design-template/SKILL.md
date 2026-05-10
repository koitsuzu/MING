---
name: design-system-shiu-guoji
description: 建立饈菓子（Shiu Guoji）頂級手作和菓子專賣店的設計系統規格，包含元件行為、色彩權杖、排版、無障礙標準與產品影像路徑，適用於高品質電商與品牌互動體驗。
---

<!-- TYPEUI_SH_MANAGED_START -->

# 饈菓子｜頂級手作和菓子、日式四季點心與禮盒專賣店

## 品牌使命 (Mission)
為「饈菓子」打造頂級、充滿禪意且兼具現代極簡美學（Wabi-sabi）的電商與品牌互動設計系統，提供顧客如同親臨京都茶席般的精緻數位體驗，將四季之美完美融入每一次線上點擊。

## 品牌定位 (Brand)
- **品牌名稱**：饈菓子｜頂級手作和菓子專賣店 (Shiu Guoji Premium Wagashi)
- **品牌理念**：「珍饈美饌，四季流轉」— 以極致手藝與時令食材，展現日式和菓子的美學極限。
- **目標受眾**：頂級送禮需求者、和菓子愛好者、日式茶道與傳統文化追求者、精緻生活品味人士。
- **品牌介面**：頂級品牌電商前台、互動茶席體驗、四季點心導覽。

## 視覺風格與基礎系統 (Style Foundations)
- **視覺風格**：優雅奢華、和風禪意、溫潤極簡、高對比的職人細節、微秒級流暢轉場。
- **字體設定**：
  - **標題與形象字體**：`font.family.primary="Noto Serif TC"` (思源宋體 - 展現人文溫度與古典美感)
  - **內文字體**：`font.family.secondary="Noto Sans TC", sans-serif` (思源黑體 - 確保現代清晰度)
  - **基礎字型大小**：`font.size.base=15px` | `font.weight.base=400` | `font.lineHeight.base=1.6`
- **排版字級**：
  - `font.size.xs=12px` (極細備註)
  - `font.size.sm=14px` (副文字/商品規格)
  - `font.size.md=15px` (一般內文/操作標籤)
  - `font.size.lg=18px` (商品標題/小標)
  - `font.size.xl=24px` (中標題/區塊標題)
  - `font.size.2xl=32px` (大標題/輪播標題)
  - `font.size.3xl=40px` (主視覺標題/首頁 Hero)
  - `font.size.4xl=56px` (品牌巨幅標籤)
- **色彩權杖 (Color Palette - 和風雅致配色)**：
  - `color.text.primary=#2A2A2A` (墨黑 Sumi-iro — 核心文字，傳達職人穩重感)
  - `color.text.secondary=#8C2D38` (小豆紅 Azuki-iro — 品牌核心強調色，源自紅豆餡的溫潤)
  - `color.text.muted=#7F8285` (薄墨鼠 Usuzumi — 次要說明文字)
  - `color.surface.base=#FAFAF8` (粉雪白 Konayuki — 網頁背景，純淨無瑕)
  - `color.surface.muted=#F5F2EB` (和紙色 Washi-iro — 卡片與次要背景，溫暖沙質)
  - `color.surface.raised=#8C2D38` (小豆紅 Azuki-iro — 主按鈕、重要引導、焦點卡片)
  - `color.surface.strong=#D49B41` (栗金茶 Kuri-kancha — 次要主色，代表栗子與黃金秋季，用於限時推薦、精選標籤)
  - `color.surface.accent=#7A9A60` (抹茶綠 Matcha-iro — 特色裝飾色，帶出茶道雅緻)
- **間距權杖 (Spacing Scale - 精緻黃金比例)**：
  - `space.1=4px` | `space.2=8px` | `space.3=12px` | `space.4=16px` | `space.5=24px` | `space.6=32px` | `space.7=48px` | `space.8=64px`
- **圓角/陰影/動態權杖**：
  - **微小圓角**：`radius.xs=4px` (用於按鈕、精緻標籤)
  - **商品卡片圓角**：`radius.sm=12px` (符合和菓子精緻造型)
  - **滿圓角**：`radius.full=999px` (用於大福、糰子意象的徽章或圓形商品鈕)
  - **溫潤禪意陰影**：`shadow.1=0 10px 30px rgba(140, 45, 56, 0.05)` (融入品牌小豆紅的極淡擴散陰影)
  - **微互動過渡**：`motion.duration.smooth=400ms` (貝茲曲線 `cubic-bezier(0.25, 1, 0.5, 1)` 實現如水般流暢的展開與淡入)

---

## 產品系列與影像資源對應 (Product Series & Image Assets)
為確保介面呈現完美，「饈菓子」所有商品卡片與視覺看板必須嚴格對應以下影像資源：

### 1. 品牌首頁與背景素材 (Brand Home & Banner)
- **首頁主橫幅 (Hero Banner)**：
  - `image/品牌與背景/主視覺_四季橫幅.png` (用於首頁頂部巨幕，展示四季自然美學)
  - `image/品牌與背景/輪播_20週年紀念.jpg` (20週年紀念限定活動輪播)
  - `image/品牌與背景/輪播_職人工藝.jpg` (職人手作深度故事看板)
  - `image/品牌與背景/輪播_大福花皿.jpg` (熱銷主打大福視覺)
- **品牌形象展示**：
  - `image/品牌與背景/品牌形象_和菓子茶席.png` (關於我們/茶席文化專區)
  - `image/品牌與背景/品牌形象_職人手作.jpg` (職人精神與原料堅持介紹)
- **招牌主視覺**：
  - `image/品牌與背景/品牌招牌_梅花.jpg`
  - `image/品牌與背景/主視覺_禮盒包裝.png` (禮盒客製化專區背景)

### 2. 五大經典和菓子系列卡片 (Five Core Product Lines)
每款商品卡片必須展示高解析產品照、精緻標籤，並套用 `radius.sm`：
- **生菓子系列 (Namagashi - 頂級四季工藝)**：
  - 系列看板：`image/生菓子產品圖/hero_namagashi.png`
  - 核心展示：`image/生菓子產品圖/namagashi.png`
  - 產品陣容：`p1.jpg` 至 `p9.jpg` (包含櫻綻、松風、翠竹等四季意象生菓子)
- **羊羹系列 (Yokan - 晶瑩剔透凝脂)**：
  - 系列看板：`image/羊羹產品圖/hero_yokan.png`
  - 核心展示：`image/羊羹產品圖/yokan.png`
  - 產品陣容：`y1.jpg` 至 `y9.jpg` (包含栗子羊羹、抹茶羊羹、紅豆羊羹等)
- **大福系列 (Daifuku - Q彈爆餡經典)**：
  - 產品陣容：`image/大福產品圖/d1.jpg` 至 `d6.jpg` (草莓大福、草餅大福、黑糖大福等)
- **團子系列 (Dango - 日式街頭經典)**：
  - 核心展示：`image/團子產品圖/dango.png`
  - 產品陣容：`01.jpg`、`d7.jpg`、`d8.jpg`、`d9.jpg`、`d10.jpg` (含彩色三色糰子、醬油糰子、小熊可愛糰子等)
- **經典和菓子 (Wagashi Classic)**：
  - 產品陣容：`image/和菓子系列圖/w1.jpg` 至 `w6.jpg` (含綜合茶點、中秋和菓子等)

### 3. 精選徽章與品牌裝飾 (UI Elements & Decor)
- **裝飾動態元素**：
  - `image/背景與裝飾/sakura_petal.png` & `sakura_petal_transparent.png` (首頁櫻花落雨特效，使用 CSS keyframe 慢速漂落)
  - `image/背景與裝飾/flower1.png` & `flower2.png` (角落雅致點綴)
- **互動問答與吉祥物 (Kitsune Mascot)**：
  - 吉祥物小狐狸：`image/互動與問答/bo1.png` (開心引導)、`bo2.png` (疑問/說明)、`bobo.png` (常駐側邊客服)、`do1.png` (結帳引導)
- **精選與熱銷徽章**：
  - 推薦區標題：`image/推薦與精選/best.png`
  - 質感徽章：`best1.png` 至 `best5.png` (用於代表「職人手作」、「極致限量」、「時令定番」等標章)
  - 特色問答引導：`q1.png` 至 `q5.png` (茶道配對問答、送禮指南)

---

## 元件級設計規範與狀態 (Component Specifications)

### 1. 頂級導航欄 (The Imperial Navigation Bar)
- **結構結構 (Anatomy)**：
  - 左側：品牌 Logo (`image/介面與圖示/logo.png`)，高度必須固定為 `44px`。
  - 中央：產品系列選單 (生菓子、羊羹、大福、團子、客製禮盒)。
  - 右側：搜尋鈕 (`search2.png`)、會員中心、購物袋 (`bag.png` 帶有小豆紅紅點計數器)。
- **元件狀態 (States)**：
  - **預設 (Default)**：背景為半透明粉雪白 `rgba(250, 250, 248, 0.85)`，帶有 `backdrop-filter: blur(12px)`。
  - **滑過選單 (Hover)**：字體顏色由 `color.text.primary` 流暢轉為 `color.text.secondary` (小豆紅)，下方浮現 `2px` 寬的抹茶綠底線。
  - **向下滾動 (Scrolled)**：背景轉為純白，並帶有極淡的溫潤禪意陰影 `shadow.1`。

### 2. 臻品商品卡片 (Premium Product Card)
- **結構結構 (Anatomy)**：
  - 頂部：商品影像容器，長寬比為 `1:1`，背襯淺和紙色 `color.surface.muted` 以襯托商品的高雅。右上角帶有時令徽章（如 `best2.png`）。
  - 中部：商品品名 (Noto Serif TC, 字重 600)、簡短俳句般的美食介紹 (Noto Sans TC, 字級 `sm`, 薄墨鼠色)。
  - 底部：價格、快速加入購物袋按鈕 (圓形，滿圓角 `radius.full`，內嵌購物袋圖示)。
- **微互動 (Micro-animations)**：
  - **滑過卡片 (Hover)**：卡片微幅上浮 `4px`，陰影擴散，產品影像微幅放大 `5%` (`transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)`)。快速購物鈕轉為 `color.surface.strong` (栗金茶)。

### 3. 「饈」主動態按鈕 (CTA Button)
- **結構結構 (Anatomy)**：
  - 滿版按鈕，套用 `radius.xs` (4px)，展現俐落現代感。
- **元件狀態 (States)**：
  - **預設**：背景 `color.surface.raised` (小豆紅)，文字為粉雪白，字重 500。
  - **滑過 (Hover)**：背景轉為 `color.surface.strong` (栗金茶)，寬度微幅伸展 `4px`，帶有流動金色光暈特效。
  - **聚焦 (Focus-visible)**：浮現 `2px` 的抹茶綠聚焦框 (`outline: 2px solid #7A9A60`, `outline-offset: 2px`)。
  - **停用 (Disabled)**：背景轉為淡灰色，文字為中灰色，指針變為不可點擊。

---

## 無障礙設計標準 (Accessibility - WCAG 2.2 AA)
- **色彩對比**：所有文字與其底色之間的對比度必須大於 `4.5:1`。在粉雪白背景上，主要文字必須使用 `#2A2A2A`，小豆紅強調色必須確保在淺色底上有足夠可讀性。
- **鍵盤瀏覽**：所有商品卡片與按鈕必須能透過 `TAB` 鍵選取，選取時必須有清晰的抹茶綠 (`#7A9A60`) 聚焦環，絕不允許隱藏 focus indicator。
- **替代文字 (Alt Text)**：所有產品圖片必須帶有具體描述，例如：`alt="饈菓子 - 櫻綻生菓子，揉合櫻葉香氣與細緻白豆沙"`，而非模糊的 `alt="p1.jpg"`。

---

## 品牌語調與內容標準 (Brand Tone & Copywriting)
- **寫作語調**：高雅、沉靜、富含詩意與溫度、極具職人專業度。
- **行銷用語範例**：
  - *不可*："買大福，好吃又便宜，多買多打折！" (過於廉價通俗)
  - *必須*："精選十勝紅豆與細緻白糯米，由職人手作揉製，將四季之美凝聚於一品溫潤大福中。" (傳遞精緻感)

---

## 避用設計與反模式 (Anti-patterns)
- **禁止使用**：尖銳生硬的純紅、純綠或純藍色（必須使用精緻調和的小豆紅與抹茶綠）。
- **禁止使用**：無聚焦環的鍵盤狀態、生硬且無過渡的 Hover 效果。
- **禁止使用**：直接暴露 `/image/` 底下的原始檔名，所有商品顯示名稱必須為優雅的中文命名。

---

## 最終設計品質驗收清單 (QA Checklist)
- [ ] 所有的顏色皆套用 `color.*` 語義權杖，無直接使用 Hex Code。
- [ ] 字體嚴格落實 `Noto Serif TC`（用於大標題、品名）與 `Noto Sans TC`（用於內文）的雙字體搭配。
- [ ] 商品卡片、首頁 Banner 與背景元件皆已正確對應 `image/` 底下的實體產品相片。
- [ ] 所有按鈕與連結均已具備 Hover、Focus-visible、Active 等 7 種必備狀態。
- [ ] 網頁整體對比度與鍵盤操作完全符合 WCAG 2.2 AA 標準。

<!-- TYPEUI_SH_MANAGED_END -->
