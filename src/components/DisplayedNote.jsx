import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../features/notes";
export default function DisplayedNote() {
  const notes = useSelector((state) => state.notesSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentNote = notes.list?.find((note) => note.id === id);

  return (
    <div className="p-10">
      <Link className="px-2 py-2 rounded bg-slate-300 text-slate-800 mr-2">
        Notes
      </Link>
      <Link
        to={`/edit/${id}`}
        className="px-2 py-2 rounded bg-green-600 text-slate-50 mr-2"
      >
        Update
      </Link>
      <button
        onClick={() => {
          dispatch(deleteNote(id));
          navigate("/");
        }}
        className="px-2 py-2 rounded bg-red-600 text-slate-50 mr-2"
      >
        Delete
      </button>
      <p className="text-slate-100 text-4xl font-semibold mb-2 mt-8">
        {currentNote?.title}
      </p>
      <p className="text-slate-200 text-xl mb-4">{currentNote?.subtitle}</p>
      <p className="text-slate-300">{currentNote?.bodyText}</p>
    </div>
  );
}
