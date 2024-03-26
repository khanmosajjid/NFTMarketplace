
export const adminlogin = async (email, password) => {
    console.log("email & password -------->", email , password)
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sEmail: email,
            sPassword: password,
            
        }),
    };

    try {
        let response = await fetch(
            process.env.REACT_APP_API_BASE_URL + "/auth/adminlogin",
            requestOptions

        );


        const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log("data for login-->",data)
        
        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        window.sessionStorage.setItem("Authorization", data.data.token);
        console.log("token is---->", sessionStorage)
        return data.data.token;
        //   this.setState({ postId: data.id });
    } 
    catch (error) {
        // this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
    }
};







export const getDashboardData = async () => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: window.sessionStorage.getItem("Authorization"),
            "Content-Type": "application/json",
          },
      };
    
      try {
        let response = await fetch(
            process.env.REACT_APP_API_BASE_URL + "/admin/getDashboardData",
            requestOptions
        
        );
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const datas = isJson && (await response.json());
    
        return datas.data ? datas.data : [];
      } catch (err) {
        return err;
      }
};

//Get Users

export const getUserList = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: window.sessionStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    try {
      let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/admin/users",
        requestOptions
      );
  
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const datas = isJson && (await response.json());
  
      return datas;
    } catch (err) {
      return err;
    }
  };
 //Ends Get Users
 
 
 //ToggleUser status 
 
export const toggleUserStatus = async (id, status) => {
    console.log("id and status is---->",id,status)
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: window.sessionStorage.getItem("Authorization"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sObjectId:id,
            sStatus: status,
            
        }),
      };
    
      try {
        let response = await fetch(
            process.env.REACT_APP_API_BASE_URL + "/admin/toggleUserStatus",
            requestOptions
        
        );
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const datas = isJson && (await response.json());
        console.log("datass is--->",datas)
    
        return datas;
      } catch (err) {
        return err;
      }
};


 
export const toggleNFTStatus = async (id, status) => {
  console.log("id and status is---->",id,status)
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: window.sessionStorage.getItem("Authorization"),
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify({
          sObjectId:id,
          bStatus: status,
          
      }),
    };
  
    try {
      let response = await fetch(
          process.env.REACT_APP_API_BASE_URL + "/admin/toggleNFTStatus",
          requestOptions
      
      );
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const datas = isJson && (await response.json());
      console.log("datass is--->",datas)
  
      return datas;
    } catch (err) {
      return err;
    }
};


//NFTlist


export const nftList = async (data) => {
    //console.log("id and status is---->",id,status)
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: window.sessionStorage.getItem("Authorization"),
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data),
      };
    
      try {
        let response = await fetch(
            process.env.REACT_APP_API_BASE_URL + "/admin/nfts",
            requestOptions
        
        );
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const datas = isJson && (await response.json());
        console.log("datass is--->",datas)
    
        return datas;
      } catch (err) {
        return err;
      }
};

//Insert Faq

export const updateFAQs=async(data)=>{

  const requestOptions = {
    method: "POST",
    headers: {
        Authorization: window.sessionStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
  };

  try {
    let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/admin/updateFAQs",
        requestOptions
    
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    console.log("datass is--->",datas)

    return datas;
  } catch (err) {
    return err;
  }
}

export const getFAQsData=async()=>{
  const requestOptions = {
    method: "GET",
    headers: {
     
        "Content-Type": "application/json",
      },
  };

  try {
    let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/user/getFAQsData",
        requestOptions
    
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data ? datas.data : [];
  } catch (err) {
    return err;
  }
}


//
export const insertBanner=async(data)=>{
  console.log("insert banner data is",data)
  
  let formData = new FormData();
  
  formData.append("banner_image_desktop", data.banner_image_desktop);
  //formData.append("banner_image_mobile", data.banner_image_mobile);
  formData.append("banner_URL",data.banner_URL);
  formData.append("collection_Name",data.collection_Name)
  formData.append("nft_Name",data.nft_Name)
  formData.append("order",data.order)
  

  
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: window.sessionStorage.getItem("Authorization"),
    },
    body: formData,
  };
 
  try {
    let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/admin/insertBanner",
        requestOptions
    
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    console.log("datass is--->",datas)

    return datas;
  } catch (err) {
    return err;
  }
}

//Get Banners

export const getBanners=async()=>{
  const requestOptions = {
    method: "GET",
    headers: {
     
        "Content-Type": "application/json",
      },
  };

  try {
    let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/nft/getbanner",
        requestOptions
    
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data ? datas.data : [];
  } catch (err) {
    return err;
  }
}

//DeleteBanner

export const deleteBanner=async(id)=>{
  let data={
    sObjectId:id
  }
  const requestOptions = {
    method: "POST",
    headers: {
        Authorization: window.sessionStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
  };

  try {
    let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/admin/deleteBanner",
        requestOptions
    
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    console.log("datass is--->",datas)

    return datas;
  } catch (err) {
    return err;
  }
}

