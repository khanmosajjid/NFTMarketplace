import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';


const ItemNotFound = (props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, []);

  return <>
    <div className="itm-not-found">
      {/* <img src={PageNotFound}  /> */}
      <p style={{textAlign:"center"}}>
        <Link to="/">Go to Home </Link>
        <p> Need to login First to see the page</p>
      </p>
    </div>;
  </>;
};
export default ItemNotFound;