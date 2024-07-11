import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CInputGroup, CRow } from "@coreui/react";
import { useState } from "react";

const RegistrarGastos = () => {
    const [gasto, setGasto] = useState({
        descripcion: "",
        monto: "",
        fecha: "",
    });

    const handleChange = (e) => {
        setGasto({
            ...gasto,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(gasto);
    };

    return (
        <>
            <h3>Registrar Gastos</h3>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <CForm onSubmit={handleSubmit}>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="descripcion" className="col-form-label"> Descripción: </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="descripcion"
                                        name="descripcion"
                                        value={gasto.descripcion}
                                        onChange={handleChange}
                                        style={{  marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="monto" className="col-form-label"> Monto: </CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="monto"
                                        name="monto"
                                        value={gasto.monto}
                                        onChange={handleChange}
                                        style={{  marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="fecha" className="col-form-label"> Fecha: </CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        value={gasto.fecha}
                                        onChange={handleChange}
                                        style={{  marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CButton
                                    type="submit"
                                    color="primary"
                                >
                                    Registrar Gasto
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default RegistrarGastos;