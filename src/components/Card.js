
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        //console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <div  className="card mt-3 ">
      <div className="card mt-3 " style={{"width": "auto", "maxHeight": "320px", objectFit : "fill"}}>
  <img src={props.ImgSrc} className="card-img-top" alt="..." style={{"height" : "180px", objectFit : "fill"}} />
  <div className="card-body">
    <h5 className="card-title">{props.foodName}</h5>
    <div className="container w-100 "></div>
    <select className="m-2 h-100 bg-primary rounded" onChange={(e)=>setQty(e.target.value)}>
      {Array.from(Array(10), (e,i)=>{
        return (
          <option key={i+1} value={i+1}> {i+1} </option>
        )
      })}
    </select>
    <select  className="m-2 h-100 bg-primary rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
      {priceOptions.map((data)=>{
        return <option key={data} value={data}>{data}  </option>
      })}
    </select>
    <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
  </div>
</div>
<hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart} >Add to Cart</button>
      </div>
    </div>
  )
}
