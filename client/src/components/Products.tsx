import { getAllProduct } from '../store/reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

export default function Products() {
    const data=useSelector(state=>{
        console.log(11111,state);
    })
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllProduct());
    },[])
  return (
    <div>Products
      <table>
        
      </table>
    </div>
  )
}
