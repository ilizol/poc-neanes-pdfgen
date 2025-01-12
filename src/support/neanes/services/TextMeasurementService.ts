import { create, Font, open } from 'fontkit';

const fontMap = new Map<string, Font>();

const fontFamilyRegex = /px "?([\w ]*)"?$/;
const fontSizeRegex = /([0-9.]*)px/;
const fontWeightRegex = /\s?([0-9]{3})?\s?[0-9.]*px/;

export class TextMeasurementService {
  public static async registerFontByPath(family: string, file: string) {
    fontMap.set(family, (await open(file)) as Font);
  }

  public static async registerFontByBuffer(family: string, data: Buffer) {
    fontMap.set(family, create(data) as Font);
  }

  public static getTextWidth(text: string, fontCss: string) {
    let fontFamily = fontCss.match(fontFamilyRegex)![1];
    const fontSize = Number(fontCss.match(fontSizeRegex)![1]);
    const fontWeight = fontCss.match(fontWeightRegex)![1];
    if (fontWeight === '700') {
      fontFamily += ' Bold';
    }
    //TODO italic
    const font = fontMap.get(fontFamily)!;
    const run = font.layout(text);

    return (run.advanceWidth / font.unitsPerEm) * fontSize;
  }

  public static getTextHeight(text: string, fontCss: string) {
    let fontFamily = fontCss.match(fontFamilyRegex)![1];
    const fontSize = Number(fontCss.match(fontSizeRegex)![1]);
    const fontWeight = fontCss.match(fontWeightRegex)![1];
    if (fontWeight === '700') {
      fontFamily += ' Bold';
    }
    //TODO italic
    const font = fontMap.get(fontFamily)!;
    const run = font.layout(text);

    return (run.bbox.height / font.unitsPerEm) * fontSize;
  }

  public static getFontHeight(fontCss: string) {
    try {
      let fontFamily = fontCss.match(fontFamilyRegex)![1];
      const fontSize = Number(fontCss.match(fontSizeRegex)![1]);
      const fontWeight = fontCss.match(fontWeightRegex)![1];
      if (fontWeight === '700') {
        fontFamily += ' Bold';
      }
      //TODO italic

      const font = fontMap.get(fontFamily)!;

      // console.log(`[LOG] fontFamily: ${fontFamily}`);
      // console.log(`[LOG] fontSize: ${fontSize}`);
      // console.log(`[LOG] fontWeight: ${fontWeight}`);
      // console.log(`[LOG] fontCss: ${fontCss}`);
      // console.log('[LOG] font: ', font);
      // console.log('[LOG] font.bbox: ', font.bbox);
      // console.log('[LOG] font.bbox.height: ', font.bbox.height);
      // console.log('[LOG] font.unitsPerEm: ', font.unitsPerEm);

      // console.log('[LOG] fontCss.match(fontWeightRegex): ', fontCss.match(fontWeightRegex));

      // console.log('[LOG] font.bbox.height: ', font.bbox.height);
      // console.log('[LOG] font.unitsPerEm: ', font.unitsPerEm);
      // console.log('[LOG] font.fontSize: ', fontSize);

      // return (font.bbox.height / font.unitsPerEm) * fontSize;
      return ((font.ascent - font.descent) / font.unitsPerEm) * fontSize;
    } catch (e) {
      console.error(`[ERR] getFontHeight: ${fontCss}`, e);
      throw e;
    }
  }

  public static getFontBoundingBoxDescent(fontCss: string) {
    let fontFamily = fontCss.match(fontFamilyRegex)![1];
    const fontSize = Number(fontCss.match(fontSizeRegex)![1]);
    const fontWeight = fontCss.match(fontWeightRegex)![1];
    if (fontWeight === '700') {
      fontFamily += ' Bold';
    }
    //TODO italic
    const font = fontMap.get(fontFamily)!;

    return (font.descent / font.unitsPerEm) * fontSize;
  }

  public static getFontBoundingBoxAscent(fontCss: string) {
    let fontFamily = fontCss.match(fontFamilyRegex)![1];
    const fontSize = Number(fontCss.match(fontSizeRegex)![1]);
    const fontWeight = fontCss.match(fontWeightRegex)![1];
    if (fontWeight === '700') {
      fontFamily += ' Bold';
    }
    //TODO italic
    const font = fontMap.get(fontFamily)!;

    return (font.ascent / font.unitsPerEm) * fontSize;
  }
}
