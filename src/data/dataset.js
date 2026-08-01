// =============================================================================
// Illicit Crypto Flow Monitor — Dataset
// -----------------------------------------------------------------------------
// All records are derived from PUBLIC reporting by U.S. government agencies
// (Treasury/OFAC, finCEN, DOJ, FBI) and from published research by blockchain
// analytics firms (TRM Labs, Chainalysis, Elliptic) and reputable press.
//
// Every USD figure is a PUBLICLY REPORTED ESTIMATE by the cited organization;
// it is NOT independently audited. Where two firms disagree, both are listed.
// Wallet addresses are included only where printed verbatim in a primary
// OFAC/Treasury release; otherwise flagged as "verify against SDN entry".
// =============================================================================

import { COORDS } from "./coordinates.js";

// ---- Sources master --------------------------------------------------------
export const sources = [
  // U.S. Government — Treasury / OFAC
  { id: "treasury_jy0701", org: "U.S. Treasury / OFAC", title: "U.S. Treasury Sanctions the Virtual Currency Exchange Garantex and Hydra Market (Apr 5, 2022)", url: "https://home.treasury.gov/news/press-releases/jy0701" },
  { id: "treasury_sb0225", org: "U.S. Treasury / OFAC", title: "Treasury Sanctions Russia-Based Garantex, Successors (Mar 6, 2025)", url: "https://home.treasury.gov/news/press-releases/sb0225" },
  { id: "treasury_jy0471", org: "U.S. Treasury / OFAC", title: "Treasury Sanctions Cryptocurrency Exchange Chatex and Sodinokibi (Nov 8, 2021)", url: "https://home.treasury.gov/news/press-releases/jy0471" },
  { id: "treasury_jy1193", org: "U.S. Treasury / OFAC", title: "U.S. Treasury and FinCEN Take Action Against Bitzlato (Jan 18, 2023)", url: "https://home.treasury.gov/news/press-releases/jy1193" },
  { id: "treasury_jy1874", org: "U.S. Treasury / OFAC", title: "Treasury Sanctions Money Launderer Ekaterina Zhdanova (Nov 3, 2023)", url: "https://home.treasury.gov/news/press-releases/jy1874" },
  { id: "treasury_jy0768", org: "U.S. Treasury / OFAC", title: "First-Ever OFAC Sanction of a Virtual Currency Mixer (Blender.io, May 6, 2022)", url: "https://home.treasury.gov/news/press-releases/jy0768" },
  { id: "treasury_jy1087", org: "U.S. Treasury / OFAC", title: "Treasury Sanctions North Korean Cyber Groups (Lazarus/APT38, Sep 13, 2019)", url: "https://home.treasury.gov/news/press-releases/jy1087" },
  { id: "treasury_jy1933", org: "U.S. Treasury / OFAC", title: "U.S. Treasury Sanctions Virtual Currency Mixer Sinbad.io (Nov 29, 2023)", url: "https://home.treasury.gov/news/press-releases/jy1933" },
  { id: "treasury_sm556", org: "U.S. Treasury / OFAC", title: "First OFAC Digital-Currency Address Designation — SamSam (Nov 28, 2018)", url: "https://home.treasury.gov/news/press-releases/sm556" },
  { id: "treasury_sb0519", org: "U.S. Treasury / OFAC", title: "Iran Designations — Nobitex, Wallex, Bitpin, Ramzinex (Jun 2, 2026)", url: "https://home.treasury.gov/news/press-releases/sb0519" },
  { id: "treasury_sb0248", org: "U.S. Treasury / OFAC", title: "IRGC-QF / Hizballah Facilitator Network Designation (Sep 16, 2025)", url: "https://home.treasury.gov/news/press-releases/sb0248" },

  // finCEN
  { id: "fincen_bitzlato", org: "finCEN", title: "FinCEN Identifies Bitzlato as Primary Money Laundering Concern — §9714(a) (Jan 18, 2023)", url: "https://www.fincen.gov/news/news-releases/fincen-identifies-virtual-currency-exchange-bitzlato-primary-money-laundering" },
  { id: "fincen_irgc", org: "finCEN", title: "FinCEN Alert — IRGC Money Laundering via Front Companies, Shadow Fleets & Digital Assets (May 2026)", url: "https://www.fincen.gov/news/news-releases/fincen-issues-alert-stop-money-laundering-iranian-revolutionary-guard-corps" },

  // DOJ / FBI
  { id: "doj_garantex", org: "U.S. DOJ", title: "Garantex Exchange Disrupted in International Operation (Mar 2025)", url: "https://www.justice.gov/opa/pr/garantex-cryptocurrency-exchange-disrupted-international-operation" },
  { id: "fbi_ronin", org: "FBI", title: "FBI Statement on DPRK Attribution — Ronin Bridge / Sky Mavis (Apr 2022)", url: "https://www.fbi.gov/news/press-releases/fbi-statement-on-attribution-of-malicious-cyber-activity-posed-by-the-democratic-peoples-republic-of-korea" },
  { id: "fbi_harmony", org: "FBI", title: "FBI Confirms Lazarus / APT38 for Harmony Horizon Bridge Theft (Jan 2023)", url: "https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft" },
  { id: "fbi_stake", org: "FBI", title: "FBI Identifies Lazarus / TraderTraitor for Stake.com Theft (Sep 2023)", url: "https://www.fbi.gov/news/press-releases/fbi-identifies-lazarus-group-cyber-actors-as-responsible-for-theft-of-41-million-from-stakecom" },
  { id: "ic3_bybit", org: "FBI / IC3", title: "IC3 PSA — DPRK TraderTraitor Behind Bybit Theft (Feb 26, 2025)", url: "https://www.ic3.gov/psa/2025/psa250226" },

  // TRM Labs
  { id: "trm_garantex", org: "TRM Labs", title: "The Takedown of Garantex — A Notorious Crypto Exchange's Role in Illicit Finance", url: "https://www.trmlabs.com/resources/blog/the-takedown-of-garantex-a-notorious-crypto-exchanges-role-in-illicit-finance" },
  { id: "trm_zedcex", org: "TRM Labs", title: "How Two UK-Registered Companies Moved Over $1B in Stablecoins for the IRGC", url: "https://www.trmlabs.com/resources/blog/how-two-uk-registered-companies-moved-over-a-billion-in-stablecoins-for-the-irgc" },
  { id: "trm_coinex", org: "TRM Labs", title: "How CoinEx Became Iran's Primary Gateway to Global Crypto Markets", url: "https://www.trmlabs.com/resources/blog/how-coinex-became-irans-primary-gateway-to-global-cryptocurrency-markets" },
  { id: "trm_cbi", org: "TRM Labs", title: "OFAC Sanctions Crypto Addresses Linked to the Central Bank of Iran — Freezes $344M", url: "https://www.trmlabs.com/resources/blog/ofac-sanctions-crypto-addresses-associated-with-the-central-bank-of-iran-freezes-usd-344-million" },
  { id: "trm_houthis", org: "TRM Labs", title: "From UAVs to Sanctions Evasion — How the Houthis Use Crypto", url: "https://www.trmlabs.com/resources/blog/from-uavs-to-sanctions-evasion-how-the-houthis-use-crypto" },
  { id: "trm_dprk", org: "TRM Labs", title: "Inside North Korea's Crypto Heists", url: "https://www.trmlabs.com/resources/blog/inside-north-koreas-crypto-heists" },
  { id: "trm_2026ccr", org: "TRM Labs", title: "TRM Labs 2026 Crypto Crime Report", url: "https://www.trmlabs.com/reports-and-whitepapers/2026-crypto-crime-report" },
  { id: "trm_2025ccr", org: "TRM Labs", title: "TRM Labs 2025 Crypto Crime Report", url: "https://www.trmlabs.com/reports-and-whitepapers/2025-crypto-crime-report" },
  { id: "trm_sanctioned24", org: "TRM Labs", title: "Sanctioned Entities Continued to Drive Illicit Crypto Volume in 2024", url: "https://www.trmlabs.com/resources/blog/category-deep-dive-sanctioned-entities-continued-to-drive-illicit-crypto-volume-in-2024" },

  // Chainalysis
  { id: "chain_hydra_garantex", org: "Chainalysis", title: "Chainalysis — Hydra & Garantex OFAC Sanctions", url: "https://www.chainalysis.com/blog/hydra-garantex-ofac-sanctions-russia/" },
  { id: "chain_suex", org: "Chainalysis", title: "Chainalysis — OFAC Sanction of Suex (Sep 2021)", url: "https://www.chainalysis.com/blog/ofac-sanction-suex-september-2021/" },
  { id: "chain_chatex", org: "Chainalysis", title: "Chainalysis — OFAC Sanction of Chatex (Nov 2021)", url: "https://www.chainalysis.com/blog/ofac-sanction-chatex-revil-sodinokibi-november-2021/" },
  { id: "chain_tornado", org: "Chainalysis", title: "Chainalysis — Tornado Cash OFAC Designation", url: "https://www.chainalysis.com/blog/tornado-cash-ofac-designation-sanctions/" },
  { id: "chain_sinbad", org: "Chainalysis", title: "Chainalysis — Crypto Mixer Sinbad Sanctioned (Nov 2023)", url: "https://www.chainalysis.com/blog/crypto-mixer-sinbad-sactioned-north-korean-laundering/" },
  { id: "chain_hack2025", org: "Chainalysis", title: "Chainalysis — Crypto Hacking / Stolen Funds 2025", url: "https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2025/" },
  { id: "chain_hack2026", org: "Chainalysis", title: "Chainalysis — Crypto Hacking / Stolen Funds 2026", url: "https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/" },
  { id: "chain_hack2022", org: "Chainalysis", title: "Chainalysis — 2022 Biggest Year Ever for Crypto Hacking", url: "https://www.chainalysis.com/blog/2022-biggest-year-ever-for-crypto-hacking/" },
  { id: "chain_sanctions2026", org: "Chainalysis", title: "Chainalysis — Crypto Sanctions 2026", url: "https://www.chainalysis.com/blog/crypto-sanctions-2026/" },
  { id: "chain_cbi", org: "Chainalysis", title: "Chainalysis — OFAC Sanctions Iran Central Bank Crypto Wallets", url: "https://www.chainalysis.com/blog/ofac-sanctions-iran-central-bank-crypto-wallets-freezing-131m-in-stablecoins/" },
  { id: "chain_zedcex", org: "Chainalysis", title: "Chainalysis — OFAC Designates Iranian Crypto Exchanges (Jan 2026)", url: "https://www.chainalysis.com/blog/ofac-designates-iranian-crypto-exchanges-january-2026/" },
  { id: "chain_zhdanova", org: "Chainalysis", title: "Chainalysis — OFAC Russia Crypto Money Laundering Sanctions (2023)", url: "https://www.chainalysis.com/blog/ofac-russia-crypto-money-laundering-sanctions-2023/" },

  // Elliptic
  { id: "ellip_nobitex", org: "Elliptic", title: "Elliptic — OFAC Sanctions Nobitex and Three Other Iranian Exchanges", url: "https://www.elliptic.co/blog/ofac-sanctions-nobitex-and-three-other-iranian-cryptoasset-exchanges" },
  { id: "ellip_blender", org: "Elliptic", title: "Elliptic — OFAC Sanctions Virtual Asset Mixer (Blender.io)", url: "https://www.elliptic.co/blog/ofac-sanctions-virtual-asset-mixer-for-the-first-time-to-combat-north-koreas-lazarus-group" },
  { id: "ellip_sb0248", org: "Elliptic", title: "Elliptic — IRGC-QF Facilitators: Seven Crypto Addresses Listed", url: "https://www.elliptic.co/blog/ofac-sanctions-financial-facilitators-front-companies-for-supporting-iran-in-evading-sanctions-seven-crypto-addresses-listed" },

  // Press
  { id: "reuters_nobitex", org: "Reuters", title: "Reuters — US Sanctions Iran's Largest Crypto Exchange Over IRGC Links", url: "https://www.reuters.com/world/middle-east/us-sanctions-irans-largest-crypto-exchange-over-irgc-links-2026-06-02/" },
  { id: "reuters_lazarus", org: "Reuters", title: "Reuters — NK Hackers Sent Stolen Crypto to Wallet Used by Asian Payment Firm (Jul 2024)", url: "https://www.reuters.com/technology/cybersecurity/north-korean-hackers-sent-stolen-crypto-wallet-used-by-asian-payment-firm-2024-07-15/" },
];

// ---- Entities --------------------------------------------------------------
// `usdFigures` is an array so multiple, possibly conflicting, public estimates
// can coexist with their org attribution and year.
export const entities = [
  // ============================ RUSSIA ============================
  {
    id: "garantex",
    name: "Garantex Europe OÜ",
    type: "exchange",
    actor: "RUS",
    coord: "MOSCOW_RU",
    jurisdiction: "Estonia (reg.) / Russia (ops)",
    designationDate: "2022-04-05",
    authority: "E.O. 14024 (Russian Federation financial services sector)",
    usdFigures: [
      { value: 100000000000, context: "Post-designation transfer volume", year: 2025, sourceId: "trm_garantex" },
      { value: 645000000, context: "Illicit / high-risk inflows (2019–2021)", year: 2021, sourceId: "chain_hydra_garantex" },
      { value: 100000000, context: "Treasury-cited illicit transactions", year: 2022, sourceId: "treasury_jy0701" },
      { value: 26000000, context: "Frozen in Mar 2025 international takedown", year: 2025, sourceId: "doj_garantex" },
    ],
    primarySourceId: "treasury_jy0701",
    walletAddresses: [],
    notes: "Originally Estonian-registered; bulk of operations in Moscow (Federation Tower) and St. Petersburg. >70% of volume to/from sanctioned jurisdictions (TRM). Successor Grinex designated Mar 2025.",
  },
  {
    id: "grinex",
    name: "Grinex",
    type: "exchange",
    actor: "RUS",
    coord: "MOSCOW_RU",
    jurisdiction: "Russia",
    designationDate: "2025-03-06",
    authority: "E.O. 14024",
    usdFigures: [],
    primarySourceId: "treasury_sb0225",
    walletAddresses: [],
    notes: "Garantex's successor exchange — customer base/funds migrated after the Mar 2025 takedown. Treasury cites 'facilitated the transfer of billions of dollars'.",
  },
  {
    id: "suex",
    name: "Suex OTC, S.R.O.",
    type: "exchange",
    actor: "RUS",
    coord: "PRAGUE_CZ",
    jurisdiction: "Czech Republic (reg.) / Russia (ops)",
    designationDate: "2021-09-21",
    authority: "E.O. 13694 (as amended) — cyber",
    usdFigures: [
      { value: 481000000, context: "Total Bitcoin processed since Feb 2018", year: 2021, sourceId: "chain_suex" },
      { value: 160000000, context: "From ransomware, scams, darknet actors", year: 2021, sourceId: "chain_suex" },
    ],
    primarySourceId: "chain_suex",
    walletAddresses: [],
    notes: "FIRST-EVER sanctioned crypto exchange. Czech-registered but operated from Moscow/St. Petersburg. Over 40% of known transaction history tied to illicit actors.",
  },
  {
    id: "chatex",
    name: "Chatex",
    type: "exchange",
    actor: "RUS",
    coord: "TALLINN_EE",
    jurisdiction: "Estonia / Latvia / St. Vincent & the Grenadines",
    designationDate: "2021-11-08",
    authority: "E.O. 13694 (as amended) — cyber",
    usdFigures: [],
    primarySourceId: "treasury_jy0471",
    walletAddresses: [],
    notes: "P2P exchange; facilitated transactions for ransomware actors (incl. REvil/Sodinokibi) and provided support to previously-designated Suex. 57 wallet addresses added to SDN.",
  },
  {
    id: "bitzlato",
    name: "Bitzlato Limited",
    type: "exchange",
    actor: "RUS",
    coord: "HONG_KONG",
    jurisdiction: "Hong Kong",
    designationDate: "2023-01-18",
    authority: "finCEN §9714(a) (AML Act) + OFAC",
    usdFigures: [
      { value: 700000000, context: "Crypto exchanged with Hydra Market", year: 2023, sourceId: "treasury_jy1193" },
      { value: 170600000, context: "Hydra users → Bitzlato wallets (May 2018–Apr 2022)", year: 2022, sourceId: "fincen_bitzlato" },
      { value: 15000000, context: "Ransomware proceeds received (TRM)", year: 2023, sourceId: "trm_garantex" },
    ],
    primarySourceId: "fincen_bitzlato",
    walletAddresses: [],
    notes: "First-ever use of finCEN §9714(a) 'primary money laundering concern'. Founder Anatoly Legkodymov (RU national) arrested in Miami. NOTE: finCEN did NOT publish a wallet-address list.",
  },
  {
    id: "hydra",
    name: "Hydra Market",
    type: "darknet",
    actor: "RUS",
    coord: "MOSCOW_RU",
    jurisdiction: "Russia",
    designationDate: "2022-04-05",
    authority: "E.O. 13694 (as amended) — cyber",
    usdFigures: [
      { value: 1700000000, context: "2021 revenue (>75% of global DNM revenue)", year: 2021, sourceId: "chain_hydra_garantex" },
      { value: 5000000000, context: "Total illicit transactions (Jan 2016–Mar 2022, U.S. gov est.)", year: 2022, sourceId: "treasury_jy0701" },
      { value: 25000000, context: "Bitcoin seized by German BKA at takedown", year: 2022, sourceId: "chain_hydra_garantex" },
    ],
    primarySourceId: "treasury_jy0701",
    walletAddresses: [],
    notes: "Russia-based darknet market; servers seized by German BKA same day as OFAC designation. OFAC referenced 'over 100 virtual currency addresses'.",
  },
  {
    id: "zhdanova",
    name: "Ekaterina Zhdanova",
    type: "individual",
    actor: "RUS",
    coord: "MOSCOW_RU",
    jurisdiction: "Russia (Moscow)",
    designationDate: "2023-11-03",
    authority: "E.O. 14024",
    usdFigures: [
      { value: 2000000, context: "BTC→USDT swaps via Garantex", year: 2023, sourceId: "treasury_sb0225" },
    ],
    primarySourceId: "treasury_jy1874",
    walletAddresses: [
      "39p8qWp1bkBNhi4vPFTetKPtH7goqNDZf",
      "1Ljk8RNNabkZ9bfDYQBn98XfFozJhTqqcZ",
    ],
    notes: "Russian money launderer for Russian elites and ransomware actors. BTC addresses published in OFAC SDN entry.",
  },
  {
    id: "a7a5",
    name: "A7A5 Token",
    type: "stablecoin",
    actor: "RUS",
    coord: "BISHKEK_KG",
    jurisdiction: "Kyrgyzstan (issuer Old Vector)",
    designationDate: "2025-03-06",
    authority: "E.O. 14024",
    usdFigures: [],
    primarySourceId: "treasury_sb0225",
    walletAddresses: [],
    notes: "Ruble-backed stablecoin issued by Old Vector (Kyrgyzstan-registered) to reimburse Garantex users after the Mar 2025 takedown. Linked to sanctioned oligarch Ilan Shor and Promsvyazbank.",
  },

  // ============================ IRAN ============================
  {
    id: "nobitex",
    name: "Nobitex",
    type: "exchange",
    actor: "IRAN",
    coord: "TEHRAN_IR",
    jurisdiction: "Iran",
    designationDate: "2026-06-02",
    authority: "E.O. 13224 + E.O. 13902",
    usdFigures: [
      { value: 2300000000, context: "Flowed through Nobitex (Tron + BNB Chain)", year: 2026, sourceId: "reuters_nobitex" },
      { value: 507000000, context: "USDT acquired by Central Bank of Iran, mostly via Nobitex", year: 2026, sourceId: "ellip_nobitex" },
      { value: 7700000000, context: "Combined 2025 volume of the four OFAC-designated IR exchanges", year: 2025, sourceId: "trm_coinex" },
      { value: 90000000, context: "Burned in Jun 2025 hack (anti-IRGC vanity addresses)", year: 2025, sourceId: "treasury_sb0519" },
    ],
    primarySourceId: "treasury_sb0519",
    walletAddresses: [],
    notes: "Iran's largest digital-asset exchange. Co-founders linked to the Kharrazi family (Supreme Leader Khamenei's inner circle). Designated alongside leadership (Rad, Aghamir, Khoee).",
  },
  {
    id: "wallex",
    name: "Wallex",
    type: "exchange",
    actor: "IRAN",
    coord: "TEHRAN_IR",
    jurisdiction: "Iran",
    designationDate: "2026-06-02",
    authority: "E.O. 13902 (+ E.O. 13224 per Elliptic)",
    usdFigures: [],
    primarySourceId: "treasury_sb0519",
    walletAddresses: [],
    notes: "Iranian digital-asset exchange designated in 'Economic Fury' action.",
  },
  {
    id: "bitpin",
    name: "Bitpin",
    type: "exchange",
    actor: "IRAN",
    coord: "TEHRAN_IR",
    jurisdiction: "Iran",
    designationDate: "2026-06-02",
    authority: "E.O. 13902",
    usdFigures: [],
    primarySourceId: "treasury_sb0519",
    walletAddresses: [],
    notes: "Iranian digital-asset exchange designated in 'Economic Fury' action.",
  },
  {
    id: "ramzinex",
    name: "Ramzinex",
    type: "exchange",
    actor: "IRAN",
    coord: "TEHRAN_IR",
    jurisdiction: "Tehran, Iran",
    designationDate: "2026-06-02",
    authority: "E.O. 13902",
    usdFigures: [
      { value: 2450000000, context: "Processed transactions", year: 2026, sourceId: "treasury_sb0519" },
    ],
    primarySourceId: "treasury_sb0519",
    walletAddresses: [],
    notes: "Tehran-based digital-asset exchange designated in 'Economic Fury' action.",
  },
  {
    id: "zedcex",
    name: "Zedcex Exchange Ltd",
    type: "exchange",
    actor: "IRAN",
    coord: "LONDON_UK",
    jurisdiction: "United Kingdom (reg.)",
    designationDate: "2026-01",
    authority: "E.O. 13902 / SDGT / IFSR",
    usdFigures: [
      { value: 1000000000, context: "Combined Zedcex+Zedxion moved for the IRGC (~56% of their volume)", year: 2024, sourceId: "trm_zedcex" },
    ],
    primarySourceId: "chain_zedcex",
    walletAddresses: [],
    notes: "UK-registered, Iran-linked. TRM Labs reports Zedcex/Zedxion 'appear to function as a single exchange'.",
  },
  {
    id: "zedxion",
    name: "Zedxion Exchange Ltd",
    type: "exchange",
    actor: "IRAN",
    coord: "LONDON_UK",
    jurisdiction: "United Kingdom (reg.)",
    designationDate: "2026-01",
    authority: "E.O. 13902 / SDGT / IFSR",
    usdFigures: [
      { value: 1000000000, context: "Combined Zedcex+Zedxion moved for the IRGC (~56% of their volume)", year: 2024, sourceId: "trm_zedcex" },
    ],
    primarySourceId: "chain_zedcex",
    walletAddresses: [],
    notes: "UK-registered, Iran-linked; incorporated May 2021. Functions as one exchange with Zedcex per TRM.",
  },
  {
    id: "coinex",
    name: "CoinEx",
    type: "exchange",
    actor: "IRAN",
    coord: "HONG_KONG",
    jurisdiction: "Hong Kong (reg.)",
    designationDate: null,
    authority: "Not OFAC-designated (gateway role documented by TRM)",
    usdFigures: [
      { value: 3840000000, context: "Flows between CoinEx and sanctioned Iranian entities (2019–2026)", year: 2026, sourceId: "trm_coinex" },
      { value: 2700000000, context: "CoinEx–Nobitex direct volume (cumulative)", year: 2026, sourceId: "trm_coinex" },
    ],
    primarySourceId: "trm_coinex",
    walletAddresses: [],
    notes: "Documented as Iran's primary gateway to global crypto markets (TRM). Not itself OFAC-designated — included as a conduit.",
  },
  {
    id: "cbi_wallets",
    name: "Central Bank of Iran — Crypto Wallets",
    type: "individual",
    actor: "IRAN",
    coord: "TEHRAN_IR",
    jurisdiction: "Iran",
    designationDate: "2026-04-24",
    authority: "E.O. 13224 (linked to IRGC-QF / Hizballah)",
    usdFigures: [
      { value: 344000000, context: "Frozen in two CBI-associated wallets", year: 2026, sourceId: "trm_cbi" },
      { value: 131000000, context: "Frozen of $165M received (OFAC update Jul 14, 2026)", year: 2026, sourceId: "chain_cbi" },
      { value: 475000000, context: "Cumulative Tether-frozen funds linked to CBI", year: 2026, sourceId: "chain_cbi" },
    ],
    primarySourceId: "trm_cbi",
    walletAddresses: [],
    notes: "Exact wallet hashes not published in TRM text — verify against OFAC SDN entry before any operational use. Inflows Mar 2021–late 2023.",
  },
  {
    id: "sajamal",
    name: "Sa'id al-Jamal (Houthi/IRGC-QF network)",
    type: "individual",
    actor: "IRAN",
    coord: "DUBAI_AE",
    jurisdiction: "UAE / Yemen",
    designationDate: "2024-12-19",
    authority: "E.O. 13224",
    usdFigures: [
      { value: 330000000, context: "Inflows to five Sa'id al-Jamal wallets", year: 2024, sourceId: "trm_houthis" },
      { value: 900000000, context: "Outflows from eight Houthi-linked addresses", year: 2025, sourceId: "trm_houthis" },
    ],
    primarySourceId: "trm_houthis",
    walletAddresses: [],
    notes: "OFAC-designated Houthi financier generating revenue for the Houthis (IRGC-QF linked). 5 wallets added Dec 2024; 8 addresses designated Apr 2, 2025. Outflows incl. Russian UAV broker and Garantex.",
  },
  {
    id: "samsam",
    name: "SamSam facilitators (Khorashadizadeh / Ghorbaniyan)",
    type: "individual",
    actor: "IRAN",
    coord: "TEHRAN_IR",
    jurisdiction: "Iran",
    designationDate: "2018-11-28",
    authority: "E.O. 13694 (cyber), as amended",
    usdFigures: [],
    primarySourceId: "treasury_sm556",
    walletAddresses: [
      "149w62rY42aZBox8fGcmqNsXUzSStKeq8C",
    ],
    notes: "FIRST-EVER OFAC digital-currency-address designation. Iran-based; exchanged SamSam ransom BTC into rials. Treasury release does NOT tie them to the IRGC — do not present as IRGC.",
  },

  // ============================ DPRK ============================
  {
    id: "lazarus",
    name: "Lazarus Group / APT38",
    type: "threatActor",
    actor: "DPRK",
    coord: "PYONGYANG_KP",
    jurisdiction: "North Korea (Reconnaissance General Bureau)",
    designationDate: "2019-09-13",
    authority: "E.O. 13722",
    usdFigures: [
      { value: 1700000000, context: "DPRK-attributed theft in 2022 (Chainalysis)", year: 2022, sourceId: "chain_hack2022" },
      { value: 660000000, context: "DPRK-attributed theft in 2023 (Chainalysis)", year: 2023, sourceId: "chain_hack2025" },
      { value: 1340000000, context: "DPRK-attributed theft in 2024 (Chainalysis)", year: 2024, sourceId: "chain_hack2026" },
      { value: 2020000000, context: "DPRK-attributed theft in 2025 (Chainalysis)", year: 2025, sourceId: "chain_hack2026" },
      { value: 6750000000, context: "All-time DPRK stolen total through 2025 (Chainalysis)", year: 2025, sourceId: "chain_hack2026" },
    ],
    primarySourceId: "treasury_jy1087",
    walletAddresses: [],
    notes: "Designated as an agency/instrumentality of the RGB. 'TraderTraitor' sub-cluster behind several large bridge heists. 2024 = 39% of global hack value per TRM.",
  },
  {
    id: "blender",
    name: "Blender.io",
    type: "mixer",
    actor: "DPRK",
    coord: null,
    jurisdiction: "No physical jurisdiction (mixer)",
    designationDate: "2022-05-06",
    authority: "E.O. 13694 (as amended by E.O. 13757)",
    usdFigures: [
      { value: 20500000, context: "Illicit proceeds processed for Lazarus Group", year: 2022, sourceId: "treasury_jy0768" },
    ],
    primarySourceId: "treasury_jy0768",
    walletAddresses: [],
    notes: "FIRST-EVER OFAC sanction of a virtual currency mixer. 45 BTC addresses + 4 Lazarus wallets targeted. Linked to laundering of Axie Infinity / Ronin Bridge funds.",
  },
  {
    id: "tornado",
    name: "Tornado Cash",
    type: "mixer",
    actor: "DPRK",
    coord: null,
    jurisdiction: "No physical jurisdiction (mixer)",
    designationDate: "2022-08-08",
    authority: "E.O. 13694 (as amended)",
    usdFigures: [],
    primarySourceId: "chain_tornado",
    walletAddresses: [],
    notes: "Used to launder DPRK heist proceeds (incl. Ronin Bridge). STATUS NOTE: in Nov 2024 the Fifth Circuit ruled against OFAC's sanctioning of Tornado Cash; Treasury subsequently delisted it. Shown here for historical laundering-flow context.",
  },
  {
    id: "sinbad",
    name: "Sinbad.io",
    type: "mixer",
    actor: "DPRK",
    coord: null,
    jurisdiction: "No physical jurisdiction (mixer)",
    designationDate: "2023-11-29",
    authority: "E.O. 13694 (as amended) + FBI domain seizure",
    usdFigures: [],
    primarySourceId: "treasury_jy1933",
    walletAddresses: [],
    notes: "OFAC sanctions + domain seized by FBI. Laundered portions of the Atomic Wallet (~$100M), Axie Infinity (~$620M) and Horizon Bridge (~$100M) heists per Treasury.",
  },
];

// ---- Flows (directed edges between entities) -------------------------------
// Mixers without coordinates are still valid flow endpoints; the map renders
// flow endpoints that BOTH have coordinates, and renders full edges in the
// detail view / table regardless.
export const flows = [
  { id: "f_hydra_bitzlato", from: "hydra", to: "bitzlato", usd: 700000000, year: 2023, actor: "RUS", sourceId: "treasury_jy1193", note: "Crypto exchanged between Hydra Market and Bitzlato" },
  { id: "f_hydra_bitzlato2", from: "hydra", to: "bitzlato", usd: 170600000, year: 2022, actor: "RUS", sourceId: "fincen_bitzlato", note: "Hydra users → Bitzlato wallets (May 2018–Apr 2022)" },
  { id: "f_garantex_ransom", from: "hydra", to: "garantex", usd: 60000000, year: 2021, actor: "RUS", sourceId: "chain_hydra_garantex", note: "Darknet market inflows to Garantex (2019–2021)" },
  { id: "f_zhdanova_garantex", from: "zhdanova", to: "garantex", usd: 2000000, year: 2023, actor: "RUS", sourceId: "treasury_sb0225", note: "Zhdanova BTC→USDT swaps via Garantex" },
  { id: "f_houthi_garantex", from: "sajamal", to: "garantex", usd: 90000000, year: 2025, actor: "RUS", sourceId: "trm_houthis", note: "Houthi-linked outflows to Russian UAV broker / Garantex (illustrative magnitude)" },
  { id: "f_coinex_nobitex", from: "coinex", to: "nobitex", usd: 2700000000, year: 2026, actor: "IRAN", sourceId: "trm_coinex", note: "CoinEx–Nobitex direct volume (cumulative)" },
  { id: "f_coinex_iran", from: "coinex", to: "nobitex", usd: 3840000000, year: 2026, actor: "IRAN", sourceId: "trm_coinex", note: "CoinEx ↔ sanctioned Iranian entities (2019–2026)" },
  { id: "f_zed_irgc", from: "zedcex", to: "zedxion", usd: 1000000000, year: 2024, actor: "IRAN", sourceId: "trm_zedcex", note: "Zedcex/Zedxion moved ~$1B in stablecoins for the IRGC (combined)" },
  { id: "f_cbi_nobitex", from: "cbi_wallets", to: "nobitex", usd: 20000000, year: 2026, actor: "IRAN", sourceId: "treasury_sb0519", note: "Sanctioned Central Bank funds moved to Nobitex-controlled wallets" },
  { id: "f_ronin_tornado", from: "lazarus", to: "tornado", usd: 620000000, year: 2022, actor: "DPRK", sourceId: "fbi_ronin", note: "Ronin Bridge heist ($620M) laundered via mixers incl. Tornado Cash" },
  { id: "f_harmony_tornado", from: "lazarus", to: "tornado", usd: 100000000, year: 2022, actor: "DPRK", sourceId: "fbi_harmony", note: "Harmony Horizon Bridge ($100M) laundered via Tornado Cash / Railgun" },
  { id: "f_atomic_sinbad", from: "lazarus", to: "sinbad", usd: 100000000, year: 2023, actor: "DPRK", sourceId: "treasury_jy1933", note: "Atomic Wallet ($100M) laundered via Sinbad.io" },
  { id: "f_lazarus_blender", from: "lazarus", to: "blender", usd: 20500000, year: 2022, actor: "DPRK", sourceId: "treasury_jy0768", note: "Lazarus proceeds processed by Blender.io" },
  { id: "f_dprk_garantex", from: "lazarus", to: "garantex", usd: 500000000, year: 2024, actor: "DPRK", sourceId: "trm_2025ccr", note: "DPRK → China OTC traders → Russian exchanges (Garantex/Grinex) off-ramp. Illustrative aggregate magnitude per TRM 'Chinese laundromat'." },
  { id: "f_bybit_lazarus", from: "lazarus", to: "garantex", usd: 1500000000, year: 2025, actor: "DPRK", sourceId: "ic3_bybit", note: "Bybit ~$1.5B theft attributed to DPRK TraderTraitor; laundering via OTC/swap services (illustrative off-ramp edge)" },
];

// ---- Events (hacks / enforcement timeline) --------------------------------
export const events = [
  { id: "e_ronin", date: "2022-03-23", title: "Ronin Bridge / Sky Mavis (Axie Infinity) hack", usd: 620000000, actor: "DPRK", sourceId: "fbi_ronin" },
  { id: "e_harmony", date: "2022-06", title: "Harmony Horizon Bridge hack", usd: 100000000, actor: "DPRK", sourceId: "fbi_harmony" },
  { id: "e_atomic", date: "2023-06-02", title: "Atomic Wallet hack", usd: 100000000, actor: "DPRK", sourceId: "trm_dprk" },
  { id: "e_stake", date: "2023-09", title: "Stake.com theft", usd: 41000000, actor: "DPRK", sourceId: "fbi_stake" },
  { id: "e_coinex", date: "2023-09", title: "CoinEx hack", usd: 55000000, actor: "DPRK", sourceId: "trm_dprk" },
  { id: "e_bybit", date: "2025-02-21", title: "Bybit hack — LARGEST crypto theft in history", usd: 1500000000, actor: "DPRK", sourceId: "ic3_bybit" },
  { id: "e_garantex_takedown", date: "2025-03-05", title: "Garantex international takedown; $26M frozen", usd: 26000000, actor: "RUS", sourceId: "doj_garantex" },
  { id: "e_hydra_takedown", date: "2022-04-05", title: "Hydra Market servers seized by German BKA", usd: 25000000, actor: "RUS", sourceId: "chain_hydra_garantex" },
  { id: "e_nobitex_hack", date: "2025-06", title: "Nobitex hack — attacker 'burned' ~$90M to anti-IRGC vanity addresses", usd: 90000000, actor: "IRAN", sourceId: "treasury_sb0519" },
];

// ---- Helpers ---------------------------------------------------------------
export const getSource = (id) => sources.find((s) => s.id === id);
export const getEntity = (id) => entities.find((e) => e.id === id);
export const getCoord = (key) => (key ? COORDS[key] : null);

// Highest single USD figure for an entity (used for marker sizing / sorting).
export const primaryUsd = (entity) => {
  if (!entity.usdFigures || entity.usdFigures.length === 0) return 0;
  return Math.max(...entity.usdFigures.map((f) => f.value));
};

// Actor metadata (color, label)
export const ACTORS = {
  IRAN: { code: "IRAN", color: "#f5a524", label: "이란", labelEn: "Iran" },
  RUS: { code: "RUS", color: "#f5475f", label: "러시아", labelEn: "Russia" },
  DPRK: { code: "DPRK", color: "#a855f7", label: "북한", labelEn: "North Korea" },
};

export const ENTITY_TYPES = {
  exchange: { label: "거래소", labelEn: "Exchange", icon: "🏦" },
  mixer: { label: "믹서", labelEn: "Mixer", icon: "🌀" },
  darknet: { label: "다크넷", labelEn: "Darknet", icon: "🕸️" },
  threatActor: { label: "위협행위자", labelEn: "Threat Actor", icon: "💀" },
  individual: { label: "개인/지갑", labelEn: "Individual / Wallet", icon: "👤" },
  stablecoin: { label: "스테이블코인", labelEn: "Stablecoin", icon: "🪙" },
};
