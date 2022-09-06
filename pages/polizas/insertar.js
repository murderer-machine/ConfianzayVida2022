import React, { useState } from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import { styleButton } from '../../styles/globals'
import Autocomplete from '@mui/material/Autocomplete'
const Insertar = ({ cerrar, empresasData, empresasProductosData }) => {
    const [dataInputs, setDataInputs] = useState({})
    const [spinner, setSpinner] = useState(false)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setDataInputs(values => ({ ...values, [name]: value.toLowerCase() }))
    }
    const [autoCompleteValues, setAutoCompleteValues] = useState({
        empresa: null,
        producto: null
    })



    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={empresasData ? empresasData : []}
                        getOptionLabel={(option) => `${option.nombre}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, empresa: value }))
                                setDataInputs(values => ({ ...values, empresasSeguroId: value.id }))
                            } else {
                                setAutoCompleteValues(values => ({ ...values, empresa: null }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.empresasSeguroId
                                    delete copy.empresasProductosId
                                    return copy
                                })
                            }
                        }}
                        value={autoCompleteValues.empresa}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Compañía"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={empresasProductosData.filter(item => item.empresasSeguroId == dataInputs.empresasSeguroId)}
                        getOptionLabel={(option) => `${option.nombre}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, producto: value }))
                                setDataInputs(values => ({ ...values, empresasProductosId: value.id }))
                            } else {
                                setAutoCompleteValues(values => ({ ...values, producto: null }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.empresasProductosId
                                    return copy
                                })
                            }
                        }}
                        value={autoCompleteValues.producto}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Producto"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                    <TextField className="mb-2" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombre} sx={styleButton} />
                    {JSON.stringify(autoCompleteValues)}
                    {JSON.stringify(dataInputs)}
                </Col>
                <Col xs={12}>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" size="small" disabled={spinner ? true : false}>
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