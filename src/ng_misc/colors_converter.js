/*!
 * Controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2016 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

var ColorsConverter = {};
/**
 *  Group: Methods
 */

/**
 *  Function: RGBToHSV
 *  -
 *
 *  Syntax:
 *    object *RGBToHSV* (integer red, integer green, integer blue)
 *
 *  Parameters:
 *    red - ...
 *    green - ...
 *    blue - ...
 *
 *  Returns:
 *    {H:0-360, S:0-1, V:0-1} | null
 */
ColorsConverter.RGBToHSV = function(red,green,blue)
{
  if(
    (typeof red !== 'number') || (red < 0) || (red > 255)
    || (typeof green !== 'number') || (green < 0) || (green > 255)
    || (typeof blue !== 'number') || (blue < 0) || (blue > 255)
  ){return null;}

  red = Math.round(red)/255;
  green = Math.round(green)/255;
  blue = Math.round(blue)/255;

  var minRGB = Math.min(red,Math.min(green,blue));
  var maxRGB = Math.max(red,Math.max(green,blue));

  //if color is gray scale
  if(minRGB === maxRGB){
    return {
      H:0,
      S:0,
      V:minRGB
    };
  }

  var d = (red === minRGB)
    ? green - blue
    : ((blue === minRGB)
        ? red - green
        : blue - red);
   var h = (red === minRGB)
     ? 3 : (
       (blue === minRGB) ? 1 : 5
     );

   return {
    H: 60*(h - d/(maxRGB - minRGB)),
    S: (maxRGB - minRGB)/maxRGB,
    V: maxRGB
   };
};

/**
 *  Function: HSVToRGB
 *  -
 *
 *  Syntax:
 *    object *HSVToRGB* (integer hue, number saturation, number value)
 *
 *  Parameters:
 *    hue - ...
 *    saturation - ...
 *    value - ...
 *
 *  Returns:
 *    {R:0-255, G:0-255, B:0-255} | null
 */
ColorsConverter.HSVToRGB = function(hue,saturation,value)
{
  if(
    (typeof hue !== 'number') || (hue < 0) || (hue > 360)
    || (typeof saturation !== 'number') || (saturation < 0) || (saturation > 1)
    || (typeof value !== 'number') || (value < 0) || (value > 1)
  ){return null;}

  //if color is grayscale
  if(saturation === 0) {
    return {
      R:Math.round(255*value),
      G:Math.round(255*value),
      B:Math.round(255*value)
    };
  }
  else{
    hue /= 60;
    i = Math.floor(hue);
    f = hue - i;
    p = value * (1 - saturation);
    q = value * (1 - saturation * f);
    t = value * (1 - saturation * (1 - f));

    var red = null;
    var green = null;
    var blue = null;

    switch(i) {
      case 0: red = value; green = t; blue = p; break;
      case 1: red = q; green = value; blue = p; break;
      case 2: red = p; green = value; blue = t; break;
      case 3: red = p; green = q; blue = value; break;
      case 4: red = t; green = p; blue = value; break;
      case 5: red = value; green = p; blue = q; break;
      case 6: red = value; green = t; blue = p; break;
    }

    red = Math.round(red*255);
    green = Math.round(green*255);
    blue = Math.round(blue*255);

    return {R:red, G:green, B:blue};
  }
};

/**
 *  Function: HexToRGB
 *  -
 *
 *  Syntax:
 *    object *HexToRGB* (string color)
 *
 *  Parameters:
 *    color - Hex color ("#rrggbb")
 *
 *  Returns:
 *    {R:0-255, G:0-255, B:0-255} | null
 */
ColorsConverter.HexToRGB = function(color)
{
  if((typeof color !== 'string') || (color.length !== 7)){return null;}

  var red = parseInt(color.substr(1,2),16);
  var green = parseInt(color.substr(3,2),16);
  var blue = parseInt(color.substr(5,2),16);

  if(isNaN(red) || isNaN(green) || isNaN(blue)){return null;}

  return {R:red, G:green, B:blue};
};

/**
 *  Function: HexToRGBA
 *  -
 *
 *  Syntax:
 *    object *HexToRGBA* (string color)
 *
 *  Parameters:
 *    color - Hex color ("#rrggbbaa")
 *
 *  Returns:
 *    {R:0-255, G:0-255, B:0-255, A:0-1} | null
 */
ColorsConverter.HexToRGBA = function(color)
{
  if((typeof color !== 'string') || (color.length !== 9)){return null;}

  var red = parseInt(color.substr(1,2),16);
  var green = parseInt(color.substr(3,2),16);
  var blue = parseInt(color.substr(5,2),16);
  var alpha = parseInt(color.substr(7,2),16)/255;

  if(isNaN(alpha) || isNaN(red) || isNaN(green) || isNaN(blue)){return null;}

  return {R:red, G:green, B:blue, A:alpha};
};

/**
 *  Function: RGBToHex
 *  -
 *
 *  Syntax:
 *    object *RGBToHex* (integer red, integer green, integer blue)
 *
 *  Parameters:
 *    red - 0-255
 *    green - 0-255
 *    blue - 0-255
 *
 *  Returns:
 *    "#rrggbb" | null
 */
ColorsConverter.RGBToHex = function(red,green,blue)
{
  if(
    (typeof red !== 'number') || (red < 0) || (red > 255)
    || (typeof green !== 'number') || (green < 0) || (green > 255)
    || (typeof blue !== 'number') || (blue < 0) || (blue > 255)
  ){return null;}

  red = Math.round(red);
  green = Math.round(green);
  blue = Math.round(blue);

  red = red.toString(16);
  green = green.toString(16);
  blue = blue.toString(16);

  red = (red.length === 1) ? '0'+red : red ;
  green = (green.length === 1) ? '0'+green : green;
  blue = (blue.length === 1) ? '0'+blue : blue;

  return '#' + red + green + blue;
};

/**
 *  Function: RGBAToHex
 *  -
 *
 *  Syntax:
 *    object *RGBAToHex* (integer red, integer green, integer blue, float alpha)
 *
 *  Parameters:
 *    red - 0-255
 *    green - 0-255
 *    blue - 0-255
 *    alpha - 0-1
 *
 *  Returns:
 *    "#rrggbbaa" | null
 */
ColorsConverter.RGBAToHex = function(red,green,blue,alpha)
{
  if(
    (typeof alpha !== 'number') || (alpha < 0) || (alpha > 1)
    || (typeof red !== 'number') || (red < 0) || (red > 255)
    || (typeof green !== 'number') || (green < 0) || (green > 255)
    || (typeof blue !== 'number') || (blue < 0) || (blue > 255)
  ){return null;}

  alpha = Math.round(alpha*255);
  red = Math.round(red);
  green = Math.round(green);
  blue = Math.round(blue);

  alpha = alpha.toString(16);
  red = red.toString(16);
  green = green.toString(16);
  blue = blue.toString(16);

  alpha = (alpha.length === 1) ? '0'+alpha : alpha;
  red = (red.length === 1) ? '0'+red : red;
  green = (green.length === 1) ? '0'+green : green;
  blue = (blue.length === 1) ? '0'+blue : blue;

  return '#' + red + green + blue + alpha;
};

/**
 *  Function: HexToHSV
 *  -
 *
 *  Syntax:
 *    object *HexToHSV* (string color)
 *
 *  Parameters:
 *    color - Hex color ("#rrggbb")
 *
 *  Returns:
 *    {H:0-360, S:0-1, V:0-1} | null
 */
ColorsConverter.HexToHSV = function(color)
{
  var rgb = ColorsConverter.HexToRGB(color);
  if(typeof rgb !== 'object' || rgb === null){return null;}

  return ColorsConverter.RGBToHSV(
    rgb.R,rgb.G,rgb.B
  );
};

/**
 *  Function: HexToHSVA
 *  -
 *
 *  Syntax:
 *    object *HexToHSVA* (string color)
 *
 *  Parameters:
 *    color - Hex color ("#rrggbbaa")
 *
 *  Returns:
 *    {H:0-360, S:0-1, V:0-1, A:0-1} | null
 */
ColorsConverter.HexToHSVA = function(color)
{
  var rgba = ColorsConverter.HexToRGBA(color);
  if(typeof rgba !== 'object' || rgba === null){return null;}

  var hsv = ColorsConverter.RGBToHSV(
    rgba.R,rgba.G,rgba.B
  );
  if(typeof hsv !== 'object' || hsv === null){return null;}

  hsv.A = rgba.A;
  return hsv;
};

/**
 *  Function: HexToContrast
 *  -
 *
 *  Syntax:
 *    string *HexToContrast* (string color)
 *
 *  Parameters:
 *    color - Hex color ("#rrggbb")
 *
 *  Returns:
 *    "#000000" | "#ffffff" | null
 */
ColorsConverter.HexToContrast = function(color)
{
  var rgb = ColorsConverter.HexToRGB(color);
  if(typeof rgb !== 'object' || rgb === null){return null;}

  var yiq = ((rgb.R)*299 + (rgb.G)*587 + (rgb.B)*114) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};

/**
 *  Function: RGBToContrast
 *  -
 *
 *  Syntax:
 *    string *RGBToContrast* (integer red, integer green, integer blue)
 *
 *  Parameters:
 *    red - ...
 *    green - ...
 *    blue - ...
 *
 *  Returns:
 *    "#000000" | "#ffffff" | null
 */
ColorsConverter.RGBToContrast = function(red,green,blue)
{
  if(
    (typeof red !== 'number') || (red < 0) || (red > 255)
    || (typeof green !== 'number') || (green < 0) || (green > 255)
    || (typeof blue !== 'number') || (blue < 0) || (blue > 255)
  ){return null;}

  var yiq = ((red)*299 + (green)*587 + (blue)*114) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};

/**
 *  Function: MergeRGBAColors
 *  Merge any number of RGBA colors into one (top -> bottom)
 *
 *  Syntax:
 *    string *MergeRGBAColors* (array colors)
 *
 *  Parameters:
 *    colors - [{R:0-255, G:0-255, B:0-255, A:0-1}, ...]
 *
 *  Returns:
 *    {R:0-255, G:0-255, B:0-255, A:0-1} | null
 */
ColorsConverter.MergeRGBAColors = function(colors)
{
  if(Object.prototype.toString.call(colors) !== '[object Array]'){return null;}

  var alphaLeft = 1;

  var red = 0;
  var green = 0;
  var blue = 0;
  var alpha = 0;

  for(var i in colors){
    var color = colors[i];
    if((typeof color !== 'object') || (color === null)){continue;}
    if(
      typeof color.R !== 'number' || typeof color.G !== 'number' ||
      typeof color.B !== 'number' || typeof color.A !== 'number'
    ){continue;}

    var useAlpha = (color.A > alphaLeft) ? alphaLeft : color.A;
    alphaLeft -= useAlpha;

    red += useAlpha * color.R;
    green += useAlpha * color.G;
    blue += useAlpha * color.B;

    if(alphaLeft <= 0){break;}
  }

  alpha = 1 - alphaLeft;

  red = (red < 0) ? 0 : ((red > 255) ? 255 : red);
  green = (green < 0) ? 0 : ((green > 255) ? 255 : green);
  blue = (blue < 0) ? 0 : ((blue > 255) ? 255 : blue);
  alpha = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);

  return {R:red, G:green, B:blue, A:alpha};
};

/**
 *  Function: MergeHexColors
 *  Merge any number of Hex colors into one (top -> bottom) by opacity or by hex alpha
 *  If any color has hex alpha channel, returned color will have alpha channel too;
 *
 *  Syntax:
 *    string *MergeHexColors* (array colors)
 *
 *  Parameters:
 *    colors - [{Color:"#rrggbb", Opacity: 0-1}, ...] or [{Color:"#rrggbbaa"}, ...]
 *
 *  Returns:
 *    "#rrggbb" | "#rrggbbaa" | null
 */
ColorsConverter.MergeHexColors = function(colors)
{
  if(Object.prototype.toString.call(colors) !== '[object Array]'){return null;}

  var hasHexAlpha = false;

  for(var i in colors){
    var color = colors[i].Color;
    if(color.length === 9){
      hasHexAlpha = true;
      color = ColorsConverter.HexToRGBA(color);
    }
    else{
      color = ColorsConverter.HexToRGB(color);
      if(color !== null){
        var opacity = colors[i].Opacity;
        color['A'] = (typeof opacity !== 'number' || opacity < 0)
          ? 0 : (opacity > 1) ? 1 : opacity;
      }
    }

    colors[i] = color;
  }

  var resultColor = ColorsConverter.MergeRGBAColors(colors);

  if(hasHexAlpha){
    return ColorsConverter.RGBAToHex(
      resultColor.R,
      resultColor.G,
      resultColor.B,
      resultColor.A
    );
  }
  else{
    return ColorsConverter.RGBToHex(
      resultColor.R,
      resultColor.G,
      resultColor.B
    );
  }
};


/**
 *  Function: RGBToHSL
 *  -
 *
 *  Syntax:
 *    object *RGBToHSL* (integer red, integer green, integer blue)
 *
 *  Parameters:
 *    red - ...
 *    green - ...
 *    blue - ...
 *
 *  Returns:
 *    {H:0-360, S:0-1, L:0-1} | null
 */
ColorsConverter.RGBToHSL = function(r, g, b)
{
  if ((typeof r !== 'number') || (r < 0) || (r > 255) ||
      (typeof g !== 'number') || (g < 0) || (g > 255) ||
      (typeof b !== 'number') || (b < 0) || (b > 255)) return null;

  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      h, s,
      l = (max + min) / 2;
  if (max === min)
  {
    h = s = 0;
  }
  else
  {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max)
    {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h *= 60;
  }

  return {
    H: h,
    S: s,
    L: l
  };
};

/**
 *  Function: HSLToRGB
 *  -
 *
 *  Syntax:
 *    object *HSLToRGB* (integer hue, number saturation, number lightness)
 *
 *  Parameters:
 *    hue - ...
 *    saturation - ...
 *    lightness - ...
 *
 *  Returns:
 *    {R:0-255, G:0-255, B:0-255} | null
 */
ColorsConverter.HSLToRGB = function(h, s, l)
{
  if ((typeof h !== 'number') || (h < 0) || (h > 360) ||
     (typeof s !== 'number') || (s < 0) || (s > 1) ||
     (typeof l !== 'number') || (l < 0) || (l > 1)) return null;

  var m1, m2, hue,
      r, g, b;
  if (s === 0)
  {
    r = g = b = (l * 255);
  }
  else
  {
    if (l <= 0.5) m2 = l * (s + 1);
    else          m2 = l + s - l * s;

    m1 = l * 2 - m2;
    hue = h / 360;

    r = Math.round(ColorsConverter.HueToRGB(m1, m2, hue + 1/3));
    g = Math.round(ColorsConverter.HueToRGB(m1, m2, hue));
    b = Math.round(ColorsConverter.HueToRGB(m1, m2, hue - 1/3));
  }

  return {
    R: r,
    G: g,
    B: b
  };
};

/**
 *  Function: HueToRGB
 *  -
 *
 *  Syntax:
 *    number *HueToRGB* (number m1, number m2, number hue)
 *
 *  Parameters:
 *    m1 - ...
 *    m2 - ...
 *    hue - ...
 *
 *  Returns:
 *    R:0-255 | G:0-255 | B:0-255
 */
ColorsConverter.HueToRGB = function(m1, m2, hue)
{
  var v;
  if (hue < 0) hue += 1;
  else if (hue > 1) hue -= 1;

  if (6 * hue < 1) v = m1 + (m2 - m1) * hue * 6;
  else if (2 * hue < 1) v = m2;
  else if (3 * hue < 2) v = m1 + (m2 - m1) * (2/3 - hue) * 6;
  else v = m1;

  return 255 * v;
};
