const MAX_DATA_URL_CHARS = 650_000;
const MAX_FULL_PAGE_CHARS = 1_100_000;
const MAX_WIDTH = 1600;
const MAX_FULL_PAGE_WIDTH = 1200;

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

async function compressFromObjectUrl(objectUrl, { maxWidth = MAX_WIDTH, maxChars = MAX_DATA_URL_CHARS } = {}) {
  const image = await loadImage(objectUrl);
  const scale = Math.min(1, maxWidth / image.naturalWidth);
  let width = Math.max(1, Math.round(image.naturalWidth * scale));
  let height = Math.max(1, Math.round(image.naturalHeight * scale));

  // Avoid oversized canvases on very tall full-page screenshots.
  const maxArea = 12_000_000;
  if (width * height > maxArea) {
    const areaScale = Math.sqrt(maxArea / (width * height));
    width = Math.max(1, Math.round(width * areaScale));
    height = Math.max(1, Math.round(height * areaScale));
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { alpha: false });
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  let quality = 0.8;
  let dataUrl = canvasToJpeg(canvas, quality);
  while (dataUrl.length > maxChars && quality > 0.38) {
    quality -= 0.08;
    dataUrl = canvasToJpeg(canvas, quality);
  }
  return dataUrl;
}

export async function compressImageFile(file, options) {
  const objectUrl = URL.createObjectURL(file);
  try {
    return await compressFromObjectUrl(objectUrl, options);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export async function compressDataUrl(dataUrl, options = {}) {
  if (!dataUrl || typeof dataUrl !== 'string') {
    return dataUrl || '';
  }
  if (!dataUrl.startsWith('data:image')) {
    return dataUrl;
  }
  const maxChars = options.maxChars || MAX_DATA_URL_CHARS;
  if (dataUrl.length <= maxChars) {
    return dataUrl;
  }
  return compressFromObjectUrl(dataUrl, options);
}

export async function prepareProjectImages(formData) {
  const fullPageOptions = {
    maxWidth: MAX_FULL_PAGE_WIDTH,
    maxChars: MAX_FULL_PAGE_CHARS,
  };

  const [imageUrl, beforeImageUrl, afterImageUrl, fullPageImageUrl] = await Promise.all([
    compressDataUrl(formData.imageUrl),
    compressDataUrl(formData.beforeImageUrl),
    compressDataUrl(formData.afterImageUrl),
    compressDataUrl(formData.fullPageImageUrl, fullPageOptions),
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
    fullPageImageUrl,
    gallery,
    imageKey: null,
  };
}

export function estimatePayloadKb(payload) {
  return Math.round(JSON.stringify(payload).length / 1024);
}
