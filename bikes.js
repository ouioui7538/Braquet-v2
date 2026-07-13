/* bikes.js
 * Base de données des vélos de route/gravel les plus répandus.
 * Structure : marque → modèles → millésimes → finitions (niveaux de groupe).
 * Les specs (groupe, cassette) renvoient vers les IDs de cassettes.js.
 * Le poids est le poids officiel constructeur le plus courant, en kg.
 * Non exhaustif : les finitions listées couvrent le marché de masse.
 */
(function(global){

const BIKES = {

  Trek: {
    'Émonda SL': {
      usage: 'route',
      years: {
        2025: {
          'SL 5': { groupsetId:'shim-105-12-50-34-11-34', weight:8.3 },
          'SL 6': { groupsetId:'shim-105-12-50-34-11-34', weight:7.9 },
          'SL 6 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.7 },
          'SL 7': { groupsetId:'shim-105-12-50-34-11-34', weight:7.2 },
        },
        2024: {
          'SL 5': { groupsetId:'shim-105-50-34-11-30', weight:8.4 },
          'SL 6': { groupsetId:'shim-105-12-50-34-11-34', weight:7.9 },
          'SL 7 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.2 },
        },
        2023: {
          'SL 5': { groupsetId:'shim-105-50-34-11-30', weight:8.5 },
          'SL 6': { groupsetId:'shim-105-50-34-11-32', weight:8.0 },
          'SL 7': { groupsetId:'shim-105-12-50-34-11-34', weight:7.4 },
        },
        2022: {
          'SL 5': { groupsetId:'shim-105-50-34-11-30', weight:8.6 },
          'SL 6': { groupsetId:'shim-105-50-34-11-32', weight:8.1 },
        },
      }
    },
    'Domane SL': {
      usage: 'endurance',
      years: {
        2025: {
          'SL 5': { groupsetId:'shim-105-12-50-34-11-34', weight:8.8 },
          'SL 6': { groupsetId:'shim-105-12-50-34-11-34', weight:8.4 },
          'SL 6 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:8.2 },
        },
        2024: {
          'SL 5': { groupsetId:'shim-105-50-34-11-32', weight:8.9 },
          'SL 6': { groupsetId:'shim-105-12-50-34-11-34', weight:8.5 },
        },
        2023: {
          'SL 5': { groupsetId:'shim-105-50-34-11-30', weight:9.0 },
          'SL 6': { groupsetId:'shim-105-50-34-11-32', weight:8.6 },
        },
      }
    },
    'Checkpoint SL': {
      usage: 'gravel',
      years: {
        2025: {
          'SL 5': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.2 },
          'SL 6': { groupsetId:'shim-grx-810-48-31-11-34', weight:8.8 },
          'SL 6 AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.6 },
        },
        2024: {
          'SL 5': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.3 },
          'SL 6': { groupsetId:'shim-grx-810-48-31-11-34', weight:8.9 },
        },
        2023: {
          'SL 5': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.4 },
        },
      }
    },
  },

  Specialized: {
    'Tarmac SL8': {
      usage: 'route',
      years: {
        2025: {
          'Sport': { groupsetId:'shim-105-12-50-34-11-34', weight:8.2 },
          'Expert': { groupsetId:'shim-105-12-50-34-11-34', weight:7.8 },
          'Expert AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.6 },
          'Pro': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.3 },
        },
        2024: {
          'Sport': { groupsetId:'shim-105-50-34-11-30', weight:8.3 },
          'Expert': { groupsetId:'shim-105-12-50-34-11-34', weight:7.9 },
          'Pro': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.4 },
        },
        2023: {
          'Sport': { groupsetId:'shim-105-50-34-11-30', weight:8.4 },
          'Expert': { groupsetId:'shim-105-50-34-11-32', weight:8.0 },
        },
      }
    },
    'Roubaix SL8': {
      usage: 'endurance',
      years: {
        2025: {
          'Sport': { groupsetId:'shim-105-12-50-34-11-34', weight:8.9 },
          'Expert': { groupsetId:'shim-105-12-50-34-11-34', weight:8.5 },
          'Pro AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:8.2 },
        },
        2024: {
          'Sport': { groupsetId:'shim-105-50-34-11-32', weight:9.0 },
          'Expert': { groupsetId:'shim-105-12-50-34-11-34', weight:8.6 },
        },
      }
    },
    'Diverge STR': {
      usage: 'gravel',
      years: {
        2025: {
          'Comp Carbon': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.5 },
          'Expert': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.1 },
          'Pro AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.8 },
        },
        2024: {
          'Comp Carbon': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.6 },
          'Expert': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.2 },
        },
        2023: {
          'Expert': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.3 },
        },
      }
    },
  },

  Giant: {
    'TCR Advanced': {
      usage: 'route',
      years: {
        2025: {
          '2': { groupsetId:'shim-105-12-50-34-11-34', weight:8.2 },
          '1': { groupsetId:'shim-105-12-50-34-11-34', weight:7.9 },
          '1 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.7 },
          'Pro 0': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.1 },
        },
        2024: {
          '2': { groupsetId:'shim-105-50-34-11-30', weight:8.3 },
          '1': { groupsetId:'shim-105-12-50-34-11-34', weight:8.0 },
          '0': { groupsetId:'shim-105-12-50-34-11-34', weight:7.5 },
        },
        2023: {
          '2': { groupsetId:'shim-105-50-34-11-30', weight:8.4 },
          '1': { groupsetId:'shim-105-50-34-11-32', weight:8.1 },
        },
        2022: {
          '2': { groupsetId:'shim-105-50-34-11-30', weight:8.5 },
          '1': { groupsetId:'shim-105-50-34-11-32', weight:8.2 },
        },
      }
    },
    'Defy Advanced': {
      usage: 'endurance',
      years: {
        2025: {
          '2': { groupsetId:'shim-105-12-50-34-11-34', weight:8.8 },
          '1': { groupsetId:'shim-105-12-50-34-11-34', weight:8.4 },
          'Pro 0 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:8.0 },
        },
        2024: {
          '2': { groupsetId:'shim-105-50-34-11-32', weight:8.9 },
          '1': { groupsetId:'shim-105-12-50-34-11-34', weight:8.5 },
        },
      }
    },
    'Revolt Advanced': {
      usage: 'gravel',
      years: {
        2025: {
          '2': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.4 },
          '1': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.0 },
          '0 AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.7 },
        },
        2024: {
          '2': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.5 },
          '1': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.1 },
        },
      }
    },
  },

  Cannondale: {
    'SuperSix EVO': {
      usage: 'route',
      years: {
        2025: {
          '3': { groupsetId:'shim-105-12-50-34-11-34', weight:8.3 },
          '2': { groupsetId:'shim-105-12-50-34-11-34', weight:7.9 },
          '1 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.5 },
        },
        2024: {
          '3': { groupsetId:'shim-105-50-34-11-30', weight:8.4 },
          '2': { groupsetId:'shim-105-12-50-34-11-34', weight:8.0 },
          '1': { groupsetId:'shim-105-12-50-34-11-34', weight:7.6 },
        },
        2023: {
          '3': { groupsetId:'shim-105-50-34-11-30', weight:8.5 },
          '2': { groupsetId:'shim-105-50-34-11-32', weight:8.1 },
        },
      }
    },
    'Synapse Carbon': {
      usage: 'endurance',
      years: {
        2025: {
          '3': { groupsetId:'shim-105-12-50-34-11-34', weight:9.0 },
          '2': { groupsetId:'shim-105-12-50-34-11-34', weight:8.6 },
          '1 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:8.2 },
        },
        2024: {
          '3': { groupsetId:'shim-105-50-34-11-32', weight:9.1 },
          '2': { groupsetId:'shim-105-12-50-34-11-34', weight:8.7 },
        },
      }
    },
    'Topstone Carbon': {
      usage: 'gravel',
      years: {
        2025: {
          'Lefty 3': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.3 },
          '2': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.0 },
          '1 AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.7 },
        },
        2024: {
          '2': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.1 },
          '1 AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.8 },
        },
      }
    },
  },

  Scott: {
    'Addict RC': {
      usage: 'route',
      years: {
        2025: {
          '30': { groupsetId:'shim-105-12-50-34-11-34', weight:8.1 },
          '20': { groupsetId:'shim-105-12-50-34-11-34', weight:7.8 },
          '10 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.3 },
        },
        2024: {
          '30': { groupsetId:'shim-105-50-34-11-30', weight:8.2 },
          '20': { groupsetId:'shim-105-12-50-34-11-34', weight:7.9 },
        },
        2023: {
          '30': { groupsetId:'shim-105-50-34-11-30', weight:8.3 },
          '20': { groupsetId:'shim-105-50-34-11-32', weight:8.0 },
        },
      }
    },
    'Speedster': {
      usage: 'endurance',
      years: {
        2025: {
          '30': { groupsetId:'shim-105-12-50-34-11-34', weight:8.7 },
          '20': { groupsetId:'shim-105-12-50-34-11-34', weight:8.3 },
        },
        2024: {
          '30': { groupsetId:'shim-105-50-34-11-32', weight:8.8 },
          '20': { groupsetId:'shim-105-12-50-34-11-34', weight:8.4 },
        },
      }
    },
    'Gravel 10': {
      usage: 'gravel',
      years: {
        2025: {
          '20': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.2 },
          '10 AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.8 },
        },
        2024: {
          '20': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.3 },
        },
      }
    },
  },

  Bianchi: {
    'Oltre': {
      usage: 'route',
      years: {
        2025: {
          'Comp Disc': { groupsetId:'shim-105-12-50-34-11-34', weight:8.0 },
          'Pro Disc': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.5 },
          'RC Pro': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.2 },
        },
        2024: {
          'Comp Disc': { groupsetId:'shim-105-50-34-11-32', weight:8.2 },
          'Pro Disc': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.6 },
        },
      }
    },
    'Infinito XE': {
      usage: 'endurance',
      years: {
        2025: {
          'Comp': { groupsetId:'shim-105-12-50-34-11-34', weight:8.6 },
          'Pro': { groupsetId:'campy-record12-52-36-11-29', weight:8.1 },
        },
        2024: {
          'Comp': { groupsetId:'shim-105-50-34-11-32', weight:8.7 },
        },
      }
    },
    'Arcadex': {
      usage: 'gravel',
      years: {
        2025: {
          'GRX 820': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.1 },
          'AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.8 },
        },
        2024: {
          'GRX 820': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.2 },
        },
      }
    },
  },

  Orbea: {
    'Orca': {
      usage: 'route',
      years: {
        2025: {
          'M30': { groupsetId:'shim-105-12-50-34-11-34', weight:8.3 },
          'M20': { groupsetId:'shim-105-12-50-34-11-34', weight:8.0 },
          'M10 AXS': { groupsetId:'sram-force-axs-48-35-10-33', weight:7.5 },
        },
        2024: {
          'M30': { groupsetId:'shim-105-50-34-11-30', weight:8.4 },
          'M20': { groupsetId:'shim-105-12-50-34-11-34', weight:8.1 },
        },
        2023: {
          'M30': { groupsetId:'shim-105-50-34-11-30', weight:8.5 },
          'M20': { groupsetId:'shim-105-50-34-11-32', weight:8.2 },
        },
      }
    },
    'Terra': {
      usage: 'gravel',
      years: {
        2025: {
          'M30': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.2 },
          'M20 AXS': { groupsetId:'sram-force-xplr-46-33-10-36', weight:8.9 },
        },
        2024: {
          'M30': { groupsetId:'shim-grx-810-48-31-11-34', weight:9.3 },
        },
      }
    },
  },

};

global.BIKES = BIKES;

})(typeof window !== 'undefined' ? window : global);
