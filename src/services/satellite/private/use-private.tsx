import axios from "axios";

const useAxios = () => {
const {token, setUser, setToken} = useContext(AuthContext);
 const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BASE_URL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});
};
export default useAxios;