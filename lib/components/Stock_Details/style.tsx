import { Theme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  ImageCard:{
    // background:'black',
    marginTop:'20px',
    marginBottom:'20px',
    '& img':{
        [theme.breakpoints.down('sm')]:{
            width:'100%'
        },
        [theme.breakpoints.up('md')]:{
            maxWidth:'250px',
        }
    }
  },
  CardDescription:{
    marginTop:'20px',
    marginBottom:'20px',
    '& .MuiCardHeader-avatar':{
        '& p':{
            fontSize:'25px'
        }
    }
  },
  CardPrevious:{
    display:'flex',
    marginTop:'30px',
    justifyContent:'space-around',
    '& :nth-child(1)':{
        '& h6':{
            fontWeight:700,
            color:'red'
        },
        '& p':{
            color:'GrayText'
        },
    },
    '& :nth-child(2)':{
        '& h6':{
            fontWeight:700,
            color:'green'
        },
        '& p':{
            color:'GrayText'
        },
    },

  },
}))

export default useStyles
