import NotesList from "./components/NotesList";
import { useSelector, useDispatch } from "react-redux";
import { getNotesFromAPI } from "./features/notes";
import SideBar from "./components/SideBar";
import SideNotes from "./components/SideNotes";
import DisplayedNote from "./components/DisplayedNote";
import Edit from "./components/Edit";
import {  HashRouter, Routes, Route } from "react-router-dom";
import { getBaseUrl } from "./utils/getBaseUrl";


function App() {
  const baseUrl = getBaseUrl();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesSlice);

  if (!notes?.list) {
    dispatch(getNotesFromAPI());
  }

  return (
    <div className="bg-slate-800 min-h-screen flex">
      <HashRouter>
        <SideBar />
        <SideNotes />
        <Routes>
          <Route exact path="/" element={<NotesList />} />
          <Route exact path="/note/:id" element={<DisplayedNote />} />
          <Route exact path="/edit" element={<Edit />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
