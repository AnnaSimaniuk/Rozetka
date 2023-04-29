import { FormControl, MenuItem, Select } from "@mui/material";

const SelectSort = ({ setSelectSort }) => {
  const handleChange = (e) => {
    setSelectSort(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select
        style={{ fontSize: "0.8rem" }}
        id="demo-select-small"
        defaultValue="byRating"
        onChange={handleChange}
      >
        <MenuItem value="byRating" style={{ fontSize: "0.8rem" }}>
          За рейтингом
        </MenuItem>
        <MenuItem value="fromCheaperToExpensive" style={{ fontSize: "0.8rem" }}>
          Від дешевих до дорогих
        </MenuItem>
        <MenuItem value="fromExpensiveToCheaper" style={{ fontSize: "0.8rem" }}>
          Від дорогих до дешевих
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectSort;
