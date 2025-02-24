<style scoped>
#sectorSection {
  margin: 0 20em;
}
</style>

<template>
  <main>
    <h1>Notes</h1>
    <NuxtLink to="/">kembali</NuxtLink>
    <section class="" id="sectorSection">
      <form class="flex flex-col" action="" @submit.prevent="handleNotes()">
        <label class="" for="title">title</label><br />
        <input
          v-model="title"
          class="w-full rounded-md border-2 border-sky-300 focus:border-sky-500 focus:border-4 transition-all outline-none"
          type="text"
          name="title"
          id="title"
        /><br />

        <label class="" for="body">Konten</label><br />
        <textarea
          v-model="body"
          class="w-full rounded-md border-2 border-sky-300 focus:border-sky-500 focus:border-4 transition-all outline-none"
          name="body"
          id="body"
        ></textarea
        ><br />

        <input
          class="rounded-md bg-lime-400 hover:bg-lime-500 transition-all p-2 w-full"
          type="submit"
          value="Submit"
        />
      </form>
    </section>

    <div>
      <h1 class="bg-blue-600">Notes</h1>
      <div class="grid grid-cols-3">
        <div class="border-2" v-for="note in notes">
          <h2>{{ note.title }}</h2>
          <p>{{ note.body }}</p>

          <div class="gap-4 flex">
            <button @click="handleDelete(note.id)">Delete</button>
            <button @click="handleArchive(note.id)">archive</button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h1 class="bg-sky-600">archive</h1>
      <div class="grid grid-cols-3">
        <div class="border-2" v-for="archive in archiveNotes">
          <h2>{{ archive.title }}</h2>
          <p>{{ archive.body }}</p>
          <div>
            <button class="bg-indigo-500" @click="handleUnarchive(archive.id)">
              Unarchive
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {
  fetchNote,
  fetchArchiveNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "~/script/api";
import { ref, onMounted } from "vue";

const title = ref("");
const body = ref("");

const notes = ref([]);
const archiveNotes = ref([]);

async function handleNotes() {
  try {
    await addNote(title.value, body.value);
    title.value = "";
    body.value = "";
    const newnote = await fetchNote();
    notes.value = newnote;
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(id) {
  try {
    await deleteNote(id);
    notes.value = await fetchNote();
  } catch (error) {
    console.error(error);
  }
}

async function handleArchive(id) {
  try {
    await archiveNote(id);
    notes.value = await fetchNote();
    archiveNotes.value = await fetchArchiveNotes();
  } catch (error) {
    console.error(error);
  }
}

async function handleUnarchive(id) {
  try {
    await unarchiveNote(id);
    notes.value = await fetchNote();
    archiveNotes.value = await fetchArchiveNotes();
  } catch (error) {
    console.log(error);
  }
}

onMounted(async function () {
  archiveNotes.value = await fetchArchiveNotes();
  notes.value = (await fetchNote()).reverse();
});
</script>
