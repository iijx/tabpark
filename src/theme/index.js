import Color from "color";
import colorNames from "./color-names.js";
import config from './config.js';
import fs from 'fs';
import path from 'path';

const tools = {

  generateForegroundColorFrom: function (input, percentage = 0.8) {
    if (Color(input).isDark()) {
      let arr = Color(input).mix(Color("white"), percentage).saturate(10).hsl().array()
      return arr[0].toPrecision(5).replace(/\.?0+$/,"") + " " + arr[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + arr[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
    } else {
      let arr = Color(input).mix(Color("black"), percentage).saturate(10).hsl().array()
      return arr[0].toPrecision(5).replace(/\.?0+$/,"") + " " + arr[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + arr[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
    }
  },

  convertToHsl: function (input) {
    let resultObj = {};
    if (typeof input === "object" && input !== null) {
      Object.entries(input).forEach(([rule, value]) => {
        // if (colorNames.hasOwnProperty(rule)) {
          const hslArray = Color(value).hsl().array();
          resultObj[colorNames[rule] || rule] = hslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + hslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + hslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
        // } else {
          // resultObj[rule] = value;
        // }
      });

        // auto generate focus colors
        if (!input.hasOwnProperty("--i-primary-focus")) {
          const darkerHslArray = Color(input["--i-primary"]).darken(0.2).hsl().array();
          resultObj["--i-primary-focus"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
        }

        if (!input.hasOwnProperty("--i-secondary-focus")) {
          const darkerHslArray = Color(input["--i-secondary"]).darken(0.2).hsl().array();
          resultObj["--i-secondary-focus"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
        }

        if (!input.hasOwnProperty("--i-accent-focus")) {
          const darkerHslArray = Color(input["--i-accent"]).darken(0.2).hsl().array();
          resultObj["--i-accent-focus"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
        }

        if (!input.hasOwnProperty("--i-neutral-focus")) {
          const darkerHslArray = Color(input["--i-neutral"]).darken(0.2).hsl().array();
          resultObj["--i-neutral-focus"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
        }

        // auto generate base colors
        if (!input.hasOwnProperty("--i-base-100")) {
          resultObj["--i-base-100"] = 0 + " " + 0 + "%" + " " + 100 + "%";
        }

        if (!input.hasOwnProperty("--i-base-200")) {
          const darkerHslArray = Color(input["--i-base-100"]).darken(0.1).hsl().array();
          resultObj["--i-base-200"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
        }

        if (!input.hasOwnProperty("--i-base-300")) {
          if (input.hasOwnProperty("--i-base-200")) {
            const darkerHslArray = Color(input["--i-base-200"]).darken(0.1).hsl().array();
            resultObj["--i-base-300"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
          } else {
            const darkerHslArray = Color(input["--i-base-100"]).darken(0.1).darken(0.1).hsl().array();
            resultObj["--i-base-300"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/,"") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/,"") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/,"") + "%";
          }
        }

        // auto generate state colors
        if (!input.hasOwnProperty("--i-info")) {
          resultObj["--i-info"] = 198 + " " + 93 + "%" + " " + 60 + "%";
        }
        if (!input.hasOwnProperty("--i-success")) {
          resultObj["--i-success"] = 158 + " " + 64 + "%" + " " + 52 + "%";
        }
        if (!input.hasOwnProperty("--i-warning")) {
          resultObj["--i-warning"] = 43 + " " + 96 + "%" + " " + 56 + "%";
        }
        if (!input.hasOwnProperty("--i-error")) {
          resultObj["--i-error"] = 0 + " " + 91 + "%" + " " + 71 + "%";
        }

        // auto generate content colors
        if (!input.hasOwnProperty("--i-base-content")) {
          resultObj["--i-base-content"] = this.generateForegroundColorFrom(input["--i-base-100"])
        }
        if (!input.hasOwnProperty("--i-primary-content")) {
          resultObj["--i-primary-content"] = this.generateForegroundColorFrom(input["--i-primary"])
        }

        if (!input.hasOwnProperty("--i-secondary-content")) {
          resultObj["--i-secondary-content"] = this.generateForegroundColorFrom(input["--i-secondary"])
        }

        if (!input.hasOwnProperty("--i-accent-content")) {
          resultObj["--i-accent-content"] = this.generateForegroundColorFrom(input["--i-accent"])
        }

        if (!input.hasOwnProperty("--i-neutral-content")) {
          resultObj["--i-neutral-content"] = this.generateForegroundColorFrom(input["--i-neutral"])
        }

        if (!input.hasOwnProperty("--i-info-content")) {
          if (input.hasOwnProperty("--i-info")) {
            resultObj["--i-info-content"] = this.generateForegroundColorFrom(input["--i-info"])
          } else {
            resultObj["--i-info-content"] = 198 + " " + 100 + "%" + " " + 12 + "%";
          }
        }

        if (!input.hasOwnProperty("--i-success-content")) {
          if (input.hasOwnProperty("--i-success")) {
            resultObj["--i-success-content"] = this.generateForegroundColorFrom(input["success"])
          } else {
            resultObj["--i-success-content"] = 158 + " " + 100 + "%" + " " + 10 + "%";
          }
        }

        if (!input.hasOwnProperty("--i-warning-content")) {
          if (input.hasOwnProperty("--i-warning")) {
            resultObj["--i-warning-content"] = this.generateForegroundColorFrom(input["warning"], .9)
          } else {
            resultObj["--i-warning-content"] = 43 + " " + 100 + "%" + " " + 11 + "%";
          }
        }

        if (!input.hasOwnProperty("--i-error-content")) {
          if (input.hasOwnProperty("--i-error")) {
            resultObj["--i-error-content"] = this.generateForegroundColorFrom(input["error"])
          } else {
            resultObj["--i-error-content"] = 0 + " " + 100 + "%" + " " + 14 + "%";
          }
        }

        // auto generate css variables
        // if (!input.hasOwnProperty("--rounded-box")) {
        //   resultObj["--rounded-box"] = "1rem";
        // }
        // if (!input.hasOwnProperty("--rounded-btn")) {
        //   resultObj["--rounded-btn"] = "0.5rem";
        // }
        // if (!input.hasOwnProperty("--rounded-badge")) {
        //   resultObj["--rounded-badge"] = "1.9rem";
        // }
        // if (!input.hasOwnProperty("--animation-btn")) {
        //   resultObj["--animation-btn"] = "0.25s";
        // }
        // if (!input.hasOwnProperty("--animation-input")) {
        //   resultObj["--animation-input"] = ".2s";
        // }
        // if (!input.hasOwnProperty("--btn-text-case")) {
        //   resultObj["--btn-text-case"] = "uppercase";
        // }
        // if (!input.hasOwnProperty("--btn-focus-scale")) {
        //   resultObj["--btn-focus-scale"] = "0.95";
        // }
        // if (!input.hasOwnProperty("--border-btn")) {
        //   resultObj["--border-btn"] = "1px";
        // }
        // if (!input.hasOwnProperty("--tab-border")) {
        //   resultObj["--tab-border"] = "1px";
        // }
        // if (!input.hasOwnProperty("--tab-radius")) {
        //   resultObj["--tab-radius"] = "0.5rem";
        // }
      // });
      return resultObj;
    }
    return input;
  },
}

let themeColor = {};
Object.keys(config).reduce((acc, curTheme) => {
  acc[curTheme] = tools.convertToHsl(config[curTheme])
  return acc;
}, themeColor)

// 根据 themeColor 对象，生成 css 文件
let rootVars = Object.keys(themeColor).reduce((acc, curTheme) => {
  const selectStr = curTheme === 'default' ? ':root' : `[data-theme=${curTheme}]`;
  acc += `${selectStr} {`;
  Object.keys(themeColor[curTheme]).forEach((rule) => {
    acc += `${rule}: ${themeColor[curTheme][rule].replaceAll(' ', ',')};`
    acc += `${rule}_: hsl(${themeColor[curTheme][rule]});`
  })
  acc += `}`
  return acc;
}, "")

// 写入文件
fs.writeFileSync(path.resolve('./src/assets/style/theme.css'), rootVars)

export default themeColor;