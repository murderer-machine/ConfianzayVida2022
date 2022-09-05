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
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Autocomplete
                            className="mb-2"
                            size="small"
                            options={empresasData}
                            getOptionLabel={(option) => `${option.nombre}`}
                            onChange={(event, value) => {
                                setDataInputs(values => ({
                                    ...values,
                                    empresasSeguroId: value == null ? '' : value.id,
                                }))
                            }}
                            value = {empresasData.find(o => o.id === dataInputs.empresasSeguroId)}
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
                        {/* <Autocomplete
                            className="mb-2"
                            size="small"
                            options={empresasProductosData.filter(item => item.empresasSeguroId == dataInputs.empresasSeguroId)}
                            getOptionLabel={(option) => `${option.nombre}`}
                            onChange={(event, value) => {
                                setDataInputs(values => ({ ...values, empresasSegurosProductoId: value == null ? '' : value.id }))
                            }}
                            value = {empresasProductosData.find(o => o.id === dataInputs.empresasSegurosProductoId)}
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
                        /> */}
                        <TextField className="mb-2" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombre} sx={styleButton} />
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
        </>
    )
}
export default Insertar