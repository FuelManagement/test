import React from 'react';
import { connect } from 'react-redux';
import { adminActions } from '../../_actions';

class HomePage_Admin extends React.Component {

    constructor(props) {
        super(props);
        this.handleApprove = this.handleApprove.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(adminActions.getAllUsers());
    }

    handleApprove(event, row) {
        event.preventDefault();
        return this.props.dispatch(adminActions.approveUser(row));
    }

    render() {
        const { admin = {} } = this.props;
        return (
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2>Admin </h2>
                <hr/>
                <h4>Registration Approvals </h4>
                <table className="table table-sm fixed_header">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>  
                        <th scope="col">Approve</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {admin && admin.users && admin.users.map((row, idx) =>
                        <tr key={row._id}>
                            <td>{row.first_name} {row.last_name}</td>
                            <td>{row.email}</td>
                            <td>{row.role}</td>
                            <td>{(row.status === 2 || row.status === "2")?"Approved":(row.status === 1 || row.status ==="1")?"Rejected":"Pending"}</td>
                            <td>
                                <button 
                                    className="btn btn-success btn-sm p-50" 
                                    onClick={e => this.handleApprove(e, {...row, action:"approve"})}
                                    disabled={row.status != 0 }>
                                    Approve
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={e => this.handleApprove(e, {...row, action:"reject"})}
                                    disabled={row.status != 0}>
                                    Reject
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { admin, authentication } = state;
    const { user } = authentication;
    return {
        user,
        admin
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage_Admin);
export { connectedHomePage as HomePage_Admin };
