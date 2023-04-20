import './App.css';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import AdvancedFilter, { FilterValue } from './Filter';

export const PRODUCER_OPTIONS = ["Rick McCallum", "George Lucas", "Gary Kurtz", "Kevin Qu"];
export const EP_OPTIONS = ["1", "2", "3", "4", "5", "6"];


function App() {

  const [filterValue, setFilterValue] = useState<FilterValue>({
    crawlText: '',
    titleText: '',
    eps: {
      [EP_OPTIONS[0]]: true,
      [EP_OPTIONS[1]]: false,
      [EP_OPTIONS[2]]: true,
      [EP_OPTIONS[3]]: false,
      [EP_OPTIONS[4]]: false,
      [EP_OPTIONS[5]]: true,
    },
    producers: {
      [PRODUCER_OPTIONS[0]]: true,
      [PRODUCER_OPTIONS[1]]: false,
      [PRODUCER_OPTIONS[2]]: true,
      [PRODUCER_OPTIONS[3]]: false,
    }
  });

  const handleFilterChange = (filters: any) => {
    setFilterValue(filters);
  };

  return (
    <Stack direction="column" justifyContent="start" alignItems="start">
      <Box>
        Films
      </Box>
      <AdvancedFilter filters={ filterValue } onFilterChange={ handleFilterChange } />
      <Box>
        { JSON.stringify(filterValue) }
      </Box>
    </Stack>
  );
}

export default App;
