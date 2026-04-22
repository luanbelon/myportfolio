const translate = require('translate-google');

const languageMap = {
  pt: 'pt',
  en: 'en',
  es: 'es',
};

async function translateText(text, targetLanguage) {
  if (!text || !targetLanguage || targetLanguage === 'pt') {
    return text;
  }

  const to = languageMap[targetLanguage] || 'en';

  try {
    const result = await translate(text, { from: 'pt', to });
    return result;
  } catch (error) {
    return text;
  }
}

module.exports = {
  translateText,
};
