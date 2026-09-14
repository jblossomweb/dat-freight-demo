export interface StatusPalette {
  available: string;
  inTransit: string;
  delivered: string;
}

export interface EquipmentPalette {
  van: string;
  flatbed: string;
  reefer: string;
}

export interface LinkPalette {
  main: string;
  hover: string;
}

export interface DialogPalette {
  close: { main: string, light: string };
  minimize: { main: string, light: string };
}
