import '../styles/globals.scss'
import '../styles/menu.scss'
import { slide as Menu } from 'react-burger-menu'
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a className="menu-item--small" href="">Settings</a>
      </Menu> */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
