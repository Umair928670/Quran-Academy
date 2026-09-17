import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ur'

const translations = {
  en: {
    dir: 'ltr' as const,
    brand: {
      name: 'Taleem ul Quran',
      subDesktop: 'Online Learning Academy',
      subMobile: 'Learning Academy',
    },
    nav: {
      courses: 'Courses',
      whyUs: 'Why Choose Us',
      howItWorks: 'How It Works',
      ladies: 'Ladies Classes',
      faq: 'FAQ',
      contact: 'Contact',
      bookTrial: 'Book a Free Trial',
    },
    hero: {
      badge: 'Learn Quran Online • Worldwide',
      heading: 'Learn the Quran From the Comfort of Your Home',
      subheading:
        'Personalized 1-on-1 Quran classes for kids, adults and sisters, taught by dedicated male and female tutors with flexible schedules.',
      cta1: 'Book a Free Trial →',
      cta2: 'Chat on WhatsApp',
      feat1: '1-on-1 Live Classes',
      feat2: 'Male & Female Tutors',
      feat3: 'Flexible Timings',
      feat4: 'Monthly Progress Reports',
      enrolledCount: '500+',
      enrolledLabel: 'Students Enrolled',
    },
    trial: {
      heading: 'Start Your Quran Learning Journey',
      sub: 'Book your trial class and discover the right learning program for you.',
      cta: 'Book My Free Trial →',
      submitting: 'Submitting...',
      fields: {
        name: 'Student Name',
        whatsapp: 'WhatsApp Number',
        email: 'Email (Optional)',
        country: 'Country',
        age: 'Age Group',
        course: 'Select Course',
        tutor: 'Tutor Preference',
        time: 'Preferred Time',
      },
      placeholders: {
        name: 'Ahmad Ali',
        whatsapp: '+92 300 0000000',
        email: 'email@example.com',
        country: 'Select country',
        age: 'Select age group',
        course: 'Select course',
        tutor: 'Tutor preference',
        time: 'Preferred time',
      },
      validation: {
        required: 'Required',
        nameRequired: 'Name is required',
        whatsappRequired: 'WhatsApp number is required',
        countryRequired: 'Country is required',
        courseRequired: 'Course is required',
      },
      step: 'Step',
      of: 'of',
      step1Title: 'Your details',
      step2Title: 'Class preferences',
      next: 'Next',
      back: '← Back',
      successHeading: 'JazakAllah Khair!',
      successSub:
        'Your free trial has been booked. Our team will contact you on WhatsApp within 24 hours to confirm your class schedule.',
      tutorOptions: ['Male Tutor', 'Female Tutor', 'No Preference'],
      courseOptions: [
        'Quran Reading with Tajweed',
        'Quran Memorization (Hifz)',
        'Islamic Studies for Youth & Kids',
        'Ladies Special Classes',
      ],
      ageOptions: ['4–7 years', '8–12 years', '13–17 years', '18–30 years', '31+ years'],
      timeOptions: ['Morning (6am–12pm)', 'Afternoon (12pm–6pm)', 'Evening (6pm–10pm)', 'Flexible'],
      promoTitle: 'Free Trial',
      promoSub: 'Take the first step towards a better Quran learning journey.',
      benefits: [
        '✓ No commitment required',
        '✓ Personalized assessment',
        '✓ Meet your tutor first',
        '✓ Learn from home',
      ],
      questions: 'Questions? Chat with us',
    },
    courses: {
      badge: 'OUR COURSES',
      heading: 'Choose the Right Course for Your Learning Goals',
      sub: 'Specialized Quran and Islamic learning programs designed for different ages, levels and learning goals.',
      items: [
        {
          title: 'Quran Reading with Tajweed',
          desc: 'Build strong Quran reading skills with correct pronunciation, Makharij and Tajweed.',
          points: ['Correct pronunciation', 'Makharij', 'Tajweed rules', 'Fluent Quran reading'],
        },
        {
          title: 'Quran Memorization (Hifz)',
          desc: 'Follow a personalized memorization and revision plan at your own pace.',
          points: ['Memorization techniques', 'Regular revision', 'Strong retention habits'],
        },
        {
          title: 'Islamic Studies for Youth & Kids',
          desc: 'Learn essential Islamic knowledge, manners, Seerah, Salah, Duas and Islamic values.',
          points: ['Quranic stories & Seerah', 'Salah and daily Duas', 'Islamic manners', 'Good character'],
        },
        {
          title: 'Ladies Special Classes',
          desc: 'Private Quran and Islamic learning sessions with dedicated female tutors.',
          points: ['Quran reading & Tajweed', 'Fiqh and daily duas', 'Islamic studies', 'Personal spiritual growth'],
        },
      ],
    },
    whyUs: {
      heading: 'Why Choose Us',
      sub: 'We are committed to providing a safe, supportive and effective learning environment for every student.',
      items: [
        { h: 'Personalized 1-on-1 Learning', s: 'Every student gets individual attention and guidance.' },
        { h: 'Male & Female Tutors', s: 'Choose a tutor according to your preference.' },
        { h: 'Flexible Scheduling', s: 'Learn at a time that fits your daily routine.' },
        { h: 'Learn From Anywhere', s: 'Join classes from Pakistan or anywhere in the world.' },
        { h: 'Monthly Progress Reports', s: 'Track your growth and celebrate your achievements.' },
        { h: 'Classes for All Ages', s: 'Programs for kids, teenagers, adults and seniors.' },
      ],
    },
    howItWorks: {
      heading: 'Start Learning in 3 Simple Steps',
      step1h: '01 — Tell Us About Yourself',
      step1s: 'Fill out the short enrollment/trial form.',
      step2h: '02 — Assessment & Tutor Matching',
      step2s: 'Our team understands your goals, current level, preferred tutor and schedule.',
      step3h: '03 — Start Learning',
      step3s: 'Attend your personalized 1-on-1 online Quran classes.',
      cta: 'Book a Free Trial →',
    },
    ladies: {
      badge: 'Ladies Special',
      heading: 'A Comfortable Learning Environment for Sisters',
      sub: 'Learn Quran, Tajweed, Hifz and Islamic studies privately with dedicated female tutors.',
      features: ['Female tutors', 'Private 1-on-1 classes', 'Flexible scheduling', 'Online from home'],
      cta: 'Explore Ladies Classes →',
    },
    global: {
      heading: 'Learn Quran From Anywhere',
      sub: 'Wherever you are, your Quran learning journey can continue from home.',
      card1h: 'Flexible Online Classes',
      card1s: 'Allow students to learn regardless of their location or schedule.',
      card2h: 'Stable Online Experience',
      card2s: 'Zoom or similar platform. No special software required.',
      card3h: '24/7 Scheduling',
      card3s: 'Book your classes across any timezone, any day.',
      studentLocations: 'Student Locations',
    },
    testimonials: {
      heading: 'What Our Students & Parents Say',
      items: [
        {
          text: 'My daughter has improved her Quran reading significantly in just two months. The female tutor is very patient and knowledgeable. Highly recommend!',
          name: 'Fatima R.',
          role: 'Parent',
          country: 'UK',
          flag: '🇬🇧',
        },
        {
          text: 'As an adult beginner, I was nervous to start learning. The team matched me with a wonderful teacher who made the process easy and enjoyable.',
          name: 'Omar K.',
          role: 'Student',
          country: 'Canada',
          flag: '🇨🇦',
        },
        {
          text: 'The progress reports every month are amazing — I can see exactly where my son is improving. The Tajweed classes have been a blessing.',
          name: 'Zainab A.',
          role: 'Parent',
          country: 'UAE',
          flag: '🇦🇪',
        },
        {
          text: 'Flexible timings made it possible for me to learn Quran while managing my work schedule. I never thought I could reach this level at my age.',
          name: 'Tariq M.',
          role: 'Student',
          country: 'USA',
          flag: '🇺🇸',
        },
      ],
    },
    faq: {
      heading: 'Frequently Asked Questions',
      viewAll: 'Have more questions? Contact Us →',
      categories: {
        Classes: 'Classes',
        Tutors: 'Tutors',
        Scheduling: 'Scheduling',
        Students: 'Students',
        Technology: 'Technology',
      },
      items: [
        {
          category: 'Classes',
          q: 'How are classes conducted?',
          a: 'Classes are conducted online via video call platforms such as Zoom. You will need a device with a camera and microphone and a stable internet connection.',
        },
        {
          category: 'Classes',
          q: 'How long is each class?',
          a: 'Each class is typically 30 to 60 minutes, depending on the course and student preference. Duration can be adjusted to suit your learning goals.',
        },
        {
          category: 'Classes',
          q: 'How many classes are there each week?',
          a: 'Most students attend 3 to 5 classes per week. The schedule is flexible and can be tailored to your availability.',
        },
        {
          category: 'Tutors',
          q: 'Can I choose a male or female tutor?',
          a: 'Yes. We offer both male and female tutors. You can specify your preference during enrollment and we will match you accordingly.',
        },
        {
          category: 'Tutors',
          q: 'What qualifications do your teachers have?',
          a: 'Our teachers are experienced Quran and Islamic studies instructors. Each teacher is assessed for their knowledge, teaching ability, and professionalism before joining our academy.',
        },
        {
          category: 'Tutors',
          q: 'Can I change my teacher?',
          a: 'Yes. If you feel a different teacher would be a better fit, simply contact our support team and we will arrange a new match at no extra cost.',
        },
        {
          category: 'Scheduling',
          q: 'Can I choose my preferred time?',
          a: 'Yes. You can choose your preferred days and times during enrollment. We offer slots across multiple time zones to accommodate students worldwide.',
        },
        {
          category: 'Scheduling',
          q: 'Can I reschedule a class?',
          a: 'Yes. Classes can be rescheduled with prior notice. Please inform your tutor or our support team at least a few hours in advance.',
        },
        {
          category: 'Scheduling',
          q: 'Can international students join?',
          a: 'Absolutely. Students from Pakistan, UK, USA, Canada, UAE, Australia and many other countries are welcome to join. Our scheduling covers all major time zones.',
        },
        {
          category: 'Students',
          q: 'Do you teach children?',
          a: 'Yes. We offer age-appropriate Quran and Islamic studies classes for children from age 4 and above, taught by experienced and patient teachers.',
        },
        {
          category: 'Students',
          q: 'Do you teach adults?',
          a: 'Yes. We welcome adult learners of all levels, from complete beginners to those looking to improve their existing knowledge.',
        },
        {
          category: 'Students',
          q: 'Can complete beginners join?',
          a: 'Absolutely. We welcome students with no prior knowledge. Our teachers will start from the very basics and build your skills at a comfortable pace.',
        },
        {
          category: 'Technology',
          q: 'What device do I need?',
          a: 'You can use a laptop, desktop, tablet or smartphone — any device with a working camera, microphone and internet connection.',
        },
        {
          category: 'Technology',
          q: 'Do I need a special application?',
          a: 'No special application is required. Classes are typically conducted via Zoom or a similar video call platform, which is free to download.',
        },
        {
          category: 'Technology',
          q: 'What internet connection is required?',
          a: 'A stable broadband or mobile data connection is sufficient. We recommend at least 5 Mbps for a smooth video call experience.',
        },
      ],
    },
    finalCta: {
      bismillah: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
      heading: 'Start Your Quran Learning Journey Today',
      sub: 'Take the first step towards better Quran reading, understanding and memorization.',
      cta1: 'Book a Trial Class',
      cta2: 'Chat on WhatsApp',
    },
    footer: {
      tagline: 'Learn • Practice • Grow',
      description: 'Providing quality Quran education to students worldwide through personalized online learning.',
      academy: 'Academy',
      support: 'Support',
      courses: 'Courses',
      legal: 'Legal',
      language: 'Language',
      about: 'About',
      coursesLink: 'Courses',
      whyUsLink: 'Why Choose Us',
      faqLink: 'FAQ',
      contactLink: 'Contact',
      whatsappLink: 'WhatsApp',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      quranReading: 'Quran Reading',
      hifz: 'Hifz',
      islamicStudies: 'Islamic Studies',
      ladiesClasses: 'Ladies Classes',
      copyright: '© 2026 Taleem ul Quran Learning. All rights reserved.',
      bottomNote: 'Designed with care for the Muslim community.',
    },
  },
  ur: {
    dir: 'rtl' as const,
    brand: {
      name: 'تعلیم القرآن',
      subDesktop: 'آن لائن لرننگ اکیڈمی',
      subMobile: 'لرننگ اکیڈمی',
    },
    nav: {
      courses: 'کورسز',
      whyUs: 'ہمیں کیوں چنیں',
      howItWorks: 'طریقہ کار',
      ladies: 'خواتین کلاسز',
      faq: 'سوالات',
      contact: 'رابطہ',
      bookTrial: 'مفت ٹرائل بک کریں',
    },
    hero: {
      badge: 'آن لائن قرآن سیکھیں • دنیا بھر میں',
      heading: 'گھر بیٹھے قرآن سیکھیں',
      subheading:
        'بچوں، بڑوں اور خواتین کے لیے ذاتی 1-on-1 قرآن کلاسز، لچکدار اوقات کے ساتھ۔',
      cta1: 'مفت ٹرائل بک کریں →',
      cta2: 'واٹس ایپ پر بات کریں',
      feat1: 'لائیو 1-on-1 کلاسز',
      feat2: 'مرد و خاتون اساتذہ',
      feat3: 'لچکدار اوقات',
      feat4: 'ماہانہ رپورٹس',
      enrolledCount: '+500',
      enrolledLabel: 'طلبا داخل شدہ',
    },
    trial: {
      heading: 'اپنا قرآن سیکھنے کا سفر شروع کریں',
      sub: 'اپنی ٹرائل کلاس بک کریں اور اپنے لیے موزوں پروگرام دریافت کریں۔',
      cta: 'مفت ٹرائل بک کریں →',
      submitting: 'ارسال ہو رہا ہے...',
      fields: {
        name: 'طالب علم کا نام',
        whatsapp: 'واٹس ایپ نمبر',
        email: 'ای میل (اختیاری)',
        country: 'ملک',
        age: 'عمر',
        course: 'کورس منتخب کریں',
        tutor: 'استاد کی ترجیح',
        time: 'پسندیدہ وقت',
      },
      placeholders: {
        name: 'احمد علی',
        whatsapp: '+92 300 0000000',
        email: 'email@example.com',
        country: 'ملک منتخب کریں',
        age: 'عمر کا گروپ منتخب کریں',
        course: 'کورس منتخب کریں',
        tutor: 'استاد کی ترجیح',
        time: 'پسندیدہ وقت',
      },
      validation: {
        required: 'لازمی',
        nameRequired: 'نام درج کرنا لازمی ہے',
        whatsappRequired: 'واٹس ایپ نمبر لازمی ہے',
        countryRequired: 'ملک منتخب کرنا لازمی ہے',
        courseRequired: 'کورس منتخب کرنا لازمی ہے',
      },
      step: 'مرحلہ',
      of: 'از',
      step1Title: 'آپ کی تفصیلات',
      step2Title: 'کلاس ترجیحات',
      next: 'اگلا',
      back: '← واپسی',
      successHeading: 'جزاک اللہ خیراً!',
      successSub:
        'آپ کا مفت ٹرائل بک ہو چکا ہے۔ ہماری ٹیم آپ کے کلاس شیڈول کی تصدیق کے لیے 24 گھنٹوں کے اندر واٹس ایپ پر رابطہ کرے گی۔',
      tutorOptions: ['مرد استاد', 'خاتون استاد', 'کوئی ترجیح نہیں'],
      courseOptions: [
        'تجوید کے ساتھ قرآن پڑھنا',
        'قرآن حفظ (حفظ)',
        'نوجوانوں اور بچوں کے لیے اسلامی تعلیمات',
        'خواتین کی خصوصی کلاسز',
      ],
      ageOptions: ['4–7 سال', '8–12 سال', '13–17 سال', '18–30 سال', '31+ سال'],
      timeOptions: ['صبح (6–12)', 'دوپہر (12–6)', 'شام (6–10)', 'لچکدار'],
      promoTitle: 'مفت ٹرائل',
      promoSub: 'بہتر قرآن سیکھنے کی طرف پہلا قدم اٹھائیں۔',
      benefits: [
        '✓ بغیر کسی پیشگی پابندی کے',
        '✓ ذاتی تعلیمی جائزہ',
        '✓ پہلے استاد سے ملاقات کریں',
        '✓ گھر بیٹھے سیکھیں',
      ],
      questions: 'کوئی سوال ہے؟ ہم سے بات کریں',
    },
    courses: {
      badge: 'ہمارے کورسز',
      heading: 'اپنے سیکھنے کے اہداف کے لیے صحیح کورس چنیں',
      sub: 'مختلف عمر اور سطح کے طلبا کے لیے خصوصی قرآن اور اسلامی تعلیمی پروگرام۔',
      items: [
        {
          title: 'تجوید کے ساتھ قرآن پڑھنا',
          desc: 'درست تلفظ، مخارج اور تجوید کے ساتھ قرآن مجید پڑھنے کی مضبوط بنیاد بنائیں۔',
          points: ['درست تلفظ', 'مخارج کی ادائیگی', 'تجوید کے قواعد', 'روانی کے ساتھ تلاوت'],
        },
        {
          title: 'قرآن حفظ (حفظ)',
          desc: 'اپنی رفتار کے مطابق ذاتی حفظ اور دہرائی کے منصوبے پر عمل کریں۔',
          points: ['حفظ کی تکنیک', 'باقاعدہ دہرائی', 'مضبوط یادداشت کی عادات'],
        },
        {
          title: 'نوجوانوں اور بچوں کے لیے اسلامی تعلیمات',
          desc: 'ضروری اسلامی معلومات، آداب، سیرت، نماز، دعائیں اور اسلامی اقدار سیکھیں۔',
          points: ['قرآنی کہانیاں اور سیرت', 'نماز اور روزمرہ دعائیں', 'اسلامی آداب', 'اچھا اخلاق'],
        },
        {
          title: 'خواتین کی خصوصی کلاسز',
          desc: 'خصوصی خاتون اساتذہ کے ساتھ نجی قرآن اور اسلامی تعلیمی سیشنز۔',
          points: ['قرآن خوانی اور تجوید', 'فقہ اور روزمرہ دعائیں', 'اسلامی تعلیمات', 'روحانی تربیت'],
        },
      ],
    },
    whyUs: {
      heading: 'ہمیں کیوں چنیں',
      sub: 'ہم ہر طالب علم کے لیے ایک محفوظ، حوصلہ افزا اور موثر تعلیمی ماحول فراہم کرنے کے لیے پرعزم ہیں۔',
      items: [
        { h: 'ذاتی 1-on-1 کلاسز', s: 'ہر طالب علم کو مکمل انفرادی توجہ اور رہنمائی ملتی ہے۔' },
        { h: 'مرد و خاتون اساتذہ', s: 'اپنی پسند اور ترجیح کے مطابق استاد کا انتخاب کریں۔' },
        { h: 'لچکدار شیڈول', s: 'اپنے روزمرہ معمول کے مطابق اپنی پسند کے وقت پر سیکھیں۔' },
        { h: 'کہیں سے بھی سیکھیں', s: 'پاکستان یا دنیا کے کسی بھی کونے سے کلاسز میں شامل ہوں۔' },
        { h: 'ماہانہ پیشرفت رپورٹ', s: 'ہر ماہ اپنی تعلیمی ترقی دیکھیں اور اہداف حاصل کریں۔' },
        { h: 'تمام عمر کے لیے کلاسز', s: 'بچوں، نوجوانوں، بڑوں اور بزرگوں کے لیے موزوں پروگرام۔' },
      ],
    },
    howItWorks: {
      heading: '3 آسان مراحل میں سیکھنا شروع کریں',
      step1h: '01 — اپنے بارے میں بتائیں',
      step1s: 'مختصر اندراج / ٹرائل فارم پُر کریں۔',
      step2h: '02 — جائزہ اور استاد کا انتخاب',
      step2s: 'ہماری ٹیم آپ کے اہداف، سطح اور پسندیدہ استاد کو سمجھے گی۔',
      step3h: '03 — سیکھنا شروع کریں',
      step3s: 'اپنی ذاتی 1-on-1 آن لائن قرآن کلاسز میں شرکت کریں۔',
      cta: 'مفت ٹرائل بک کریں →',
    },
    ladies: {
      badge: 'خواتین کے لیے خصوصی',
      heading: 'خواتین کے لیے آرام دہ تعلیمی ماحول',
      sub: 'خصوصی خاتون اساتذہ کے ساتھ قرآن، تجوید، حفظ اور اسلامی تعلیم پردے اور سہولت کے ساتھ سیکھیں۔',
      features: ['خاتون اساتذہ', 'نجی 1-on-1 کلاسز', 'لچکدار اوقات', 'گھر سے آن لائن'],
      cta: 'خواتین کلاسز دیکھیں →',
    },
    global: {
      heading: 'کہیں سے بھی قرآن سیکھیں',
      sub: 'آپ جہاں بھی ہوں، آپ کا قرآن سیکھنے کا سفر اپنے گھر کے آرام سے جاری رہ سکتا ہے۔',
      card1h: 'لچکدار آن لائن کلاسز',
      card1s: 'طلبا کو ان کے مقام یا شیڈول سے قطع نظر سیکھنے کی مکمل آزادی۔',
      card2h: 'مستحکم آن لائن نظام',
      card2s: 'زوم یا دیگر آسان پلیٹ فارمز کے ذریعے معیاری سیشنز۔',
      card3h: '24/7 شیڈولنگ',
      card3s: 'دنیا کے کسی بھی ٹائم زون میں باآسانی کلاسز بک کریں۔',
      studentLocations: 'طلبا کے مقامات',
    },
    testimonials: {
      heading: 'ہمارے طلبا اور والدین کیا کہتے ہیں',
      items: [
        {
          text: 'میری بیٹی کی قرآن پڑھنے میں صرف دو ماہ میں شاندار بہتری آئی ہے۔ خاتون معلمہ بہت صابر اور باصلاحیت ہیں۔ ہم بہت مطمئن ہیں۔',
          name: 'فاطمہ آر',
          role: 'والدہ',
          country: 'برطانیہ',
          flag: '🇬🇧',
        },
        {
          text: 'ایک بالغ مبتدی کے طور پر مجھے شروع میں جھجھک تھی۔ ٹیم نے مجھے ایک بہترین استاد سے ملایا جنہوں نے سیکھنا انتہائی آسان بنا دیا۔',
          name: 'عمر کے',
          role: 'طالب علم',
          country: 'کینیڈا',
          flag: '🇨🇦',
        },
        {
          text: 'ماہانہ پیشرفت رپورٹ بہت زبردست ہے — میں دیکھ سکتی ہوں کہ میرا بیٹا کہاں بہتر ہو رہا ہے۔ تجوید کی کلاسز واقعی رحمت ہیں۔',
          name: 'زینب اے',
          role: 'والدہ',
          country: 'متحدہ عرب امارات',
          flag: '🇦🇪',
        },
        {
          text: 'لچکدار اوقات نے ملازمت کے ساتھ قرآن سیکھنا ممکن بنا دیا۔ میں نے سوچا بھی نہیں تھا کہ میں اس عمر میں اتنی ترقی کر سکوں گا۔',
          name: 'طارق ایم',
          role: 'طالب علم',
          country: 'امریکہ',
          flag: '🇺🇸',
        },
      ],
    },
    faq: {
      heading: 'اکثر پوچھے جانے والے سوالات',
      viewAll: 'مزید سوالات ہیں؟ رابطہ کریں →',
      categories: {
        Classes: 'کلاسز',
        Tutors: 'اساتذہ',
        Scheduling: 'اوقات',
        Students: 'طلبا',
        Technology: 'ٹیکنالوجی',
      },
      items: [
        {
          category: 'Classes',
          q: 'کلاسز کیسے منعقد کی جاتی ہیں؟',
          a: 'کلاسز زوم یا دیگر ویڈیو کال پلیٹ فارمز پر آن لائن ہوتی ہیں۔ آپ کو صرف انٹرنیٹ اور کیمرہ و مائک والے ڈیوائس کی ضرورت ہوتی ہے۔',
        },
        {
          category: 'Classes',
          q: 'ہر کلاس کا دورانیہ کتنا ہوتا ہے؟',
          a: 'ہر کلاس کا دورانیہ عام طور پر 30 سے 60 منٹ ہوتا ہے، جسے طالب علم کی ترجیح کے مطابق طے کیا جاتا ہے۔',
        },
        {
          category: 'Classes',
          q: 'ہفتے میں کتنی کلاسز ہوتی ہیں؟',
          a: 'زیادہ تر طلبا ہفتے میں 3 سے 5 کلاسز لیتے ہیں۔ شیڈول مکمل طور پر آپ کی دستیابی کے مطابق ترتیب دیا جا سکتا ہے۔',
        },
        {
          category: 'Tutors',
          q: 'کیا میں مرد یا خاتون استاد کا انتخاب کر سکتا ہوں؟',
          a: 'جی ہاں، ہمارے پاس مرد اور خاتون دونوں اساتذہ موجود ہیں۔ آپ اندراج کے وقت اپنی ترجیح منتخب کر سکتے ہیں۔',
        },
        {
          category: 'Tutors',
          q: 'آپ کے اساتذہ کی کیا اہلیت ہے؟',
          a: 'ہمارے تمام اساتذہ تجربہ کار اور مستند ہیں۔ شمولیت سے قبل ان کے علم، تدریسی صلاحیت اور اخلاق کا سخت جائزہ لیا جاتا ہے۔',
        },
        {
          category: 'Tutors',
          q: 'کیا میں اپنا استاد تبدیل کر سکتا ہوں؟',
          a: 'جی ہاں، اگر آپ سمجھتے ہیں کہ کوئی دوسرا استاد زیادہ موزوں ہوگا تو ہماری سپورٹ ٹیم بغیر کسی اضافی فیس کے تبدیلی کر دے گی۔',
        },
        {
          category: 'Scheduling',
          q: 'کیا میں اپنی پسند کا وقت منتخب کر سکتا ہوں؟',
          a: 'جی ہاں، آپ اپنے پسندیدہ دن اور اوقات منتخب کر سکتے ہیں۔ ہم دنیا بھر کے مختلف ٹائم زونز کے مطابق کلاسز فراہم کرتے ہیں۔',
        },
        {
          category: 'Scheduling',
          q: 'کیا کلاس کا وقت تبدیل یا ری شیڈول کیا جا سکتا ہے؟',
          a: 'جی ہاں، پیشگی اطلاع کے ساتھ کلاس ری شیڈول کی جا سکتی ہے۔ برائے مہربانی کچھ گھنٹے قبل مطلع کریں۔',
        },
        {
          category: 'Scheduling',
          q: 'کیا بیرون ملک کے طلبا داخلہ لے سکتے ہیں؟',
          a: 'بالکل! پاکستان، برطانیہ، امریکہ، کینیڈا، متحدہ عرب امارات، آسٹریلیا اور دیگر تمام ممالک کے طلبا شامل ہو سکتے ہیں۔',
        },
        {
          category: 'Students',
          q: 'کیا آپ بچوں کو پڑھاتے ہیں؟',
          a: 'جی ہاں، 4 سال اور اس سے زائد عمر کے بچوں کے لیے خصوصی اور دلچسپ تعلیمی انداز میں پڑھایا جاتا ہے۔',
        },
        {
          category: 'Students',
          q: 'کیا بڑے بھی سیکھ سکتے ہیں؟',
          a: 'جی ہاں، ہم ہر عمر کے بالغ افراد کا خیرمقدم کرتے ہیں، چاہے وہ بالکل شروع سے سیکھ رہے ہوں یا اصلاح کرنا چاہتے ہوں۔',
        },
        {
          category: 'Students',
          q: 'کیا بالکل نئے مبتدی بھی شامل ہو سکتے ہیں؟',
          a: 'جی ہاں، جنہیں عربی حروف کا بھی علم نہ ہو، ہمارے اساتذہ بنیادی قاعدے سے نہایت صبر اور آسانی کے ساتھ آغاز کراتے ہیں۔',
        },
        {
          category: 'Technology',
          q: 'مجھے کس ڈیوائس کی ضرورت ہوگی؟',
          a: 'آپ لیپ ٹاپ، کمپیوٹر، ٹیبلیٹ یا اسمارٹ فون — کسی بھی ڈیوائس کا استعمال کر سکتے ہیں۔',
        },
        {
          category: 'Technology',
          q: 'کیا کسی خاص سافٹ ویئر کی ضرورت ہے؟',
          a: 'کسی خاص سافٹ ویئر کی ضرورت نہیں، عام طور پر زوم ایپ استعمال کی جاتی ہے جو مفت دستیاب ہے۔',
        },
        {
          category: 'Technology',
          q: 'کتنی رفتار کا انٹرنیٹ درکار ہے؟',
          a: 'ایک مستحکم براڈ بینڈ یا موبائل انٹرنیٹ کافی ہے۔ ہم معیاری ویڈیو کال کے لیے کم از کم 5 ایم بی پی ایس کی سفارش کرتے ہیں۔',
        },
      ],
    },
    finalCta: {
      bismillah: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
      heading: 'آج ہی اپنا قرآن سیکھنے کا سفر شروع کریں',
      sub: 'بہتر قرآن خوانی، فہم اور حفظ کی جانب پہلا مبارک قدم اٹھائیں۔',
      cta1: 'مفت ٹرائل کلاس بک کریں',
      cta2: 'واٹس ایپ پر رابطہ کریں',
    },
    footer: {
      tagline: 'سیکھیں • مشق کریں • ترقی کریں',
      description: 'ذاتی آن لائن کلاسز کے ذریعے دنیا بھر کے طلبا کو معیاری قرآن تعلیم کی فراہمی۔',
      academy: 'اکیڈمی',
      support: 'معاونت',
      courses: 'کورسز',
      legal: 'قانونی',
      language: 'زبان',
      about: 'ہمارے بارے میں',
      coursesLink: 'کورسز',
      whyUsLink: 'ہمیں کیوں چنیں',
      faqLink: 'سوالات',
      contactLink: 'رابطہ',
      whatsappLink: 'واٹس ایپ',
      privacyPolicy: 'رازداری کی پالیسی',
      terms: 'شرائط و ضوابط',
      quranReading: 'قرآن پڑھنا',
      hifz: 'حفظ قرآن',
      islamicStudies: 'اسلامی تعلیمات',
      ladiesClasses: 'خواتین کلاسز',
      copyright: '© 2026 تعلیم القرآن لرننگ۔ جملہ حقوق محفوظ ہیں۔',
      bottomNote: 'مسلم کمیونٹی کی خدمت کے لیے محبت سے تیار کردہ۔',
    },
  },
}

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: (typeof translations)['en']
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir
    document.documentElement.lang = lang === 'ur' ? 'ur' : 'en'
  }, [lang])

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang], dir: translations[lang].dir }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
