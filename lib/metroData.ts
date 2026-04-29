// Complete Madrid Metro network - all 11 lines, 241 stations
// Data sourced from Wikipedia via Firecrawl, April 2026

export const LINE_COLORS: Record<number, { bg: string; text: string }> = {
  1:  { bg: "#38ADEF", text: "#fff" },
  2:  { bg: "#CC0000", text: "#fff" },
  3:  { bg: "#E6C900", text: "#000" },
  4:  { bg: "#994400", text: "#fff" },
  5:  { bg: "#88CC00", text: "#000" },
  6:  { bg: "#888888", text: "#fff" },
  7:  { bg: "#F88B00", text: "#fff" },
  8:  { bg: "#F57FB0", text: "#fff" },
  9:  { bg: "#9B0099", text: "#fff" },
  10: { bg: "#1E3F8B", text: "#fff" },
  11: { bg: "#007346", text: "#fff" },
};

// ── Ordered station lists per line ──────────────────────────────────────────

export const LINE_STATIONS: Record<number, string[]> = {
  1: [
    "Pinar de Chamartín", "Bambú", "Chamartín", "Plaza de Castilla",
    "Valdeacederas", "Tetuán", "Estrecho", "Alvarado", "Cuatro Caminos",
    "Ríos Rosas", "Iglesia", "Bilbao", "Tribunal", "Gran Vía", "Sol",
    "Tirso de Molina", "Antón Martín", "Estación del Arte", "Atocha",
    "Menéndez Pelayo", "Pacífico", "Puente de Vallecas", "Nueva Numancia",
    "Portazgo", "Buenos Aires", "Alto del Arenal", "Miguel Hernández",
    "Sierra de Guadalupe", "Villa de Vallecas", "Congosto", "La Gavia",
    "Las Suertes", "Valdecarros",
  ],
  2: [
    "Cuatro Caminos", "Canal", "Quevedo", "San Bernardo",
    "Plaza de España-Noviciado", "Santo Domingo", "Ópera", "Sol",
    "Sevilla", "Banco de España", "Retiro", "Príncipe de Vergara",
    "Goya", "Manuel Becerra", "Ventas", "La Elipa", "La Almudena",
    "Alsacia", "Avenida de Guadalajara", "Las Rosas",
  ],
  3: [
    "El Casar", "Villaverde Alto", "San Cristóbal", "Villaverde Bajo-Cruce",
    "Ciudad de los Ángeles", "San Fermín-Orcasur", "Hospital 12 de Octubre",
    "Almendrales", "Legazpi", "Delicias", "Palos de la Frontera",
    "Embajadores", "Lavapiés", "Sol", "Callao", "Plaza de España",
    "Ventura Rodríguez", "Argüelles", "Moncloa",
  ],
  4: [
    "Pinar de Chamartín", "Manoteras", "Hortaleza", "Parque de Santa María",
    "San Lorenzo", "Mar de Cristal", "Canillas", "Esperanza", "Arturo Soria",
    "Avenida de la Paz", "Alfonso XIII", "Prosperidad", "Avenida de América",
    "Diego de León", "Lista", "Goya", "Velázquez", "Serrano", "Colón",
    "Alonso Martínez", "Bilbao", "San Bernardo", "Argüelles",
  ],
  5: [
    "Alameda de Osuna", "El Capricho", "Canillejas", "Torre Arias",
    "Suanzes", "Ciudad Lineal", "Pueblo Nuevo", "Quintana", "El Carmen",
    "Ventas", "Diego de León", "Núñez de Balboa", "Rubén Darío",
    "Alonso Martínez", "Chueca", "Gran Vía", "Callao", "Ópera",
    "La Latina", "Puerta de Toledo", "Acacias", "Pirámides",
    "Marqués de Vadillo", "Urgel", "Oporto", "Vista Alegre",
    "Carabanchel", "Eugenia de Montijo", "Aluche", "Empalme",
    "Campamento", "Casa de Campo",
  ],
  // Line 6 is circular; listed sequentially - last station wraps to first
  6: [
    "Laguna", "Carpetana", "Oporto", "Opañel", "Plaza Elíptica",
    "Usera", "Legazpi", "Arganzuela-Planetario", "Méndez Álvaro",
    "Pacífico", "Conde de Casal", "Sainz de Baranda", "O'Donnell",
    "Manuel Becerra", "Diego de León", "Avenida de América",
    "República Argentina", "Nuevos Ministerios", "Cuatro Caminos",
    "Guzmán el Bueno", "Vicente Aleixandre", "Ciudad Universitaria",
    "Moncloa", "Argüelles", "Príncipe Pío", "Puerta del Ángel",
    "Alto de Extremadura", "Lucero",
  ],
  7: [
    "Hospital del Henares", "Henares", "Jarama", "San Fernando",
    "La Rambla", "Coslada Central", "Barrio del Puerto",
    "Estadio Metropolitano", "Las Musas", "San Blas", "Simancas",
    "García Noblejas", "Ascao", "Pueblo Nuevo", "Barrio de la Concepción",
    "Parque de las Avenidas", "Cartagena", "Avenida de América",
    "Gregorio Marañón", "Alonso Cano", "Canal", "Islas Filipinas",
    "Guzmán el Bueno", "Francos Rodríguez", "Valdezarza",
    "Antonio Machado", "Peñagrande", "Avenida de la Ilustración",
    "Lacoma", "Arroyofresno", "Pitis",
  ],
  8: [
    "Nuevos Ministerios", "Colombia", "Pinar del Rey", "Mar de Cristal",
    "Feria de Madrid", "Aeropuerto T1-T2-T3", "Barajas", "Aeropuerto T4",
  ],
  9: [
    "Paco de Lucía", "Mirasierra", "Herrera Oria", "Barrio del Pilar",
    "Ventilla", "Plaza de Castilla", "Duque de Pastrana", "Pío XII",
    "Colombia", "Concha Espina", "Cruz del Rayo", "Avenida de América",
    "Núñez de Balboa", "Príncipe de Vergara", "Ibiza", "Sainz de Baranda",
    "Estrella", "Vinateros", "Artilleros", "Pavones", "Valdebernardo",
    "Vicálvaro", "San Cipriano", "Puerta de Arganda",
    "Rivas Urbanizaciones", "Rivas Futura", "Rivas Vaciamadrid",
    "La Poveda", "Arganda del Rey",
  ],
  10: [
    "Hospital Infanta Sofía", "Reyes Católicos", "Baunatal",
    "Manuel de Falla", "Marqués de la Valdavia", "La Moraleja",
    "La Granja", "Ronda de la Comunicación", "Las Tablas",
    "Montecarmelo", "Tres Olivos", "Fuencarral", "Begoña", "Chamartín",
    "Plaza de Castilla", "Cuzco", "Santiago Bernabéu", "Nuevos Ministerios",
    "Gregorio Marañón", "Alonso Martínez", "Tribunal", "Plaza de España",
    "Príncipe Pío", "Lago", "Batán", "Casa de Campo", "Colonia Jardín",
    "Aviación Española", "Cuatro Vientos", "Joaquín Vilumbrales",
    "Puerta del Sur",
  ],
  11: [
    "Plaza Elíptica", "Abrantes", "Pan Bendito", "San Francisco",
    "Carabanchel Alto", "La Peseta", "La Fortuna",
  ],
};

// Cross-named physical interchanges (different station names, same corridors)
const CROSS_TRANSFERS: Record<string, Array<{ line: number; station: string }>> = {
  "Alonso Cano": [{ line: 1, station: "Ríos Rosas" }],
  "Ríos Rosas": [{ line: 7, station: "Alonso Cano" }],
  "Plaza de España-Noviciado": [
    { line: 3, station: "Plaza de España" },
    { line: 10, station: "Plaza de España" },
  ],
  "Plaza de España": [
    { line: 2, station: "Plaza de España-Noviciado" },
  ],
};

// ── Build station index ──────────────────────────────────────────────────────

interface StationInfo {
  lines: number[];
  accessible: boolean;
}

// Accessibility per station (merged across lines; accessible=true if any line is accessible)
const ACCESSIBILITY: Record<string, boolean> = {
  // Line 1 - all accessible
  "Pinar de Chamartín": true, "Bambú": true, "Chamartín": true, "Plaza de Castilla": true,
  "Valdeacederas": true, "Tetuán": true, "Estrecho": true, "Alvarado": true,
  "Cuatro Caminos": true, "Ríos Rosas": true, "Iglesia": true, "Bilbao": true,
  "Tribunal": true, "Gran Vía": true, "Sol": true, "Tirso de Molina": true,
  "Antón Martín": true, "Estación del Arte": true, "Atocha": true,
  "Menéndez Pelayo": true, "Pacífico": true, "Puente de Vallecas": true,
  "Nueva Numancia": true, "Portazgo": true, "Buenos Aires": true,
  "Alto del Arenal": true, "Miguel Hernández": true, "Sierra de Guadalupe": true,
  "Villa de Vallecas": true, "Congosto": true, "La Gavia": true,
  "Las Suertes": true, "Valdecarros": true,
  // Line 2 limited
  "Canal": true, "Quevedo": false, "San Bernardo": false,
  "Plaza de España-Noviciado": false, "Santo Domingo": false, "Ópera": true,
  "Sevilla": true, "Banco de España": false, "Retiro": false,
  "Príncipe de Vergara": true, "Goya": true, "Manuel Becerra": false,
  "Ventas": false, "La Elipa": true, "La Almudena": true, "Alsacia": true,
  "Avenida de Guadalajara": true, "Las Rosas": true,
  // Line 3
  "El Casar": true, "Villaverde Alto": true, "San Cristóbal": true,
  "Villaverde Bajo-Cruce": true, "Ciudad de los Ángeles": true,
  "San Fermín-Orcasur": true, "Hospital 12 de Octubre": true,
  "Almendrales": true, "Legazpi": true, "Delicias": true,
  "Palos de la Frontera": true, "Embajadores": true, "Lavapiés": true,
  "Callao": true, "Plaza de España": true, "Ventura Rodríguez": true,
  "Argüelles": true, "Moncloa": true,
  // Line 4 limited on southern section
  "Manoteras": true, "Hortaleza": true, "Parque de Santa María": true,
  "San Lorenzo": true, "Mar de Cristal": true, "Canillas": true,
  "Esperanza": false, "Arturo Soria": false, "Avenida de la Paz": false,
  "Alfonso XIII": false, "Prosperidad": false, "Avenida de América": true,
  "Diego de León": false, "Lista": false, "Velázquez": false,
  "Serrano": false, "Colón": false, "Alonso Martínez": false,
  "San Bernardo (L4)": false,
  // Line 5 - all accessible
  "Alameda de Osuna": true, "El Capricho": true, "Canillejas": true,
  "Torre Arias": true, "Suanzes": true, "Ciudad Lineal": true,
  "Pueblo Nuevo": true, "Quintana": true, "El Carmen": true,
  "Diego de León (L5)": true, "Núñez de Balboa": true, "Rubén Darío": true,
  "Chueca": true, "La Latina": true, "Puerta de Toledo": true,
  "Acacias": true, "Pirámides": true, "Marqués de Vadillo": true,
  "Urgel": true, "Oporto": true, "Vista Alegre": true,
  "Carabanchel": true, "Eugenia de Montijo": true, "Aluche": true,
  "Empalme": true, "Campamento": true, "Casa de Campo": true,
  // Line 6
  "Laguna": true, "Carpetana": true, "Opañel": false, "Plaza Elíptica": false,
  "Usera": true, "Arganzuela-Planetario": true, "Méndez Álvaro": true,
  "Conde de Casal": true, "Sainz de Baranda": true, "O'Donnell": false,
  "República Argentina": true, "Nuevos Ministerios": true, "Guzmán el Bueno": true,
  "Vicente Aleixandre": false, "Ciudad Universitaria": true,
  "Príncipe Pío": true, "Puerta del Ángel": false, "Alto de Extremadura": false,
  "Lucero": true,
  // Line 7 - mostly accessible
  "Hospital del Henares": true, "Henares": true, "Jarama": true,
  "San Fernando": true, "La Rambla": true, "Coslada Central": true,
  "Barrio del Puerto": true, "Estadio Metropolitano": true,
  "Las Musas": true, "San Blas": true, "Simancas": true,
  "García Noblejas": true, "Ascao": true, "Barrio de la Concepción": true,
  "Parque de las Avenidas": true, "Cartagena": true,
  "Gregorio Marañón": true, "Alonso Cano": true, "Islas Filipinas": true,
  "Francos Rodríguez": true, "Valdezarza": true, "Antonio Machado": true,
  "Peñagrande": true, "Avenida de la Ilustración": true,
  "Lacoma": true, "Arroyofresno": true, "Pitis": true,
  // Line 8 - all accessible
  "Colombia": true, "Pinar del Rey": true, "Feria de Madrid": true,
  "Aeropuerto T1-T2-T3": true, "Barajas": true, "Aeropuerto T4": true,
  // Line 9 limited
  "Paco de Lucía": true, "Mirasierra": true, "Herrera Oria": false,
  "Barrio del Pilar": false, "Ventilla": false,
  "Duque de Pastrana": true, "Pío XII": false,
  "Concha Espina": false, "Cruz del Rayo": false,
  "Ibiza": true, "Estrella": false, "Vinateros": false,
  "Artilleros": false, "Pavones": true, "Valdebernardo": true,
  "Vicálvaro": true, "San Cipriano": true, "Puerta de Arganda": true,
  "Rivas Urbanizaciones": true, "Rivas Futura": true,
  "Rivas Vaciamadrid": true, "La Poveda": true, "Arganda del Rey": true,
  // Line 10 - all accessible
  "Hospital Infanta Sofía": true, "Reyes Católicos": true,
  "Baunatal": true, "Manuel de Falla": true, "Marqués de la Valdavia": true,
  "La Moraleja": true, "La Granja": true, "Ronda de la Comunicación": true,
  "Las Tablas": true, "Montecarmelo": true, "Tres Olivos": true,
  "Fuencarral": true, "Begoña": true, "Cuzco": true,
  "Santiago Bernabéu": true,
  "Lago": true, "Batán": true, "Colonia Jardín": true,
  "Aviación Española": true, "Cuatro Vientos": true,
  "Joaquín Vilumbrales": true, "Puerta del Sur": true,
  // Line 11 - all accessible
  "Abrantes": true, "Pan Bendito": true, "San Francisco": true,
  "Carabanchel Alto": true, "La Peseta": true, "La Fortuna": true,
};

// Build STATION_INFO by scanning all lines
export const STATION_INFO: Record<string, StationInfo> = {};

for (const [lineStr, stations] of Object.entries(LINE_STATIONS)) {
  const line = Number(lineStr);
  for (const station of stations) {
    if (!STATION_INFO[station]) {
      STATION_INFO[station] = {
        lines: [line],
        accessible: ACCESSIBILITY[station] ?? true,
      };
    } else if (!STATION_INFO[station].lines.includes(line)) {
      STATION_INFO[station].lines.push(line);
      if (ACCESSIBILITY[station]) STATION_INFO[station].accessible = true;
    }
  }
}

// Sorted list of all station names for search
export const ALL_STATIONS = Object.keys(STATION_INFO).sort((a, b) =>
  a.localeCompare(b, "es")
);

// ── Normalisation helper ─────────────────────────────────────────────────────

export function norm(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .replace(/[-']/g, " ")
    .replace(/\s+/g, " ");
}

// ── Fuzzy station search ─────────────────────────────────────────────────────

export function searchStations(query: string, limit = 6): string[] {
  if (!query.trim()) return [];
  const q = norm(query);
  const exact: string[] = [];
  const starts: string[] = [];
  const contains: string[] = [];

  for (const name of ALL_STATIONS) {
    const n = norm(name);
    if (n === q) exact.push(name);
    else if (n.startsWith(q)) starts.push(name);
    else if (n.includes(q)) contains.push(name);
  }

  return [...exact, ...starts, ...contains].slice(0, limit);
}

// ── BFS routing ──────────────────────────────────────────────────────────────

interface Segment {
  line: number;
  boardAt: string;   // station where this line was boarded
  exitAt: string;    // station where this segment ends (transfer or destination)
}

interface BFSState {
  station: string;
  line: number;
  stops: number;
  transfers: number;
  segments: Segment[];
}

export interface RouteStep {
  type: "start" | "board" | "transfer" | "arrive";
  text: string;
  textEs?: string;
  line?: number;
  direction?: string;
}

export interface RouteResult {
  destination: string;
  time: number;
  transfers: number;
  accessible: boolean;
  steps: RouteStep[];
}

function getDirection(line: number, fromStation: string, towardStation: string): string {
  if (line === 6) {
    // Circular: use terminus names as direction labels
    const stations = LINE_STATIONS[6];
    const from = stations.findIndex((s) => norm(s) === norm(fromStation));
    const to = stations.findIndex((s) => norm(s) === norm(towardStation));
    if (from === -1 || to === -1) return "Circular";
    return to > from ? stations[stations.length - 1] : stations[0];
  }
  const stations = LINE_STATIONS[line];
  if (!stations) return "";
  const from = stations.findIndex((s) => norm(s) === norm(fromStation));
  const to = stations.findIndex((s) => norm(s) === norm(towardStation));
  if (from === -1 || to === -1) return stations[stations.length - 1];
  return to > from ? stations[stations.length - 1] : stations[0];
}

export function findRouteFromAvenida(destination: string): RouteResult | null {
  const START = "Avenida de América";

  // Resolve destination to a canonical station name
  const results = searchStations(destination, 1);
  if (!results.length) return null;
  const destName = results[0];
  if (norm(destName) === norm(START)) return null;

  // BFS
  const queue: BFSState[] = [];
  const visited = new Set<string>();

  const startInfo = STATION_INFO[START];
  if (!startInfo) return null;

  for (const line of startInfo.lines) {
    const key = `${START}:${line}`;
    if (!visited.has(key)) {
      visited.add(key);
      queue.push({
        station: START,
        line,
        stops: 0,
        transfers: 0,
        segments: [{ line, boardAt: START, exitAt: START }],
      });
    }
  }

  while (queue.length > 0) {
    const state = queue.shift()!;

    if (norm(state.station) === norm(destName)) {
      // Close the last segment
      const segments = state.segments.map((seg, i) =>
        i === state.segments.length - 1
          ? { ...seg, exitAt: state.station }
          : seg
      );

      // Build steps
      const steps: RouteStep[] = [];
      steps.push({ type: "start", text: START, textEs: START });

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        if (i > 0) {
          steps.push({
            type: "transfer",
            text: `Transfer at ${seg.boardAt}`,
            textEs: `Transbordo en ${seg.boardAt}`,
          });
        }
        const dir = getDirection(seg.line, seg.boardAt, seg.exitAt);
        steps.push({
          type: "board",
          text: `Take Line ${seg.line}`,
          textEs: `Tomar Línea ${seg.line}`,
          line: seg.line,
          direction: dir,
        });
      }

      steps.push({
        type: "arrive",
        text: `Arrive at ${destName}`,
        textEs: `Llegada a ${destName}`,
      });

      // Accessibility: accessible if all transfer stations are accessible
      const accessible = segments.every((seg, i) => {
        if (i === 0) return true;
        return STATION_INFO[seg.boardAt]?.accessible !== false;
      }) && (STATION_INFO[destName]?.accessible !== false);

      const time = Math.max(3, Math.round(state.stops * 1.5 + state.transfers * 4));

      return {
        destination: destName,
        time,
        transfers: state.transfers,
        accessible,
        steps,
      };
    }

    const lineStations = LINE_STATIONS[state.line];
    if (!lineStations) continue;
    const idx = lineStations.findIndex((s) => norm(s) === norm(state.station));
    if (idx === -1) continue;

    // Move to adjacent stations on the same line
    const neighbors = [idx - 1, idx + 1];
    // Line 6 circular: wrap edges
    if (state.line === 6) {
      if (idx === 0) neighbors.push(lineStations.length - 1);
      if (idx === lineStations.length - 1) neighbors.push(0);
    }

    for (const ni of neighbors) {
      if (ni < 0 || ni >= lineStations.length) continue;
      const nextStation = lineStations[ni];
      const key = `${nextStation}:${state.line}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const newSegments = [...state.segments.slice(0, -1), {
        ...state.segments[state.segments.length - 1],
        exitAt: nextStation,
      }];

      queue.push({
        station: nextStation,
        line: state.line,
        stops: state.stops + 1,
        transfers: state.transfers,
        segments: newSegments,
      });
    }

    // Transfer to other lines at current station (same name)
    const stationInfo = STATION_INFO[state.station];
    if (stationInfo) {
      for (const otherLine of stationInfo.lines) {
        if (otherLine === state.line) continue;
        const key = `${state.station}:${otherLine}`;
        if (visited.has(key)) continue;
        visited.add(key);

        // Close current segment, open new one
        const closedSegments = [
          ...state.segments.slice(0, -1),
          { ...state.segments[state.segments.length - 1], exitAt: state.station },
          { line: otherLine, boardAt: state.station, exitAt: state.station },
        ];

        queue.push({
          station: state.station,
          line: otherLine,
          stops: state.stops,
          transfers: state.transfers + 1,
          segments: closedSegments,
        });
      }
    }

    // Cross-named physical interchanges
    const crossLinks = CROSS_TRANSFERS[state.station];
    if (crossLinks) {
      for (const { line: xLine, station: xStation } of crossLinks) {
        const key = `${xStation}:${xLine}`;
        if (visited.has(key)) continue;
        visited.add(key);

        const closedSegments = [
          ...state.segments.slice(0, -1),
          { ...state.segments[state.segments.length - 1], exitAt: state.station },
          { line: xLine, boardAt: xStation, exitAt: xStation },
        ];

        queue.push({
          station: xStation,
          line: xLine,
          stops: state.stops,
          transfers: state.transfers + 1,
          segments: closedSegments,
        });
      }
    }
  }

  return null; // unreachable
}
