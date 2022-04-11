interface IData {
    [city: string]: {
        G: {
            [year: number | string]: {
                [XX: string]: IYearValue
            }
        }
    }
}


export interface IYearValue {
    value: number
    dateRelease: string
}

export default IData
