import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SideNotes() {
  const notes = useSelector((state) => state.notesSlice);
  return (
    <aside className="shrink-0 bg-slate-100 text-slate-900 w-[275px] flex flex-col items-center pt-2 border-r border-gray-300">
      <p className="py-6 px-4 text-2xl text-slate-800 text-center font-semibold border-b border-gray-300 w-full">
        My Notes
      </p>
      <ul className="w-full divide-y divide-slate-300">
        {notes?.list &&
          notes.list.map((note) => (
            <li
              key={note.id}
              className="relative hover:bg-slate-200 cursor-pointer "
            >
              <Link to={`/note/${note.id}`} className="block p-4 w-full h-full">
                <span className="block text-xl text-slate-900">{note.title}</span>
                <span className="block text-lg text-slate-800">{note.subtitle}</span>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}
