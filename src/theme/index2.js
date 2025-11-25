import { argbFromHex, hexFromArgb, TonalPalette } from "@material/material-color-utilities";//导入“@material/material-color-utilities”模块中的“argbFromHex”和“TonalPalette”
import config from './config.js';

const TONE_ARR = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 94, 97, 100];//定义一个名为“TONE_ARR”的数组，并赋值为0、5、10、20、30、40、50、60、70、80、90、94、97、100

const createTonalPalette = (hex) => {
  const argb = argbFromHex(hex); //将参数“hex”转换为argb格式的颜色，赋值给“argb”常量
  const palette = TonalPalette.fromInt(argb); //使用“TonalPalette.fromInt(argb)”创建一个palette，赋值给“palette”常量
  const colorArr = TONE_ARR.map((t) => hexFromArgb(palette.tone(t))); //使用“palette.tone(t)”来获取一个颜色数组，并将每个颜色转换为hex格式，赋值给“colorArr”常量
  return colorArr; //返回“colorArr”常量作为函数的返回值
};

// const createTonalPalette = (color, targetColor, isVariant) => {
//   // 判断是否需要对颜色做 harmonize 处理
//   const argb = targetColor ? Blend.harmonize(argbFromHex(color), argbFromHex(targetColor)) : argbFromHex(color);
//   // 将颜色转为 hct 格式
//   const hct = Hct.fromInt(argb);
//   // 创建调色板，实际上从 fromHueAndChroma 方法可以推断出音调调色板的生成逻辑
//   const palette = TonalPalette.fromHueAndChroma(
//     hct.hue,
//     isVariant ? Math.min(hct.chroma / 6, 8) : hct.chroma
//   );
//   // 在调色板上获取一组音调梯度对应的颜色数组
//   const colorArr = TONE_ARR.map((t) => hexFromArgb(palette.tone(t)));
//   // 生成 Figma tokens 插件可用的数据对象
//   const tokensObj = Object.fromEntries(
//     TONE_ARR.map((t, i) => [t, { value: colorArr[i], type: "color" }])
//   );
//   return { colorArr, tokensObj };
// };

Object.keys(config).map((i) => {
  const theme = config[i];
  Object.keys(theme).map(j => {
    const colorArr = createTonalPalette(theme[j]);
    console.log(colorArr);
  })
})