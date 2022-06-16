import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TableContext from "../contexts/TableContext";
import { getCurrentDay } from "../helper/dateHelper";
import {
  addDataHistoryItem,
  updateDataItemByKey,
} from "../reducers/useTableReduer/tableActions";
import Error from "./ui/Error";

const defaultUser = "DEFAULT";
const mockUsers = ["User 1", "User 2", "User 3"];

export type TableFormData = {
  value: number;
  date: string;
  user: string;
  comment: string;
};

const TableWindow = () => {
  const { key } = useParams();
  const { control, handleSubmit, reset } = useForm<TableFormData>({
    defaultValues: { user: defaultUser, value: 0, comment: "" },
  });
  const [{ dataHistroy }, dispatch] = useContext(TableContext);

  if (!key) return <Error text="There is no key" />;

  const handleWindowClose = () => window.close();

  const onSubmit = (data: TableFormData) => {
    const { formatedDate } = getCurrentDay();

    const item: TableFormData = {
      value: +data.value,
      date: formatedDate,
      user: data.user,
      comment: data.comment,
    };

    dispatch(addDataHistoryItem({ key, data: item }));
    dispatch(updateDataItemByKey({ key, newValue: item.value }));

    reset({
      value: 0,
      user: defaultUser,
      comment: "",
    });
  };

  const history = dataHistroy[key] || [];
  return (
    <Container>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>value</TableCell>
                <TableCell>date</TableCell>
                <TableCell>user</TableCell>
                <TableCell>comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item: TableFormData, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Controller
                    name="value"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} type="number" variant="outlined" />
                    )}
                  />
                </TableCell>
                <TableCell>today</TableCell>
                <TableCell>
                  <Controller
                    name="user"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        {[defaultUser, ...mockUsers].map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} variant="outlined" />
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Button onClick={handleWindowClose} variant="outlined">
          Close
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default TableWindow;
