// client/src/views/pages/Register.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({
        error: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setError({
                username: username ? '' : 'El nombre de usuario es requerido',
                email: email ? '' : 'El correo electrónico es requerido',
                password: password ? '' : 'La contraseña es requerida',
                confirmPassword: confirmPassword ? '' : 'La confirmación de contraseña es requerida',
                error: '',
            });
            return;
        } else if (password !== confirmPassword) {
            setError({ ...error, confirmPassword: 'Las contraseñas no coinciden' });
        } else if (password.length < 6) {
            setError({ ...error, password: 'La contraseña debe tener al menos 6 caracteres' });
        } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError({ ...error, email: 'El correo electrónico no es válido' });
        } else {
            setError({ username: '', email: '', password: '', confirmPassword: '', error: '' });
        }

        axios.post('http://localhost:8000/register', { username, email, password })
            .then(response => {
                console.log('Usuario registrado', response.data);
                navigate('/login');
            })
            .catch(error => {
                setError({ error: error.response.data.message });
                console.error('Hubo un error al registrar', error);
            });
    };

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleRegister}>
                                        <h1>Registrarse</h1>
                                        <p className="text-body-secondary">Crea una cuenta</p>
                                        {error.error && <p className="text-danger">{error.error}</p>}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="text"
                                                placeholder="Nombre de usuario"
                                                autoComplete="username"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value)
                                                    setError({ ...error, username: '' })
                                                }}
                                                onFocus={() => setError({ ...error, error: '' })}
                                                {...(error.username && { invalid: true, feedbackInvalid: error.username })}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>@</CInputGroupText>
                                            <CFormInput
                                                type="email"
                                                placeholder="Correo electrónico"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                    setError({ ...error, email: '' })
                                                }}
                                                onFocus={() => setError({ ...error, error: '' })}
                                                {...(error.email && { invalid: true, feedbackInvalid: error.email })}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Contraseña"
                                                autoComplete="new-password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    setError({ ...error, password: '' })
                                                }}
                                                onFocus={() => setError({ ...error, error: '' })}
                                                {...(error.password && { invalid: true, feedbackInvalid: error.password })}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Confirmar contraseña"
                                                autoComplete="new-password"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value)
                                                    setError({ ...error, confirmPassword: '' })
                                                }}
                                                onFocus={() => setError({ ...error, error: '' })}
                                                {...(error.confirmPassword && { invalid: true, feedbackInvalid: error.confirmPassword })}
                                            />
                                        </CInputGroup>
                                        <CButton type="submit" color="primary" className="px-4">
                                            Registrarse
                                        </CButton>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Iniciar Sesión</h2>
                                        <p>
                                            ¿Ya tienes una cuenta? Inicia sesión ahora y comienza a administrar tus finanzas.
                                        </p>
                                        <Link to="/login">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Iniciar Sesión Ahora!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Register;
