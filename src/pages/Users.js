import React from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    fetch("https://koreanjson.com/users")
      .then(res => res.json())
      .then(data => {
        this.setState({
          users: data
        });
      });
  }

  render() {
    return (
      <div>
        <div className="header">
          <Link to="/">홈</Link>
          <button onClick={this.goBack}>뒤로가기</button>
        </div>
        {this.state.users.map(user => (
          <div className="users-item">
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
