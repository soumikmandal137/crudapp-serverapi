import { useQuery } from "@tanstack/react-query";
import API from "../../api/Axiosintance";

export const productList = (page = 1, perpage = 5) => {
  return useQuery({
    queryKey: ["productList", page, perpage],
    queryFn: async () => {
      const response = await API.post("/product/list", { page, perpage });
      console.log("find", response);

      return response?.data;
    },
    keepPreviousData: true,
  });
};

export const productbyid = (id) => {
  return useQuery({
    queryKey: ["productbyid", id],
    queryFn: async () => {
      const response = await API.get(`/product/detail/${id}`);

      return response?.data;
    },

    enabled: !!id,
  });
};


export const productbydelete =(id) =>{
  return useQuery({
    queryKey:["productbydelete",id],
    queryFn: async () =>{
      const response = await API.get(`/product/remove/${id}`);
      console.log("response==========",response);
      
      return response.data;
      
    },
    enabled: !!id,
  });
};