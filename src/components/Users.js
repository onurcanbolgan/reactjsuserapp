import React, {Component} from 'react';
import User from './User';
import UserConsumer from "../context";

class Users extends Component {
    render() {

        return (
            <UserConsumer>
                {
                    value => {
                        const {users} = value;
                        return (
                            <div className="col-md-8 mb-4">
                                {
                                    users.map(user => {
                                        return (
                                            <User
                                                key = {user.id}
                                                id = {user.id}
                                                name = {user.name}
                                                department = {user.department}
                                                salary = {user.salary}
                                            />
                                        )
                                    })
                                }
                            </div>
                        );
                    }
                }
            </UserConsumer>
        )
    }
}

export default Users;