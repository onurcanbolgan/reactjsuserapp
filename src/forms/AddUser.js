import React, {Component} from 'react';
import posed from 'react-pose';
import UserConsumer from "../context";
import '../App.css';
import axios from "axios";

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block",
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none",
            backgroundColor:"#292d2e"
        }
    }
});

class AddUser extends Component {
    state = {
        visible: false,
        inputs: {
            name: "",
            department: "",
            salary: ""
        },
        errors: {
            name: false,
            department: false,
            salary: false
        }
    }

    changeVisibility = () => {
        this.setState({
            visible: !this.state.visible
        });
    }
    changeInput = (e) => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: false
            }
        })
    }

    handleOnBlur = (e) => {
        const { inputs } = this.state;
        if (inputs[e.target.name].length === 0) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    [e.target.name]: true
                }
            });
        }
    };


    addUser = async (dispatch,e) => {
        e.preventDefault();
        const {inputs} = this.state;

        let newErrorsObj = Object.entries(inputs)
            .filter(([key, value]) => {
                return value.length === 0;
            })
            .reduce((obj, [key, value]) => {
                obj[key] = value.length === 0;
                return obj;
            }, {});

        if (Object.keys(newErrorsObj).length > 0) {
            this.setState({
                errors: newErrorsObj
            });
        }else{

            // Add User
            const newUser = {
                name: inputs.name,
                department: inputs.department,
                salary: inputs.salary
            }
            const response = await axios.post('http://localhost:3004/users/',newUser);

            dispatch({type: "ADD_USER",payload: response.data})

            // Redirect
            this.props.history.push('/');
        }
    }
    render() {
        const {visible,inputs,errors} = this.state;
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-8">
                            <button onClick={this.changeVisibility} className="btn  btn-block mb-2" style={visible ? {backgroundColor:"#464f52",color:"white" } : {backgroundColor:"#292d2e",color:"white"}}>{visible ? "Show" : "Hide"}</button>
                            <Animation pose={visible ? "hidden": "visible"}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Add User</h4>
                                        <div className="card-body">
                                            <form onSubmit={this.addUser.bind(this,dispatch)}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" value={inputs.name} className={errors.name ? "form-control is-invalid" : "form-control" } name="name" id="name" placeholder="Enter name" onChange={this.changeInput} onBlur={this.handleOnBlur}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="department">Department</label>
                                                    <input type="text" value={inputs.department} className={errors.department ? "form-control is-invalid" : "form-control" } name="department" id="department" placeholder="Enter department" onChange={this.changeInput} onBlur={this.handleOnBlur}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary</label>
                                                    <input type="text" value={inputs.salary} className={errors.salary ? "form-control is-invalid" : "form-control" } name="salary" id="salary" placeholder="Enter salary" onChange={this.changeInput} onBlur={this.handleOnBlur}/>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">Add User</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    );

                }
            }
        </UserConsumer>
    }
}

export default AddUser;