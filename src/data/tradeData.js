export const tradeNodes = [
  { code: 'RTM', name: 'Port of Rotterdam', coords: '51.9244° N, 4.4777° E', status: 'Optimal', timeZone: 'CET' },
  { code: 'SIN', name: 'Port of Singapore', coords: '1.29027° N, 103.851959° E', status: 'High Traffic', timeZone: 'SGT' },
  { code: 'HAM', name: 'Port of Hamburg', coords: '53.5511° N, 9.9937° E', status: 'Optimal', timeZone: 'CET' },
  { code: 'DXB', name: 'Jebel Ali Dubai', coords: '25.0112° N, 55.0617° E', status: 'Operational', timeZone: 'GST' },
  { code: 'LAX', name: 'Port of Los Angeles', coords: '33.7432° N, 118.2673° W', status: 'Flow Cleared', timeZone: 'PST' },
  { code: 'PUS', name: 'Port of Busan', coords: '35.1028° N, 129.0403° E', status: 'Operational', timeZone: 'KST' }
]

export const servicesData = [
  {
    index: '01',
    title: 'Import & Export Infrastructure',
    tagline: 'Strategic cross-border market entry and bonded clearance pipelines.',
    description: 'We structure end-to-end import and export frameworks that mitigate geopolitical tariff exposure, streamline automated filing, and maintain uninterrupted trade lane velocity across five continents.',
    capabilities: [
      'Bilateral Trade Agreement Optimization',
      'Bonded Warehouse & Free-Zone Staging',
      'Dual-Use & Export License Verification',
      'Cross-Border Currency & Escrow Reconciliation'
    ],
    route: 'Europe ⇄ East Asia / North America'
  },
  {
    index: '02',
    title: 'Customs Clearance & Brokerage',
    tagline: 'Frictionless regulatory clearance across complex sovereign borders.',
    description: 'Our licensed international customs brokerage teams interface directly with global automated single-window customs systems to pre-clear multi-container shipments before arrival at deep-water terminals.',
    capabilities: [
      'Automated Harmonized System (HS) Code Mapping',
      'Valuation & Origin Determination Audits',
      'Direct Digital Customs EDI Interfacing',
      'Comprehensive Duty Drawback & Tariff Recovery'
    ],
    route: '142 Sovereign Jurisdictions'
  },
  {
    index: '03',
    title: 'Multimodal Freight Forwarding',
    tagline: 'Precision orchestration across maritime, chartered air, and intermodal rail.',
    description: 'Full-container-load (FCL), less-than-container-load (LCL), and heavy-lift project freight dispatched through priority slot allocations with premier global alliances.',
    capabilities: [
      'Tier-1 Ocean Carrier Vessel Allocations',
      'Scheduled & Chartered Air Cargo Corridors',
      'Eurasian Transcontinental Rail Corridors',
      'Last-Mile High-Security Inland Freight'
    ],
    route: 'Trans-Pacific & Trans-Atlantic Corridors'
  },
  {
    index: '04',
    title: 'International Shipping & Chartering',
    tagline: 'Sovereign vessel management and customized route chartering.',
    description: 'For high-tonnage bulk materials, energy assets, and sensitive industrial equipment, Nexora coordinates dedicated sea vessel charters and specialized vessel handling protocols.',
    capabilities: [
      'Time & Voyage Vessel Chartering',
      'Breakbulk & Ro-Ro Industrial Logistics',
      'ISO Tank Container Fleet Management',
      'Marine Cargo Risk Engineering & Surveys'
    ],
    route: 'Global Deep-Water Navigational Lanes'
  },
  {
    index: '05',
    title: 'Global Trade Documentation',
    tagline: 'Flawless synthesis of international bills, letters, and certificates.',
    description: 'A single typographic error on a bill of lading can freeze millions in capital. We maintain zero-error algorithmic synthesis of sovereign letters of credit, certificates of origin, and consular attestations.',
    capabilities: [
      'Digital e-Bill of Lading (eBL) Issuance',
      'Chamber of Commerce Origin Certifications',
      'Irrevocable Letters of Credit (LC) Compliance',
      'SPS & Phytosanitary Documentation Protocol'
    ],
    route: 'Global Banking & Customs Network'
  },
  {
    index: '06',
    title: 'Predictive Supply Chain Solutions',
    tagline: 'Algorithmic route telemetry and congestion avoidance.',
    description: 'Real-time sensor telemetry tracking container climate, shock, and exact satellite positions coupled with predictive AI models that reroute around chokepoints and weather anomalies.',
    capabilities: [
      '24/7 Container Sat-Telemetry Monitoring',
      'Dynamic Route Rescheduling & Divergence Planning',
      'Inventory Buffer & Safety Stock Architecture',
      'Carbon-Optimized Route Computation'
    ],
    route: 'Global Cloud Telemetry Network'
  }
]

export const processStages = [
  {
    phase: 'Phase 01',
    code: 'INIT_PROTOCOL',
    title: 'Origin Classification & Regulatory Audit',
    summary: 'Cargo manifests are digitally decomposed, HS codes algorithmically validated against tariff databases, and sovereign compliance permits locked in prior to port loading.'
  },
  {
    phase: 'Phase 02',
    code: 'CARRIER_ALLOC',
    title: 'Multimodal Carrier Allocation & Slot Lock',
    summary: 'Direct integration with maritime alliances secures guaranteed container slots on ultra-large container vessels (ULCV) or dedicated cargo air charters.'
  },
  {
    phase: 'Phase 03',
    code: 'TRANSIT_TELEMETRY',
    title: 'Trans-Oceanic Navigation & Telemetry',
    summary: 'Continuous live tracking across open-ocean trade corridors with real-time temperature, humidity, and barometric telemetry reporting straight to enterprise dashboards.'
  },
  {
    phase: 'Phase 04',
    code: 'CLEAR_DISPATCH',
    title: 'Terminal Pre-Clearance & Intermodal Dispatch',
    summary: 'Customs authorities receive automated cryptographic declarations while the vessel is still offshore, enabling immediate crane-to-rail dispatch upon docking.'
  }
]

export const caseStudies = [
  {
    id: 'CS-01',
    clientType: 'Advanced Aerospace Manufacturer',
    route: 'Toulouse, France ⇄ Seattle, USA',
    cargo: 'Composite Wing Spars & Avionics Modules',
    spec: 'Temperature Stabilized • Shock Monitored • 18-Hour Air Transit',
    summary: 'Orchestrated chartered Antonov transport with specialized vibration-damping cradle mounts for mission-critical aircraft assembly components.',
    statValue: '100%',
    statLabel: 'Zero Sensor Deviation'
  },
  {
    id: 'CS-02',
    clientType: 'Offshore Renewable Energy Consortium',
    route: 'Esbjerg, Denmark ⇄ Taichung, Taiwan',
    cargo: '85-Meter Offshore Wind Turbine Blades',
    spec: 'Heavy-Lift Project Cargo • 6-Vessel Flotilla • Deep-Sea Transit',
    summary: 'Engineered specialized sea-fastening calculations and multi-port clearance coordination across the Suez Canal route under tight tidal windows.',
    statValue: '14 Days',
    statLabel: 'Ahead of Construction Schedule'
  },
  {
    id: 'CS-03',
    clientType: 'Global Semiconductor Foundry',
    route: 'Hsinchu, Taiwan ⇄ Dresden, Germany',
    cargo: 'Lithography Optics & Cryogenic Materials',
    spec: 'Cleanroom Class 100 Packing • Active Nitrogen Purge',
    summary: 'Established a dedicated customs fast-track corridor reducing dwell time at Frankfurt airport from 42 hours down to 110 minutes.',
    statValue: '96.2%',
    statLabel: 'Dwell Time Reduction'
  }
]

export const operationalStats = [
  { value: '4.8B', prefix: '$', suffix: '+', label: 'Annual Value Moved', subtext: 'Insured cargo spanning 38 critical manufacturing sectors' },
  { value: '142', prefix: '', suffix: '', label: 'Global Trade Ports', subtext: 'Direct operational footprint in Tier-1 marine terminals' },
  { value: '99.8', prefix: '', suffix: '%', label: 'On-Time Customs Clearance', subtext: 'First-time approval rate across sovereign regulatory bodies' },
  { value: '48', prefix: '<', suffix: 'h', label: 'Cross-Border Velocity', subtext: 'Average intercontinental multimodal transfer turnaround' }
]
