import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant"
import { Link } from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react';

const Restaurants = props => {
    const initialRestaurantState = {
        id: null,
        name: "",
        address: {},
        cuisine: "",
        reviews: []
    };

    const { user, isAuthenticated } = useAuth0;

    // console.log('props.user', props.user);

    // console.log('user', user);
    // if(user !== ""){
    //   if(user.name  === review.email){

    //   }
    // }
    

    const [restaurant, setRestaurant] = useState(initialRestaurantState);

    // var usersEmail = props.user.email;


    const getRestaurant = id => {
        RestaurantDataService.get(id)
            .then(response => {
                setRestaurant(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getRestaurant(props.match.params.id);
    }, [props.match.params.id]);

    const deleteReview = (reviewId, index) => {
        RestaurantDataService.deleteReview(reviewId, props.user.email)
            .then(response => {
                setRestaurant((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
          {restaurant ? (
            <div>
              <h5>{restaurant.name}</h5>
              <p>
                <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
              </p>
              <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
                Add Review
              </Link>
              <h4> Reviews </h4>
              <div className="row">
                {restaurant.reviews.length > 0 ? (
                 restaurant.reviews.map((review, index) => {
                   return (
                     <div className="col-lg-4 pb-1" key={index}>
                       <div className="card">
                         <div className="card-body">
                           <p className="card-text">
                             {review.text}<br/>
                             <strong>User: </strong>{review.name}<br/>
                             <strong>Date: </strong>{review.date}
                           </p>
                           <div className="row">
                             { props.user ? (
                              <div>
                                { props.user.name  == review.user_email &&
                                <div> 
                                <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                <Link to={{
                                  pathname: "/restaurants/" + props.match.params.id + "/review",
                                  state: {
                                    currentReview: review
                                  }
                                }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>    
                                </div>              
                               }
                              </div>
                             ) : (
                               <p></p>
                             )}
                           </div>
                         </div>
                       </div>
                     </div>
                   );
                 })
                ) : (
                <div className="col-sm-4">
                  <p>No reviews yet.</p>
                </div>
                )}
    
              </div>
    
            </div>
          ) : (
            <div>
              <br />
              <p>No restaurant selected.</p>
            </div>
          )}
        </div>
    );
}

export default Restaurants;