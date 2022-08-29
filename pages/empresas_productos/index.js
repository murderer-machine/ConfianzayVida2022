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
        return e.nombre.includes(busqueda)
    })
 
    
    useEffect(() => {
        leer()
    }, [])
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre.toUpperCase(),
            sortable: true,
            width: '40%'
        },
        {
            name: 'empresasSeguroId',
            selector: row => <img src={`${process.env.URLIMAGENES}/${row.empresas_seguro.logo}`} height={20} />,
            sortable: true,
            width: '12%'
        },
        {
            name: 'id_ramo',
            selector: row => row.id_ramo,
            sortable: true,
            width: '12%'
        },
        {
            name: 'comision',
            selector: row => row.comision,
            sortable: true,
            width: '12%'
        },
        {
            name: 'Editar',
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalAcciones('editar', row) }}><ImPencil /></Button>,
            width: '12%'
        },
        {
            name: 'Eliminar',
            selector: row => <Button variant="contained" color="error" size="small" onClick={() => { handleShowModalAcciones('eliminar', row) }}><BsFillTrashFill /></Button>,
            width: '12%'
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
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default EmpresasProductos