import { ButtonBase, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IProps {
    title: string;
    content: string;
    link: string;
    children?: JSX.Element;
}

//Ein Element auf der Startseite
export const MenuTile = (props: IProps) => {
    const { title, content, link, children } = props;

    const navigate = useNavigate();

    return (
        <Paper elevation={3}>
            <ButtonBase
                style={{
                    width: '100%',
                    minHeight: 100,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    justifyItems: 'flex-start',
                    textAlign: 'left',
                }}
                onClick={() => navigate(link)}
            >
                <Grid>
                    <Grid item xs={12}>
                        <Typography variant='h4'>{title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body1'>{content}</Typography>
                    </Grid>
                    {children && (
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    )}
                </Grid>
            </ButtonBase>
        </Paper>
    );
};
