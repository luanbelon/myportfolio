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
    return await translate(text, { from: 'pt', to });
  } catch (error) {
    return text;
  }
}

module.exports = { translateText };
