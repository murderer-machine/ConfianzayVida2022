import React, { useState } from "react"
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect } from "react"
import { styleButton } from '../../styles/globals'
const Insertar = ({ id }) => {
    const [dataInputs, setDataInputs] = useState({})
    const [spinner, setSpinner] = useState(false)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (value) {
            setDataInputs(values => ({ ...values, [name]: value.toLowerCase() }))
        } else {
            setDataInputs(values => {
                const copy = { ...values }
                delete copy[name]
                return copy
            })
        }
    }
    const [response, setResponse] = useState({})
    const insertar = async () => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/puntosVentasContactos`,
            {
                method: 'POST',
                body: JSON.stringify(dataInputs),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        setResponse(data)
        if (data.response) {
            setSpinner(false)
            return
        } else {
            setSpinner(false)
            return
        }
    }
    useEffect(() => {
        setDataInputs(values => ({ ...values, puntosVentaId: id }))
    }, [])
    const ResponseArray = () => {
        return (
            (response.message).map((element, index) => (
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>* </b>{element}</span>
            ))
        )
    }
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <TextField className="mb-2" id="outlined-basic" name="nombres_apellidos" label="nombres_apellidos" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombres_apellidos} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="celular" label="celular" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.celular} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="correo" label="correo" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.correo} sx={styleButton} />
                </Col>
                <Col xs={12} lg={12}>
                    {Object.keys(response).length > 0 ? (<>
                        <Alert severity={response.response ? 'success' : 'error'}>
                            {{
                                "string": <><b>*</b>{response.message}</>,
                                "object": <ResponseArray></ResponseArray>
                            }[typeof response.message]}
                        </Alert>
                    </>) : (<></>)}
                </Col>
                <Col xs={12}>
                    <Button variant="contained" color="primary" size="small" disabled={spinner ? true : false} onClick={insertar}>
                        {spinner ? (<>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </>) : (<></>)} Agregar Contacto</Button>
                </Col>
                {JSON.stringify(dataInputs)}
            </Row>
        </Container>
    )
}
Insertar.defaultProps = {
    id: 0
}
export default Insertar