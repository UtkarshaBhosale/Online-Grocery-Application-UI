import { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const AssignDeliveryToOrders = () => {
  const [orderId, setOrderId] = useState("");
  const [allOrderData, setAllOrderData] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);

  const [assignDelivery, setAssignDelivery] = useState({
    orderId: "",
    deliveryId: "",
  });

  const handleInput = (e) => {
    setAssignDelivery({ ...assignDelivery, [e.target.name]: e.target.value });
  };

  const retrieveAllDeliveryPerson = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/deliveryperson/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllDeliveryPerson = async () => {
      const allDeliveryStatus = await retrieveAllDeliveryPerson();
      if (allDeliveryStatus) {
        setDeliveryPersons(allDeliveryStatus);
      }
    };

    getAllDeliveryPerson();
  }, []);

  const getAllOrder = async () => {
    const allOrder = await retrieveAllOrder();
    if (allOrder) {
      setAllOrderData(allOrder);
    }
  };

  const retrieveAllOrder = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/admin/showorder?orderId=" + orderId
    );
    console.log(response.data);
    return response.data;
  };

  const searchOrderById = (e) => {
    getAllOrder();
    setOrderId("");
    e.preventDefault();
  };

  const assignDeliveryToOrders = (e) => {
    fetch("http://localhost:8080/api/user/admin/order/assignDelivery", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignDelivery),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log("response", res);
        setAllOrderData({
          orderId: "",
          deliveryId: "",
        });

        setAllOrderData(res);
      });
    });

    e.preventDefault();
  };

  return (
    <div>
      <div
        className="card form-card mt-1 ms-2 me-2 mb-2 custom-bg border-color"
        style={{
          height: "35rem",
        }}
      >
        <div className="card-header text-center bg-color custom-bg-text">
          <h4>Search Customer Orders</h4>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <form class="row g-3">
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Enter Order Id..."
                onChange={(e) => setOrderId(e.target.value)}
                value={orderId}
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn bg-color custom-bg-text mb-3"
                onClick={searchOrderById}
              >
                Search
              </button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Street</th>
                  <th scope="col">City</th>
                  <th scope="col">Pin code</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">Order Date</th>
                  
                </tr>
              </thead>
              <tbody class="text-color">
                {allOrderData.map((orderData) => {
                  return (
                    <tr>
                      <td>
                        <b>{orderData.orderId}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            orderData.productImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{orderData.productName}</b>
                      </td>
                      <td>
                        <b>{orderData.productDescription}</b>
                      </td>
                      <td>
                        <b>{orderData.quantity}</b>
                      </td>
                      <td>
                        <b>{orderData.totalPrice}</b>
                      </td>
                      <td>
                        <b>{orderData.userName}</b>
                      </td>
                      <td>
                        <b>{orderData.address.street}</b>
                      </td>

                      <td>
                        <b>{orderData.address.city}</b>
                      </td>
                      <td>
                        <b>{orderData.address.pincode}</b>
                      </td>
                      <td>
                        <b>{orderData.userPhone}</b>
                      </td>
                      <td>
                        <b>{orderData.orderDate}</b>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AssignDeliveryToOrders;
