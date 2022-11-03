
import React, { useState } from 'react'
import cookies from 'js-cookie'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { styleButton } from '../styles/globals'
import { TextField, Button, Alert } from '@mui/material'
import styles from '../styles/Inicio.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
const Index = () => {
    const router = useRouter()
    const [inputs, setInputs] = useState({
        nroDoc: '',
        password: '',
    })
    const [response, setResponse] = useState({})
    const [spinner, setSpinner] = useState(false)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (value) {
            setInputs(values => ({ ...values, [name]: value.toLowerCase() }))
        } else {
            setInputs(values => {
                const copy = { ...values }
                delete copy[name]
                return copy
            })
        }
    }
    const login = async () => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/usuarios/login`,
            {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        if (data.response) {
            router.push('usuarios')
            cookies.set("token", data.token)
        }
        setSpinner(false)
        setResponse(data)
    }
    return (
        <>
            {/* <button onClick={() => {
                cookies.set(
                    "token",
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU0OTYyMjA1LCJleHAiOjE2NTQ5NjIzMjV9.pHb0vTCfbwVIMNzzLDi0k5M_4fe0QgpBJcNqSTaUlLY"
                )
            }}>login</button>
            <button onClick={() => {
                cookies.remove('token')
            }}>logout</button>
            {cookies.get('token') ? <h1>logged in</h1> : <h1>logged out</h1>} */}
            <Container fluid>
                <Row className={styles.tamano}>
                    <Col xs={12} lg={6} className={`d-flex flex-column justify-content-center align-items-center ${styles.background}`}>
                        <Image src="/logo_horizontal.svg" alt="Confianza Logo" width={480} height={80} />
                        <h3 className='p-0 m-0'>Descubre el Nuevo</h3>
                        <h4 className='p-0 m-0'>Sistema 2.0</h4>
                        <h4 className='p-0 m-0'>CONFIANZA & VIDA</h4>
                        <p className='p-0 m-0'>Ahora podrás realizar todas tus operaciones desde un solo sistema.</p>
                    </Col>
                    <Col xs={12} lg={6} className={`d-flex flex-column justify-content-center align-items-center`}>
                        <TextField className="mb-2" id="outlined-basic" name="nroDoc" label="Nro de Documento" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.nroDoc || ""} sx={styleButton} />
                        <TextField type="password" className="mb-2" id="outlined-basic" name="password" label="password" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.password || ""} sx={styleButton} />
                        <Button variant="contained" color="primary" size="small" onClick={login} disabled={spinner ? true : false}>
                            {spinner ? (<>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ marginRight: '5px' }}
                                />
                            </>) : (<></>)}
                            Ingresar
                        </Button>
                        <Alert severity={response.response ? 'success' : 'error'}>
                            {response.message}
                        </Alert>
                        {JSON.stringify(inputs)}
                        {JSON.stringify(response)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export async function getServerSideProps({ req }) {
    const token = req.cookies.token ? req.cookies.token : ''
    const response = await fetch(`${process.env.URL}/api/usuarios/verificar/${token}`)
    const data = await response.json()
    return {
        redirect: {
            destination: !data.response ? '/usuarios' : '/',
            permanent: false,
        },
    }
}
export default Index