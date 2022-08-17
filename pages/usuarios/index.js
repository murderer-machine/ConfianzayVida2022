import React, { useEffect, useState } from "react"
import { Container, Row, Col, Form, Alert, Spinner, Button, Modal } from 'react-bootstrap'
import { ImPencil } from 'react-icons/im'
import { BsFillTrashFill, BsKeyFill } from 'react-icons/bs'
import { Pagination } from '@mui/material'
const Usuarios = () => {

    /**
     * Modulo de usuarios
     */
    const [paginas, setPaginas] = useState(0)
    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)
    const [usuarios, setUsuarios] = useState([])
    const [condicionUsuario, setCondicionUsuario] = useState(true)
    const cargarUsuarios = async () => {
        const response = await fetch(`${process.env.URL}/api/usuarios/pruebas/${paginaSeleccionada}`)
        const data = await response.json()
        setUsuarios(data.rows)
        setPaginas(data.totalPaginas)
    }
    useEffect(() => {
        cargarUsuarios()
    }, [condicionUsuario, paginaSeleccionada])
    /** */
    /**
     * Modulo de busqueda
     */
    const [busqueda, setBusqueda] = useState('')
    const usuariosFiltrado = usuarios.filter(element => {
        return element.nombres.includes(busqueda) ||
            element.apellidos.includes(busqueda) ||
            element.correo.includes(busqueda) ||
            element.rol.includes(busqueda)
    })
    const usuariosGeneral = busqueda.length > 0 ? usuariosFiltrado : usuarios
    /** */
    /**
     * Modulo de agregar
     */
    const [inputs, setInputs] = useState({})
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }
    const [responseAgregarUsuario, setResponseAgregarUsuario] = useState('')
    const [spinnerAgregarUsuario, setSpinnerAgregarUsuario] = useState(false)
    const AlertUsuarioString = () => {
        return (
            responseAgregarUsuario == '' ? (<></>) : (
                <Alert variant={responseAgregarUsuario === 'Usuario agregado correctamente' ? `success` : 'warning'}>
                    <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                    <b>*</b>{responseAgregarUsuario}
                </Alert>
            )
        )
    }
    const AlertUsuarioArray = () => {
        return (
            <>
                <Alert variant="danger">
                    <Alert.Heading>Respuesta Servidor :</Alert.Heading>
                    {responseAgregarUsuario.map((element, index) => (
                        <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>*</b>{element}</span>
                    ))}
                </Alert>
            </>
        )
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setSpinnerAgregarUsuario(true)
        fetch('http://localhost:3002/api/usuarios/', {
            method: 'POST',
            body: JSON.stringify(inputs), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log(JSON.stringify(response))
                setSpinnerAgregarUsuario(false)
                if (response.response) {
                    setCondicionUsuario(!condicionUsuario)
                    setInputs({})
                    setResponseAgregarUsuario('Usuario agregado correctamente')

                }
                if (!response.response) {
                    setResponseAgregarUsuario(response['message'])

                }
            })
    }
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
            setCondicionUsuario(!condicionUsuario)
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
        setCondicionUsuario(!condicionUsuario)
    }
    const AlertEditarArray = () => {
        return (
            (alertEditar.message).map((element, index) => (
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>*</b>{element}</span>
            ))
        )
    }
    const handleChangemarco = (event, value) => {
        setBusqueda('')
        setPaginaSeleccionada(value)
    }
    return (
        <>
            <Container>
                <Row style={{ backgroundColor: '#fff' }} className="my-2 p-2">
                    <Col xs={12} lg={3}>
                        <Form onSubmit={handleSubmit} className="mb-2">
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="Nro de Documento" name="nroDoc" onChange={handleChange} value={inputs.nroDoc || ""} ></Form.Control>
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="Nombres" name="nombres" onChange={handleChange} value={inputs.nombres || ""}></Form.Control>
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="Apellidos" name="apellidos" onChange={handleChange} value={inputs.apellidos || ""}></Form.Control>
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="Correo" name="correo" onChange={handleChange} value={inputs.correo || ""}></Form.Control>
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="Contraseña" name="password" onChange={handleChange} value={inputs.password || ""}></Form.Control>
                            <Button variant="primary" type="submit" size="sm" disabled={spinnerAgregarUsuario ? true : false}>
                                {spinnerAgregarUsuario ? (<>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </>) : (<></>)} {' '}Crear Usuario
                            </Button>
                        </Form>
                        {
                            {
                                'string': <AlertUsuarioString />,
                                'object': <AlertUsuarioArray />
                            }[typeof responseAgregarUsuario]
                        }
                    </Col>
                    <Col xs={12} lg={9}>
                        <Form.Control className="mb-2" size="sm" type="text" placeholder="Busqueda" onChange={(e) => { setBusqueda(e.target.value) }} value={busqueda}></Form.Control>
                        <table>
                            <thead>
                                <tr>
                                    <th>nro doc</th>
                                    <th>nombre</th>
                                    <th>apellidos</th>
                                    <th>correo</th>
                                    <th>rol</th>
                                    <th>acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosGeneral.map((usuario, index) => (
                                    <tr key={index}>
                                        <td data-label="nro Doc">{usuario.nroDoc}</td>
                                        <td data-label="nombres">{usuario.nombres}</td>
                                        <td data-label="apellidos">{usuario.apellidos}</td>
                                        <td data-label="correo">{usuario.correo}</td>
                                        <td data-label="rol">{usuario.rol}</td>
                                        <td data-label="acciones">
                                            <Button variant="secondary" size="sm" onClick={() => { handleShowModalEditar(usuario.id) }}><ImPencil /></Button>
                                            <Button variant="danger" size="sm" onClick={() => { handleShowModalEliminar(usuario.id) }}><BsFillTrashFill /></Button>
                                            <Button variant="success" size="sm" onClick={() => { handleShowModalPassword(usuario.id) }}><BsKeyFill /></Button>
                                        </td>
                                    </tr>
                                ))}
                                {usuariosGeneral.length === 0 ? (<tr><td colSpan="6" className="text-center">No hay resultados</td></tr>) : (<></>)}
                            </tbody>
                        </table>
                        <Pagination count={paginas} color="primary" page={paginaSeleccionada} onChange={handleChangemarco} />
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
                                    </>
                                }[alertContrasena.response]}
                            </>
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
                            </>) : (<></>)} {' '}Guardar</Button>
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