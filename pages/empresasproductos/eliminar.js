import React, { useState } from "react"
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { Button, Alert } from '@mui/material'
const Eliminar = ({ data, cerrar, actualizar }) => {
    const [spinner, setSpinner] = useState(false)
    const [response, setResponse] = useState({})
    const eliminar = async (id) => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/empresasProductos/${id}`,
            {
                method: 'DELETE',
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
    return (
        data ? (<>
            <Container>
                <Row>
                    <Col xs={12}>
                        ¿Esta seguro que desea eliminar el producto <b>{data.nombre.toUpperCase()}</b>?
                    </Col>
                    <Col xs={12} lg={12}>
                        {Object.keys(response).length > 0 && !response.response ? (<>
                            <Alert severity={'error'}>
                                <b>* </b>{response.message}
                            </Alert>
                        </>) : (<></>)}
                    </Col>
                    <Col xs={12}>
                        <Modal.Footer>
                            <Button variant="contained" color="error" size="small" onClick={() => { eliminar(data.id) }} disabled={spinner ? true : false}>
                                {spinner ? (<>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </>) : (<></>)} Eliminar</Button>
                            <Button variant="contained" color="secondary" size="small" onClick={cerrar}>Cerrar</Button>
                        </Modal.Footer>
                    </Col>
                </Row>
            </Container>
        </>) : (<></>)
    )
}
Eliminar.defaultProps = {
    data: { nombre: '' },
    cerrar: () => { },
    actualizar: () => { }
}
export default Eliminar