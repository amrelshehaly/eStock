import React, { useState, useEffect, FC, Fragment } from 'react'
import Image from 'next/image'
import Bull from '../../../public/images/bull.png'
import Loader from '@lib/common/loading'
import Backdrop from '@mui/material/Backdrop'

interface Props {
  children: React.ReactNode
}

const SplashScreen: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    }, 10000);
  }, [])
  return !loading ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display:'grid' }} open={true}>
        <div>
            <Image src={Bull}  width='600px' height='600px' />
        </div>
        <div style={{fontSize:'20px', fontWeight:700, margin:'auto'}}>
            Amr Mostafa Elshehaly
        </div>
    </Backdrop>
  )
}

export default SplashScreen
