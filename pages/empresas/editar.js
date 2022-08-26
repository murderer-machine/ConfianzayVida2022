import React, { useEffect, useState } from "react"
import { styleButton } from '../../styles/globals'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
const Editar = ({ data, cerrar, actualizar }) => {
    const [dataInputs, setDataInputs] = useState(data)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setDataInputs(values => ({ ...values, [name]: value.toLowerCase() }))
    }
    const opcionesSelectActivo = [{
        label: 'Activo',
        valor: true
    },
    {
        label: 'Inactivo',
        valor: false
    }]
    const [spinner, setSpinner] = useState(false)
    const [response, setResponse] = useState({})
    const editarUsuario = async () => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/empresasSeguros`,
            {
                method: 'PUT',
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
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>*</b>{element}</span>
            ))
        )
    }
    return (
        <Container>
            <Row>
                <Col xs={12} lg={12}>
                    <TextField className="mb-2" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombre} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="ruc" label="Ruc" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.ruc} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="factorGeneral" label="Factor General" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.factorGeneral} sx={styleButton} type="number" />
                    <TextField className="mb-2" id="outlined-basic" name="factorSoat" label="Factor Soat" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.factorSoat} sx={styleButton} type="number" />
                    <TextField className="mb-2" id="outlined-basic" name="gastosEmision" label="Gastos Emision" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.gastosEmision} sx={styleButton} type="number" />
                    <TextField className="mb-2" id="outlined-basic" name="gastosEmisionMinimo" label="Gastos Emision Minimo" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.gastosEmisionMinimo} sx={styleButton} type="number" />
                    <TextField className="mb-2" id="outlined-basic" name="gastosEmisionMinimoSoat" label="Gastos Emision Minimo Soat" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.gastosEmisionMinimoSoat} sx={styleButton} type="number" />
                    <Autocomplete
                        className="mb-2"
                        id="country-select-demo"
                        size="small"
                        options={opcionesSelectActivo}
                        getOptionLabel={(option) => option.label}
                        value={opcionesSelectActivo.find(o => o.valor === dataInputs.activo)}
                        onChange={(event, value) => {
                            setDataInputs(values => ({ ...values, activo: value == null ? false : value.valor }))
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Seleccione Estado"
                                name="activo"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
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
                        <Button variant="contained" color="primary" size="small" onClick={editarUsuario} disabled={spinner ? true : false}>
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
Editar.defaultProps = {
    data: {}
}
export default Editar
