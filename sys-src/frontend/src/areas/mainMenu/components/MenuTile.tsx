import {
    Box,
    ButtonBase,
    Divider,
    Grid,
    Icon,
    Paper,
    SvgIconTypeMap,
    Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface IProps {
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
    title: string;
    content: string;
    children?: JSX.Element;
    action: Function;
}

//Ein Element auf der Startseite
export const MenuTile = (props: IProps) => {
    const { icon, title, content, children, action } = props;

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
                onClick={() => action()}
            >
                <Icon component={icon} fontSize='large' />
                <Divider
                    orientation='vertical'
                    flexItem
                    style={{ marginLeft: 15, marginRight: 15 }}
                />
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
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
                </Box>
            </ButtonBase>
        </Paper>
    );
};
