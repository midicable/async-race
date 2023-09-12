enum Routes {
  root = '/',
  garage = '/garage',
  winners = '/winners',
}

enum Sort {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

const carsPromises: Promise<[number, number]>[] = []

const RACE_LEFT_PADDING = 70

const RACE_RIGHT_PADDING = 5

const CAR_WIDTH = 80

const MAKES_AND_MODELS = new Map<string, string[]>([
  [
    'Acura',
    [
      'TL',
      'RL',
      'TSX',
      'TSX Sport Wagon',
      'ZDX',
      'RDX',
      'RDX New',
      'MDX',
      'MDX New',
    ],
  ],
  [
    'Kia',
    [
      'Picanto',
      'Picanto New',
      'Venga',
      'Rio',
      'Spectra',
      'Cerato',
      'Cerato New',
      'Ceed',
      'Soul',
    ],
  ],
  [
    'Lamborghini',
    [
      'Gallardo',
      'Murcielago',
      'Urus',
      'Aventador',
      'Countach',
      'Huracan',
      'Miura',
      'Revuelto',
      'Diablo',
    ],
  ],
  ['Mazda', ['3', '6', '2', '5', 'MX-5', 'RX-8', 'CX-5', 'CX-7', 'CX-9']],
  [
    'MINI',
    [
      'One',
      'One D',
      'Cooper',
      'Cooper D',
      'Cooper S',
      'One Clubman',
      'Cooper D Clubman',
      'One Countryman',
      'Cooper Countryman',
    ],
  ],
  [
    'Mitsubishi',
    [
      'Colt',
      'Colt New',
      'Lancer',
      'Lancer Evolution',
      'Lancer X',
      'Galant',
      'ASX',
      'Outlander',
      'Pajero Sport',
    ],
  ],
  [
    'Nissan',
    [
      'Micra',
      'Qashqai',
      'Juke',
      'Pixo',
      'Cube',
      'Note',
      'Leaf',
      'Tiida',
      'Almera',
    ],
  ],
  [
    'Opel',
    [
      'Agila',
      'Antara',
      'Antara New',
      'Astra',
      'Astra J',
      'Astra H',
      'Corsa',
      'Insignia',
      'Meriva',
    ],
  ],
  [
    'Porsche',
    [
      '911 Carrera',
      '911 Turbo',
      'Boxster',
      'Cayman',
      'Panamera',
      'Cayenne',
      'Cayenne S',
      'Cayenne Turbo',
      'Cayenne GTS',
    ],
  ],
  ['Volvo', ['C30', 'C70', 'V50', 'V60', 'V70', 'S40', 'S60', 'S80', 'XC60']],
])

const BASE_URL = 'http://localhost:3000'

export {
  Routes,
  Sort,
  Order,
  carsPromises,
  BASE_URL,
  MAKES_AND_MODELS,
  RACE_LEFT_PADDING,
  RACE_RIGHT_PADDING,
  CAR_WIDTH,
}
