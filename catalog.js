/* ============================================================================
   TAFRA — ملف البيانات الوحيد (window.TAFRA)
   كل حاجة هنا تقدر تعدّلها من غير ما تلمس الكود:
   • رقم الواتساب + الإيميل
   • المجموعات (Collections)
   • المنتجات: سطر لكل منتج. عشان تضيف منتج جديد انسخ سطر وغيّر القيم.
     price: null  →  يبان "السعر عند الطلب"
     sizes: []    →  مفيش اختيار مقاس. اكتب ['S','M','L'] عشان يظهر
     img          →  المسار من جذر الموقع (من غير / في الأول، عشان GitHub Pages)
   ========================================================================== */
window.TAFRA = {
  brand: {
    name: 'TAFRA',
    whatsapp: '201280090726',
    email: 'mtzm2225@gmail.com',
    instagram: '',
    /* مفتاح النشر (publishable) بتاع مشروع الرسائل — ده مفتاح علني،
       والصلاحيات كلها متأمنة جوه دوال Supabase. */
    supabaseUrl: 'https://ppihzxabbysozbdmweje.supabase.co',
    supabaseKey: 'sb_publishable_7Re-MNRopMsOjopgV2YNjg_fN0yUDiL'
  },

  collections: [
    { id: 'oversized', ar: 'أوفرسايز', en: 'Oversized', ar_desc: 'قصّة واسعة وقماش تقيل', en_desc: 'Relaxed cut, heavy cotton', img: 'img/set-hoodie-tees.jpeg' },
    { id: 'essentials', ar: 'الأساسيات', en: 'Essentials', ar_desc: 'قطع يومية بشعار TF', en_desc: 'Everyday pieces with the TF mark', img: 'img/branding-set-a.jpeg' },
    { id: 'fragrance', ar: 'العطور', en: 'Fragrance', ar_desc: 'TAFRA Le Parfum', en_desc: 'TAFRA Le Parfum', img: 'img/gift-set-box.jpeg' },
    { id: 'gifts', ar: 'أطقم الهدايا', en: 'Gift Sets', ar_desc: 'علبة وتغليف جاهز للإهداء', en_desc: 'Boxed and wrapped to gift', img: 'img/bags-display.jpeg' }
  ],

  products: [
    {
      id: 'TF-001', cat: 'essentials', img: 'img/set-hoodie-tees.jpeg',
      ar: { name: 'هودي TAFRA الأسود', desc: 'هودي بقصة مريحة وتطريز TF على الصدر، مع تي شيرتات المجموعة.' },
      en: { name: 'TAFRA Black Hoodie', desc: 'Relaxed-fit hoodie with the embroidered TF mark, shown with the tee set.' },
      colors: ['black', 'white', 'grey'], sizes: [], price: null, soon: true
    },
    {
      id: 'TF-002', cat: 'fragrance', img: 'img/gift-set-box.jpeg',
      ar: { name: 'عطر TAFRA Le Parfum', desc: 'زجاجة العطر الرسمية من TAFRA مع علبة سوداء بتذهيب ذهبي.' },
      en: { name: 'TAFRA Le Parfum', desc: 'The signature TAFRA fragrance in a black and gold flacon.' },
      colors: [], sizes: [], price: null, soon: true
    },
    {
      id: 'TF-003', cat: 'gifts', img: 'img/gift-set-box.jpeg',
      ar: { name: 'طقم الهدية الكامل', desc: 'ربطة عنق + محفظة جلدية + إكسسوارات معدنية في علبة TAFRA.' },
      en: { name: 'The Full Gift Set', desc: 'Tie, leather wallet and metal accessories inside the TAFRA box.' },
      colors: [], sizes: [], price: null, soon: true
    },
    {
      id: 'TF-004', cat: 'essentials', img: 'img/hangtag-a.jpeg',
      ar: { name: 'ملصقات وتغليف TAFRA', desc: 'التغليف الرسمي: كيس أسود، كارت إهداء وtag مذهب.' },
      en: { name: 'TAFRA Packaging Kit', desc: 'Official packaging: black bag, gift card and gold-foil hangtag.' },
      colors: [], sizes: [], price: null, soon: true
    }
  ]
};
