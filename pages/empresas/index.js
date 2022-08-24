import React, { useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { Button } from '@mui/material'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill, BsKeyFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'
import Image from 'next/image'
import { Alert, Badge } from 'react-bootstrap'
const EmpresasSeguros = () => {
    const [empresas, setEmpresas] = React.useState([])
    const cargarEmpresas = async () => {
        const response = await fetch(`${process.env.URL}/api/empresasSeguros/`)
        const data = await response.json()
        setEmpresas(data.message)
    }
    useEffect(() => {
        cargarEmpresas()
    }, [])
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
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalEditar(row.id) }}><ImPencil /></Button>,
        },
        {
            name: 'Eliminar',
            selector: row => <Button variant="contained" color="error" size="small" onClick={() => { handleShowModalEliminar(row.id) }}><BsFillTrashFill /></Button>
        },
        {
            name: 'Contraseña',
            selector: row => <Button variant="contained" color="success" size="small" onClick={() => { handleShowModalPassword(row.id) }}><BsKeyFill /></Button>
        }
    ]
    return (
        <>
            <Container>
                <Row>
                    <Col xd={12}>
                        <DataTable
                            columns={columns}
                            data={empresas}
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
        </>
    )
}

export default EmpresasSeguros;