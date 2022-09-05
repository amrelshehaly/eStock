import React, { useEffect } from 'react'
import {useAppState} from '@lib/store'
import { Card, Container, Typography, CardContent, CardHeader, Avatar, Box,Grid} from '@mui/material'
import theme from '@lib/styles/mui_theme';
import useStyles from './style'


const StockDetailsComponent = () => {

    const classes = useStyles()
    const {branding, ticker, description, name} = useAppState().stockDetails
    const {c,h, l, o} = useAppState().previousClose
  return (
    <Container>
        {branding.logo_url && <Box className={classes.ImageCard}>
            <img  src={branding.logo_url}  alt="IconImage" />:
        </Box>}

        <Card className={classes.CardDescription} variant="outlined" sx={{display:'flex'}} >
            <CardContent>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 56, height: 56 }} aria-label="recipe">
                        {
                            <Typography>{ticker.charAt(0)}</Typography>
                        }
                    </Avatar>
                    }
                />
            </CardContent>
                <Box className={classes.HeaderContent}>
                    <Typography variant='h4' component='div'>
                        {ticker}
                    </Typography>
                    <Typography variant='h5' component='div'>
                        {name}
                    </Typography>
                </Box>
        </Card>
        {description && <Card>
            <CardContent>
                <Typography variant='h6' component='div'>
                    {description}
                </Typography>
            </CardContent>
        </Card>}
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
                             {c}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h6' component="h6">
                            Open
                        </Typography>
                        <Typography>
                            {o}
                        </Typography>
                    </Box>
                    
                </Box>
                <Box className={classes.CardPrevious}>
                    <Box>
                        <Typography variant='h6' component="h6" >
                            Low
                        </Typography>
                        <Typography >
                            {l}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h6' component="h6" >
                            High
                        </Typography>
                        <Typography>
                             {h}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Container>
    
  )
}

export default StockDetailsComponent