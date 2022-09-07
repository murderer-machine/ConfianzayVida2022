import React, { useEffect, useState } from "react"
import { Container, Row, Col, Modal } from 'react-bootstrap'
import Insertar from "./insertar"
import { styleButton } from '../../styles/globals'
import { TextField, Button } from '@mui/material'
import { MdOutlineAddCircle } from 'react-icons/md'
const Polizas = ({ empresasData, empresasProductosData, monedasData, clientesData }) => {
    const [modalAcciones, setModalAcciones] = useState(false)
    const [accion, setAccion] = useState('')
    const [dataAccion, setDataAccion] = useState('')
    const handleCloseModalAcciones = () => {
        setModalAcciones(false)
    }
    const handleShowModalAcciones = (accion, data = {}) => {
        setDataAccion(data)
        setModalAcciones(true)
        setAccion(accion)
    }
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Button className="mb-2" variant="contained" color="primary" onClick={() => { handleShowModalAcciones('insertar') }}><MdOutlineAddCircle /></Button>
                    </Col>
                </Row>
            </Container>
            <Modal show={modalAcciones} onHide={handleCloseModalAcciones} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {{
                            "insertar": "Insertar Empresa"
                        }[accion]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {{
                        "insertar": <Insertar
                            cerrar={handleCloseModalAcciones}
                            empresasData={empresasData}
                            empresasProductosData={empresasProductosData}
                            monedasData={monedasData}
                            clientesData={clientesData}
                        />
                    }[accion]}
                </Modal.Body>
            </Modal>
        </>
    )
}
export async function getServerSideProps() {
    const empresasFetch = await fetch(`${process.env.URL}/api/empresasSeguros/`)
    const empresasResponse = await empresasFetch.json()

    const empresasProductosFetch = await fetch(`${process.env.URL}/api/empresasProductos/`)
    const empresasProductosResponse = await empresasProductosFetch.json()

    const monedasfetch = await fetch(`${process.env.URL}/api/monedas/`)
    const monedasResponse = await monedasfetch.json()

    const clientesfetch = await fetch(`${process.env.URL}/api/clientes/`)
    const clientesResponse = await clientesfetch.json()

    return {
        props: {
            empresasData: empresasResponse.message,
            empresasProductosData: empresasProductosResponse.message,
            monedasData: monedasResponse.message,
            clientesData: clientesResponse.message,
        }
    }
}
export default Polizas