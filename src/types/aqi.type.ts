export type AqiData = {
  coord: {
    lon: number;
    lat: number;
  };
  list: [
    {
      main: {
        aqi: AqiValues;
      };
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      };
      dt: number;
    },
  ];
};

export enum AqiValues {
  GOOD = 1,
  FAIR = 2,
  MODERATE = 3,
  POOR = 4,
  UNHEALTHY = 5,
}
