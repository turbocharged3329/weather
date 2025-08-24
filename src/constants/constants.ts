export enum ResponseStatus {
  SUCCESS = 200,
}

export const SUNNY_WEATHER_KEY = 'sunny'
export const CLOUDY_WEATHER_KEY = 'cloudy'
export const WINDY_WEATHER_KEY = 'windy'
export const RAINY_WEATHER_KEY = 'rainy'

export const WEATHER_TITLES = {
  [SUNNY_WEATHER_KEY]: 'Солнечно',
  [CLOUDY_WEATHER_KEY]: 'Облачно',
  [WINDY_WEATHER_KEY]: 'Ветрено',
  [RAINY_WEATHER_KEY]: 'Дождливо',
}

export const CITIES_LIST = [
  {
    id: 1,
    name: 'Moscow',
    title: 'Москва',
  },
  {
    id: 2,
    name: 'Kazan',
    title: 'Казань',
  },
]

export const NAV_MENU_ITEMS = [
  {
    id: 1,
    title: 'Главная',
  },
  {
    id: 2,
    title: 'Погода на неделю',
  },
]

export const POPULAR_CITIES_COORDINATES_MAP = {
  Москва: ['55.7522', '37.6156'],
  Новосибирск: ['55.0344', '82.9434'],
  Красноярск: ['56.0267', '92.9077'],
  Краснодар: ['45.0448', '38.976'],
  Тула: ['54.1961', '37.6182'],
}
