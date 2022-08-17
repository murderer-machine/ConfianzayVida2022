import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill, BsKeyFill } from 'react-icons/bs'

const Index = () => {
    const [dataClientes, setDataClientes] = useState([])
    const [condicionCliente, setCondicionCliente] = useState(true)
    const mostrarClientes = async () => {
        const response = await fetch(`${process.env.URL}api/clientes/`,
            {
                method: 'GET',
            })
        const data = await response.json()
        if (data.response) {
            setDataClientes(data.message)
        }
    }
    useEffect(() => {
        mostrarClientes()
    }, [condicionCliente])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <table>
                            <thead>
                                <tr>
                                    <th>nro doc</th>
                                    <th>nombre</th>
                                    <th>apellidos</th>
                                    <th>correo</th>
                                    <th>rol</th>
                                    <th>acciones</th>
                                    <th>acciones</th>
                                    <th>acciones</th>
                                    <th>acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataClientes.map((cliente, index) => (
                                    <tr key={index}>
                                        <td data-label="s">{cliente.nombre}</td>
                                        <td data-label="s">{cliente.documento.descripcion}</td>
                                        <td data-label="s">{cliente.nrodoc}</td>
                                        <td data-label="s">{cliente.id_giro_negocio}</td>
                                        <td data-label="s">{cliente.direccion}</td>
                                        <td data-label="s">{cliente.referencia}</td>
                                        <td data-label="s">{cliente.id_ubigeo}</td>
                                        <td data-label="s">{cliente.id_subagente}</td>
                                        <td data-label="acciones">
                                            <Button variant="secondary" size="sm"><ImPencil /></Button>
                                            <Button variant="danger" size="sm"><BsFillTrashFill /></Button>
                                            <Button variant="success" size="sm"><BsKeyFill /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Index