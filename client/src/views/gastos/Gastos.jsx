// import { cilBell } from "@coreui/icons"
// import CIcon from "@coreui/icons-react"
import { CButton, CCard, CCardBody, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react"
import { CChartLine, CChartPie } from "@coreui/react-chartjs"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Toastify from 'toastify-js'

const Gastos = () => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [contadorCategory, setContadorCategory] = useState(0)
    const [data, setData] = useState([])
    const [gastosPorMes, setGastosPorMes] = useState([])
    const [error, setError] = useState({
        categoria: '',
    })
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const axiosData = () => {
            const URL = 'http://localhost:8000/usuarios/gastos'
            axios.get(URL, {
                headers: {
                    token_user: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log(res.data.gastos)
                    const agrupadoPorCategoria = res.data.gastos.reduce((acc, gasto) => {
                        if (!acc[gasto.categoria]) {
                            acc[gasto.categoria] = 0
                        }
                        acc[gasto.categoria] += gasto.cantidad
                        return acc
                    }, {})

                    const agrupadoPorMes = res.data.gastos.reduce((acc, gasto) => {
                        const fecha = new Date(gasto.fecha)
                        const mes = fecha.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleString('default', { month: 'long' }).slice(1)
                        if (!acc[mes]) {
                            acc[mes] = 0
                        }
                        acc[mes] += gasto.cantidad
                        return acc
                    }, {})

                    const gastos = Object.keys(agrupadoPorCategoria).map((categoria) => {
                        return {
                            categoria,
                            cantidad: agrupadoPorCategoria[categoria]
                        }
                    })

                    const gastosPorMes = Object.keys(agrupadoPorMes)
                        .map((mes) => {
                            return {
                                mes,
                                cantidad: agrupadoPorMes[mes]
                            }
                        })
                        .sort((a, b) => {
                            const monthA = new Date(a.mes + ' 1, 2000');
                            const monthB = new Date(b.mes + ' 1, 2000');
                            return monthA - monthB;
                        });

                    setData(gastos)
                    setGastosPorMes(gastosPorMes)
                    console.log(gastosPorMes)
                })
                .catch((err) => {
                    console.log(err.response.data)
                    Toastify({
                        text: 'Error al cargar los datos de gastos',
                        style: {
                            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                        },
                        duration: 5000
                    }).showToast()
                })
        }

        const axiosCategories = () => {
            const URL = 'http://localhost:8000/usuarios/categorias'
            axios.get(URL, {
                headers: {
                    token_user: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log(res.data.categorias)
                    const filteredCategories = res.data.categorias.filter((category) => category.tipo === 'gasto')
                    const sortedCategories = [...filteredCategories].sort((a, b) => {
                        if (a.nombre === 'Otros') return 1;
                        if (b.nombre === 'Otros') return -1;
                        return 0;
                    });
                    setCategories(sortedCategories);
                })
                .catch((err) => {
                    console.log(err.response.data)
                    Toastify({
                        text: 'Error al cargar las categorías',
                        style: {
                            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                        },
                        duration: 5000
                    }).showToast()
                })
        }

        if (selectedStartDate && selectedEndDate) {
            const filterData = axiosData().filter((data) => {
                return data.fecha >= selectedStartDate && data.fecha <= selectedEndDate
            })
            setData(filterData)
        }

        axiosData()
        axiosCategories()
    }, [selectedStartDate, selectedEndDate, contadorCategory, navigate])

    const agregarCategoria = (e) => {
        e.preventDefault()

        if (newCategory === '') {
            setError({...error, categoria: 'La categoría no puede estar vacía'})
            return
        } else if (categories.some((category) => category.nombre === newCategory)) {
            setError({...error, categoria: 'La categoría ya existe'})
            return
        } else if (newCategory === 'Otros') {
            setError({...error, categoria: 'La categoría no puede llamarse "Otros"'})
            return
        }

        axios.post(`http://localhost:8000/usuarios/categorias`, { nombre: newCategory, tipo: 'gasto' }, {
            headers: {
                token_user: localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
                setSelectedCategory(newCategory)
                setNewCategory('')
                setContadorCategory(contadorCategory + 1)
                Toastify({
                    text: 'Categoría agregada correctamente',
                    style: {
                        background: 'linear-gradient(to right, #00b09b, #96c93d)',
                    },
                    duration: 5000
                }).showToast()
            })
            .catch((err) => {
                console.log(err.response.data)
                Toastify({
                    text: 'Ocurrió un error al agregar la categoría',
                    style: {
                        background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                    },
                    duration: 5000
                }).showToast()
            })
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
        if (e.target.value === 'Otros') {
            setVisible(true)
        } else {
            setVisible(false)
        }
        setError({...error, categoria: ''})
    }

    return (
        <>
            <h3>Gastos</h3>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <CFormLabel htmlFor="categoria" className="col-form-label">Seleccionar categoría: </CFormLabel>
                            <CFormSelect
                                onChange={handleCategoryChange}
                                options={[
                                    'Ubicación de gastos',
                                    ...categories.map((category) => category.nombre),
                                ]}
                                className="form-control"
                                style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                                value={selectedCategory}
                            />
                            {visible && selectedCategory === 'Otros' && (
                                <>
                                    <CModal
                                        backdrop="static"
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                        aria-labelledby="categoryModal"
                                    >
                                        <CModalHeader>
                                            <CModalTitle id="categoryModal">Agregar una nueva categoría</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CFormInput
                                                type="text"
                                                placeholder="Nueva categoría"
                                                className="form-control"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                                onFocus={() => setError('')}
                                                {...(error && { invalid: true, feedbackInvalid: error })}
                                            />
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => {
                                                setVisible(false)
                                                setSelectedCategory('')
                                            }}>
                                                Cancelar
                                            </CButton>
                                            <CButton type="button" onClick={agregarCategoria} color="primary">Agregar</CButton>
                                        </CModalFooter>
                                    </CModal>
                                </>
                            )}
                            <br />
                            <CFormLabel htmlFor="desde">Mostrar desde: </CFormLabel>
                            <CFormInput
                                type="date"
                                id="desde"
                                name="desde"
                                className="form-control"
                                style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                                onChange={(e) => setSelectedStartDate(e.target.value)}
                            />
                            <CFormLabel htmlFor="hasta">hasta: </CFormLabel>
                            <CFormInput
                                type="date"
                                id="hasta"
                                name="hasta"
                                className="form-control"
                                style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                                onChange={(e) => setSelectedEndDate(e.target.value)}
                            />
                            <br />
                            {data.length > 0 ? (
                                <>
                                    <CCol xs={8}>
                                        <CCardBody>
                                            <CChartLine
                                                data={{
                                                    labels: gastosPorMes.map((data) => data.mes),
                                                    datasets: [
                                                        {
                                                            label: 'Gastos',
                                                            data: gastosPorMes.map((data) => data.cantidad),
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
                                                    labels: data.map((data) => data.categoria),
                                                    datasets: [
                                                        {
                                                            data: data.map((data) => data.cantidad),
                                                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A8B3C5', '#FAA586'],
                                                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A8B3C5', '#FAA586'],
                                                        },
                                                    ],
                                                }}
                                            />
                                        </CCardBody>
                                    </CCol>
                                </>
                            ) : (
                                <p>No hay registros para mostrar</p>
                            )}
                            {/* <CButton
                                color="primary"
                            >
                                <CIcon icon={cilBell} className="me-2" />
                                Definir Alerta
                            </CButton> */}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Gastos