// Definición del tipo para asegurar la estructura
export type CountryData = {
  [key: string]: {
    description: string; // Nombre del país en inglés
    flag: string; // URL de la miniatura de la bandera (24x18px, SVG)
  };
};

// Objeto completo con todos los códigos ISO 3166-1 Alfa-2
export const ISO_COUNTRIES: CountryData = {
  // A
  AF: { description: 'Afghanistan', flag: 'https://flagcdn.com/24x18/af.png' },
  AX: { description: 'Aland Islands', flag: 'https://flagcdn.com/24x18/ax.png' },
  AL: { description: 'Albania', flag: 'https://flagcdn.com/24x18/al.png' },
  DZ: { description: 'Algeria', flag: 'https://flagcdn.com/24x18/dz.png' },
  AS: { description: 'American Samoa', flag: 'https://flagcdn.com/24x18/as.png' },
  AD: { description: 'Andorra', flag: 'https://flagcdn.com/24x18/ad.png' },
  AO: { description: 'Angola', flag: 'https://flagcdn.com/24x18/ao.png' },
  AI: { description: 'Anguilla', flag: 'https://flagcdn.com/24x18/ai.png' },
  AQ: { description: 'Antarctica', flag: 'https://flagcdn.com/24x18/aq.png' },
  AG: { description: 'Antigua and Barbuda', flag: 'https://flagcdn.com/24x18/ag.png' },
  AR: { description: 'Argentina', flag: 'https://flagcdn.com/24x18/ar.png' },
  AM: { description: 'Armenia', flag: 'https://flagcdn.com/24x18/am.png' },
  AW: { description: 'Aruba', flag: 'https://flagcdn.com/24x18/aw.png' },
  AU: { description: 'Australia', flag: 'https://flagcdn.com/24x18/au.png' },
  AT: { description: 'Austria', flag: 'https://flagcdn.com/24x18/at.png' },
  AZ: { description: 'Azerbaijan', flag: 'https://flagcdn.com/24x18/az.png' },

  // B
  BS: { description: 'Bahamas (the)', flag: 'https://flagcdn.com/24x18/bs.png' },
  BH: { description: 'Bahrain', flag: 'https://flagcdn.com/24x18/bh.png' },
  BD: { description: 'Bangladesh', flag: 'https://flagcdn.com/24x18/bd.png' },
  BB: { description: 'Barbados', flag: 'https://flagcdn.com/24x18/bb.png' },
  BY: { description: 'Belarus', flag: 'https://flagcdn.com/24x18/by.png' },
  BE: { description: 'Belgium', flag: 'https://flagcdn.com/24x18/be.png' },
  BZ: { description: 'Belize', flag: 'https://flagcdn.com/24x18/bz.png' },
  BJ: { description: 'Benin', flag: 'https://flagcdn.com/24x18/bj.png' },
  BM: { description: 'Bermuda', flag: 'https://flagcdn.com/24x18/bm.png' },
  BT: { description: 'Bhutan', flag: 'https://flagcdn.com/24x18/bt.png' },
  BO: { description: 'Bolivia (Plurinational State of)', flag: 'https://flagcdn.com/24x18/bo.png' },
  BQ: { description: 'Bonaire, Sint Eustatius and Saba', flag: 'https://flagcdn.com/24x18/bq.png' },
  BA: { description: 'Bosnia and Herzegovina', flag: 'https://flagcdn.com/24x18/ba.png' },
  BW: { description: 'Botswana', flag: 'https://flagcdn.com/24x18/bw.png' },
  BV: { description: 'Bouvet Island', flag: 'https://flagcdn.com/24x18/bv.png' },
  BR: { description: 'Brazil', flag: 'https://flagcdn.com/24x18/br.png' },
  IO: { description: 'British Indian Ocean Territory (the)', flag: 'https://flagcdn.com/24x18/io.png' },
  BN: { description: 'Brunei Darussalam', flag: 'https://flagcdn.com/24x18/bn.png' },
  BG: { description: 'Bulgaria', flag: 'https://flagcdn.com/24x18/bg.png' },
  BF: { description: 'Burkina Faso', flag: 'https://flagcdn.com/24x18/bf.png' },
  BI: { description: 'Burundi', flag: 'https://flagcdn.com/24x18/bi.png' },

  // C
  CV: { description: 'Cabo Verde', flag: 'https://flagcdn.com/24x18/cv.png' },
  KH: { description: 'Cambodia', flag: 'https://flagcdn.com/24x18/kh.png' },
  CM: { description: 'Cameroon', flag: 'https://flagcdn.com/24x18/cm.png' },
  CA: { description: 'Canada', flag: 'https://flagcdn.com/24x18/ca.png' },
  KY: { description: 'Cayman Islands (the)', flag: 'https://flagcdn.com/24x18/ky.png' },
  CF: { description: 'Central African Republic (the)', flag: 'https://flagcdn.com/24x18/cf.png' },
  TD: { description: 'Chad', flag: 'https://flagcdn.com/24x18/td.png' },
  CL: { description: 'Chile', flag: 'https://flagcdn.com/24x18/cl.png' },
  CN: { description: 'China', flag: 'https://flagcdn.com/24x18/cn.png' },
  CX: { description: 'Christmas Island', flag: 'https://flagcdn.com/24x18/cx.png' },
  CC: { description: 'Cocos (Keeling) Islands (the)', flag: 'https://flagcdn.com/24x18/cc.png' },
  CO: { description: 'Colombia', flag: 'https://flagcdn.com/24x18/co.png' },
  KM: { description: 'Comoros (the)', flag: 'https://flagcdn.com/24x18/km.png' },
  CD: { description: 'Congo (the Democratic Republic of the)', flag: 'https://flagcdn.com/24x18/cd.png' },
  CG: { description: 'Congo (the)', flag: 'https://flagcdn.com/24x18/cg.png' },
  CK: { description: 'Cook Islands (the)', flag: 'https://flagcdn.com/24x18/ck.png' },
  CR: { description: 'Costa Rica', flag: 'https://flagcdn.com/24x18/cr.png' },
  CI: { description: "Côte d'Ivoire", flag: 'https://flagcdn.com/24x18/ci.png' },
  HR: { description: 'Croatia', flag: 'https://flagcdn.com/24x18/hr.png' },
  CU: { description: 'Cuba', flag: 'https://flagcdn.com/24x18/cu.png' },
  CW: { description: 'Curaçao', flag: 'https://flagcdn.com/24x18/cw.png' },
  CY: { description: 'Cyprus', flag: 'https://flagcdn.com/24x18/cy.png' },
  CZ: { description: 'Czechia', flag: 'https://flagcdn.com/24x18/cz.png' },

  // D
  DK: { description: 'Denmark', flag: 'https://flagcdn.com/24x18/dk.png' },
  DJ: { description: 'Djibouti', flag: 'https://flagcdn.com/24x18/dj.png' },
  DM: { description: 'Dominica', flag: 'https://flagcdn.com/24x18/dm.png' },
  DO: { description: 'Dominican Republic (the)', flag: 'https://flagcdn.com/24x18/do.png' },

  // E
  EC: { description: 'Ecuador', flag: 'https://flagcdn.com/24x18/ec.png' },
  EG: { description: 'Egypt', flag: 'https://flagcdn.com/24x18/eg.png' },
  SV: { description: 'El Salvador', flag: 'https://flagcdn.com/24x18/sv.png' },
  GQ: { description: 'Equatorial Guinea', flag: 'https://flagcdn.com/24x18/gq.png' },
  ER: { description: 'Eritrea', flag: 'https://flagcdn.com/24x18/er.png' },
  EE: { description: 'Estonia', flag: 'https://flagcdn.com/24x18/ee.png' },
  SZ: { description: 'Eswatini', flag: 'https://flagcdn.com/24x18/sz.png' },
  ET: { description: 'Ethiopia', flag: 'https://flagcdn.com/24x18/et.png' },

  // F
  FK: { description: 'Falkland Islands (Malvinas)', flag: 'https://flagcdn.com/24x18/fk.png' },
  FO: { description: 'Faroe Islands (the)', flag: 'https://flagcdn.com/24x18/fo.png' },
  FJ: { description: 'Fiji', flag: 'https://flagcdn.com/24x18/fj.png' },
  FI: { description: 'Finland', flag: 'https://flagcdn.com/24x18/fi.png' },
  FR: { description: 'France', flag: 'https://flagcdn.com/24x18/fr.png' },
  GF: { description: 'French Guiana', flag: 'https://flagcdn.com/24x18/gf.png' },
  PF: { description: 'French Polynesia', flag: 'https://flagcdn.com/24x18/pf.png' },
  TF: { description: 'French Southern Territories (the)', flag: 'https://flagcdn.com/24x18/tf.png' },

  // G
  GA: { description: 'Gabon', flag: 'https://flagcdn.com/24x18/ga.png' },
  GM: { description: 'Gambia (the)', flag: 'https://flagcdn.com/24x18/gm.png' },
  GE: { description: 'Georgia', flag: 'https://flagcdn.com/24x18/ge.png' },
  DE: { description: 'Germany', flag: 'https://flagcdn.com/24x18/de.png' },
  GH: { description: 'Ghana', flag: 'https://flagcdn.com/24x18/gh.png' },
  GI: { description: 'Gibraltar', flag: 'https://flagcdn.com/24x18/gi.png' },
  GR: { description: 'Greece', flag: 'https://flagcdn.com/24x18/gr.png' },
  GL: { description: 'Greenland', flag: 'https://flagcdn.com/24x18/gl.png' },
  GD: { description: 'Grenada', flag: 'https://flagcdn.com/24x18/gd.png' },
  GP: { description: 'Guadeloupe', flag: 'https://flagcdn.com/24x18/gp.png' },
  GU: { description: 'Guam', flag: 'https://flagcdn.com/24x18/gu.png' },
  GT: { description: 'Guatemala', flag: 'https://flagcdn.com/24x18/gt.png' },
  GG: { description: 'Guernsey', flag: 'https://flagcdn.com/24x18/gg.png' },
  GN: { description: 'Guinea', flag: 'https://flagcdn.com/24x18/gn.png' },
  GW: { description: 'Guinea-Bissau', flag: 'https://flagcdn.com/24x18/gw.png' },
  GY: { description: 'Guyana', flag: 'https://flagcdn.com/24x18/gy.png' },

  // H
  HT: { description: 'Haiti', flag: 'https://flagcdn.com/24x18/ht.png' },
  HM: { description: 'Heard Island and McDonald Islands', flag: 'https://flagcdn.com/24x18/hm.png' },
  VA: { description: 'Holy See (the) [Vatican City State]', flag: 'https://flagcdn.com/24x18/va.png' },
  HN: { description: 'Honduras', flag: 'https://flagcdn.com/24x18/hn.png' },
  HK: { description: 'Hong Kong', flag: 'https://flagcdn.com/24x18/hk.png' },
  HU: { description: 'Hungary', flag: 'https://flagcdn.com/24x18/hu.png' },

  // I
  IS: { description: 'Iceland', flag: 'https://flagcdn.com/24x18/is.png' },
  IN: { description: 'India', flag: 'https://flagcdn.com/24x18/in.png' },
  ID: { description: 'Indonesia', flag: 'https://flagcdn.com/24x18/id.png' },
  IR: { description: 'Iran (Islamic Republic of)', flag: 'https://flagcdn.com/24x18/ir.png' },
  IQ: { description: 'Iraq', flag: 'https://flagcdn.com/24x18/iq.png' },
  IE: { description: 'Ireland', flag: 'https://flagcdn.com/24x18/ie.png' },
  IM: { description: 'Isle of Man', flag: 'https://flagcdn.com/24x18/im.png' },
  IL: { description: 'Israel', flag: 'https://flagcdn.com/24x18/il.png' },
  IT: { description: 'Italy', flag: 'https://flagcdn.com/24x18/it.png' },

  // J
  JM: { description: 'Jamaica', flag: 'https://flagcdn.com/24x18/jm.png' },
  JP: { description: 'Japan', flag: 'https://flagcdn.com/24x18/jp.png' },
  JE: { description: 'Jersey', flag: 'https://flagcdn.com/24x18/je.png' },
  JO: { description: 'Jordan', flag: 'https://flagcdn.com/24x18/jo.png' },

  // K
  KZ: { description: 'Kazakhstan', flag: 'https://flagcdn.com/24x18/kz.png' },
  KE: { description: 'Kenya', flag: 'https://flagcdn.com/24x18/ke.png' },
  KI: { description: 'Kiribati', flag: 'https://flagcdn.com/24x18/ki.png' },
  KP: { description: "Korea (the Democratic People's Republic of)", flag: 'https://flagcdn.com/24x18/kp.png' },
  KR: { description: 'Korea (the Republic of)', flag: 'https://flagcdn.com/24x18/kr.png' },
  KW: { description: 'Kuwait', flag: 'https://flagcdn.com/24x18/kw.png' },
  KG: { description: 'Kyrgyzstan', flag: 'https://flagcdn.com/24x18/kg.png' },

  // L
  LA: { description: "Lao People's Democratic Republic (the)", flag: 'https://flagcdn.com/24x18/la.png' },
  LV: { description: 'Latvia', flag: 'https://flagcdn.com/24x18/lv.png' },
  LB: { description: 'Lebanon', flag: 'https://flagcdn.com/24x18/lb.png' },
  LS: { description: 'Lesotho', flag: 'https://flagcdn.com/24x18/ls.png' },
  LR: { description: 'Liberia', flag: 'https://flagcdn.com/24x18/lr.png' },
  LY: { description: 'Libya', flag: 'https://flagcdn.com/24x18/ly.png' },
  LI: { description: 'Liechtenstein', flag: 'https://flagcdn.com/24x18/li.png' },
  LT: { description: 'Lithuania', flag: 'https://flagcdn.com/24x18/lt.png' },
  LU: { description: 'Luxembourg', flag: 'https://flagcdn.com/24x18/lu.png' },

  // M
  MO: { description: 'Macao', flag: 'https://flagcdn.com/24x18/mo.png' },
  MG: { description: 'Madagascar', flag: 'https://flagcdn.com/24x18/mg.png' },
  MW: { description: 'Malawi', flag: 'https://flagcdn.com/24x18/mw.png' },
  MY: { description: 'Malaysia', flag: 'https://flagcdn.com/24x18/my.png' },
  MV: { description: 'Maldives', flag: 'https://flagcdn.com/24x18/mv.png' },
  ML: { description: 'Mali', flag: 'https://flagcdn.com/24x18/ml.png' },
  MT: { description: 'Malta', flag: 'https://flagcdn.com/24x18/mt.png' },
  MH: { description: 'Marshall Islands (the)', flag: 'https://flagcdn.com/24x18/mh.png' },
  MQ: { description: 'Martinique', flag: 'https://flagcdn.com/24x18/mq.png' },
  MR: { description: 'Mauritania', flag: 'https://flagcdn.com/24x18/mr.png' },
  MU: { description: 'Mauritius', flag: 'https://flagcdn.com/24x18/mu.png' },
  YT: { description: 'Mayotte', flag: 'https://flagcdn.com/24x18/yt.png' },
  MX: { description: 'Mexico', flag: 'https://flagcdn.com/24x18/mx.png' },
  FM: { description: 'Micronesia (Federated States of)', flag: 'https://flagcdn.com/24x18/fm.png' },
  MD: { description: 'Moldova (the Republic of)', flag: 'https://flagcdn.com/24x18/md.png' },
  MC: { description: 'Monaco', flag: 'https://flagcdn.com/24x18/mc.png' },
  MN: { description: 'Mongolia', flag: 'https://flagcdn.com/24x18/mn.png' },
  ME: { description: 'Montenegro', flag: 'https://flagcdn.com/24x18/me.png' },
  MS: { description: 'Montserrat', flag: 'https://flagcdn.com/24x18/ms.png' },
  MA: { description: 'Morocco', flag: 'https://flagcdn.com/24x18/ma.png' },
  MZ: { description: 'Mozambique', flag: 'https://flagcdn.com/24x18/mz.png' },
  MM: { description: 'Myanmar', flag: 'https://flagcdn.com/24x18/mm.png' },

  // N
  NA: { description: 'Namibia', flag: 'https://flagcdn.com/24x18/na.png' },
  NR: { description: 'Nauru', flag: 'https://flagcdn.com/24x18/nr.png' },
  NP: { description: 'Nepal', flag: 'https://flagcdn.com/24x18/np.png' },
  NL: { description: 'Netherlands (the)', flag: 'https://flagcdn.com/24x18/nl.png' },
  NC: { description: 'New Caledonia', flag: 'https://flagcdn.com/24x18/nc.png' },
  NZ: { description: 'New Zealand', flag: 'https://flagcdn.com/24x18/nz.png' },
  NI: { description: 'Nicaragua', flag: 'https://flagcdn.com/24x18/ni.png' },
  NE: { description: 'Niger (the)', flag: 'https://flagcdn.com/24x18/ne.png' },
  NG: { description: 'Nigeria', flag: 'https://flagcdn.com/24x18/ng.png' },
  NU: { description: 'Niue', flag: 'https://flagcdn.com/24x18/nu.png' },
  NF: { description: 'Norfolk Island', flag: 'https://flagcdn.com/24x18/nf.png' },
  MK: { description: 'North Macedonia', flag: 'https://flagcdn.com/24x18/mk.png' },
  MP: { description: 'Northern Mariana Islands (the)', flag: 'https://flagcdn.com/24x18/mp.png' },
  NO: { description: 'Norway', flag: 'https://flagcdn.com/24x18/no.png' },

  // O
  OM: { description: 'Oman', flag: 'https://flagcdn.com/24x18/om.png' },

  // P
  PK: { description: 'Pakistan', flag: 'https://flagcdn.com/24x18/pk.png' },
  PW: { description: 'Palau', flag: 'https://flagcdn.com/24x18/pw.png' },
  PS: { description: 'Palestine, State of', flag: 'https://flagcdn.com/24x18/ps.png' },
  PA: { description: 'Panama', flag: 'https://flagcdn.com/24x18/pa.png' },
  PG: { description: 'Papua New Guinea', flag: 'https://flagcdn.com/24x18/pg.png' },
  PY: { description: 'Paraguay', flag: 'https://flagcdn.com/24x18/py.png' },
  PE: { description: 'Peru', flag: 'https://flagcdn.com/24x18/pe.png' },
  PH: { description: 'Philippines (the)', flag: 'https://flagcdn.com/24x18/ph.png' },
  PN: { description: 'Pitcairn', flag: 'https://flagcdn.com/24x18/pn.png' },
  PL: { description: 'Poland', flag: 'https://flagcdn.com/24x18/pl.png' },
  PT: { description: 'Portugal', flag: 'https://flagcdn.com/24x18/pt.png' },
  PR: { description: 'Puerto Rico', flag: 'https://flagcdn.com/24x18/pr.png' },

  // Q
  QA: { description: 'Qatar', flag: 'https://flagcdn.com/24x18/qa.png' },

  // R
  RE: { description: 'Réunion', flag: 'https://flagcdn.com/24x18/re.png' },
  RO: { description: 'Romania', flag: 'https://flagcdn.com/24x18/ro.png' },
  RU: { description: 'Russian Federation (the)', flag: 'https://flagcdn.com/24x18/ru.png' },
  RW: { description: 'Rwanda', flag: 'https://flagcdn.com/24x18/rw.png' },

  // S
  BL: { description: 'Saint Barthélemy', flag: 'https://flagcdn.com/24x18/bl.png' },
  SH: { description: 'Saint Helena, Ascension and Tristan da Cunha', flag: 'https://flagcdn.com/24x18/sh.png' },
  KN: { description: 'Saint Kitts and Nevis', flag: 'https://flagcdn.com/24x18/kn.png' },
  LC: { description: 'Saint Lucia', flag: 'https://flagcdn.com/24x18/lc.png' },
  MF: { description: 'Saint Martin (French part)', flag: 'https://flagcdn.com/24x18/mf.png' },
  PM: { description: 'Saint Pierre and Miquelon', flag: 'https://flagcdn.com/24x18/pm.png' },
  VC: { description: 'Saint Vincent and the Grenadines', flag: 'https://flagcdn.com/24x18/vc.png' },
  WS: { description: 'Samoa', flag: 'https://flagcdn.com/24x18/ws.png' },
  SM: { description: 'San Marino', flag: 'https://flagcdn.com/24x18/sm.png' },
  ST: { description: 'Sao Tome and Principe', flag: 'https://flagcdn.com/24x18/st.png' },
  SA: { description: 'Saudi Arabia', flag: 'https://flagcdn.com/24x18/sa.png' },
  SN: { description: 'Senegal', flag: 'https://flagcdn.com/24x18/sn.png' },
  RS: { description: 'Serbia', flag: 'https://flagcdn.com/24x18/rs.png' },
  SC: { description: 'Seychelles', flag: 'https://flagcdn.com/24x18/sc.png' },
  SL: { description: 'Sierra Leone', flag: 'https://flagcdn.com/24x18/sl.png' },
  SG: { description: 'Singapore', flag: 'https://flagcdn.com/24x18/sg.png' },
  SX: { description: 'Sint Maarten (Dutch part)', flag: 'https://flagcdn.com/24x18/sx.png' },
  SK: { description: 'Slovakia', flag: 'https://flagcdn.com/24x18/sk.png' },
  SI: { description: 'Slovenia', flag: 'https://flagcdn.com/24x18/si.png' },
  SB: { description: 'Solomon Islands', flag: 'https://flagcdn.com/24x18/sb.png' },
  SO: { description: 'Somalia', flag: 'https://flagcdn.com/24x18/so.png' },
  ZA: { description: 'South Africa', flag: 'https://flagcdn.com/24x18/za.png' },
  GS: { description: 'South Georgia and the South Sandwich Islands', flag: 'https://flagcdn.com/24x18/gs.png' },
  SS: { description: 'South Sudan', flag: 'https://flagcdn.com/24x18/ss.png' },
  ES: { description: 'Spain', flag: 'https://flagcdn.com/24x18/es.png' },
  LK: { description: 'Sri Lanka', flag: 'https://flagcdn.com/24x18/lk.png' },
  SD: { description: 'Sudan (the)', flag: 'https://flagcdn.com/24x18/sd.png' },
  SR: { description: 'Suriname', flag: 'https://flagcdn.com/24x18/sr.png' },
  SJ: { description: 'Svalbard and Jan Mayen', flag: 'https://flagcdn.com/24x18/sj.png' },
  SE: { description: 'Sweden', flag: 'https://flagcdn.com/24x18/se.png' },
  CH: { description: 'Switzerland', flag: 'https://flagcdn.com/24x18/ch.png' },
  SY: { description: 'Syrian Arab Republic', flag: 'https://flagcdn.com/24x18/sy.png' },

  // T
  TW: { description: 'Taiwan (Province of China)', flag: 'https://flagcdn.com/24x18/tw.png' },
  TJ: { description: 'Tajikistan', flag: 'https://flagcdn.com/24x18/tj.png' },
  TZ: { description: 'Tanzania, United Republic of', flag: 'https://flagcdn.com/24x18/tz.png' },
  TH: { description: 'Thailand', flag: 'https://flagcdn.com/24x18/th.png' },
  TL: { description: 'Timor-Leste', flag: 'https://flagcdn.com/24x18/tl.png' },
  TG: { description: 'Togo', flag: 'https://flagcdn.com/24x18/tg.png' },
  TK: { description: 'Tokelau', flag: 'https://flagcdn.com/24x18/tk.png' },
  TO: { description: 'Tonga', flag: 'https://flagcdn.com/24x18/to.png' },
  TT: { description: 'Trinidad and Tobago', flag: 'https://flagcdn.com/24x18/tt.png' },
  TN: { description: 'Tunisia', flag: 'https://flagcdn.com/24x18/tn.png' },
  TR: { description: 'Türkiye', flag: 'https://flagcdn.com/24x18/tr.png' },
  TM: { description: 'Turkmenistan', flag: 'https://flagcdn.com/24x18/tm.png' },
  TC: { description: 'Turks and Caicos Islands (the)', flag: 'https://flagcdn.com/24x18/tc.png' },
  TV: { description: 'Tuvalu', flag: 'https://flagcdn.com/24x18/tv.png' },

  // U
  UG: { description: 'Uganda', flag: 'https://flagcdn.com/24x18/ug.png' },
  UA: { description: 'Ukraine', flag: 'https://flagcdn.com/24x18/ua.png' },
  AE: { description: 'United Arab Emirates (the)', flag: 'https://flagcdn.com/24x18/ae.png' },
  GB: { description: 'United Kingdom of Great Britain and Northern Ireland (the)', flag: 'https://flagcdn.com/24x18/gb.png' },
  UM: { description: 'United States Minor Outlying Islands (the)', flag: 'https://flagcdn.com/24x18/um.png' },
  US: { description: 'United States of America (the)', flag: 'https://flagcdn.com/24x18/us.png' },
  UY: { description: 'Uruguay', flag: 'https://flagcdn.com/24x18/uy.png' },
  UZ: { description: 'Uzbekistan', flag: 'https://flagcdn.com/24x18/uz.png' },

  // V
  VU: { description: 'Vanuatu', flag: 'https://flagcdn.com/24x18/vu.png' },
  VE: { description: 'Venezuela (Bolivarian Republic of)', flag: 'https://flagcdn.com/24x18/ve.png' },
  VN: { description: 'Viet Nam', flag: 'https://flagcdn.com/24x18/vn.png' },
  VG: { description: 'Virgin Islands (British)', flag: 'https://flagcdn.com/24x18/vg.png' },
  VI: { description: 'Virgin Islands (U.S.)', flag: 'https://flagcdn.com/24x18/vi.png' },

  // W
  WF: { description: 'Wallis and Futuna', flag: 'https://flagcdn.com/24x18/wf.png' },
  EH: { description: 'Western Sahara', flag: 'https://flagcdn.com/24x18/eh.png' },

  // Y
  YE: { description: 'Yemen', flag: 'https://flagcdn.com/24x18/ye.png' },

  // Z
  ZM: { description: 'Zambia', flag: 'https://flagcdn.com/24x18/zm.png' },
  ZW: { description: 'Zimbabwe', flag: 'https://flagcdn.com/24x18/zw.png' },
  

};

// Definición del tipo para el objeto de idiomas
export type LanguageData = {
  [key: string]: {
    description: string; // Nombre del idioma en inglés
    nativeName: string; // Nombre del idioma en su propio idioma
  };
};

// Objeto completo con los códigos de idioma ISO 639-1 más comunes
export const ISO_LANGUAGES: LanguageData = {
  // A
  ab: { description: 'Abkhazian', nativeName: 'аҧсуа' },
  aa: { description: 'Afar', nativeName: 'Afaraf' },
  af: { description: 'Afrikaans', nativeName: 'Afrikaans' },
  ak: { description: 'Akan', nativeName: 'Akan' },
  sq: { description: 'Albanian', nativeName: 'Shqip' },
  am: { description: 'Amharic', nativeName: 'አማርኛ' },
  ar: { description: 'Arabic', nativeName: 'العربية' },
  an: { description: 'Aragonese', nativeName: 'Aragonés' },
  hy: { description: 'Armenian', nativeName: 'Հայերեն' },
  as: { description: 'Assamese', nativeName: 'অসমীয়া' },
  av: { description: 'Avaric', nativeName: 'авар мацӀ, магӀарул мацӀ' },
  ae: { description: 'Avestan', nativeName: 'avesta' },
  ay: { description: 'Aymara', nativeName: 'aymar aru' },
  az: { description: 'Azerbaijani', nativeName: 'azərbaycan dili, تۆرکجه' },

  // B
  bm: { description: 'Bambara', nativeName: 'bamanankan' },
  ba: { description: 'Bashkir', nativeName: 'башҡорт теле' },
  eu: { description: 'Basque', nativeName: 'euskara, euskera' },
  be: { description: 'Belarusian', nativeName: 'Беларуская' },
  bn: { description: 'Bengali', nativeName: 'বাংলা' },
  bh: { description: 'Bihari languages', nativeName: 'भोजपुरी' },
  bi: { description: 'Bislama', nativeName: 'Bislama' },
  bs: { description: 'Bosnian', nativeName: 'bosanski jezik' },
  br: { description: 'Breton', nativeName: 'brezhoneg' },
  bg: { description: 'Bulgarian', nativeName: 'български език' },
  my: { description: 'Burmese', nativeName: 'ဗမာစာ' },

  // C
  ca: { description: 'Catalan, Valencian', nativeName: 'Català' },
  ch: { description: 'Chamorro', nativeName: 'Chamoru' },
  ce: { description: 'Chechen', nativeName: 'нохчийн мотт' },
  ny: { description: 'Chichewa, Chewa, Nyanja', nativeName: 'chiCheŵa, chinyanja' },
  zh: { description: 'Chinese', nativeName: '中文 (Zhōngwén), 汉语, 漢語' },
  cv: { description: 'Chuvash', nativeName: 'чӑваш чӗлхи' },
  kw: { description: 'Cornish', nativeName: 'Kernewek' },
  co: { description: 'Corsican', nativeName: 'corsu, lingua corsa' },
  cr: { description: 'Cree', nativeName: ' Cree' },
  hr: { description: 'Croatian', nativeName: 'Hrvatski' },
  cs: { description: 'Czech', nativeName: 'čeština, český jazyk' },

  // D
  da: { description: 'Danish', nativeName: 'dansk' },
  dv: { description: 'Divehi, Dhivehi, Maldivian', nativeName: 'ދިވެހި' },
  nl: { description: 'Dutch, Flemish', nativeName: 'Nederlands, Vlaams' },
  dz: { description: 'Dzongkha', nativeName: 'རྫོང་ཁ' },

  // E
  en: { description: 'English', nativeName: 'English' },
  eo: { description: 'Esperanto', nativeName: 'Esperanto' },
  et: { description: 'Estonian', nativeName: 'eesti, eesti keel' },
  ee: { description: 'Ewe', nativeName: 'Eʋegbe' },

  // F
  fo: { description: 'Faroese', nativeName: 'føroyskt' },
  fj: { description: 'Fijian', nativeName: 'vosa Vakaviti' },
  fi: { description: 'Finnish', nativeName: 'suomi, suomen kieli' },
  fr: { description: 'French', nativeName: 'français, langue française' },
  fy: { description: 'Western Frisian', nativeName: 'Frysk' },
  ff: { description: 'Fulah', nativeName: 'Fulfulde, Pulaar, Pular' },

  // G
  gl: { description: 'Galician', nativeName: 'Galego' },
  ka: { description: 'Georgian', nativeName: 'ქართული' },
  de: { description: 'German', nativeName: 'Deutsch' },
  el: { description: 'Greek (Modern)', nativeName: 'Ελληνικά' },
  gn: { description: 'Guarani', nativeName: 'Avañeẽ' },
  gu: { description: 'Gujarati', nativeName: 'ગુજરાતી' },

  // H
  ht: { description: 'Haitian, Haitian Creole', nativeName: 'Kreyòl ayisyen' },
  ha: { description: 'Hausa', nativeName: 'Hausa, هَوُسَ' },
  he: { description: 'Hebrew', nativeName: 'עברית' },
  hz: { description: 'Herero', nativeName: 'Otjiherero' },
  hi: { description: 'Hindi', nativeName: 'हिन्दी, हिंदी' },
  ho: { description: 'Hiri Motu', nativeName: 'Hiri Motu' },
  hu: { description: 'Hungarian', nativeName: 'Magyar' },

  // I
  is: { description: 'Icelandic', nativeName: 'Íslenska' },
  io: { description: 'Ido', nativeName: 'Ido' },
  ig: { description: 'Igbo', nativeName: 'Asụsụ Igbo' },
  id: { description: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  ia: { description: 'Interlingua (International Auxiliary Language Association)', nativeName: 'Interlingua' },
  ie: { description: 'Interlingue, Occidental', nativeName: 'Interlingue' },
  iu: { description: 'Inuktitut', nativeName: 'ᐃᓄᒃᑎᑐᑦ' },
  ik: { description: 'Inupiaq', nativeName: 'Iñupiaq, Iñupiak' },
  ga: { description: 'Irish', nativeName: 'Gaeilge' },
  it: { description: 'Italian', nativeName: 'Italiano' },

  // J
  ja: { description: 'Japanese', nativeName: '日本語 (にほんご)' },
  jv: { description: 'Javanese', nativeName: 'basa Jawa' },

  // K
  kl: { description: 'Kalaallisut, Greenlandic', nativeName: 'kalaallisut, kalaallit oqaasii' },
  kn: { description: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  kr: { description: 'Kanuri', nativeName: 'Kanuri' },
  ks: { description: 'Kashmiri', nativeName: 'कश्मीरी, كشميري‎' },
  kk: { description: 'Kazakh', nativeName: 'Қазақ тілі' },
  km: { description: 'Central Khmer', nativeName: 'ខ្មែរ, ភាសាខ្មែរ' },
  ki: { description: 'Kikuyu, Gikuyu', nativeName: 'Gĩkũyũ' },
  rw: { description: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
  ky: { description: 'Kirghiz, Kyrgyz', nativeName: 'Кыргызча, Кыргыз тили' },
  kv: { description: 'Komi', nativeName: 'коми кыв' },
  kg: { description: 'Kongo', nativeName: 'Kikongo' },
  ko: { description: 'Korean', nativeName: '한국어 (韓國語), 조선말 (朝鮮語)' },
  ku: { description: 'Kurdish', nativeName: 'Kurdî, كوردی‎' },

  // L
  lo: { description: 'Lao', nativeName: 'ພາສາລາວ' },
  la: { description: 'Latin', nativeName: 'latine, lingua latina' },
  lv: { description: 'Latvian', nativeName: 'latviešu valoda' },
  li: { description: 'Limburgan, Limburger, Limburgish', nativeName: 'Limburgs' },
  ln: { description: 'Lingala', nativeName: 'Lingála' },
  lt: { description: 'Lithuanian', nativeName: 'lietuvių kalba' },
  lu: { description: 'Luba-Katanga', nativeName: 'ciluba' },
  lb: { description: 'Luxembourgish, Letzeburgesch', nativeName: 'Lëtzebuergesch' },

  // M
  mk: { description: 'Macedonian', nativeName: 'македонски јазик' },
  mg: { description: 'Malagasy', nativeName: 'Malagasy fiteny' },
  ms: { description: 'Malay', nativeName: 'bahasa Melayu, بهاس ملايو‎' },
  ml: { description: 'Malayalam', nativeName: 'മലയാളം' },
  mt: { description: 'Maltese', nativeName: 'Malti' },
  gv: { description: 'Manx', nativeName: 'Gaelg, Gailck' },
  mi: { description: 'Maori', nativeName: 'te reo Māori' },
  mr: { description: 'Marathi', nativeName: 'मराठी' },
  mh: { description: 'Marshallese', nativeName: 'Kajin M̧ajeļ' },
  mn: { description: 'Mongolian', nativeName: 'монгол' },
  na: { description: 'Nauru', nativeName: 'Ekakairũ Naoero' },
  nv: { description: 'Navajo, Navaho', nativeName: 'Diné bizaad, Dinékʼehǰí' },
  nd: { description: 'Ndebele, North', nativeName: 'isiNdebele' },
  ne: { description: 'Nepali', nativeName: 'नेपाली' },
  se: { description: 'Northern Sami', nativeName: 'Davvisámegiella' },
  no: { description: 'Norwegian', nativeName: 'Norsk' },
  nb: { description: 'Norwegian Bokmål', nativeName: 'Norsk bokmål' },
  nn: { description: 'Norwegian Nynorsk', nativeName: 'Norsk nynorsk' },

  // O
  oc: { description: 'Occitan (post 1500)', nativeName: 'Occitan' },
  or: { description: 'Oriya', nativeName: 'ଓଡ଼ିଆ' },
  om: { description: 'Oromo', nativeName: 'Afaan Oromoo' },
  os: { description: 'Ossetian, Ossetic', nativeName: 'ирон ӕвзаг' },

  // P
  pi: { description: 'Pali', nativeName: 'पालि, Pāli' },
  fa: { description: 'Persian', nativeName: 'فارسی' },
  pl: { description: 'Polish', nativeName: 'polski' },
  pt: { description: 'Portuguese', nativeName: 'Português' },
  pa: { description: 'Panjabi, Punjabi', nativeName: 'ਪੰਜਾਬੀ, پنجابی‎' },
  ps: { description: 'Pushto, Pashto', nativeName: 'پښتو' },

  // Q
  qu: { description: 'Quechua', nativeName: 'Runa Simi, Kichwa' },

  // R
  ro: { description: 'Romanian, Moldavian, Moldovan', nativeName: 'Română' },
  rm: { description: 'Romansh', nativeName: 'Rumantsch Grischun' },
  rn: { description: 'Rundi', nativeName: 'Kirundi' },
  ru: { description: 'Russian', nativeName: 'русский язык' },

  // S
  sm: { description: 'Samoan', nativeName: 'gagana faa Samoa' },
  sg: { description: 'Sango', nativeName: 'yângâ tî sängö' },
  sa: { description: 'Sanskrit', nativeName: 'संस्कृतम्' },
  sc: { description: 'Sardinian', nativeName: 'sardu' },
  gd: { description: 'Gaelic, Scottish Gaelic', nativeName: 'Gàidhlig' },
  sr: { description: 'Serbian', nativeName: 'српски језик' },
  sn: { description: 'Shona', nativeName: 'chiShona' },
  sd: { description: 'Sindhi', nativeName: 'सिन्धी, سنڌي، سندھی‎' },
  si: { description: 'Sinhala, Sinhalese', nativeName: 'සිංහල' },
  sk: { description: 'Slovak', nativeName: 'slovenčina, slovenský jazyk' },
  sl: { description: 'Slovenian', nativeName: 'slovenski jezik, slovenščina' },
  so: { description: 'Somali', nativeName: 'Soomaaliga, af Soomaali' },
  st: { description: 'Southern Sotho', nativeName: 'Sesotho' },
  es: { description: 'Spanish, Castilian', nativeName: 'Español' },
  su: { description: 'Sundanese', nativeName: 'Basa Sunda' },
  sw: { description: 'Swahili', nativeName: 'Kiswahili' },
  ss: { description: 'Swati', nativeName: 'SiSwati' },
  sv: { description: 'Swedish', nativeName: 'svenska' },

  // T
  tl: { description: 'Tagalog', nativeName: 'Tagalog' },
  ty: { description: 'Tahitian', nativeName: 'Reo Tahiti' },
  tg: { description: 'Tajik', nativeName: 'тоҷикӣ, toçikī, تاجیکی‎' },
  ta: { description: 'Tamil', nativeName: 'தமிழ்' },
  tt: { description: 'Tatar', nativeName: 'татар теле, tatar tele' },
  te: { description: 'Telugu', nativeName: 'తెలుగు' },
  th: { description: 'Thai', nativeName: 'ไทย' },
  bo: { description: 'Tibetan', nativeName: 'བོད་ཡིག' },
  ti: { description: 'Tigrinya', nativeName: 'ትግርኛ' },
  to: { description: 'Tonga (Tonga Islands)', nativeName: 'faka Tonga' },
  ts: { description: 'Tsonga', nativeName: 'Tsonga' },
  tn: { description: 'Tswana', nativeName: 'Setswana' },
  tr: { description: 'Turkish', nativeName: 'Türkçe' },
  tk: { description: 'Turkmen', nativeName: 'Türkmen, Түркмен' },
  tw: { description: 'Twi', nativeName: 'Twi' },

  // U
  ug: { description: 'Uighur, Uyghur', nativeName: 'Uyƣurqə, ئۇيغۇرچە‎' },
  uk: { description: 'Ukrainian', nativeName: 'Українська' },
  ur: { description: 'Urdu', nativeName: 'اردو' },
  uz: { description: 'Uzbek', nativeName: 'Ўзбек, ‫اوزبېک‎' },

  // V
  ve: { description: 'Venda', nativeName: 'Tshivenḓa' },
  vi: { description: 'Vietnamese', nativeName: 'Tiếng Việt' },

  // W
  vo: { description: 'Volapük', nativeName: 'Volapük' },
  wa: { description: 'Walloon', nativeName: 'Walon' },
  cy: { description: 'Welsh', nativeName: 'Cymraeg' },

  // X
  xh: { description: 'Xhosa', nativeName: 'isiXhosa' },

  // Y
  yi: { description: 'Yiddish', nativeName: 'ייִדיש' },
  yo: { description: 'Yoruba', nativeName: 'Yorùbá' },

  // Z
  za: { description: 'Zhuang, Chuang', nativeName: 'Saɯ cueŋƅ, Saw cuengh' },
  zu: { description: 'Zulu', nativeName: 'isiZulu' },
};
export const ISO_LANGUAGES_SELECT = [{value: "es", label: "Español"}, ...Object.entries(ISO_LANGUAGES).filter(([code]) => code !== "es").map(([code, data]) => ({
  value: code,
  label: data.description
}))];
export const ISO_COUNTRIES_SELECT = [{value: "ES", label: "España", flag: ISO_COUNTRIES["ES"].flag}, ...Object.entries(ISO_COUNTRIES).filter(([code]) => code !== "ES").map(([code, data]) => ({
  value: code,
  label: data.description,
  flag: data.flag
}))]; ;
