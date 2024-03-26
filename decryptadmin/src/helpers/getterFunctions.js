
import { getUserList,nftList } from "../apiService";


export const getUsers = async (req) => {
	let data = [];
	
	try {
		let reqBody = {
			length: req.length,
			start: req.start,
			sTextsearch: req.sTextsearch,
			sSellingType: '',
			sSortingType: 'Recently Added'
		  };
  
	  data = await getUserList(reqBody);
	//  console.log("user data is---->",data.data);
	  return data.data;
	} catch (e) {
	  console.log("Error in getNFts API--->", e);
	}
	
	
	
};

export const getNftList = async (req) => {
	let data = [];
	console.log("req is--->",req)
	
	try {
		let reqBody = {
			length: req.length,
			start: req.start,
			sTextsearch: req.sTextsearch,
			sSellingType: '',
			sSortingType: 'Recently Added'
		  };
  
	  data = await nftList(reqBody);
	  console.log("user data is---->",data);
	  return data.data;
	} catch (e) {
	  console.log("Error in getNFts API--->", e);
	}
	
	
	
};