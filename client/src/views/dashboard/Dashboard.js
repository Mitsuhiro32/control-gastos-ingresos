import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Toastify from 'toastify-js'
import { CChart } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [ingresosPorMes, setIngresosPorMes] = useState([])
  const [gastosPorMes, setGastosPorMes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/usuarios/ingresos', {
      headers: {
        token_user: localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log('Ingresos', response.data.ingresos);
        const agrupadoPorMes = response.data.ingresos.reduce((acc, ingreso) => {
          const fecha = new Date(ingreso.fecha)
          const mes = fecha.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleString('default', { month: 'long' }).slice(1)
          if (!acc[mes]) {
            acc[mes] = 0
          }
          acc[mes] += ingreso.cantidad
          return acc
        }, {})

        const ingresosPorMes = Object.keys(agrupadoPorMes)
          .map((mes) => {
            return {
              mes,
              cantidad: agrupadoPorMes[mes]
            }
          })
          .sort((a, b) => {
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const monthAIndex = months.indexOf(a.mes);
            const monthBIndex = months.indexOf(b.mes);
            return monthAIndex - monthBIndex;
          });

        setIngresosPorMes(ingresosPorMes)
        console.log('Ingresos por mes', ingresosPorMes);
      })
      .catch(error => {
        console.error(error);
        Toastify({
          text: "Error al cargar los datos de ingresos",
          style: {
            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          },
          duration: 5000
        }).showToast()
      });

    // Obtener los datos de los gastos
    axios.get('http://localhost:8000/usuarios/gastos', {
      headers: {
        token_user: localStorage.getItem('token')
      }
    })
      .then(response => {
        const agrupadoPorMes = response.data.gastos.reduce((acc, gasto) => {
          const fecha = new Date(gasto.fecha)
          const mes = fecha.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleString('default', { month: 'long' }).slice(1)
          if (!acc[mes]) {
            acc[mes] = 0
          }
          acc[mes] += gasto.cantidad
          return acc
        }, {})

        const gastosPorMes = Object.keys(agrupadoPorMes)
          .map((mes) => {
            return {
              mes,
              cantidad: agrupadoPorMes[mes]
            }
          })
          .sort((a, b) => {
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const monthAIndex = months.indexOf(a.mes);
            const monthBIndex = months.indexOf(b.mes);
            return monthAIndex - monthBIndex;
          });

        setGastosPorMes(gastosPorMes)
        console.log('Gastos por mes', gastosPorMes);
      })
      .catch(error => {
        console.error(error);
        Toastify({
          text: "Error al cargar los datos de gastos",
          style: {
            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          },
          duration: 5000
        }).showToast()
      });
  }, []);

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CRow>
        <CCol xs="12">
          <CCard className="mb-4">
            <CCardHeader>Comparación de ingresos e gastos por mes</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CChart
                    type="bar"
                    data={{
                      labels: gastosPorMes.map(gasto => gasto.mes),
                      datasets: [
                        {
                          label: 'Gasto',
                          backgroundColor: '#FF6384',
                          data: gastosPorMes.map(gasto => gasto.cantidad)
                        }
                      ],
                    }}
                  />
                </CCol>
                <CCol sm="6">
                  <CChart
                    type="bar"
                    data={{
                      labels: ingresosPorMes.map(ingreso => ingreso.mes),
                      datasets: [
                        {
                          label: 'Ingreso',
                          backgroundColor: '#FFCE56',
                          data: ingresosPorMes.map(ingreso => ingreso.cantidad)
                        }
                      ],
                    }}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
