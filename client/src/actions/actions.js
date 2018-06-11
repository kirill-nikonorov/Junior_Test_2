import * as types from "../constants/constants"
import axios from "axios"
import qs from "qs";

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
export const postNewCompany = ({data}) => (dispath) => {
    axios.post("http://doc.konnex.us/public/companies/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then((responce) => {
            console.log(responce);

        })

        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });

};



export const authUser = () => ({
    type: types.AUTH_USER
});

