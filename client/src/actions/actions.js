import * as types from "../constants/constants"
import axios from "axios"
/*
export const fetchCompanies = () => {
    axios.get('http://doc.konnex.us/public/companies/',
        {
            params: {
                page: 2,
                page_size: 50
            }
        })
        .then((responce) => {
            console.log(responce.data.results)
        })
        .catch((error) => {
            console.log(error)

        })
    return {
        type: types.,
        companies: []
    }
};*/
export const fetchIndustries = () => (dispath) => {
    axios.get('http://doc.konnex.us/industries/', {
        params: {
            page_size: 100
        }
    })
        .then((responce) => {
            //console.log(responce.data.results);
            dispath({
                type: types.FETCH_INDUSTRIES,
                industries: responce.data.results
            })
        })
        .catch((error) => {
            console.log(error)
        });

};
export const fetchSubIndustries = (industryId) => (dispath) => {
    axios.get(`http://doc.konnex.us/industries/${industryId}/sub_industries/`,
        {
            params: {
                page_size: 100
            }
        })
        .then((responce) => {
            dispath({
                type: types.FETCH_SUB_INDUSTRIES,
                industryId,
                subIndustries: responce.data.results
            })
        })
        .catch((error) => {
            console.log(error)
        });

};

export const authUser = () => ({
    type: types.AUTH_USER
});

