import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import { NotificationManager } from "react-notifications";
import {
  GENERAL_DATE,
  GENERAL_TIMESTAMP,
  MAX_ALLOWANCE_AMOUNT,
  USER_MESSAGE,
  ZERO_ADDRESS,
} from "./constants";
import degnrABI from "./../config/abis/dgnr8.json";
import erc20Abi from "./../config/abis/erc20.json";
import {
  createOrder,
  TransferNfts,
  createBidNft,
  updateBidNft,
  acceptBid,
  createOfferNFT,
  acceptOffer,
  updateOwner,
  UpdateStatus,
  checkBidOffer,
  deleteBids,
  checkOwnerChange,
  updateVolume

} from "../apiServices";
import { createCollection } from "../apiServices";
import {
  buildBuyerOrder,
  getCurrentProvider,
  GetOwnerOfToken,
  getPaymentTokenInfo,
  getUsersTokenBalance,
  readReceipt,
} from "./getterFunctions";
import {
  exportInstance,
  getOrderDetails,
  UpdateOrderStatus,
  DeleteOrder,
  InsertHistory,
} from "../apiServices";
import marketPlaceABI from "./../config/abis/marketplace.json";
import contracts from "./../config/contracts";
import { buildSellOrder, getNextId, getSignature } from "./getterFunctions";
import extendedERC721Abi from "./../config/abis/extendedERC721.json";
import extendedERC1155Abi from "./../config/abis/extendedERC1155.json";
import { convertToEth } from "./numberFormatter";
import { slowRefresh } from "./NotifyStatus";
import moment from "moment";
import { isEmptyObject } from "jquery";



export const handleBuyNft = async (
  id,
  isERC721,
  account,
  qty = 1,
  LazyMintingStatus,
  historyMetaData,
  seller
) => {
  let order;
  let details;
  let marketplace;
  let usrHaveQuantity;
  let completeOrder;
  let checkCallStatic;
  let sellerOrder = [];
  let buyerOrder = [];
  let amount;
  try {
    order = await buildSellOrder(id);
    if (order === false) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      slowRefresh(1000);
      return false;
    }
    details = await getOrderDetails({ orderId: id });
  } catch (e) {
    console.log("error in API", e);
    NotificationManager.error("Error while buying NFT");
    return false;
  }
  try {
    amount = new BigNumber(order[6].toString())
      .multipliedBy(new BigNumber(qty.toString()))
      .toString();
  } catch (e) {
    console.log("error while buying is", e);
    NotificationManager.error("Error while buying NFT");
    return false;
  }

  let NFTcontract = await exportInstance(
    order[1],
    isERC721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
  );

  for (let key = 0; key < 11; key++) {
    switch (key) {
      case 0:
        if (isERC721 === 1) {
          sellerOrder.push(order[key]);
          buyerOrder.push(account);
          break;
        } else {
          sellerOrder.push(order[key]);
          buyerOrder.push(account);
          break;
        }
      case 1:
        sellerOrder.push(order[key]);
        buyerOrder.push(order[key]);
        break;
      case 3:
        if (isERC721 === 1) {
          sellerOrder.push(order[key]);
          buyerOrder.push(order[key]);
        } else {
          sellerOrder.push(order[key]);
          buyerOrder.push(Number(qty));
        }
        break;
      case 5:
        sellerOrder.push(order[key]);
        buyerOrder.push(order[key]);
        break;
      case 6:
        if (isERC721 === 1) {
          sellerOrder.push(order[key]);
          buyerOrder.push(order[key]);
        } else {
          buyerOrder.push(amount);
          sellerOrder.push(order[key]);
        }
        break;
      case 8:
        sellerOrder.push([]);
        buyerOrder.push([]);
        break;
      case 9:
        sellerOrder.push([]);
        buyerOrder.push([]);
        break;
      default:
        sellerOrder.push(parseInt(order[key]));
        buyerOrder.push(parseInt(order[key]));
    }
  }
  if (
    (LazyMintingStatus === 2 || LazyMintingStatus === 0) &&
    !seller?.lazyMinted
  ) {
    usrHaveQuantity = await GetOwnerOfToken(
      sellerOrder[1],
      sellerOrder[2],
      isERC721,
      sellerOrder[0]
    );

    if (
      parseInt(usrHaveQuantity) === 0 ||
      usrHaveQuantity === false ||
      parseInt(usrHaveQuantity) < parseInt(buyerOrder[3])
    ) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      let owners = [];
      if (isERC721 === 1) {
        let owner = await NFTcontract.ownerOf(sellerOrder[2]);
        owners.push({
          address: owner,
          quantity: 1,
        });
        await updateOwner({
          tokenID: sellerOrder[2],
          collection: sellerOrder[1],
          ownersData: owners,
        });
      } else {
        await checkOwnerChangeAndUpdate(
          usrHaveQuantity,
          buyerOrder[3],
          sellerOrder[2],
          sellerOrder[1],
          sellerOrder[0]
        );
      }
      await DeleteOrder({
        orderId: id,
        isERC721: isERC721 === 1 ? true : false,
        ownedQty: !seller?.lazyMinted ? usrHaveQuantity : seller?.quantity,
      });

      return false;
    }
  }
  let approval = await NFTcontract.isApprovedForAll(
    sellerOrder[0],
    contracts.MARKETPLACE
  );
  if (!approval) {
    NotificationManager.error("Seller didn't approved marketplace");
    return false;
  }

  let signature = details.oSignature;
  let options;

  try {
    marketplace = await exportInstance(
      contracts.MARKETPLACE,
      marketPlaceABI.abi
    );

    options = {
      from: account,
      gasLimit: 9000000,
      value: new BigNumber(order[6].toString())
        .multipliedBy(new BigNumber(qty.toString()))
        .toString(),
    };

    checkCallStatic = await marketplace.callStatic.completeOrder(
      sellerOrder,
      signature,
      buyerOrder,
      signature,
      options
    );

    if (checkCallStatic) {
      completeOrder = await marketplace.completeOrder(
        sellerOrder,
        signature,
        buyerOrder,
        signature,
        options
      );
     let volume=await updateVolume({id:sellerOrder[1],price:new BigNumber(order[6].toString())
        .multipliedBy(new BigNumber(qty.toString()))
        .toString()})

      let req = {
        recordID: id,
        DBCollection: "Order",
        hashStatus: 0,
        hash: completeOrder.hash,
      };
      try {
        await UpdateStatus(req);
      } catch (e) {
        return false;
      }

      let res = await completeOrder.wait();
      if (res.status === 0) {
        NotificationManager.error("Transaction failed");
        return false;
      }
    } else {
      NotificationManager.error("Error while buying NFT");
      return false;
    }
  } catch (e) {
    console.log("error is", e);
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    if (
      e.code === "CALL_EXCEPTION" &&
      e.toString().includes("Cancelled or complete")
    ) {
      NotificationManager.error("Transaction is Cancelled or Completed");
      return false;
    } else {
      NotificationManager.error("Error while buying NFT");
      return false;
    }
  }

  try {
    let orderDetails = await getOrderDetails({ orderId: id });
    historyMetaData.hash = completeOrder.hash;
    if (orderDetails.hashStatus === 0) {
      await InsertHistory(historyMetaData);
      if (LazyMintingStatus === 1) {
        LazyMintingStatus = 2;
      }
      await UpdateOrderStatus({
        orderId: id,
        oNftId: details.oNftId,
        oSeller: details.oSellerWalletAddress.toLowerCase(),
        oQtyBought: Number(qty),
        qty_sold: Number(qty),
        oBuyer: account.toLowerCase(),
        LazyMintingStatus: LazyMintingStatus,
        hashStatus: 1,
      });

      let req = {
        recordID: id,
        DBCollection: "Order",
        hashStatus: 1,
      };
      try {
        await UpdateStatus(req);
      } catch (e) {
        return false;
      }
    }
    DeleteOrder({
      orderId: id,
      isERC721: isERC721 === 1 ? true : false,
      ownedQty: !seller?.lazyMinted
        ? usrHaveQuantity - qty
        : seller?.quantity - qty,
    });
  } catch (e) {
    console.log("error in updating order data", e);
    NotificationManager.error("Error while buying NFT");
    return false;
  }

  NotificationManager.success("NFT Purchased Successfully");
  return true;
};

export const handleRemoveFromSale = async (
  orderId,
  account,
  isERC721,
  LazyMintingStatus
) => {
  let marketplace;
  let order;
  let details;
  let options;
  let usrHaveQuantity;
  try {
    marketplace = await exportInstance(
      contracts.MARKETPLACE,
      marketPlaceABI.abi
    );

    order = await buildSellOrder(orderId);
    console.log("herere for remove from sale", order, orderId);
    if (order === false) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      await DeleteOrder({ orderId: orderId, isERC721: true });
      slowRefresh(1000);
      return false;
    }

    if (!LazyMintingStatus) {
      usrHaveQuantity = await GetOwnerOfToken(
        order[1],
        order[2],
        isERC721 === 1 ? 1 : 2,
        order[0]
      );

      if (usrHaveQuantity === 0 || usrHaveQuantity === false) {
        NotificationManager.info(
          "Owner has been changed or order deleted",
          "",
          3000
        );
        let NFTcontract = await exportInstance(
          order[1],
          isERC721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
        );
        let owners = [];
        if (isERC721 === 1) {
          let owner = await NFTcontract.ownerOf(order[2]);
          owners.push({
            address: owner,
            quantity: 1,
          });
          await updateOwner({
            tokenID: order[2],
            collection: order[1],
            ownersData: order,
          });
        } else {
          await checkOwnerChangeAndUpdate(
            usrHaveQuantity,
            order[3],
            order[2],
            order[1],
            order[0]
          );
        }
      }
    }

    details = await getOrderDetails({ orderId: orderId });
    console.log("details isss----->>>", details);
    options = {
      from: account,
      gasLimit: 900000000,
      value: 0,
    };
    try {
      console.log(
        "order details.oSignature options",
        order,
        details.oSignature,
        options
      );
      let checkCallStatic = await marketplace.callStatic.cancelOrder(
        order,
        // details.oSignature,
        // options
      );
      console.log("check calll static is ------->", checkCallStatic);

      if (checkCallStatic) {
        let res = await marketplace.cancelOrder(
          order,
          // details.oSignature,
          // options
        );
        console.log("res is---->",res);

        try {
          res = await res.wait();
          if (res.status === false) {
            NotificationManager.error("Transaction Failed");
            return false;
          }
        } catch (e) {
          if (e.code === "CALL_EXCEPTION") {
            if (e.toString().includes("Cancelled or complete")) {
              console.log("Order either completed or cancelled");
              await DeleteOrder({
                orderId: orderId,
                isERC721: true,
              });
              NotificationManager.error(
                "Transaction is Cancelled or Completed"
              );
              return false;
            }
          } else {
            if (e?.code === "ACTION_REJECTED" || e?.code === 4001) {
              NotificationManager.error("User denied ");
              return false;
            }
            NotificationManager.error("Transaction Failed");
            return false;
          }
        }
      }
    } catch (e) {
      console.log("error in call static", e, order, details.oSignature);
      if (e.reason === "Bad signature") {
        NotificationManager.error("Bad Signature");
        return false;
      }
      if (e.code === "CALL_EXCEPTION") {
        if (e.toString().includes("Cancelled or complete")) {
          console.log("Order either completed or cancelled");
          await DeleteOrder({
            orderId: orderId,
            isERC721: true,
          });
          NotificationManager.error("Transaction is Cancelled or Completed");
          return false;
        }
        return false;
      } else {
        if (e?.code === "ACTION_REJECTED" || e?.code === 4001) {
          NotificationManager.error("User denied ");
          return false;
        }
        NotificationManager.error("Transaction Failed");
        return false;
      }
    }
  } catch (e) {
    console.log("error in contract function call", e);
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
     if (e.toString().includes("Cancelled or complete")) {
       console.log("Order either completed or cancelled");
       await DeleteOrder({
         orderId: orderId,
         isERC721: true,
       });
       NotificationManager.error("Transaction is Cancelled or Completed");
       return false;
     }
    // await DeleteOrder({
    //   orderId: orderId,
    //   isERC721: true,
    // });
    NotificationManager.error("Order is either completed or cancelled");
    return false;
  }
  try {
    await DeleteOrder({
      orderId: orderId,
      isERC721: true,
    });
    NotificationManager.success("Removed from sale successfully");
    return true;
  } catch (e) {
    console.log("error while updating database", e);
    NotificationManager.error("Error while Removing NFT from auction");
    return false;
  }
};

export const putOnMarketplace = async (
  account,
  orderData,
  LazyMintingStatus
) => {
  if (!account) {
    return false;
  }
  let _deadline;
  let _price;
  let _auctionEndDate;
  let sellerOrder;
  let options;
  try {
    if (orderData.chosenType === 0) {
      _deadline = GENERAL_TIMESTAMP;
      _auctionEndDate = new Date(GENERAL_DATE);
      _price = ethers.utils.parseEther(orderData.price.toString()).toString();
    } else if (orderData.chosenType === 1) {
      let minBid = orderData.minimumBid.toString();
      let endTime = new Date(orderData.endTime).valueOf() / 1000;
      _deadline = endTime;
      _auctionEndDate = orderData.auctionEndDate;
      _price = ethers.utils.parseEther(minBid).toString();
    } else if (orderData.chosenType === 2) {
      let minBid = orderData.minimumBid.toString();
      _deadline = GENERAL_TIMESTAMP;
      _auctionEndDate = new Date(GENERAL_DATE);
      _price = ethers.utils.parseEther(minBid).toString();
    }
    sellerOrder = [
      account,
      orderData.collection,
      orderData.tokenId,
      orderData.quantity,
      orderData.saleType,
      orderData.tokenAddress ? orderData.tokenAddress : ZERO_ADDRESS,
      _price,
      _deadline,
      [],
      [],
      orderData.salt,
    ];
    let NFTcontract = await exportInstance(
      orderData.collection,
      orderData.erc721 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
    );
    if (!LazyMintingStatus) {
      let usrHaveQuantity = await GetOwnerOfToken(
        sellerOrder[1],
        sellerOrder[2],
        orderData.erc721 === true ? 1 : 2,
        sellerOrder[0]
      );

      if (Number(usrHaveQuantity) < Number(orderData.quantity)) {
        NotificationManager.error("You don't own that much quantity");
        let owners = [];
        if (orderData.erc721 === 1) {
          let owner = await NFTcontract.ownerOf(sellerOrder[2]);
          owners.push({
            address: owner,
            quantity: 1,
          });
          await updateOwner({
            tokenID: sellerOrder[2],
            collection: sellerOrder[1],
            ownersData: owners,
          });
        } else {
          await checkOwnerChangeAndUpdate(
            usrHaveQuantity,
            sellerOrder[3],
            sellerOrder[2],
            sellerOrder[1],
            sellerOrder[0]
          );
        }
        return false;
      }
    }

    let approval = await NFTcontract.isApprovedForAll(
      account,
      contracts.MARKETPLACE
    );
    let approvalRes;

    if (!approval) {
      options = {
        from: account,
        gasLimit: 9000000,
        value: 0,
      };
      approvalRes = await NFTcontract.setApprovalForAll(
        contracts.MARKETPLACE,
        true,
        options
      );
      approvalRes = await approvalRes.wait();
      if (approvalRes.status === 0) {
        return false;
      }
    }
  } catch (e) {
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    NotificationManager.error("Error while placing order");
    console.log("error in contract", e);
    return false;
  }
  try {
    let signature = [];
    signature = await getSignature(account, ...sellerOrder);
    if (signature === false) {
      return false;
    }

    let reqParams = {
      nftId: orderData.nftId,
      seller: account.toLowerCase(),
      tokenAddress: orderData.tokenAddress
        ? orderData.tokenAddress
        : ZERO_ADDRESS,
      collection: orderData.collection,
      price: _price,
      quantity: orderData.quantity,
      saleType: orderData.saleType,
      validUpto: _deadline,
      signature: signature,
      tokenId: orderData.tokenId,
      auctionEndDate: _auctionEndDate,
      salt: orderData.salt,
    };

    try {
      await createOrder(reqParams);
      NotificationManager.success("Order created successfully");
      return true;
    } catch (err) {
      NotificationManager.error("Error while placing order");
      console.log("err on put on marketplace is", err);
      return false;
    }
  } catch (err) {
    console.log("error in Api", err);
    NotificationManager.error("Error while placing order");
    return false;
  }
};

export const handleCollectionCreation = async (
  isSingle,
  collectionData,
  account
) => {
  console.log("in helper");
  let creator = await exportInstance(contracts.CREATOR_PROXY, degnrABI);
  console.log("here for export instance", creator);
  let res1;
  let contractAddress;
  let options;
  try {
    console.log("account is----->", account);
    if (isSingle) {
      options = {
        from: account,
        gasLimit: 900000000,
        value: 0,
      };
      console.log("in this single section");
      res1 = await creator.deployExtendedERC721(
        collectionData.sName,
        collectionData.symbol,
        collectionData.nftFile,
        collectionData.sRoyaltyPercentage,
        contracts.USDT
      );
      console.log("here res1 is---->", res1);
    } else {
      options = {
        from: account,
        gasLimit: 9000000,
        value: 0,
      };
      console.log("in this d=multiple section");
      res1 = await creator.deployExtendedERC1155(
        collectionData.nftFile,
        collectionData.sRoyaltyPercentage,
        contracts.USDT,
        options
      );
    }
    let hash = res1;
    res1 = await res1.wait();
    if (res1.status === 0) {
      return false;
    }
    contractAddress = await readReceipt(hash);
    let royalty = await exportInstance(
      contractAddress,
      isSingle ? extendedERC721Abi.abi : extendedERC1155Abi.abi
    );

    if (collectionData.sRoyaltyPercentage > 0) {
      options = {
        from: account,
        gasLimit: 9000000,
        value: 0,
      };

      let res = await royalty.setDefaultRoyaltyDistribution(
        [account],
        [collectionData.sRoyaltyPercentage],
        options
      );
      res = await res.wait();
      if (res.status === 0) {
        return false;
      }
    }

    var fd = new FormData();
    fd.append("sName", collectionData.sName);
    fd.append("sDescription", collectionData.sDescription);
    fd.append("nftFile", collectionData.nftFile);
    fd.append("sContractAddress", contractAddress);
    fd.append(
      "erc721",
      isSingle ? JSON.stringify(true) : JSON.stringify(false)
    );
    fd.append("sRoyaltyPercentage", collectionData.sRoyaltyPercentage);
    fd.append("quantity", collectionData.quantity);
    fd.append("sFloorprice", collectionData.floorPrice);

    await createCollection(fd);
    NotificationManager.success("Collection Created Successfully");
    return true;
  } catch (e) {
    console.log("error in contract function call", e);
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
  }
};

export const createBid = async (
  nftID,
  orderID,
  ownerAccount,
  buyerAccount,
  erc721,
  qty = 1,
  bidPrice,
  LazyMintingStatus,
  oldBidData = {}
) => {
  let SellerOrder;
  let sellerOrder = [];
  let buyerOrder = [];
  try {
    let details = await getOrderDetails({ orderId: orderID });
    if (Object.keys(details).length === 0) {
      NotificationManager.error("Order Is Canceled or completed");
      return false;
    }

    SellerOrder = await buildSellOrder(orderID);
    if (SellerOrder === false) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      slowRefresh(1000);
      return false;
    }
    const deadline = GENERAL_TIMESTAMP + moment().unix();

    for (let index = 0; index < 11; index++) {
      switch (index) {
        case 0:
          sellerOrder.push(SellerOrder[index]);
          buyerOrder.push(buyerAccount);
          break;
        case 1:
          sellerOrder.push(SellerOrder[index]);
          buyerOrder.push(SellerOrder[index]);
          break;
        case 3:
          sellerOrder.push(SellerOrder[index]);
          buyerOrder.push(Number(qty));
          break;
        case 5:
          sellerOrder.push(SellerOrder[index]);
          buyerOrder.push(SellerOrder[index]);
          break;
        case 6:
          sellerOrder.push(SellerOrder[index]);
          buyerOrder.push(
            new BigNumber(
              ethers.utils.parseEther(bidPrice.toString()).toString()
            )
              .multipliedBy(new BigNumber(qty.toString()))
              .toString()
          );
          break;
        case 7:
          sellerOrder.push(SellerOrder[index]);
          buyerOrder.push(deadline);

          break;
        case 8:
          sellerOrder.push([]);
          buyerOrder.push([]);
          break;
        case 9:
          sellerOrder.push([]);
          buyerOrder.push([]);
          break;
        default:
          sellerOrder.push(parseInt(SellerOrder[index]));
          buyerOrder.push(parseInt(SellerOrder[index]));
      }
    }

    if (!isEmptyObject(oldBidData)) {
      let amount = new BigNumber(
        oldBidData?.oBidPrice?.$numberDecimal.toString()
      )
        .multipliedBy(new BigNumber(oldBidData?.oBidQuantity.toString()))
        .toString();
      let oldBuyerOrder = [];
      let details = await getOrderDetails({ orderId: oldBidData.oOrderId });
      if (oldBidData) {
        for (let key = 0; key < 11; key++) {
          switch (key) {
            case 0:
              oldBuyerOrder.push(buyerAccount);
              break;
            case 1:
              oldBuyerOrder.push(oldBidData?.tokenAddress);
              break;
            case 2:
              oldBuyerOrder.push(oldBidData?.tokenId);
              break;
            case 3:
              oldBuyerOrder.push(oldBidData?.oBidQuantity);
              break;
            case 4:
              oldBuyerOrder.push(1);
              break;
            case 5:
              oldBuyerOrder.push(details?.oPaymentToken);
              break;
            case 6:
              oldBuyerOrder.push(amount);
              break;
            case 7:
              oldBuyerOrder.push(oldBidData?.oBidDeadline);
              break;
            case 8:
              oldBuyerOrder.push([]);
              break;
            case 9:
              oldBuyerOrder.push([]);
              break;
            default:
              oldBuyerOrder.push(parseInt(oldBidData?.salt));
          }
        }
      }

      let cancelOrder = await handleCancelOrder(
        oldBuyerOrder,
        oldBidData?.oBuyerSignature,
        oldBidData._id
      );
      if (cancelOrder === false) {
        return false;
      }
    }

    if (LazyMintingStatus === 2 || LazyMintingStatus === 0) {
      let usrHaveQuantity = await GetOwnerOfToken(
        sellerOrder[1],
        sellerOrder[2],
        erc721 === 1 ? 1 : 2,
        sellerOrder[0]
      );

      if (
        parseInt(usrHaveQuantity) === 0 ||
        parseInt(usrHaveQuantity) < parseInt(buyerOrder[3]) ||
        usrHaveQuantity === false
      ) {
        NotificationManager.info("Something happened on this NFT", "", 3000);
        let owners = [];
        let NFTcontract = await exportInstance(
          sellerOrder[1],
          erc721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
        );
        if (erc721 === 1) {
          let owner = await NFTcontract.ownerOf(sellerOrder[2]);
          owners.push({
            address: owner,
            quantity: 1,
          });
          await updateOwner({
            tokenID: sellerOrder[2],
            collection: sellerOrder[1],
            ownersData: owners,
          });
        } else {
          await checkOwnerChangeAndUpdate(
            usrHaveQuantity,
            sellerOrder[3],
            sellerOrder[2],
            sellerOrder[1],
            sellerOrder[0]
          );
        }
        await DeleteOrder({
          orderId: orderID,
          isERC721: erc721 === 1 ? true : false,
          ownedQty: usrHaveQuantity,
        });
        return false;
      }
    }

    let userTokenBal = await getUsersTokenBalance(buyerOrder[0], buyerOrder[5]);
    if (
      new BigNumber(bidPrice)
        .multipliedBy(new BigNumber(qty.toString()))
        .isGreaterThan(new BigNumber(convertToEth(userTokenBal).toString()))
    ) {
      NotificationManager.error("User don't have sufficient token balance");
      return false;
    }

    try {
      let paymentData = await getPaymentTokenInfo(buyerAccount, sellerOrder[5]);
      let allowance = paymentData.allowance.toString();
      if (
        new BigNumber(allowance).isLessThan(
          new BigNumber(ethers.utils.parseEther(bidPrice.toString()).toString())
            .multipliedBy(new BigNumber(qty.toString()))
            .toString()
        )
      ) {
        let approvalRes = await handleApproveToken(
          buyerOrder[0],
          buyerOrder[5]
        );
        if (approvalRes === false) return false;
      }

      let signature = await getSignature(buyerAccount, ...buyerOrder);
      if (signature === false) return false;

      if (signature) {
        let reqParams = {
          oOwner: ownerAccount,
          oBidStatus: "Bid",
          oBidPrice: ethers.utils.parseEther(bidPrice.toString()).toString(),
          oNFTId: nftID,
          oOrderId: orderID,
          oBidQuantity: Number(qty),
          oBuyerSignature: signature,
          oBidDeadline: deadline,
          tokenId: sellerOrder[2],
          tokenAddress: sellerOrder[1],
          salt: sellerOrder[10],
        };
        await createBidNft(reqParams);
        NotificationManager.success("Bid Placed Successfully");
        return true;
      }
    } catch (e) {
      console.log("error in api", e);
      NotificationManager.error("Error while creating bid");
      return false;
    }
  } catch (e) {
    NotificationManager.error("Error while creating bid");
    console.log("error in api", e);
    return false;
  }
};

export const handleRemoveFromAuction = async (
  orderId,
  account,
  erc721,
  LazyMintingStatus
) => {
  let marketplace;
  let options;
  try {
    marketplace = await exportInstance(
      contracts.MARKETPLACE,
      marketPlaceABI.abi
    );

    let order = await buildSellOrder(orderId);
    if (order === false) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      await DeleteOrder({
        orderId: orderId,
        isERC721: true,
      });
      slowRefresh(1000);
      return false;
    }
    if (!LazyMintingStatus) {
      let usrHaveQuantity = await GetOwnerOfToken(
        order[1],
        order[2],
        erc721 === 1 ? 1 : 2,
        order[0]
      );

      if (usrHaveQuantity === 0 || usrHaveQuantity === false) {
        NotificationManager.info(
          "Owner has been changed or order deleted",
          "",
          3000
        );
        let owners = [];
        let NFTcontract = await exportInstance(
          order[1],
          erc721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
        );

        if (erc721 === 1) {
          let owner = await NFTcontract.ownerOf(order[2]);
          owners.push({
            address: owner,
            quantity: 1,
          });
          await updateOwner({
            tokenID: order[2],
            collection: order[1],
            ownersData: owners,
          });
        } else {
          await checkOwnerChangeAndUpdate(
            usrHaveQuantity,
            order[3],
            order[2],
            order[1],
            order[0]
          );
        }
        try {
          await DeleteOrder({
            orderId: orderId,
            isERC721: true,
          });
          return true;
        } catch (e) {
          console.log("error in contract api call", e);
          return false;
        }
      }
    }

    let details = await getOrderDetails({ orderId: orderId });
    options = {
      from: account,
      gasLimit: 9000000,
      value: 0,
    };

    try {
      let checkCallStatic = await marketplace.callStatic.cancelOrder(
        order,
        details.oSignature,
        options
      );

      if (checkCallStatic) {
        let res = await marketplace.cancelOrder(
          order,
         
        );

        try {
          res = await res.wait();
          if (res.status === false) {
            NotificationManager.error("Transaction Failed");
            return false;
          }
        } catch (e) {
          if (e.code === "CALL_EXCEPTION") {
            if (e.toString().includes("Cancelled or complete")) {
              console.log("Order either completed or cancelled");
              await DeleteOrder({
                orderId: orderId,
                isERC721: true,
              });
              NotificationManager.error(
                "Transaction is Cancelled or Completed"
              );
              return false;
            }
          } else {
            if (e?.code === "ACTION_REJECTED" || e?.code === 4001) {
              NotificationManager.error("User denied ");
              return false;
            }
            NotificationManager.error("Transaction Failed");
            return false;
          }
        }
      }
    } catch (e) {
      console.log("error in call static", e, order, details.oSignature);
      if (e.reason === "Bad signature") {
        NotificationManager.error("Bad Signature");
        return false;
      }
      if (e.code === "CALL_EXCEPTION") {
        if (e.toString().includes("Cancelled or complete")) {
          console.log("Order either completed or cancelled");
          await DeleteOrder({
            orderId: orderId,
            isERC721: true,
          });
          NotificationManager.error("Transaction is Cancelled or Completed");
          return false;
        }
      } else {
        if (e?.code === "ACTION_REJECTED" || e?.code === 4001) {
          NotificationManager.error("User denied ");
          return false;
        }
        NotificationManager.error("Transaction Failed");
        return false;
      }
    }

    try {
      await DeleteOrder({
        orderId: orderId,
        isERC721: true,
      });
      NotificationManager.success("Removed from Auction successfully");
      return true;
    } catch (e) {
      console.log("error in contract function call", e);
      if (e.code === "ACTION_REJECTED" || e.code === 4001) {
        NotificationManager.error("User denied ");
        return false;
      }
      await DeleteOrder({
        orderId: orderId,
        isERC721: true,
      });
      NotificationManager.error("Order is either completed or cancelled");
      return false;
    }
  } catch (e) {
    console.log("error in contract function call", e);
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    NotificationManager.error("Error while Removing NFT from sale");
    return false;
  }
};

export const handleNftTransfer = async (
  collection,
  account,
  beneficiary,
  amount,
  tokenId,
  isERC721,
  nftId,
  ownedQuantity,
  orderId = false
) => {
  let options;
  let usrHaveQuantity;

  try {
    let nftContract;
    let res;

    try {
      usrHaveQuantity = await GetOwnerOfToken(
        collection,
        tokenId,
        isERC721,
        account
      );

      if (
        parseInt(usrHaveQuantity) === 0 ||
        usrHaveQuantity === false ||
        parseInt(usrHaveQuantity) < parseInt(amount)
      ) {
        NotificationManager.info("Something happened on this NFT", "", 3000);

        let owners = [];
        let NFTcontract = await exportInstance(
          collection,
          isERC721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
        );

        if (isERC721 === 1) {
          let owner = await NFTcontract.ownerOf(tokenId);
          owners.push({
            address: owner,
            quantity: 1,
          });
          await updateOwner({
            tokenID: tokenId,
            collection: collection,
            ownersData: owners,
          });
        } else {
          await checkOwnerChangeAndUpdate(
            usrHaveQuantity,
            amount,
            tokenId,
            collection,
            account
          );
        }
        return { res: false, hash: "" };
      }
    } catch (err) {
      console.log("err", err);
      return false;
    }
    try {
      if (isERC721 === 1) {
        nftContract = await exportInstance(collection, extendedERC721Abi.abi);
        options = {
          from: account,
          gasLimit: 9000000,
          value: 0,
        };
        res = await nftContract.transferFrom(
          account,
          beneficiary,
          tokenId,
          options
        );
      } else {
        nftContract = await exportInstance(collection, extendedERC1155Abi.abi);
        options = {
          from: account,
          gasLimit: 9000000,
          value: 0,
        };
        res = await nftContract.safeTransferFrom(
          account,
          beneficiary,
          tokenId,
          amount,
          [],
          options
        );
      }
    } catch (e) {
      console.log("e is ", e);
      let error = e.toString();
      if (error.includes("user rejected transaction")) {
        console.log("user rejected transaction");
        NotificationManager.error("User denied ");
        return false;
      }
      NotificationManager.error("Error while Transferring NFT");
      return false;
    }
    res = await res.wait();
    if (res.status === 0) {
      return false;
    } else {
      try {
        let reqParams = {
          nftId: nftId,
          sender: account,
          receiver: beneficiary,
          qty: amount,
        };
        if (orderId) {
          try {
            await DeleteOrder({
              orderId: orderId,
              isERC721: isERC721 === 1 ? true : false,
              ownedQty: ownedQuantity - amount,
            });
          } catch (e) {
            console.log("error in contract api call", e);
            return false;
          }
        }
        await TransferNfts(reqParams);
        NotificationManager.success("Nft Transferred Successfully", "", 1500);
        return true;
      } catch (e) {
        console.log("error in api", e);
        NotificationManager.error("Error while Transferring NFT");
        return false;
      }
    }
  } catch (e) {
    console.log("error in contract interaction", e);

    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    if (e.code === "CALL_EXCEPTION") {
      NotificationManager.error("Transaction is Cancelled or Completed");
      return false;
    } else {
      NotificationManager.error("Error while Transferring NFT");
      return false;
    }
  }
};

export const handleUpdateBidStatus = async (
  bidID,
  action,
  bidData,
  isERC721,
  LazyMintingStatus,
  keyword,
  account = ""
) => {
  try {
    let reqParams = {
      bidID: bidID,
      action: action,
    };

    let buyerOrder = await buildBuyerOrder(bidData);

    if (action === "Cancelled") {
      let result = await handleCancelOrder(
        buyerOrder,
        bidData.buyerSignature,
        bidID
      );
      if (result === false) {
        return false;
      }
    }

    let res = await updateBidNft(reqParams);

    NotificationManager.success(`${keyword} ${action} Successfully`);
    return true;
  } catch (e) {
    console.log("error in api", e);
    NotificationManager.error(`Error while ${action}ing ${keyword}`);
    return false;
  }
};

export const handleAcceptBids = async (
  bidData,
  isERC721,
  sellerUsername,
  nftTitle,
  LazyMintingStatus,
  nftData
) => {
  let order;
  let details;
  let options;
  let usrHaveQuantity;
  try {
    order = await buildSellOrder(bidData.orderId);
    if (order === false) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      await deleteBids({ bidID: bidData.bidId });
      slowRefresh(1000);
      return false;
    }
    details = await getOrderDetails({ orderId: bidData.orderId });
  } catch (e) {
    console.log("error in API", e);
    return false;
  }
  let buyerOrder = [];
  let sellerOrder = [];
  let amount = new BigNumber(bidData.bidPrice.toString())
    .multipliedBy(new BigNumber(bidData.bidQuantity.toString()))
    .toString();

  for (let key = 0; key < 11; key++) {
    switch (key) {
      case 0:
        sellerOrder.push(order[key]);
        buyerOrder.push(bidData.bidder);
        break;

      case 1:
        sellerOrder.push(order[key]);
        buyerOrder.push(order[key]);
        break;
      case 3:
        if (isERC721 === 1) {
          sellerOrder.push(order[key]);
          buyerOrder.push(order[key]);
        } else {
          sellerOrder.push(order[key]);
          buyerOrder.push(Number(bidData.bidQuantity));
        }

        break;
      case 5:
        sellerOrder.push(order[key]);
        buyerOrder.push(order[key]);
        break;
      case 6:
        buyerOrder.push(amount);
        sellerOrder.push(order[key]);

        break;
      case 7:
        buyerOrder.push(Number(bidData.oBidDeadline));
        sellerOrder.push(order[key]);

        break;
      case 8:
        sellerOrder.push([]);
        buyerOrder.push([]);
        break;
      case 9:
        sellerOrder.push([]);
        buyerOrder.push([]);
        break;
      default:
        sellerOrder.push(parseInt(parseInt(order[key])));
        buyerOrder.push(parseInt(parseInt(order[key])));
    }
  }

  if (!LazyMintingStatus) {
    usrHaveQuantity = await GetOwnerOfToken(
      sellerOrder[1],
      sellerOrder[2],
      isERC721,
      sellerOrder[0]
    );
    if (
      parseInt(usrHaveQuantity) === 0 ||
      usrHaveQuantity === false ||
      parseInt(usrHaveQuantity) < parseInt(buyerOrder[3])
    ) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      await deleteBids({ bidID: bidData.bidId });
      let owners = [];
      let NFTcontract = await exportInstance(
        sellerOrder[1],
        isERC721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
      );

      if (isERC721 === 1) {
        let owner = await NFTcontract.ownerOf(sellerOrder[2]);
        owners.push({
          address: owner,
          quantity: 1,
        });
        let result = await updateOwner({
          tokenID: sellerOrder[2],
          collection: sellerOrder[1],
          ownersData: owners,
        });
      } else {
        let result = await checkOwnerChangeAndUpdate(
          usrHaveQuantity,
          amount,
          sellerOrder[2],
          sellerOrder[1],
          sellerOrder[0]
        );
      }
      DeleteOrder({
        orderId: bidData.orderId,
        isERC721: isERC721 === 1 ? true : false,
        ownedQty: usrHaveQuantity,
      });
      return false;
    }
  }

  let sellerSignature = details.oSignature;
  let buyerSignature = bidData.buyerSignature;

  let NFTcontract = await exportInstance(
    sellerOrder[1],
    isERC721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
  );

  let approval = await NFTcontract.isApprovedForAll(
    sellerOrder[0],
    contracts.MARKETPLACE
  );

  if (!approval) {
    NotificationManager.error("Seller didn't approved marketplace");
    return false;
  }

  let paymentTokenData = await getPaymentTokenInfo(
    buyerOrder[0],
    buyerOrder[5]
  );

  if (
    new BigNumber(paymentTokenData.balance).isLessThan(
      new BigNumber(order[6].toString()).multipliedBy(
        new BigNumber(buyerOrder[3].toString())
      )
    )
  ) {
    NotificationManager.error("Buyer don't have enough Tokens");
    return false;
  }
  console.log(
    "sellerOrder sellerSignature  buyerOrder buyerSignature",
    sellerOrder,
    sellerSignature,
    buyerOrder,
    buyerSignature
  );
  try {
    let marketplace = await exportInstance(
      contracts.MARKETPLACE,
      marketPlaceABI.abi
    );
    let completeOrder;
    try {
      options = {
        from: sellerOrder[0],
        gasLimit: 9000000,
        value: 0,
      };

      let checkCallStatic;
      try {
        checkCallStatic = await marketplace.callStatic.completeOrder(
          sellerOrder,
          sellerSignature,
          buyerOrder,
          buyerSignature,
          options
        );
      } catch (e) {
        console.log("checkcall static", e);
        if (e.code === "CALL_EXCEPTION") {
          if (e.toString().includes("Cancelled or complete")) {
            console.log("Order either completed or cancelled");
            await deleteBids({ bidID: bidData.bidId });
            NotificationManager.error("Transaction is Cancelled or Completed");
            return false;
          }
        } else {
          NotificationManager.error("Transaction Failed");
          return false;
        }
        return;
      }

      if (checkCallStatic) {
        completeOrder = await marketplace.completeOrder(
          sellerOrder,
          sellerSignature,
          buyerOrder,
          buyerSignature,
          options
        );
        let req = {
          recordID: bidData.bidId,
          DBCollection: "Bids",
          hashStatus: 0,
          hash: completeOrder.hash,
        };

        try {
          await UpdateStatus(req);
        } catch (e) {
          console.log("error", e);
          return false;
        }

        completeOrder = await completeOrder.wait();
        let volume=await updateVolume({id:sellerOrder[1],price:new BigNumber(order[6].toString())
          .multipliedBy(new BigNumber(bidData.bidQuantity.toString()))
          .toString()})
        if (completeOrder.status === 0) {
          // NotificationManager.error("Transaction Failed");
          return false;
        }
      } else {
        console.log("error in check call static");
      }
    } catch (e) {
      console.log("error in contract", e);
      console.log("error in contract", e);
      if (e.code === "ACTION_REJECTED" || e.code === 4001) {
        NotificationManager.error("User denied ");
        return false;
      }
      NotificationManager.error("Error during accepting bid");
      return false;
    }
    try {
      let req = {
        recordID: bidData.bidId,
        DBCollection: "Bids",
        hashStatus: 1,
      };
      try {
        let updateRes = await UpdateStatus(req);
        if (updateRes === false) {
          console.log("data already inserted");
        }
      } catch (e) {
        NotificationManager.error("Error while accepting bid");
      }

      let reqParams = {
        bidID: bidData.bidId,
        erc721: isERC721 === 1 ? true : false,
        status: isERC721 ? 2 : 1,
        qty_sold: details.quantity_sold + bidData.bidQuantity,
        LazyMintingStatus: LazyMintingStatus,
      };

      await acceptBid(reqParams);

      try {
        try {
          if (isERC721 === 1) {
            DeleteOrder({ orderId: bidData.orderId, isERC721: true });
          } else {
            if (
              Number(details.quantity_sold) + Number(bidData.bidQuantity) >=
              details.oQuantity
            ) {
              DeleteOrder({
                orderId: bidData.orderId,
                isERC721: isERC721 === 1 ? true : false,
                ownedQty: usrHaveQuantity,
              });
            }
          }

          let historyMetaData = {
            nftId: bidData.nftId,
            userId: bidData.owner,
            action: "Bids",
            actionMeta: "Accept",
            message: `Bid accepted for ${bidData.bidQuantity} of ${
              details.oQuantity
            } editions at ${convertToEth(bidData.bidPrice)} ${
              paymentTokenData.symbol
            } by ${sellerUsername}`,
            created_ts: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            hash: completeOrder.transactionHash,
          };

          await InsertHistory(historyMetaData);
        } catch (e) {
          console.log("error in updating order data", e);
          NotificationManager.error("Error while accepting bid");
          return false;
        }
      } catch (e) {
        NotificationManager.error("Error while accepting bid");
        console.log("error in history api", e);
        return false;
      }
      // window.location.reload();
    } catch (e) {
      console.log("error in api", e);
      NotificationManager.error("Error while accepting bid");
      return false;
    }
  } catch (e) {
    console.log("error in contract function calling", e);
    // NotificationManager.error("Something went wrong ");
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    NotificationManager.error("Error while accepting bid");
    return false;
  }
  await handleUpdateBidStatus(
    bidData.bidId,
    "Accepted",
    bidData,
    isERC721,
    LazyMintingStatus,
    "Bid"
  );
  return true;
};

export const handleApproveToken = async (userAddress, tokenAddress) => {
  try {
    let token = await exportInstance(tokenAddress, erc20Abi);
    let options;

    options = {
      from: userAddress,
      gasLimit: 9000000,
      value: 0,
    };
    let res = await token.approve(
      contracts.MARKETPLACE,
      MAX_ALLOWANCE_AMOUNT,
      options
    );
    res = await res.wait();
    if (res.status === 1) {
      NotificationManager.success("Approved");
      return res;
    }
  } catch (e) {
    console.log("error in contract function calling", e);
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
  }
};

//Make Offer

export const createOffer = async (
  nftID,
  orderID,
  ownerAccount,
  buyerAccount,
  erc721,
  qty = 1,
  bidPrice,
  nftData,
  oldBidData = {}
) => {
  let details = await getOrderDetails({ orderId: orderID });
  if (Object.keys(details).length === 0) {
    NotificationManager.error("Order Is Canceled or completed");
    return false;
  }
  let buyerOrder = [];
  const d = new Date();
  let seconds = d.getSeconds();
  const deadline = GENERAL_TIMESTAMP + seconds;
  let salt = Math.round(Math.random() * 10000000);
  let amount = new BigNumber(
    ethers.utils.parseEther(bidPrice.toString()).toString()
  )
    .multipliedBy(new BigNumber(qty.toString()))
    .toString();
  try {
    for (let index = 0; index < 11; index++) {
      switch (index) {
        case 0:
          buyerOrder.push(buyerAccount);
          break;
        case 1:
          buyerOrder.push(nftData.nCollection);
          break;
        case 2:
          buyerOrder.push(nftData.nTokenID);
          break;
        case 3:
          buyerOrder.push(Number(qty));
          break;

        case 4:
          buyerOrder.push(Number(1));
          break;
        case 5:
          buyerOrder.push(contracts.USDT);
          break;
        case 6:
          buyerOrder.push(amount.toString());

          break;
        case 7:
          buyerOrder.push(Number(deadline));

          break;
        case 8:
          buyerOrder.push([]);
          break;
        case 9:
          buyerOrder.push([]);
          break;
        case 10:
          buyerOrder.push(salt);
          break;
        default:
          buyerOrder.push([]);
      }
    }

    if (!isEmptyObject(oldBidData)) {
      let amount = new BigNumber(
        oldBidData?.oBidPrice?.$numberDecimal.toString()
      )
        .multipliedBy(new BigNumber(oldBidData?.oBidQuantity.toString()))
        .toString();
      let oldBuyerOrder = [];
      if (oldBidData.oBidStatus === "MakeOffer") {
        for (let key = 0; key < 11; key++) {
          switch (key) {
            case 0:
              oldBuyerOrder.push(buyerAccount);
              break;

            case 1:
              oldBuyerOrder.push(oldBidData?.tokenAddress);
              break;
            case 2:
              oldBuyerOrder.push(oldBidData?.tokenId);
              break;
            case 3:
              oldBuyerOrder.push(oldBidData?.oBidQuantity);
              break;
            case 4:
              oldBuyerOrder.push(1);

              break;
            case 5:
              oldBuyerOrder.push(oldBidData?.paymentToken);
              break;
            case 6:
              oldBuyerOrder.push(amount);

              break;
            case 7:
              oldBuyerOrder.push(oldBidData?.oBidDeadline);

              break;
            case 8:
              oldBuyerOrder.push([]);
              break;
            case 9:
              oldBuyerOrder.push([]);
              break;
            default:
              oldBuyerOrder.push(parseInt(oldBidData?.salt));
          }
        }
      }
      let cancelOrder = await handleCancelOrder(
        oldBuyerOrder,
        oldBidData?.oBuyerSignature,
        oldBidData._id
      );
      if (cancelOrder === false) {
        return false;
      }
    }

    let userTokenBal = await getUsersTokenBalance(buyerOrder[0], buyerOrder[5]);

    if (
      new BigNumber(bidPrice)
        .multipliedBy(new BigNumber(qty.toString()))
        .isGreaterThan(new BigNumber(convertToEth(userTokenBal).toString()))
    ) {
      NotificationManager.error("User don't have sufficient token balance");
      return false;
    }

    try {
      let paymentData = await getPaymentTokenInfo(buyerAccount, buyerOrder[5]);
      let allowance = paymentData.allowance.toString();
      if (
        new BigNumber(allowance).isLessThan(new BigNumber(amount).toString())
      ) {
        let approvalRes = await handleApproveToken(
          buyerOrder[0],
          buyerOrder[5]
        );
        if (approvalRes === false) return false;
      }

      let signature = await getSignature(buyerAccount, ...buyerOrder);
      if (signature === false) return false;
      if (signature) {
        let reqParams = {
          oOwner: ownerAccount,
          oBidStatus: "MakeOffer",
          oBidPrice: ethers.utils.parseEther(bidPrice.toString()).toString(),
          oNFTId: nftID,
          oOrderId: orderID,
          oBidQuantity: Number(qty),
          oBuyerSignature: signature,
          oBidDeadline: Number(deadline),
          isOffer: true,
          salt: salt,
          tokenId: buyerOrder[2],
          tokenAddress: buyerOrder[1],
          paymentToken: contracts.USDT,
        };
        let response = await createOfferNFT(reqParams);
        if (
          !response ||
          (Object.keys(response).length === 0 &&
            Object.getPrototypeOf(response) === Object.prototype)
        ) {
          NotificationManager.error("Error while creating offer");
        } else {
          NotificationManager.success("Offer Placed Successfully");
        }
        return true;
      }
    } catch (e) {
      NotificationManager.error("Error while creating offer");
      console.log("error in api1", e);
      return false;
    }
  } catch (e) {
    NotificationManager.error("Error while creating offer");
    console.log("error in api2", e);
    return false;
  }
};

export const handleAcceptOffers = async (
  bidData,
  isERC721,
  sellerUsername,
  LazyMintingStatus,
  nftData,
  account
) => {
  let details;
  let options;
  let usrHaveQuantity;
  let completeOrder;
  let checkCallStatic;
  let buyerOrder = [];
  let sellerOrder = [];
  let amount = new BigNumber(bidData.bidPrice.toString())
    .multipliedBy(new BigNumber(bidData.bidQuantity.toString()))
    .toString();

  try {
    details = await getOrderDetails({ orderId: bidData.orderId });
  } catch (e) {
    console.log("error in API", e);
    return;
  }

  for (let key = 0; key < 11; key++) {
    switch (key) {
      case 0:
        sellerOrder.push(account);
        buyerOrder.push(bidData.bidder);
        break;
      case 1:
        sellerOrder.push(nftData.nCollection);
        buyerOrder.push(nftData.nCollection);
        break;
      case 2:
        sellerOrder.push(nftData.nTokenID);
        buyerOrder.push(nftData.nTokenID);
        break;
      case 3:
        if (isERC721) {
          sellerOrder.push(Number(bidData.bidQuantity));
          buyerOrder.push(Number(bidData.bidQuantity));
        } else {
          sellerOrder.push(Number(bidData.bidQuantity));
          buyerOrder.push(Number(bidData.bidQuantity));
        }
        break;
      case 4:
        sellerOrder.push(1);
        buyerOrder.push(1);
        break;
      case 5:
        sellerOrder.push(contracts.USDT);
        buyerOrder.push(contracts.USDT);
        break;
      case 6:
        if (isERC721 === 1) {
          buyerOrder.push(bidData.bidPrice.toString());
          sellerOrder.push(amount.toString());
        } else {
          buyerOrder.push(amount.toString());
          sellerOrder.push(bidData.bidPrice.toString());
        }
        break;
      case 7:
        buyerOrder.push(Number(bidData.oBidDeadline));
        sellerOrder.push(Number(bidData.oBidDeadline));
        break;
      case 8:
        sellerOrder.push([]);
        buyerOrder.push([]);
        break;
      case 9:
        sellerOrder.push([]);
        buyerOrder.push([]);
        break;
      default:
        sellerOrder.push(bidData.salt);
        buyerOrder.push(bidData.salt);
    }
  }

  if (!LazyMintingStatus) {
    usrHaveQuantity = await GetOwnerOfToken(
      sellerOrder[1],
      sellerOrder[2],
      isERC721,
      sellerOrder[0]
    );
    if (
      parseInt(usrHaveQuantity) === 0 ||
      usrHaveQuantity === false ||
      parseInt(usrHaveQuantity) < parseInt(buyerOrder[3])
    ) {
      NotificationManager.info("Something happened on this NFT", "", 3000);
      await deleteBids({ bidID: bidData.bidId });
      let owners = [];
      let NFTcontract = await exportInstance(
        sellerOrder[1],
        isERC721 === 1 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
      );

      if (isERC721 === 1) {
        let owner = await NFTcontract.ownerOf(sellerOrder[2]);
        owners.push({
          address: owner,
          quantity: 1,
        });
        await updateOwner({
          tokenID: sellerOrder[2],
          collection: sellerOrder[1],
          ownersData: owners,
        });
      } else {
        await checkOwnerChangeAndUpdate(
          usrHaveQuantity,
          amount,
          sellerOrder[2],
          sellerOrder[1],
          sellerOrder[0]
        );
      }
      return false;
    }
  }

  let buyerSignature = bidData.buyerSignature;
  let NFTcontract = await exportInstance(
    sellerOrder[1],
    isERC721 ? extendedERC721Abi.abi : extendedERC1155Abi.abi
  );

  let approval = await NFTcontract.isApprovedForAll(
    sellerOrder[0],
    contracts.MARKETPLACE
  );

  if (!approval) {
    NotificationManager.error("Seller didn't approved marketplace");
    return false;
  }

  let paymentTokenData = await getPaymentTokenInfo(
    buyerOrder[0],
    buyerOrder[5]
  );

  if (
    new BigNumber(paymentTokenData.balance).isLessThan(
      new BigNumber(buyerOrder[6].toString()).multipliedBy(
        new BigNumber(buyerOrder[3].toString())
      )
    )
  ) {
    NotificationManager.error("Buyer don't have enough Tokens");
    return false;
  }
  try {
    let marketplace = await exportInstance(
      contracts.MARKETPLACE,
      marketPlaceABI.abi
    );

    try {
      options = {
        from: sellerOrder[0],
        gasLimit: 9000000,
        value: 0,
      };
      try {
        checkCallStatic = await marketplace.callStatic.completeOrder(
          sellerOrder,
          buyerSignature,
          buyerOrder,
          buyerSignature,
          options
        );
      } catch (e) {
        console.log("checkcall static", e);
        if (e.code === "CALL_EXCEPTION") {
          if (e.toString().includes("Cancelled or complete")) {
            console.log("Order either completed or cancelled");
            await deleteBids({ bidID: bidData.bidId });
            NotificationManager.error("Transaction is Cancelled or Completed");
            return false;
          }
        } else {
          NotificationManager.error("Transaction Failed");
          return false;
        }
        return false;
      }

      if (checkCallStatic) {
        completeOrder = await marketplace.completeOrder(
          sellerOrder,
          buyerSignature,
          buyerOrder,
          buyerSignature,
          options
        );

        let req = {
          recordID: bidData.bidId,
          DBCollection: "Bids",
          hashStatus: 0,
          hash: completeOrder.hash,
        };

        try {
          await UpdateStatus(req);
        } catch (e) {
          console.log("error", e);
          return false;
        }

        completeOrder = await completeOrder.wait();
        let volume=await updateVolume({id:sellerOrder[1],price:new BigNumber(buyerOrder[6].toString())
          .multipliedBy(new BigNumber(bidData?.bidQuantity.toString()))
          .toString()})
        if (completeOrder.status === 0) {
          return false;
        }
      }
    } catch (e) {
      console.log("error in contract", e);
      if (e.code === "ACTION_REJECTED" || e.code === 4001) {
        NotificationManager.error("User denied ");
        return false;
      }
      NotificationManager.error("Error while accepting offer");
      return false;
    }
    try {
      let req = {
        recordID: bidData.bidId,
        DBCollection: "Bids",
        hashStatus: 1,
      };
      try {
        let updateRes = await UpdateStatus(req);
        if (updateRes === false) {
          console.log("data already inserted");
        }
      } catch (e) {
        NotificationManager.error("Error while accepting offer");
        return false;
      }

      let reqParams = {
        bidID: bidData.bidId,
        erc721: isERC721,
        status: isERC721 ? 2 : 1,
        qty_sold: details.quantity_sold + bidData.bidQuantity,
        LazyMintingStatus: LazyMintingStatus,
      };
      await checkBidOffer(bidData.bidId);
      await acceptOffer(reqParams);
      try {
        let historyMetaData = {
          nftId: bidData.nftId,
          userId: bidData.owner,
          action: "Offers",
          actionMeta: "Accept",
          message: `Offer accepted for ${bidData.bidQuantity} of ${
            details.oQuantity
          } editions at ${convertToEth(bidData.bidPrice)} ${
            paymentTokenData.symbol
          } by ${sellerUsername}`,
          created_ts: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          hash: completeOrder.transactionHash,
        };

        await InsertHistory(historyMetaData);
        try {
          if (isERC721 === 1) {
            DeleteOrder({ orderId: bidData.orderId, isERC721: true });
          } else {
            if (
              Number(details.quantity_sold) + Number(bidData.bidQuantity) >=
              details.oQuantity
            ) {
              DeleteOrder({
                orderId: bidData.orderId,
                isERC721: isERC721 === 1 ? true : false,
                ownedQty: usrHaveQuantity,
              });
            }
          }
        } catch (e) {
          console.log("error in updating order data", e);
          NotificationManager.error("Error while accepting offer");
          return false;
        }
      } catch (e) {
        console.log("error in history api", e);
        NotificationManager.error("Error while accepting offer");
        return false;
      }
    } catch (e) {
      console.log("error in api", e);
      NotificationManager.error("Error while accepting offer");
      return false;
    }
  } catch (e) {
    console.log("error in contract function calling", e);
    if (e.code === "ACTION_REJECTED" || e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    NotificationManager.error("Error while accepting offer");
    return false;
  }
  NotificationManager.success("Offer Accepted Successfully");
  return true;
};

export const handleCancelOrder = async (order, signature, bidId) => {
  let cancelOrder;
  let options;
  let checkCallStatic;
  let marketplace = await exportInstance(
    contracts.MARKETPLACE,
    marketPlaceABI.abi
  );

  try {
    options = {
      from: order[0],
      value: 0,
    };

    try {
      checkCallStatic = await marketplace.callStatic.cancelOrder(
        order,
        signature,
        options
      );

      if (checkCallStatic) {
        try {
          cancelOrder = await marketplace.cancelOrder(
            order,
            signature,
            options
          );
        } catch (e) {
          console.log("e is", e.code, e);
          if (e.code === "ACTION_REJECTED" || e.code === 4001) {
            NotificationManager.error("User denied ");
            return false;
          }
          NotificationManager.error("Error while cancelling order");
          return false;
        }
        try {
          let res = await cancelOrder.wait();
          if (res.status === false) {
            NotificationManager.error("Transaction Failed");
            return false;
          }
        } catch (e) {
          if (e.code === "CALL_EXCEPTION") {
            if (e.toString().includes("Cancelled or complete")) {
              console.log("Order either completed or cancelled");
              await deleteBids({ bidID: bidId });
              NotificationManager.error(
                "Transaction is Cancelled or Completed"
              );
              return false;
            }
          } else {
            NotificationManager.error("Transaction Failed");
            return false;
          }
        }
      }
    } catch (e) {
      console.log("error in call static", e, order, signature);
      if (e.reason === "Bad signature") {
        NotificationManager.error("Bad Signature");
        return false;
      }
      if (e.code === "CALL_EXCEPTION") {
        if (e.toString().includes("Cancelled or complete")) {
          console.log("Order either completed or cancelled");
          await deleteBids({ bidID: bidId });
          NotificationManager.error("Transaction is Cancelled or Completed");
          return false;
        }
      } else {
        NotificationManager.error("Transaction Failed");
        return false;
      }
    }
  } catch (e) {
    console.log("error in cancel order", e);
    if (e.toString().includes("Cancelled or complete")) {
      console.log("Order either completed or cancelled");
      await deleteBids({ bidID: bidId });
      NotificationManager.error("Transaction is Cancelled or Completed");
      return false;
    }
    NotificationManager.error("Error while cancelling order");
    return false;
  }
};

export const checkOwnerChangeAndUpdate = async (
  original,
  owned,
  tokenID,
  collection,
  currentUser
) => {
  console.log(
    "update owner called",
    original,
    owned,
    parseInt(owned) !== parseInt(original)
  );
  if (
    parseInt(window.sessionStorage.getItem("chain_id")) ===
    parseInt(process.env.REACT_APP_CHAIN_ID)
  ) {
    let reqParam = {
      tokenID: tokenID,
      collection: collection,
      owner: currentUser,
      qty: original,
    };
    if (parseInt(owned) !== parseInt(original)) {
      console.log("hhh");
      await checkOwnerChange(reqParam);
      return true;
    }
  }
  return false;
};

export const sign = async () => {
  try {
    let provider = await getCurrentProvider();
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let rawMessage = USER_MESSAGE;
    const signature = await signer.signMessage(rawMessage);
    const messageSender = ethers.utils.verifyMessage(rawMessage, signature);
    return signature;
  } catch (e) {
    console.log("err", e);
    if (e.code === "ACTION_REJECTED") {
      NotificationManager.error("messages.userDenied");
      return false;
    }
  }
};
