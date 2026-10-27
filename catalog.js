/* ============================================================================
   TAFRA — ملف البيانات الوحيد (window.TAFRA)
   كل حاجة تتعدّل من هنا من غير ما تلمس الكود.

   ⚠️  الأسعار والمقاسات والأقماش دي قيم مبدئية مكتوبة من غير ما أشوف
       المنتجات الحقيقية — راجعها وعدّلها قبل ما تفتح الطلبات فعليًا.
       كل منتج سطر واحد: price بالجينه، sizes فاضي [] = ملوش مقاسات.
   ========================================================================== */
window.TAFRA = {
  brand: {
    name: 'TAFRA',
    whatsapp: '201280090726',
    email: 'mtzm2225@gmail.com',
    instagram: '',
    /* الشحن (جنيه) — عدّل الأرقام حسب شركة الشحن بتاعتك */
    shipping: { cairo: 45, governorates: 70, freeOver: 1500 },
    /* مفتاح النشر (publishable) بتاع صندوق الرسائل — مفتاح علني بالتصميم،
       والصلاحيات كلها متأمنة جوه دوال Supabase. */
    supabaseUrl: 'https://ppihzxabbysozbdmweje.supabase.co',
    supabaseKey: 'sb_publishable_7Re-MNRopMsOjopgV2YNjg_fN0yUDiL'
  },

  collections: [
    { id: 'oversized',  ar: 'أوفرسايز',        en: 'Oversized',    ar_desc: 'قصّة واسعة وقماش تقيل',      en_desc: 'Relaxed cut, heavy cotton',    img: 'img/set-hoodie-tees.jpeg' },
    { id: 'hoodies',    ar: 'هوديز وسويتات',   en: 'Hoodies',      ar_desc: 'تطريز TF ودفا للشتا',       en_desc: 'Embroidered TF, winter weight', img: 'img/branding-set-a.jpeg' },
    { id: 'bottoms',    ar: 'بناطيل',          en: 'Bottoms',      ar_desc: 'كارجو وقصة مستقيمة',        en_desc: 'Cargo and straight fits',      img: 'img/bags-display.jpeg' },
    { id: 'accessories',ar: 'إكسسوارات',       en: 'Accessories',  ar_desc: 'كاب، سلسلة، محفظة وتوت',    en_desc: 'Cap, chain, wallet and tote',  img: 'img/hangtag-a.jpeg' },
    { id: 'fragrance',  ar: 'العطور',          en: 'Fragrance',    ar_desc: 'TAFRA Le Parfum',           en_desc: 'TAFRA Le Parfum',              img: 'img/gift-set-box.jpeg' },
    { id: 'gifts',      ar: 'أطقم الهدايا',    en: 'Gift Sets',    ar_desc: 'علبة وتغليف جاهز للإهداء',  en_desc: 'Boxed and wrapped to gift',    img: 'img/boutique-interior.jpeg' }
  ],

  products: [
    /* ---------- أوفرسايز ---------- */
    { id: 'TF-101', cat: 'oversized', img: 'img/art/tee-black.svg', tag: 'best', price: 520, oldPrice: null,
      colors: ['black'], sizes: ['S', 'M', 'L', 'XL', '2XL'], stock: 12,
      ar: { name: 'تي شيرت أوفرسايز أسود', desc: 'قطن تقيل بكتاف منسدلة وتطريز TF ذهبي على الصدر.', fabric: 'قطن ١٠٠٪ — ٢٤٠ جرام' },
      en: { name: 'Oversized Black Tee', desc: 'Heavy cotton, drop shoulder and a gold embroidered TF at the chest.', fabric: '100% cotton — 240 gsm' } },

    { id: 'TF-102', cat: 'oversized', img: 'img/art/tee-white.svg', tag: 'new', price: 520, oldPrice: null,
      colors: ['white'], sizes: ['S', 'M', 'L', 'XL', '2XL'], stock: 10,
      ar: { name: 'تي شيرت أوفرسايز أبيض', desc: 'نفس القصّة الواسعة بلون أبيض سادة وشعار TF أسود.', fabric: 'قطن ١٠٠٪ — ٢٤٠ جرام' },
      en: { name: 'Oversized White Tee', desc: 'The same relaxed cut in clean white with a black TF mark.', fabric: '100% cotton — 240 gsm' } },

    { id: 'TF-103', cat: 'oversized', img: 'img/art/tee-grey.svg', tag: null, price: 490, oldPrice: null,
      colors: ['grey'], sizes: ['S', 'M', 'L', 'XL'], stock: 8,
      ar: { name: 'تي شيرت أوفرسايز رمادي', desc: 'رمادي فاتح بياخد أي لون فوقه، وشعار TF مطرّز.', fabric: 'قطن ١٠٠٪ — ٢٢٠ جرام' },
      en: { name: 'Oversized Grey Tee', desc: 'Light grey that goes with everything, embroidered TF mark.', fabric: '100% cotton — 220 gsm' } },

    /* ---------- هوديز وسويتات ---------- */
    { id: 'TF-104', cat: 'hoodies', img: 'img/art/hoodie-black.svg', tag: 'best', price: 1250, oldPrice: null,
      colors: ['black'], sizes: ['S', 'M', 'L', 'XL', '2XL'], stock: 6,
      ar: { name: 'هودي TAFRA الأسود', desc: 'هودي بغطاء رأس وجيب أمامي وتطريز TF على الصدر.', fabric: '٨٠٪ قطن ٢٠٪ بوليستر — ٣٢٠ جرام' },
      en: { name: 'TAFRA Black Hoodie', desc: 'Hooded, kangaroo pocket, embroidered TF on the chest.', fabric: '80% cotton 20% polyester — 320 gsm' } },

    { id: 'TF-105', cat: 'hoodies', img: 'img/art/sweat-grey.svg', tag: null, price: 1150, oldPrice: null,
      colors: ['grey'], sizes: ['S', 'M', 'L', 'XL'], stock: 7,
      ar: { name: 'سويت شيرت رمادي', desc: 'ياقة دائرية وأساور مضلّعة، شعار TF صغير على الصدر.', fabric: '٨٠٪ قطن ٢٠٪ بوليستر — ٣٠٠ جرام' },
      en: { name: 'Grey Crewneck Sweat', desc: 'Ribbed crew and cuffs with a small TF mark.', fabric: '80% cotton 20% polyester — 300 gsm' } },

    { id: 'TF-106', cat: 'hoodies', img: 'img/art/longsleeve-black.svg', tag: 'new', price: 690, oldPrice: null,
      colors: ['black'], sizes: ['S', 'M', 'L', 'XL', '2XL'], stock: 14,
      ar: { name: 'لونج سليڤ أسود', desc: 'أكمام طويلة وقصّة مريحة، ينفع تحت الهودي أو لوحده.', fabric: 'قطن ١٠٠٪ — ٢٠٠ جرام' },
      en: { name: 'Black Long Sleeve', desc: 'Comfortable cut with long sleeves — layer it or wear it alone.', fabric: '100% cotton — 200 gsm' } },

    /* ---------- بناطيل ---------- */
    { id: 'TF-107', cat: 'bottoms', img: 'img/art/cargo-beige.svg', tag: 'best', price: 980, oldPrice: null,
      colors: ['beige'], sizes: ['30', '32', '34', '36'], stock: 5,
      ar: { name: 'بنطلون كارجو بيج', desc: 'جيوب جانبية بأزرار، خصر مطاطي ورباط، وقصة مريحة.', fabric: 'تويل قطن — ٢٨٠ جرام' },
      en: { name: 'Beige Cargo Pants', desc: 'Snap-flap side pockets, elastic drawcord waist, relaxed leg.', fabric: 'Cotton twill — 280 gsm' } },

    { id: 'TF-108', cat: 'bottoms', img: 'img/art/pants-black.svg', tag: null, price: 890, oldPrice: null,
      colors: ['black'], sizes: ['30', '32', '34', '36'], stock: 9,
      ar: { name: 'بنطلون مستقيم أسود', desc: 'قصة مستقيمة نظيفة تنفع مع الأوفرسايز والرسمي الخفيف.', fabric: 'قطن مخلّط بتماسك' },
      en: { name: 'Straight Black Trouser', desc: 'Clean straight leg that works with oversized tops and smart-casual.', fabric: 'Cotton blend' } },

    /* ---------- إكسسوارات ---------- */
    { id: 'TF-109', cat: 'accessories', img: 'img/art/cap-black.svg', tag: null, price: 380, oldPrice: null,
      colors: ['black'], sizes: [], stock: 20,
      ar: { name: 'كاب TAFRA أسود', desc: 'كاب قطن بحزام خلفي معدني وشعار TF مطرّز.', fabric: 'قطن — مقاس قابل للتعديل' },
      en: { name: 'TAFRA Black Cap', desc: 'Cotton cap with metal slider and embroidered TF.', fabric: 'Cotton — adjustable' } },

    { id: 'TF-110', cat: 'accessories', img: 'img/art/tote.svg', tag: null, price: 320, oldPrice: null,
      colors: ['natural'], sizes: [], stock: 25,
      ar: { name: 'شنطة قماش TAFRA', desc: 'توت كنداس بقماش سميك وطباعة TF بالذهبي.', fabric: 'كانفس ١٢ أونصة' },
      en: { name: 'TAFRA Canvas Tote', desc: 'Thick canvas tote with the TF print in gold.', fabric: '12 oz canvas' } },

    { id: 'TF-111', cat: 'accessories', img: 'img/art/chain.svg', tag: 'new', price: 450, oldPrice: null,
      colors: ['gold'], sizes: [], stock: 11,
      ar: { name: 'سلسلة TF', desc: 'سلسلة ستانلس ستيل بطلاء ذهبي ودلاية بشعار TAFRA.', fabric: 'ستانلس ستيل مطلي ذهبي' },
      en: { name: 'TF Chain', desc: 'Gold-plated stainless chain with the TAFRA pendant.', fabric: 'Gold-plated stainless steel' } },

    { id: 'TF-112', cat: 'accessories', img: 'img/art/wallet.svg', tag: null, price: 780, oldPrice: null,
      colors: ['black'], sizes: [], stock: 6,
      ar: { name: 'محفظة جلد TAFRA', desc: 'محفظة جلد بخياطة ذهبية وثمانية فتحات كروت.', fabric: 'جلد صناعي ممتاز' },
      en: { name: 'TAFRA Leather Wallet', desc: 'Wallet with gold stitching and eight card slots.', fabric: 'Premium leather' } },

    /* ---------- عطور ---------- */
    { id: 'TF-113', cat: 'fragrance', img: 'img/art/perfume.svg', tag: 'best', price: 1450, oldPrice: null,
      colors: [], sizes: ['50 ml'], stock: 8,
      ar: { name: 'TAFRA Le Parfum — ٥٠ مل', desc: 'زجاجة سوداء بغطاء ذهبي، رائحة خشبية دافئة تدوم.', fabric: 'أو دو بارفان — تركيز ١٨٪' },
      en: { name: 'TAFRA Le Parfum — 50 ml', desc: 'Black flacon, gold cap — a warm woody signature with real staying power.', fabric: 'Eau de parfum — 18% concentration' } },

    { id: 'TF-114', cat: 'fragrance', img: 'img/art/perfume.svg', tag: null, price: 2100, oldPrice: null,
      colors: [], sizes: ['100 ml'], stock: 4,
      ar: { name: 'TAFRA Le Parfum — ١٠٠ مل', desc: 'نفس الرائحة في حجم أكبر، في علبة TAFRA السوداء.', fabric: 'أو دو بارفان — تركيز ١٨٪' },
      en: { name: 'TAFRA Le Parfum — 100 ml', desc: 'The same signature in a larger flacon, boxed in black.', fabric: 'Eau de parfum — 18% concentration' } },

    /* ---------- أطقم الهدايا ---------- */
    { id: 'TF-115', cat: 'gifts', img: 'img/art/giftbox.svg', tag: 'best', price: 2400, oldPrice: null,
      colors: [], sizes: [], stock: 3,
      ar: { name: 'طقم الهدية الكامل', desc: 'ربطة عنق + محفظة + إكسسوار معدني داخل علبة TAFRA السوداء.', fabric: 'علبة مخمل + كارت إهداء' },
      en: { name: 'The Full Gift Set', desc: 'Tie, wallet and metal accessory inside the black TAFRA box.', fabric: 'Velvet box + gift card' } },

    { id: 'TF-116', cat: 'gifts', img: 'img/gift-set-box.jpeg', tag: 'new', price: 2600, oldPrice: null,
      colors: [], sizes: [], stock: 3,
      ar: { name: 'صندوق الهدية المخصّص', desc: 'اختار القطع بنفسك وأنا نغلّفها في صندوق TAFRA مع كارت باسمك.', fabric: 'تغليف إهداء + كارت مكتوب' },
      en: { name: 'Build-Your-Own Gift Box', desc: 'Pick the pieces, we box them in a TAFRA gift box with a card in your name.', fabric: 'Gift wrap + handwritten card' } }
  ],

  /* جدول المقاسات بالسنتيمتر (قياس تقريبي للقصّة الواسعة) */
  sizeGuide: [
    { size: 'S',   chest: '112', length: '68', sleeve: '22' },
    { size: 'M',   chest: '116', length: '70', sleeve: '23' },
    { size: 'L',   chest: '122', length: '72', sleeve: '24' },
    { size: 'XL',  chest: '128', length: '74', sleeve: '25' },
    { size: '2XL', chest: '134', length: '76', sleeve: '26' }
  ],

  faqs: [
    { ar: { q: 'أطلب إزاي؟', a: 'اختار القطع، حطها في الأوردر، ودوس «أرسل على واتساب» — هتفتح رسالة جاهزة بكل التفاصيل، ونتفق على المقاس والعنوان.' },
      en: { q: 'How do I order?', a: 'Pick your pieces, add them to the order and tap "Send on WhatsApp" — a ready message opens with every detail, then we confirm size and address.' } },
    { ar: { q: 'الحساب قبل الشحن ولا بعده؟', a: 'التأكيد بيتم على واتساب، والدفع عند الاستلام في معظم المحافظات.' },
      en: { q: 'Pay before or after shipping?', a: 'We confirm on WhatsApp, and payment on delivery is available in most governorates.' } },
    { ar: { q: 'المقاس طلع مش مظبوط؟', a: 'التبديل متاح خلال ٤٨ ساعة من الاستلام بشرط التغليف الأصلي.' },
      en: { q: 'Wrong size?', a: 'Exchanges are open for 48 hours after delivery, original packaging intact.' } },
    { ar: { q: 'التغليف جهّاز للإهداء؟', a: 'أيوه — كل طلب بيجي في كيس وعلبة TAFRA، وقولنا على واتساب نكتب كارت الإهداء باسمك.' },
      en: { q: 'Is it gift-ready?', a: 'Yes — every order ships in a TAFRA bag and box, and we will write the card if you tell us on WhatsApp.' } }
  ]
};
