import React, { useEffect, useState } from "react"
import { Container, Row, Col, Alert, Badge, Modal } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'
import { TextField, Button } from '@mui/material'
import { styleButton } from '../../styles/globals'
import Actualizar from './actualizar'
import Eliminar from './eliminar'
import Insertar from "./insertar"
const EmpresasSeguros = () => {
    /**
     * @description Función que se ejecuta al iniciar el componente
     */
    const [actualizarEmpresas, setActualizarEmpresas] = useState(false)
    const actualizarEmpresasFn = () => {
        setActualizarEmpresas(!actualizarEmpresas)
    }
    const [empresas, setEmpresas] = useState([])
    const leer = async () => {
        const response = await fetch(`${process.env.URL}/api/empresasSeguros/`)
        const data = await response.json()
        setEmpresas(data.message)
    }
    useEffect(() => {
        leer()
    }, [actualizarEmpresas])
    /**
     * @description Función que se ejecuta al buscar una empresa
     */
    const [busqueda, setBusqueda] = useState('')
    const empresasFiltrado = empresas.filter(e => {
        return e.nombre.includes(busqueda)
    })
    /** 
     * @description Función que se ejecuta al expandir tabla una empresa
    */
    const ExpandedComponent = ({ data }) => {
        return (
            <Alert variant="secondary" className="p-2 m-2">
                <Container>
                    <Row className="p-2">
                        <Col xs={12} lg={6}>
                            <b>Factor General : </b>{data.factorGeneral}<br />
                            <b>Factor Soat : </b>{data.factorSoat}<br />
                            <b>Gastos Emision : </b>{data.gastosEmision}<br />
                            <b>Gastos Emision Minimo : </b>{data.gastosEmisionMinimo}<br />
                            <b>Gastos Emision Minimo Soat : </b>{data.gastosEmisionMinimoSoat}<br />
                        </Col>
                        <Col xs={12} lg={6}>
                            <b>Logo : </b>
                            {!data.logo ? (<>Sin logo</>) : (<>
                                <img src={`${process.env.URLIMAGENES}/${data.logo}`} height={40} />
                            </>)}
                        </Col>
                    </Row>
                </Container>
            </Alert>
        )
    }
    /**
     * @description Función que se ejecuta al abrir el modal
    */
    const [accion, setAccion] = useState('')
    const [dataAccion, setDataAccion] = useState('')
    const [modalAcciones, setModalAcciones] = useState(false)
    const handleCloseModalAcciones = () => {
        setModalAcciones(false)
    }
    const handleShowModalAcciones = (accion, data = {}) => {
        setDataAccion(data)
        setModalAcciones(true)
        setAccion(accion)
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: '5%'
        },
        {
            name: 'Nombre',
            selector: row => row.nombre.toUpperCase(),
            sortable: true,
            width: '30%'
        },
        {
            name: 'Ruc',
            selector: row => row.ruc,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.activo ? (<><Badge bg="success">Activo</Badge></>) : (<><Badge bg="secondary">Inactivo</Badge></>),
        },
        {
            name: 'Editar',
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalAcciones('editar', row) }}><ImPencil /></Button>,
        },
        {
            name: 'Eliminar',
            selector: row => <Button variant="contained" color="error" size="small" onClick={() => { handleShowModalAcciones('eliminar', row) }}><BsFillTrashFill /></Button>
        },
    ]
    return (
        <>
            <Container>
                <Row style={{ backgroundColor: '#fff' }} className="my-2 p-2">
                    <Col xs={12}>
                        <Button className="mb-2" variant="contained" color="primary" onClick={() => { handleShowModalAcciones('insertar') }}><MdOutlineAddCircle /></Button>
                    </Col>
                    <Col xd={12}>
                        <TextField className="mb-2" id="outlined-basic" label="Busqueda" variant="outlined" size="small" fullWidth onChange={(e) => { setBusqueda(e.target.value.toLowerCase()) }} value={busqueda} sx={styleButton} />
                        <DataTable
                            columns={columns}
                            data={empresasFiltrado}
                            dense
                            pagination
                            title="Modulo de Empresas"
                            striped
                            noDataComponent={<div>No se encontraron registros</div>}
                            expandableRows expandableRowsComponent={ExpandedComponent}
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
                        "editar": <Actualizar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarEmpresasFn} />,
                        "eliminar": <Eliminar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarEmpresasFn} />,
                        "insertar": <Insertar cerrar={handleCloseModalAcciones} actualizar={actualizarEmpresasFn} />
                    }[accion]}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmpresasSeguros;