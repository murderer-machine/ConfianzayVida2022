import React, { useEffect, useState } from "react"
import { Container, Row, Col, Form, Alert, Spinner, Modal } from 'react-bootstrap'

import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill, BsKeyFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'

import { TextField, Button } from '@mui/material'
import DataTable from 'react-data-table-component'

import AgregarUsuario from './agregarUsuario'
const Usuarios = () => {
    /**
     * Modulo de usuarios
     */
    const [usuarios, setUsuarios] = useState([])
    const cargarUsuarios = async () => {
        const response = await fetch(`${process.env.URL}/api/usuarios/`)
        const data = await response.json()
        setUsuarios(data.message)
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: 'Nro Documento',
            selector: row => row.nroDoc,
        },
        {
            name: 'Nombres',
            selector: row => row.nombres,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
        },
        {
            name: 'Rol',
            selector: row => row.rol,
        },
        {
            name: 'Editar',
            selector: row => <Button variant="contained" color="secondary" size="small" onClick={() => { handleShowModalEditar(row.id) }}><ImPencil /></Button>
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
    useEffect(() => {
        cargarUsuarios()
    }, [])
    /** */
    /**
     * Modulo de busqueda
     */
    const [busqueda, setBusqueda] = useState('')
    const usuariosFiltrado = usuarios.filter(e => {
        return e.nroDoc.includes(busqueda) ||
            e.nombres.includes(busqueda) ||
            e.apellidos.includes(busqueda) ||
            e.correo.includes(busqueda) ||
            e.rol.includes(busqueda)
    })
    const usuariosGeneral = busqueda.length > 0 ? usuariosFiltrado : usuarios
    /** */


    const [accion, setAccion] = useState('')
    /**
     * Modulo de eliminar
     */
    const [modalAcciones, setModalAcciones] = useState(false)
    const [idUsuarioeliminar, setIdUsuarioEliminar] = useState({})
    const handleCloseModalAcciones = () => {
        setModalAcciones(false)
        setIdUsuarioEliminar({})
        setAlertContrasena({})
        setAlertEditar({})
    }

    const handleShowModalEliminar = (id) => {
        setAccion('eliminar')
        setIdUsuarioEliminar(usuariosGeneral.find(element => { return element.id === id }))
        setModalAcciones(true)
    }
    const eliminarUsuario = async () => {
        const response = await fetch(`${process.env.URL}api/usuarios/${idUsuarioeliminar.id}`, { method: 'PUT' })
        const data = await response.json()
        if (data.response) {
            handleCloseModalAcciones()
        }
    }
    /** */
    /**
     * Modulo de Cambiar Contraseña
     */
    const [inputContrasena, setInputContrasena] = useState({})
    const handleChangeContrasena = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputContrasena(values => ({ ...values, [name]: value }))
    }
    const handleShowModalPassword = (id) => {
        setAccion('password')
        setIdUsuarioEliminar(usuariosGeneral.find(element => { return element.id === id }))
        setModalAcciones(true)
    }
    const handleShowModalAgregarUsuario = () => {
        setAccion('agregar')
        setModalAcciones(true)
    }
    const [spinnerContrasena, setSpinnerContrasena] = useState(false)
    const [alertContrasena, setAlertContrasena] = useState({})
    const cambiarContrasenaUsuario = async () => {
        setAlertContrasena({})
        setSpinnerContrasena(true)
        const response = await fetch(`${process.env.URL}api/usuarios/cambiarcontrasena/${idUsuarioeliminar.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(inputContrasena),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        setSpinnerContrasena(false)
        setAlertContrasena(data)
        if (data.response) {
            setInputContrasena({})
        }
    }
    const AlertContraseñaArray = () => {
        return (
            (alertContrasena.message).map((element, index) => (
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>*</b>{element}</span>
            ))
        )
    }
    /** */
    /**
     * Modulo de Editar
     * */
    const handleShowModalEditar = (id) => {
        setAccion('editar')
        setIdUsuarioEliminar(usuariosGeneral.find(element => { return element.id === id }))
        setModalAcciones(true)
    }
    const handleChangeEditar = (event) => {
        const name = event.target.name
        const value = event.target.value
        setIdUsuarioEliminar(values => ({ ...values, [name]: value }))
    }
    const [alertEditar, setAlertEditar] = useState({})
    const [spinnerEditar, setSpinnerEditar] = useState(false)
    const editarUsuario = async () => {
        setSpinnerEditar(true)
        const response = await fetch(`${process.env.URL}api/usuarios/${idUsuarioeliminar.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(idUsuarioeliminar),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        setSpinnerEditar(false)
        setAlertEditar(data)
    }
    const AlertEditarArray = () => {
        return (
            (alertEditar.message).map((element, index) => (
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>*</b>{element}</span>
            ))
        )
    }
    const styleButton = {
        "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
                borderColor: "#2A427B",
            }
        }
    }
    return (
        <>
            <Container>
                <Row style={{ backgroundColor: '#fff' }} className="my-2 p-2">
                    <Col xs={12} lg={12}>
                        <Button className="mb-2" variant="contained" color="primary" onClick={handleShowModalAgregarUsuario} ><MdOutlineAddCircle /></Button>
                        {JSON.stringify(accion)}
                    </Col>
                    <Col xs={12} lg={12}>
                        <TextField className="mb-2" id="outlined-basic" label="Busqueda" variant="outlined" size="small" fullWidth onChange={(e) => { setBusqueda(e.target.value) }} value={busqueda} sx={styleButton} />
                        <DataTable
                            columns={columns}
                            data={usuariosFiltrado}
                            dense
                            pagination
                            title="Modulo de Usuarios"
                            striped
                        />
                    </Col>
                </Row>
            </Container>
            <Modal show={modalAcciones} onHide={handleCloseModalAcciones}>
                <Modal.Header closeButton>
                    <Modal.Title> {{
                        "editar": "Editar Usuario",
                        "eliminar": "Eliminar Usuario",
                        "password": "Cambiar Contraseña"
                    }[accion]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {{
                        "editar":
                            <>
                                <Form.Control className="mb-2" size="sm" type="text" placeholder="Nro de Documento" name="nroDoc" onChange={handleChangeEditar} value={idUsuarioeliminar.nroDoc || ""} autoFocus></Form.Control>
                                <Form.Control className="mb-2" size="sm" type="text" placeholder="Nombres" name="nombres" onChange={handleChangeEditar} value={idUsuarioeliminar.nombres || ""} ></Form.Control>
                                <Form.Control className="mb-2" size="sm" type="text" placeholder="Apellidos" name="apellidos" onChange={handleChangeEditar} value={idUsuarioeliminar.apellidos || ""} ></Form.Control>
                                <Form.Control className="mb-2" size="sm" type="text" placeholder="Correo" name="correo" onChange={handleChangeEditar} value={idUsuarioeliminar.correo || ""} ></Form.Control>
                                {{
                                    true:
                                        <>
                                            <Alert variant="success">
                                                <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                                                <b>*</b>{alertEditar.message}
                                            </Alert>
                                        </>,
                                    false: <>
                                        <Alert variant="danger">
                                            <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                                            {{
                                                "string": <><b>*</b>{alertEditar.message}</>,
                                                "object": <AlertEditarArray />
                                            }[typeof alertEditar.message]}
                                        </Alert>
                                    </>
                                }[alertEditar.response]}
                            </>,
                        "eliminar":
                            <>
                                <p>¿Esta seguro que desea eliminar al usuario?</p>
                                <p>{idUsuarioeliminar.nombres} {idUsuarioeliminar.apellidos} </p>
                            </>,
                        "password":
                            <>
                                <Form.Control className="mb-2" size="sm" type="password" placeholder="Contraseña" name="password" onChange={handleChangeContrasena} value={inputContrasena.password || ""} autoFocus></Form.Control>
                                {{
                                    true:
                                        <>
                                            <Alert variant="success">
                                                <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                                                <b>*</b>{alertContrasena.message}
                                            </Alert>
                                        </>,
                                    false: <>
                                        <Alert variant="danger">
                                            <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                                            {{
                                                "string": <><b>*</b>{alertContrasena.message}</>,
                                                "object": <AlertContraseñaArray />
                                            }[typeof alertContrasena.message]}
                                        </Alert>
                                    </>,
                                }[alertContrasena.response]}
                            </>,
                            "agregar":<AgregarUsuario />
                    }[accion]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleCloseModalAcciones}>Cerrar</Button>
                    {{
                        "editar": <Button variant="primary" size="sm" onClick={editarUsuario} disabled={spinnerEditar ? true : false}>
                            {spinnerEditar ? (<>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </>) : (<></>)} {' '}Guardar</Button>,
                        "eliminar": <Button variant="danger" size="sm" onClick={eliminarUsuario}>Eliminar</Button>,
                        "password": <Button variant="primary" size="sm" onClick={cambiarContrasenaUsuario} disabled={spinnerContrasena ? true : false}>
                            {spinnerContrasena ? (<>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </>) : (<></>)} {' '}Guardar</Button>,

                    }[accion]}
                </Modal.Footer>
            </Modal>
        </>
    )
}
// export async function getServerSideProps({req}) {
//     const body = {
//         token: req.cookies.token,
//     }
//     const response = await fetch('http://localhost:3002/api/usuarios/ejemplo', {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const data = await response.json()
//     if (!data) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: {
//             resultado: data
//         },
//     }
// }
export default Usuarios