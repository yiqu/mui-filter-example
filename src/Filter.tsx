import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Input, InputAdornment, InputLabel, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { EP_OPTIONS, PRODUCER_OPTIONS } from './App';
import SendIcon from '@mui/icons-material/FilterList';
import { memo, useState } from 'react';


export interface AdvancedFilterProps {
  onFilterChange: (filterObj: FilterValue) => void;
  filters: FilterValue;
}

export interface FilterValue {
  producer: {
    [key: string]: boolean
  },
  episode_id: {
    [key: string]: boolean
  },
  opening_crawl: string,
  title: string
}

function AdvancedFilter({ filters, onFilterChange }: AdvancedFilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  
  const handleOpenAdvancedFilters = () => {
    setFilterOpen((current) => {
      return !current;
    });
  };

  const handleFilterChange = (filterKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = {
      ...filters
    };

    if (filterKey === 'opening_crawl' || filterKey === 'title') {
      val = {
        ...filters,
        [filterKey]: event.target.value
      };
    } else {
      val = {
        ...filters,
        [filterKey]: {
          ...filters[filterKey as keyof FilterValue] as {[key: string]: boolean},
          [event.target.name]: event.target.checked
        }
      };
    }
    onFilterChange(val);
  };

  const handleResetFilter = () => {
    onFilterChange({
      opening_crawl: '',
      title: '',
      episode_id: {
        [EP_OPTIONS[0]]: true,
        [EP_OPTIONS[1]]: true,
        [EP_OPTIONS[2]]: true,
        [EP_OPTIONS[3]]: true,
        [EP_OPTIONS[4]]: true,
        [EP_OPTIONS[5]]: true,
      },
      producer: {
        [PRODUCER_OPTIONS[0]]: true,
        [PRODUCER_OPTIONS[1]]: true,
        [PRODUCER_OPTIONS[2]]: true,
      }
    });
  };

  const clearFilterForText = (filterKey: string) => (e: any) => {
    onFilterChange({
      ...filters,
      [filterKey]: ''
    });
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" >

      <Stack direction="row" justifyContent="start" alignItems="center" width="100%" spacing={ 4 }>
        <FormControl variant="standard">
          <InputLabel>Title</InputLabel>
          <Input
            type='text'
            value={ filters.title }
            onChange={ handleFilterChange('title') }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={ clearFilterForText('title') }
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" endIcon={ <SendIcon /> } onClick={ handleOpenAdvancedFilters }>
          Advanced Filter
        </Button>
      </Stack>
      
      {
        filterOpen && (
          <Box width="100%" border="1px solid #ccc" mt={ 3 }>
            <Stack direction="column" justifyContent="start" alignContent="start" p={ 1 }>
              <Stack direction="row" justifyContent="start" alignItems="start" width="100%" >
                <FormControl sx={ { m: 3 } } component="fieldset" variant="standard">
                  <FormLabel component="legend" 
                    sx={ {display: 'flex', justifyContent:"start", alignItems:"start", width:'100%'} } >
                    Producer
                  </FormLabel>
                  <FormGroup>
                    {
                      PRODUCER_OPTIONS.map((producerOption) => {
                        return (
                          <FormControlLabel key={ producerOption }
                            control={
                              <Checkbox checked={ filters.producer[producerOption] } onChange={ handleFilterChange('producer') } name={ producerOption } />
                            }
                            label={ producerOption }
                          />
                        );
                      })
                    }
                  </FormGroup>
                </FormControl>

                <FormControl sx={ { m: 3 } } component="fieldset" variant="standard">
                  <FormLabel component="legend" 
                  sx={ {display: 'flex', justifyContent:"start", alignItems:"start", width:'100%'} } >Ep.</FormLabel>
                  <FormGroup>
                    {
                      EP_OPTIONS.map((epOption) => {
                        return (
                          <FormControlLabel key={ epOption }
                            control={
                              <Checkbox checked={ filters.episode_id[epOption] } onChange={ handleFilterChange('episode_id') } name={ epOption } />
                            }
                            label={ epOption }
                          />
                        );
                      })
                    }
                  </FormGroup>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel>Filter Crawl Text</InputLabel>
                  <Input
                    type='text'
                    value={ filters.opening_crawl }
                    onChange={ handleFilterChange('opening_crawl') }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={ clearFilterForText('opening_crawl') }
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              
                <Divider />
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="end" alignItems="start" mt={ 1 }>
                <Button endIcon={ <RestartAltIcon /> } onClick={ handleResetFilter }>Reset</Button>
                <Button endIcon={ <CloseIcon /> } onClick={ () => setFilterOpen(false) }>Close</Button>
              </Stack>
            </Stack>
          </Box>
        )
      }
    </Stack>
  );
}

export default memo(AdvancedFilter);