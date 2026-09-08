export type StringKey<Data> = {
  [Key in keyof Data]-?: Data[Key] extends string ? Key : never;
}[keyof Data];
