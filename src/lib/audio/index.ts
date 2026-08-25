export interface AudioProvider {
  generateAudio(text: string, language: string): Promise<string>;
  getAudioUrl(text: string, language: string): string;
}

export class GoogleTTSProvider implements AudioProvider {
  private cache: Map<string, string> = new Map();

  async generateAudio(text: string, language: string): Promise<string> {
    const cacheKey = `${language}:${text}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const langCode = language === "ru" ? "ru" : language === "de" ? "de" : "en";
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${langCode}&client=tw-ob`;

    this.cache.set(cacheKey, url);
    return url;
  }

  getAudioUrl(text: string, language: string): string {
    const langCode = language === "ru" ? "ru" : language === "de" ? "de" : "en";
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${langCode}&client=tw-ob`;
  }
}

export class MockAudioProvider implements AudioProvider {
  async generateAudio(_text: string, _language: string): Promise<string> {
    return "";
  }

  getAudioUrl(_text: string, _language: string): string {
    return "";
  }
}

export function createAudioProvider(): AudioProvider {
  const provider = process.env.TTS_PROVIDER || "mock";
  switch (provider) {
    case "google":
      return new GoogleTTSProvider();
    default:
      return new MockAudioProvider();
  }
}
