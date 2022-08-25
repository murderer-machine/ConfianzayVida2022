import React, { useEffect, useState } from "react"
import { Container, Row, Col, Alert, Badge, Modal } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill } from 'react-icons/bs'

import { TextField, Button } from '@mui/material'
import { styleButton } from '../../styles/globals'
import Editar from './editar'
const EmpresasSeguros = () => {
    /**
     * @description Función que se ejecuta al iniciar el componente
     */
    const [actualizarEmpresas, setActualizarEmpresas] = useState(false)
    const actualizarEmpresasFn = () => {
        setActualizarEmpresas(!actualizarEmpresas)
    }
    const [empresas, setEmpresas] = React.useState([])
    const cargarEmpresas = async () => {
        const response = await fetch(`${process.env.URL}/api/empresasSeguros/`)
        const data = await response.json()
        setEmpresas(data.message)
    }
    useEffect(() => {
        cargarEmpresas()
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
    const [dataAccion, setDataAccion] = useState({})
    const [modalAcciones, setModalAcciones] = useState(false)
    const handleCloseModalAcciones = () => {
        setModalAcciones(false)
    }
    const handleShowModalAcciones = (accion, data) => {
        setDataAccion(data)
        setModalAcciones(true)
        setAccion(accion)
    }
    const columns = [
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
                    <Col xd={12}>
                        <TextField className="mb-2" id="outlined-basic" label="Busqueda" variant="outlined" size="small" fullWidth onChange={(e) => { setBusqueda(e.target.value) }} value={busqueda} sx={styleButton} />
                        <DataTable
                            columns={columns}
                            data={empresasFiltrado}
                            dense
                            pagination
                            title="Modulo de Empresas"
                            striped
                            noDataComponent={<div>No se encontraron registros</div>}
                            expandableRows expandableRowsComponent={ExpandedComponent}
                        />
                    </Col>
                </Row>
            </Container>
            <Modal show={modalAcciones} onHide={handleCloseModalAcciones}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {{
                            "editar": "Editar Empresa",
                            "eliminar": "Eliminar Empresa",
                            "agregar": "Agregar Empresa"
                        }[accion]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {{
                        "editar": <Editar data={dataAccion} cerrar={handleCloseModalAcciones} actualizar={actualizarEmpresasFn} />,
                        "eliminar": "Eliminar Empresa",
                        "agregar": "Agregar Empresa"
                    }[accion]}
                </Modal.Body>

            </Modal>
        </>
    )
}

export default EmpresasSeguros;