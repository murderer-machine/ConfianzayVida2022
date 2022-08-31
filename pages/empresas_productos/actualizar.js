import React, { useEffect, useState } from "react"
import { styleButton } from '../../styles/globals'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
const Actualizar = ({ data, cerrar, actualizar }) => {
    const [dataInputs, setDataInputs] = useState(data)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setDataInputs(values => ({ ...values, [name]: value.toLowerCase() }))
    }
    const [dataEmpresa, setDataEmpresa] = useState([])
    const empresa = async () => {
        const response = await fetch(`${process.env.URL}/api/empresasSeguros/`)
        const data = await response.json()
        setDataEmpresa(data.message)
    }    
    useEffect(() => {
        empresa()
    }, [])
    console.log(dataEmpresa.filter(o => o.id === data.empresasSeguroId))
    return (
        <Container>
            <Row>
                <Col xs={12} lg={12}>
                    <TextField className="mb-2" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombre} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="comision" label="Comision" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.comision} sx={styleButton} />
                    <Autocomplete
                        className="mb-2"
                        size="small"
                        options={dataEmpresa}
                        getOptionLabel={(option) => `${option.nombre}`}
                        value={dataEmpresa.filter(o => o.id == dataInputs.empresasSeguroId)}
                        // onChange={(event, value) => {
                        //     setDataInputs(values => ({ ...values, empresasSeguroId: value == null ? '' : value.id }))
                        // }}
                        noOptionsText="No se encontraron resultados"
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

                {/* <Col xs={12} lg={12}>
                    {Object.keys(response).length > 0 ? (<>
                        <Alert severity={response.response ? 'success' : 'error'}>
                            {{
                                "string": <><b>*</b>{response.message}</>,
                                "object": <ResponseArray></ResponseArray>
                            }[typeof response.message]}
                        </Alert>
                    </>) : (<></>)}
                </Col> */}
                {/* <Col xs={12}>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" size="small" onClick={editar} disabled={spinner ? true : false}>
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
                </Col> */}
            </Row>
        </Container>
    )
}
export default Actualizar
