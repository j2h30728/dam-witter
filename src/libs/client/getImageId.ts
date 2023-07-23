export default async function getImageId(imageFile: File, input: string) {
  const {
    data: { uploadURL },
  } = await (await fetch('/api/files')).json();
  const form = new FormData();
  form.append('file', imageFile, input.slice(5));
  const {
    result: { id },
  } = await (await fetch(uploadURL, { body: form, method: 'POST' })).json();

  return id;
}
