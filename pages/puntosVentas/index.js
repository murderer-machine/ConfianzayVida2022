import React, { useState, useEffect } from "react"
import DataTable from 'react-data-table-component'
import { TextField, Button, Alert } from '@mui/material'
import { Container, Row, Col, Badge, Modal } from 'react-bootstrap'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'
import { styleButton } from '../../styles/globals'
import Eliminar from './eliminar'
import Insertar from './insertar'
import { MdContactPhone } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
import { MdOutlinePhoneIphone } from 'react-icons/md'
import { MdOutlineMail } from 'react-icons/md'
import EliminarContacto from "./eliminarContacto"
import InsertarContacto from "./insertarContactos"
const PuntosVentas = ({ ubigeosData }) => {
    const [puntosVentas, setPuntosVentas] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const leer = async () => {
        const response = await fetch(`${process.env.URL}/api/puntosVentas/`)
        const data = await response.json()
        setPuntosVentas(data.message)
    }
    const leerFiltrado = puntosVentas.filter(e => {
        var nombres = e.nombres.includes(busqueda)
        var apellidos = e.apellidos.includes(busqueda)
        var abreviatura = e.abreviatura.includes(busqueda)
        return nombres || apellidos || abreviatura
    })
    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: '5%',
        },
        {
            name: 'Nombres',
            selector: row => (
                <div className="my-2">
                    <b>Nombres : </b>{row.nombres.toUpperCase()}<br />
                    <b>Apellidos : </b>{row.apellidos.toUpperCase()}<br />
                    <b>Abreviatura : </b>{row.abreviatura.toUpperCase()}
                </div>),
            sortable: true,
        },
        {
            name: '#',
            selector: row => (
                <div className="my-2">
                    <b>Direccion : </b>{row.direccion.toUpperCase()}<br />
                    <b>Referencia : </b>{row.referencia.toUpperCase()}<br />
                    <b>Ubigeo : </b>{row.ubigeo.departamento.toUpperCase()} - {row.ubigeo.provincia.toUpperCase()} - {row.ubigeo.distrito.toUpperCase()}
                </div>),
            sortable: true,
            wrap: true,
        },
        {
            name: '#',
            selector: row => row.comision,
            sortable: true,
            width: '5%',
        },
        {
            name: '#',
            selector: row => row.observaciones,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Agregar Contacto',
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalAcciones('insertarContacto',row.id) }}><ImPencil /></Button>,
            width: '9%',
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
        setActualizar(!actualizar)
    }
    const actualizarFn = () => {
        setActualizar(!actualizar)
    }
    useEffect(() => {
        leer()
    }, [actualizar])
    const ExpandedComponent = ({ data }) => {
        const { puntos_ventas_contactos } = data
        return (
            <Container>
                <Row>
                    {puntos_ventas_contactos.map((e, i) => (
                        <Col xs={4} key={i} className="mt-2">
                            <Alert severity="info" key={i} icon={<MdContactPhone />} className="mb-2" variant="outlined">
                                <b><RiContactsLine /> {e.nombres_apellidos.toUpperCase()}</b><br />
                                <b><MdOutlinePhoneIphone /> {e.celular}</b><br />
                                <b><MdOutlineMail /> {e.correo}</b><br />
                                <Button variant="contained" color="error" size="small" onClick={() => { handleShowModalAcciones('eliminarContacto', e) }}><BsFillTrashFill /></Button>
                            </Alert>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
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
                            title="Puntos de Ventas"
                            striped
                            noDataComponent={<div>No se encontraron registros</div>}
                            paginationPerPage={50}
                            paginationRowsPerPageOptions={[50, 100, 200]}
                            highlightOnHover
                            pointerOnHover
                            expandableRows expandableRowsComponent={ExpandedComponent} />
                    </Col>
                </Row>
            </Container>
            <Modal show={modalAcciones} onHide={handleCloseModalAcciones} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {{
                            "editar": "Actualizar Empresa",
                            "eliminar": "Eliminar Punto de Venta",
                            "insertar": "Insertar Punto de Venta",
                            "eliminarContacto": "Eliminar Contacto",
                            "??nsertarContacto": "Agregar Contacto"
                        }[accion]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {{
                        // "editar": <Actualizar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarFn} empresasData={empresasData} ramosData={ramosData} />,
                        "eliminar": <Eliminar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarFn} />,
                        "insertar": <Insertar cerrar={handleCloseModalAcciones} actualizar={actualizarFn} ubigeosData={ubigeosData} />,
                        "eliminarContacto": <EliminarContacto data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarFn} />,
                        "insertarContacto": <InsertarContacto id={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarFn} />
                    }[accion]}
                </Modal.Body>
            </Modal>
        </>
    )
}
export async function getServerSideProps() {
    const ubigeosFetch = await fetch(`${process.env.URL}/api/ubigeos/`)
    const ubigeosResponse = await ubigeosFetch.json()
    return {
        props: {
            ubigeosData: ubigeosResponse.message,
        }
    }
}
export default PuntosVentas