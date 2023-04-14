export type timeBlock = {
  id: number;
  day: string;
  start: number;
  end: number;
  user: string;
};

export interface IsDeskTop {
  isDesktop: boolean;
}

export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const weekDays: WeekDay[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export type TableType = "new" | "old";

export const TABLE_TYPE = {
  NEW: "new",
  OLD: "old",
} as const;
