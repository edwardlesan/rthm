export interface IUser {
  name?: string | null | undefined;
  username?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  access?: boolean;
}

export interface IWeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  timezone: number;
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}
