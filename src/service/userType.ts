export interface Register {
  username: string;
  password: string;
  createDate: Date;
  telephone: string;
  role: Level.COMMON | Level.VIP;
}

export interface Login {
  username: string;
  password: string;
}

export enum Level {
  COMMON,
  VIP
}

