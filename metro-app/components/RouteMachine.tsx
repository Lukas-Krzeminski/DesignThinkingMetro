"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, Languages, Accessibility, Printer, Camera,
  ArrowRight, Train, MapPin, Clock, ArrowLeftRight,
  CheckCircle, AlertTriangle, ChevronRight, X, Map, Home,
} from "lucide-react";
import {
  findRouteFromAvenida,
  searchStations,
  LINE_COLORS,
  LINE_STATIONS,
  type RouteResult,
  type RouteStep,
} from "@/lib/metroData";

type Lang = "en" | "es" | "fr" | "zh" | "ar" | "pt";
type Screen = "home" | "map" | "lang";

const LANG_OPTIONS: { code: Lang; native: string; label: string }[] = [
  { code: "en", native: "English",   label: "EN" },
  { code: "es", native: "Español",   label: "ES" },
  { code: "fr", native: "Français",  label: "FR" },
  { code: "zh", native: "中文",       label: "ZH" },
  { code: "ar", native: "العربية",   label: "AR" },
  { code: "pt", native: "Português", label: "PT" },
];

type K =
  | "currentStation" | "platform" | "upcoming" | "routeAssistant"
  | "searchPlaceholder" | "findRoute" | "destination"
  | "transfer" | "access" | "stepFree" | "from" | "to" | "estTime"
  | "price" | "steps" | "direction" | "lines" | "stepByStep"
  | "tryAnother" | "takePhoto" | "print" | "photoSaved" | "printing"
  | "selectLanguage" | "homeLabel" | "mapLabel" | "accessLabel" | "languageLabel"
  | "min" | "full" | "ltd" | "routeUnavailable" | "notFoundMsg"
  | "here" | "accessibleOnly" | "limitedWarning";

const S: Record<K, Record<Lang, string>> = {
  currentStation:   { en: "Current Station",             es: "Estación Actual",             fr: "Station Actuelle",              zh: "当前站",       ar: "المحطة الحالية",         pt: "Estação Atual"              },
  platform:         { en: "Platform 1",                  es: "Andén 1",                     fr: "Quai 1",                        zh: "1号站台",      ar: "الرصيف 1",              pt: "Plataforma 1"               },
  upcoming:         { en: "Upcoming Stations",            es: "Próximas Estaciones",          fr: "Prochaines Stations",           zh: "即将到站",     ar: "المحطات القادمة",        pt: "Próximas Estações"          },
  routeAssistant:   { en: "Route Assistant",              es: "Asistente de Ruta",           fr: "Assistant Itinéraire",          zh: "路线助手",     ar: "مساعد الطريق",           pt: "Assistente de Rota"         },
  searchPlaceholder:{ en: "Search any station...",        es: "Busca cualquier estación...", fr: "Chercher une station...",       zh: "搜索车站...",  ar: "ابحث عن محطة...",        pt: "Pesquisar estação..."       },
  findRoute:        { en: "Find Route",                   es: "Buscar Ruta",                 fr: "Trouver Itinéraire",            zh: "查找路线",     ar: "ابحث عن طريق",           pt: "Encontrar Rota"             },
  destination:      { en: "Destination",                  es: "Destino",                     fr: "Destination",                   zh: "目的地",       ar: "الوجهة",                pt: "Destino"                    },
  transfer:         { en: "transfer",                     es: "transbordo",                  fr: "correspondance",                zh: "换乘",        ar: "تحويل",                 pt: "transferência"              },
  access:           { en: "access",                       es: "acceso",                      fr: "accès",                         zh: "无障碍",       ar: "وصول",                  pt: "acesso"                     },
  stepFree:         { en: "Step-free route only",         es: "Solo ruta accesible",         fr: "Itinéraire accessible",         zh: "仅无障碍路线", ar: "مسار خالٍ من العقبات",   pt: "Apenas rota acessível"      },
  from:             { en: "From",                         es: "Desde",                       fr: "De",                            zh: "从",          ar: "من",                    pt: "De"                         },
  to:               { en: "To",                           es: "Hasta",                       fr: "À",                             zh: "到",          ar: "إلى",                   pt: "Para"                       },
  estTime:          { en: "Est. time",                    es: "Tiempo est.",                 fr: "Temps est.",                    zh: "预计时间",     ar: "الوقت المقدر",           pt: "Tempo est."                 },
  price:            { en: "Price",                        es: "Precio",                      fr: "Prix",                          zh: "票价",        ar: "السعر",                 pt: "Preço"                      },
  steps:            { en: "Steps",                        es: "Pasos",                       fr: "Étapes",                        zh: "步骤",        ar: "خطوات",                 pt: "Passos"                     },
  direction:        { en: "direction",                    es: "dirección",                   fr: "direction",                     zh: "方向",        ar: "اتجاه",                 pt: "direção"                    },
  lines:            { en: "Lines",                        es: "Líneas",                      fr: "Lignes",                        zh: "线路",        ar: "الخطوط",                pt: "Linhas"                     },
  stepByStep:       { en: "Step by step",                 es: "Paso a paso",                 fr: "Étape par étape",               zh: "逐步指引",     ar: "خطوة بخطوة",             pt: "Passo a passo"              },
  tryAnother:       { en: "Try another destination",      es: "Probar otro destino",         fr: "Essayer une autre destination", zh: "尝试其他目的地", ar: "جرب وجهة أخرى",        pt: "Tente outro destino"        },
  takePhoto:        { en: "Take Photo",                   es: "Foto",                        fr: "Photo",                         zh: "拍照",        ar: "التقط صورة",             pt: "Tirar Foto"                 },
  print:            { en: "Print · 0.25",                 es: "Imprimir · 0,25",            fr: "Imprimer · 0,25",               zh: "打印 · 0.25", ar: "طباعة · 0.25",           pt: "Imprimir · 0,25"            },
  photoSaved:       { en: "Route saved as photo.",        es: "Ruta guardada como foto.",    fr: "Itinéraire sauvegardé.",        zh: "路线已保存。",  ar: "تم حفظ الطريق.",         pt: "Rota guardada como foto."   },
  printing:         { en: "Printing...",                  es: "Imprimiendo...",              fr: "Impression...",                 zh: "打印中...",    ar: "جارٍ الطباعة...",        pt: "Imprimindo..."              },
  selectLanguage:   { en: "Select Language",              es: "Seleccionar Idioma",          fr: "Choisir Langue",                zh: "选择语言",     ar: "اختر اللغة",             pt: "Selecionar Idioma"          },
  homeLabel:        { en: "Home",                         es: "Inicio",                      fr: "Accueil",                       zh: "主页",        ar: "الرئيسية",              pt: "Início"                     },
  mapLabel:         { en: "Map",                          es: "Mapa",                        fr: "Plan",                          zh: "地图",        ar: "الخريطة",               pt: "Mapa"                       },
  accessLabel:      { en: "Access",                       es: "Acceso",                      fr: "Accès",                         zh: "无障碍",       ar: "وصول",                  pt: "Acesso"                     },
  languageLabel:    { en: "Language",                     es: "Idioma",                      fr: "Langue",                        zh: "语言",        ar: "اللغة",                 pt: "Idioma"                     },
  min:              { en: "min",                          es: "min",                         fr: "min",                           zh: "分钟",        ar: "دقيقة",                 pt: "min"                        },
  full:             { en: "Full",                         es: "Total",                       fr: "Total",                         zh: "完整",        ar: "كامل",                  pt: "Total"                      },
  ltd:              { en: "Ltd.",                         es: "Ltd.",                        fr: "Ltd.",                          zh: "有限",        ar: "محدود",                 pt: "Ltd."                       },
  routeUnavailable: { en: "Route preview unavailable",    es: "Vista previa no disponible",  fr: "Aperçu non disponible",         zh: "路线预览不可用", ar: "المعاينة غير متاحة",    pt: "Pré-visualização indisponível" },
  notFoundMsg:      { en: "Check the full Metro map or ask staff.", es: "Consulta el mapa o al personal.", fr: "Consultez le plan ou le personnel.", zh: "请查看地铁图。", ar: "راجع خريطة المترو.", pt: "Consulte o mapa do Metro." },
  here:             { en: "Here",                         es: "Aquí",                        fr: "Ici",                           zh: "此处",        ar: "هنا",                   pt: "Aqui"                       },
  accessibleOnly:   { en: "Step-free routes only",        es: "Solo rutas accesibles",       fr: "Itinéraires accessibles",       zh: "仅无障碍路线", ar: "مسارات خالية من العقبات", pt: "Apenas rotas acessíveis"   },
  limitedWarning:   { en: "Some stations on this route have limited step-free access.", es: "Algunas estaciones tienen accesibilidad limitada.", fr: "Certaines stations ont un accès limité.", zh: "部分站点无障碍设施有限。", ar: "بعض المحطات لديها وصول محدود.", pt: "Algumas estações têm acesso limitado." },
};

const QUICK_DESTINATIONS = [
  "Sol", "Gran Vía", "Argüelles", "Las Rosas",
  "Paco de Lucía", "Hospital del Henares", "Pinar de Chamartín",
  "Aeropuerto T4", "Retiro", "Nuevos Ministerios",
];

const STATION_LINES = [4, 6, 7, 9];

// Station -> list of lines serving it (built once at module level)
const CONNECTION_MAP: Record<string, number[]> = (() => {
  const map: Record<string, number[]> = {};
  for (const [lineStr, stations] of Object.entries(LINE_STATIONS)) {
    const line = Number(lineStr);
    for (const station of stations) {
      if (!map[station]) map[station] = [];
      map[station].push(line);
    }
  }
  return map;
})();

// ── Shared sub-components ─────────────────────────────────────────────────────

function LineBadge({ line, size = "sm" }: { line: number; size?: "sm" | "md" | "lg" }) {
  const c = LINE_COLORS[line];
  if (!c) return null;
  const cls =
    size === "lg" ? "w-11 h-11 rounded-xl text-base"
    : size === "md" ? "w-8 h-8 rounded-lg text-sm"
    : "w-5 h-5 rounded text-[10px]";
  return (
    <span
      className={`inline-flex items-center justify-center font-bold flex-shrink-0 ${cls}`}
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {line}
    </span>
  );
}

function RouteStrip({ steps }: { steps: RouteStep[] }) {
  const boards = steps.filter((s) => s.type === "board");
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {boards.map((s, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ArrowRight className="w-3 h-3 text-slate-500" />}
          {s.line && (
            <span
              className="px-2 py-0.5 rounded text-xs font-bold"
              style={{
                backgroundColor: LINE_COLORS[s.line]?.bg ?? "#555",
                color: LINE_COLORS[s.line]?.text ?? "#fff",
              }}
            >
              L{s.line}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

// ── Receipt overlay ────────────────────────────────────────────────────────────

function RouteReceipt({ route, lang, onClose }: {
  route: RouteResult;
  lang: Lang;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"printing" | "done">("printing");
  const t = (k: K) => S[k][lang];

  useEffect(() => {
    const id = setTimeout(() => setPhase("done"), 2200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4">
        {phase === "printing" ? (
          <div className="bg-[#0b1629] rounded-t-2xl border-t border-x border-white/10 px-8 py-10 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spinner" />
            <p className="text-blue-300 text-sm font-medium tracking-wide">{t("printing")}</p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div
              className="bg-white rounded-t-2xl px-6 pt-6 pb-8 text-slate-800 shadow-2xl"
              style={{ fontFamily: "monospace" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#CC0000]" />
                  <span className="font-bold text-sm text-[#CC0000]">Metro Madrid</span>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="border-t border-dashed border-slate-300 my-3" />
              <div className="text-xs space-y-1.5 text-slate-700">
                {([
                  [t("from"), "Avenida de América"],
                  [t("to"), route.destination],
                  [t("estTime"), `${route.time} ${t("min")}`],
                  [t("steps"), `${route.transfers}`],
                ] as [string, string][]).map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-slate-300 my-3" />
              <div className="text-xs space-y-1 text-slate-600">
                <p className="font-semibold text-slate-800 mb-1.5">{t("stepByStep")}</p>
                {route.steps.map((step, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-400 w-4 shrink-0">{i + 1}.</span>
                    <span>{lang === "es" && step.textEs ? step.textEs : step.text}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-slate-300 my-3" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{t("price")}</span>
                <span className="font-bold text-sm">0.25</span>
              </div>
              <div className="mt-4 flex gap-px justify-center opacity-25">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-800"
                    style={{ width: i % 3 === 0 ? "3px" : "1px", height: i % 5 === 0 ? "24px" : "16px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Home screen ────────────────────────────────────────────────────────────────

function HomeScreen({
  lang,
  activeLine,
  onLineChange,
}: {
  lang: Lang;
  activeLine: number;
  onLineChange: (line: number) => void;
}) {
  const t = (k: K) => S[k][lang];
  const stations = LINE_STATIONS[activeLine] ?? [];
  const currentIdx = stations.findIndex((s) => s === "Avenida de América");
  const activeColor = LINE_COLORS[activeLine];

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #003a8c 0%, #001e5a 100%)" }}
    >
      {/* Line selector tabs */}
      <div className="flex justify-center gap-3 pt-5 pb-4">
        {STATION_LINES.map((line) => (
          <button
            key={line}
            onClick={() => onLineChange(line)}
            className={`w-11 h-11 rounded-xl font-bold text-base flex items-center justify-center transition-all duration-200 ${
              activeLine === line
                ? "ring-2 ring-white/60 scale-110 shadow-xl"
                : "opacity-45 hover:opacity-70 hover:scale-105"
            }`}
            style={{ backgroundColor: LINE_COLORS[line].bg, color: LINE_COLORS[line].text }}
          >
            {line}
          </button>
        ))}
      </div>

      {/* Station header */}
      <div className="text-center px-6 pb-4 border-b border-white/10">
        <p className="text-blue-200/50 text-[10px] uppercase tracking-widest mb-2">
          {t("currentStation")}
        </p>
        <h1 className="text-white font-bold text-2xl leading-tight tracking-tight">
          Avenida de América
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span
            className="w-6 h-6 rounded text-xs font-bold flex items-center justify-center"
            style={{ backgroundColor: activeColor?.bg, color: activeColor?.text }}
          >
            {activeLine}
          </span>
          <p className="text-blue-200/60 text-xs">{t("platform")}</p>
        </div>
      </div>

      {/* Station list */}
      <div className="flex-1 overflow-y-auto py-3 px-4">
        <p className="text-blue-200/40 text-[10px] uppercase tracking-widest mb-3 text-center">
          {t("upcoming")}
        </p>

        {/* Track line + stations */}
        <div className="relative">
          {/* Vertical track */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 100%)" }}
          />

          {stations.map((station, idx) => {
            const isCurrent = station === "Avenida de América";
            const isPast = idx < currentIdx;
            const connections = (CONNECTION_MAP[station] ?? []).filter((l) => l !== activeLine);

            return (
              <div
                key={`${station}-${idx}`}
                className={`relative flex items-center gap-3 py-1.5 pl-2 pr-2 rounded-lg mb-0.5 transition-colors ${
                  isCurrent ? "bg-white/12 border border-white/15" : ""
                }`}
              >
                {/* Track dot */}
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 border-2 z-10 flex items-center justify-center ${
                    isCurrent
                      ? "border-white bg-white"
                      : isPast
                      ? "border-white/20 bg-transparent"
                      : "border-white/40 bg-transparent"
                  }`}
                  style={isCurrent ? { boxShadow: "0 0 8px rgba(255,255,255,0.5)" } : {}}
                >
                  {isCurrent && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor?.bg }} />
                  )}
                </div>

                {/* Station name */}
                <span
                  className={`flex-1 text-sm leading-snug min-w-0 truncate ${
                    isCurrent
                      ? "text-white font-semibold"
                      : isPast
                      ? "text-blue-200/30"
                      : "text-blue-100/75"
                  }`}
                >
                  {station}
                </span>

                {/* You are here label */}
                {isCurrent && (
                  <span className="text-[9px] text-white/60 bg-white/10 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                    {t("here")}
                  </span>
                )}

                {/* Connection badges */}
                {connections.length > 0 && (
                  <div className="flex gap-0.5 flex-shrink-0">
                    {connections.map((l) => (
                      <LineBadge key={l} line={l} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Language picker screen ─────────────────────────────────────────────────────

function LangScreen({ lang, onSelect }: { lang: Lang; onSelect: (l: Lang) => void }) {
  return (
    <div className="flex-1 flex flex-col px-5 py-6">
      <h2 className="text-white font-bold text-lg text-center mb-6">
        {S.selectLanguage[lang]}
      </h2>
      <div className="flex flex-col gap-2.5">
        {LANG_OPTIONS.map(({ code, native, label }) => (
          <button
            key={code}
            onClick={() => onSelect(code)}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-200 active:scale-98 ${
              lang === code
                ? "bg-white/15 border-white/30 text-white"
                : "bg-white/4 border-white/8 text-slate-300 hover:bg-white/8 hover:border-white/18 hover:text-white"
            }`}
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{
                background: lang === code ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                color: lang === code ? "#fff" : "#94a3b8",
              }}
            >
              {label}
            </span>
            <span className="font-medium flex-1 text-left">{native}</span>
            {lang === code && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Map / route search screen ─────────────────────────────────────────────────

function MapScreen({ lang, accessibleOnly }: { lang: Lang; accessibleOnly: boolean }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [searched, setSearched] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [photoToast, setPhotoToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = (k: K) => S[k][lang];

  function handleInputChange(value: string) {
    setInput(value);
    setSuggestions(value.trim().length >= 2 ? searchStations(value, 6) : []);
  }

  function handleSearch(dest?: string) {
    const query = (dest ?? input).trim();
    if (!query) return;
    setSuggestions([]);
    setInput(dest ?? input);
    const found = findRouteFromAvenida(query);
    setSearched(query);
    if (found) { setRoute(found); setNotFound(false); }
    else        { setRoute(null); setNotFound(true);  }
  }

  function handleReset() {
    setRoute(null); setNotFound(false);
    setInput(""); setSearched(""); setSuggestions([]);
    inputRef.current?.focus();
  }

  function handlePhoto() {
    setPhotoToast(true);
    setTimeout(() => setPhotoToast(false), 2800);
  }

  return (
    <>
      <div className="flex-1 flex flex-col px-5 py-4 gap-3.5 overflow-y-auto">
        {/* Accessible banner */}
        {accessibleOnly && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-xs">
            <Accessibility className="w-3.5 h-3.5 shrink-0" />
            <span>{t("accessibleOnly")}</span>
          </div>
        )}

        {/* Search field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/7 transition-all duration-200"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d1e3a] border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-center gap-2"
                >
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick destination chips */}
        {!route && !notFound && (
          <div className="flex flex-wrap gap-1.5">
            {QUICK_DESTINATIONS.map((dest) => (
              <button
                key={dest}
                onClick={() => handleSearch(dest)}
                className="px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-xs text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
              >
                {dest}
              </button>
            ))}
          </div>
        )}

        {/* Find Route button */}
        {!route && !notFound && (
          <button
            onClick={() => handleSearch()}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0055A4 0%, #003d7a 100%)",
              boxShadow: "0 4px 20px rgba(0,85,164,0.25)",
            }}
          >
            <Search className="w-4 h-4" />
            {t("findRoute")}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Route result */}
        {route && (
          <div className="flex flex-col gap-3 animate-fade-in">
            {/* Summary card */}
            <div
              className="rounded-2xl p-4 border border-blue-500/18"
              style={{ background: "rgba(0,50,130,0.22)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-blue-300/60 text-[10px] uppercase tracking-widest mb-0.5">
                    {t("destination")}
                  </p>
                  <h2 className="text-white font-bold text-lg leading-tight">{route.destination}</h2>
                </div>
                <button
                  onClick={handleReset}
                  className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <Clock          className={`w-3.5 h-3.5 text-blue-400   mx-auto mb-1`} />, val: `${route.time}`,      sub: t("min")      },
                  { icon: <ArrowLeftRight className={`w-3.5 h-3.5 text-orange-400 mx-auto mb-1`} />, val: `${route.transfers}`, sub: t("transfer") },
                  {
                    icon: route.accessible
                      ? <CheckCircle  className="w-3.5 h-3.5 text-green-400 mx-auto mb-1" />
                      : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />,
                    val: route.accessible ? t("full") : t("ltd"),
                    sub: t("access"),
                  },
                ].map(({ icon, val, sub }, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-2 text-center">
                    {icon}
                    <p className="text-white font-bold text-sm leading-none">{val}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Accessible warning */}
              {accessibleOnly && !route.accessible && (
                <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-amber-500/8 border border-amber-500/18 rounded-xl">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-amber-300 text-[11px] leading-relaxed">{t("limitedWarning")}</p>
                </div>
              )}

              {/* Line strip */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">{t("lines")}</p>
                <RouteStrip steps={route.steps} />
              </div>
            </div>

            {/* Step by step */}
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2.5 px-1">
                {t("stepByStep")}
              </p>
              {route.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 px-1">
                  <div className="flex flex-col items-center shrink-0 mt-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        step.type === "start"    ? "bg-blue-500/20 border border-blue-500/40"
                        : step.type === "arrive" ? "bg-green-500/20 border border-green-500/40"
                        : step.type === "transfer" ? "bg-orange-500/20 border border-orange-500/40"
                        : "bg-white/5 border border-white/10"
                      }`}
                    >
                      {step.type === "start"    && <MapPin          className="w-2.5 h-2.5 text-blue-400" />}
                      {step.type === "arrive"   && <CheckCircle     className="w-2.5 h-2.5 text-green-400" />}
                      {step.type === "transfer" && <ArrowLeftRight  className="w-2.5 h-2.5 text-orange-400" />}
                      {step.type === "board" && step.line && (
                        <span
                          className="font-bold"
                          style={{ fontSize: "8px", color: LINE_COLORS[step.line]?.bg ?? "#fff" }}
                        >
                          {step.line}
                        </span>
                      )}
                    </div>
                    {i < route.steps.length - 1 && (
                      <div className="w-px h-4 bg-white/10 mt-0.5" />
                    )}
                  </div>
                  <div className="pb-3 flex-1 min-w-0">
                    <p className="text-white text-sm leading-snug flex items-center gap-2 flex-wrap">
                      {lang === "es" && step.textEs ? step.textEs : step.text}
                      {step.line && <LineBadge line={step.line} />}
                    </p>
                    {step.direction && (
                      <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        {t("direction")}{" "}
                        <span className="text-slate-400 font-medium">{step.direction}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handlePhoto}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-200"
              >
                <Camera className="w-4 h-4" />
                {t("takePhoto")}
              </button>
              <button
                onClick={() => setShowReceipt(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium active:scale-95 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #0055A4 0%, #003d7a 100%)",
                  boxShadow: "0 4px 16px rgba(0,85,164,0.25)",
                }}
              >
                <Printer className="w-4 h-4" />
                {t("print")}
              </button>
            </div>
          </div>
        )}

        {/* Not found */}
        {notFound && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="rounded-2xl p-5 border border-white/8 bg-white/3 text-center">
              <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-white font-semibold text-sm mb-2">{t("routeUnavailable")}</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                "{searched}" — {t("notFoundMsg")}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-all duration-200"
            >
              {t("tryAnother")}
            </button>
          </div>
        )}
      </div>

      {/* Photo toast (positioned within machine) */}
      {photoToast && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 animate-toast pointer-events-none">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900 border border-white/10 shadow-2xl whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-medium">{t("photoSaved")}</span>
          </div>
        </div>
      )}

      {showReceipt && route && (
        <RouteReceipt route={route} lang={lang} onClose={() => setShowReceipt(false)} />
      )}
    </>
  );
}

// ── Main machine ──────────────────────────────────────────────────────────────

export function RouteMachine() {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<Screen>("home");
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [activeLine, setActiveLine] = useState(4);

  const t = (k: K) => S[k][lang];
  const isRTL = lang === "ar";

  function handleAccessButton() {
    if (screen === "home") {
      setAccessibleOnly((v) => !v);
      setScreen("map");
    } else {
      setAccessibleOnly((v) => !v);
    }
  }

  function handleLangSelect(l: Lang) {
    setLang(l);
    setScreen("home");
  }

  const currentLangLabel = LANG_OPTIONS.find((o) => o.code === lang)?.label ?? "EN";

  return (
    <div className="relative min-h-screen bg-[#030a14] flex items-center justify-center px-4 py-8">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-blue-900/15 blur-[120px] rounded-full" />
      </div>

      {/* ── Outer bezel ── */}
      <div
        className="relative bezel-gloss w-full max-w-[560px] rounded-[2.5rem] overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1c1c1c 0%, #0e0e0e 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.85), 0 0 60px rgba(0,60,180,0.1), inset 0 1px 0 rgba(255,255,255,0.09)",
        }}
      >
        {/* Top notch */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-16 h-1 rounded-full bg-white/10" />
        </div>

        {/* ── Screen ── */}
        <div
          className="mx-3 mb-3 rounded-[1.75rem] overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(180deg, #031229 0%, #040e22 60%, #020b18 100%)",
            minHeight: "820px",
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Top header bar */}
          <div
            className="px-5 pt-5 pb-3 border-b border-white/5 flex items-center gap-3 flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #091e3d 0%, transparent 100%)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#CC0000" }}
            >
              <Train className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">Metro Madrid</p>
              <p className="text-blue-300/55 text-[10px] mt-0.5 truncate">
                {screen === "home"
                  ? "Avenida de América"
                  : screen === "lang"
                  ? t("selectLanguage")
                  : t("routeAssistant")}
              </p>
            </div>
            {/* Line badges in header when on home screen */}
            {screen === "home" && (
              <div className="flex gap-1 flex-shrink-0">
                {STATION_LINES.map((l) => (
                  <span
                    key={l}
                    className="w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: LINE_COLORS[l].bg, color: LINE_COLORS[l].text }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Screen content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {screen === "home" && (
              <HomeScreen lang={lang} activeLine={activeLine} onLineChange={setActiveLine} />
            )}
            {screen === "map" && (
              <MapScreen lang={lang} accessibleOnly={accessibleOnly} />
            )}
            {screen === "lang" && (
              <LangScreen lang={lang} onSelect={handleLangSelect} />
            )}
          </div>

          {/* ── Bottom navigation ── */}
          <div className="border-t border-white/5 px-4 py-3 flex items-center justify-around flex-shrink-0">
            {[
              { Icon: Home,          label: t("homeLabel"),   action: () => setScreen("home"), active: screen === "home" },
              { Icon: Map,           label: t("mapLabel"),    action: () => setScreen("map"),  active: screen === "map"  },
              { Icon: Accessibility, label: t("accessLabel"), action: handleAccessButton,      active: accessibleOnly    },
            ].map(({ Icon, label, action, active }) => (
              <button
                key={label}
                onClick={action}
                className={`flex flex-col items-center gap-1 transition-colors duration-200 py-1 px-3 rounded-xl ${
                  active ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{label}</span>
                {active && <div className="w-1 h-1 rounded-full bg-white/50 -mt-0.5" />}
              </button>
            ))}

            <div className="w-px h-6 bg-white/8 flex-shrink-0" />

            <button
              onClick={() => setScreen(screen === "lang" ? "home" : "lang")}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 py-1 px-3 rounded-xl ${
                screen === "lang" ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span className="text-[10px]">{currentLangLabel}</span>
              {screen === "lang" && <div className="w-1 h-1 rounded-full bg-white/50 -mt-0.5" />}
            </button>
          </div>
        </div>

        {/* Bottom bezel bar */}
        <div className="flex justify-center pb-4 pt-1">
          <div className="w-24 h-1 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
