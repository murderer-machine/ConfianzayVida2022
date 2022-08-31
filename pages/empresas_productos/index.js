import React, { useState, useEffect } from "react"
import DataTable from 'react-data-table-component'
import { TextField, Button } from '@mui/material'
import { Container, Row, Col, Alert, Badge, Modal } from 'react-bootstrap'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'
import { styleButton } from '../../styles/globals'
const EmpresasProductos = () => {
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
    useEffect(() => {
        leer()
    }, [])
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
    return (
        <>
            <Container>
                <Row style={{ backgroundColor: '#fff' }} className="my-2 p-2">
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
        </>
    )
}
export default EmpresasProductos