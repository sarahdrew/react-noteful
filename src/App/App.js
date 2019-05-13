import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import ApiContext from "../ApiContext";
import config from "../config";
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount() {
    this.loadData();
    console.log(`this is this `, this);
    console.log(`config api `, config.API_ENDPOINT)
    // filter through notes and add them to specific folders based on id
    // set state in each folder with notes accordingly
  }

  loadData() {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then(res => {
        console.log(res)
        return res;
      })
      .then(res => res.json())
      .then(folders => {
        console.log(`this is the folders in set state `, folders)
        this.setState({ folders });
        return fetch(`${config.API_ENDPOINT}/notes`);
      }).then(res => res.json())
      .then(notes => {
        this.setState({ notes });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  handleDeleteNote = noteId => {
    this.setState({
      //set state so that we filter the notes to keep those that do not match the ID what has been clicked

      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  //use an event on NoteListNav to tell its parent that the folder_id is different


  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folder_id"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/notes/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folder_id"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/notes/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    console.log('app state: ', this.state)
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
