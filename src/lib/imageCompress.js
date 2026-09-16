const MAX_DATA_URL_CHARS = 650_000;
const MAX_WIDTH = 1600;

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Não foi possível ler a imagem'));
    image.src = source;
  });
}

function canvasToJpeg(canvas, quality) {
  return canvas.toDataURL('image/jpeg', quality);
}

async function compressFromObjectUrl(objectUrl) {
  const image = await loadImage(objectUrl);
  const scale = Math.min(1, MAX_WIDTH / image.naturalWidth);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { alpha: false });
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  let quality = 0.8;
  let dataUrl = canvasToJpeg(canvas, quality);
  while (dataUrl.length > MAX_DATA_URL_CHARS && quality > 0.42) {
    quality -= 0.08;
    dataUrl = canvasToJpeg(canvas, quality);
  }
  return dataUrl;
}

export async function compressImageFile(file) {
  const objectUrl = URL.createObjectURL(file);
  try {
    return await compressFromObjectUrl(objectUrl);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export async function compressDataUrl(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') {
    return dataUrl || '';
  }
  if (!dataUrl.startsWith('data:image')) {
    return dataUrl;
  }
  if (dataUrl.length <= MAX_DATA_URL_CHARS) {
    return dataUrl;
  }
  return compressFromObjectUrl(dataUrl);
}

export async function prepareProjectImages(formData) {
  const [imageUrl, beforeImageUrl, afterImageUrl] = await Promise.all([
    compressDataUrl(formData.imageUrl),
    compressDataUrl(formData.beforeImageUrl),
    compressDataUrl(formData.afterImageUrl),
  ]);

  const gallery = [];
  for (const item of formData.gallery || []) {
    gallery.push(await compressDataUrl(item));
  }

  return {
    ...formData,
    imageUrl,
    beforeImageUrl,
    afterImageUrl,
    gallery,
    imageKey: null,
  };
}

export function estimatePayloadKb(payload) {
  return Math.round(JSON.stringify(payload).length / 1024);
}
