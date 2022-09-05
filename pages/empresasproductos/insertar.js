import React, { useState } from "react"
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import { styleButton } from '../../styles/globals'
import Autocomplete from '@mui/material/Autocomplete'
const Insertar = ({ empresasData, ramosData, cerrar, actualizar }) => {
    const [dataInputs, setDataInputs] = useState({})
    const [spinner, setSpinner] = useState(false)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setDataInputs(values => ({ ...values, [name]: value.toLowerCase() }))
    }
    const [response, setResponse] = useState({})
    const insertar = async () => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/empresasProductos`,
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
            cerrar()
            setSpinner(false)
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
    return (
        <Container>
            <Row>
                <Col xs={12} lg={12}>
                    <TextField className="mb-2" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombre} sx={styleButton} />
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={empresasData}
                        value={empresasData.find(o => o.id === dataInputs.empresasSeguroId)}
                        getOptionLabel={(option) => `${option.nombre}`}
                        onChange={(event, value) => {
                            setDataInputs(values => ({ ...values, empresasSeguroId: value == null ? '' : value.id }))
                        }}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Compañia"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={ramosData}
                        value={ramosData.find(o => o.id === dataInputs.ramoId)}
                        getOptionLabel={(option) => `${option.descripcion}`}
                        onChange={(event, value) => {
                            setDataInputs(values => ({ ...values, ramoId: value == null ? '' : value.id }))
                        }}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Ramo"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                    <TextField className="mb-2" id="outlined-basic" name="comision" label="Comision" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.comision} sx={styleButton} />
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
                    <Modal.Footer>
                        <Button variant="contained" color="primary" size="small" disabled={spinner ? true : false} onClick={insertar}>
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
        </Container>
    )
}
export default Insertar