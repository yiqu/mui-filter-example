import './App.css';
import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import AdvancedFilter, { FilterValue } from './Filter';
import useFetch from './useFetch';

export const PRODUCER_OPTIONS = ["Rick McCallum", "George Lucas", "Gary Kurtz", "Kevin Qu"];
export const EP_OPTIONS = ["1", "2", "3", "4", "5", "6"];


function App() {

  const [filterValue, setFilterValue] = useState<FilterValue>({
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
      [PRODUCER_OPTIONS[3]]: true,
    }
  });

  const handleFilterChange = useCallback((filters: any) => {
    setFilterValue(filters);
  }, []);

  const { payload, error, loading } = useFetch<Payload>({url: 'https://www.swapi.tech/api/films'});

  const filtered: Film[] = useMemo<Film[]>(() => {
    //console.log("memoing");
    console.log(filterValue, payload?.result);
    if (payload) {
      const result: Film[] = payload.result.filter((res: Film) => {
        const title = filterValue.title.trim().toLowerCase();
        const opening_crawl = filterValue.opening_crawl.trim();

        let titleMatch = true;
        let crawlTextMatch = true;
        let epMatch = true;
        let producerMatch = true;

        if (title === '') {
          titleMatch = true;
        } else {
          titleMatch = (res.properties.title.toLowerCase()).includes(filterValue.title);
        }

        if (opening_crawl === '') {
          crawlTextMatch = true;
        } else {
          crawlTextMatch = (res.properties.opening_crawl.toLowerCase()).includes(filterValue.opening_crawl);
        }

        const producerKeys = Object.keys(filterValue.producer);
        let producers = '';
        producerKeys.forEach((producerName: string) => {
          if (filterValue.producer[producerName]) {
            producers = producers + ' ' + producerName;
          }
        });
        console.log(producers)
        producerMatch = (res.properties.producer.toLowerCase()).includes(producers.trim().toLowerCase());

        return titleMatch && crawlTextMatch && epMatch && producerMatch;
      });
      return result;
    }

    return [];
  }, [payload, filterValue]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!payload) {
    return null;
  }

  return (
    <Stack direction="column" justifyContent="start" alignItems="start">

      <Stack direction="column" width="100%" spacing={ 2 } mb={ 2 }>
        <Box sx={ {display: 'flex', justifyContent: 'start', alignItems: 'start'} }>
          <Typography variant='h4'>
            Films 
          </Typography>
        </Box>
        <Stack sx={ {display: 'flex', justifyContent: 'start', alignItems: 'start'} }>
          <Box>
            { JSON.stringify(filterValue.title) }
          </Box>
          <Box>
            { JSON.stringify(filterValue.opening_crawl) }
          </Box>
          <Box>
            { JSON.stringify(filterValue.episode_id) }
          </Box>
          <Box>
            { JSON.stringify(filterValue.producer) }
          </Box>
        </Stack>
      </Stack>

      <AdvancedFilter filters={ filterValue } onFilterChange={ handleFilterChange } />
      
      <Box mt={ 2 }>
        <Stack direction="row" justifyContent="start" alignItems="center">
          <Typography variant='h6'>Count: { filtered.length } </Typography>
        </Stack>
        
        <List dense={ false }>
          {
            filtered.map((res: Film) => {
              return (
                <ListItem key={ res._id }>
                  <ListItemText
                    primary={ <span>Ep.{res.properties.episode_id} - { res.properties.title } </span> }
                    secondary={ <Stack component={ 'span' } direction="column" spacing={ 2 }>
                      <Box component={ 'span' }>
                        { res.properties.producer }
                      </Box>
                      <Box component={ 'span' }>
                        { res.properties.opening_crawl }
                      </Box>
                    </Stack> }
                  />
                </ListItem>
              );
            })
          }
        </List>
      </Box>
    </Stack>
  );
}

export default App;


export interface Film {
  description: string;
  uid: string;
  _id: string;
  properties: {
    director: string;
    producer: string;
    episode_id: string;
    opening_crawl: string;
    title: string;
  }
}

export interface Payload {
  message: string;
  result: Film[];
}