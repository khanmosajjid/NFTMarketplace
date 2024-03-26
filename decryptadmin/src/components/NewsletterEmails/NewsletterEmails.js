import React from 'react';
import { navigate } from '@reach/router';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const NewsletterEmails = () => {

  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if(res == null){
    window.location.href = '/'
    // setTimeout(function(){window.location.reload()}, 100);
  }
  return (
    <div className="container-scroller"> 
    <Navbar /> 
    
  <div className="container-fluid page-body-wrapper">
  <Sidebar/>
    <div className='main-panel'>
    <div className="content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">NewsLetter Emails</h4>
                <div className="form-inline justify-content-end mb-3">
                    <div className="input-group">
                        <input placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" type="text" className="form-control form-control" />
                        <div className="input-group-append">
                            <button className="btn btn-sm btn-gradient-primary" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Auction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jacob</td>
                        <td>davvy@blockchainaustralia.com.cu</td>
                        <td>
                            <button type="button" data-bs-toggle="tooltip" title="Delete" className="btn btn-gradient-primary btn-rounded btn-icon">
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Messsy</td>
                        <td>davvy@blockchainaustralia.com.cu</td>
                        <td>
                            <button type="button" data-bs-toggle="tooltip" title="Delete" className="btn btn-gradient-primary btn-rounded btn-icon">
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </td>
                      </tr>
                      <tr>
                        <td>John</td>
                        <td>davvy@blockchainaustralia.com.cu</td>
                        <td>
                            <button type="button" data-bs-toggle="tooltip" title="Delete" className="btn btn-gradient-primary btn-rounded btn-icon">
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Peter</td>
                        <td>davvy@blockchainaustralia.com.cu</td>
                        <td>
                            <button type="button" data-bs-toggle="tooltip" title="Delete" className="btn btn-gradient-primary btn-rounded btn-icon">
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Dave</td>
                        <td>davvy@blockchainaustralia.com.cu</td>
                        <td>
                            <button type="button" data-bs-toggle="tooltip" title="Delete" className="btn btn-gradient-primary btn-rounded btn-icon">
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</div>
  )
}

export default NewsletterEmails
