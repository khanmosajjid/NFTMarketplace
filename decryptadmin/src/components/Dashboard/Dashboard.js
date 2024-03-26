import React, { useState,useEffect } from 'react';
import Chart from 'react-apexcharts'
import { getDashboardData } from '../../apiService';
// import {Bar, Doughnut} from 'react-chartjs-2';
import '@mdi/font/css/materialdesignicons.css';
import Infobox from './Infobox';
import { navigate } from '@reach/router';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Dashboard = () => {
   
  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if(res == null){
    window.location.href = '/'
    // setTimeout(function(){window.location.reload()}, 100);
  }
 
  const [dashboardData,setDashboardData]=useState()
  
  useEffect(()=>{
    async function fetchDashboardData(){
      let {data,...result}=await getDashboardData();
    
      if(data && data!==undefined && data!==null && data.length!=0){
       
        setDashboardData(result)
      }
    }
    fetchDashboardData()
  },[])

  const performanceBoxs = [
    {id: 1, boxtext: 'Number of NFTs on Sale', earn: 1500, profit: 'Increased by 60%', color: 'danger', circle: require("../../assets/images/circle.png") },
    {id: 2, boxtext: 'Number of NFTs on Sale', earn: 1500, profit: 'Increased by 60%', color: 'info', circle: require("../../assets/images/circle.png") },
    {id: 3, boxtext: 'Number of NFTs on Sale', earn: 1500, profit: 'Increased by 60%', color: 'success', circle: require("../../assets/images/circle.png") },
    {id: 4, boxtext: 'Number of NFTs on Sale', earn: 1500, profit: 'Increased by 60%', color: 'primary', circle: require("../../assets/images/circle.png") }
  ]

    const [state, setState] = useState({
        options: {
          colors: ['#ef971d'],
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          },
          
          
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      });

      

  return (
    
    <div className="container-scroller"> 
      <Navbar /> 
      
    <div className="container-fluid page-body-wrapper">
    <Sidebar/>
           <div className="main-panel">
              <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              {/*<li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>*/}
            </ul>
          </nav>
        </div>
        <div className="row infobox">
         
          {dashboardData ? <Infobox data={dashboardData} circle={require("../../assets/images/circle.png")} />:"Loading"}
          
       
        </div>
        <div className="row">
            <div className="col-md-7 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <div className="clearfix mb-4">
                    <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                    <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right">
                        <ul>
                        <li>
                            <span className="legend-dots bg-warning">
                            </span>CHN
                        </li>
                        <li>
                            <span className="legend-dots bg-danger">
                            </span>USA
                        </li>
                        <li>
                            <span className="legend-dots bg-info">
                            </span>UK
                        </li>
                        </ul>
                    </div>
                    </div>
                    {/* <Bar ref='chart' className="chartLegendContainer" data={this.state.visitSaleData} options={this.state.visitSaleOptions} id="visitSaleChart"/> */}
                    <Chart options={state.options} series={state.series} type="area"  />
                </div>
                </div>
            </div>
            <div className="col-md-5 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Traffic Sources</h4>
                    <Chart options={state.options} series={state.series} type="bar"  />
                    {/* <Doughnut data={this.state.trafficData} options={this.state.trafficOptions} /> */}
                    <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4">
                    <ul>
                        <li>
                        <span className="legend-dots bg-warning"></span>Search Engines
                        <span className="float-right">30%</span>
                        </li>
                        <li>
                        <span className="legend-dots bg-success"></span>Direct Click
                        <span className="float-right">30%</span>
                        </li>
                        <li>
                        <span className="legend-dots bg-danger"></span>Bookmarks Click
                        <span className="float-right">40%</span>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
        <Footer/>
    </div>
  
  )
}

export default Dashboard
