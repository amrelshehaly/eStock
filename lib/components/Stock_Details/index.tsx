import React from 'react'
import {StockDetailsState} from '@lib/store/StockDetails'
import { Card, Container, Typography, CardContent, CardHeader, Avatar, Box} from '@mui/material'
import theme from '@lib/styles/mui_theme';
import useStyles from './style'


const StockDetailsComponent = () => {

    const classes = useStyles()
  return (
    <Container>
        <Card className={classes.ImageCard}>
            <img  src={StockDetailsState.StockDetailsState.branding.icon_url}  alt="IconImage" />:
        </Card>
        
        <Card className={classes.CardDescription} variant="outlined" >
            <CardContent>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 56, height: 56 }} aria-label="recipe">
                        {
                            <Typography>{StockDetailsState.StockDetailsState.ticker.charAt(0)}</Typography>
                        }
                    </Avatar>
                    }
                />
                <Typography>
                    {StockDetailsState.StockDetailsState.description}
                </Typography>
            </CardContent>
        </Card>
        <Card  variant="outlined" sx={{height:'300px', marginY:'20px'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Previous Close:
                </Typography>
                <Box className={classes.CardPrevious}>
                    <Box>
                        <Typography variant='h6' component="h6">
                            Close
                        </Typography>
                        <Typography>
                             {StockDetailsState.StockPreviousState.c}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h6' component="h6">
                            Open
                        </Typography>
                        <Typography>
                            {StockDetailsState.StockPreviousState.o}
                        </Typography>
                    </Box>
                    
                </Box>
                <Box className={classes.CardPrevious}>
                    <Box>
                        <Typography variant='h6' component="h6" >
                            Low
                        </Typography>
                        <Typography >
                            {StockDetailsState.StockPreviousState.l}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h6' component="h6" >
                            High
                        </Typography>
                        <Typography>
                             {StockDetailsState.StockPreviousState.h}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Container>
    
  )
}

export default StockDetailsComponent