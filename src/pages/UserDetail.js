import React from "react";
import { Link, NavLink } from "react-router-dom";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
      photo: {},
      todos: []
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    //user api
    fetch(`https://koreanjson.com/users/`)
      .then(res => res.json())
      .then(data => {
        let user = data.filter(
          user => user.id === parseInt(this.props.match.params.id)
        )[0];
        this.setState({
          users: data,
          user: user
        });
      });

    //photo api
    fetch(`https://randomuser.me/api/`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          photo: data.results[0].picture
        });
      });

    //todos api
    fetch(`https://koreanjson.com/todos?userId=${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          todos: data
        });
      });
  }

  render() {
    const activeStyle = {
      color: "green",
      fontSize: "2rem"
    };

    let view;

    if (this.props.match.url === `/users/${this.props.match.params.id}`) {
      view = (
        <div>
          <div>
            <img src={this.state.photo.medium} alt="" />
          </div>
          <div>이름: {this.state.user.name}</div>
          <div>이메일: {this.state.user.email}</div>
          <div>모바일: {this.state.user.phone}</div>
        </div>
      );
    } else if (
      this.props.match.url === `/users/${this.props.match.params.id}/todos`
    ) {
      view = (
        <div>
          {this.state.todos.map(todo => (
            <div>
              <label>
                <input type="checkbox" value={todo.completed} />
                <span>{todo.title}</span>
              </label>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <div className="header">
          <Link to="/">홈</Link>
          <button onClick={this.goBack}>뒤로가기</button>
        </div>
        <div>
          <NavLink
            exact
            to={`/users/${this.props.match.params.id}`}
            activeStyle={activeStyle}
          >
            유저 프로필
          </NavLink>
          <NavLink
            exact
            to={`/users/${this.props.match.params.id}/todos`}
            activeStyle={activeStyle}
          >
            투두 ({this.state.todos.length})
          </NavLink>
        </div>
        {view}
      </div>
    );
  }
}

export default UserDetail;
