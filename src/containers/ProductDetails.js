import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import Page404 from "./Page404";
const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { id, title, img, content } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost/ApiRedux/blogs.php/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (

<>
    {sessionStorage.getItem("username")!== null?



    <div className="ui grid container mt-5">
      {product.length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="contener">
          <div className="ui two column stackable center aligned grid">
            
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={img} />
              </div>
              <div className="column rp">
                <h4 style={{marginTop:"12px"}}>Title</h4>
                <input type='text' className="ui brown block header" value={title}/>
                <h4>Content</h4>
                <input type='text' className="ui brown block header" value={content}/>
                <h4>Image</h4>
                <input type='file' className="ui brown block header" />
               <br/>    <br/>    <br/>    <br/>
                <button className="btn btn-info">Apply edits</button>
              </div>
              
            </div>
            
          </div>
        </div>
      )
      
      
      }
    </div>
:<Page404/>}
   </> 
  );
};

export default ProductDetails;
