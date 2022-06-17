import React, { useContext } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Data from "../interfaces/Data";
import TableContext from "../contexts/TableContext";
import paths from "../constants/paths";
import Loader from "./ui/Loader";

type Body = {
  [city: string]: { value: string; key: null | string; type: string }[];
};
type Year = { title: string; colSpan: number };

interface transformDataReturn {
  years: Year[];
  ceil: string[];
  body: Body;
}

//I assume that everything was sorted on the server
function transformData(data: Data): transformDataReturn {
  const object: Data = JSON.parse(JSON.stringify(data));

  Object.keys(object).map((cityName) => {
    Object.values(object[cityName].G).map((value) => {
      const computedValue = value.ZZ.value * value.YY.value;
      value["WW"] = { value: computedValue, dateRelease: "-" };
    });
  });

  // default value if there is no value in the data
  const defaultValue = { value: "-", key: null, type: "" };

  //information about TableHead
  //i using the Set so all values is unique
  //I assumed that there could be more values(XX,YY,ZZ...) for one year
  const header: { [year: string]: Set<string> } = {};
  //information about TableBody
  const body: Body = {};

  //header
  Object.values(object).forEach((cityName) => {
    Object.entries(cityName.G).forEach((years) => {
      const [key, value] = years;
      const names = Object.keys(value);
      if (header[key]) {
        names.forEach((name) => header[key].add(name));
      } else {
        header[key] = new Set([...names]);
      }
    });
  });

  //body
  Object.keys(object).forEach((cityName) => {
    body[cityName] = [];

    Object.entries(header).forEach(([year, types]) => {
      types.forEach((type) => {
        const cityName_year = object[cityName].G[+year];

        if (cityName_year) {
          const value = cityName_year[type];
          value
            ? body[cityName].push({
                value: "" + cityName_year[type].value,
                key: `${cityName}-${year}-${type}`,
                type,
              })
            : body[cityName].push(defaultValue);
        } else {
          body[cityName].push(defaultValue);
        }
      });
    });
  });

  const years = Object.entries(header).map(([key, value]) => ({
    title: key,
    colSpan: value.size,
  }));

  const ceil = Array.from(
    // @ts-ignore

    Object.values(header).reduce((acc, set) => acc.concat([...set]), [])
  );

  return {
    years,
    ceil,
    body,
  };
}

const TableData: React.FC = () => {
  const [{ data }] = useContext(TableContext);

  const { years, ceil, body } = React.useMemo(
    () => transformData(data),
    [data]
  );

  const handleCellClick = (key: string | null, type: string) => {
    const allowedTypes: string[] = ["XX", "YY", "ZZ"];

    const isAllowed = allowedTypes.includes(type);

    if (isAllowed && key) {
      window.open(`${paths.details}/${key}`);
    } else {
      alert("You're not allowed to change this field");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2}>regions</TableCell>
            {years.map((item, index) => (
              <TableCell key={index} colSpan={item.colSpan} align="center">
                {item.title}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {ceil.map((item, index) => (
              <TableCell key={index} align={"center"}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(body).map(([city_name, values], index) => (
            <TableRow key={index}>
              <TableCell align="center">{city_name}</TableCell>
              {values.map((item, index) => (
                <TableCell
                  key={index}
                  onClick={() => handleCellClick(item.key, item.type)}
                  align="center"
                  colSpan={1}
                >
                  {item.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
