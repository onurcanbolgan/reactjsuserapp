import React, {Component} from 'react';
import PropTypes from "prop-types";
import UserConsumer from "../context";
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class User extends Component {
    state = {
        isVisible: false
    }

    onClickEvent = () => {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }
    onDeleteUser = async (dispatch) => {
        const {id} = this.props;
        //Delete request
        await axios.delete(`http://localhost:3004/users/${id}`)
        // Consumer Dispatch
        dispatch({type: "DELETE_USER",payload:id});
    }

    componentWillUnmount() {
        console.log("component will unmount")
    }

    render() {
        //Destructing
        const {id,name,department,salary} = this.props;
        const {isVisible} = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="col-md-12 mb-4  justify-content-center">
                                <div className="card" style={isVisible ? {backgroundColor:"#464f52",color:"white" } : {backgroundColor:"#292d2e",color:"white"}}>
                                        <div className="card-header d-flex justify-content-between">
                                            <div className="w-100" onClick={this.onClickEvent}>
                                                <h4 className="d-inline">{name}</h4>
                                            </div>
                                            <i className="fa fa-trash" style={{cursor: "pointer"}} onClick={this.onDeleteUser.bind(this,dispatch)}></i>
                                        </div>
                                    {
                                        isVisible ?
                                            <div className="card-body">
                                                <p className="card-text">Department: {department}</p>
                                                <p className="card-text">Salary: {salary}</p>
                                                <Link to={`edit/${id}`} className={'btn btn-dark btn-block'}>Update User</Link>
                                            </div>
                                            : null
                                    }

                                </div>
                            </div>
                        );
                    }
                }

            </UserConsumer>
        )
    }
}

User.defaultProps = {
    name: "No Info",
    salary: "No Info",
    department: "No Info",

}
User.propTypes = {
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}
export default User;