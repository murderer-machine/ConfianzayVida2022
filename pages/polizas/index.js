import React, { useEffect, useState } from "react"
import { Container, Row, Col, Modal } from 'react-bootstrap'
import Insertar from "./insertar"
import { styleButton } from '../../styles/globals'
import { TextField, Button } from '@mui/material'
import { MdOutlineAddCircle } from 'react-icons/md'
const Polizas = () => {
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
    const [empresasData, setEmpresasData] = useState([])
    const [empresasProductosData, setEmpresasProductosData] = useState([])
    const [monedasData, setMonedasData] = useState([])
    const [clientesData, setClientesData] = useState([])
    const [empresasBancariasData, setEmpresasBancariasData] = useState([])
    const empresasFetch = async () => {
        const empresasFetch = await fetch(`${process.env.URL}/api/empresasSeguros/`)
        const empresasResponse = await empresasFetch.json()
        setEmpresasData(empresasResponse.message)
    }
    const empresasProductosFetch = async () => {
        const empresasProductosFetch = await fetch(`${process.env.URL}/api/empresasSegurosProductos/`)
        const empresasProductosResponse = await empresasProductosFetch.json()
        setEmpresasProductosData(empresasProductosResponse.message)
    }
    const monedasfetch = async () => {
        const monedasFetch = await fetch(`${process.env.URL}/api/monedas/`)
        const monedasResponse = await monedasFetch.json()
        setMonedasData(monedasResponse.message)
    }
    const clientesfetch = async () => {
        const clientesFetch = await fetch(`${process.env.URL}/api/clientes/`)
        const clientesResponse = await clientesFetch.json()
        setClientesData(clientesResponse.message)
    }
    const empresasBancariasFetch = async () => {
        const empresasBancariasFetch = await fetch(`${process.env.URL}/api/empresasBancarias/`)
        const empresasBancariasResponse = await empresasBancariasFetch.json()
        setEmpresasBancariasData(empresasBancariasResponse.message)
    }
    useEffect(() => {
        empresasFetch()
    }, [])
    useEffect(() => {
        empresasProductosFetch()
    }, [])
    useEffect(() => {
        monedasfetch()
    }, [])
    useEffect(() => {
        clientesfetch()
    }, [])
    useEffect(() => {
        empresasBancariasFetch()
    }, [])
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
                            empresasBancariasData={empresasBancariasData}
                        />
                    }[accion]}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Polizas