import http from '../services/http.ts'
import type {
  PopularCitiesCoordinatesMap,
  PopularCityWeatherResponseData,
  SelectedCityTodayWeatherResponseData,
  SelectedCityWeeklyWeatherResponseData,
} from '../interfaces/interfaces.ts'
import type { CityCoordinates } from '../components/types/types.ts'

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export class WeatherService {
  static getPopularCitiesWeather(citiesList: PopularCitiesCoordinatesMap) {
    const coordinates = Object.values(citiesList).reduce(
      (sum, current) => {
        sum.latitudes.push(current[0])
        sum.longitudes.push(current[1])

        return sum
      },
      {
        latitudes: [] as string[],
        longitudes: [] as string[],
      }
    )

    return http.get<Array<PopularCityWeatherResponseData>>('/forecast', {
      params: {
        latitude: coordinates.latitudes,
        longitude: coordinates.longitudes,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'weather_code',
          'wind_speed_10m',
        ],
        forecast_days: 1,
      },
    })
  }

  static getSelectedCityTodayWeather(cityCoordinates: CityCoordinates) {
    return http.get<SelectedCityTodayWeatherResponseData>('/forecast', {
      params: {
        latitude: cityCoordinates[0],
        longitude: cityCoordinates[1],
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'weather_code',
          'wind_speed_10m',
        ].join(','),
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'wind_speed_10m',
          'weather_code',
        ].join(','),
        forecast_days: 1,
        timezone,
      },
    })
  }

  static getSelectedCityWeatherForecast(cityCoordinates: CityCoordinates) {
    return http.get<SelectedCityWeeklyWeatherResponseData>('/forecast', {
      params: {
        latitude: cityCoordinates[0],
        longitude: cityCoordinates[1],
        daily: [
          'weather_code',
          'temperature_2m_max',
          'wind_speed_10m_max',
        ].join(','),
        forecast_days: 7,
        timezone,
      },
    })
  }
}
