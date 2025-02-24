const api_url = "https://notes-api.dicoding.dev/v2/notes";

export async function fetchNote() {
  try {
    const response = await fetch(api_url);
    const { data } = await response.json();
    return data;
  } catch (er) {
    console.error(er);
  }
}

export async function fetchArchiveNotes() {
  try {
    const response = await fetch(`${api_url}/archived`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addNote(title, body) {
  try {
    console.log("Sending to API:", { title, body });
    const response = await fetch(api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    const { data } = await response.json();
    return data;
  } catch (errror) {
    console.error(errror);
  }
}

export async function deleteNote(id) {
  try {
    const response = await fetch(`${api_url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await fetchNote();
  } catch (errr) {
    console.error(errr);
  }
}

export async function archiveNote(id) {
  try {
    const response = await fetch(`${api_url}/${id}/archive`, {
      method: "POST",
    });
    fetchNote();
  } catch (Error) {
    console.error(Error);
  }
}

export async function unarchiveNote(id) {
  try {
    const response = await fetch(`${api_url}/${id}/unarchive`, {
      method: "POST",
    });
    fetchNote();
    fetchArchiveNotes();
  } catch (Error) {
    console.error(Error);
  }
}
