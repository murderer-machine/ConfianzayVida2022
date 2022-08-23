import React, { useEffect } from "react"
import { Container,Row,Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { Button } from '@mui/material'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill, BsKeyFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'
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
            <div>
            <b>Factor General : </b>{data.factorGeneral}
            <b>Factor Soat : </b>{data.factorSoat}
            <b>Gastos Emision : </b>{data.gastosEmision}
            <b>Gastos Emision Minimo : </b>{data.gastosEmisionMinimo}
            </div>
        )
    }
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Ruc',
            selector: row => row.ruc,
            sortable: true,
        },
        {
            name: 'gastosEmisionMinimoSoat',
            selector: row => row.gastosEmisionMinimoSoat,
            sortable: true,
        },
        {
            name: 'activo',
            selector: row => row.activo,
            sortable: true,
        },
        {
            name: 'logo',
            selector: row => row.logo,
            sortable: true,
        },
        {
            name: 'Editar',
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalEditar(row.id) }}><ImPencil /></Button>,
            sortable: true,
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