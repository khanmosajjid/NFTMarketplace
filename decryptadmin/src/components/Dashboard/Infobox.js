import React, {useEffect,useState} from 'react';
// import Circle from '../../assets/images/circle.png';

const Infobox = (props) => {
    const [data,setData]=useState()
    useEffect(()=>{
        if(props && props.data !==undefined){
            setData(props.data)
           
        }
    },[props])
   
  return (
  
    <div className="col-md-3 stretch-card grid-margin">
       
        {data && data!==undefined?
        <> 
        <div className={`card bg-gradient-danger card-img-holder text-white m-2 border-radius-0`}>
        <div className="card-body">
            <img src={props.circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">Number Of NFT On Sale <i className="mdi mdi-chart-line mdi-24px float-right"></i>
            </h4>
            <h2 className="mb-5">{data?data.nFixedSaleNFTsCount:"0"}</h2>
            {/*<h6 className="card-text">{props.profit}</h6>*/}
        </div>
        </div>
        <div className="card bg-gradient-info card-img-holder text-white m-2 border-radius-0">
        <div className="card-body">
            <img src={props.circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">NFT Of Nft On Auction <i className="mdi mdi-chart-line mdi-24px float-right"></i>
            </h4>
            <h2 className="mb-5">{data?data.nAuctionNFTsCount:"0"}</h2>
            {/*<h6 className="card-text">{props.profit}</h6>*/}
        </div>
        </div>
        <div className={`card bg-gradient-success card-img-holder text-white m-2 border-radius-0`}>
        <div className="card-body">
            <img src={props.circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">Number Of User <i className="mdi mdi-chart-line mdi-24px float-right"></i>
            </h4>
            <h2 className="mb-5">{data?data.nTotalRegisterUsers:"0"}</h2>
            {/*<h6 className="card-text">{props.profit}</h6>*/}
        </div>
        </div>
        <div className={`card bg-gradient-primary card-img-holder text-white m-2 border-radius-0`}>
        <div className="card-body">
            <img src={props.circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">Total Number Of NFT Sold <i className="mdi mdi-chart-line mdi-24px float-right"></i>
            </h4>
            <h2 className="mb-5">{data?data.nSoldNFTsCount:"0"}</h2>
            {/*<h6 className="card-text"></h6>*/}
        </div>
        </div></>
       :"Loading again"}
        
        

    {/* <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white">
                <div className="card-body">
                    <img src={Circle} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Number of NFTs on Sale <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">$ 15,00</h2>
                    <h6 className="card-text">Increased by 60%</h6>
                </div>
                </div>
            </div>
            <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body">
                    <img src={Circle} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Number of NFTs on Auction <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">45</h2>
                    <h6 className="card-text">Decreased by 10%</h6>
                </div>
                </div>
            </div>
            <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-success card-img-holder text-white">
                <div className="card-body">
                    <img src={Circle} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Number of Users <i className="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">122</h2>
                    <h6 className="card-text">Increased by 5%</h6>
                </div>
                </div>
            </div>
            <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-primary card-img-holder text-white">
                <div className="card-body">
                    <img src={Circle} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Number of NFTs Sold <i className="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">95,5741</h2>
              div> */}


    </div>
  )
}

export default Infobox
