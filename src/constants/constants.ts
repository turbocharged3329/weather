import type {
  CitiesSelectListItem,
  PopularCitiesCoordinatesMap,
} from '@/interfaces/interfaces.ts'

export enum ResponseStatus {
  SUCCESS = 200,
}

export const SUNNY_WEATHER_KEY = 'clear'
export const CLOUDY_WEATHER_KEY = 'cloudy'
export const WINDY_WEATHER_KEY = 'windy'
export const RAINY_WEATHER_KEY = 'rainy'

export const WEATHER_TITLES = {
  [SUNNY_WEATHER_KEY]: 'Ясно',
  [CLOUDY_WEATHER_KEY]: 'Облачно',
  [WINDY_WEATHER_KEY]: 'Ветрено',
  [RAINY_WEATHER_KEY]: 'Дождливо',
}

export const MORNING_TIME_TITLE = 'Утро'
export const DAYTIME_TIME_TITLE = 'День'
export const EVENING_TIME_TITLE = 'Вечер'
export const NIGHT_TIME_TITLE = 'Ночь'

export const CITIES_LIST: Array<CitiesSelectListItem> = [
  {
    id: 1,
    title: 'Казань',
    coordinates: ['55.7887', '49.1221'],
  },
  {
    id: 2,
    title: 'Краснодар',
    coordinates: ['45.0448', '38.9760'],
  },
  {
    id: 3,
    title: 'Уфа',
    coordinates: ['54.7388', '55.9721'],
  },
  {
    id: 4,
    title: 'Новосибирск',
    coordinates: ['55.0344', '82.9434'],
  },
  {
    id: 5,
    title: 'Красноярск',
    coordinates: ['56.0267', '92.9077'],
  },
  {
    id: 6,
    title: 'Москва',
    coordinates: ['55.7522', '37.6156'],
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

export const POPULAR_CITIES_COORDINATES_MAP: PopularCitiesCoordinatesMap = {
  Москва: ['55.7522', '37.6156'],
  Новосибирск: ['55.0344', '82.9434'],
  Красноярск: ['56.0267', '92.9077'],
  Краснодар: ['45.0448', '38.976'],
  Тула: ['54.1961', '37.6182'],
}
