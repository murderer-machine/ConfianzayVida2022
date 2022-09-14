import React, { useState } from "react"
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import { styleButton } from '../../styles/globals'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect } from "react"
import IsertarContacto from './insertarContactos'
const Insertar = ({ cerrar, actualizar, ubigeosData }) => {
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
    const [idContacto, setIdContacto] = useState(0)
    const insertar = async () => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/puntosVentas`,
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
            actualizar()
            setSpinner(false)
            setIdContacto(data.data)
            return
        } else {
            setSpinner(false)
            return
        }
    }
    const ResponseArray = () => {
        return (
            (response.message).map((element, index) => (
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>* </b>{element}</span>
            ))
        )
    }
    const [autoCompleteValues, setAutoCompleteValues] = useState({
        ubigeoId: null,
    })
    const llamarContactos = async (value) => {
        var response = await fetch(`${process.env.URL}/api/puntosVentasContactos/${idResponse}`)
        var data = await response.json()
        setDataContactos(data.message)
    }
    return (
        <Container>
            <Row>
                {idContacto ? (<>
                    <IsertarContacto id={idContacto} />
                </>) : (<>
                    <Col xs={12} lg={12}>
                        <TextField className="mb-2" id="outlined-basic" name="nombres" label="Nombres" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombres} sx={styleButton} />
                        <TextField className="mb-2" id="outlined-basic" name="apellidos" label="Apellidos" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.apellidos} sx={styleButton} />
                        <TextField className="mb-2" id="outlined-basic" name="abreviatura" label="Abreviatura" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.abreviatura} sx={styleButton} />
                        <TextField className="mb-2" id="outlined-basic" name="direccion" label="Direccion" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.direccion} sx={styleButton} />
                        <TextField className="mb-2" id="outlined-basic" name="referencia" label="Referencia" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.referencia} sx={styleButton} />
                        <Autocomplete
                            className="mb-2"
                            size="small"
                            options={ubigeosData ? ubigeosData : []}
                            getOptionLabel={(option) => `${option.departamento.toUpperCase()} - ${option.provincia.toUpperCase()} - ${option.distrito.toUpperCase()}`}
                            onChange={(event, value) => {
                                if (value) {
                                    setAutoCompleteValues(values => ({ ...values, ubigeoId: value }))
                                    setDataInputs(values => ({ ...values, ubigeoId: value.id }))
                                } else {
                                    setAutoCompleteValues(values => ({ ...values, ubigeoId: null }))
                                    setDataInputs(values => {
                                        const copy = { ...values }
                                        delete copy.ubigeoId
                                        return copy
                                    })
                                }
                            }}
                            value={autoCompleteValues.ubigeoId}
                            noOptionsText="No se encontraron resultados"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Seleccione Ubigeo"
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                        />
                        <TextField className="mb-2" id="outlined-basic" name="comision" label="Comision" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.comision} sx={styleButton} />
                        <TextField className="mb-2" id="outlined-basic" name="observaciones" label="Observaciones" variant="outlined" size="small" fullWidth onChange={handleChange} sx={styleButton} value={dataInputs.observaciones} multiline rows={4} />
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
                </>)}
                <Col xs={12}>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" size="small" disabled={spinner || idContacto ? true : false} onClick={insertar} >
                            {spinner ? (<>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </>) : (<></>)} Guardar</Button>
                        <Button variant="contained" color="secondary" size="small" onClick={cerrar}>Cerrar</Button>
                    </Modal.Footer>
                </Col>
            </Row>
        </Container >
    )
}
export default Insertar