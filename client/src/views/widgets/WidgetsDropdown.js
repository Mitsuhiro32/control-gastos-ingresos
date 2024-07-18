import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Toastify from 'toastify-js';

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const [ingresosData, setingresosData] = useState([]);
  const [gastosData, setgastosData] = useState([]);
  const [ingresosPorMes, setIngresosPorMes] = useState([]);
  const [gastosPorMes, setGastosPorMes] = useState([]);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })

    // Obtener los datos de los ingresos
    axios.get('http://localhost:8000/usuarios/ingresos', {
      headers: {
        token_user: localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log('Ingresos', response.data.ingresos);
        setingresosData(response.data.ingresos);
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
        setgastosData(response.data.gastos);
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
  }, [widgetChartRef1, widgetChartRef2]);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={12} xl={4} xxl={6}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              {'-'}{formatNumber(gastosData.reduce((acc, item) => acc + item.cantidad, 0))}{' Gs '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilArrowBottom} />
              </span>
            </>
          }
          title="Gastos"
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '65px' }}
              data={{
                labels: gastosPorMes.map(item => item.mes),
                datasets: [
                  {
                    label: 'Gasto',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-danger'),
                    data: gastosPorMes.map(item => item.cantidad),
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={11} xl={4} xxl={6}>
        <CWidgetStatsA
          color="success"
          value={
            <>
              {formatNumber(ingresosData.reduce((acc, item) => acc + item.cantidad, 0))}{' Gs '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilArrowTop} />
              </span>
            </>
          }
          title="Ingresos"
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '65px' }}
              data={{
                labels: ingresosPorMes.map(item => item.mes),
                datasets: [
                  {
                    label: 'Ingreso',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-success'),
                    data: ingresosPorMes.map(item => item.cantidad),
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  );
}


WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
