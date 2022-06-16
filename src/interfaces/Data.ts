interface IData {
  [city: string]: {
    G: {
      [year: number]: {
        [XX: string]: IYearValue;
      };
    };
  };
}

export interface IYearValue {
  value: number;
  dateRelease: string;
}

export default IData;
