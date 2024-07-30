import { CANVAS_HEIGHT } from "../config/constants.tsx";

export const ChangeMousePosToNoteId = (mousePos: number) => {
  const height_per_note = Math.floor(CANVAS_HEIGHT / 8);
  const noteId = Math.floor((CANVAS_HEIGHT - mousePos) / height_per_note);
  return noteId + 1;
}
