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

export type User = {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
  location?: string | null;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type MemberCardProps = {
  member: {
    name: string;
    email: string;
    image: string;
    access: boolean;
  };
};
