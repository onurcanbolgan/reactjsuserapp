import React, {Component} from 'react';
import UserConsumer from "../context";
import axios from 'axios';
import '../App.css';

class UpdateUser extends Component {
    state = {
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


    componentDidMount = async () => {
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`)

        const inputs = response.data;

        this.setState({
            inputs:inputs
        });
    }


    updateUser = async (dispatch,e) => {
        const {inputs} = this.state;
        e.preventDefault();

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
            const updatedUser = {
                name: inputs.name,
                department: inputs.department,
                salary: inputs.salary
            }
            const response = await axios.put(`http://localhost:3004/users/${inputs.id}`,updatedUser);

            dispatch({type: "UPDATE_USER",payload: response.data})
            // Redirect
            this.props.history.push('/');
        }
    }
    render() {
        const {inputs,errors} = this.state;

        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update User</h4>
                                    <div className="card-body">
                                        <form onSubmit={this.updateUser.bind(this,dispatch)}>
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
                                            <button type="submit" className="btn btn-primary btn-block">Update User</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                }
            }
        </UserConsumer>
    }
}

export default UpdateUser;