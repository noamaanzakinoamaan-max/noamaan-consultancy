/* Lightweight multi-language support: EN / Hindi / Marathi.
   Swaps text for elements with [data-i18n] (textContent) or
   [data-i18n-html] (innerHTML). Remembers choice in localStorage. */
(function () {
  'use strict';

  const T = {
    en: {
      nav_services: 'Services', nav_about: 'About', nav_process: 'Process',
      nav_partner: 'Partnership', nav_clients: 'Clients', nav_insights: 'Insights', nav_card: 'Card',
      nav_faq: 'FAQ', nav_cta: 'Get Consultation',
      hero_eyebrow: 'Real Estate · Legal · Loans · Settlements — Mumbai',
      hero_title: 'Property, Legal &amp; <span class="gold">Settlement Experts.</span>',
      hero_lead: 'From property and lawsuits to bank loans, loan settlements and business consulting — Noamaan Consultancy Services is your single trusted partner for almost everything, right here in Andheri West, Mumbai.',
      hero_cta1: 'Book a Free Consultation', hero_cta2: 'See What We Do',
      stat_years: 'Years Experience', stat_matters: 'Matters Resolved', stat_satisfaction: 'Client Satisfaction',
      svc_eyebrow: 'What We Do', svc_title: 'Everything you need, <span class="gold">under one roof.</span>',
      about_eyebrow: 'Who We Are',
      partner_eyebrow: 'Official Authorization & Accreditation',
      partner_title: 'Authorized Partner of <span class="gold">APNARUPEE &amp; MYSPE.</span>',
      partner_sub: 'Officially certified as an authorized financial partner of the APNARUPEE &amp; MYSPE Network — empowering our clients with institutional loan channels, priority approvals, and seamless settlements.',
      proc_eyebrow: 'How It Works',
      ins_eyebrow: 'Insights', contact_eyebrow: 'Get in Touch',
      contact_title: "Let's resolve it, <span class=\"gold\">together.</span>"
    },
    hi: {
      nav_services: 'सेवाएँ', nav_about: 'हमारे बारे में', nav_process: 'प्रक्रिया',
      nav_partner: 'साझेदारी', nav_partner: 'भागीदारी', nav_clients: 'ग्राहक', nav_insights: 'लेख', nav_card: 'कार्ड',
      nav_faq: 'सामान्य प्रश्न', nav_cta: 'परामर्श लें',
      hero_eyebrow: 'रियल एस्टेट · कानूनी · लोन · सेटलमेंट — मुंबई',
      hero_title: 'प्रॉपर्टी, कानूनी और <span class="gold">सेटलमेंट विशेषज्ञ।</span>',
      hero_lead: 'प्रॉपर्टी और मुकदमों से लेकर बैंक लोन, लोन सेटलमेंट और बिज़नेस कंसल्टिंग तक — नोआमान कंसल्टेंसी सर्विसेज़ अंधेरी वेस्ट, मुंबई में आपके लिए हर काम का एक भरोसेमंद साथी है।',
      hero_cta1: 'निःशुल्क परामर्श बुक करें', hero_cta2: 'हमारी सेवाएँ देखें',
      stat_years: 'वर्षों का अनुभव', stat_matters: 'मामले सुलझाए', stat_satisfaction: 'ग्राहक संतुष्टि',
      svc_eyebrow: 'हम क्या करते हैं', svc_title: 'आपकी हर ज़रूरत, <span class="gold">एक ही छत के नीचे।</span>',
      about_eyebrow: 'हम कौन हैं',
      partner_eyebrow: 'आधिकारिक प्राधिकरण एवं मान्यता',
      partner_title: '<span class="gold">APNARUPEE और MYSPE</span> के अधिकृत वित्तीय भागीदार।',
      partner_sub: 'APNARUPEE और MYSPE नेटवर्क के आधिकारिक प्रमाणित वित्तीय भागीदार — ग्राहकों को सीधे बैंकिंग नेटवर्क, त्वरित लोन स्वीकृति और आसान सेटलमेंट की सुविधा।',
      proc_eyebrow: 'यह कैसे काम करता है',
      ins_eyebrow: 'लेख', contact_eyebrow: 'संपर्क करें',
      contact_title: 'आइए इसे <span class="gold">मिलकर सुलझाएँ।</span>'
    },
    mr: {
      nav_services: 'सेवा', nav_about: 'आमच्याबद्दल', nav_process: 'प्रक्रिया',
      nav_partner: 'साझेदारी', nav_partner: 'भागीदारी', nav_clients: 'ग्राहक', nav_insights: 'लेख', nav_card: 'कार्ड',
      nav_faq: 'प्रश्न', nav_cta: 'सल्ला घ्या',
      hero_eyebrow: 'रिअल इस्टेट · कायदेशीर · कर्ज · सेटलमेंट — मुंबई',
      hero_title: 'प्रॉपर्टी, कायदेशीर व <span class="gold">सेटलमेंट तज्ज्ञ.</span>',
      hero_lead: 'प्रॉपर्टी आणि खटल्यांपासून ते बँक कर्ज, कर्ज सेटलमेंट आणि बिझनेस कन्सल्टिंगपर्यंत — नोआमान कन्सल्टन्सी सर्व्हिसेस अंधेरी वेस्ट, मुंबई येथे तुमच्यासाठी प्रत्येक कामाचा विश्वासू भागीदार आहे.',
      hero_cta1: 'मोफत सल्ला बुक करा', hero_cta2: 'आमच्या सेवा पाहा',
      stat_years: 'वर्षांचा अनुभव', stat_matters: 'प्रकरणे सोडवली', stat_satisfaction: 'ग्राहक समाधान',
      svc_eyebrow: 'आम्ही काय करतो', svc_title: 'तुमची प्रत्येक गरज, <span class="gold">एकाच छताखाली.</span>',
      about_eyebrow: 'आम्ही कोण आहोत',
      partner_eyebrow: 'अधिकृत भागीदारी आणि मान्यता',
      partner_title: '<span class="gold">APNARUPEE आणि MYSPE</span> चे अधिकृत वित्तीय भागीदार.',
      partner_sub: 'APNARUPEE आणि MYSPE नेटवर्कचे अधिकृत प्रमाणित वित्तीय भागीदार — ग्राहकांना बँक कर्ज, जलद मंजुरी आणि सुरळीत सेटलमेंटची विश्वासार्ह सुविधा.',
      proc_eyebrow: 'हे कसे कार्य करते',
      ins_eyebrow: 'लेख', contact_eyebrow: 'संपर्क साधा',
      contact_title: 'चला, हे <span class="gold">एकत्र सोडवूया.</span>'
    }
  };

  function apply(lang) {
    const dict = T[lang] || T.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.getAttribute('data-i18n-html');
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    try { localStorage.setItem('ncs_lang', lang); } catch (e) {}
  }

  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => apply(btn.dataset.lang));
  });

  let saved = 'en';
  try { saved = localStorage.getItem('ncs_lang') || 'en'; } catch (e) {}
  if (saved !== 'en') apply(saved);
})();
