import React, { useEffect, useState } from "react"
import { Container, Row, Col, Form, Alert, Spinner, Modal } from 'react-bootstrap'

import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill, BsKeyFill } from 'react-icons/bs'
import { MdOutlineAddCircle } from 'react-icons/md'

import { TextField, Button } from '@mui/material'
import DataTable from 'react-data-table-component'

import AgregarUsuario from './agregarUsuario'

import { styleButton } from '../../styles/globals'

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
            sortable: true,
        },
        {
            name: 'Nro Documento',
            selector: row => row.nroDoc,
            sortable: true,
        },
        {
            name: 'Nombres',
            selector: row => row.nombres,
            sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.rol,
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
    const [actualizar, setActualizar] = useState(false)
    useEffect(() => {
        cargarUsuarios()
    }, [actualizar])
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
        setActualizar(!actualizar)
        setModalAcciones(false)
        setIdUsuarioEliminar({})
        setAlertContrasena({})
        setAlertEditar({})
        setAlertEliminar({ ...alertEliminar, condicion: false, mensaje: '' })
    }
    const handleShowModalEliminar = (id) => {
        setAccion('eliminar')
        setIdUsuarioEliminar(usuariosGeneral.find(element => { return element.id === id }))
        setModalAcciones(true)
    }
    const [alertEliminar, setAlertEliminar] = useState({
        condicion: false,
        mensaje: ''
    })
    const eliminarUsuario = async () => {
        const response = await fetch(`${process.env.URL}/api/usuarios/${idUsuarioeliminar.id}`, { method: 'delete' })
        const data = await response.json()
        if (!data.ressponse) {
            setAlertEliminar({ ...alertEliminar, condicion: true, mensaje: data.message })
        }
        if (data.response) {
            setAlertEliminar({ ...alertEliminar, condicion: false, mensaje: '' })
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
        const response = await fetch(`${process.env.URL}/api/usuarios/cambiarcontrasena/${idUsuarioeliminar.id}`,
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
        const response = await fetch(`${process.env.URL}/api/usuarios/${idUsuarioeliminar.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(idUsuarioeliminar),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        if (data.response) {
            handleActualizarDatos()
        }
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
    const [actualizarDatos, setActualizarDatos] = useState(false)
    const handleActualizarDatos = () => {
        setActualizar(!actualizar)
    }
    return (
        <>
            <Container>

                <Row style={{ backgroundColor: '#fff' }} className="my-2 p-2">
                    <Col xs={12} lg={12}>
                        <Button className="mb-2" variant="contained" color="primary" onClick={handleShowModalAgregarUsuario} ><MdOutlineAddCircle /></Button>
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
                            noDataComponent={<div>No se encontraron registros</div>}
                        />
                    </Col>
                </Row>
            </Container>
            <Modal show={modalAcciones} onHide={handleCloseModalAcciones}>
                <Modal.Header closeButton>
                    <Modal.Title> {{
                        "editar": "Editar Usuario",
                        "eliminar": "Eliminar Usuario",
                        "password": "Cambiar Contraseña",
                        "agregar": "Agregar Usuario"
                    }[accion]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {{
                        "editar":
                            <>
                                <TextField className="mb-2" id="outlined-basic" name="nroDoc" label="Nro de Documento" variant="outlined" size="small" fullWidth onChange={handleChangeEditar} value={idUsuarioeliminar.nroDoc || ""} sx={styleButton} />
                                <TextField className="mb-2" id="outlined-basic" name="nombres" label="Nombres" variant="outlined" size="small" fullWidth onChange={handleChangeEditar} value={idUsuarioeliminar.nombres || ""} sx={styleButton} />
                                <TextField className="mb-2" id="outlined-basic" name="apellidos" label="Apellidos" variant="outlined" size="small" fullWidth onChange={handleChangeEditar} value={idUsuarioeliminar.apellidos || ""} sx={styleButton} />
                                <TextField className="mb-2" id="outlined-basic" name="correo" label="Correo" variant="outlined" size="small" fullWidth onChange={handleChangeEditar} value={idUsuarioeliminar.correo || ""} sx={styleButton} />
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
                                <p><b>{idUsuarioeliminar.nombres} {idUsuarioeliminar.apellidos}</b> </p>
                                {alertEliminar.condicion ? (<>
                                    <Alert variant="danger">
                                        <Alert.Heading>Respuesta Servidor : </Alert.Heading>
                                        {alertEliminar.mensaje}
                                    </Alert>
                                </>) : (<></>)}
                            </>,
                        "password":
                            <>
                                <TextField className="mb-2" id="outlined-basic" name="password" label="Contraseña" variant="outlined" size="small" fullWidth onChange={handleChangeContrasena}value={inputContrasena.password || ""} sx={styleButton} type="password"/>

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
                        "agregar": <AgregarUsuario handleActualizarDatos={handleActualizarDatos} />
                    }[accion]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="secondary" size="small" onClick={handleCloseModalAcciones}>Cerrar</Button>
                    {{
                        "editar": <Button variant="contained" color="primary" size="small" onClick={editarUsuario} disabled={spinnerEditar ? true : false}>
                            {spinnerEditar ? (<>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </>) : (<></>)} {' '}Guardar</Button>,
                        "eliminar": <Button variant="contained" color="error" size="small" onClick={eliminarUsuario}>Eliminar</Button>,
                        "password": <Button variant="contained" color="primary" size="small" onClick={cambiarContrasenaUsuario} disabled={spinnerContrasena ? true : false}>
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