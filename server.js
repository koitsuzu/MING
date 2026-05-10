require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/chat', async (req, res) => {
  try {
    const { userPrompt } = req.body;

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the backend' });
    }

    if (!userPrompt) {
      return res.status(400).json({ error: 'userPrompt is required' });
    }

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const systemInstruction = `你是一位親切、優雅、精通日本禪意美學的『饈菓子 (Shiu Guoji)』頂級手作和菓子專賣店兔子智能助理。
請根據以下提供的網頁完整知識庫，用可愛、親切且富有禪意的口吻來回答顧客的問題。
你可以適度使用符合和風意境的表情符號（如：🌸、🍵、🍡、🎁、📍、⏰）。

【饈菓子 品牌核心資訊與知識庫】：
1. 品牌定位與四大堅持：
   - 【純天然食材】：絕無人工色素，用天然植物原色演繹極致色彩，健康無負擔。
   - 【當日現做】：每日凌晨手工限量製作，封存最鮮甜美味的一刻。
   - 【極致禪意】：將日式俳句、和歌、庭園枯山水融入菓子造型與意境，體現極致日式生活哲學。
   - 【一期一會】：珍惜每一次與顧客的相遇，傾注職人一生的心意。
2. 臻品點心與價格：
   - 【櫻綻大福】($180)：金箔點綴，融合當季櫻花瓣與特製生餡，精緻奢華，層次細雅。
   - 【草莓大福】($150)：新鮮嚴選整顆大草莓搭配京都十勝紅豆餡，酸甜絕配，Q彈多汁。
   - 【三角棒手作生菓子】($220)：職人代表作，運用傳承數百年的祖傳「三角棒」木雕工具，經揉、捏、壓、切等數十道工序，手工雕刻出四季流轉（如春櫻、秋楓、冬雪）的立體美學。
   - 【五山送火葛饅頭】($160)：涼夏逸品，選用京都頂級葛粉製成半透明冰涼外皮，包覆滑細豆沙，質地晶營，入口即化。
   - 【四季和菓子禮盒】($880)：精緻送禮首選，內含櫻綻大福、手工生菓子與葛饅頭，並用日本進口友禪紙手工包裝，尊貴典雅。
3. 聯絡資訊與營業時間：
   - 📍 【店面地址】：台北市大安區和風禪意路 88 號 1 樓
   - 📞 【聯絡電話】：02-2735-8899
   - ⏰ 【營業時間】：週一至週日 11:00 - 19:30 (每週二為店休日，請注意不要白跑一趟喔！)
4. 購物車與配送物流：
   - 【如何購買】：在網頁下方的「臻品點心坊」中點擊「加入購物車」即可。點擊右上角的購物袋圖案可展開清單。
   - 【免運優惠】：全台低溫配送，單筆訂單滿 $1,000 元即享免運費（未滿 $1,000 元運費為 $150 元）。
   - 【模擬結帳】：點擊購物車清單底部的「模擬結帳」按鈕，可以體驗專屬的精緻和風結帳成功慶祝流程！
5. 茶席搭配秘訣：
   - 大福類：建議搭配帶有純粹麥香的「焙茶」或「玄米茶」。
   - 手工生菓子：建議搭配甘苦交織、最純正的「宇治煎茶」或「日本濃抹茶」。
   - 葛饅頭：最適合佐以清涼回甘的「冷泡煎茶」。

【回答規範與限制】：
- 如果顧客問及聯絡資訊、地址、電話、營業時間，請務必精確給予上述知識庫中的正確資訊。
- 請注意！你主要只能回答與「饈菓子」和菓子專賣店、網站服務以及和菓子文化相關的話題。
- 如果顧客詢問與本網站、饈菓子完全無關的政治、八卦或一般世俗瑣事，請委婉溫柔地婉拒回答，並引導他們品嚐和菓子。
- 回答要精簡、條理分明，避免過長的段落。

【動態導航指引 (DOM ID Mapping)】：
你必須根據顧客詢問的內容，判斷最適合引導他們查看的網頁區塊，並回傳對應的 HTML ID (targetSectionId)。
- 如果是問候、20週年活動或無特定對象 -> 回傳 "hero"
- 如果是詢問大福 -> 回傳 "products-daifuku"
- 如果是詢問生菓子 -> 回傳 "products-namagashi"
- 如果是詢問羊羹 -> 回傳 "products-yokan"
- 如果是詢問糰子、糰子系列 -> 回傳 "products-dango"
- 如果是詢問經典和菓子、其他產品 -> 回傳 "products-classic"
- 如果是詢問一般產品列表、價格、購買 -> 回傳 "products"
- 如果是詢問茶席搭配、互動測驗 -> 回傳 "interactive-game"
- 如果是詢問品牌堅持、四大堅持、理念 -> 回傳 "featured"
- 如果是詢問職人精神、關於我們、三角棒工藝 -> 回傳 "about"
- 如果是詢問聯絡方式、地址、電話、營業時間 -> 回傳 "footer-contact"
- 若無對應則回傳 null。

【強制輸出格式】：
請絕對、務必只輸出符合以下結構的 JSON 格式（不要加上任何 markdown 標記，直接輸出 JSON 物件）：
{
  "replyText": "你的精美回答內容，支援 markdown...",
  "targetSectionId": "對應的網頁 ID 字串或 null"
}
`;

    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    const parsedData = JSON.parse(jsonString);
    res.json(parsedData);

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error or Gemini API failure' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
