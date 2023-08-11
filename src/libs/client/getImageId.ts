export default async function getImageId(imageFile: File, fileName: string) {
  const {
    data: { uploadURL },
  } = await (await fetch('/api/files')).json();
  const form = new FormData();
  form.append('file', imageFile, fileName);
  const {
    result: { id },
  } = await (await fetch(uploadURL, { body: form, method: 'POST' })).json();

  return id;
}
