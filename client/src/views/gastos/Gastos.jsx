import { cilBell } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCard, CCardBody, CCol, CFormSelect, CRow } from "@coreui/react"
import { CChartLine, CChartPie } from "@coreui/react-chartjs"

const Gastos = () => {
    return (
        <>
            <h3>Gastos</h3>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <CFormSelect
                                label="Seleccionar Categoría: "
                                options={[
                                    'Ubicación de gastos',
                                    { value: 'alimentacion', label: 'Alimentación' },
                                    { value: 'transporte', label: 'Transporte' },
                                    { value: 'salud', label: 'Salud' },
                                    { value: 'educacion', label: 'Educación' },
                                    { value: 'servicios', label: 'Servicios' },
                                ]}
                                className="form-control"
                                style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                            />
                            <br />
                            <label htmlFor="desde">Mostrar desde: </label>
                            <input type="date" id="desde" name="desde" className="form-control" style={{ display: 'inline-block', width: 'auto', margin: '10px' }} />
                            <label htmlFor="hasta">hasta: </label>
                            <input type="date" id="hasta" name="hasta" className="form-control" style={{ display: 'inline-block', width: 'auto', margin: '10px' }} />
                            <br />
                            <CCol xs={8}>
                                <CCardBody>
                                    <CChartLine
                                        data={{
                                            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
                                            datasets: [
                                                {
                                                    label: 'Gastos',
                                                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                                    backgroundColor: 'rgba(220, 20, 20, 0.2)',
                                                    borderColor: 'rgba(220, 20, 20, 1)',
                                                    pointBackgroundColor: 'rgba(220, 20, 20, 1)',
                                                    pointBorderColor: '#fff',
                                                }
                                            ]
                                        }}
                                    />
                                </CCardBody>
                            </CCol>
                            <CCol xs={5}>
                                <CCardBody>
                                    <CChartPie
                                        data={{
                                            labels: ['Alimentación', 'Transporte', 'Salud'],
                                            datasets: [
                                                {
                                                    data: [300, 50, 100],
                                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                                },
                                            ],
                                        }}
                                    />
                                </CCardBody>
                            </CCol>
                            <CButton
                                color="primary"
                            >
                                <CIcon icon={cilBell} className="me-2" />
                                Definir Alerta
                            </CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Gastos