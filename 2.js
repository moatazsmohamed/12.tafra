/* ============================================================================
   TAFRA — 2.js
   المنطق كله: عربي/إنجليزي، رسم المجموعات والمنتجات من catalog.js، بحث وفلترة
   وترتيب، سلة طلبات صغيرة بتتحوّل لرسالة واتساب واحدة، فورم التواصل اللي بيكتب
   في صندوق رسايل العملاء، والأسئلة الشائعة ودليل المقاسات.
   ========================================================================== */
(function () {
  'use strict';

  const DATA = window.TAFRA || { brand: {}, collections: [], products: [], faqs: [], sizeGuide: [] };
  const BRAND = DATA.brand || {};
  const PRODUCTS = DATA.products || [];
  const COLLECTIONS = DATA.collections || [];
  const $ = function (id) { return document.getElementById(id); };
  const CART_KEY = 'tafra-order';
  const LANG_KEY = 'tafra-lang';

  /* ---------------------------------------------------------------- 1. اللغة */
  const I18N = {
    ar: {
      n_home: 'الرئيسية', n_collections: 'المجموعات', n_shop: 'المتجر', n_look: 'اللك بوك',
      n_size: 'المقاسات', n_faq: 'أسئلة', n_about: 'من نحن', n_contact: 'تواصل',
      announce: 'الشحن لكل المحافظات · التأكيد على واتساب',
      order_now: 'اطلب الآن', search: 'ابحث...',
      hero_eyebrow: 'Wear your confidence',
      hero_title: 'TAFRA — من إسكندرية، بقصة حديثة',
      hero_sub: 'قطع مختارة بعناية وتغليف رسمي. اختار قطعتك واطلبها بضغطة على واتساب، ونتفق على المقاس والتوصيل.',
      hero_cta1: 'اتسوق دلوقتي', hero_cta2: 'المجموعات',
      fact_ship: 'توصيل لكل المحافظات', fact_pack: 'تغليف TAFRA رسمي', fact_order: 'التأكيد بالواتساب',
      col_title: 'مجموعات TAFRA', col_sub: 'استكشف أحدث تصميماتنا وأزياءنا الحصرية',
      best_title: 'الأكثر طلبًا', best_sub: 'القطع اللي بتخلص بسرعة',
      shop_title: 'المتجر', shop_sub: 'اضغط على أي قطعة للتفاصيل والمقاس، وضيفها لأوردرك',
      look_title: 'اللك بوك', look_sub: 'هوية TAFRA: أسود وذهبي وتغليف يتهدى',
      f_all: 'الكل', no_results: 'مفيش نتيجة للبحث ده. جرّب كلمة تانية.',
      sort_new: 'الأحدث', sort_low: 'السعر: من الأقل', sort_high: 'السعر: من الأعلى',
      tag_new: 'جديد', tag_best: 'الأكثر طلبًا', on_request: 'السعر عند الطلب', details: 'التفاصيل',
      add_order: 'ضيف للأوردر', in_order: 'اتضاف ✓', qty: 'العدد', total: 'الإجمالي',
      order: 'أوردرك', order_empty: 'الأوردر فاضي — اختار قطعة الأول.',
      clear: 'امسح الكل', checkout: 'أرسل الأوردر على واتساب',
      ship_note: 'يضاف الشحن حسب المحافظة', free_ship: 'شحن مجاني للأوردر فوق',
      style_title: 'دليل الموضة', style_sub: 'تلات ملاحظات تخلي أي قطعة TAFRA تليق عليك',
      s1_t: 'القصة الواسعة', s1_b: 'الأوفرسايز بيحب بنطلون مستقيم أو ضيق تحت، عشان التوازن يبان. لو حابب تلبسها على بعض، اختار مقاس واحد تحت.',
      s2_t: 'الأسود والذهبي', s2_b: 'هوية TAFRA لونين بس: أسود وذهبي. إكسسوار واحد ذهبي كفاية — أكتر من كده يخلي الشكل مزدحم.',
      s3_t: 'التغليف جزء من الهدية', s3_b: 'كل طلب بيجي في كيس وعلبة TAFRA. لو هتهدي، قولنا على واتساب نكتب كارت الإهداء باسمك.',
      size_title: 'دليل المقاسات', size_sub: 'القياسات بالسنتيمتر على القطعة نفسها، مش على الجسم',
      size_head: ['المقاس', 'الصدر', 'الطول', 'الكم'],
      size_note: 'القصّة واسعة بالتصميم. لو بين مقاسين، اختار الأصغر عشان الشكل يظبط.',
      faq_title: 'أسئلة بتتكرر', faq_sub: 'الطلب، الشحن، والتبديل',
      about_title: 'تفره: تراث إسكندرية، صياغة حديثة',
      about_b1: 'TAFRA اتأسست في الإسكندرية على فكرة واحدة: المدينة عندها ذوق بصري خاص — حجر قديم، بحر، وناس بتلبس بثقة. بنحوّل الحس ده في قطع معاصرة وتغليف ينفع يتهدى.',
      about_b2: 'كل قطعة بتخرج من عندنا في علبة وكيس بشعار TF المذهب، وطلبك بيتأكد عليه على واتساب قبل الشحن عشان المقاس يظبط من أول مرة.',
      about_cta: 'ابعتلنا رسالة',
      stat_pieces: 'قطعة في المجموعة', stat_shipping: 'دولرة للتوصيل', stat_since: 'من إسكندرية',
      contact_title: 'تواصل معنا', contact_sub: 'اكتب طلبك هنا وهيوصلنا على طول، أو كلّمنا على واتساب',
      f_name: 'الاسم', f_email: 'البريد الإلكتروني', f_phone: 'رقم الواتساب (اختياري)', f_message: 'رسالتك',
      f_message_ph: 'القطع اللي عجبك، المقاسات، والمدينة اللي هنتوصيل لها...', f_send: 'إرسال', sending: 'بيبعت...',
      ok_sent: 'وصلتنا رسالتك — هنرد عليك قريب.',
      err_name: 'اكتب اسمك صح (حرفين على الأقل).',
      err_email: 'البريد الإلكتروني مش شكله مظبوط.',
      err_message: 'اكتب رسالتك (٥ حروف على الأقل).',
      err_fast: 'استنى دقيقتين وابعت تاني.',
      err_busy: 'الرسايل زيادت شوية دلوقتي — كلّمنا على واتساب.',
      err_net: 'مفهمناش نبعت. اتأكد من الإنترنت أو كلّمنا على واتساب.',
      side_wa: 'واتساب', side_mail: 'بريد إلكتروني', side_city: 'الإسكندرية', side_city_sub: 'الشحن لكل المحافظات',
      footer_tag: 'Wear your confidence', footer_rights: 'كل الحقوق محفوظة', footer_help: 'الطلب والشحن',
      size_label: 'المقاس', color_label: 'اللون', fabric_label: 'الخامة', sku_label: 'كود القطعة',
      in_stock: 'متاح', low_stock: 'آخر', out_stock: 'خلصت',
      color_black: 'أسود', color_white: 'أبيض', color_grey: 'رمادي', color_gold: 'ذهبي',
      color_beige: 'بيج', color_natural: 'طبيعي',
      wa_hi: 'السلام عليكم، عايز أطلب من TAFRA:',
      wa_size: 'المقاس', wa_color: 'اللون', wa_qty: 'العدد', wa_total: 'الإجمالي',
      wa_items: 'القطع', wa_ship: 'الشحن', wa_city: 'المدينة',
      wa_city_q: 'المدينة:', wa_note: 'ملاحظة:',
      egp: 'ج.م', langBtn: 'EN', close: 'اقفل'
    },
    en: {
      n_home: 'Home', n_collections: 'Collections', n_shop: 'Shop', n_look: 'Lookbook',
      n_size: 'Sizes', n_faq: 'FAQ', n_about: 'About', n_contact: 'Contact',
      announce: 'Shipping to all governorates · confirmed on WhatsApp',
      order_now: 'Order now', search: 'Search...',
      hero_eyebrow: 'Wear your confidence',
      hero_title: 'TAFRA — born in Alexandria, cut for today',
      hero_sub: 'Carefully picked pieces in official packaging. Choose your piece and order it in one tap on WhatsApp — we confirm size and delivery.',
      hero_cta1: 'Shop now', hero_cta2: 'Collections',
      fact_ship: 'Shipping to all governorates', fact_pack: 'Official TAFRA packaging', fact_order: 'Confirmed on WhatsApp',
      col_title: 'TAFRA Collections', col_sub: 'Explore our latest designs and exclusive pieces',
      best_title: 'Best sellers', best_sub: 'The pieces that go first',
      shop_title: 'The Shop', shop_sub: 'Tap any piece for details and size, then add it to your order',
      look_title: 'Lookbook', look_sub: 'The TAFRA identity: black, gold, and packaging you can gift',
      f_all: 'All', no_results: 'Nothing matches that search. Try another word.',
      sort_new: 'Newest', sort_low: 'Price: low to high', sort_high: 'Price: high to low',
      tag_new: 'New', tag_best: 'Best seller', on_request: 'Price on request', details: 'Details',
      add_order: 'Add to order', in_order: 'Added ✓', qty: 'Qty', total: 'Total',
      order: 'Your order', order_empty: 'Your order is empty — pick a piece first.',
      clear: 'Clear all', checkout: 'Send order on WhatsApp',
      ship_note: 'Shipping added by governorate', free_ship: 'Free shipping over',
      style_title: 'Style Guide', style_sub: 'Three notes that make any TAFRA piece work for you',
      s1_t: 'The oversized cut', s1_b: 'Oversized reads best with a straight or slim trouser. If you like it stacked, go one size down.',
      s2_t: 'Black and gold', s2_b: 'TAFRA is two colours only: black and gold. One gold accessory is enough — more gets busy.',
      s3_t: 'Packaging is part of the gift', s3_b: 'Every order ships in a TAFRA bag and box. Gifting it? Tell us on WhatsApp and we write the card.',
      size_title: 'Size guide', size_sub: 'Measurements in cm taken on the garment, not the body',
      size_head: ['Size', 'Chest', 'Length', 'Sleeve'],
      size_note: 'The cut is intentionally roomy. Between two sizes, take the smaller one.',
      faq_title: 'Common questions', faq_sub: 'Ordering, shipping and exchanges',
      about_title: 'TAFRA: Alexandrian heritage, modern crafting',
      about_b1: 'TAFRA started in Alexandria on one idea: this city has its own visual taste — old stone, sea, and people who dress with confidence. We turn that into contemporary pieces and gift-ready packaging.',
      about_b2: 'Every piece leaves us in a box and bag with the gilded TF mark, and we confirm your order on WhatsApp before shipping so the size is right the first time.',
      about_cta: 'Send us a message',
      stat_pieces: 'pieces in the line', stat_shipping: 'days to deliver', stat_since: 'from Alexandria',
      contact_title: 'Get in touch', contact_sub: 'Write your request here and it reaches us directly, or message us on WhatsApp',
      f_name: 'Name', f_email: 'Email', f_phone: 'WhatsApp number (optional)', f_message: 'Your message',
      f_message_ph: 'The pieces you like, your sizes, and the city we are shipping to...', f_send: 'Send', sending: 'Sending...',
      ok_sent: 'We got your message — we will reply soon.',
      err_name: 'Please write your name (at least 2 characters).',
      err_email: 'That email address does not look right.',
      err_message: 'Please write your message (at least 5 characters).',
      err_fast: 'Wait two minutes and send again.',
      err_busy: 'We are getting a lot of messages right now — reach us on WhatsApp.',
      err_net: 'We could not send that. Check your connection or message us on WhatsApp.',
      side_wa: 'WhatsApp', side_mail: 'Email', side_city: 'Alexandria', side_city_sub: 'Shipping to all governorates',
      footer_tag: 'Wear your confidence', footer_rights: 'All rights reserved', footer_help: 'Orders and shipping',
      size_label: 'Size', color_label: 'Colour', fabric_label: 'Fabric', sku_label: 'Code',
      in_stock: 'In stock', low_stock: 'Last', out_stock: 'Sold out',
      color_black: 'Black', color_white: 'White', color_grey: 'Grey', color_gold: 'Gold',
      color_beige: 'Beige', color_natural: 'Natural',
      wa_hi: 'Hello, I would like to order from TAFRA:',
      wa_size: 'Size', wa_color: 'Colour', wa_qty: 'Qty', wa_total: 'Total',
      wa_items: 'Items', wa_ship: 'Shipping', wa_city: 'City',
      wa_city_q: 'City:', wa_note: 'Note:',
      egp: 'EGP', langBtn: 'عربي', close: 'Close'
    }
  };

  let lang = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'ar';

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key;
  }

  function money(n) {
    if (n === null || n === undefined) return t('on_request');
    return lang === 'ar' ? n + ' ' + t('egp') : n + ' ' + t('egp');
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    const lb = $('langBtn');
    if (lb) lb.textContent = t('langBtn');
    document.title = 'TAFRA — ' + (lang === 'ar' ? 'البس ثقتك' : 'Wear Your Confidence');
  }

  /* ------------------------------------------------------- 2. واتساب واللينكات */
  function waNumber() { return String(BRAND.whatsapp || '').replace(/[^0-9]/g, ''); }

  function waLink(text) {
    return 'https://wa.me/' + waNumber() + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  function paintLinks() {
    const plain = waLink('');
    ['waTop', 'waFab', 'waSide'].forEach(function (id) {
      const el = $(id);
      if (el) el.href = plain;
    });
    const txt = '+' + waNumber();
    if ($('topBarPhoneText')) $('topBarPhoneText').textContent = txt;
    if ($('waSideNum')) $('waSideNum').textContent = txt;
    if ($('mailSideText')) $('mailSideText').textContent = BRAND.email || '';
    if ($('mailSide')) $('mailSide').href = 'mailto:' + (BRAND.email || '');
    if ($('shipNote')) $('shipNote').textContent = t('ship_note');
  }

  /* --------------------------------------------------------------- 3. المجموعات */
  function colName(c) { return lang === 'ar' ? c.ar : c.en; }
  function colDesc(c) { return lang === 'ar' ? c.ar_desc : c.en_desc; }
  function catLabel(id) {
    const c = COLLECTIONS.find(function (x) { return x.id === id; });
    return c ? colName(c) : id;
  }

  function renderCollections() {
    const grid = $('collectionsGrid');
    if (!grid) return;
    grid.textContent = '';
    COLLECTIONS.forEach(function (c) {
      const count = PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      const card = document.createElement('a');
      card.className = 'gallery-card';
      card.href = '#shop';
      card.addEventListener('click', function () { pickCategory(c.id); });

      const img = document.createElement('img');
      img.src = c.img; img.alt = colName(c); img.loading = 'lazy';

      const over = document.createElement('div');
      over.className = 'gallery-overlay';
      const cat = document.createElement('span');
      cat.className = 'gallery-category';
      cat.textContent = count + ' ' + (lang === 'ar' ? 'قطعة' : 'pieces');
      const title = document.createElement('h3');
      title.className = 'gallery-title';
      title.textContent = colName(c);
      const desc = document.createElement('p');
      desc.className = 'gallery-desc';
      desc.textContent = colDesc(c);

      over.append(cat, title, desc);
      card.append(img, over);
      grid.append(card);
    });
  }

  /* ------------------------------------------------------------------ 4. المنتجات */
  let activeCat = 'all';
  let query = '';
  let sortBy = 'new';

  function pName(p) { return lang === 'ar' ? p.ar.name : p.en.name; }
  function pDesc(p) { return lang === 'ar' ? p.ar.desc : p.en.desc; }
  function pFabric(p) { return lang === 'ar' ? p.ar.fabric : p.en.fabric; }
  function colorLabel(c) {
    const key = 'color_' + String(c).toLowerCase();
    return I18N[lang][key] || I18N.en[key] || c;
  }
  function tagLabel(tag) {
    if (tag === 'new') return t('tag_new');
    if (tag === 'best') return t('tag_best');
    return '';
  }

  function matches(p) {
    if (activeCat !== 'all' && p.cat !== activeCat) return false;
    if (!query) return true;
    const hay = [p.id, p.cat, p.ar && p.ar.name, p.ar && p.ar.desc, p.en && p.en.name, p.en && p.en.desc]
      .join(' ').toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function sorted(list) {
    const copy = list.slice();
    if (sortBy === 'low') copy.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
    else if (sortBy === 'high') copy.sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
    return copy;
  }

  function renderFilters() {
    const box = $('filters');
    if (!box) return;
    box.textContent = '';
    const all = [{ id: 'all', label: t('f_all') }].concat(
      COLLECTIONS.map(function (c) { return { id: c.id, label: colName(c) }; })
    );
    all.forEach(function (item) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (item.id === activeCat ? ' on' : '');
      b.textContent = item.label;
      b.addEventListener('click', function () { pickCategory(item.id); });
      box.append(b);
    });
  }

  function pickCategory(id) {
    activeCat = id;
    renderFilters();
    renderProducts();
    const shop = $('shop');
    if (shop) shop.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function stockLabel(p) {
    if (p.stock === undefined || p.stock === null) return '';
    if (p.stock <= 0) return t('out_stock');
    if (p.stock <= 3) return t('low_stock') + ' ' + p.stock;
    return '';
  }

  function buildCard(p) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const figure = document.createElement('div');
    figure.className = 'product-media';
    const img = document.createElement('img');
    img.src = p.img; img.alt = pName(p); img.loading = 'lazy';
    figure.append(img);

    const tag = tagLabel(p.tag);
    if (tag) {
      const badge = document.createElement('span');
      badge.className = 'badge' + (p.tag === 'best' ? ' gold' : '');
      badge.textContent = tag;
      figure.append(badge);
    }
    const st = stockLabel(p);
    if (st) {
      const s = document.createElement('span');
      s.className = 'stock-flag';
      s.textContent = st;
      figure.append(s);
    }

    const body = document.createElement('div');
    body.className = 'product-body';
    const cat = document.createElement('span');
    cat.className = 'product-cat';
    cat.textContent = catLabel(p.cat);
    const h = document.createElement('h3');
    h.textContent = pName(p);
    const priceRow = document.createElement('p');
    priceRow.className = 'product-price';
    priceRow.textContent = money(p.price);
    if (p.oldPrice) {
      const old = document.createElement('s');
      old.textContent = money(p.oldPrice);
      priceRow.append(' ', old);
    }
    body.append(cat, h, priceRow);

    const actions = document.createElement('div');
    actions.className = 'product-actions';
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'btn-gold small';
    add.textContent = t('add_order');
    add.addEventListener('click', function () { openModal(p); });
    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'btn-line small';
    more.textContent = t('details');
    more.addEventListener('click', function () { openModal(p); });
    actions.append(add, more);

    card.append(figure, body, actions);
    return card;
  }

  function renderProducts() {
    const grid = $('productGrid');
    if (!grid) return;
    const list = sorted(PRODUCTS.filter(matches));
    grid.textContent = '';
    list.forEach(function (p) { grid.append(buildCard(p)); });
    grid.classList.toggle('hidden', list.length === 0);
    if ($('emptyNote')) $('emptyNote').classList.toggle('hidden', list.length !== 0);
    if ($('countNote')) $('countNote').textContent = list.length + ' ' + (lang === 'ar' ? 'قطعة' : 'pieces');
  }

  function renderBest() {
    const grid = $('bestGrid');
    if (!grid) return;
    grid.textContent = '';
    PRODUCTS.filter(function (p) { return p.tag === 'best'; }).slice(0, 4)
      .forEach(function (p) { grid.append(buildCard(p)); });
  }

  /* --------------------------------------------------------------- 5. اللك بوك */
  const LOOKS = [
    'img/branding-set-a.jpeg', 'img/shopping-bag-black.jpeg', 'img/street-shopping-a.jpeg',
    'img/bag-street.jpeg', 'img/branding-set-b.jpeg', 'img/cafe-bags.jpeg',
    'img/hangtag-a.jpeg', 'img/brand-logo-gold.jpeg'
  ];

  function renderLookbook() {
    const grid = $('lookGrid');
    if (!grid) return;
    grid.textContent = '';
    LOOKS.forEach(function (src) {
      const fig = document.createElement('figure');
      fig.className = 'look-item';
      const img = document.createElement('img');
      img.src = src; img.alt = 'TAFRA'; img.loading = 'lazy';
      fig.append(img);
      grid.append(fig);
    });
  }

  /* ----------------------------------------------------------- 6. المقاسات والأسئلة */
  function renderSizeGuide() {
    const table = $('sizeTable');
    if (!table) return;
    table.textContent = '';
    const head = document.createElement('tr');
    (I18N[lang].size_head || []).forEach(function (h) {
      const th = document.createElement('th');
      th.textContent = h;
      head.append(th);
    });
    table.append(head);
    (DATA.sizeGuide || []).forEach(function (row) {
      const tr = document.createElement('tr');
      [row.size, row.chest, row.length, row.sleeve].forEach(function (v) {
        const td = document.createElement('td');
        td.textContent = v;
        tr.append(td);
      });
      table.append(tr);
    });
  }

  function renderFaqs() {
    const box = $('faqList');
    if (!box) return;
    box.textContent = '';
    (DATA.faqs || []).forEach(function (item) {
      const det = document.createElement('details');
      det.className = 'faq';
      const sum = document.createElement('summary');
      sum.textContent = lang === 'ar' ? item.ar.q : item.en.q;
      const p = document.createElement('p');
      p.textContent = lang === 'ar' ? item.ar.a : item.en.a;
      det.append(sum, p);
      box.append(det);
    });
  }

  /* ------------------------------------------------------------- 7. أوردر العميل */
  let order = [];
  try { order = JSON.parse(localStorage.getItem(CART_KEY) || '[]') || []; } catch (e) { order = []; }

  function saveOrder() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(order)); } catch (e) { /* تخزين مقفول */ }
    renderOrder();
  }

  function lineTotal(l) {
    const p = PRODUCTS.find(function (x) { return x.id === l.id; });
    return p && p.price ? p.price * l.qty : 0;
  }

  function orderTotal() {
    return order.reduce(function (sum, l) { return sum + lineTotal(l); }, 0);
  }

  function addToOrder(p, size, color, qty) {
    const key = p.id + '|' + size + '|' + color;
    const found = order.find(function (l) { return l.key === key; });
    if (found) found.qty += qty;
    else order.push({ key: key, id: p.id, size: size, color: color, qty: qty });
    saveOrder();
  }

  function renderOrder() {
    const box = $('orderLines');
    const badge = $('orderCount');
    if (badge) {
      const n = order.reduce(function (s, l) { return s + l.qty; }, 0);
      badge.textContent = String(n);
      badge.classList.toggle('on', n > 0);
    }
    if (!box) return;
    box.textContent = '';
    if (!order.length) {
      const empty = document.createElement('p');
      empty.className = 'order-empty';
      empty.textContent = t('order_empty');
      box.append(empty);
    }
    order.forEach(function (l, index) {
      const p = PRODUCTS.find(function (x) { return x.id === l.id; });
      if (!p) return;
      const row = document.createElement('div');
      row.className = 'order-line';
      const img = document.createElement('img');
      img.src = p.img; img.alt = pName(p);
      const info = document.createElement('div');
      info.className = 'order-info';
      const name = document.createElement('b');
      name.textContent = pName(p);
      const meta = document.createElement('small');
      const bits = [];
      if (l.size) bits.push(t('wa_size') + ': ' + l.size);
      if (l.color) bits.push(t('wa_color') + ': ' + colorLabel(l.color));
      bits.push(t('wa_qty') + ': ' + l.qty);
      meta.textContent = bits.join(' · ');
      const price = document.createElement('span');
      price.textContent = money(lineTotal(l));
      const rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'order-rm';
      rm.setAttribute('aria-label', t('clear'));
      rm.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      rm.addEventListener('click', function () { order.splice(index, 1); saveOrder(); });
      info.append(name, meta);
      row.append(img, info, price, rm);
      box.append(row);
    });
    if ($('orderTotal')) $('orderTotal').textContent = money(orderTotal());
    if ($('freeShipLine')) {
      const free = BRAND.shipping && BRAND.shipping.freeOver;
      $('freeShipLine').textContent = free ? t('free_ship') + ' ' + money(free) : '';
    }
    if ($('orderCheckout')) $('orderCheckout').classList.toggle('hidden', order.length === 0);
  }

  function orderMessage() {
    const lines = [t('wa_hi'), t('wa_items') + ':'];
    order.forEach(function (l) {
      const p = PRODUCTS.find(function (x) { return x.id === l.id; });
      if (!p) return;
      let s = '• ' + pName(p) + ' (' + p.id + ')';
      if (l.size) s += ' — ' + t('wa_size') + ' ' + l.size;
      if (l.color) s += ' — ' + t('wa_color') + ' ' + colorLabel(l.color);
      s += ' ×' + l.qty + ' = ' + money(lineTotal(l));
      lines.push(s);
    });
    lines.push(t('wa_total') + ': ' + money(orderTotal()));
    lines.push(t('wa_ship') + ': ' + t('ship_note'));
    const city = $('cityInput');
    if (city && city.value.trim()) lines.push(t('wa_city_q') + ' ' + city.value.trim());
    return lines.join('\n');
  }

  function goCheckout() {
    if (!order.length) return;
    window.open(waLink(orderMessage()), '_blank', 'noopener');
  }

  /* -------------------------------------------------------------------- 8. المودال */
  let current = null;

  function openModal(p) {
    current = { p: p, size: (p.sizes && p.sizes[0]) || '', color: (p.colors && p.colors[0]) || '', qty: 1 };
    $('modalImg').src = p.img;
    $('modalImg').alt = pName(p);
    $('modalCat').textContent = catLabel(p.cat) + ' · ' + t('sku_label') + ' ' + p.id;
    $('modalTitle').textContent = pName(p);
    $('modalDesc').textContent = pDesc(p);
    $('modalFabric').textContent = pFabric(p);
    $('modalPrice').textContent = money(p.price);
    renderOpts();
    $('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('modal').classList.add('hidden');
    document.body.style.overflow = '';
    current = null;
  }

  function optionGroup(label, values, kind) {
    if (!values || !values.length) return null;
    const wrap = document.createElement('div');
    wrap.className = 'opt-group';
    const head = document.createElement('span');
    head.className = 'opt-label';
    head.textContent = t(label);
    wrap.append(head);
    values.forEach(function (v) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt' + (current[kind] === v ? ' on' : '');
      b.textContent = kind === 'color' ? colorLabel(v) : v;
      b.addEventListener('click', function () {
        current[kind] = current[kind] === v ? '' : v;
        renderOpts();
      });
      wrap.append(b);
    });
    return wrap;
  }

  function renderOpts() {
    const box = $('modalOpts');
    box.textContent = '';
    const sizes = optionGroup('size_label', current.p.sizes, 'size');
    const colors = optionGroup('color_label', current.p.colors, 'color');
    if (sizes) box.append(sizes);
    if (colors) box.append(colors);

    const qtyWrap = document.createElement('div');
    qtyWrap.className = 'opt-group';
    const qtyLabel = document.createElement('span');
    qtyLabel.className = 'opt-label';
    qtyLabel.textContent = t('qty');
    const stepper = document.createElement('div');
    stepper.className = 'stepper';
    const minus = document.createElement('button');
    minus.type = 'button';
    minus.textContent = '−';
    const val = document.createElement('span');
    val.textContent = String(current.qty);
    const plus = document.createElement('button');
    plus.type = 'button';
    plus.textContent = '+';
    minus.addEventListener('click', function () { if (current.qty > 1) { current.qty--; renderOpts(); } });
    plus.addEventListener('click', function () { if (current.qty < 20) { current.qty++; renderOpts(); } });
    stepper.append(minus, val, plus);
    qtyWrap.append(qtyLabel, stepper);
    box.append(qtyWrap);
  }

  function confirmAdd() {
    if (!current) return;
    addToOrder(current.p, current.size, current.color, current.qty);
    closeModal();
    openOrder();
  }

  /* --------------------------------------------------------------- 9. درج الأوردر */
  function openOrder() {
    renderOrder();
    $('drawer').classList.add('open');
    $('drawerBack').classList.remove('hidden');
  }

  function closeOrder() {
    $('drawer').classList.remove('open');
    $('drawerBack').classList.add('hidden');
  }

  /* ------------------------------------------------------------- 10. فورم الرسائل */
  const ESM = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  let clientPromise = null;

  function client() {
    if (!BRAND.supabaseUrl || !BRAND.supabaseKey) return Promise.reject(new Error('NO_CONFIG'));
    if (!clientPromise) {
      clientPromise = import(ESM)
        .then(function (m) { return m.createClient(BRAND.supabaseUrl, BRAND.supabaseKey, { auth: { persistSession: false } }); })
        .catch(function (e) { clientPromise = null; throw e; });
    }
    return clientPromise;
  }

  function say(key, ok) {
    const el = $('formMsg');
    el.textContent = t(key);
    el.className = 'form-msg ' + (ok ? 'ok' : 'err');
  }

  function mapError(message) {
    const m = String(message || '');
    if (m.indexOf('LEAD_NAME_INVALID') !== -1) return 'err_name';
    if (m.indexOf('LEAD_EMAIL_INVALID') !== -1) return 'err_email';
    if (m.indexOf('LEAD_MESSAGE_INVALID') !== -1) return 'err_message';
    if (m.indexOf('LEAD_THROTTLED') !== -1) return 'err_fast';
    if (m.indexOf('LEAD_RATE_LIMIT') !== -1) return 'err_busy';
    return 'err_net';
  }

  function wireForm() {
    const form = $('leadForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = $('sendBtn');
      const fd = new FormData(form);
      const name = String(fd.get('full_name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const phone = String(fd.get('phone') || '').trim();
      let message = String(fd.get('message') || '').trim();
      const honeypot = String(fd.get('company_website') || '');

      if (name.length < 2) return say('err_name', false);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return say('err_email', false);
      if (message.length < 5) return say('err_message', false);

      if (order.length) {
        message = message + '\n\n' + orderMessage();
      }

      btn.disabled = true;
      btn.textContent = t('sending');
      client().then(function (sb) {
        return sb.rpc('portfolio_submit_lead', {
          p_full_name: name,
          p_email: email,
          p_phone: phone || null,
          p_message: message,
          p_lang: lang,
          p_page: '/tafra',
          p_honeypot: honeypot
        });
      }).then(function (r) {
        if (r.error) throw r.error;
        form.reset();
        say('ok_sent', true);
      }).catch(function (err) {
        say(mapError(err && (err.message || err.code || err.details)), false);
      }).then(function () {
        btn.disabled = false;
        btn.textContent = t('f_send');
      });
    });
  }

  /* --------------------------------------------------------------- 11. الحركات */
  function wireChrome() {
    const header = document.querySelector('.header');
    const sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    window.addEventListener('scroll', function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 20);
      let activeId = 'home';
      sections.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 160) activeId = s.id;
      });
      document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
      });
    }, { passive: true });

    if ($('menuBtn')) $('menuBtn').addEventListener('click', function () {
      document.querySelector('.nav-links').classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a, .footer-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.querySelector('.nav-links').classList.remove('open');
      });
    });

    const input = $('searchInput');
    if (input) input.addEventListener('input', function () {
      query = input.value.trim().toLowerCase();
      renderProducts();
    });
    if ($('searchBtn')) $('searchBtn').addEventListener('click', function () {
      const shop = $('shop');
      if (shop) shop.scrollIntoView({ behavior: 'smooth' });
      input.focus();
    });
    if ($('sortSelect')) $('sortSelect').addEventListener('change', function () {
      sortBy = $('sortSelect').value;
      renderProducts();
    });

    $('modalClose').addEventListener('click', closeModal);
    $('modalBack').addEventListener('click', closeModal);
    $('modalAdd').addEventListener('click', confirmAdd);
    $('drawerBack').addEventListener('click', closeOrder);
    $('orderClose').addEventListener('click', closeOrder);
    $('orderCheckout').addEventListener('click', goCheckout);
    $('orderClear').addEventListener('click', function () { order = []; saveOrder(); });
    $('orderFab').addEventListener('click', openOrder);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal(); closeOrder(); }
    });

    $('langBtn').addEventListener('click', function () {
      lang = lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem(LANG_KEY, lang);
      renderAll();
    });

    $('year').textContent = String(new Date().getFullYear());
    if ($('statPieces')) $('statPieces').textContent = String(PRODUCTS.length);
  }

  function renderAll() {
    applyStatic();
    paintLinks();
    renderCollections();
    renderFilters();
    renderProducts();
    renderBest();
    renderLookbook();
    renderSizeGuide();
    renderFaqs();
    renderOrder();
    if (current) openModal(current.p);
  }

  /* ------------------------------------------------------------------- 12. إقلاع */
  function boot() {
    if (!waNumber()) {
      ['waTop', 'waFab', 'waSide'].forEach(function (id) {
        const el = $(id);
        if (el) el.classList.add('hidden');
      });
    }
    renderAll();
    wireForm();
    wireChrome();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
