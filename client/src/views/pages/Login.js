// client/src/views/pages/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { cilEnvelopeClosed, cilLockLocked } from '@coreui/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
    error: '',
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError({
        email: email ? '' : 'El correo electrónico es requerido',
        password: password ? '' : 'La contraseña es requerida',
        error: '',
      });
      return;
    } else {
      setError({ email: '', password: '', error: '' });
    }

    axios.post('http://localhost:8000/login', { email, password })
      .then(response => {
        console.log('Usuario logueado', response.data);
        localStorage.setItem('token', response.data.token);
        const decoded = JSON.parse(atob(response.data.token.split('.')[1]));
        localStorage.setItem('username', decoded.username);
        navigate('/dashboard');
      })
      .catch(error => {
        setError({ error: error.response.data.message });
        console.error('Hubo un error al loguear', error);
        setEmail('');
        setPassword('');
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
                  <CForm onSubmit={handleLogin}>
                    <h1>Iniciar Sesión</h1>
                    <p className="text-body-secondary">Inicia sesión en tu cuenta</p>
                    {error.error && <p className="text-danger">{error.error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo electrónico"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setError({ ...error, email: '' })
                        }}
                        {...(error.email && { invalid: true, feedbackInvalid: error.email })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setError({ ...error, password: '' })
                        }}
                        {...(error.password && { invalid: true, feedbackInvalid: error.password })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Iniciar Sesión
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <Link to="/forgot-password" className="text-decoration-none">
                          Forgot password?
                        </Link>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Registrarse</h2>
                    <p>
                      ¿No tienes una cuenta? Regístrate ahora y comienza a administrar tus finanzas.
                    </p>
                    <Link to="/register" className="text-decoration-none">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Registrarse Ahora!
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

export default Login;
