!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){for(var t={},r=e.split(" "),n=0;n<r.length;++n)t[r[n]]=!0;return t}function r(e,t){if(!t.startOfLine)return!1;for(;;){if(!e.skipTo("\\")){e.skipToEnd(),t.tokenize=null;break}if(e.next(),e.eol()){t.tokenize=r;break}}return"meta"}function n(e,t){if(e.backUp(1),e.match(/(R|u8R|uR|UR|LR)/)){var r=e.match(/"([^\s\\()]{0,16})\(/);return!!r&&(t.cpp11RawStringDelim=r[1],t.tokenize=a,a(e,t))}return e.match(/(u8|u|U|L)/)?!!e.match(/["']/,!1)&&"string":(e.next(),!1)}function o(e,t){for(var r;null!=(r=e.next());)if('"'==r&&!e.eat('"')){t.tokenize=null;break}return"string"}function a(e,t){var r=t.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&"),n=e.match(new RegExp(".*?\\)"+r+'"'));return n?t.tokenize=null:e.skipToEnd(),"string"}function i(t,r){function n(e){if(e)for(var t in e)e.hasOwnProperty(t)&&o.push(t)}"string"==typeof t&&(t=[t]);var o=[];n(r.keywords),n(r.builtin),n(r.atoms),o.length&&(r.helperType=t[0],e.registerHelper("hintWords",t[0],o));for(var a=0;a<t.length;++a)e.defineMIME(t[a],r)}function l(e,t){for(var r=!1;!e.eol();){if(!r&&e.match('"""')){t.tokenize=null;break}r="\\"==e.next()&&!r}return"string"}e.defineMode("clike",function(t,r){function n(e,t){var r=e.next();if(x[r]){var n=x[r](e,t);if(n!==!1)return n}if('"'==r||"'"==r)return t.tokenize=o(r),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(r))return c=r,null;if(/\d/.test(r))return e.eatWhile(/[\w\.]/),"number";if("/"==r){if(e.eat("*"))return t.tokenize=a,a(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(w.test(r))return e.eatWhile(w),"operator";e.eatWhile(/[\w\$_\xa1-\uffff]/);var i=e.current();return m.propertyIsEnumerable(i)?(p.propertyIsEnumerable(i)&&(c="newstatement"),"keyword"):g.propertyIsEnumerable(i)?(p.propertyIsEnumerable(i)&&(c="newstatement"),"builtin"):h.propertyIsEnumerable(i)?"atom":"variable"}function o(e){return function(t,r){for(var n,o=!1,a=!1;null!=(n=t.next());){if(n==e&&!o){a=!0;break}o=!o&&"\\"==n}return(a||!o&&!y)&&(r.tokenize=null),"string"}}function a(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=null;break}n="*"==r}return"comment"}function i(e,t,r,n,o){this.indented=e,this.column=t,this.type=r,this.align=n,this.prev=o}function l(e,t,r){var n=e.indented;return e.context&&"statement"==e.context.type&&(n=e.context.indented),e.context=new i(n,t,r,null,e.context)}function s(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}var c,u=t.indentUnit,d=r.statementIndentUnit||u,f=r.dontAlignCalls,m=r.keywords||{},g=r.builtin||{},p=r.blockKeywords||{},h=r.atoms||{},x=r.hooks||{},y=r.multiLineStrings,b=r.indentStatements!==!1,w=/[+\-*&%=<>!?|\/]/;return{startState:function(e){return{tokenize:null,context:new i((e||0)-u,0,"top",(!1)),indented:0,startOfLine:!0}},token:function(e,t){var r=t.context;if(e.sol()&&(null==r.align&&(r.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;c=null;var o=(t.tokenize||n)(e,t);if("comment"==o||"meta"==o)return o;if(null==r.align&&(r.align=!0),";"!=c&&":"!=c&&","!=c||"statement"!=r.type)if("{"==c)l(t,e.column(),"}");else if("["==c)l(t,e.column(),"]");else if("("==c)l(t,e.column(),")");else if("}"==c){for(;"statement"==r.type;)r=s(t);for("}"==r.type&&(r=s(t));"statement"==r.type;)r=s(t)}else c==r.type?s(t):b&&(("}"==r.type||"top"==r.type)&&";"!=c||"statement"==r.type&&"newstatement"==c)&&l(t,e.column(),"statement");else s(t);return t.startOfLine=!1,o},indent:function(t,r){if(t.tokenize!=n&&null!=t.tokenize)return e.Pass;var o=t.context,a=r&&r.charAt(0);"statement"==o.type&&"}"==a&&(o=o.prev);var i=a==o.type;return"statement"==o.type?o.indented+("{"==a?0:d):!o.align||f&&")"==o.type?")"!=o.type||i?o.indented+(i?0:u):o.indented+d:o.column+(i?0:1)},electricChars:"{}",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});var s="auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";i(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:t(s),blockKeywords:t("case do else for if switch while struct"),atoms:t("null"),hooks:{"#":r},modeProps:{fold:["brace","include"]}}),i(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:t(s+" asm dynamic_cast namespace reinterpret_cast try bool explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected wchar_t alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),blockKeywords:t("catch class do else finally for if struct switch try while"),atoms:t("true false null"),hooks:{"#":r,u:n,U:n,L:n,R:n},modeProps:{fold:["brace","include"]}}),i("text/x-java",{name:"clike",keywords:t("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),blockKeywords:t("catch class do else finally for if switch try while"),atoms:t("true false null"),hooks:{"@":function(e){return e.eatWhile(/[\w\$_]/),"meta"}},modeProps:{fold:["brace","import"]}}),i("text/x-csharp",{name:"clike",keywords:t("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),blockKeywords:t("catch class do else finally for foreach if struct switch try while"),builtin:t("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),atoms:t("true false null"),hooks:{"@":function(e,t){return e.eat('"')?(t.tokenize=o,o(e,t)):(e.eatWhile(/[\w\$_]/),"meta")}}}),i("text/x-scala",{name:"clike",keywords:t("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),multiLineStrings:!0,blockKeywords:t("catch class do else finally for forSome if match switch try while"),atoms:t("true false null"),indentStatements:!1,hooks:{"@":function(e){return e.eatWhile(/[\w\$_]/),"meta"},'"':function(e,t){return!!e.match('""')&&(t.tokenize=l,t.tokenize(e,t))},"'":function(e){return e.eatWhile(/[\w\$_\xa1-\uffff]/),"atom"}}}),i(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:t("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4 sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),blockKeywords:t("for while do if else struct"),builtin:t("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),atoms:t("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),hooks:{"#":r},modeProps:{fold:["brace","include"]}}),i("text/x-nesc",{name:"clike",keywords:t(s+"as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),blockKeywords:t("case do else for if switch while struct"),atoms:t("null"),hooks:{"#":r},modeProps:{fold:["brace","include"]}}),i("text/x-objectivec",{name:"clike",keywords:t(s+"inline restrict _Bool _Complex _Imaginery BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),atoms:t("YES NO NULL NILL ON OFF"),hooks:{"@":function(e){return e.eatWhile(/[\w\$]/),"keyword"},"#":r},modeProps:{fold:"brace"}})});