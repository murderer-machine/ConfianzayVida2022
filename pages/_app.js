import '../styles/globals.scss'
import '../styles/menu.scss'
import { slide as Menu } from 'react-burger-menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Link from 'next/link'
const MyApp = ({ Component, pageProps }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2A427B',
      },
      secondary: {
        main: '#6C757D',
      },
      error: {
        main: '#DC3545',
      },
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important"
    }
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <Menu>
    
        <Link href="/" >
          <a  className='bm-item'>Inicio</a>
        </Link>
        <Link href="/usuarios" >
          <a  className='bm-item'>Usuarios</a>
        </Link>
        <Link href="/empresas" >
          <a className='bm-item'>Compañias</a>
        </Link>
        <Link href="/empresasproductos" >
          <a className='bm-item'>Productos Compañias</a>
        </Link>
        <Link href="/polizas" >
          <a className='bm-item'>Polizas</a>
        </Link>
      </Menu>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
