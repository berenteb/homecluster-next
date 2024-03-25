import { Coordinates } from '@/types/coordinate.type.ts';

const DefaultCoordinates: Coordinates = {
  lat: 47.473443,
  lon: 19.052844,
};

const DefaultBackgroundUrl = 'https://source.unsplash.com/1920x1080?living%20room';

export class StorageService {
  private static readonly coordinatesKey = 'coordinates';
  private static readonly backgroundUrlKey = 'backgroundUrl';

  static getCoordinates() {
    const coordinates = localStorage.getItem(this.coordinatesKey);
    if (!coordinates) {
      return DefaultCoordinates;
    }
    try {
      return JSON.parse(coordinates);
    } catch (e) {
      this.setCoordinates(DefaultCoordinates);
      return DefaultCoordinates;
    }
  }

  static setCoordinates(coordinates: Coordinates) {
    localStorage.setItem(this.coordinatesKey, JSON.stringify(coordinates));
  }

  static getBackgroundUrl() {
    return localStorage.getItem(this.backgroundUrlKey) || DefaultBackgroundUrl;
  }

  static setBackgroundUrl(url: string) {
    localStorage.setItem(this.backgroundUrlKey, url);
  }
}
