import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const RegistrarGastos = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const id = localStorage.getItem('id');
    const [gasto, setGasto] = useState({
        descripcion: "",
        cantidad: "",
        fecha: "",
    });

    useEffect(() => {
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
        
        axiosCategories()
    }, []);

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
        setSelectedCategory(e.target.value);
    };

    const handleChange = (e) => {
        setGasto({
            ...gasto,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/usuarios/${id}/gastos`, { categoria: selectedCategory, ...gasto })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        
        console.log({ categoria: selectedCategory, ...gasto });
        setGasto({
            descripcion: "",
            cantidad: "",
            fecha: "",
        });
        setSelectedCategory('');
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
                                    <CFormLabel htmlFor="categoria" className="col-form-label"> Categoría: </CFormLabel>
                                    <CFormSelect
                                        onChange={handleCategoryChange}
                                        options={[
                                            'Ubicación de gastos',
                                            ...categories.map((category) => category.nombre),
                                        ]}
                                        className="form-control"
                                        style={{ marginLeft: '10px' }}
                                    />
                                    {selectedCategory === 'Otros' && (
                                        <>
                                            <CForm onSubmit={agregarCategoria} style={{ display: 'inline-block' }}>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Nueva categoría"
                                                    className="form-control"
                                                    style={{ marginLeft: '10px' }}
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                />
                                                <CButton type="submit" color="primary">Agregar</CButton>
                                            </CForm>
                                        </>
                                    )}
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="descripcion" className="col-form-label"> Descripción: </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="descripcion"
                                        name="descripcion"
                                        value={gasto.descripcion}
                                        onChange={handleChange}
                                        style={{ marginLeft: '10px' }}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormLabel htmlFor="cantidad" className="col-form-label"> Cantidad: </CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="cantidad"
                                        name="cantidad"
                                        value={gasto.cantidad}
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
                                        value={gasto.fecha}
                                        onChange={handleChange}
                                        style={{ marginLeft: '10px' }}
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