/* cassettes.js
 * Base de cassettes et groupes du commerce.
 * Organisée par fabricant, puis par nombre de vitesses.
 * Les dents sont les valeurs réelles des références les plus courantes.
 */
(function(global){

// ─── CASSETTES ────────────────────────────────────────────────────────────────
const CASSETTES = {

  // ── Shimano 10 vitesses ──────────────────────────────────────────────────────
  'shim10-1225': { brand:'Shimano', speeds:10, label:'11-25', teeth:[11,12,13,14,15,16,17,19,22,25] },
  'shim10-1128': { brand:'Shimano', speeds:10, label:'11-28', teeth:[11,12,13,14,15,17,19,21,24,28] },
  'shim10-1130': { brand:'Shimano', speeds:10, label:'11-30', teeth:[11,12,13,14,15,17,19,21,24,28,30] },
  'shim10-1132': { brand:'Shimano', speeds:10, label:'11-32', teeth:[11,12,13,14,16,18,20,22,25,28,32] },
  'shim10-1134': { brand:'Shimano', speeds:10, label:'11-34', teeth:[11,12,13,15,17,19,21,23,26,30,34] },

  // ── Shimano 11 vitesses route ────────────────────────────────────────────────
  'shim11-1125': { brand:'Shimano', speeds:11, label:'11-25', teeth:[11,12,13,14,15,17,19,21,23,25] },
  'shim11-1128': { brand:'Shimano', speeds:11, label:'11-28', teeth:[11,12,13,14,15,17,19,21,24,28] },
  'shim11-1130': { brand:'Shimano', speeds:11, label:'11-30', teeth:[11,12,13,14,16,18,20,22,25,28,30] },
  'shim11-1132': { brand:'Shimano', speeds:11, label:'11-32', teeth:[11,12,13,14,16,18,20,22,25,28,32] },
  'shim11-1134': { brand:'Shimano', speeds:11, label:'11-34', teeth:[11,12,13,14,16,18,20,22,25,28,34] },

  // ── Shimano 11 vitesses GRX / VTT ────────────────────────────────────────────
  'shim11-grx-1142': { brand:'Shimano', speeds:11, label:'11-42 (GRX/VTT)', teeth:[11,13,15,17,19,21,23,26,30,36,42] },
  'shim11-grx-1146': { brand:'Shimano', speeds:11, label:'11-46 (GRX)', teeth:[11,13,15,17,19,21,24,28,33,39,46] },

  // ── Shimano 12 vitesses route ────────────────────────────────────────────────
  'shim12-1130': { brand:'Shimano', speeds:12, label:'11-30', teeth:[11,12,13,14,15,17,19,21,24,27,30] },
  'shim12-1134': { brand:'Shimano', speeds:12, label:'11-34', teeth:[11,12,13,14,16,18,20,22,25,28,31,34] },
  'shim12-1136': { brand:'Shimano', speeds:12, label:'11-36', teeth:[11,12,13,14,16,18,21,24,27,30,33,36] },

  // ── Shimano 12 vitesses GRX Di2 ──────────────────────────────────────────────
  'shim12-grx-1145': { brand:'Shimano', speeds:12, label:'11-45 (GRX 820)', teeth:[11,13,15,17,19,21,23,25,27,30,36,45] },

  // ── SRAM 10 vitesses ─────────────────────────────────────────────────────────
  'sram10-1128': { brand:'SRAM', speeds:10, label:'11-28', teeth:[11,12,13,14,15,17,19,21,24,28] },
  'sram10-1132': { brand:'SRAM', speeds:10, label:'11-32', teeth:[11,12,13,14,16,18,20,22,26,32] },

  // ── SRAM 11 vitesses ─────────────────────────────────────────────────────────
  'sram11-1128': { brand:'SRAM', speeds:11, label:'11-28', teeth:[11,12,13,14,15,16,17,19,22,25,28] },
  'sram11-1132': { brand:'SRAM', speeds:11, label:'11-32', teeth:[11,12,13,14,15,17,19,22,25,28,32] },

  // ── SRAM AXS 12 vitesses route ───────────────────────────────────────────────
  'sram12-1028': { brand:'SRAM', speeds:12, label:'10-28', teeth:[10,11,12,13,14,15,17,19,21,24,28] },
  'sram12-1030': { brand:'SRAM', speeds:12, label:'10-30', teeth:[10,11,12,13,14,15,17,19,21,24,30] },
  'sram12-1033': { brand:'SRAM', speeds:12, label:'10-33', teeth:[10,11,12,13,14,15,17,19,21,24,28,33] },
  'sram12-1036': { brand:'SRAM', speeds:12, label:'10-36 (XPLR gravel)', teeth:[10,11,12,13,14,15,17,19,21,24,30,36] },
  'sram12-1044': { brand:'SRAM', speeds:12, label:'10-44 (XPLR gravel)', teeth:[10,11,13,15,17,19,21,24,28,32,38,44] },

  // ── Campagnolo 11 vitesses ───────────────────────────────────────────────────
  'campy11-1125': { brand:'Campagnolo', speeds:11, label:'11-25', teeth:[11,12,13,14,15,16,17,19,21,23,25] },
  'campy11-1127': { brand:'Campagnolo', speeds:11, label:'11-27', teeth:[11,12,13,14,15,16,17,19,21,24,27] },
  'campy11-1129': { brand:'Campagnolo', speeds:11, label:'11-29', teeth:[11,12,13,14,15,17,19,21,23,26,29] },
  'campy11-1132': { brand:'Campagnolo', speeds:11, label:'11-32', teeth:[11,12,13,14,15,17,19,21,23,26,32] },
  'campy11-1134': { brand:'Campagnolo', speeds:11, label:'11-34', teeth:[11,12,13,14,16,18,20,22,25,29,34] },

  // ── Campagnolo 12 vitesses ───────────────────────────────────────────────────
  'campy12-1129': { brand:'Campagnolo', speeds:12, label:'11-29', teeth:[11,12,13,14,15,16,17,19,21,23,26,29] },
  'campy12-1132': { brand:'Campagnolo', speeds:12, label:'11-32', teeth:[11,12,13,14,15,17,19,21,23,25,28,32] },
  'campy12-1134': { brand:'Campagnolo', speeds:12, label:'11-34', teeth:[11,12,13,15,17,19,21,23,25,27,30,34] },

  // ── Campagnolo Ekar 13 vitesses (gravel) ─────────────────────────────────────
  'campy13-ekar-938': { brand:'Campagnolo', speeds:13, label:'9-38 (Ekar)', teeth:[9,10,11,12,13,14,15,17,19,22,25,28,32,38] },
  'campy13-ekar-942': { brand:'Campagnolo', speeds:13, label:'9-42 (Ekar)', teeth:[9,10,11,12,13,14,16,18,21,24,28,32,38,42] },

  // ── Microshift (entrée de gamme) ─────────────────────────────────────────────
  'micro11-1132': { brand:'Microshift', speeds:11, label:'11-32', teeth:[11,12,13,14,15,17,19,21,24,28,32] },
  'micro11-1142': { brand:'Microshift', speeds:11, label:'11-42 (gravel)', teeth:[11,13,15,17,19,21,23,26,30,36,42] },

};

// ─── GROUPSETS ────────────────────────────────────────────────────────────────
// Regroupés par fabricant, type d'usage, et niveau de gamme.
const GROUPSETS = {

  // ════ SHIMANO — Route ════════════════════════════════════════════════════════

  // — Claris 8v (entrée gamme) —
  'shim-claris-50-34-11-28':  { brand:'Shimano', label:'Claris R2000 — Compact 50/34, 11-28',    small:34, big:50, cassetteId:'shim10-1128', speeds:8 },

  // — Sora 9v —
  'shim-sora-50-34-11-30':    { brand:'Shimano', label:'Sora R3000 — Compact 50/34, 11-30',      small:34, big:50, cassetteId:'shim10-1130', speeds:9 },
  'shim-sora-50-34-11-32':    { brand:'Shimano', label:'Sora R3000 — Compact 50/34, 11-32',      small:34, big:50, cassetteId:'shim10-1132', speeds:9 },

  // — Tiagra 10v —
  'shim-tiagra-50-34-11-28':  { brand:'Shimano', label:'Tiagra 4700 — Compact 50/34, 11-28',     small:34, big:50, cassetteId:'shim10-1128', speeds:10 },
  'shim-tiagra-50-34-11-32':  { brand:'Shimano', label:'Tiagra 4700 — Compact 50/34, 11-32',     small:34, big:50, cassetteId:'shim10-1132', speeds:10 },
  'shim-tiagra-52-36-11-32':  { brand:'Shimano', label:'Tiagra 4700 — Semi-compact 52/36, 11-32',small:36, big:52, cassetteId:'shim10-1132', speeds:10 },

  // — 105 R7000/R7100 11v & 12v —
  'shim-105-50-34-11-28':     { brand:'Shimano', label:'105 R7000 11v — Compact 50/34, 11-28',   small:34, big:50, cassetteId:'shim11-1128', speeds:11 },
  'shim-105-50-34-11-30':     { brand:'Shimano', label:'105 R7000 11v — Compact 50/34, 11-30',   small:34, big:50, cassetteId:'shim11-1130', speeds:11 },
  'shim-105-50-34-11-32':     { brand:'Shimano', label:'105 R7000 11v — Compact 50/34, 11-32',   small:34, big:50, cassetteId:'shim11-1132', speeds:11 },
  'shim-105-52-36-11-30':     { brand:'Shimano', label:'105 R7000 11v — Semi-compact 52/36, 11-30', small:36, big:52, cassetteId:'shim11-1130', speeds:11 },
  'shim-105-53-39-11-28':     { brand:'Shimano', label:'105 R7000 11v — Standard 53/39, 11-28',  small:39, big:53, cassetteId:'shim11-1128', speeds:11 },
  'shim-105-12-50-34-11-34':  { brand:'Shimano', label:'105 R7100 12v — Compact 50/34, 11-34',   small:34, big:50, cassetteId:'shim12-1134', speeds:12 },
  'shim-105-12-52-36-11-34':  { brand:'Shimano', label:'105 R7100 12v — Semi-compact 52/36, 11-34', small:36, big:52, cassetteId:'shim12-1134', speeds:12 },

  // — Ultegra R8000/R8100 11v & 12v Di2 —
  'shim-ultegra-50-34-11-28': { brand:'Shimano', label:'Ultegra R8000 11v — Compact 50/34, 11-28', small:34, big:50, cassetteId:'shim11-1128', speeds:11 },
  'shim-ultegra-50-34-11-30': { brand:'Shimano', label:'Ultegra R8000 11v — Compact 50/34, 11-30', small:34, big:50, cassetteId:'shim11-1130', speeds:11 },
  'shim-ultegra-50-34-11-32': { brand:'Shimano', label:'Ultegra R8000 11v — Compact 50/34, 11-32', small:34, big:50, cassetteId:'shim11-1132', speeds:11 },
  'shim-ultegra-di2-50-34-11-34': { brand:'Shimano', label:'Ultegra R8100 Di2 12v — Compact 50/34, 11-34', small:34, big:50, cassetteId:'shim12-1134', speeds:12 },
  'shim-ultegra-di2-52-36-11-30': { brand:'Shimano', label:'Ultegra R8100 Di2 12v — Semi-compact 52/36, 11-30', small:36, big:52, cassetteId:'shim12-1130', speeds:12 },

  // — Dura-Ace R9100/R9200 Di2 —
  'shim-da-50-34-11-28':      { brand:'Shimano', label:'Dura-Ace R9100 11v — Compact 50/34, 11-28', small:34, big:50, cassetteId:'shim11-1128', speeds:11 },
  'shim-da-di2-50-34-11-30':  { brand:'Shimano', label:'Dura-Ace R9200 Di2 12v — Compact 50/34, 11-30', small:34, big:50, cassetteId:'shim12-1130', speeds:12 },
  'shim-da-di2-54-40-11-30':  { brand:'Shimano', label:'Dura-Ace R9200 Di2 12v — 54/40, 11-30',   small:40, big:54, cassetteId:'shim12-1130', speeds:12 },

  // ════ SHIMANO — Gravel / GRX ═════════════════════════════════════════════════

  'shim-grx-600-48-31-11-34': { brand:'Shimano', label:'GRX RX600 11v — 48/31, 11-34',           small:31, big:48, cassetteId:'shim11-1134', speeds:11 },
  'shim-grx-600-46-30-11-34': { brand:'Shimano', label:'GRX RX600 11v — 46/30, 11-34',           small:30, big:46, cassetteId:'shim11-1134', speeds:11 },
  'shim-grx-810-48-31-11-34': { brand:'Shimano', label:'GRX RX810 11v Di2 — 48/31, 11-34',       small:31, big:48, cassetteId:'shim11-1134', speeds:11 },
  'shim-grx-810-1x-40-11-42': { brand:'Shimano', label:'GRX RX810 11v 1x — 40, 11-42',           small:40, big:40, cassetteId:'shim11-grx-1142', speeds:11 },
  'shim-grx-820-48-31-11-45': { brand:'Shimano', label:'GRX RX820 12v Di2 — 48/31, 11-45',       small:31, big:48, cassetteId:'shim12-grx-1145', speeds:12 },
  'shim-grx-820-40-11-45':    { brand:'Shimano', label:'GRX RX820 12v 1x — 40, 11-45',           small:40, big:40, cassetteId:'shim12-grx-1145', speeds:12 },

  // ════ SRAM — Route méca ══════════════════════════════════════════════════════

  'sram-rival22-50-34-11-32': { brand:'SRAM', label:'Rival 22 — Compact 50/34, 11-32',            small:34, big:50, cassetteId:'sram11-1132', speeds:11 },
  'sram-force22-50-34-11-28': { brand:'SRAM', label:'Force 22 — Compact 50/34, 11-28',            small:34, big:50, cassetteId:'sram11-1128', speeds:11 },
  'sram-force22-52-36-11-28': { brand:'SRAM', label:'Force 22 — Semi-compact 52/36, 11-28',       small:36, big:52, cassetteId:'sram11-1128', speeds:11 },
  'sram-red22-50-34-11-28':   { brand:'SRAM', label:'Red 22 — Compact 50/34, 11-28',              small:34, big:50, cassetteId:'sram11-1128', speeds:11 },
  'sram-red22-53-39-11-28':   { brand:'SRAM', label:'Red 22 — Standard 53/39, 11-28',             small:39, big:53, cassetteId:'sram11-1128', speeds:11 },

  // ════ SRAM — AXS route ═══════════════════════════════════════════════════════

  'sram-rival-axs-48-35-10-30': { brand:'SRAM', label:'Rival AXS — 48/35, 10-30',                small:35, big:48, cassetteId:'sram12-1030', speeds:12 },
  'sram-force-axs-48-35-10-30': { brand:'SRAM', label:'Force AXS — 48/35, 10-30',                small:35, big:48, cassetteId:'sram12-1030', speeds:12 },
  'sram-force-axs-48-35-10-33': { brand:'SRAM', label:'Force AXS — 48/35, 10-33',                small:35, big:48, cassetteId:'sram12-1033', speeds:12 },
  'sram-red-axs-50-37-10-28':   { brand:'SRAM', label:'Red AXS — 50/37, 10-28',                  small:37, big:50, cassetteId:'sram12-1028', speeds:12 },
  'sram-red-axs-48-35-10-28':   { brand:'SRAM', label:'Red AXS — 48/35, 10-28',                  small:35, big:48, cassetteId:'sram12-1028', speeds:12 },
  'sram-red-axs-48-35-10-33':   { brand:'SRAM', label:'Red AXS — 48/35, 10-33',                  small:35, big:48, cassetteId:'sram12-1033', speeds:12 },

  // ════ SRAM — XPLR gravel ═════════════════════════════════════════════════════

  'sram-rival-xplr-43-10-36': { brand:'SRAM', label:'Rival AXS XPLR 1x — 43, 10-36',             small:43, big:43, cassetteId:'sram12-1036', speeds:12 },
  'sram-force-xplr-43-10-36': { brand:'SRAM', label:'Force AXS XPLR 1x — 43, 10-36',             small:43, big:43, cassetteId:'sram12-1036', speeds:12 },
  'sram-force-xplr-46-33-10-36': { brand:'SRAM', label:'Force AXS XPLR 2x — 46/33, 10-36',      small:33, big:46, cassetteId:'sram12-1036', speeds:12 },
  'sram-red-xplr-40-10-44':   { brand:'SRAM', label:'Red AXS XPLR 1x — 40, 10-44',               small:40, big:40, cassetteId:'sram12-1044', speeds:12 },

  // ════ CAMPAGNOLO — Route méca ════════════════════════════════════════════════

  'campy-centaur-50-34-11-29':   { brand:'Campagnolo', label:'Centaur 11v — Compact 50/34, 11-29',  small:34, big:50, cassetteId:'campy11-1129', speeds:11 },
  'campy-centaur-52-36-11-29':   { brand:'Campagnolo', label:'Centaur 11v — Semi-compact 52/36, 11-29', small:36, big:52, cassetteId:'campy11-1129', speeds:11 },
  'campy-potenza-50-34-11-29':   { brand:'Campagnolo', label:'Potenza 11v — Compact 50/34, 11-29',  small:34, big:50, cassetteId:'campy11-1129', speeds:11 },
  'campy-potenza-50-34-11-32':   { brand:'Campagnolo', label:'Potenza 11v — Compact 50/34, 11-32',  small:34, big:50, cassetteId:'campy11-1132', speeds:11 },
  'campy-chorus-50-34-11-29':    { brand:'Campagnolo', label:'Chorus 11v — Compact 50/34, 11-29',   small:34, big:50, cassetteId:'campy11-1129', speeds:11 },
  'campy-chorus-52-36-11-29':    { brand:'Campagnolo', label:'Chorus 11v — Semi-compact 52/36, 11-29', small:36, big:52, cassetteId:'campy11-1129', speeds:11 },
  'campy-record-50-34-11-29':    { brand:'Campagnolo', label:'Record 11v — Compact 50/34, 11-29',   small:34, big:50, cassetteId:'campy11-1129', speeds:11 },
  'campy-sr-50-34-11-29':        { brand:'Campagnolo', label:'Super Record 11v — Compact 50/34, 11-29', small:34, big:50, cassetteId:'campy11-1129', speeds:11 },

  // ════ CAMPAGNOLO — 12 vitesses EPS ══════════════════════════════════════════

  'campy-chorus12-52-36-11-29':  { brand:'Campagnolo', label:'Chorus 12v — Semi-compact 52/36, 11-29', small:36, big:52, cassetteId:'campy12-1129', speeds:12 },
  'campy-record12-50-34-11-32':  { brand:'Campagnolo', label:'Record 12v — Compact 50/34, 11-32',  small:34, big:50, cassetteId:'campy12-1132', speeds:12 },
  'campy-record12-52-36-11-29':  { brand:'Campagnolo', label:'Record 12v — Semi-compact 52/36, 11-29', small:36, big:52, cassetteId:'campy12-1129', speeds:12 },
  'campy-sr12-50-34-11-32':      { brand:'Campagnolo', label:'Super Record 12v — Compact 50/34, 11-32', small:34, big:50, cassetteId:'campy12-1132', speeds:12 },
  'campy-sr12-52-36-11-29':      { brand:'Campagnolo', label:'Super Record 12v — Semi-compact 52/36, 11-29', small:36, big:52, cassetteId:'campy12-1129', speeds:12 },
  'campy-sr12-50-34-11-34':      { brand:'Campagnolo', label:'Super Record 12v — Compact 50/34, 11-34', small:34, big:50, cassetteId:'campy12-1134', speeds:12 },

  // ════ CAMPAGNOLO — Ekar 13v gravel ══════════════════════════════════════════

  'campy-ekar-40-9-42':          { brand:'Campagnolo', label:'Ekar 13v 1x — 40, 9-42',             small:40, big:40, cassetteId:'campy13-ekar-942', speeds:13 },
  'campy-ekar-38-9-42':          { brand:'Campagnolo', label:'Ekar 13v 1x — 38, 9-42',             small:38, big:38, cassetteId:'campy13-ekar-942', speeds:13 },
  'campy-ekar-44-32-9-38':       { brand:'Campagnolo', label:'Ekar 13v 2x — 44/32, 9-38',         small:32, big:44, cassetteId:'campy13-ekar-938', speeds:13 },

  // ════ MICROSHIFT ════════════════════════════════════════════════════════════

  'micro-advent-50-34-11-32':    { brand:'Microshift', label:'Advent 11v — Compact 50/34, 11-32',  small:34, big:50, cassetteId:'micro11-1132', speeds:11 },
  'micro-advent-50-34-11-42':    { brand:'Microshift', label:'Advent X 11v gravel — Compact 50/34, 11-42', small:34, big:50, cassetteId:'micro11-1142', speeds:11 },

  // ════ PERSONNALISÉ ═══════════════════════════════════════════════════════════
  'custom': { label:'Personnalisé…' },
};

global.CASSETTES = CASSETTES;
global.GROUPSETS  = GROUPSETS;

})(typeof window !== 'undefined' ? window : global);
