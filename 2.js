/* ============================================================================
   TAFRA — 2.js
   كل اللي بيحصل في الصفحة: عربي/إنجليزي، رسم المجموعات والمنتجات من catalog.js،
   البحث والفلترة، طلب واتساب، وفورم التواصل اللي بيكتب في صندوق رسائل العملاء.
   ========================================================================== */
(function () {
  'use strict';

  const DATA = window.TAFRA || { brand: {}, collections: [], products: [] };
  const BRAND = DATA.brand;
  const $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------------- 1. اللغة */
  const I18N = {
    ar: {
      n_home: 'الرئيسية', n_collections: 'المجموعات', n_shop: 'المتجر', n_style: 'دليل الموضة', n_about: 'من نحن', n_contact: 'تواصل',
      announce: 'للطلب والاستفسار — راسلنا على واتساب',
      order_now: 'اطلب الآن',
      search: 'ابحث...',
      hero_eyebrow: 'Wear your confidence',
      hero_title: 'TAFRA — من إسكندرية، بقصة حديثة',
      hero_sub: 'قطع مختارة بعناية وتغليف رسمي. اختار قطعتك واطلبها بضغطة على واتساب، ونتفق على المقاس والتوصيل.',
      hero_cta1: 'شوف المعروض', hero_cta2: 'المجموعات',
      fact_ship: 'توصيل لكل المحافظات', fact_pack: 'تغليف TAFRA رسمي', fact_order: 'الطلب بالواتساب',
      col_title: 'مجموعات TAFRA', col_sub: 'استكشف أحدث تصميماتنا وأزياءنا الحصرية',
      shop_title: 'المتجر', shop_sub: 'اضغط على أي قطعة للتفاصيل، واطلبها مباشرة على واتساب',
      f_all: 'الكل', no_results: 'مفيش نتيجة للبحث ده. جرّب كلمة تانية.',
      soon: 'قريباً', on_request: 'السعر عند الطلب', details: 'التفاصيل',
      style_title: 'دليل الموضة', style_sub: 'تلات ملاحظات تخلي أي قطعة TAFRA تليق عليك',
      s1_t: 'القصة الواسعة', s1_b: 'الأوفرسايز بيحب بنطلون مستقيم أو ضيق تحت، عشان التوازن يبان. لو حابب تلبسها على بعض، اختار مقاس واحد تحت.',
      s2_t: 'الأسود والذهبي', s2_b: 'هوية TAFRA لونين بس: أسود وذهبي. إكسسوار واحد ذهبي كفاية — أكتر من كده يخلي الشكل مزدحم.',
      s3_t: 'التغليف جزء من الهدية', s3_b: 'كل طلب بيجي في كيس وعلبة TAFRA. لو هتهدي، قولنا على واتساب نكتب كارت الإهداء باسمك.',
      about_title: 'تفره: تراث إسكندرية، صياغة حديثة',
      about_b1: 'TAFRA اتأسست في الإسكندرية على فكرة واحدة: المدينة عندها ذوق بصري خاص — حجر قديم، بحر، وناس بتلبس بثقة. بنحوّل الحس ده في قطع معاصرة وتغليف ينفع يتهدى.',
      about_b2: 'كل قطعة بتخرج من عندنا في علبة وكيس بشعار TF المذهب، وطلبك بيتأكد عليه على واتساب قبل الشحن عشان المقاس يظبط من أول مرة.',
      about_cta: 'ابعتلنا رسالة',
      contact_title: 'تواصل معنا', contact_sub: 'اكتب طلبك هنا وهيوصلنا على طول، أو كلّمنا على واتساب',
      f_name: 'الاسم', f_email: 'البريد الإلكتروني', f_phone: 'رقم الواتساب (اختياري)', f_message: 'رسالتك',
      f_message_ph: 'القطعة، المقاس، والمدينة اللي هنتوصيل لها...', f_send: 'إرسال', sending: 'بيبعت...',
      ok_sent: 'وصلتنا رسالتك — هنرد عليك قريب.',
      err_name: 'اكتب اسمك صح (حرفين على الأقل).',
      err_email: 'البريد الإلكتروني مش شكله مظبوط.',
      err_message: 'اكتب رسالتك (٥ حروف على الأقل).',
      err_fast: 'استنى دقيقتين وابعت تاني.',
      err_busy: 'الرسايل زيادت شوية دلوقتي — كلّمنا على واتساب.',
      err_net: 'مفهمناش نبعت. اتأكد من الإنترنت أو كلّمنا على واتساب.',
      side_wa: 'واتساب', side_mail: 'بريد إلكتروني', side_city: 'الإسكندرية', side_city_sub: 'الشحن لكل المحافظات',
      footer_tag: 'Wear your confidence', footer_rights: 'كل الحقوق محفوظة',
      size_label: 'المقاس', color_label: 'اللون',
      color_black: 'أسود', color_white: 'أبيض', color_grey: 'رمادي', color_gold: 'ذهبي',
      wa_hi: 'السلام عليكم، عايز أطلب من TAFRA:',
      wa_item: 'القطعة', wa_size: 'المقاس', wa_color: 'اللون', wa_from: 'من صفحة',
      langBtn: 'EN'
    },
    en: {
      n_home: 'Home', n_collections: 'Collections', n_shop: 'Shop', n_style: 'Style Guide', n_about: 'About', n_contact: 'Contact',
      announce: 'To order or ask anything — message us on WhatsApp',
      order_now: 'Order now',
      search: 'Search...',
      hero_eyebrow: 'Wear your confidence',
      hero_title: 'TAFRA — born in Alexandria, cut for today',
      hero_sub: 'Carefully picked pieces in official packaging. Choose your piece and order it in one tap on WhatsApp — we confirm size and delivery.',
      hero_cta1: 'See what is in stock', hero_cta2: 'Collections',
      fact_ship: 'Shipping to all governorates', fact_pack: 'Official TAFRA packaging', fact_order: 'Order via WhatsApp',
      col_title: 'TAFRA Collections', col_sub: 'Explore our latest designs and exclusive pieces',
      shop_title: 'The Shop', shop_sub: 'Tap any piece for details, then order it straight on WhatsApp',
      f_all: 'All', no_results: 'Nothing matches that search. Try another word.',
      soon: 'Coming soon', on_request: 'Price on request', details: 'Details',
      style_title: 'Style Guide', style_sub: 'Three notes that make any TAFRA piece work for you',
      s1_t: 'The oversized cut', s1_b: 'Oversized reads best with a straight or slim trouser. If you like it stacked, go one size down.',
      s2_t: 'Black and gold', s2_b: 'TAFRA is two colours only: black and gold. One gold accessory is enough — more gets busy.',
      s3_t: 'Packaging is part of the gift', s3_b: 'Every order ships in a TAFRA bag and box. Gifting it? Tell us on WhatsApp and we write the card.',
      about_title: 'TAFRA: Alexandrian heritage, modern crafting',
      about_b1: 'TAFRA started in Alexandria on one idea: this city has its own visual taste — old stone, sea, and people who dress with confidence. We turn that into contemporary pieces and gift-ready packaging.',
      about_b2: 'Every piece leaves us in a box and bag with the gilded TF mark, and we confirm your order on WhatsApp before shipping so the size is right the first time.',
      about_cta: 'Send us a message',
      contact_title: 'Get in touch', contact_sub: 'Write your request here and it reaches us directly, or message us on WhatsApp',
      f_name: 'Name', f_email: 'Email', f_phone: 'WhatsApp number (optional)', f_message: 'Your message',
      f_message_ph: 'The piece, your size, and the city we are shipping to...', f_send: 'Send', sending: 'Sending...',
      ok_sent: 'We got your message — we will reply soon.',
      err_name: 'Please write your name (at least 2 characters).',
      err_email: 'That email address does not look right.',
      err_message: 'Please write your message (at least 5 characters).',
      err_fast: 'Wait two minutes and send again.',
      err_busy: 'We are getting a lot of messages right now — reach us on WhatsApp.',
      err_net: 'We could not send that. Check your connection or message us on WhatsApp.',
      side_wa: 'WhatsApp', side_mail: 'Email', side_city: 'Alexandria', side_city_sub: 'Shipping to all governorates',
      footer_tag: 'Wear your confidence', footer_rights: 'All rights reserved',
      size_label: 'Size', color_label: 'Colour',
      color_black: 'Black', color_white: 'White', color_grey: 'Grey', color_gold: 'Gold',
      wa_hi: 'Hello, I would like to order from TAFRA:',
      wa_item: 'Item', wa_size: 'Size', wa_color: 'Colour', wa_from: 'From page',
      langBtn: 'عربي'
    }
  };

  let lang = localStorage.getItem('tafra-lang');
  if (lang !== 'ar' && lang !== 'en') lang = 'ar';

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key;
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
    const phoneText = $('topBarPhoneText');
    if (phoneText) phoneText.textContent = '+' + waNumber();
    const sideNum = $('waSideNum');
    if (sideNum) sideNum.textContent = '+' + waNumber();
    const mail = $('mailSideText');
    if (mail) mail.textContent = BRAND.email || '';
    const m = $('mailSide');
    if (m) m.href = 'mailto:' + (BRAND.email || '');
  }

  /* --------------------------------------------------------------- 3. المجموعات */
  function collectionName(c) { return lang === 'ar' ? c.ar : c.en; }
  function collectionDesc(c) { return lang === 'ar' ? c.ar_desc : c.en_desc; }

  function renderCollections() {
    const grid = $('collectionsGrid');
    if (!grid) return;
    grid.textContent = '';
    (DATA.collections || []).forEach(function (c) {
      const card = document.createElement('a');
      card.className = 'gallery-card';
      card.href = '#shop';
      card.addEventListener('click', function () { pickCategory(c.id); });

      const img = document.createElement('img');
      img.src = c.img;
      img.alt = collectionName(c);
      img.loading = 'lazy';

      const over = document.createElement('div');
      over.className = 'gallery-overlay';
      const cat = document.createElement('span');
      cat.className = 'gallery-category';
      cat.textContent = t('n_shop');
      const title = document.createElement('h3');
      title.className = 'gallery-title';
      title.textContent = collectionName(c);
      const desc = document.createElement('p');
      desc.className = 'gallery-desc';
      desc.textContent = collectionDesc(c);

      over.append(cat, title, desc);
      card.append(img, over);
      grid.append(card);
    });
  }

  /* ------------------------------------------------------------------ 4. المنتجات */
  let activeCat = 'all';
    let query = '';

  function productName(p) { return lang === 'ar' ? p.ar.name : p.en.name; }
  function productDesc(p) { return lang === 'ar' ? p.ar.desc : p.en.desc; }
  function catLabel(id) {
    const c = (DATA.collections || []).find(function (x) { return x.id === id; });
    return c ? collectionName(c) : id;
  }

  function matches(p) {
    if (activeCat !== 'all' && p.cat !== activeCat) return false;
    if (!query) return true;
    const hay = [
      p.id, p.cat, p.ar && p.ar.name, p.ar && p.ar.desc, p.en && p.en.name, p.en && p.en.desc
    ].join(' ').toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function renderFilters() {
    const box = $('filters');
    if (!box) return;
    box.textContent = '';
    const all = [{ id: 'all', label: t('f_all') }].concat(
      (DATA.collections || []).map(function (c) { return { id: c.id, label: collectionName(c) }; })
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

  function orderText(p, size, color) {
    const lines = [t('wa_hi'), '• ' + t('wa_item') + ': ' + productName(p) + ' (' + p.id + ')'];
    if (size) lines.push('• ' + t('wa_size') + ': ' + size);
    if (color) lines.push('• ' + t('wa_color') + ': ' + color);
    lines.push('• ' + t('wa_from') + ': TAFRA');
    return lines.join('\n');
  }

  function colorLabel(c) {
    const key = 'color_' + String(c).toLowerCase();
    return I18N[lang][key] || I18N.en[key] || c;
  }

  function renderProducts() {
    const grid = $('productGrid');
    if (!grid) return;
    const list = (DATA.products || []).filter(matches);
    grid.textContent = '';
    grid.classList.toggle('hidden', list.length === 0);
    $('emptyNote').classList.toggle('hidden', list.length !== 0);

    list.forEach(function (p) {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.tabIndex = 0;

      const figure = document.createElement('div');
      figure.className = 'product-media';
      const img = document.createElement('img');
      img.src = p.img;
      img.alt = productName(p);
      img.loading = 'lazy';
      figure.append(img);
      if (p.soon) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = t('soon');
        figure.append(badge);
      }

      const body = document.createElement('div');
      body.className = 'product-body';
      const cat = document.createElement('span');
      cat.className = 'product-cat';
      cat.textContent = catLabel(p.cat);
      const h = document.createElement('h3');
      h.textContent = productName(p);
      const price = document.createElement('p');
      price.className = 'product-price';
      price.textContent = p.price ? p.price + ' ج.م' : t('on_request');
      body.append(cat, h, price);

      const actions = document.createElement('div');
      actions.className = 'product-actions';
      const order = document.createElement('a');
      order.className = 'btn-gold small';
      order.target = '_blank';
      order.rel = 'noopener';
      order.href = waLink(orderText(p, '', ''));
      order.innerHTML = '<i class="fa-brands fa-whatsapp"></i> <span></span>';
      order.querySelector('span').textContent = t('order_now');
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'btn-line small';
      more.textContent = t('details');
      more.addEventListener('click', function () { openModal(p); });
      actions.append(order, more);

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target === card) openModal(p);
      });
      card.append(figure, body, actions);
      grid.append(card);
    });
  }

  /* -------------------------------------------------------------------- 5. المودال */
  let current = null;

  function openModal(p) {
    current = { p: p, size: '', color: '' };
    $('modalImg').src = p.img;
    $('modalImg').alt = productName(p);
    $('modalCat').textContent = catLabel(p.cat) + ' · ' + p.id;
    $('modalTitle').textContent = productName(p);
    $('modalDesc').textContent = productDesc(p);
    $('modalPrice').textContent = p.price ? p.price + ' ج.م' : t('on_request');
    renderOpts();
    $('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('modal').classList.add('hidden');
    document.body.style.overflow = '';
  }

  function renderOpts() {
    const box = $('modalOpts');
    box.textContent = '';
    [['size', 'size_label'], ['color', 'color_label']].forEach(function (pair) {
      const kind = pair[0];
      const values = (kind === 'size' ? current.p.sizes : current.p.colors) || [];
      if (!values.length) return;
      const wrap = document.createElement('div');
      wrap.className = 'opt-group';
      const label = document.createElement('span');
      label.className = 'opt-label';
      label.textContent = t(pair[1]);
      wrap.append(label);
      values.forEach(function (v) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt' + (current[kind] === v ? ' on' : '');
        b.textContent = kind === 'color' ? colorLabel(v) : v;
        b.addEventListener('click', function () {
          current[kind] = current[kind] === v ? '' : v;
          renderOpts();
          syncOrder();
        });
        wrap.append(b);
      });
      box.append(wrap);
    });
    syncOrder();
  }

  function syncOrder() {
    if (!current) return;
    $('modalOrder').href = waLink(orderText(current.p, current.size, current.color));
  }

  /* ------------------------------------------------------------- 6. فورم الرسائل */
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
      const message = String(fd.get('message') || '').trim();
      const honeypot = String(fd.get('company_website') || '');

      if (name.length < 2) return say('err_name', false);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return say('err_email', false);
      if (message.length < 5) return say('err_message', false);

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

  /* --------------------------------------------------------------- 7. الحركات */
  function wireChrome() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 20);
      const id = 'home';
      document.querySelectorAll('main section[id]').forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 140) s.id && (window.__tafraActive = s.id);
      });
      document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + (window.__tafraActive || id));
      });
    }, { passive: true });

    const menu = $('menuBtn');
    if (menu) menu.addEventListener('click', function () {
      document.querySelector('.nav-links').classList.toggle('open');
    });

    const input = $('searchInput');
    if (input) input.addEventListener('input', function () {
      query = input.value.trim().toLowerCase();
      renderProducts();
    });
    const sbtn = $('searchBtn');
    if (sbtn) sbtn.addEventListener('click', function () {
      const shop = $('shop');
      if (shop) shop.scrollIntoView({ behavior: 'smooth' });
      input.focus();
    });

    $('modalClose').addEventListener('click', closeModal);
    $('modalBack').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    $('langBtn').addEventListener('click', function () {
      lang = lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('tafra-lang', lang);
      applyStatic();
      paintLinks();
      renderCollections();
      renderFilters();
      renderProducts();
      if (!$('modal').classList.contains('hidden') && current) openModal(current.p);
    });

    $('year').textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------- 8. إقلاع */
  function boot() {
    if (!waNumber()) {
      ['waTop', 'waFab', 'waSide'].forEach(function (id) {
        const el = $(id);
        if (el) el.classList.add('hidden');
      });
    }
    applyStatic();
    paintLinks();
    renderCollections();
    renderFilters();
    renderProducts();
    wireForm();
    wireChrome();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
