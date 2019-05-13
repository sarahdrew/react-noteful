import React from "react";
import { Link } from "react-router-dom";

import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  //add context
  static contextType = ApiContext;

  render() {
    const { folder_id } = this.props.match.params;
    const { notes = [] } = this.context;
    console.log('noteListMain notes: ', notes)
    console.log('noteListMain folder_id: ', folder_id)
    const notesForFolder = getNotesForFolder(notes, folder_id);
    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map(note => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <p>+</p>
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}
