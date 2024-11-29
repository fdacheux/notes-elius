import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNoteFromUser, editNote } from "../features/notes";
import { useParams } from "react-router-dom";
export default function Edit() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesSlice);

  const [inputsStates, setInputsStates] = useState({
    title: "",
    subtitle: "",
    bodyText: "",
  });
  const [showValidation, setShowValidation] = useState({
    title: false,
    subtitle: false,
    bodyText: false,
  });

  const { id } = useParams();

  useEffect(() => {
    if (id && notes?.list) {
      setInputsStates({
        title: notes.list.find((note) => note.id === id)?.title,
        subtitle: notes.list.find((note) => note.id === id)?.subtitle,
        bodyText: notes.list.find((note) => note.id === id)?.bodyText,
      });
    } else {
      setInputsStates({
        title: "",
        subtitle: "",
        bodyText: "",
      });
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(inputsStates).every((value) => value)) {
      setShowValidation({ title: false, subtitle: false, bodyText: false });
      if (id && notes?.list) {
        dispatch(editNote({ ...inputsStates, id }));
      } else {
        dispatch(addNoteFromUser({ ...inputsStates, id: nanoid(8) }));
        setInputsStates({
          title: "",
          subtitle: "",
          bodyText: "",
        });
      }
    } else {
      for (const [key, value] of Object.entries(inputsStates)) {
        if (value.length === 0) {
          setShowValidation((state) => ({ ...state, [key]: true }));
        } else {
          setShowValidation((state) => ({ ...state, [key]: false }));
        }
      }
    }
  }

  return (
    <div className="w-full p-10">
      <p className="text-slate-100 text-xl mb-4">Add a note</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="mb-2 block text-slate-100">
          Title
        </label>
        <input
          onChange={(e) =>
            setInputsStates({ ...inputsStates, title: e.target.value })
          }
          type="text"
          value={inputsStates.title}
          className="p-2 text-md block w-full rounded bg-slate-200"
          id="title"
        />
        {showValidation.title && (
          <p className="text-red-400 mb-2">This field is required</p>
        )}
        <label htmlFor="subtitle" className="mb-2 block text-slate-100">
          Subtitle
        </label>
        <input
          onChange={(e) =>
            setInputsStates({ ...inputsStates, subtitle: e.target.value })
          }
          type="text"
          value={inputsStates.subtitle}
          className="p-2 text-md block w-full rounded bg-slate-200"
          id="subtitle"
        />
        {showValidation.subtitle && (
          <p className="text-red-400 mb-2">This field is required</p>
        )}
        <label htmlFor="bodyText" className="mb-2 mt-4 block text-slate-100">
          Note content
        </label>
        <textarea
          id="bodyText"
          value={inputsStates.bodyText}
          onChange={(e) =>
            setInputsStates({ ...inputsStates, bodyText: e.target.value })
          }
          className="w-full min-h-[300px] p-2 rounded bg-slate-200"
          spellCheck="false"
        ></textarea>
        {showValidation.bodyText && (
          <p className="text-red-400 mb-2">This field is required</p>
        )}
        <button className="mt-4 px-3 py-1 bg-slate-100 rounded">Save</button>
      </form>
    </div>
  );
}
