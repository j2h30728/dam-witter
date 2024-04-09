import { METHOD } from '@/constants';
import { END_POINTS } from '@/constants/api';

export default async function getImageId(imageFile: File, fileName: string, controller: AbortController) {
  const signal = controller.signal;

  try {
    const uploadUrlResponse = await fetch(END_POINTS.FILES, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: METHOD.GET,
      signal,
    });
    if (!uploadUrlResponse.ok) throw new Error('이미지 등록에 실패하였습니다.');
    const {
      data: { uploadURL },
    } = await uploadUrlResponse.json();

    const form = new FormData();
    form.append('file', imageFile, fileName);

    const uploadResponse = await fetch(uploadURL, {
      body: form,
      method: METHOD.POST,
      signal,
    });
    if (!uploadResponse.ok) throw new Error('이미지 등록에 실패하였습니다.');
    const {
      result: { id },
    } = await uploadResponse.json();

    return id;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Abort Signal');
    } else {
      console.error('잠시후 요청 부탁드립니다.:', error);
    }
  }
}
