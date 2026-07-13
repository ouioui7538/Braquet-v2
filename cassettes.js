/* cassettes.js
 * Base de cassettes courantes (route/gravel), dents réelles par référence.
 * Les valeurs sont celles des gammes les plus répandues à date de rédaction ;
 * de légères variantes existent selon l'année/la révision exacte du produit.
 * Triées par nombre de dents croissant.
 */
window.CASSETTES = {
  // Shimano 11 vitesses (105 R7000 / Ultegra R8000 / Dura-Ace R9100)
  'shim11-1125': { brand:'Shimano', speeds:11, label:'11-25', teeth:[11,12,13,14,15,17,19,21,23,25] },
  'shim11-1128': { brand:'Shimano', speeds:11, label:'11-28', teeth:[11,12,13,14,15,17,19,21,24,28] },
  'shim11-1130': { brand:'Shimano', speeds:11, label:'11-30', teeth:[11,12,13,14,16,18,20,22,25,28,30] },
  'shim11-1132': { brand:'Shimano', speeds:11, label:'11-32', teeth:[11,12,13,14,16,18,20,22,25,28,32] },
  'shim11-1134': { brand:'Shimano', speeds:11, label:'11-34', teeth:[11,12,13,14,16,18,20,22,25,28,34] },

  // Shimano 12 vitesses (105 R7100 / Ultegra R8100 / Dura-Ace R9200)
  'shim12-1130': { brand:'Shimano', speeds:12, label:'11-30', teeth:[11,12,13,14,15,17,19,21,24,27,30] },
  'shim12-1134': { brand:'Shimano', speeds:12, label:'11-34', teeth:[11,12,13,14,16,18,20,22,25,28,31,34] },
  'shim12-1136': { brand:'Shimano', speeds:12, label:'11-36', teeth:[11,12,13,14,16,18,21,24,27,30,33,36] },

  // SRAM AXS 12 vitesses (Rival/Force/Red)
  'sram12-1028': { brand:'SRAM', speeds:12, label:'10-28', teeth:[10,11,12,13,14,15,17,19,21,24,28] },
  'sram12-1030': { brand:'SRAM', speeds:12, label:'10-30', teeth:[10,11,12,13,14,15,17,19,21,24,30] },
  'sram12-1033': { brand:'SRAM', speeds:12, label:'10-33', teeth:[10,11,12,13,14,15,17,19,21,24,28,33] },
  'sram12-1036': { brand:'SRAM', speeds:12, label:'10-36 (XPLR)', teeth:[10,11,12,13,14,15,17,19,21,24,30,36] },
  'sram12-1044': { brand:'SRAM', speeds:12, label:'10-44 (XPLR)', teeth:[10,11,13,15,17,19,21,24,28,32,38,44] },

  // Campagnolo 12 vitesses (Chorus/Record/Super Record)
  'campy12-1129': { brand:'Campagnolo', speeds:12, label:'11-29', teeth:[11,12,13,14,15,16,17,19,21,23,26,29] },
  'campy12-1132': { brand:'Campagnolo', speeds:12, label:'11-32', teeth:[11,12,13,14,15,17,19,21,23,25,28,32] },
  'campy12-1134': { brand:'Campagnolo', speeds:12, label:'11-34', teeth:[11,12,13,15,17,19,21,23,25,27,30,34] },
};

window.GROUPSETS = {
  'compact-shim11-30':   { label:'Shimano 11v — Compact 50/34, cassette 11-30',     small:34, big:50, cassetteId:'shim11-1130' },
  'compact-shim11-32':   { label:'Shimano 11v — Compact 50/34, cassette 11-32',     small:34, big:50, cassetteId:'shim11-1132' },
  'semi-shim11-30':      { label:'Shimano 11v — Semi-compact 52/36, cassette 11-30', small:36, big:52, cassetteId:'shim11-1130' },
  'standard-shim11-28':  { label:'Shimano 11v — Standard 53/39, cassette 11-28',    small:39, big:53, cassetteId:'shim11-1128' },
  'compact-shim12-34':   { label:'Shimano 12v — Compact 50/34, cassette 11-34',     small:34, big:50, cassetteId:'shim12-1134' },
  'semi-shim12-30':      { label:'Shimano 12v — Semi-compact 52/36, cassette 11-30', small:36, big:52, cassetteId:'shim12-1130' },
  'sram-axs-48-33':      { label:'SRAM AXS — 48/35, cassette 10-33',                small:35, big:48, cassetteId:'sram12-1033' },
  'sram-axs-46-36':      { label:'SRAM AXS — 46/33, cassette 10-36 (XPLR)',         small:33, big:46, cassetteId:'sram12-1036' },
  'gravel-grx-48-34':    { label:'Gravel GRX 48/31, cassette 11-34',                small:31, big:48, cassetteId:'shim11-1134' },
  'gravel-sram-44':      { label:'Gravel SRAM 1x — 40 (mono), cassette 10-44',      small:40, big:40, cassetteId:'sram12-1044' },
  'campy-12-29':         { label:'Campagnolo 12v — 52/36, cassette 11-29',          small:36, big:52, cassetteId:'campy12-1129' },
  'custom':              { label:'Personnalisé…' },
};
