// const URL = "https://r2sbackend-1.onrender.com/"
const URL = "http://192.168.1.151:5000/"

export const singIn = `${URL}chauffeur/login`

export  const driverDataApi = `${URL}chauffeur/oneChauffeur`
export const  childrenApi = `${URL}chauffeur/getEnfants`
export const saveRapportDriver = `${URL}chauffeur/saveRapport`
export const getRapport = `${URL}chauffeur/getRapport`
export const updatePassword = `${URL}chauffeur/updatePassword`
export const updateInfoDriver = `${URL}chauffeur/updateDriver`
//bus
export const singInBu = `${URL}ecole/loginBus`
export const getOneBus = `${URL}ecole/getOneBus`
export const getChildBus = `${URL}ecole/getChildrenOneBus`
export const saveRapport = `${URL}ecole/saveRapport`
