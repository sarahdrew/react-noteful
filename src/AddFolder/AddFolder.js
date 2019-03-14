import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import "./AddFolder.css";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  updateName(name) {
    this.setState({ name });
  }
  static defaultProps = {
    history: {
      push: () => {}
    }
  };
  static contextType = ApiContext;

  handleSubmit = event => {
    event.preventDefault();
    //grab name of folder
    const folder = {
      name: event.target["folder-name"].value
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(e => Promise.reject(e));
        }
        return response.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <section className="AddFolder">
        <h2>Create a new folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="folder-name-input">Name: </label>
            <input
              type="text"
              id="folder-name-input"
              name="folder-name"
              onChange={e => this.updateName(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button onClick={() => this.handleSubmit()} type="submit">
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
