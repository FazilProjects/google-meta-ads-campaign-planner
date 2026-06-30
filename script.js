const objectiveData = {
  "lead-generation": {
    label: "Lead Generation",
    badges: [
      ["blue", "Search intent"],
      ["green", "Lead capture"],
      ["yellow", "Retargeting"]
    ],
    splitLabel: "60 / 30 / 10",
    primaryKpi: "Qualified leads",
    allocation: {
      google: 0.6,
      meta: 0.3,
      reserve: 0.1
    },
    googleRole: "Capture high-intent people already searching for the problem, solution, consultation, or demo.",
    metaRole: "Build demand with problem-aware creative and convert warm users through lead forms or landing page visits.",
    retargetingRole: "Retarget visitors, form openers, and engaged users with proof, urgency, and a clearer next step.",
    googleCampaignType: "Search campaign with tightly themed lead-intent ad groups.",
    metaObjective: "Leads or website conversions, depending on tracking readiness.",
    searchIntent: "Prioritize keywords that show comparison, provider selection, quote, demo, or consultation intent.",
    audienceSegments: ["Problem-aware prospects", "Decision makers", "Website visitors", "Form starters", "Lookalike lead audiences"],
    creativeAngles: ["Problem and outcome", "Free consultation or demo", "Social proof", "Fast response", "Risk reduction"],
    ctaOptions: ["Book Now", "Get Quote", "Learn More"],
    kpis: {
      ctr: "3% - 6%",
      cvr: "4% - 8%",
      cadence: "Review search terms and lead quality every 3-4 days."
    }
  },
  ecommerce: {
    label: "Ecommerce",
    badges: [
      ["green", "Purchase intent"],
      ["blue", "Product benefits"],
      ["red", "Cart retargeting"]
    ],
    splitLabel: "50 / 40 / 10",
    primaryKpi: "ROAS and sales",
    allocation: {
      google: 0.5,
      meta: 0.4,
      reserve: 0.1
    },
    googleRole: "Capture product, category, shopping, and offer-based search demand from ready buyers.",
    metaRole: "Create demand with benefit-led product creative, offer testing, and audience learning.",
    retargetingRole: "Retarget product viewers, cart abandoners, and checkout starters with proof and offer reminders.",
    googleCampaignType: "Search or shopping-intent campaign grouped by product category and buyer intent.",
    metaObjective: "Sales or website conversions with creative testing for product-market fit.",
    searchIntent: "Prioritize product, category, price, review, discount, and buy-now intent.",
    audienceSegments: ["Product viewers", "Cart abandoners", "Past customers", "Lookalike buyers", "Interest-based shoppers"],
    creativeAngles: ["Product benefit", "Offer or bundle", "Customer proof", "Problem solved", "Urgency or scarcity"],
    ctaOptions: ["Shop Now", "Learn More", "Get Offer"],
    kpis: {
      ctr: "1.5% - 3.5%",
      cvr: "2% - 4%",
      cadence: "Review spend, add-to-cart rate, checkout rate, and ROAS twice per week."
    }
  },
  "service-business": {
    label: "Service Business",
    badges: [
      ["red", "Local search"],
      ["yellow", "Trust signals"],
      ["green", "Calls and bookings"]
    ],
    splitLabel: "70 / 20 / 10",
    primaryKpi: "Booked calls",
    allocation: {
      google: 0.7,
      meta: 0.2,
      reserve: 0.1
    },
    googleRole: "Prioritize local, urgent, and provider-comparison searches from people ready to call or request a quote.",
    metaRole: "Build local awareness and trust with reviews, proof, service-area messaging, and simple contact prompts.",
    retargetingRole: "Retarget website visitors and engaged local users with review-led ads and booking reminders.",
    googleCampaignType: "Local search campaign with service-area ad groups and call/contact extensions.",
    metaObjective: "Leads, calls, or messages depending on the strongest contact path.",
    searchIntent: "Prioritize near-me, location, emergency, estimate, appointment, and provider keywords.",
    audienceSegments: ["Nearby prospects", "High-intent searchers", "Website visitors", "Engaged local users", "Repeat or referral audiences"],
    creativeAngles: ["Reviews and trust", "Fast response", "Service area", "Before and after", "Clear quote or booking"],
    ctaOptions: ["Get Quote", "Contact Us", "Book Now"],
    kpis: {
      ctr: "4% - 8%",
      cvr: "5% - 10%",
      cadence: "Review calls, form submissions, locations, and search terms twice per week."
    }
  }
};

const elements = {
  businessName: document.querySelector("#businessName"),
  businessType: document.querySelector("#businessType"),
  offer: document.querySelector("#offer"),
  targetLocation: document.querySelector("#targetLocation"),
  monthlyBudget: document.querySelector("#monthlyBudget"),
  currencyCode: document.querySelector("#currencyCode"),
  businessSummary: document.querySelector("#businessSummary"),
  objectiveSummary: document.querySelector("#objectiveSummary"),
  campaignSummary: document.querySelector("#campaignSummary"),
  splitPreview: document.querySelector("#splitPreview"),
  primaryKpiPreview: document.querySelector("#primaryKpiPreview"),
  generateReportButton: document.querySelector("#generateReportButton"),
  exportPlanButton: document.querySelector("#exportPlanButton"),
  resetPlanButton: document.querySelector("#resetPlanButton"),
  emptyReport: document.querySelector("#emptyReport"),
  generatedReport: document.querySelector("#generatedReport"),
  reportStatus: document.querySelector("#reportStatus"),
  executiveSummary: document.querySelector("#executiveSummary"),
  channelStrategy: document.querySelector("#channelStrategy"),
  googleAdsPlan: document.querySelector("#googleAdsPlan"),
  metaAdsPlan: document.querySelector("#metaAdsPlan"),
  adCopyVariations: document.querySelector("#adCopyVariations"),
  budgetAllocation: document.querySelector("#budgetAllocation"),
  funnelPlan: document.querySelector("#funnelPlan"),
  kpiTargets: document.querySelector("#kpiTargets"),
  launchPlan: document.querySelector("#launchPlan"),
  optimizationNotes: document.querySelector("#optimizationNotes")
};

let activeObjective = "lead-generation";
let currentReport = null;

function formatCurrency(value, currencyCode = "PKR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0
  }).format(value || 0);
}

function getObjective() {
  return objectiveData[activeObjective];
}

const pastedLabelPattern =
  /\b(?:business\s*name|business\s*type|offer|target\s*location|monthly\s*budget|currency|short\s*business\s*summary|business\s*summary)\s*[:\-]\s*/gi;

function cleanText(value, fallback) {
  const cleaned = String(value || "")
    .replace(/\r?\n+/g, " ")
    .replace(pastedLabelPattern, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || fallback;
}

function cleanBudget(value) {
  const cleaned = cleanText(value, "0").replace(/[^\d.]/g, "");
  return Number(cleaned) || 0;
}

function getBrief() {
  return {
    businessName: cleanText(elements.businessName.value, "the business"),
    businessType: cleanText(elements.businessType.value, "business"),
    offer: cleanText(elements.offer.value, "a clear introductory offer"),
    targetLocation: cleanText(elements.targetLocation.value, "the target market"),
    monthlyBudget: cleanBudget(elements.monthlyBudget.value),
    currencyCode: elements.currencyCode.value,
    businessSummary: cleanText(
      elements.businessSummary.value,
      "The business needs a clear paid media plan that connects audience intent, offer messaging, conversion paths, and follow-up."
    )
  };
}

function uniqueItems(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function lower(value) {
  return value.toLowerCase();
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function findCategory(text, categoryMap, fallback) {
  const match = categoryMap.find(({ terms }) => includesAny(text, terms));
  return match ? match.label : fallback;
}

function getProductCategory(brief, corpus) {
  if (brief.businessType !== "Ecommerce store") {
    return brief.businessType.toLowerCase();
  }

  return findCategory(
    corpus,
    [
      { label: "skincare products", terms: ["skincare", "skin care", "serum", "moisturizer", "cleanser"] },
      { label: "cosmetics", terms: ["cosmetic", "makeup", "lipstick", "beauty products"] },
      { label: "fashion products", terms: ["fashion", "clothing", "apparel", "dress", "shirts"] },
      { label: "shoes", terms: ["shoes", "sneakers", "footwear"] },
      { label: "electronics", terms: ["electronics", "gadgets", "mobile accessories", "headphones"] },
      { label: "home decor", terms: ["home decor", "furniture", "bedsheets", "lighting"] },
      { label: "fitness products", terms: ["fitness", "gym", "supplements", "protein"] },
      { label: "pet products", terms: ["pet", "cat", "dog", "pet supplies"] }
    ],
    "products"
  );
}

function getServiceCategory(brief, corpus) {
  if (brief.businessType !== "Local service business" && brief.businessType !== "Other business type") {
    return brief.businessType.toLowerCase();
  }

  return findCategory(
    corpus,
    [
      { label: "plumbing service", terms: ["plumbing", "plumber", "pipe repair", "leak repair"] },
      { label: "cleaning service", terms: ["home cleaning", "office cleaning", "deep cleaning", "cleaning service"] },
      { label: "AC repair service", terms: ["ac repair", "air conditioning", "hvac", "air conditioner"] },
      { label: "salon service", terms: ["salon", "haircut", "beauty salon", "spa"] },
      { label: "legal service", terms: ["lawyer", "legal", "attorney", "law firm"] },
      { label: "real estate service", terms: ["real estate", "property", "realtor", "apartments"] },
      { label: "fitness coaching", terms: ["fitness coach", "personal trainer", "gym training"] }
    ],
    "local service"
  );
}

function getIndustryProfile(brief) {
  const corpus = lower(
    `${brief.businessName} ${brief.businessType} ${brief.offer} ${brief.targetLocation} ${brief.businessSummary}`
  );
  const location = brief.targetLocation;

  if (
    includesAny(corpus, [
      "dental",
      "dentist",
      "teeth",
      "tooth",
      "oral",
      "orthodont",
      "braces",
      "root canal",
      "teeth cleaning",
      "whitening",
      "dental clinic"
    ])
  ) {
    return {
      key: "dental",
      category: "dental clinic",
      customerGroup: "patients",
      serviceFocus: "dental care",
      googleCampaignType: "Search campaign for local dental services, grouped by treatment intent.",
      googleRole: `Capture patients actively searching for dentists, dental consultations, cleaning, whitening, emergency care, and family dental services in ${location}.`,
      metaRole: `Build local trust for dental care with patient-friendly creative around comfort, hygiene, reviews, appointment availability, and the offer.`,
      searchIntent:
        "Prioritize treatment-specific and local-intent searches from people ready to book, compare clinics, or solve an urgent dental problem.",
      adGroups: ["Dental Consultation", "Teeth Cleaning", "Teeth Whitening", "Emergency Dentist", "Family Dental Care"],
      keywords: [
        "dentist near me",
        `dental clinic ${location}`,
        `teeth cleaning ${location}`,
        "teeth whitening clinic",
        `emergency dentist ${location}`,
        `family dentist ${location}`,
        "free dental consultation",
        "best dental clinic near me"
      ],
      negativeKeywords: ["jobs", "salary", "course", "free training", "DIY", "definition", "software"],
      audienceSegments: [
        `Local adults in ${location}`,
        "People interested in dental care and oral hygiene",
        "Parents looking for family dental care",
        "People interested in teeth whitening or cosmetic dental services",
        "Website visitors and engaged users"
      ],
      creativeAngles: [
        "Trusted local dentist",
        "Free dental consultation",
        "Teeth cleaning offer",
        "Comfortable family dental care",
        "Limited appointment slots"
      ],
      funnel: {
        "Landing page message": `Lead with ${brief.offer}, the clinic location, available dental services, patient comfort, and a clear appointment booking action.`,
        "Lead capture idea": "Use a short appointment form with service needed, preferred time, phone number, and optional dental concern.",
        "Follow-up recommendation": "Call or message new leads quickly with available appointment slots and the exact offer they responded to.",
        "Trust/proof elements": "Show dentist credentials, clinic photos, patient reviews, hygiene standards, treatment list, and location/contact details."
      },
      optimizationNotes: [
        "Separate urgent searches such as emergency dentist from routine searches like cleaning or whitening.",
        "Review search terms for job seekers, courses, DIY treatment searches, and unrelated medical queries.",
        "Track booked appointments and lead quality, not only form submissions."
      ]
    };
  }

  if (
    activeObjective === "ecommerce" ||
    includesAny(corpus, ["ecommerce", "e-commerce", "online store", "shop", "shopping", "product", "checkout", "cart"])
  ) {
    const productCategory = getProductCategory(brief, corpus);

    return {
      key: "ecommerce",
      category: productCategory,
      customerGroup: "shoppers",
      serviceFocus: productCategory,
      googleCampaignType: "Search campaign for product, category, offer, and buying-intent searches.",
      googleRole: `Capture shoppers searching for ${productCategory}, product comparisons, discounts, reviews, and purchase options.`,
      metaRole: "Create product demand with benefit-led creative, offer testing, social proof, and retargeting for product viewers.",
      searchIntent: "Prioritize buy-now, product comparison, discount, review, shipping, and category keywords.",
      adGroups: ["Product Category Searches", "Offer and Discount Searches", "Brand and Review Searches", "Competitor or Comparison Intent"],
      keywords: [
        `buy ${productCategory} online`,
        `best ${productCategory}`,
        `${productCategory} price`,
        `${productCategory} discount`,
        `${productCategory} reviews`,
        `${brief.offer}`,
        `${productCategory} ${location}`,
        `${brief.businessName} products`
      ],
      negativeKeywords: ["jobs", "salary", "free", "course", "manual", "repair", "definition"],
      audienceSegments: [
        "Recent product viewers",
        "Cart abandoners",
        "Past customers",
        "Lookalike buyers",
        `People interested in ${productCategory}`
      ],
      creativeAngles: ["Product benefits", "Offer or bundle", "Customer proof", "Fast delivery", "Limited-time discount"],
      funnel: {
        "Landing page message": `Lead with ${brief.offer}, product benefits, reviews, price clarity, shipping details, and a direct checkout path.`,
        "Lead capture idea": "Use first-order offer capture, abandoned-cart reminders, and product-interest email/SMS capture.",
        "Follow-up recommendation": "Retarget product viewers and cart starters with reviews, offer reminders, and product-specific creative.",
        "Trust/proof elements": "Show reviews, product photos, return policy, secure checkout cues, delivery expectations, and payment options."
      },
      optimizationNotes: [
        "Review product-level performance so spend does not drift toward low-margin or low-stock items.",
        "Compare add-to-cart rate, checkout rate, and purchase value before scaling.",
        "Use negative keywords and product exclusions to protect the budget from weak intent."
      ]
    };
  }

  const serviceCategory = getServiceCategory(brief, corpus);

  return {
    key: "service",
    category: serviceCategory,
    customerGroup: "local prospects",
    serviceFocus: serviceCategory,
    googleCampaignType: "Local search campaign grouped by service, quote, and provider-comparison intent.",
    googleRole: `Capture people searching for ${serviceCategory} providers, quotes, appointments, and nearby help in ${location}.`,
    metaRole: "Build local trust with service-area messaging, proof, reviews, and simple contact prompts.",
    searchIntent: "Prioritize near-me, location, quote, appointment, emergency, and provider-comparison searches.",
    adGroups: [`${serviceCategory} Near Me`, "Quote and Appointment Requests", "Reviews and Brand Searches", "Emergency or Urgent Need"],
    keywords: [
      `${serviceCategory} near me`,
      `${serviceCategory} ${location}`,
      `${serviceCategory} quote`,
      `${serviceCategory} appointment`,
      `best ${serviceCategory} ${location}`,
      `${brief.offer}`,
      `${brief.businessName} reviews`,
      `local ${serviceCategory}`
    ],
    negativeKeywords: ["jobs", "salary", "course", "free training", "DIY", "definition", "software"],
    audienceSegments: [
      `People living in ${location}`,
      `People interested in ${serviceCategory}`,
      "Recent website visitors",
      "Engaged social users",
      "Lookalike or referral audiences"
    ],
    creativeAngles: ["Reviews and trust", "Fast response", "Service-area coverage", "Clear quote or booking", "Limited availability"],
    funnel: {
      "Landing page message": `Match local search intent with ${brief.offer}, service-area clarity, reviews, and a direct quote or booking action.`,
      "Lead capture idea": "Use a short quote, booking, call, or contact form with only the fields needed for fast follow-up.",
      "Follow-up recommendation": "Respond quickly by phone, message, or email and reference the exact service request.",
      "Trust/proof elements": "Use reviews, certifications, before-and-after proof, local experience, and service guarantees."
    },
    optimizationNotes: [
      "Review search terms for location mismatch, DIY searches, and job-seeker traffic.",
      "Track calls and form quality, not just raw lead volume.",
      "Use reviews and response speed as campaign assets because trust often decides local service conversions."
    ]
  };
}

function getBudget(brief, data) {
  const budget = brief.monthlyBudget;
  const google = budget * data.allocation.google;
  const meta = budget * data.allocation.meta;
  const reserve = budget * data.allocation.reserve;
  const daily = budget / 30;

  return {
    monthly: budget,
    google,
    meta,
    reserve,
    daily
  };
}

function getKeywordIdeas(profile) {
  return uniqueItems(profile.keywords);
}

function getNegativeKeywords(profile) {
  return uniqueItems(profile.negativeKeywords);
}

function getAdGroups(profile) {
  return profile.adGroups;
}

function getAdCopy(brief, data, profile) {
  const name = brief.businessName;
  const offer = brief.offer;
  const location = brief.targetLocation;
  const ctas = data.ctaOptions;

  if (profile.key === "dental") {
    return [
      {
        headline: `Need a trusted dentist in ${location}?`,
        primaryText: `Book a free dental consultation with ${name}. Friendly care, clear guidance, and convenient appointment options in ${location}.`,
        cta: "Book Now"
      },
      {
        headline: `${offer}`,
        primaryText: `Keep your smile healthy with dental care that feels simple and reassuring. Limited appointment slots available this week.`,
        cta: "Get Offer"
      },
      {
        headline: `Family dental care in ${location}`,
        primaryText: `From teeth cleaning to whitening and urgent dental concerns, ${name} helps patients choose the right next step with confidence.`,
        cta: "Contact Us"
      }
    ];
  }

  if (activeObjective === "ecommerce") {
    return [
      {
        headline: `${offer} from ${name}`,
        primaryText: `Shop ${profile.serviceFocus} from ${name} and enjoy a clear offer, simple checkout, and product benefits that are easy to compare.`,
        cta: ctas[0]
      },
      {
        headline: `Looking for ${profile.serviceFocus}?`,
        primaryText: `Find the right option, check the offer, and complete your order without a complicated buying process.`,
        cta: ctas[0]
      },
      {
        headline: `Limited-time offer available`,
        primaryText: `${offer}. Browse products, compare details, and take advantage before the offer changes.`,
        cta: ctas[2]
      }
    ];
  }

  if (activeObjective === "service-business") {
    return [
      {
        headline: `${offer} in ${location}`,
        primaryText: `Need reliable ${profile.serviceFocus} in ${location}? Contact ${name} for clear service details and a simple next step.`,
        cta: ctas[0]
      },
      {
        headline: `Local help from ${name}`,
        primaryText: `Get support from a local team that makes it easy to ask questions, compare options, and request service.`,
        cta: ctas[1]
      },
      {
        headline: `Book with confidence`,
        primaryText: `See why local customers choose ${name}. Appointment availability may be limited this week.`,
        cta: ctas[2]
      }
    ];
  }

  return [
    {
      headline: `${offer} from ${name}`,
      primaryText: `Get clear guidance from ${name} and take the next step without pressure. The offer is designed to make starting easier.`,
      cta: ctas[0]
    },
    {
      headline: `Need help in ${location}?`,
      primaryText: `${name} helps customers compare options, understand the offer, and choose a simple next step.`,
      cta: ctas[2]
    },
    {
      headline: `Start with ${offer}`,
      primaryText: `Ask questions, review your options, and see whether ${name} is the right fit for what you need.`,
      cta: ctas[1]
    }
  ];
}

function getFunnelPlan(profile) {
  return profile.funnel;
}

function getLaunchPlan() {
  return [
    ["Day 1", "Finalize campaign objective, conversion action, budget split, offer wording, and landing page message."],
    ["Day 2", "Build Google Ads campaign structure, ad groups, starter keywords, negative keywords, and tracking notes."],
    ["Day 3", "Build Meta Ads campaign structure, audience segments, creative angles, and retargeting audiences."],
    ["Day 4", "Write ad variations, check policy fit, align CTA language, and prepare creative assets."],
    ["Day 5", "Review landing page funnel, form or checkout path, follow-up process, and trust elements."],
    ["Day 6", "Set daily budgets, launch tests, confirm UTMs, and document baseline KPI targets."],
    ["Day 7", "Review early signals, search terms, spend pacing, CTR, CPC, and conversion path issues before scaling."]
  ];
}

function getOptimizationNotes(profile) {
  return profile.optimizationNotes;
}

function getKpiTargets(brief, data, profile, budget) {
  const dailyBudget = Math.max(budget.daily, 1);
  const format = (value) => formatCurrency(value, brief.currencyCode);
  const cpcRange =
    profile.key === "dental" || profile.key === "service"
      ? `${format(dailyBudget * 0.04)} - ${format(dailyBudget * 0.12)}`
      : `${format(dailyBudget * 0.02)} - ${format(dailyBudget * 0.08)}`;
  const cpaRange =
    profile.key === "ecommerce"
      ? `${format(dailyBudget * 0.25)} - ${format(dailyBudget * 1.1)}`
      : `${format(dailyBudget * 0.45)} - ${format(dailyBudget * 1.6)}`;

  if (profile.key === "dental") {
    return {
      "CTR target": "4% - 8%",
      "CPC estimate": cpcRange,
      "CPA target": cpaRange,
      "Conversion rate estimate": "5% - 10%",
      "Review cadence": "Review search terms, booked appointments, and missed-call follow-up twice per week."
    };
  }

  return {
    "CTR target": data.kpis.ctr,
    "CPC estimate": cpcRange,
    "CPA target": cpaRange,
    "Conversion rate estimate": data.kpis.cvr,
    "Review cadence": data.kpis.cadence
  };
}

function buildReport() {
  const brief = getBrief();
  const data = getObjective();
  const profile = getIndustryProfile(brief);
  const budget = getBudget(brief, data);
  const keywordIdeas = getKeywordIdeas(profile);
  const negativeKeywords = getNegativeKeywords(profile);
  const adGroups = getAdGroups(profile);
  const adCopy = getAdCopy(brief, data, profile);
  const funnelPlan = getFunnelPlan(profile);
  const kpiTargets = getKpiTargets(brief, data, profile, budget);
  const metaFocus =
    profile.key === "ecommerce"
      ? "build product demand, test benefit-led creative, and retarget product viewers"
      : "build local trust, explain the offer, and retarget warm visitors";
  const trackingFocus =
    profile.key === "ecommerce"
      ? "checkout and purchase tracking"
      : profile.key === "dental"
        ? "appointment and call tracking"
        : "lead quality and follow-up tracking";

  return {
    meta: {
      generatedAt: new Date().toLocaleString(),
      note: "Generated locally with JavaScript for portfolio campaign planning. No external APIs or ad accounts are connected."
    },
    brief,
    objective: data.label,
    industryCategory: profile.category,
    executiveSummary: `${brief.businessName} should launch a focused ${data.label.toLowerCase()} campaign for its ${profile.category} audience in ${brief.targetLocation}, centered on the offer: ${brief.offer}. Google Ads should capture people already searching for ${profile.serviceFocus}, while Meta Ads should ${metaFocus}. With a monthly budget of ${formatCurrency(brief.monthlyBudget, brief.currencyCode)}, the plan should start with controlled testing, clear ${trackingFocus}, and weekly decisions based on cost, conversion quality, and follow-up outcomes.`,
    channelStrategy: {
      "Google Ads role": profile.googleRole,
      "Meta Ads role": profile.metaRole,
      "Retargeting role": data.retargetingRole,
      "Budget reasoning": `${data.splitLabel} allocation applies to the selected ${brief.currencyCode} budget. Google Ads receives the strongest share because search intent is usually closest to ${data.primaryKpi.toLowerCase()}, while Meta Ads supports trust-building and retargeting, and 10% stays reserved for testing.`
    },
    googleAdsPlan: {
      "Recommended campaign type": profile.googleCampaignType,
      "Suggested ad groups": adGroups,
      "Suggested keywords": keywordIdeas,
      "Negative keywords": negativeKeywords,
      "Search intent notes": profile.searchIntent
    },
    metaAdsPlan: {
      "Recommended objective": data.metaObjective,
      "Audience segments": profile.audienceSegments,
      "Creative angles": profile.creativeAngles,
      "Retargeting idea": `Retarget people who visited the page, engaged with ads, or showed interest in ${brief.offer}, then use proof and a lower-friction CTA.`
    },
    adCopy,
    budget: {
      googleAds: budget.google,
      metaAds: budget.meta,
      testingReserve: budget.reserve,
      dailyBudget: budget.daily
    },
    funnelPlan,
    kpiTargets,
    launchPlan: getLaunchPlan(),
    optimizationNotes: getOptimizationNotes(profile)
  };
}

function renderBadges() {
  const data = getObjective();
  elements.objectiveSummary.innerHTML = data.badges
    .map(([color, label]) => `<span class="badge ${color}">${label}</span>`)
    .join("");
  elements.splitPreview.textContent = data.splitLabel;
  elements.primaryKpiPreview.textContent = data.primaryKpi;
  elements.campaignSummary.textContent = `${data.label} mode is selected. Generate a report to create local strategy suggestions, budget math, copy variations, and launch planning.`;
}

function renderKeyValueCards(container, items) {
  container.innerHTML = "";

  Object.entries(items).forEach(([title, value]) => {
    const card = document.createElement("div");
    const heading = document.createElement("strong");
    const body = document.createElement(Array.isArray(value) ? "ul" : "p");

    heading.textContent = title;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        body.appendChild(li);
      });
    } else {
      body.textContent = value;
    }

    card.append(heading, body);
    container.appendChild(card);
  });
}

function renderAdCopy(variations) {
  elements.adCopyVariations.innerHTML = "";

  variations.forEach((variation, index) => {
    const card = document.createElement("div");
    const label = document.createElement("span");
    const headline = document.createElement("strong");
    const primaryText = document.createElement("p");
    const cta = document.createElement("span");

    card.className = "ad-card";
    label.className = "ad-label";
    cta.className = "badge blue";

    label.textContent = `Variation ${index + 1}`;
    headline.textContent = variation.headline;
    primaryText.textContent = variation.primaryText;
    cta.textContent = variation.cta;

    card.append(label, headline, primaryText, cta);
    elements.adCopyVariations.appendChild(card);
  });
}

function renderBudget(budget, currencyCode) {
  elements.budgetAllocation.innerHTML = `
    <div><span>Google Ads</span><strong>${formatCurrency(budget.googleAds, currencyCode)}</strong></div>
    <div><span>Meta Ads</span><strong>${formatCurrency(budget.metaAds, currencyCode)}</strong></div>
    <div><span>Testing Reserve</span><strong>${formatCurrency(budget.testingReserve, currencyCode)}</strong></div>
    <div><span>Daily Budget Estimate</span><strong>${formatCurrency(budget.dailyBudget, currencyCode)}</strong></div>
  `;
}

function renderKpis(kpis) {
  elements.kpiTargets.innerHTML = "";

  Object.entries(kpis).forEach(([metric, value]) => {
    const card = document.createElement("div");
    const label = document.createElement("span");
    const result = document.createElement("strong");

    label.textContent = metric;
    result.textContent = value;
    card.append(label, result);
    elements.kpiTargets.appendChild(card);
  });
}

function renderLaunchPlan(days) {
  elements.launchPlan.innerHTML = "";

  days.forEach(([day, task]) => {
    const item = document.createElement("div");
    const label = document.createElement("strong");
    const description = document.createElement("span");

    label.textContent = day;
    description.textContent = task;
    item.append(label, description);
    elements.launchPlan.appendChild(item);
  });
}

function renderList(container, items) {
  container.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderReport(report) {
  elements.executiveSummary.textContent = report.executiveSummary;
  renderKeyValueCards(elements.channelStrategy, report.channelStrategy);
  renderKeyValueCards(elements.googleAdsPlan, report.googleAdsPlan);
  renderKeyValueCards(elements.metaAdsPlan, report.metaAdsPlan);
  renderAdCopy(report.adCopy);
  renderBudget(report.budget, report.brief.currencyCode);
  renderKeyValueCards(elements.funnelPlan, report.funnelPlan);
  renderKpis(report.kpiTargets);
  renderLaunchPlan(report.launchPlan);
  renderList(elements.optimizationNotes, report.optimizationNotes);

  elements.emptyReport.classList.add("is-hidden");
  elements.generatedReport.classList.remove("is-hidden");
  elements.reportStatus.textContent = `Generated: ${report.objective}`;
  elements.campaignSummary.textContent = report.executiveSummary;
}

function generateCampaignReport() {
  currentReport = buildReport();
  renderReport(currentReport);
  showToast("Campaign report generated");
}

function markReportNeedsUpdate() {
  if (!currentReport) {
    return;
  }

  currentReport = null;
  elements.generatedReport.classList.add("is-hidden");
  elements.emptyReport.classList.remove("is-hidden");
  elements.emptyReport.innerHTML = `
    <strong>Brief changed. Generate an updated campaign report.</strong>
    <p>The previous report has been cleared so the next export or generated view uses the latest brief, objective, budget, and offer details.</p>
  `;
  elements.reportStatus.textContent = "Needs regeneration";
}

function linesForKeyValue(title, items) {
  const lines = title ? [`${title}`] : [];

  Object.entries(items).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach((item) => lines.push(`- ${item}`));
    } else {
      lines.push(`${key}: ${value}`);
    }
  });

  return lines.join("\n");
}

function formatReport(report) {
  const copyLines = report.adCopy
    .map(
      (variation, index) =>
        `Variation ${index + 1}\nHeadline: ${variation.headline}\nPrimary text: ${variation.primaryText}\nCTA: ${variation.cta}`
    )
    .join("\n\n");

  const launchLines = report.launchPlan.map(([day, task]) => `${day}: ${task}`).join("\n");
  const optimizationLines = report.optimizationNotes.map((note) => `- ${note}`).join("\n");

  return `Google & Meta Ads Campaign Report
Portfolio planning dashboard by Fazil Waseem
${report.meta.note}
Generated: ${report.meta.generatedAt}

Business Brief
Business name: ${report.brief.businessName}
Business type: ${report.brief.businessType}
Detected category: ${report.industryCategory}
Offer: ${report.brief.offer}
Target location: ${report.brief.targetLocation}
Monthly budget: ${formatCurrency(report.brief.monthlyBudget, report.brief.currencyCode)}
Currency: ${report.brief.currencyCode}
Campaign objective: ${report.objective}
Business summary: ${report.brief.businessSummary}

A. Executive Summary
${report.executiveSummary}

B. Recommended Channel Strategy
${linesForKeyValue("", report.channelStrategy)}

C. Google Ads Plan
${linesForKeyValue("", report.googleAdsPlan)}

D. Meta Ads Plan
${linesForKeyValue("", report.metaAdsPlan)}

E. Ad Copy Variations
${copyLines}

F. Budget Allocation
Google Ads amount: ${formatCurrency(report.budget.googleAds, report.brief.currencyCode)}
Meta Ads amount: ${formatCurrency(report.budget.metaAds, report.brief.currencyCode)}
Testing reserve: ${formatCurrency(report.budget.testingReserve, report.brief.currencyCode)}
Daily budget estimate: ${formatCurrency(report.budget.dailyBudget, report.brief.currencyCode)}

G. Funnel & Landing Page Plan
${linesForKeyValue("", report.funnelPlan)}

H. KPI Targets
${linesForKeyValue("", report.kpiTargets)}

I. 7-Day Launch Plan
${launchLines}

Optimization Notes
${optimizationLines}
`;
}

function exportReport() {
  if (!currentReport) {
    currentReport = buildReport();
    renderReport(currentReport);
  }

  const file = new Blob([formatReport(currentReport)], {
    type: "text/plain"
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = "campaign-report.txt";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Campaign report exported");
}

function resetDashboard() {
  document.querySelector("#plannerForm").reset();
  activeObjective = "lead-generation";
  currentReport = null;

  document.querySelectorAll(".segment").forEach((button) => {
    const isActive = button.dataset.objective === activeObjective;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderBadges();
  elements.emptyReport.classList.remove("is-hidden");
  elements.emptyReport.innerHTML = `
    <strong>No campaign report generated yet.</strong>
    <p>Fill in the short business brief and click Generate Campaign Report to create a complete local planning report with channel strategy, keywords, ad copy, budget allocation, funnel planning, KPI targets, and a 7-day launch plan.</p>
  `;
  elements.generatedReport.classList.add("is-hidden");
  elements.reportStatus.textContent = "Waiting for brief";
  showToast("Dashboard reset");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2400);
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    activeObjective = button.dataset.objective;
    document.querySelectorAll(".segment").forEach((segment) => {
      const isActive = segment.dataset.objective === activeObjective;
      segment.classList.toggle("active", isActive);
      segment.setAttribute("aria-pressed", String(isActive));
    });
    renderBadges();
    markReportNeedsUpdate();
  });
});

[
  elements.businessName,
  elements.businessType,
  elements.offer,
  elements.targetLocation,
  elements.monthlyBudget,
  elements.currencyCode,
  elements.businessSummary
].forEach((field) => {
  field.addEventListener("input", markReportNeedsUpdate);
  field.addEventListener("change", markReportNeedsUpdate);
});

elements.generateReportButton.addEventListener("click", generateCampaignReport);
elements.exportPlanButton.addEventListener("click", exportReport);
elements.resetPlanButton.addEventListener("click", resetDashboard);

renderBadges();
