import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CInputGroup, CRow } from "@coreui/react";
import { useState } from "react";

const RegistrarIngresos = () => {
    const [ingresos, setIngresos] = useState([
        {
            descripcion: "",
            monto: "",
            fecha: "",
        },
    ]);

    const handleChange = (e) => {
        setIngresos({
            ...ingresos,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ingresos);
    }

    return (
        <>
            <h3>Registrar Ingresos</h3>
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
                                        value={ingresos.descripcion}
                                        onChange={handleChange}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="monto" className="col-form-label"> Monto: </CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="monto"
                                        name="monto"
                                        value={ingresos.monto}
                                        onChange={handleChange}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="fecha" className="col-form-label"> Fecha: </CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        value={ingresos.fecha}
                                        onChange={handleChange}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CButton
                                    color="primary"
                                    type="submit"
                                >
                                    Registrar Ingreso
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default RegistrarIngresos;