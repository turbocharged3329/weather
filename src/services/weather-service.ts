import http from '@/services/http.ts'
import type {
  PopularCitiesCoordinatesMap,
  PopularCityWeatherData,
} from '../interfaces/interfaces.ts'

export class WeatherService {
  static getPopularCitiesWeather(citiesList: PopularCitiesCoordinatesMap) {
    const coordinates = Object.values(citiesList).reduce(
      (sum, current) => {
        sum.latitudes.push(current[0])
        sum.longitudes.push(current[1])

        return sum
      },
      {
        latitudes: [],
        longitudes: [],
      }
    )

    return http.get<Array<PopularCityWeatherData>>('/forecast', {
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
}
