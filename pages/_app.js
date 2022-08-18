import '../styles/globals.scss'
import '../styles/menu.scss'
import { slide as Menu } from 'react-burger-menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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
        {/* <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a className="menu-item--small" href="">Settings</a>
      </Menu> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
