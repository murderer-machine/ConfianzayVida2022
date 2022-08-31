import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Accordion, Modal, Alert, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Image from 'next/image'
import moment from 'moment'
const Polizas = () => {
    const fecha = moment().format('YYYY-MM-DD')
    const [dataPolizas, setDataPolizas] = useState([])
    const [busqueda, setBusqueda] = useState({})
    const [modal, setModal] = useState(false)
    const [situacion, setSituacion] = useState('1')
    const handleCerrarModal = () => setModal(false)
    const handleMostrarModal = () => setModal(true)
    const [datosCliente, setDatosCliente] = useState({})
    const datosFiltrados = dataPolizas.filter(e => {
        var nombre = e.nombre.includes(busqueda.nombre ? busqueda.nombre.toLowerCase() : '')
        var nroDoc = e.nroDoc.includes(busqueda.nroDoc ? busqueda.nroDoc.toLowerCase() : '')
        if (e.clientes_contactos.length > 0) {
            var clientes_contactos = e.clientes_contactos.some(cc => {
                return cc.nombre.includes(busqueda.nombreCliente ? busqueda.nombreCliente.toLowerCase() : '') && cc.celular.includes(busqueda.celularCliente ? busqueda.celularCliente.toLowerCase() : '')
            })
        }
        var placa = e.polizas.some(p => {
            if (p.polizas_vehiculo) {
                return p.polizas_vehiculo.placa.includes(busqueda.placa ? busqueda.placa.toLowerCase() : '')
            }
        })
        return placa && nombre && nroDoc && clientes_contactos
        // return placa || nombre || nroDoc || clientes_contactos
    })
    const mostrarTodo = async () => {
        const response = await fetch(`${process.env.URL}/api/polizas/?situacion=${situacion}`,
            {
                method: 'GET',
            })
        const data = await response.json()
        if (data.response) {
            setDataPolizas(data.message)
        }
    }
    const generarExcel = () => {
        fetch(`${process.env.URL}/api/polizas/generar`, {
            method: 'POST',
            body: JSON.stringify(datosFiltrados),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => { return res.blob() })
            .then((data) => {
                var a = document.createElement("a")
                a.href = window.URL.createObjectURL(data)
                a.download = "FILENAME"
                a.click()
            })
    }
    useEffect(() => {
        mostrarTodo()
    }, [situacion])
    return (
        <>
            <Container>
                <Row className='mt-3 p-3' style={{ backgroundColor: '#fff' }}>
                    <Col xs={12} lg={3}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre Empresa :</Form.Label>
                            <Form.Control
                                className="mb-2"
                                size="sm"
                                type="text"
                                placeholder="Nombre Empresa"
                                onChange={e => setBusqueda(valores => ({ ...valores, nombre: e.target.value }))} value={busqueda.nombre ? busqueda.nombre : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nrodoc">
                            <Form.Label>Nro. Documento :</Form.Label>
                            <Form.Control
                                className="mb-2"
                                size="sm"
                                type="text"
                                placeholder="Nro. Documento"
                                onChange={e => setBusqueda(valores => ({ ...valores, nroDoc: e.target.value }))} value={busqueda.nroDoc ? busqueda.nroDoc : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nombreCliente">
                            <Form.Label>Nombre Cliente :</Form.Label>
                            <Form.Control
                                className="mb-2"
                                size="sm"
                                type="text"
                                placeholder="Nombre Cliente"
                                onChange={e => setBusqueda(valores => ({ ...valores, nombreCliente: e.target.value }))} value={busqueda.nombreCliente ? busqueda.nombreCliente : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="celularCliente">
                            <Form.Label>Celular Cliente :</Form.Label>
                            <Form.Control
                                className="mb-2"
                                size="sm"
                                type="text"
                                placeholder="Celular Cliente"
                                onChange={e => setBusqueda(valores => ({ ...valores, celularCliente: e.target.value }))} value={busqueda.celularCliente ? busqueda.celularCliente : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="situacion">
                            <Form.Label>Situación :</Form.Label>
                            <Form.Select onChange={e => setSituacion(e.target.value)} size="sm" defaultValue={situacion}>
                                <option value="1">total</option>
                                <option value="2">no pagadas</option>
                                <option value="3">vencidas</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="placa">
                            <Form.Label>Placa :</Form.Label>
                            <Form.Control
                                className="mb-2"
                                size="sm"
                                type="text"
                                placeholder="Placa"
                                onChange={e => setBusqueda(valores => ({ ...valores, placa: e.target.value }))} value={busqueda.placa ? busqueda.placa : ''} />
                        </Form.Group>
                        <Button onClick={generarExcel}>Generar XLS</Button>
                    </Col>
                    <Col xs={12} lg={9}>
                        { }
                        <Accordion defaultActiveKey="0">
                            {datosFiltrados.map((data, i) => (
                                data.polizas.length > 0 ? (<>
                                    <Accordion.Item eventKey={i} key={i}>
                                        <Accordion.Header>
                                            <Container>
                                                <Row>
                                                    <Col xs={1} className="d-flex align-items-center">
                                                        <Badge bg="secondary">{data.polizas.length}</Badge>
                                                    </Col>
                                                    <Col xs={11}>
                                                        <h6 className='p-0 m-0'>
                                                            <b> Nombre ó Razon Social : </b>{data.nombre.toUpperCase()}<br />
                                                            <b>Nº de Documento : </b>{data.nroDoc}
                                                        </h6>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {data.polizas.map((poliza, i) => (
                                                <div key={i}>
                                                    <Alert variant="secondary">
                                                        <Container fluid className='p-0 m-0'>
                                                            <Row>
                                                                <Col xs={12} lg={9}>
                                                                    <Image
                                                                        src={`/${poliza.empresas_seguro.logo}`}
                                                                        alt="Picture of the author"
                                                                        width={160}
                                                                        height={40}
                                                                    /><br />
                                                                    <Form.Text className="text-muted">
                                                                        {/* {poliza.empresas_seguro.nombre.toUpperCase()}<br /> */}
                                                                        <b>{poliza.ramo.descripcion.toUpperCase()}</b> - {' '}
                                                                        <OverlayTrigger
                                                                            placement="right"
                                                                            overlay={
                                                                                <Tooltip id="right">
                                                                                    {poliza.nroPolizaCorregido}
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <b>{poliza.nroPoliza}</b>
                                                                        </OverlayTrigger>
                                                                        <br />
                                                                        {poliza.empresas_seguros_producto.nombre.toUpperCase()}<br />
                                                                    </Form.Text>
                                                                </Col>
                                                                <Col xs={12} lg={3}>
                                                                    <Badge bg="success" onClick={() => {
                                                                        setDatosCliente(data)
                                                                        handleMostrarModal()
                                                                    }} style={{ cursor: 'pointer' }}>
                                                                        Datos del Cliente
                                                                    </Badge>
                                                                </Col>
                                                                <Container fluid>
                                                                    <Row>
                                                                        <Col xs={12} lg={4} className='d-flex align-items-center'>
                                                                            <div>
                                                                                <b>Fecha de Emisión : </b>{moment(poliza.polizas_descripcione.fecha_emision, "YYYY-MM-DD").format('DD/MM/YYYY')}<br />
                                                                                <b>Vigencia desde : </b>{moment(poliza.polizas_descripcione.fecha_vigencia_inicio, "YYYY-MM-DD").format('DD/MM/YYYY')}<br />
                                                                                <b>Vigencia hasta : </b>{moment(poliza.polizas_descripcione.fecha_vigencia_fin, "YYYY-MM-DD").format('DD/MM/YYYY')}
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={12} lg={4} className='d-flex align-items-center'>
                                                                            <div>
                                                                                <b>Prima Total : </b>{poliza.polizas_descripcione.prima_total}<br />
                                                                                <b>Prima Comercial : </b>{poliza.polizas_descripcione.prima_comercial}<br />
                                                                                <b>Prima Neta : </b>{poliza.polizas_descripcione.prima_neta}
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={12} lg={4} className='d-flex align-items-center'>
                                                                            <div>
                                                                                <b>Comisión Broker : </b>{poliza.polizas_descripcione.comision}<br />
                                                                                <b>Porcentaje : </b>% {poliza.polizas_descripcione.porcentaje}<br />
                                                                                <b>Comisión Sub Agente : </b>{poliza.polizas_descripcione.comision_subagente}
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={12} lg={4} className='d-flex align-items-center'>
                                                                            <div>
                                                                                {poliza.polizas_vehiculo ? (<>
                                                                                    <b>Placa : </b>{poliza.polizas_vehiculo.placa.toUpperCase()}<br />
                                                                                </>) : (<></>)}
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Container>
                                                            </Row>
                                                        </Container>
                                                        <br />
                                                        {/* <b>Moneda : </b> {poliza.moneda}<br />
                                                        <b>endosoAfavor</b> {poliza.endosoAfavor}<br />
                                                        <b>anulada</b> {poliza.anulada}<br /> */}
                                                        <Container fluid className='p-0 m-0'>
                                                            <Row>
                                                                {poliza.polizas_cupones.map((cupon, i) => (
                                                                    <Col xs={12} key={i} lg={3} className="text-center">
                                                                        <Alert
                                                                            variant={cupon.situacion == 1 ? "success" : moment(cupon.fechaObligacion, 'YYYY-MM-DD').format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && cupon.situacion == 0 ? "danger" : "warning"}
                                                                        >
                                                                            <Badge
                                                                                bg={cupon.situacion == 1 ? "success" : moment(cupon.fechaObligacion, 'YYYY-MM-DD').format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && cupon.situacion == 0 ? "danger" : "warning"}
                                                                            >
                                                                                {cupon.nroOrden}
                                                                            </Badge><br />
                                                                            <b>Nº {cupon.nroCuota}</b><br />
                                                                            <b>Obligacion : </b><br />
                                                                            {cupon.fechaObligacion}<br />
                                                                            <b>Limite : </b><br />
                                                                            {cupon.fechaLimite}<br />
                                                                            {cupon.importe}<br />
                                                                            <h5>
                                                                                <Badge
                                                                                    bg={cupon.situacion == 1 ? "success" : moment(cupon.fechaObligacion, 'YYYY-MM-DD').format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && cupon.situacion == 0 ? "danger" : "warning"}
                                                                                    text={cupon.situacion == 1 ? "" : moment(cupon.fechaObligacion, 'YYYY-MM-DD').format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && cupon.situacion == 0 ? "" : "dark"}
                                                                                >
                                                                                    {cupon.situacion == 1 ? "Cancelado" : moment(cupon.fechaObligacion, 'YYYY-MM-DD').format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && cupon.situacion == 0 ? "Vencido" : "Pendiente"}
                                                                                </Badge>
                                                                            </h5>
                                                                        </Alert>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Container>
                                                    </Alert>
                                                </div>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </>) : (<></>)
                            ))}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
            <Modal show={modal} onHide={handleCerrarModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Datos Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Empresa : </b>{datosCliente.nombre ? datosCliente.nombre.toUpperCase() : ''}<br />
                    <b>Nº Documento : </b>{datosCliente.nroDoc ? datosCliente.nroDoc : ''}<br />
                    <b>Dirección : </b>{datosCliente.direccion ? datosCliente.direccion.toUpperCase() : ''}<br />
                    <b>Ubigeo : </b>{datosCliente.ubigeo ? datosCliente.ubigeo.departamento.toUpperCase() : ''} -
                    {datosCliente.ubigeo ? datosCliente.ubigeo.provincia.toUpperCase() : ''} -
                    {datosCliente.ubigeo ? datosCliente.ubigeo.distrito.toUpperCase() : ''}
                    <br />
                    <hr />
                    <h5>Contactos</h5>
                    {datosCliente.clientes_contactos ? (<>
                        {datosCliente.clientes_contactos.map((clienteContacto, i) => (
                            <div key={i}>
                                <b>Nombre : </b>{clienteContacto.nombre.toUpperCase()}<br />
                                <b>Celular :</b> {clienteContacto.celular}<br />
                                <b>Correo : </b>{clienteContacto.correo}<br />
                                <hr />
                            </div>
                        ))}
                    </>) : (<></>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCerrarModal} size="sm">
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Polizas