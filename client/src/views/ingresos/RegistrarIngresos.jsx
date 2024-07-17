import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from 'toastify-js'

const RegistrarIngresos = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [errorCategory, setErrorCategory] = useState('');
    const [contadorCategory, setContadorCategory] = useState(0);
    const [visible, setVisible] = useState(false);
    const [ingreso, setIngreso] = useState({
        descripcion: "",
        cantidad: "",
        fecha: "",
    });
    const [error, setError] = useState({
        categoria: "",
        descripcion: "",
        cantidad: "",
        fecha: "",
    })

    useEffect(() => {
        const axiosCategories = () => {
            const URL = `http://localhost:8000/usuarios/categorias`
            axios.get(URL, {
                headers: {
                    token_user: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log(res.data)
                    const filteredCategories = res.data.categorias.filter((category) => category.tipo === 'ingreso')
                    const sortedCategories = [...filteredCategories].sort((a, b) => {
                        if (a.nombre === 'Otros') return 1;
                        if (b.nombre === 'Otros') return -1;
                        return 0;
                    });
                    setCategories(sortedCategories);
                })
                .catch((err) => {
                    console.log(err)
                    Toastify({
                        text: 'Ocurrió un error al cargar las categorías',
                        style: {
                            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                        },
                        duration: 5000
                    }).showToast()
                })
        }

        axiosCategories()
    }, [contadorCategory, error])

    const agregarCategoria = (e) => {
        e.preventDefault()

        if (newCategory === '') {
            setErrorCategory('El campo no puede estar vacío')
            return
        } else if (categories.some((category) => category.nombre === newCategory)) {
            setErrorCategory('La categoría ya existe')
            return
        } else if (newCategory === 'Otros') {
            setErrorCategory('La categoría no puede llamarse "Otros"')
            return
        }

        axios.post(`http://localhost:8000/usuarios/categorias`, { nombre: newCategory, tipo: 'ingreso' }, {
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
                    text: 'Categoría agregada exitosamente',
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
        setErrorCategory('')
        setError({
            ...error,
            categoria: '',
        })
    }

    const handleChange = (e) => {
        setIngreso({
            ...ingreso,
            [e.target.name]: e.target.value,
        });
        setError({
            ...error,
            [e.target.name]: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ingreso.descripcion === "" || ingreso.cantidad === "" || ingreso.fecha === "" || selectedCategory === "") {
            setError({
                categoria: selectedCategory === "" ? "Seleccione una categoría" : "",
                descripcion: ingreso.descripcion === "" ? "El campo descripción no puede estar vacío" : "",
                cantidad: ingreso.cantidad === "" ? "El campo cantidad no puede estar vacío" : "",
                fecha: ingreso.fecha === "" ? "El campo fecha no puede estar vacío" : "",
            });
            return;
        } else if (ingreso.cantidad <= 0) {
            setError({
                ...error,
                cantidad: "La cantidad debe ser mayor a 0",
            });
            return;
        } else if (ingreso.fecha > new Date().toISOString().split('T')[0]) {
            setError({
                ...error,
                fecha: "La fecha no puede ser después de la fecha actual",
            });
            return;
        } else {
            setError({
                descripcion: "",
                cantidad: "",
                fecha: "",
            });
        }

        axios.post(`http://localhost:8000/usuarios/ingresos`, { categoria: selectedCategory, ...ingreso }, {
            headers: {
                token_user: localStorage.getItem('token')
            }
        })
            .then((res) => {
                setIngreso({
                    descripcion: "",
                    cantidad: "",
                    fecha: "",
                });
                setSelectedCategory('');
                console.log(res.data);
                Toastify({
                    text: 'Ingreso registrado exitosamente',
                    style: {
                        background: 'linear-gradient(to right, #00b09b, #96c93d)',
                    },
                    duration: 5000
                }).showToast()
            })
            .catch((err) => {
                console.log(err);
                Toastify({
                    text: 'Ocurrió un error al registrar el ingreso',
                    style: {
                        background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                    },
                    duration: 5000
                }).showToast()
            });
    };

    return (
        <>
            <h3>Registrar Ingresos</h3>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <CForm onSubmit={handleSubmit}>
                                {error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                                <CFormLabel htmlFor="categoria" className="col-form-label" style={{ marginRight: '10px' }}> Categoría: </CFormLabel>
                                <CInputGroup className="mb-2">
                                    <CFormSelect
                                        onChange={handleCategoryChange}
                                        options={[
                                            { value: '', label: 'Seleccione una categoría' },
                                            ...categories.map((category) => ({ value: category.nombre, label: category.nombre }))
                                        ]}
                                        className="form-control"
                                        value={selectedCategory}
                                        {...(error.categoria && { invalid: true, feedbackInvalid: error.categoria })}
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
                                                        onFocus={() => setErrorCategory('')}
                                                        {...(errorCategory && { invalid: true, feedbackInvalid: errorCategory })}
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
                                </CInputGroup>
                                <CFormLabel htmlFor="descripcion" className="col-form-label" style={{ marginRight: '10px' }}> Descripción: </CFormLabel>
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        type="text"
                                        id="descripcion"
                                        name="descripcion"
                                        value={ingreso.descripcion}
                                        onChange={handleChange}
                                        {...(error.descripcion && { invalid: true, feedbackInvalid: error.descripcion })}
                                    />
                                </CInputGroup>
                                <CFormLabel htmlFor="cantidad" className="col-form-label" style={{ marginRight: '10px' }}> Cantidad: </CFormLabel>
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        type="number"
                                        id="cantidad"
                                        name="cantidad"
                                        value={ingreso.cantidad}
                                        onChange={handleChange}
                                        {...(error.cantidad && { invalid: true, feedbackInvalid: error.cantidad })}
                                    />
                                </CInputGroup>
                                <CFormLabel htmlFor="fecha" className="col-form-label" style={{ marginRight: '10px' }}> Fecha: </CFormLabel>
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        value={ingreso.fecha}
                                        onChange={handleChange}
                                        {...(error.fecha && { invalid: true, feedbackInvalid: error.fecha })}
                                    />
                                </CInputGroup>
                                <CButton
                                    type="submit"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                >
                                    Registrar Ingreso
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default RegistrarIngresos;
