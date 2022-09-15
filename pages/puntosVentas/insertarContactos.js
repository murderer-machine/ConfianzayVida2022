import React, { useState } from "react"
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { TextField, Button, Alert } from '@mui/material'
import { useEffect } from "react"
import { styleButton } from '../../styles/globals'
import { MdContactPhone } from 'react-icons/md'
import { MdOutlineMail } from 'react-icons/md'
import { MdOutlinePhoneIphone } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
const Insertar = ({ id }) => {
    const [dataInputs, setDataInputs] = useState({})
    const [spinner, setSpinner] = useState(false)
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (value) {
            setDataInputs(values => ({ ...values, [name]: value.toLowerCase() }))
        } else {
            setDataInputs(values => {
                const copy = { ...values }
                delete copy[name]
                return copy
            })
        }
    }
    const [response, setResponse] = useState({})
    const insertar = async () => {
        setSpinner(true)
        const response = await fetch(`${process.env.URL}/api/puntosVentasContactos`,
            {
                method: 'POST',
                body: JSON.stringify(dataInputs),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        setResponse(data)
        if (data.response) {
            setSpinner(false)
            llamarContactos()
            setDataInputs({ puntosVentaId: id })
            return
        } else {
            setSpinner(false)
            return
        }
    }
    useEffect(() => {
        setDataInputs(values => ({ ...values, puntosVentaId: id }))
    }, [])
    const ResponseArray = () => {
        return (
            (response.message).map((element, index) => (
                <span key={index} className="p-0 m-0" style={{ display: "block" }}><b>* </b>{element}</span>
            ))
        )
    }
    const [dataContactos, setDataContactos] = useState([])
    const llamarContactos = async (value) => {
        var response = await fetch(`${process.env.URL}/api/puntosVentasContactos/${dataInputs.puntosVentaId}`)
        var data = await response.json()
        setDataContactos(data.message)
    }
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <TextField className="mb-2" id="outlined-basic" name="nombres_apellidos" label="nombres_apellidos" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.nombres_apellidos ? dataInputs.nombres_apellidos : ''} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="celular" label="celular" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.celular ? dataInputs.celular : ''} sx={styleButton} />
                    <TextField className="mb-2" id="outlined-basic" name="correo" label="correo" variant="outlined" size="small" fullWidth onChange={handleChange} value={dataInputs.correo ? dataInputs.correo : ''} sx={styleButton} />
                </Col>
                <Col xs={12} className="mb-2">
                    <Button variant="contained" color="primary" size="small" disabled={spinner ? true : false} onClick={insertar}>
                        {spinner ? (<>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </>) : (<></>)} Agregar Contacto</Button>
                </Col>
                <Col xs={12} lg={12}>
                    {Object.keys(response).length > 0 ? (<>
                        <Alert severity={response.response ? 'success' : 'error'} className="mb-2">
                            {{
                                "string": <><b>*</b>{response.message}</>,
                                "object": <ResponseArray></ResponseArray>
                            }[typeof response.message]}
                        </Alert>
                    </>) : (<></>)}
                </Col>
                {dataContactos.length > 0 ? (<>
                    {dataContactos.map((e, i) => (
                        <Col xs={4} >
                            <Alert severity="info" key={i} icon={<MdContactPhone />} className="mb-2" variant="outlined">
                                <b><RiContactsLine /> {e.nombres_apellidos.toUpperCase()}</b><br />
                                <b><MdOutlinePhoneIphone /> {e.celular}</b><br />
                                <b><MdOutlineMail /> {e.correo}</b><br />
                            </Alert>
                        </Col>
                    ))}
                </>) :
                    (<></>)}
                {JSON.stringify(dataInputs)}
            </Row>
        </Container>
    )
}
Insertar.defaultProps = {
    id: 0
}
export default Insertar