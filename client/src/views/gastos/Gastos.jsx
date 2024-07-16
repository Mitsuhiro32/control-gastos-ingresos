import { cilBell } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCard, CCardBody, CCol, CForm, CFormSelect, CRow } from "@coreui/react"
import { CChartLine, CChartPie } from "@coreui/react-chartjs"
import { useEffect, useState } from "react"
import axios from "axios"

const Gastos = () => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [data, setData] = useState([])
    const id = localStorage.getItem('id')

    useEffect(() => {
        const axiosData = () => {
            const URL = `http://localhost:8000/usuarios/${id}/gastos`
            axios.get(URL)
                .then((res) => {
                    console.log(res.data)
                    setData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const axiosCategories = () => {
            // const URL = `http://localhost:8000/usuarios/${id}/categorias`
            const URL = `http://localhost:8000/categorias`
            axios.get(URL)
                .then((res) => {
                    console.log(res.data)
                    const filteredCategories = res.data.categorias.filter((category) => category.tipo === 'gasto')
                    const sortedCategories = [...filteredCategories].sort((a, b) => {
                        if (a.nombre === 'Otros') return 1;
                        if (b.nombre === 'Otros') return -1;
                        return 0;
                    });
                    setCategories(sortedCategories);
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        if (selectedStartDate && selectedEndDate) {
            const filterData = axiosData().filter((data) => {
                return data.fecha >= selectedStartDate && data.fecha <= selectedEndDate
            })
            setData(filterData)
        } else {
            axiosData()
        }

        axiosCategories()
    }, [selectedStartDate, selectedEndDate, id])

    const agregarCategoria = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/usuarios/${id}/categorias`, { nombre: newCategory, tipo: 'gasto' })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        setSelectedCategory(newCategory)
        setNewCategory('')
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    return (
        <>
            <h3>Gastos</h3>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <CFormSelect
                                label="Seleccionar Categoría: "
                                onChange={handleCategoryChange}
                                options={[
                                    'Ubicación de gastos',
                                    ...categories.map((category) => category.nombre),
                                ]}
                                className="form-control"
                                style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                            />
                            {selectedCategory === 'Otros' && (
                                <>
                                    <CForm onSubmit={agregarCategoria} style={{ display: 'inline-block' }}>
                                        <input
                                            type="text"
                                            placeholder="Nueva categoría"
                                            className="form-control"
                                            style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                        />
                                        <CButton type="submit" color="primary">Agregar</CButton>
                                    </CForm>
                                </>
                            )}
                            <br />
                            <label htmlFor="desde">Mostrar desde: </label>
                            <input
                                type="date"
                                id="desde"
                                name="desde"
                                className="form-control"
                                style={{ display: 'inline-block', width: 'auto', margin: '10px' }}
                                onChange={(e) => setSelectedStartDate(e.target.value)}
                            />
                            <label htmlFor="hasta">hasta: </label>
                            <input
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
                                                    labels: data.map((data) => data.fecha),
                                                    datasets: [
                                                        {
                                                            label: 'Gastos',
                                                            data: data.map((data) => data.cantidad),
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