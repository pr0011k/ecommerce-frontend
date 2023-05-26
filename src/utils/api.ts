import ky from 'ky';
import { productType, reviewListType } from './types';

export const getallProductsApi = async() => {
    const response = await ky
        .get(`${BASEURL}/products`)
        .json<productType[]>()
    return response;
}

export const ReviewDetail = async(productId:any) => {
    const response = await ky
    .get(`${BASEURL}/products/${productId}`)
    .json<reviewListType[]>()

    return response;
}

export const ProductDetail = async(productName:any) => {
    const response = await ky
    .get(`${BASEURL}/products?searchName=${productName}`)
    .json<productType[]>()

    return response;
}


export const BASEURL = 'http://ec2-3-145-145-137.us-east-2.compute.amazonaws.com:4400';