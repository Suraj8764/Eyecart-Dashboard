import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProductContext = createContext();

export const SingleProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        try {
          const { data } = await axios.get(`/api/products/${id}`);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
      fetchProduct();
    }

    
  }, [id]); // Make sure to include id in the dependency array

  return (
    <SingleProductContext.Provider value={product}>
      {children}
    </SingleProductContext.Provider>
  );
};

export const useSingleProduct = () => {
  return useContext(SingleProductContext);
};
