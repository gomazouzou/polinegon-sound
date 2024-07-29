export const ChangeColorToInstrumentId = (color: string) => {
  switch (color) {
    case "black":
      return 0;
    case "red":
      return 1;
    case "blue":
      return 2;
    case "yellow":
      return 3;
    case "green":
      return 4;
    case "orange":
      return 5;
    case "pink":
      return 6;
    case "purple":
      return 7;
    default:
      return 0;
  }
};
