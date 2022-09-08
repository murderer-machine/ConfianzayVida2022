import React, { useState } from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import { styleButton } from '../../styles/globals'
import Autocomplete from '@mui/material/Autocomplete'
const Insertar = ({ cerrar, empresasData, empresasProductosData, monedasData, clientesData, empresasBancariasData }) => {
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
    const [autoCompleteValues, setAutoCompleteValues] = useState({
        empresa: null,
        producto: null,
        moneda: null,
        cliente: null,
        empresa_bancaria: null
    })
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={empresasData ? empresasData : []}
                        getOptionLabel={(option) => `${option.nombre.toUpperCase()}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, empresa: value }))
                                setDataInputs(values => ({ ...values, empresasSeguroId: value.id }))
                            } else {
                                setAutoCompleteValues(values => ({
                                    ...values,
                                    empresa: null,
                                    producto: null,
                                    moneda: null,
                                    empresa_bancaria: null
                                }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.empresasSeguroId
                                    delete copy.empresasProductosId
                                    delete copy.ramoId
                                    delete copy.moneda
                                    delete copy.endosoAfavor
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
                        getOptionLabel={(option) => `${option.nombre.toUpperCase()}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, producto: value }))
                                setDataInputs(values => ({
                                    ...values,
                                    empresasProductosId: value.id,
                                    ramoId: value.ramo.id
                                }))
                            } else {
                                setAutoCompleteValues(values => ({ ...values, producto: null }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.empresasProductosId
                                    delete copy.ramoId
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
                    <div className="mb-2"><b>Ramo : </b>{dataInputs.ramoId ? (autoCompleteValues?.producto.ramo.descripcion).toUpperCase() : ''}</div>
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={monedasData ? monedasData : []}
                        getOptionLabel={(option) => `${option.simbolo} - ${(option.descripcion).toUpperCase()}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, moneda: value }))
                                setDataInputs(values => ({ ...values, moneda: value.id }))
                            } else {
                                setAutoCompleteValues(values => ({ ...values, moneda: null }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.moneda
                                    return copy
                                })
                            }
                        }}
                        value={autoCompleteValues.moneda}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Moneda"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                    <TextField className="mb-2" id="outlined-basic" name="nroPoliza" label="Nro Poliza" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nroPoliza} sx={styleButton} />
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={clientesData ? clientesData : []}
                        getOptionLabel={(option) => `${option.nombre.toUpperCase()} ${option.nroDoc}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, cliente: value }))
                                setDataInputs(values => ({ ...values, clienteId: value.id }))
                            } else {
                                setAutoCompleteValues(values => ({ ...values, cliente: null }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.clienteId
                                    return copy
                                })
                            }
                        }}
                        value={autoCompleteValues.cliente}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Cliente"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                    <TextField className="mb-2" id="outlined-basic" name="descripcion" label="Descripcion" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.descripcion} sx={styleButton} />
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={empresasBancariasData ? empresasBancariasData : []}
                        getOptionLabel={(option) => `${option.nombre.toUpperCase()}`}
                        onChange={(event, value) => {
                            if (value) {
                                setAutoCompleteValues(values => ({ ...values, empresa_bancaria: value }))
                                setDataInputs(values => ({ ...values, endosoAfavor: value.id }))
                            } else {
                                setAutoCompleteValues(values => ({ ...values, empresa_bancaria: null }))
                                setDataInputs(values => {
                                    const copy = { ...values }
                                    delete copy.endosoAfavor
                                    return copy
                                })
                            }
                        }}
                        value={autoCompleteValues.empresa_bancaria}
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Empresa Bancaria"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
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
Insertar.defaultProps = {
    cerrar: () => { },
    empresasData: [],
    empresasProductosData: [],
    monedasData: [],
    clientesData: [],
}
export default Insertar