import { Typography } from '@mui/material';

//Diese Komponente wird geladen, wenn eine ungültige URL aufgerufen wird
export const NoPage = () => {
    return <Typography variant='h1'>Error 404: Page not found</Typography>;
};
