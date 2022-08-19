import React, { useState } from "react"
import { TextField, Button } from '@mui/material'
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap"
import {styleButton} from '../../styles/globals'
const AgregarUsuario = ({ handleActualizarDatos }) => {

    const [inputs, setInputs] = useState({})
    const [responseAgregarUsuario, setResponseAgregarUsuario] = useState('')
    const [spinnerAgregarUsuario, setSpinnerAgregarUsuario] = useState(false)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value.toLowerCase() }))
    }
    const AlertUsuarioString = () => {
        return (
            responseAgregarUsuario == '' ? (<></>) : (
                <Alert variant={responseAgregarUsuario === 'Usuario agregado correctamente' ? `success` : 'warning'}>
                    <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                    <b>*</b>{responseAgregarUsuario}
                </Alert>
            )
        )
    }
    const AlertUsuarioArray = () => {
        return (
            <>
                <Alert variant="danger">
                    <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                    {responseAgregarUsuario.map((element, index) => (
                        <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>*</b>{element}</span>
                    ))}
                </Alert>
            </>
        )
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setSpinnerAgregarUsuario(true)
        fetch(`${process.env.URL}/api/usuarios/`, {
            method: 'POST',
            body: JSON.stringify(inputs), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setSpinnerAgregarUsuario(false)
                if (response.response) {
                    setInputs({})
                    handleActualizarDatos()
                    setResponseAgregarUsuario('Usuario agregado correctamente')
                }
                if (!response.response) {
                    setResponseAgregarUsuario(response['message'])
                }
            })
    }
   
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Form onSubmit={handleSubmit} className="mb-2">
                            <TextField className="mb-2" id="outlined-basic" name="nroDoc" label="Nro de Documento" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.nroDoc || ""} sx={styleButton} />
                            <TextField className="mb-2" id="outlined-basic" name="nombres" label="Nombres" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.nombres || ""} sx={styleButton} />
                            <TextField className="mb-2" id="outlined-basic" name="apellidos" label="Apellidos" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.apellidos || ""} sx={styleButton} />
                            <TextField className="mb-2" id="outlined-basic" name="correo" label="Correo" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.correo || ""} sx={styleButton} />
                            <TextField className="mb-2" id="outlined-basic" name="password" label="Contraseña" variant="outlined" size="small" fullWidth onChange={handleChange} value={inputs.password || ""} sx={styleButton} type="password"/>
                            <Button variant="contained" type="submit" size="small" disabled={spinnerAgregarUsuario ? true : false}>
                                {spinnerAgregarUsuario ? (<>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </>) : (<></>)} {' '}Crear Usuario
                            </Button>
                        </Form>
                        {
                            {
                                'string': <AlertUsuarioString />,
                                'object': <AlertUsuarioArray />
                            }[typeof responseAgregarUsuario]
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AgregarUsuario