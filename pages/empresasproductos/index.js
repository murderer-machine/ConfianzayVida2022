import React, { useState, useEffect } from "react"
import DataTable from 'react-data-table-component'
import { TextField, Button } from '@mui/material'
import { Container, Row, Col, Alert, Badge, Modal } from 'react-bootstrap'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'
import { styleButton } from '../../styles/globals'
import Eliminar from './eliminar'
import Actualizar from './actualizar'
const EmpresasProductos = ({ empresasData }) => {
    const [empresasProductos, setEmpresasProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const leer = async () => {
        const response = await fetch(`${process.env.URL}/api/empresasProductos/`)
        const data = await response.json()
        setEmpresasProductos(data.message)
    }
    const leerFiltrado = empresasProductos.filter(e => {
        var nombre = e.nombre.includes(busqueda)
        if (Object.keys(e.empresas_seguro).length > 0) {
            var nombre_empresa = e.empresas_seguro.nombre.includes(busqueda)
        }
        if (Object.keys(e.ramo).length > 0) {
            var ramo = e.ramo.descripcion.includes(busqueda)
        }
        return nombre || ramo || nombre_empresa
    })

    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: '5%',
        },
        {
            name: 'Nombre',
            selector: row => row.nombre.toUpperCase(),
            sortable: true,
            wrap: true,
            width: '30%',
        },
        {
            name: 'Compañia',
            selector: row => <img src={`${process.env.URLIMAGENES}/${row.empresas_seguro.logo}`} height={20} />,
            width: '10%',
            wrap: true,
        },
        {
            name: 'Ramo',
            selector: row => row.ramo.descripcion.toUpperCase(),
            sortable: true,
            width: '25%',
            wrap: true,
        },
        {
            name: 'Comisión',
            selector: row => row.comision,
            width: '10%',
        },
        {
            name: 'Editar',
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalAcciones('editar', row) }}><ImPencil /></Button>,
            width: '9%',
        },
        {
            name: 'Eliminar',
            selector: row => <Button variant="contained" color="error" size="small" onClick={() => { handleShowModalAcciones('eliminar', row) }}><BsFillTrashFill /></Button>,
            width: '9%',
        },
    ]
    const [accion, setAccion] = useState('')
    const [dataAccion, setDataAccion] = useState('')
    const [modalAcciones, setModalAcciones] = useState(false)
    const [actualizar, setActualizar] = useState(false)
    const handleShowModalAcciones = (accion, data = {}) => {
        setDataAccion(data)
        setModalAcciones(true)
        setAccion(accion)
    }
    const handleCloseModalAcciones = () => {
        setModalAcciones(false)
    }

    const actualizarFn = () => {
        setActualizar(!actualizar)
    }
    useEffect(() => {
        leer()
    }, [actualizar])


    return (
        <>
            <Container>
                <Row style={{ backgroundColor: '#fff' }} className="my-2 p-2">
                    <Col xs={12}>
                        <Button className="mb-2" variant="contained" color="primary" onClick={() => { handleShowModalAcciones('insertar') }}><MdOutlineAddCircle /></Button>
                    </Col>
                    <Col xs={12}>
                        <TextField className="mb-2" id="outlined-basic" label="Busqueda" variant="outlined" size="small" fullWidth onChange={(e) => { setBusqueda(e.target.value.toLowerCase()) }} value={busqueda} sx={styleButton} />
                        <DataTable
                            columns={columns}
                            data={leerFiltrado}
                            dense
                            pagination
                            title="Modulo de Productos"
                            striped
                            noDataComponent={<div>No se encontraron registros</div>}
                            paginationPerPage={50}
                            paginationRowsPerPageOptions={[50, 100, 200]}
                            highlightOnHover
                            pointerOnHover
                        />
                    </Col>
                </Row>
            </Container>
            <Modal show={modalAcciones} onHide={handleCloseModalAcciones} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {{
                            "editar": "Actualizar Empresa",
                            "eliminar": "Eliminar Empresa",
                            "insertar": "Insertar Empresa"
                        }[accion]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {{
                        "editar": <Actualizar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarFn} empresasData={empresasData} />,
                        "eliminar": <Eliminar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarFn} />,
                        // "insertar": <Insertar cerrar={handleCloseModalAcciones} actualizar={actualizarFn} />
                    }[accion]}
                </Modal.Body>
            </Modal>
        </>
    )
}
export async function getServerSideProps() {
    const empresasFetch = await fetch(`${process.env.URL}/api/empresasSeguros/`)
    const empresasResponse = await empresasFetch.json()
    return { props: { empresasData: empresasResponse.message } }
}
export default EmpresasProductos