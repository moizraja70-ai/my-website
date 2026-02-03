import{M as I}from"./index-BMIpSDBK.js";var Ao={};/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let To,So;function _o(){return{geminiUrl:To,vertexUrl:So}}function Eo(t,e,i,n){var s,r;if(!(t!=null&&t.baseUrl)){const l=_o();return e?(s=l.vertexUrl)!==null&&s!==void 0?s:i:(r=l.geminiUrl)!==null&&r!==void 0?r:n}return t.baseUrl}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Z{}function b(t,e){const i=/\{([^}]+)\}/g;return t.replace(i,(n,s)=>{if(Object.prototype.hasOwnProperty.call(e,s)){const r=e[s];return r!=null?String(r):""}else throw new Error(`Key '${s}' not found in valueMap.`)})}function a(t,e,i){for(let r=0;r<e.length-1;r++){const l=e[r];if(l.endsWith("[]")){const c=l.slice(0,-2);if(!(c in t))if(Array.isArray(i))t[c]=Array.from({length:i.length},()=>({}));else throw new Error(`Value must be a list given an array path ${l}`);if(Array.isArray(t[c])){const u=t[c];if(Array.isArray(i))for(let d=0;d<u.length;d++){const m=u[d];a(m,e.slice(r+1),i[d])}else for(const d of u)a(d,e.slice(r+1),i)}return}else if(l.endsWith("[0]")){const c=l.slice(0,-3);c in t||(t[c]=[{}]);const u=t[c];a(u[0],e.slice(r+1),i);return}(!t[l]||typeof t[l]!="object")&&(t[l]={}),t=t[l]}const n=e[e.length-1],s=t[n];if(s!==void 0){if(!i||typeof i=="object"&&Object.keys(i).length===0||i===s)return;if(typeof s=="object"&&typeof i=="object"&&s!==null&&i!==null)Object.assign(s,i);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else n==="_self"&&typeof i=="object"&&i!==null&&!Array.isArray(i)?Object.assign(t,i):t[n]=i}function o(t,e,i=void 0){try{if(e.length===1&&e[0]==="_self")return t;for(let n=0;n<e.length;n++){if(typeof t!="object"||t===null)return i;const s=e[n];if(s.endsWith("[]")){const r=s.slice(0,-2);if(r in t){const l=t[r];return Array.isArray(l)?l.map(c=>o(c,e.slice(n+1),i)):i}else return i}else t=t[s]}return t}catch(n){if(n instanceof TypeError)return i;throw n}}function ko(t,e){for(const[i,n]of Object.entries(e)){const s=i.split("."),r=n.split("."),l=new Set;let c=-1;for(let u=0;u<s.length;u++)if(s[u]==="*"){c=u;break}if(c!==-1&&r.length>c)for(let u=c;u<r.length;u++){const d=r[u];d!=="*"&&!d.endsWith("[]")&&!d.endsWith("[0]")&&l.add(d)}He(t,s,r,0,l)}}function He(t,e,i,n,s){if(n>=e.length||typeof t!="object"||t===null)return;const r=e[n];if(r.endsWith("[]")){const l=r.slice(0,-2),c=t;if(l in c&&Array.isArray(c[l]))for(const u of c[l])He(u,e,i,n+1,s)}else if(r==="*"){if(typeof t=="object"&&t!==null&&!Array.isArray(t)){const l=t,c=Object.keys(l).filter(d=>!d.startsWith("_")&&!s.has(d)),u={};for(const d of c)u[d]=l[d];for(const[d,m]of Object.entries(u)){const h=[];for(const p of i.slice(n))p==="*"?h.push(d):h.push(p);a(l,h,m)}for(const d of c)delete l[d]}}else{const l=t;r in l&&He(l[r],e,i,n+1,s)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function je(t){if(typeof t!="string")throw new Error("fromImageBytes must be a string");return t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Mo(t){const e={},i=o(t,["operationName"]);i!=null&&a(e,["operationName"],i);const n=o(t,["resourceName"]);return n!=null&&a(e,["_url","resourceName"],n),e}function Po(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response","generateVideoResponse"]);return l!=null&&a(e,["response"],qo(l)),e}function Ro(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response"]);return l!=null&&a(e,["response"],Do(l)),e}function qo(t){const e={},i=o(t,["generatedSamples"]);if(i!=null){let r=i;Array.isArray(r)&&(r=r.map(l=>No(l))),a(e,["generatedVideos"],r)}const n=o(t,["raiMediaFilteredCount"]);n!=null&&a(e,["raiMediaFilteredCount"],n);const s=o(t,["raiMediaFilteredReasons"]);return s!=null&&a(e,["raiMediaFilteredReasons"],s),e}function Do(t){const e={},i=o(t,["videos"]);if(i!=null){let r=i;Array.isArray(r)&&(r=r.map(l=>Lo(l))),a(e,["generatedVideos"],r)}const n=o(t,["raiMediaFilteredCount"]);n!=null&&a(e,["raiMediaFilteredCount"],n);const s=o(t,["raiMediaFilteredReasons"]);return s!=null&&a(e,["raiMediaFilteredReasons"],s),e}function No(t){const e={},i=o(t,["video"]);return i!=null&&a(e,["video"],Wo(i)),e}function Lo(t){const e={},i=o(t,["_self"]);return i!=null&&a(e,["video"],Oo(i)),e}function Ho(t){const e={},i=o(t,["operationName"]);return i!=null&&a(e,["_url","operationName"],i),e}function Go(t){const e={},i=o(t,["operationName"]);return i!=null&&a(e,["_url","operationName"],i),e}function Fo(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response"]);return l!=null&&a(e,["response"],Bo(l)),e}function Bo(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["parent"]);n!=null&&a(e,["parent"],n);const s=o(t,["documentName"]);return s!=null&&a(e,["documentName"],s),e}function sn(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response"]);return l!=null&&a(e,["response"],Uo(l)),e}function Uo(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["parent"]);n!=null&&a(e,["parent"],n);const s=o(t,["documentName"]);return s!=null&&a(e,["documentName"],s),e}function Wo(t){const e={},i=o(t,["uri"]);i!=null&&a(e,["uri"],i);const n=o(t,["encodedVideo"]);n!=null&&a(e,["videoBytes"],je(n));const s=o(t,["encoding"]);return s!=null&&a(e,["mimeType"],s),e}function Oo(t){const e={},i=o(t,["gcsUri"]);i!=null&&a(e,["uri"],i);const n=o(t,["bytesBase64Encoded"]);n!=null&&a(e,["videoBytes"],je(n));const s=o(t,["mimeType"]);return s!=null&&a(e,["mimeType"],s),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var ht;(function(t){t.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",t.OUTCOME_OK="OUTCOME_OK",t.OUTCOME_FAILED="OUTCOME_FAILED",t.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(ht||(ht={}));var pt;(function(t){t.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",t.PYTHON="PYTHON"})(pt||(pt={}));var gt;(function(t){t.SCHEDULING_UNSPECIFIED="SCHEDULING_UNSPECIFIED",t.SILENT="SILENT",t.WHEN_IDLE="WHEN_IDLE",t.INTERRUPT="INTERRUPT"})(gt||(gt={}));var q;(function(t){t.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",t.STRING="STRING",t.NUMBER="NUMBER",t.INTEGER="INTEGER",t.BOOLEAN="BOOLEAN",t.ARRAY="ARRAY",t.OBJECT="OBJECT",t.NULL="NULL"})(q||(q={}));var ft;(function(t){t.API_SPEC_UNSPECIFIED="API_SPEC_UNSPECIFIED",t.SIMPLE_SEARCH="SIMPLE_SEARCH",t.ELASTIC_SEARCH="ELASTIC_SEARCH"})(ft||(ft={}));var yt;(function(t){t.AUTH_TYPE_UNSPECIFIED="AUTH_TYPE_UNSPECIFIED",t.NO_AUTH="NO_AUTH",t.API_KEY_AUTH="API_KEY_AUTH",t.HTTP_BASIC_AUTH="HTTP_BASIC_AUTH",t.GOOGLE_SERVICE_ACCOUNT_AUTH="GOOGLE_SERVICE_ACCOUNT_AUTH",t.OAUTH="OAUTH",t.OIDC_AUTH="OIDC_AUTH"})(yt||(yt={}));var wt;(function(t){t.HTTP_IN_UNSPECIFIED="HTTP_IN_UNSPECIFIED",t.HTTP_IN_QUERY="HTTP_IN_QUERY",t.HTTP_IN_HEADER="HTTP_IN_HEADER",t.HTTP_IN_PATH="HTTP_IN_PATH",t.HTTP_IN_BODY="HTTP_IN_BODY",t.HTTP_IN_COOKIE="HTTP_IN_COOKIE"})(wt||(wt={}));var vt;(function(t){t.PHISH_BLOCK_THRESHOLD_UNSPECIFIED="PHISH_BLOCK_THRESHOLD_UNSPECIFIED",t.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",t.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",t.BLOCK_HIGH_AND_ABOVE="BLOCK_HIGH_AND_ABOVE",t.BLOCK_HIGHER_AND_ABOVE="BLOCK_HIGHER_AND_ABOVE",t.BLOCK_VERY_HIGH_AND_ABOVE="BLOCK_VERY_HIGH_AND_ABOVE",t.BLOCK_ONLY_EXTREMELY_HIGH="BLOCK_ONLY_EXTREMELY_HIGH"})(vt||(vt={}));var bt;(function(t){t.UNSPECIFIED="UNSPECIFIED",t.BLOCKING="BLOCKING",t.NON_BLOCKING="NON_BLOCKING"})(bt||(bt={}));var Ct;(function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.MODE_DYNAMIC="MODE_DYNAMIC"})(Ct||(Ct={}));var It;(function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.AUTO="AUTO",t.ANY="ANY",t.NONE="NONE",t.VALIDATED="VALIDATED"})(It||(It={}));var xt;(function(t){t.THINKING_LEVEL_UNSPECIFIED="THINKING_LEVEL_UNSPECIFIED",t.LOW="LOW",t.MEDIUM="MEDIUM",t.HIGH="HIGH",t.MINIMAL="MINIMAL"})(xt||(xt={}));var At;(function(t){t.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",t.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",t.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",t.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",t.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",t.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY",t.HARM_CATEGORY_IMAGE_HATE="HARM_CATEGORY_IMAGE_HATE",t.HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT="HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT",t.HARM_CATEGORY_IMAGE_HARASSMENT="HARM_CATEGORY_IMAGE_HARASSMENT",t.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT="HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT",t.HARM_CATEGORY_JAILBREAK="HARM_CATEGORY_JAILBREAK"})(At||(At={}));var Tt;(function(t){t.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",t.SEVERITY="SEVERITY",t.PROBABILITY="PROBABILITY"})(Tt||(Tt={}));var St;(function(t){t.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",t.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",t.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",t.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",t.BLOCK_NONE="BLOCK_NONE",t.OFF="OFF"})(St||(St={}));var _t;(function(t){t.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",t.STOP="STOP",t.MAX_TOKENS="MAX_TOKENS",t.SAFETY="SAFETY",t.RECITATION="RECITATION",t.LANGUAGE="LANGUAGE",t.OTHER="OTHER",t.BLOCKLIST="BLOCKLIST",t.PROHIBITED_CONTENT="PROHIBITED_CONTENT",t.SPII="SPII",t.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",t.IMAGE_SAFETY="IMAGE_SAFETY",t.UNEXPECTED_TOOL_CALL="UNEXPECTED_TOOL_CALL",t.IMAGE_PROHIBITED_CONTENT="IMAGE_PROHIBITED_CONTENT",t.NO_IMAGE="NO_IMAGE",t.IMAGE_RECITATION="IMAGE_RECITATION",t.IMAGE_OTHER="IMAGE_OTHER"})(_t||(_t={}));var Et;(function(t){t.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",t.NEGLIGIBLE="NEGLIGIBLE",t.LOW="LOW",t.MEDIUM="MEDIUM",t.HIGH="HIGH"})(Et||(Et={}));var kt;(function(t){t.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",t.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",t.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",t.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",t.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(kt||(kt={}));var Mt;(function(t){t.URL_RETRIEVAL_STATUS_UNSPECIFIED="URL_RETRIEVAL_STATUS_UNSPECIFIED",t.URL_RETRIEVAL_STATUS_SUCCESS="URL_RETRIEVAL_STATUS_SUCCESS",t.URL_RETRIEVAL_STATUS_ERROR="URL_RETRIEVAL_STATUS_ERROR",t.URL_RETRIEVAL_STATUS_PAYWALL="URL_RETRIEVAL_STATUS_PAYWALL",t.URL_RETRIEVAL_STATUS_UNSAFE="URL_RETRIEVAL_STATUS_UNSAFE"})(Mt||(Mt={}));var Pt;(function(t){t.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",t.SAFETY="SAFETY",t.OTHER="OTHER",t.BLOCKLIST="BLOCKLIST",t.PROHIBITED_CONTENT="PROHIBITED_CONTENT",t.IMAGE_SAFETY="IMAGE_SAFETY",t.MODEL_ARMOR="MODEL_ARMOR",t.JAILBREAK="JAILBREAK"})(Pt||(Pt={}));var Rt;(function(t){t.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",t.ON_DEMAND="ON_DEMAND",t.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})(Rt||(Rt={}));var be;(function(t){t.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",t.TEXT="TEXT",t.IMAGE="IMAGE",t.AUDIO="AUDIO"})(be||(be={}));var qt;(function(t){t.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",t.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",t.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",t.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(qt||(qt={}));var Dt;(function(t){t.TUNING_MODE_UNSPECIFIED="TUNING_MODE_UNSPECIFIED",t.TUNING_MODE_FULL="TUNING_MODE_FULL",t.TUNING_MODE_PEFT_ADAPTER="TUNING_MODE_PEFT_ADAPTER"})(Dt||(Dt={}));var Nt;(function(t){t.ADAPTER_SIZE_UNSPECIFIED="ADAPTER_SIZE_UNSPECIFIED",t.ADAPTER_SIZE_ONE="ADAPTER_SIZE_ONE",t.ADAPTER_SIZE_TWO="ADAPTER_SIZE_TWO",t.ADAPTER_SIZE_FOUR="ADAPTER_SIZE_FOUR",t.ADAPTER_SIZE_EIGHT="ADAPTER_SIZE_EIGHT",t.ADAPTER_SIZE_SIXTEEN="ADAPTER_SIZE_SIXTEEN",t.ADAPTER_SIZE_THIRTY_TWO="ADAPTER_SIZE_THIRTY_TWO"})(Nt||(Nt={}));var Ge;(function(t){t.JOB_STATE_UNSPECIFIED="JOB_STATE_UNSPECIFIED",t.JOB_STATE_QUEUED="JOB_STATE_QUEUED",t.JOB_STATE_PENDING="JOB_STATE_PENDING",t.JOB_STATE_RUNNING="JOB_STATE_RUNNING",t.JOB_STATE_SUCCEEDED="JOB_STATE_SUCCEEDED",t.JOB_STATE_FAILED="JOB_STATE_FAILED",t.JOB_STATE_CANCELLING="JOB_STATE_CANCELLING",t.JOB_STATE_CANCELLED="JOB_STATE_CANCELLED",t.JOB_STATE_PAUSED="JOB_STATE_PAUSED",t.JOB_STATE_EXPIRED="JOB_STATE_EXPIRED",t.JOB_STATE_UPDATING="JOB_STATE_UPDATING",t.JOB_STATE_PARTIALLY_SUCCEEDED="JOB_STATE_PARTIALLY_SUCCEEDED"})(Ge||(Ge={}));var Lt;(function(t){t.TUNING_TASK_UNSPECIFIED="TUNING_TASK_UNSPECIFIED",t.TUNING_TASK_I2V="TUNING_TASK_I2V",t.TUNING_TASK_T2V="TUNING_TASK_T2V",t.TUNING_TASK_R2V="TUNING_TASK_R2V"})(Lt||(Lt={}));var Ht;(function(t){t.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",t.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",t.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",t.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH",t.MEDIA_RESOLUTION_ULTRA_HIGH="MEDIA_RESOLUTION_ULTRA_HIGH"})(Ht||(Ht={}));var Fe;(function(t){t.COLLECTION="COLLECTION"})(Fe||(Fe={}));var Gt;(function(t){t.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",t.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",t.BALANCED="BALANCED",t.PRIORITIZE_COST="PRIORITIZE_COST"})(Gt||(Gt={}));var Ft;(function(t){t.ENVIRONMENT_UNSPECIFIED="ENVIRONMENT_UNSPECIFIED",t.ENVIRONMENT_BROWSER="ENVIRONMENT_BROWSER"})(Ft||(Ft={}));var Bt;(function(t){t.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",t.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",t.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",t.BLOCK_NONE="BLOCK_NONE"})(Bt||(Bt={}));var Ut;(function(t){t.DONT_ALLOW="DONT_ALLOW",t.ALLOW_ADULT="ALLOW_ADULT",t.ALLOW_ALL="ALLOW_ALL"})(Ut||(Ut={}));var Wt;(function(t){t.auto="auto",t.en="en",t.ja="ja",t.ko="ko",t.hi="hi",t.zh="zh",t.pt="pt",t.es="es"})(Wt||(Wt={}));var Ot;(function(t){t.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",t.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",t.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",t.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",t.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})(Ot||(Ot={}));var Vt;(function(t){t.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",t.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",t.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",t.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(Vt||(Vt={}));var zt;(function(t){t.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",t.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",t.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",t.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(zt||(zt={}));var Jt;(function(t){t.EDIT_MODE_DEFAULT="EDIT_MODE_DEFAULT",t.EDIT_MODE_INPAINT_REMOVAL="EDIT_MODE_INPAINT_REMOVAL",t.EDIT_MODE_INPAINT_INSERTION="EDIT_MODE_INPAINT_INSERTION",t.EDIT_MODE_OUTPAINT="EDIT_MODE_OUTPAINT",t.EDIT_MODE_CONTROLLED_EDITING="EDIT_MODE_CONTROLLED_EDITING",t.EDIT_MODE_STYLE="EDIT_MODE_STYLE",t.EDIT_MODE_BGSWAP="EDIT_MODE_BGSWAP",t.EDIT_MODE_PRODUCT_IMAGE="EDIT_MODE_PRODUCT_IMAGE"})(Jt||(Jt={}));var Yt;(function(t){t.FOREGROUND="FOREGROUND",t.BACKGROUND="BACKGROUND",t.PROMPT="PROMPT",t.SEMANTIC="SEMANTIC",t.INTERACTIVE="INTERACTIVE"})(Yt||(Yt={}));var Kt;(function(t){t.ASSET="ASSET",t.STYLE="STYLE"})(Kt||(Kt={}));var Zt;(function(t){t.INSERT="INSERT",t.REMOVE="REMOVE",t.REMOVE_STATIC="REMOVE_STATIC",t.OUTPAINT="OUTPAINT"})(Zt||(Zt={}));var $t;(function(t){t.OPTIMIZED="OPTIMIZED",t.LOSSLESS="LOSSLESS"})($t||($t={}));var Qt;(function(t){t.SUPERVISED_FINE_TUNING="SUPERVISED_FINE_TUNING",t.PREFERENCE_TUNING="PREFERENCE_TUNING"})(Qt||(Qt={}));var Xt;(function(t){t.STATE_UNSPECIFIED="STATE_UNSPECIFIED",t.STATE_PENDING="STATE_PENDING",t.STATE_ACTIVE="STATE_ACTIVE",t.STATE_FAILED="STATE_FAILED"})(Xt||(Xt={}));var jt;(function(t){t.STATE_UNSPECIFIED="STATE_UNSPECIFIED",t.PROCESSING="PROCESSING",t.ACTIVE="ACTIVE",t.FAILED="FAILED"})(jt||(jt={}));var ei;(function(t){t.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",t.UPLOADED="UPLOADED",t.GENERATED="GENERATED",t.REGISTERED="REGISTERED"})(ei||(ei={}));var ti;(function(t){t.TURN_COMPLETE_REASON_UNSPECIFIED="TURN_COMPLETE_REASON_UNSPECIFIED",t.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",t.RESPONSE_REJECTED="RESPONSE_REJECTED",t.NEED_MORE_INPUT="NEED_MORE_INPUT"})(ti||(ti={}));var ii;(function(t){t.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",t.TEXT="TEXT",t.IMAGE="IMAGE",t.VIDEO="VIDEO",t.AUDIO="AUDIO",t.DOCUMENT="DOCUMENT"})(ii||(ii={}));var ni;(function(t){t.VAD_SIGNAL_TYPE_UNSPECIFIED="VAD_SIGNAL_TYPE_UNSPECIFIED",t.VAD_SIGNAL_TYPE_SOS="VAD_SIGNAL_TYPE_SOS",t.VAD_SIGNAL_TYPE_EOS="VAD_SIGNAL_TYPE_EOS"})(ni||(ni={}));var oi;(function(t){t.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",t.ACTIVITY_START="ACTIVITY_START",t.ACTIVITY_END="ACTIVITY_END"})(oi||(oi={}));var si;(function(t){t.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",t.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",t.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(si||(si={}));var ai;(function(t){t.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",t.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",t.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(ai||(ai={}));var ri;(function(t){t.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",t.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",t.NO_INTERRUPTION="NO_INTERRUPTION"})(ri||(ri={}));var li;(function(t){t.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",t.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",t.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(li||(li={}));var ci;(function(t){t.SCALE_UNSPECIFIED="SCALE_UNSPECIFIED",t.C_MAJOR_A_MINOR="C_MAJOR_A_MINOR",t.D_FLAT_MAJOR_B_FLAT_MINOR="D_FLAT_MAJOR_B_FLAT_MINOR",t.D_MAJOR_B_MINOR="D_MAJOR_B_MINOR",t.E_FLAT_MAJOR_C_MINOR="E_FLAT_MAJOR_C_MINOR",t.E_MAJOR_D_FLAT_MINOR="E_MAJOR_D_FLAT_MINOR",t.F_MAJOR_D_MINOR="F_MAJOR_D_MINOR",t.G_FLAT_MAJOR_E_FLAT_MINOR="G_FLAT_MAJOR_E_FLAT_MINOR",t.G_MAJOR_E_MINOR="G_MAJOR_E_MINOR",t.A_FLAT_MAJOR_F_MINOR="A_FLAT_MAJOR_F_MINOR",t.A_MAJOR_G_FLAT_MINOR="A_MAJOR_G_FLAT_MINOR",t.B_FLAT_MAJOR_G_MINOR="B_FLAT_MAJOR_G_MINOR",t.B_MAJOR_A_FLAT_MINOR="B_MAJOR_A_FLAT_MINOR"})(ci||(ci={}));var di;(function(t){t.MUSIC_GENERATION_MODE_UNSPECIFIED="MUSIC_GENERATION_MODE_UNSPECIFIED",t.QUALITY="QUALITY",t.DIVERSITY="DIVERSITY",t.VOCALIZATION="VOCALIZATION"})(di||(di={}));var te;(function(t){t.PLAYBACK_CONTROL_UNSPECIFIED="PLAYBACK_CONTROL_UNSPECIFIED",t.PLAY="PLAY",t.PAUSE="PAUSE",t.STOP="STOP",t.RESET_CONTEXT="RESET_CONTEXT"})(te||(te={}));class Be{constructor(e){const i={};for(const n of e.headers.entries())i[n[0]]=n[1];this.headers=i,this.responseInternal=e}json(){return this.responseInternal.json()}}class le{get text(){var e,i,n,s,r,l,c,u;if(((s=(n=(i=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||i===void 0?void 0:i.content)===null||n===void 0?void 0:n.parts)===null||s===void 0?void 0:s.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let d="",m=!1;const h=[];for(const p of(u=(c=(l=(r=this.candidates)===null||r===void 0?void 0:r[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)!==null&&u!==void 0?u:[]){for(const[g,f]of Object.entries(p))g!=="text"&&g!=="thought"&&g!=="thoughtSignature"&&(f!==null||f!==void 0)&&h.push(g);if(typeof p.text=="string"){if(typeof p.thought=="boolean"&&p.thought)continue;m=!0,d+=p.text}}return h.length>0&&console.warn(`there are non-text parts ${h} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),m?d:void 0}get data(){var e,i,n,s,r,l,c,u;if(((s=(n=(i=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||i===void 0?void 0:i.content)===null||n===void 0?void 0:n.parts)===null||s===void 0?void 0:s.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning data from the first one.");let d="";const m=[];for(const h of(u=(c=(l=(r=this.candidates)===null||r===void 0?void 0:r[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)!==null&&u!==void 0?u:[]){for(const[p,g]of Object.entries(h))p!=="inlineData"&&(g!==null||g!==void 0)&&m.push(p);h.inlineData&&typeof h.inlineData.data=="string"&&(d+=atob(h.inlineData.data))}return m.length>0&&console.warn(`there are non-data parts ${m} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),d.length>0?btoa(d):void 0}get functionCalls(){var e,i,n,s,r,l,c,u;if(((s=(n=(i=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||i===void 0?void 0:i.content)===null||n===void 0?void 0:n.parts)===null||s===void 0?void 0:s.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const d=(u=(c=(l=(r=this.candidates)===null||r===void 0?void 0:r[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(m=>m.functionCall).map(m=>m.functionCall).filter(m=>m!==void 0);if((d==null?void 0:d.length)!==0)return d}get executableCode(){var e,i,n,s,r,l,c,u,d;if(((s=(n=(i=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||i===void 0?void 0:i.content)===null||n===void 0?void 0:n.parts)===null||s===void 0?void 0:s.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const m=(u=(c=(l=(r=this.candidates)===null||r===void 0?void 0:r[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(h=>h.executableCode).map(h=>h.executableCode).filter(h=>h!==void 0);if((m==null?void 0:m.length)!==0)return(d=m==null?void 0:m[0])===null||d===void 0?void 0:d.code}get codeExecutionResult(){var e,i,n,s,r,l,c,u,d;if(((s=(n=(i=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||i===void 0?void 0:i.content)===null||n===void 0?void 0:n.parts)===null||s===void 0?void 0:s.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const m=(u=(c=(l=(r=this.candidates)===null||r===void 0?void 0:r[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(h=>h.codeExecutionResult).map(h=>h.codeExecutionResult).filter(h=>h!==void 0);if((m==null?void 0:m.length)!==0)return(d=m==null?void 0:m[0])===null||d===void 0?void 0:d.output}}class ui{}class mi{}class Vo{}class zo{}class Jo{}class Yo{}class hi{}class pi{}class gi{}class Ko{}class Ce{_fromAPIResponse({apiResponse:e,_isVertexAI:i}){const n=new Ce;let s;const r=e;return i?s=Ro(r):s=Po(r),Object.assign(n,s),n}}class fi{}class yi{}class wi{}class vi{}class Zo{}class $o{}class Qo{}class et{_fromAPIResponse({apiResponse:e,_isVertexAI:i}){const n=new et,r=Fo(e);return Object.assign(n,r),n}}class Xo{}class jo{}class es{}class bi{}class ts{get text(){var e,i,n;let s="",r=!1;const l=[];for(const c of(n=(i=(e=this.serverContent)===null||e===void 0?void 0:e.modelTurn)===null||i===void 0?void 0:i.parts)!==null&&n!==void 0?n:[]){for(const[u,d]of Object.entries(c))u!=="text"&&u!=="thought"&&d!==null&&l.push(u);if(typeof c.text=="string"){if(typeof c.thought=="boolean"&&c.thought)continue;r=!0,s+=c.text}}return l.length>0&&console.warn(`there are non-text parts ${l} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),r?s:void 0}get data(){var e,i,n;let s="";const r=[];for(const l of(n=(i=(e=this.serverContent)===null||e===void 0?void 0:e.modelTurn)===null||i===void 0?void 0:i.parts)!==null&&n!==void 0?n:[]){for(const[c,u]of Object.entries(l))c!=="inlineData"&&u!==null&&r.push(c);l.inlineData&&typeof l.inlineData.data=="string"&&(s+=atob(l.inlineData.data))}return r.length>0&&console.warn(`there are non-data parts ${r} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),s.length>0?btoa(s):void 0}}class is{get audioChunk(){if(this.serverContent&&this.serverContent.audioChunks&&this.serverContent.audioChunks.length>0)return this.serverContent.audioChunks[0]}}class tt{_fromAPIResponse({apiResponse:e,_isVertexAI:i}){const n=new tt,r=sn(e);return Object.assign(n,r),n}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function P(t,e){if(!e||typeof e!="string")throw new Error("model is required and must be a string");if(e.includes("..")||e.includes("?")||e.includes("&"))throw new Error("invalid model parameter");if(t.isVertexAI()){if(e.startsWith("publishers/")||e.startsWith("projects/")||e.startsWith("models/"))return e;if(e.indexOf("/")>=0){const i=e.split("/",2);return`publishers/${i[0]}/models/${i[1]}`}else return`publishers/google/models/${e}`}else return e.startsWith("models/")||e.startsWith("tunedModels/")?e:`models/${e}`}function an(t,e){const i=P(t,e);return i?i.startsWith("publishers/")&&t.isVertexAI()?`projects/${t.getProject()}/locations/${t.getLocation()}/${i}`:i.startsWith("models/")&&t.isVertexAI()?`projects/${t.getProject()}/locations/${t.getLocation()}/publishers/google/${i}`:i:""}function rn(t){return Array.isArray(t)?t.map(e=>Ie(e)):[Ie(t)]}function Ie(t){if(typeof t=="object"&&t!==null)return t;throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof t}`)}function ln(t){const e=Ie(t);if(e.mimeType&&e.mimeType.startsWith("image/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function cn(t){const e=Ie(t);if(e.mimeType&&e.mimeType.startsWith("audio/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function Ci(t){if(t==null)throw new Error("PartUnion is required");if(typeof t=="object")return t;if(typeof t=="string")return{text:t};throw new Error(`Unsupported part type: ${typeof t}`)}function dn(t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("PartListUnion is required");return Array.isArray(t)?t.map(e=>Ci(e)):[Ci(t)]}function Ue(t){return t!=null&&typeof t=="object"&&"parts"in t&&Array.isArray(t.parts)}function Ii(t){return t!=null&&typeof t=="object"&&"functionCall"in t}function xi(t){return t!=null&&typeof t=="object"&&"functionResponse"in t}function H(t){if(t==null)throw new Error("ContentUnion is required");return Ue(t)?t:{role:"user",parts:dn(t)}}function it(t,e){if(!e)return[];if(t.isVertexAI()&&Array.isArray(e))return e.flatMap(i=>{const n=H(i);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(t.isVertexAI()){const i=H(e);return i.parts&&i.parts.length>0&&i.parts[0].text!==void 0?[i.parts[0].text]:[]}return Array.isArray(e)?e.map(i=>H(i)):[H(e)]}function B(t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("contents are required");if(!Array.isArray(t)){if(Ii(t)||xi(t))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[H(t)]}const e=[],i=[],n=Ue(t[0]);for(const s of t){const r=Ue(s);if(r!=n)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(r)e.push(s);else{if(Ii(s)||xi(s))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");i.push(s)}}return n||e.push({role:"user",parts:dn(i)}),e}function ns(t,e){t.includes("null")&&(e.nullable=!0);const i=t.filter(n=>n!=="null");if(i.length===1)e.type=Object.values(q).includes(i[0].toUpperCase())?i[0].toUpperCase():q.TYPE_UNSPECIFIED;else{e.anyOf=[];for(const n of i)e.anyOf.push({type:Object.values(q).includes(n.toUpperCase())?n.toUpperCase():q.TYPE_UNSPECIFIED})}}function ne(t){const e={},i=["items"],n=["anyOf"],s=["properties"];if(t.type&&t.anyOf)throw new Error("type and anyOf cannot be both populated.");const r=t.anyOf;r!=null&&r.length==2&&(r[0].type==="null"?(e.nullable=!0,t=r[1]):r[1].type==="null"&&(e.nullable=!0,t=r[0])),t.type instanceof Array&&ns(t.type,e);for(const[l,c]of Object.entries(t))if(c!=null)if(l=="type"){if(c==="null")throw new Error("type: null can not be the only possible type for the field.");if(c instanceof Array)continue;e.type=Object.values(q).includes(c.toUpperCase())?c.toUpperCase():q.TYPE_UNSPECIFIED}else if(i.includes(l))e[l]=ne(c);else if(n.includes(l)){const u=[];for(const d of c){if(d.type=="null"){e.nullable=!0;continue}u.push(ne(d))}e[l]=u}else if(s.includes(l)){const u={};for(const[d,m]of Object.entries(c))u[d]=ne(m);e[l]=u}else{if(l==="additionalProperties")continue;e[l]=c}return e}function nt(t){return ne(t)}function ot(t){if(typeof t=="object")return t;if(typeof t=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:t}}};throw new Error(`Unsupported speechConfig type: ${typeof t}`)}function st(t){if("multiSpeakerVoiceConfig"in t)throw new Error("multiSpeakerVoiceConfig is not supported in the live API.");return t}function se(t){if(t.functionDeclarations)for(const e of t.functionDeclarations)e.parameters&&(Object.keys(e.parameters).includes("$schema")?e.parametersJsonSchema||(e.parametersJsonSchema=e.parameters,delete e.parameters):e.parameters=ne(e.parameters)),e.response&&(Object.keys(e.response).includes("$schema")?e.responseJsonSchema||(e.responseJsonSchema=e.response,delete e.response):e.response=ne(e.response));return t}function ae(t){if(t==null)throw new Error("tools is required");if(!Array.isArray(t))throw new Error("tools is required and must be an array of Tools");const e=[];for(const i of t)e.push(i);return e}function os(t,e,i,n=1){const s=!e.startsWith(`${i}/`)&&e.split("/").length===n;return t.isVertexAI()?e.startsWith("projects/")?e:e.startsWith("locations/")?`projects/${t.getProject()}/${e}`:e.startsWith(`${i}/`)?`projects/${t.getProject()}/locations/${t.getLocation()}/${e}`:s?`projects/${t.getProject()}/locations/${t.getLocation()}/${i}/${e}`:e:s?`${i}/${e}`:e}function $(t,e){if(typeof e!="string")throw new Error("name must be a string");return os(t,e,"cachedContents")}function un(t){switch(t){case"STATE_UNSPECIFIED":return"JOB_STATE_UNSPECIFIED";case"CREATING":return"JOB_STATE_RUNNING";case"ACTIVE":return"JOB_STATE_SUCCEEDED";case"FAILED":return"JOB_STATE_FAILED";default:return t}}function Q(t){return je(t)}function ss(t){return t!=null&&typeof t=="object"&&"name"in t}function as(t){return t!=null&&typeof t=="object"&&"video"in t}function rs(t){return t!=null&&typeof t=="object"&&"uri"in t}function mn(t){var e;let i;if(ss(t)&&(i=t.name),!(rs(t)&&(i=t.uri,i===void 0))&&!(as(t)&&(i=(e=t.video)===null||e===void 0?void 0:e.uri,i===void 0))){if(typeof t=="string"&&(i=t),i===void 0)throw new Error("Could not extract file name from the provided input.");if(i.startsWith("https://")){const s=i.split("files/")[1].match(/[a-z0-9]+/);if(s===null)throw new Error(`Could not extract file name from URI ${i}`);i=s[0]}else i.startsWith("files/")&&(i=i.split("files/")[1]);return i}}function hn(t,e){let i;return t.isVertexAI()?i=e?"publishers/google/models":"models":i=e?"models":"tunedModels",i}function pn(t){for(const e of["models","tunedModels","publisherModels"])if(ls(t,e))return t[e];return[]}function ls(t,e){return t!==null&&typeof t=="object"&&e in t}function cs(t,e={}){const i=t,n={name:i.name,description:i.description,parametersJsonSchema:i.inputSchema};return i.outputSchema&&(n.responseJsonSchema=i.outputSchema),e.behavior&&(n.behavior=e.behavior),{functionDeclarations:[n]}}function ds(t,e={}){const i=[],n=new Set;for(const s of t){const r=s.name;if(n.has(r))throw new Error(`Duplicate function name ${r} found in MCP tools. Please ensure function names are unique.`);n.add(r);const l=cs(s,e);l.functionDeclarations&&i.push(...l.functionDeclarations)}return{functionDeclarations:i}}function gn(t,e){let i;if(typeof e=="string")if(t.isVertexAI())if(e.startsWith("gs://"))i={format:"jsonl",gcsUri:[e]};else if(e.startsWith("bq://"))i={format:"bigquery",bigqueryUri:e};else throw new Error(`Unsupported string source for Vertex AI: ${e}`);else if(e.startsWith("files/"))i={fileName:e};else throw new Error(`Unsupported string source for Gemini API: ${e}`);else if(Array.isArray(e)){if(t.isVertexAI())throw new Error("InlinedRequest[] is not supported in Vertex AI.");i={inlinedRequests:e}}else i=e;const n=[i.gcsUri,i.bigqueryUri].filter(Boolean).length,s=[i.inlinedRequests,i.fileName].filter(Boolean).length;if(t.isVertexAI()){if(s>0||n!==1)throw new Error("Exactly one of `gcsUri` or `bigqueryUri` must be set for Vertex AI.")}else if(n>0||s!==1)throw new Error("Exactly one of `inlinedRequests`, `fileName`, must be set for Gemini API.");return i}function us(t){if(typeof t!="string")return t;const e=t;if(e.startsWith("gs://"))return{format:"jsonl",gcsUri:e};if(e.startsWith("bq://"))return{format:"bigquery",bigqueryUri:e};throw new Error(`Unsupported destination: ${e}`)}function fn(t){if(typeof t!="object"||t===null)return{};const e=t,i=e.inlinedResponses;if(typeof i!="object"||i===null)return t;const s=i.inlinedResponses;if(!Array.isArray(s)||s.length===0)return t;let r=!1;for(const l of s){if(typeof l!="object"||l===null)continue;const u=l.response;if(typeof u!="object"||u===null)continue;if(u.embedding!==void 0){r=!0;break}}return r&&(e.inlinedEmbedContentResponses=e.inlinedResponses,delete e.inlinedResponses),t}function re(t,e){const i=e;if(!t.isVertexAI()){if(/batches\/[^/]+$/.test(i))return i.split("/").pop();throw new Error(`Invalid batch job name: ${i}.`)}if(/^projects\/[^/]+\/locations\/[^/]+\/batchPredictionJobs\/[^/]+$/.test(i))return i.split("/").pop();if(/^\d+$/.test(i))return i;throw new Error(`Invalid batch job name: ${i}.`)}function yn(t){const e=t;return e==="BATCH_STATE_UNSPECIFIED"?"JOB_STATE_UNSPECIFIED":e==="BATCH_STATE_PENDING"?"JOB_STATE_PENDING":e==="BATCH_STATE_RUNNING"?"JOB_STATE_RUNNING":e==="BATCH_STATE_SUCCEEDED"?"JOB_STATE_SUCCEEDED":e==="BATCH_STATE_FAILED"?"JOB_STATE_FAILED":e==="BATCH_STATE_CANCELLED"?"JOB_STATE_CANCELLED":e==="BATCH_STATE_EXPIRED"?"JOB_STATE_EXPIRED":e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ms(t){const e={},i=o(t,["responsesFile"]);i!=null&&a(e,["fileName"],i);const n=o(t,["inlinedResponses","inlinedResponses"]);if(n!=null){let r=n;Array.isArray(r)&&(r=r.map(l=>Js(l))),a(e,["inlinedResponses"],r)}const s=o(t,["inlinedEmbedContentResponses","inlinedResponses"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["inlinedEmbedContentResponses"],r)}return e}function hs(t){const e={},i=o(t,["predictionsFormat"]);i!=null&&a(e,["format"],i);const n=o(t,["gcsDestination","outputUriPrefix"]);n!=null&&a(e,["gcsUri"],n);const s=o(t,["bigqueryDestination","outputUri"]);return s!=null&&a(e,["bigqueryUri"],s),e}function ps(t){const e={},i=o(t,["format"]);i!=null&&a(e,["predictionsFormat"],i);const n=o(t,["gcsUri"]);n!=null&&a(e,["gcsDestination","outputUriPrefix"],n);const s=o(t,["bigqueryUri"]);if(s!=null&&a(e,["bigqueryDestination","outputUri"],s),o(t,["fileName"])!==void 0)throw new Error("fileName parameter is not supported in Vertex AI.");if(o(t,["inlinedResponses"])!==void 0)throw new Error("inlinedResponses parameter is not supported in Vertex AI.");if(o(t,["inlinedEmbedContentResponses"])!==void 0)throw new Error("inlinedEmbedContentResponses parameter is not supported in Vertex AI.");return e}function we(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata","displayName"]);n!=null&&a(e,["displayName"],n);const s=o(t,["metadata","state"]);s!=null&&a(e,["state"],yn(s));const r=o(t,["metadata","createTime"]);r!=null&&a(e,["createTime"],r);const l=o(t,["metadata","endTime"]);l!=null&&a(e,["endTime"],l);const c=o(t,["metadata","updateTime"]);c!=null&&a(e,["updateTime"],c);const u=o(t,["metadata","model"]);u!=null&&a(e,["model"],u);const d=o(t,["metadata","output"]);return d!=null&&a(e,["dest"],ms(fn(d))),e}function We(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["displayName"]);n!=null&&a(e,["displayName"],n);const s=o(t,["state"]);s!=null&&a(e,["state"],yn(s));const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["createTime"]);l!=null&&a(e,["createTime"],l);const c=o(t,["startTime"]);c!=null&&a(e,["startTime"],c);const u=o(t,["endTime"]);u!=null&&a(e,["endTime"],u);const d=o(t,["updateTime"]);d!=null&&a(e,["updateTime"],d);const m=o(t,["model"]);m!=null&&a(e,["model"],m);const h=o(t,["inputConfig"]);h!=null&&a(e,["src"],gs(h));const p=o(t,["outputConfig"]);p!=null&&a(e,["dest"],hs(fn(p)));const g=o(t,["completionStats"]);return g!=null&&a(e,["completionStats"],g),e}function gs(t){const e={},i=o(t,["instancesFormat"]);i!=null&&a(e,["format"],i);const n=o(t,["gcsSource","uris"]);n!=null&&a(e,["gcsUri"],n);const s=o(t,["bigquerySource","inputUri"]);return s!=null&&a(e,["bigqueryUri"],s),e}function fs(t,e){const i={};if(o(e,["format"])!==void 0)throw new Error("format parameter is not supported in Gemini API.");if(o(e,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");if(o(e,["bigqueryUri"])!==void 0)throw new Error("bigqueryUri parameter is not supported in Gemini API.");const n=o(e,["fileName"]);n!=null&&a(i,["fileName"],n);const s=o(e,["inlinedRequests"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>zs(t,l))),a(i,["requests","requests"],r)}return i}function ys(t){const e={},i=o(t,["format"]);i!=null&&a(e,["instancesFormat"],i);const n=o(t,["gcsUri"]);n!=null&&a(e,["gcsSource","uris"],n);const s=o(t,["bigqueryUri"]);if(s!=null&&a(e,["bigquerySource","inputUri"],s),o(t,["fileName"])!==void 0)throw new Error("fileName parameter is not supported in Vertex AI.");if(o(t,["inlinedRequests"])!==void 0)throw new Error("inlinedRequests parameter is not supported in Vertex AI.");return e}function ws(t){const e={},i=o(t,["data"]);if(i!=null&&a(e,["data"],i),o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function vs(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],re(t,n)),i}function bs(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],re(t,n)),i}function Cs(t){const e={},i=o(t,["content"]);i!=null&&a(e,["content"],i);const n=o(t,["citationMetadata"]);n!=null&&a(e,["citationMetadata"],Is(n));const s=o(t,["tokenCount"]);s!=null&&a(e,["tokenCount"],s);const r=o(t,["finishReason"]);r!=null&&a(e,["finishReason"],r);const l=o(t,["avgLogprobs"]);l!=null&&a(e,["avgLogprobs"],l);const c=o(t,["groundingMetadata"]);c!=null&&a(e,["groundingMetadata"],c);const u=o(t,["index"]);u!=null&&a(e,["index"],u);const d=o(t,["logprobsResult"]);d!=null&&a(e,["logprobsResult"],d);const m=o(t,["safetyRatings"]);if(m!=null){let p=m;Array.isArray(p)&&(p=p.map(g=>g)),a(e,["safetyRatings"],p)}const h=o(t,["urlContextMetadata"]);return h!=null&&a(e,["urlContextMetadata"],h),e}function Is(t){const e={},i=o(t,["citationSources"]);if(i!=null){let n=i;Array.isArray(n)&&(n=n.map(s=>s)),a(e,["citations"],n)}return e}function wn(t){const e={},i=o(t,["parts"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(r=>js(r))),a(e,["parts"],s)}const n=o(t,["role"]);return n!=null&&a(e,["role"],n),e}function xs(t,e){const i={},n=o(t,["displayName"]);if(e!==void 0&&n!=null&&a(e,["batch","displayName"],n),o(t,["dest"])!==void 0)throw new Error("dest parameter is not supported in Gemini API.");return i}function As(t,e){const i={},n=o(t,["displayName"]);e!==void 0&&n!=null&&a(e,["displayName"],n);const s=o(t,["dest"]);return e!==void 0&&s!=null&&a(e,["outputConfig"],ps(us(s))),i}function Ai(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["src"]);s!=null&&a(i,["batch","inputConfig"],fs(t,gn(t,s)));const r=o(e,["config"]);return r!=null&&xs(r,i),i}function Ts(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["model"],P(t,n));const s=o(e,["src"]);s!=null&&a(i,["inputConfig"],ys(gn(t,s)));const r=o(e,["config"]);return r!=null&&As(r,i),i}function Ss(t,e){const i={},n=o(t,["displayName"]);return e!==void 0&&n!=null&&a(e,["batch","displayName"],n),i}function _s(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["src"]);s!=null&&a(i,["batch","inputConfig"],Ds(t,s));const r=o(e,["config"]);return r!=null&&Ss(r,i),i}function Es(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],re(t,n)),i}function ks(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],re(t,n)),i}function Ms(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["name"]);n!=null&&a(e,["name"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);return r!=null&&a(e,["error"],r),e}function Ps(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["name"]);n!=null&&a(e,["name"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);return r!=null&&a(e,["error"],r),e}function Rs(t,e){const i={},n=o(e,["contents"]);if(n!=null){let r=it(t,n);Array.isArray(r)&&(r=r.map(l=>l)),a(i,["requests[]","request","content"],r)}const s=o(e,["config"]);return s!=null&&(a(i,["_self"],qs(s,i)),ko(i,{"requests[].*":"requests[].request.*"})),i}function qs(t,e){const i={},n=o(t,["taskType"]);e!==void 0&&n!=null&&a(e,["requests[]","taskType"],n);const s=o(t,["title"]);e!==void 0&&s!=null&&a(e,["requests[]","title"],s);const r=o(t,["outputDimensionality"]);if(e!==void 0&&r!=null&&a(e,["requests[]","outputDimensionality"],r),o(t,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(o(t,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return i}function Ds(t,e){const i={},n=o(e,["fileName"]);n!=null&&a(i,["file_name"],n);const s=o(e,["inlinedRequests"]);return s!=null&&a(i,["requests"],Rs(t,s)),i}function Ns(t){const e={};if(o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const i=o(t,["fileUri"]);i!=null&&a(e,["fileUri"],i);const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function Ls(t){const e={},i=o(t,["id"]);i!=null&&a(e,["id"],i);const n=o(t,["args"]);n!=null&&a(e,["args"],n);const s=o(t,["name"]);if(s!=null&&a(e,["name"],s),o(t,["partialArgs"])!==void 0)throw new Error("partialArgs parameter is not supported in Gemini API.");if(o(t,["willContinue"])!==void 0)throw new Error("willContinue parameter is not supported in Gemini API.");return e}function Hs(t){const e={},i=o(t,["allowedFunctionNames"]);i!=null&&a(e,["allowedFunctionNames"],i);const n=o(t,["mode"]);if(n!=null&&a(e,["mode"],n),o(t,["streamFunctionCallArguments"])!==void 0)throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");return e}function Gs(t,e,i){const n={},s=o(e,["systemInstruction"]);i!==void 0&&s!=null&&a(i,["systemInstruction"],wn(H(s)));const r=o(e,["temperature"]);r!=null&&a(n,["temperature"],r);const l=o(e,["topP"]);l!=null&&a(n,["topP"],l);const c=o(e,["topK"]);c!=null&&a(n,["topK"],c);const u=o(e,["candidateCount"]);u!=null&&a(n,["candidateCount"],u);const d=o(e,["maxOutputTokens"]);d!=null&&a(n,["maxOutputTokens"],d);const m=o(e,["stopSequences"]);m!=null&&a(n,["stopSequences"],m);const h=o(e,["responseLogprobs"]);h!=null&&a(n,["responseLogprobs"],h);const p=o(e,["logprobs"]);p!=null&&a(n,["logprobs"],p);const g=o(e,["presencePenalty"]);g!=null&&a(n,["presencePenalty"],g);const f=o(e,["frequencyPenalty"]);f!=null&&a(n,["frequencyPenalty"],f);const w=o(e,["seed"]);w!=null&&a(n,["seed"],w);const y=o(e,["responseMimeType"]);y!=null&&a(n,["responseMimeType"],y);const v=o(e,["responseSchema"]);v!=null&&a(n,["responseSchema"],nt(v));const x=o(e,["responseJsonSchema"]);if(x!=null&&a(n,["responseJsonSchema"],x),o(e,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(o(e,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const C=o(e,["safetySettings"]);if(i!==void 0&&C!=null){let R=C;Array.isArray(R)&&(R=R.map(J=>ea(J))),a(i,["safetySettings"],R)}const A=o(e,["tools"]);if(i!==void 0&&A!=null){let R=ae(A);Array.isArray(R)&&(R=R.map(J=>ia(se(J)))),a(i,["tools"],R)}const _=o(e,["toolConfig"]);if(i!==void 0&&_!=null&&a(i,["toolConfig"],ta(_)),o(e,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const k=o(e,["cachedContent"]);i!==void 0&&k!=null&&a(i,["cachedContent"],$(t,k));const E=o(e,["responseModalities"]);E!=null&&a(n,["responseModalities"],E);const D=o(e,["mediaResolution"]);D!=null&&a(n,["mediaResolution"],D);const T=o(e,["speechConfig"]);if(T!=null&&a(n,["speechConfig"],ot(T)),o(e,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const M=o(e,["thinkingConfig"]);M!=null&&a(n,["thinkingConfig"],M);const N=o(e,["imageConfig"]);N!=null&&a(n,["imageConfig"],Vs(N));const z=o(e,["enableEnhancedCivicAnswers"]);if(z!=null&&a(n,["enableEnhancedCivicAnswers"],z),o(e,["modelArmorConfig"])!==void 0)throw new Error("modelArmorConfig parameter is not supported in Gemini API.");return n}function Fs(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["candidates"]);if(n!=null){let u=n;Array.isArray(u)&&(u=u.map(d=>Cs(d))),a(e,["candidates"],u)}const s=o(t,["modelVersion"]);s!=null&&a(e,["modelVersion"],s);const r=o(t,["promptFeedback"]);r!=null&&a(e,["promptFeedback"],r);const l=o(t,["responseId"]);l!=null&&a(e,["responseId"],l);const c=o(t,["usageMetadata"]);return c!=null&&a(e,["usageMetadata"],c),e}function Bs(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],re(t,n)),i}function Us(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],re(t,n)),i}function Ws(t){const e={};if(o(t,["authConfig"])!==void 0)throw new Error("authConfig parameter is not supported in Gemini API.");const i=o(t,["enableWidget"]);return i!=null&&a(e,["enableWidget"],i),e}function Os(t){const e={};if(o(t,["excludeDomains"])!==void 0)throw new Error("excludeDomains parameter is not supported in Gemini API.");if(o(t,["blockingConfidence"])!==void 0)throw new Error("blockingConfidence parameter is not supported in Gemini API.");const i=o(t,["timeRangeFilter"]);return i!=null&&a(e,["timeRangeFilter"],i),e}function Vs(t){const e={},i=o(t,["aspectRatio"]);i!=null&&a(e,["aspectRatio"],i);const n=o(t,["imageSize"]);if(n!=null&&a(e,["imageSize"],n),o(t,["personGeneration"])!==void 0)throw new Error("personGeneration parameter is not supported in Gemini API.");if(o(t,["outputMimeType"])!==void 0)throw new Error("outputMimeType parameter is not supported in Gemini API.");if(o(t,["outputCompressionQuality"])!==void 0)throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");return e}function zs(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["request","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let c=B(s);Array.isArray(c)&&(c=c.map(u=>wn(u))),a(i,["request","contents"],c)}const r=o(e,["metadata"]);r!=null&&a(i,["metadata"],r);const l=o(e,["config"]);return l!=null&&a(i,["request","generationConfig"],Gs(t,l,o(i,["request"],{}))),i}function Js(t){const e={},i=o(t,["response"]);i!=null&&a(e,["response"],Fs(i));const n=o(t,["error"]);return n!=null&&a(e,["error"],n),e}function Ys(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);if(e!==void 0&&s!=null&&a(e,["_query","pageToken"],s),o(t,["filter"])!==void 0)throw new Error("filter parameter is not supported in Gemini API.");return i}function Ks(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);e!==void 0&&s!=null&&a(e,["_query","pageToken"],s);const r=o(t,["filter"]);return e!==void 0&&r!=null&&a(e,["_query","filter"],r),i}function Zs(t){const e={},i=o(t,["config"]);return i!=null&&Ys(i,e),e}function $s(t){const e={},i=o(t,["config"]);return i!=null&&Ks(i,e),e}function Qs(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["operations"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>we(l))),a(e,["batchJobs"],r)}return e}function Xs(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["batchPredictionJobs"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>We(l))),a(e,["batchJobs"],r)}return e}function js(t){const e={},i=o(t,["mediaResolution"]);i!=null&&a(e,["mediaResolution"],i);const n=o(t,["codeExecutionResult"]);n!=null&&a(e,["codeExecutionResult"],n);const s=o(t,["executableCode"]);s!=null&&a(e,["executableCode"],s);const r=o(t,["fileData"]);r!=null&&a(e,["fileData"],Ns(r));const l=o(t,["functionCall"]);l!=null&&a(e,["functionCall"],Ls(l));const c=o(t,["functionResponse"]);c!=null&&a(e,["functionResponse"],c);const u=o(t,["inlineData"]);u!=null&&a(e,["inlineData"],ws(u));const d=o(t,["text"]);d!=null&&a(e,["text"],d);const m=o(t,["thought"]);m!=null&&a(e,["thought"],m);const h=o(t,["thoughtSignature"]);h!=null&&a(e,["thoughtSignature"],h);const p=o(t,["videoMetadata"]);return p!=null&&a(e,["videoMetadata"],p),e}function ea(t){const e={},i=o(t,["category"]);if(i!=null&&a(e,["category"],i),o(t,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=o(t,["threshold"]);return n!=null&&a(e,["threshold"],n),e}function ta(t){const e={},i=o(t,["retrievalConfig"]);i!=null&&a(e,["retrievalConfig"],i);const n=o(t,["functionCallingConfig"]);return n!=null&&a(e,["functionCallingConfig"],Hs(n)),e}function ia(t){const e={};if(o(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=o(t,["computerUse"]);i!=null&&a(e,["computerUse"],i);const n=o(t,["fileSearch"]);n!=null&&a(e,["fileSearch"],n);const s=o(t,["codeExecution"]);if(s!=null&&a(e,["codeExecution"],s),o(t,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");const r=o(t,["functionDeclarations"]);if(r!=null){let m=r;Array.isArray(m)&&(m=m.map(h=>h)),a(e,["functionDeclarations"],m)}const l=o(t,["googleMaps"]);l!=null&&a(e,["googleMaps"],Ws(l));const c=o(t,["googleSearch"]);c!=null&&a(e,["googleSearch"],Os(c));const u=o(t,["googleSearchRetrieval"]);u!=null&&a(e,["googleSearchRetrieval"],u);const d=o(t,["urlContext"]);return d!=null&&a(e,["urlContext"],d),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var K;(function(t){t.PAGED_ITEM_BATCH_JOBS="batchJobs",t.PAGED_ITEM_MODELS="models",t.PAGED_ITEM_TUNING_JOBS="tuningJobs",t.PAGED_ITEM_FILES="files",t.PAGED_ITEM_CACHED_CONTENTS="cachedContents",t.PAGED_ITEM_FILE_SEARCH_STORES="fileSearchStores",t.PAGED_ITEM_DOCUMENTS="documents"})(K||(K={}));class j{constructor(e,i,n,s){this.pageInternal=[],this.paramsInternal={},this.requestInternal=i,this.init(e,n,s)}init(e,i,n){var s,r;this.nameInternal=e,this.pageInternal=i[this.nameInternal]||[],this.sdkHttpResponseInternal=i==null?void 0:i.sdkHttpResponse,this.idxInternal=0;let l={config:{}};!n||Object.keys(n).length===0?l={config:{}}:typeof n=="object"?l=Object.assign({},n):l=n,l.config&&(l.config.pageToken=i.nextPageToken),this.paramsInternal=l,this.pageInternalSize=(r=(s=l.config)===null||s===void 0?void 0:s.pageSize)!==null&&r!==void 0?r:this.pageInternal.length}initNextPage(e){this.init(this.nameInternal,e,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get sdkHttpResponse(){return this.sdkHttpResponseInternal}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(e){return this.pageInternal[e]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const e=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:e,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const e=await this.requestInternal(this.params);return this.initNextPage(e),this.page}hasNextPage(){var e;return((e=this.params.config)===null||e===void 0?void 0:e.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class na extends Z{constructor(e){super(),this.apiClient=e,this.list=async(i={})=>new j(K.PAGED_ITEM_BATCH_JOBS,n=>this.listInternal(n),await this.listInternal(i),i),this.create=async i=>(this.apiClient.isVertexAI()&&(i.config=this.formatDestination(i.src,i.config)),this.createInternal(i)),this.createEmbeddings=async i=>{if(console.warn("batches.createEmbeddings() is experimental and may change without notice."),this.apiClient.isVertexAI())throw new Error("Vertex AI does not support batches.createEmbeddings.");return this.createEmbeddingsInternal(i)}}createInlinedGenerateContentRequest(e){const i=Ai(this.apiClient,e),n=i._url,s=b("{model}:batchGenerateContent",n),c=i.batch.inputConfig.requests,u=c.requests,d=[];for(const m of u){const h=Object.assign({},m);if(h.systemInstruction){const p=h.systemInstruction;delete h.systemInstruction;const g=h.request;g.systemInstruction=p,h.request=g}d.push(h)}return c.requests=d,delete i.config,delete i._url,delete i._query,{path:s,body:i}}getGcsUri(e){if(typeof e=="string")return e.startsWith("gs://")?e:void 0;if(!Array.isArray(e)&&e.gcsUri&&e.gcsUri.length>0)return e.gcsUri[0]}getBigqueryUri(e){if(typeof e=="string")return e.startsWith("bq://")?e:void 0;if(!Array.isArray(e))return e.bigqueryUri}formatDestination(e,i){const n=i?Object.assign({},i):{},s=Date.now().toString();if(n.displayName||(n.displayName=`genaiBatchJob_${s}`),n.dest===void 0){const r=this.getGcsUri(e),l=this.getBigqueryUri(e);if(r)r.endsWith(".jsonl")?n.dest=`${r.slice(0,-6)}/dest`:n.dest=`${r}_dest_${s}`;else if(l)n.dest=`${l}_dest_${s}`;else throw new Error("Unsupported source for Vertex AI: No GCS or BigQuery URI found.")}return n}async createInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Ts(this.apiClient,e);return c=b("batchPredictionJobs",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>We(m))}else{const d=Ai(this.apiClient,e);return c=b("{model}:batchGenerateContent",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>we(m))}}async createEmbeddingsInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=_s(this.apiClient,e);return r=b("{model}:asyncBatchEmbedContent",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>we(u))}}async get(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Us(this.apiClient,e);return c=b("batchPredictionJobs/{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>We(m))}else{const d=Bs(this.apiClient,e);return c=b("batches/{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>we(m))}}async cancel(e){var i,n,s,r;let l="",c={};if(this.apiClient.isVertexAI()){const u=bs(this.apiClient,e);l=b("batchPredictionJobs/{name}:cancel",u._url),c=u._query,delete u._url,delete u._query,await this.apiClient.request({path:l,queryParams:c,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal})}else{const u=vs(this.apiClient,e);l=b("batches/{name}:cancel",u._url),c=u._query,delete u._url,delete u._query,await this.apiClient.request({path:l,queryParams:c,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal})}}async listInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=$s(e);return c=b("batchPredictionJobs",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Xs(m),p=new bi;return Object.assign(p,h),p})}else{const d=Zs(e);return c=b("batches",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Qs(m),p=new bi;return Object.assign(p,h),p})}}async delete(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=ks(this.apiClient,e);return c=b("batchPredictionJobs/{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>Ps(m))}else{const d=Es(this.apiClient,e);return c=b("batches/{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>Ms(m))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function oa(t){const e={},i=o(t,["data"]);if(i!=null&&a(e,["data"],i),o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function Ti(t){const e={},i=o(t,["parts"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(r=>_a(r))),a(e,["parts"],s)}const n=o(t,["role"]);return n!=null&&a(e,["role"],n),e}function sa(t,e){const i={},n=o(t,["ttl"]);e!==void 0&&n!=null&&a(e,["ttl"],n);const s=o(t,["expireTime"]);e!==void 0&&s!=null&&a(e,["expireTime"],s);const r=o(t,["displayName"]);e!==void 0&&r!=null&&a(e,["displayName"],r);const l=o(t,["contents"]);if(e!==void 0&&l!=null){let m=B(l);Array.isArray(m)&&(m=m.map(h=>Ti(h))),a(e,["contents"],m)}const c=o(t,["systemInstruction"]);e!==void 0&&c!=null&&a(e,["systemInstruction"],Ti(H(c)));const u=o(t,["tools"]);if(e!==void 0&&u!=null){let m=u;Array.isArray(m)&&(m=m.map(h=>ka(h))),a(e,["tools"],m)}const d=o(t,["toolConfig"]);if(e!==void 0&&d!=null&&a(e,["toolConfig"],Ea(d)),o(t,["kmsKeyName"])!==void 0)throw new Error("kmsKeyName parameter is not supported in Gemini API.");return i}function aa(t,e){const i={},n=o(t,["ttl"]);e!==void 0&&n!=null&&a(e,["ttl"],n);const s=o(t,["expireTime"]);e!==void 0&&s!=null&&a(e,["expireTime"],s);const r=o(t,["displayName"]);e!==void 0&&r!=null&&a(e,["displayName"],r);const l=o(t,["contents"]);if(e!==void 0&&l!=null){let h=B(l);Array.isArray(h)&&(h=h.map(p=>p)),a(e,["contents"],h)}const c=o(t,["systemInstruction"]);e!==void 0&&c!=null&&a(e,["systemInstruction"],H(c));const u=o(t,["tools"]);if(e!==void 0&&u!=null){let h=u;Array.isArray(h)&&(h=h.map(p=>Ma(p))),a(e,["tools"],h)}const d=o(t,["toolConfig"]);e!==void 0&&d!=null&&a(e,["toolConfig"],d);const m=o(t,["kmsKeyName"]);return e!==void 0&&m!=null&&a(e,["encryption_spec","kmsKeyName"],m),i}function ra(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["model"],an(t,n));const s=o(e,["config"]);return s!=null&&sa(s,i),i}function la(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["model"],an(t,n));const s=o(e,["config"]);return s!=null&&aa(s,i),i}function ca(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],$(t,n)),i}function da(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],$(t,n)),i}function ua(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}function ma(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}function ha(t){const e={};if(o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const i=o(t,["fileUri"]);i!=null&&a(e,["fileUri"],i);const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function pa(t){const e={},i=o(t,["id"]);i!=null&&a(e,["id"],i);const n=o(t,["args"]);n!=null&&a(e,["args"],n);const s=o(t,["name"]);if(s!=null&&a(e,["name"],s),o(t,["partialArgs"])!==void 0)throw new Error("partialArgs parameter is not supported in Gemini API.");if(o(t,["willContinue"])!==void 0)throw new Error("willContinue parameter is not supported in Gemini API.");return e}function ga(t){const e={},i=o(t,["allowedFunctionNames"]);i!=null&&a(e,["allowedFunctionNames"],i);const n=o(t,["mode"]);if(n!=null&&a(e,["mode"],n),o(t,["streamFunctionCallArguments"])!==void 0)throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");return e}function fa(t){const e={},i=o(t,["description"]);i!=null&&a(e,["description"],i);const n=o(t,["name"]);n!=null&&a(e,["name"],n);const s=o(t,["parameters"]);s!=null&&a(e,["parameters"],s);const r=o(t,["parametersJsonSchema"]);r!=null&&a(e,["parametersJsonSchema"],r);const l=o(t,["response"]);l!=null&&a(e,["response"],l);const c=o(t,["responseJsonSchema"]);if(c!=null&&a(e,["responseJsonSchema"],c),o(t,["behavior"])!==void 0)throw new Error("behavior parameter is not supported in Vertex AI.");return e}function ya(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],$(t,n)),i}function wa(t,e){const i={},n=o(e,["name"]);return n!=null&&a(i,["_url","name"],$(t,n)),i}function va(t){const e={};if(o(t,["authConfig"])!==void 0)throw new Error("authConfig parameter is not supported in Gemini API.");const i=o(t,["enableWidget"]);return i!=null&&a(e,["enableWidget"],i),e}function ba(t){const e={};if(o(t,["excludeDomains"])!==void 0)throw new Error("excludeDomains parameter is not supported in Gemini API.");if(o(t,["blockingConfidence"])!==void 0)throw new Error("blockingConfidence parameter is not supported in Gemini API.");const i=o(t,["timeRangeFilter"]);return i!=null&&a(e,["timeRangeFilter"],i),e}function Ca(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);return e!==void 0&&s!=null&&a(e,["_query","pageToken"],s),i}function Ia(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);return e!==void 0&&s!=null&&a(e,["_query","pageToken"],s),i}function xa(t){const e={},i=o(t,["config"]);return i!=null&&Ca(i,e),e}function Aa(t){const e={},i=o(t,["config"]);return i!=null&&Ia(i,e),e}function Ta(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["cachedContents"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["cachedContents"],r)}return e}function Sa(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["cachedContents"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["cachedContents"],r)}return e}function _a(t){const e={},i=o(t,["mediaResolution"]);i!=null&&a(e,["mediaResolution"],i);const n=o(t,["codeExecutionResult"]);n!=null&&a(e,["codeExecutionResult"],n);const s=o(t,["executableCode"]);s!=null&&a(e,["executableCode"],s);const r=o(t,["fileData"]);r!=null&&a(e,["fileData"],ha(r));const l=o(t,["functionCall"]);l!=null&&a(e,["functionCall"],pa(l));const c=o(t,["functionResponse"]);c!=null&&a(e,["functionResponse"],c);const u=o(t,["inlineData"]);u!=null&&a(e,["inlineData"],oa(u));const d=o(t,["text"]);d!=null&&a(e,["text"],d);const m=o(t,["thought"]);m!=null&&a(e,["thought"],m);const h=o(t,["thoughtSignature"]);h!=null&&a(e,["thoughtSignature"],h);const p=o(t,["videoMetadata"]);return p!=null&&a(e,["videoMetadata"],p),e}function Ea(t){const e={},i=o(t,["retrievalConfig"]);i!=null&&a(e,["retrievalConfig"],i);const n=o(t,["functionCallingConfig"]);return n!=null&&a(e,["functionCallingConfig"],ga(n)),e}function ka(t){const e={};if(o(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=o(t,["computerUse"]);i!=null&&a(e,["computerUse"],i);const n=o(t,["fileSearch"]);n!=null&&a(e,["fileSearch"],n);const s=o(t,["codeExecution"]);if(s!=null&&a(e,["codeExecution"],s),o(t,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");const r=o(t,["functionDeclarations"]);if(r!=null){let m=r;Array.isArray(m)&&(m=m.map(h=>h)),a(e,["functionDeclarations"],m)}const l=o(t,["googleMaps"]);l!=null&&a(e,["googleMaps"],va(l));const c=o(t,["googleSearch"]);c!=null&&a(e,["googleSearch"],ba(c));const u=o(t,["googleSearchRetrieval"]);u!=null&&a(e,["googleSearchRetrieval"],u);const d=o(t,["urlContext"]);return d!=null&&a(e,["urlContext"],d),e}function Ma(t){const e={},i=o(t,["retrieval"]);i!=null&&a(e,["retrieval"],i);const n=o(t,["computerUse"]);if(n!=null&&a(e,["computerUse"],n),o(t,["fileSearch"])!==void 0)throw new Error("fileSearch parameter is not supported in Vertex AI.");const s=o(t,["codeExecution"]);s!=null&&a(e,["codeExecution"],s);const r=o(t,["enterpriseWebSearch"]);r!=null&&a(e,["enterpriseWebSearch"],r);const l=o(t,["functionDeclarations"]);if(l!=null){let h=l;Array.isArray(h)&&(h=h.map(p=>fa(p))),a(e,["functionDeclarations"],h)}const c=o(t,["googleMaps"]);c!=null&&a(e,["googleMaps"],c);const u=o(t,["googleSearch"]);u!=null&&a(e,["googleSearch"],u);const d=o(t,["googleSearchRetrieval"]);d!=null&&a(e,["googleSearchRetrieval"],d);const m=o(t,["urlContext"]);return m!=null&&a(e,["urlContext"],m),e}function Pa(t,e){const i={},n=o(t,["ttl"]);e!==void 0&&n!=null&&a(e,["ttl"],n);const s=o(t,["expireTime"]);return e!==void 0&&s!=null&&a(e,["expireTime"],s),i}function Ra(t,e){const i={},n=o(t,["ttl"]);e!==void 0&&n!=null&&a(e,["ttl"],n);const s=o(t,["expireTime"]);return e!==void 0&&s!=null&&a(e,["expireTime"],s),i}function qa(t,e){const i={},n=o(e,["name"]);n!=null&&a(i,["_url","name"],$(t,n));const s=o(e,["config"]);return s!=null&&Pa(s,i),i}function Da(t,e){const i={},n=o(e,["name"]);n!=null&&a(i,["_url","name"],$(t,n));const s=o(e,["config"]);return s!=null&&Ra(s,i),i}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Na extends Z{constructor(e){super(),this.apiClient=e,this.list=async(i={})=>new j(K.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(i),i)}async create(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=la(this.apiClient,e);return c=b("cachedContents",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>m)}else{const d=ra(this.apiClient,e);return c=b("cachedContents",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>m)}}async get(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=wa(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>m)}else{const d=ya(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>m)}}async delete(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=da(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=ma(m),p=new wi;return Object.assign(p,h),p})}else{const d=ca(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=ua(m),p=new wi;return Object.assign(p,h),p})}}async update(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Da(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>m)}else{const d=qa(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>m)}}async listInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Aa(e);return c=b("cachedContents",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Sa(m),p=new vi;return Object.assign(p,h),p})}else{const d=xa(e);return c=b("cachedContents",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Ta(m),p=new vi;return Object.assign(p,h),p})}}}function xe(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(i[n[s]]=t[n[s]]);return i}function Si(t){var e=typeof Symbol=="function"&&Symbol.iterator,i=e&&t[e],n=0;if(i)return i.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function S(t){return this instanceof S?(this.v=t,this):new S(t)}function W(t,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=i.apply(t,e||[]),s,r=[];return s=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),c("next"),c("throw"),c("return",l),s[Symbol.asyncIterator]=function(){return this},s;function l(g){return function(f){return Promise.resolve(f).then(g,h)}}function c(g,f){n[g]&&(s[g]=function(w){return new Promise(function(y,v){r.push([g,w,y,v])>1||u(g,w)})},f&&(s[g]=f(s[g])))}function u(g,f){try{d(n[g](f))}catch(w){p(r[0][3],w)}}function d(g){g.value instanceof S?Promise.resolve(g.value.v).then(m,h):p(r[0][2],g)}function m(g){u("next",g)}function h(g){u("throw",g)}function p(g,f){g(f),r.shift(),r.length&&u(r[0][0],r[0][1])}}function O(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],i;return e?e.call(t):(t=typeof Si=="function"?Si(t):t[Symbol.iterator](),i={},n("next"),n("throw"),n("return"),i[Symbol.asyncIterator]=function(){return this},i);function n(r){i[r]=t[r]&&function(l){return new Promise(function(c,u){l=t[r](l),s(c,u,l.done,l.value)})}}function s(r,l,c,u){Promise.resolve(u).then(function(d){r({value:d,done:c})},l)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function La(t){var e;if(t.candidates==null||t.candidates.length===0)return!1;const i=(e=t.candidates[0])===null||e===void 0?void 0:e.content;return i===void 0?!1:vn(i)}function vn(t){if(t.parts===void 0||t.parts.length===0)return!1;for(const e of t.parts)if(e===void 0||Object.keys(e).length===0)return!1;return!0}function Ha(t){if(t.length!==0){for(const e of t)if(e.role!=="user"&&e.role!=="model")throw new Error(`Role must be user or model, but got ${e.role}.`)}}function _i(t){if(t===void 0||t.length===0)return[];const e=[],i=t.length;let n=0;for(;n<i;)if(t[n].role==="user")e.push(t[n]),n++;else{const s=[];let r=!0;for(;n<i&&t[n].role==="model";)s.push(t[n]),r&&!vn(t[n])&&(r=!1),n++;r?e.push(...s):e.pop()}return e}class Ga{constructor(e,i){this.modelsModule=e,this.apiClient=i}create(e){return new Fa(this.apiClient,this.modelsModule,e.model,e.config,structuredClone(e.history))}}class Fa{constructor(e,i,n,s={},r=[]){this.apiClient=e,this.modelsModule=i,this.model=n,this.config=s,this.history=r,this.sendPromise=Promise.resolve(),Ha(r)}async sendMessage(e){var i;await this.sendPromise;const n=H(e.message),s=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(i=e.config)!==null&&i!==void 0?i:this.config});return this.sendPromise=(async()=>{var r,l,c;const u=await s,d=(l=(r=u.candidates)===null||r===void 0?void 0:r[0])===null||l===void 0?void 0:l.content,m=u.automaticFunctionCallingHistory,h=this.getHistory(!0).length;let p=[];m!=null&&(p=(c=m.slice(h))!==null&&c!==void 0?c:[]);const g=d?[d]:[];this.recordHistory(n,g,p)})(),await this.sendPromise.catch(()=>{this.sendPromise=Promise.resolve()}),s}async sendMessageStream(e){var i;await this.sendPromise;const n=H(e.message),s=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(i=e.config)!==null&&i!==void 0?i:this.config});this.sendPromise=s.then(()=>{}).catch(()=>{});const r=await s;return this.processStreamResponse(r,n)}getHistory(e=!1){const i=e?_i(this.history):this.history;return structuredClone(i)}processStreamResponse(e,i){return W(this,arguments,function*(){var s,r,l,c,u,d;const m=[];try{for(var h=!0,p=O(e),g;g=yield S(p.next()),s=g.done,!s;h=!0){c=g.value,h=!1;const f=c;if(La(f)){const w=(d=(u=f.candidates)===null||u===void 0?void 0:u[0])===null||d===void 0?void 0:d.content;w!==void 0&&m.push(w)}yield yield S(f)}}catch(f){r={error:f}}finally{try{!h&&!s&&(l=p.return)&&(yield S(l.call(p)))}finally{if(r)throw r.error}}this.recordHistory(i,m)})}recordHistory(e,i,n){let s=[];i.length>0&&i.every(r=>r.role!==void 0)?s=i:s.push({role:"model",parts:[]}),n&&n.length>0?this.history.push(..._i(n)):this.history.push(e),this.history.push(...s)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class me extends Error{constructor(e){super(e.message),this.name="ApiError",this.status=e.status,Object.setPrototypeOf(this,me.prototype)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ba(t){const e={},i=o(t,["file"]);return i!=null&&a(e,["file"],i),e}function Ua(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}function Wa(t){const e={},i=o(t,["name"]);return i!=null&&a(e,["_url","file"],mn(i)),e}function Oa(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}function Va(t){const e={},i=o(t,["name"]);return i!=null&&a(e,["_url","file"],mn(i)),e}function za(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);return e!==void 0&&s!=null&&a(e,["_query","pageToken"],s),i}function Ja(t){const e={},i=o(t,["config"]);return i!=null&&za(i,e),e}function Ya(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["files"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["files"],r)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ka extends Z{constructor(e){super(),this.apiClient=e,this.list=async(i={})=>new j(K.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(i),i)}async upload(e){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(e.file,e.config).then(i=>i)}async download(e){await this.apiClient.downloadFile(e)}async listInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Ja(e);return r=b("files",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>{const d=Ya(u),m=new Xo;return Object.assign(m,d),m})}}async createInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Ba(e);return r=b("upload/v1beta/files",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=Ua(u),m=new jo;return Object.assign(m,d),m})}}async get(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Va(e);return r=b("files/{file}",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>u)}}async delete(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Wa(e);return r=b("files/{file}",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>{const d=Oa(u),m=new es;return Object.assign(m,d),m})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ve(t){const e={},i=o(t,["data"]);if(i!=null&&a(e,["data"],i),o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function Za(t){const e={},i=o(t,["parts"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(r=>ur(r))),a(e,["parts"],s)}const n=o(t,["role"]);return n!=null&&a(e,["role"],n),e}function $a(t){const e={};if(o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const i=o(t,["fileUri"]);i!=null&&a(e,["fileUri"],i);const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function Qa(t){const e={},i=o(t,["id"]);i!=null&&a(e,["id"],i);const n=o(t,["args"]);n!=null&&a(e,["args"],n);const s=o(t,["name"]);if(s!=null&&a(e,["name"],s),o(t,["partialArgs"])!==void 0)throw new Error("partialArgs parameter is not supported in Gemini API.");if(o(t,["willContinue"])!==void 0)throw new Error("willContinue parameter is not supported in Gemini API.");return e}function Xa(t){const e={},i=o(t,["description"]);i!=null&&a(e,["description"],i);const n=o(t,["name"]);n!=null&&a(e,["name"],n);const s=o(t,["parameters"]);s!=null&&a(e,["parameters"],s);const r=o(t,["parametersJsonSchema"]);r!=null&&a(e,["parametersJsonSchema"],r);const l=o(t,["response"]);l!=null&&a(e,["response"],l);const c=o(t,["responseJsonSchema"]);if(c!=null&&a(e,["responseJsonSchema"],c),o(t,["behavior"])!==void 0)throw new Error("behavior parameter is not supported in Vertex AI.");return e}function ja(t){const e={},i=o(t,["modelSelectionConfig"]);i!=null&&a(e,["modelConfig"],i);const n=o(t,["responseJsonSchema"]);n!=null&&a(e,["responseJsonSchema"],n);const s=o(t,["audioTimestamp"]);s!=null&&a(e,["audioTimestamp"],s);const r=o(t,["candidateCount"]);r!=null&&a(e,["candidateCount"],r);const l=o(t,["enableAffectiveDialog"]);l!=null&&a(e,["enableAffectiveDialog"],l);const c=o(t,["frequencyPenalty"]);c!=null&&a(e,["frequencyPenalty"],c);const u=o(t,["logprobs"]);u!=null&&a(e,["logprobs"],u);const d=o(t,["maxOutputTokens"]);d!=null&&a(e,["maxOutputTokens"],d);const m=o(t,["mediaResolution"]);m!=null&&a(e,["mediaResolution"],m);const h=o(t,["presencePenalty"]);h!=null&&a(e,["presencePenalty"],h);const p=o(t,["responseLogprobs"]);p!=null&&a(e,["responseLogprobs"],p);const g=o(t,["responseMimeType"]);g!=null&&a(e,["responseMimeType"],g);const f=o(t,["responseModalities"]);f!=null&&a(e,["responseModalities"],f);const w=o(t,["responseSchema"]);w!=null&&a(e,["responseSchema"],w);const y=o(t,["routingConfig"]);y!=null&&a(e,["routingConfig"],y);const v=o(t,["seed"]);v!=null&&a(e,["seed"],v);const x=o(t,["speechConfig"]);x!=null&&a(e,["speechConfig"],x);const C=o(t,["stopSequences"]);C!=null&&a(e,["stopSequences"],C);const A=o(t,["temperature"]);A!=null&&a(e,["temperature"],A);const _=o(t,["thinkingConfig"]);_!=null&&a(e,["thinkingConfig"],_);const k=o(t,["topK"]);k!=null&&a(e,["topK"],k);const E=o(t,["topP"]);if(E!=null&&a(e,["topP"],E),o(t,["enableEnhancedCivicAnswers"])!==void 0)throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");return e}function er(t){const e={};if(o(t,["authConfig"])!==void 0)throw new Error("authConfig parameter is not supported in Gemini API.");const i=o(t,["enableWidget"]);return i!=null&&a(e,["enableWidget"],i),e}function tr(t){const e={};if(o(t,["excludeDomains"])!==void 0)throw new Error("excludeDomains parameter is not supported in Gemini API.");if(o(t,["blockingConfidence"])!==void 0)throw new Error("blockingConfidence parameter is not supported in Gemini API.");const i=o(t,["timeRangeFilter"]);return i!=null&&a(e,["timeRangeFilter"],i),e}function ir(t,e){const i={},n=o(t,["generationConfig"]);e!==void 0&&n!=null&&a(e,["setup","generationConfig"],n);const s=o(t,["responseModalities"]);e!==void 0&&s!=null&&a(e,["setup","generationConfig","responseModalities"],s);const r=o(t,["temperature"]);e!==void 0&&r!=null&&a(e,["setup","generationConfig","temperature"],r);const l=o(t,["topP"]);e!==void 0&&l!=null&&a(e,["setup","generationConfig","topP"],l);const c=o(t,["topK"]);e!==void 0&&c!=null&&a(e,["setup","generationConfig","topK"],c);const u=o(t,["maxOutputTokens"]);e!==void 0&&u!=null&&a(e,["setup","generationConfig","maxOutputTokens"],u);const d=o(t,["mediaResolution"]);e!==void 0&&d!=null&&a(e,["setup","generationConfig","mediaResolution"],d);const m=o(t,["seed"]);e!==void 0&&m!=null&&a(e,["setup","generationConfig","seed"],m);const h=o(t,["speechConfig"]);e!==void 0&&h!=null&&a(e,["setup","generationConfig","speechConfig"],st(h));const p=o(t,["thinkingConfig"]);e!==void 0&&p!=null&&a(e,["setup","generationConfig","thinkingConfig"],p);const g=o(t,["enableAffectiveDialog"]);e!==void 0&&g!=null&&a(e,["setup","generationConfig","enableAffectiveDialog"],g);const f=o(t,["systemInstruction"]);e!==void 0&&f!=null&&a(e,["setup","systemInstruction"],Za(H(f)));const w=o(t,["tools"]);if(e!==void 0&&w!=null){let k=ae(w);Array.isArray(k)&&(k=k.map(E=>hr(se(E)))),a(e,["setup","tools"],k)}const y=o(t,["sessionResumption"]);e!==void 0&&y!=null&&a(e,["setup","sessionResumption"],mr(y));const v=o(t,["inputAudioTranscription"]);e!==void 0&&v!=null&&a(e,["setup","inputAudioTranscription"],v);const x=o(t,["outputAudioTranscription"]);e!==void 0&&x!=null&&a(e,["setup","outputAudioTranscription"],x);const C=o(t,["realtimeInputConfig"]);e!==void 0&&C!=null&&a(e,["setup","realtimeInputConfig"],C);const A=o(t,["contextWindowCompression"]);e!==void 0&&A!=null&&a(e,["setup","contextWindowCompression"],A);const _=o(t,["proactivity"]);if(e!==void 0&&_!=null&&a(e,["setup","proactivity"],_),o(t,["explicitVadSignal"])!==void 0)throw new Error("explicitVadSignal parameter is not supported in Gemini API.");return i}function nr(t,e){const i={},n=o(t,["generationConfig"]);e!==void 0&&n!=null&&a(e,["setup","generationConfig"],ja(n));const s=o(t,["responseModalities"]);e!==void 0&&s!=null&&a(e,["setup","generationConfig","responseModalities"],s);const r=o(t,["temperature"]);e!==void 0&&r!=null&&a(e,["setup","generationConfig","temperature"],r);const l=o(t,["topP"]);e!==void 0&&l!=null&&a(e,["setup","generationConfig","topP"],l);const c=o(t,["topK"]);e!==void 0&&c!=null&&a(e,["setup","generationConfig","topK"],c);const u=o(t,["maxOutputTokens"]);e!==void 0&&u!=null&&a(e,["setup","generationConfig","maxOutputTokens"],u);const d=o(t,["mediaResolution"]);e!==void 0&&d!=null&&a(e,["setup","generationConfig","mediaResolution"],d);const m=o(t,["seed"]);e!==void 0&&m!=null&&a(e,["setup","generationConfig","seed"],m);const h=o(t,["speechConfig"]);e!==void 0&&h!=null&&a(e,["setup","generationConfig","speechConfig"],st(h));const p=o(t,["thinkingConfig"]);e!==void 0&&p!=null&&a(e,["setup","generationConfig","thinkingConfig"],p);const g=o(t,["enableAffectiveDialog"]);e!==void 0&&g!=null&&a(e,["setup","generationConfig","enableAffectiveDialog"],g);const f=o(t,["systemInstruction"]);e!==void 0&&f!=null&&a(e,["setup","systemInstruction"],H(f));const w=o(t,["tools"]);if(e!==void 0&&w!=null){let E=ae(w);Array.isArray(E)&&(E=E.map(D=>pr(se(D)))),a(e,["setup","tools"],E)}const y=o(t,["sessionResumption"]);e!==void 0&&y!=null&&a(e,["setup","sessionResumption"],y);const v=o(t,["inputAudioTranscription"]);e!==void 0&&v!=null&&a(e,["setup","inputAudioTranscription"],v);const x=o(t,["outputAudioTranscription"]);e!==void 0&&x!=null&&a(e,["setup","outputAudioTranscription"],x);const C=o(t,["realtimeInputConfig"]);e!==void 0&&C!=null&&a(e,["setup","realtimeInputConfig"],C);const A=o(t,["contextWindowCompression"]);e!==void 0&&A!=null&&a(e,["setup","contextWindowCompression"],A);const _=o(t,["proactivity"]);e!==void 0&&_!=null&&a(e,["setup","proactivity"],_);const k=o(t,["explicitVadSignal"]);return e!==void 0&&k!=null&&a(e,["setup","explicitVadSignal"],k),i}function or(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["setup","model"],P(t,n));const s=o(e,["config"]);return s!=null&&a(i,["config"],ir(s,i)),i}function sr(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["setup","model"],P(t,n));const s=o(e,["config"]);return s!=null&&a(i,["config"],nr(s,i)),i}function ar(t){const e={},i=o(t,["musicGenerationConfig"]);return i!=null&&a(e,["musicGenerationConfig"],i),e}function rr(t){const e={},i=o(t,["weightedPrompts"]);if(i!=null){let n=i;Array.isArray(n)&&(n=n.map(s=>s)),a(e,["weightedPrompts"],n)}return e}function lr(t){const e={},i=o(t,["media"]);if(i!=null){let d=rn(i);Array.isArray(d)&&(d=d.map(m=>ve(m))),a(e,["mediaChunks"],d)}const n=o(t,["audio"]);n!=null&&a(e,["audio"],ve(cn(n)));const s=o(t,["audioStreamEnd"]);s!=null&&a(e,["audioStreamEnd"],s);const r=o(t,["video"]);r!=null&&a(e,["video"],ve(ln(r)));const l=o(t,["text"]);l!=null&&a(e,["text"],l);const c=o(t,["activityStart"]);c!=null&&a(e,["activityStart"],c);const u=o(t,["activityEnd"]);return u!=null&&a(e,["activityEnd"],u),e}function cr(t){const e={},i=o(t,["media"]);if(i!=null){let d=rn(i);Array.isArray(d)&&(d=d.map(m=>m)),a(e,["mediaChunks"],d)}const n=o(t,["audio"]);n!=null&&a(e,["audio"],cn(n));const s=o(t,["audioStreamEnd"]);s!=null&&a(e,["audioStreamEnd"],s);const r=o(t,["video"]);r!=null&&a(e,["video"],ln(r));const l=o(t,["text"]);l!=null&&a(e,["text"],l);const c=o(t,["activityStart"]);c!=null&&a(e,["activityStart"],c);const u=o(t,["activityEnd"]);return u!=null&&a(e,["activityEnd"],u),e}function dr(t){const e={},i=o(t,["setupComplete"]);i!=null&&a(e,["setupComplete"],i);const n=o(t,["serverContent"]);n!=null&&a(e,["serverContent"],n);const s=o(t,["toolCall"]);s!=null&&a(e,["toolCall"],s);const r=o(t,["toolCallCancellation"]);r!=null&&a(e,["toolCallCancellation"],r);const l=o(t,["usageMetadata"]);l!=null&&a(e,["usageMetadata"],gr(l));const c=o(t,["goAway"]);c!=null&&a(e,["goAway"],c);const u=o(t,["sessionResumptionUpdate"]);u!=null&&a(e,["sessionResumptionUpdate"],u);const d=o(t,["voiceActivityDetectionSignal"]);d!=null&&a(e,["voiceActivityDetectionSignal"],d);const m=o(t,["voiceActivity"]);return m!=null&&a(e,["voiceActivity"],fr(m)),e}function ur(t){const e={},i=o(t,["mediaResolution"]);i!=null&&a(e,["mediaResolution"],i);const n=o(t,["codeExecutionResult"]);n!=null&&a(e,["codeExecutionResult"],n);const s=o(t,["executableCode"]);s!=null&&a(e,["executableCode"],s);const r=o(t,["fileData"]);r!=null&&a(e,["fileData"],$a(r));const l=o(t,["functionCall"]);l!=null&&a(e,["functionCall"],Qa(l));const c=o(t,["functionResponse"]);c!=null&&a(e,["functionResponse"],c);const u=o(t,["inlineData"]);u!=null&&a(e,["inlineData"],ve(u));const d=o(t,["text"]);d!=null&&a(e,["text"],d);const m=o(t,["thought"]);m!=null&&a(e,["thought"],m);const h=o(t,["thoughtSignature"]);h!=null&&a(e,["thoughtSignature"],h);const p=o(t,["videoMetadata"]);return p!=null&&a(e,["videoMetadata"],p),e}function mr(t){const e={},i=o(t,["handle"]);if(i!=null&&a(e,["handle"],i),o(t,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return e}function hr(t){const e={};if(o(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=o(t,["computerUse"]);i!=null&&a(e,["computerUse"],i);const n=o(t,["fileSearch"]);n!=null&&a(e,["fileSearch"],n);const s=o(t,["codeExecution"]);if(s!=null&&a(e,["codeExecution"],s),o(t,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");const r=o(t,["functionDeclarations"]);if(r!=null){let m=r;Array.isArray(m)&&(m=m.map(h=>h)),a(e,["functionDeclarations"],m)}const l=o(t,["googleMaps"]);l!=null&&a(e,["googleMaps"],er(l));const c=o(t,["googleSearch"]);c!=null&&a(e,["googleSearch"],tr(c));const u=o(t,["googleSearchRetrieval"]);u!=null&&a(e,["googleSearchRetrieval"],u);const d=o(t,["urlContext"]);return d!=null&&a(e,["urlContext"],d),e}function pr(t){const e={},i=o(t,["retrieval"]);i!=null&&a(e,["retrieval"],i);const n=o(t,["computerUse"]);if(n!=null&&a(e,["computerUse"],n),o(t,["fileSearch"])!==void 0)throw new Error("fileSearch parameter is not supported in Vertex AI.");const s=o(t,["codeExecution"]);s!=null&&a(e,["codeExecution"],s);const r=o(t,["enterpriseWebSearch"]);r!=null&&a(e,["enterpriseWebSearch"],r);const l=o(t,["functionDeclarations"]);if(l!=null){let h=l;Array.isArray(h)&&(h=h.map(p=>Xa(p))),a(e,["functionDeclarations"],h)}const c=o(t,["googleMaps"]);c!=null&&a(e,["googleMaps"],c);const u=o(t,["googleSearch"]);u!=null&&a(e,["googleSearch"],u);const d=o(t,["googleSearchRetrieval"]);d!=null&&a(e,["googleSearchRetrieval"],d);const m=o(t,["urlContext"]);return m!=null&&a(e,["urlContext"],m),e}function gr(t){const e={},i=o(t,["promptTokenCount"]);i!=null&&a(e,["promptTokenCount"],i);const n=o(t,["cachedContentTokenCount"]);n!=null&&a(e,["cachedContentTokenCount"],n);const s=o(t,["candidatesTokenCount"]);s!=null&&a(e,["responseTokenCount"],s);const r=o(t,["toolUsePromptTokenCount"]);r!=null&&a(e,["toolUsePromptTokenCount"],r);const l=o(t,["thoughtsTokenCount"]);l!=null&&a(e,["thoughtsTokenCount"],l);const c=o(t,["totalTokenCount"]);c!=null&&a(e,["totalTokenCount"],c);const u=o(t,["promptTokensDetails"]);if(u!=null){let g=u;Array.isArray(g)&&(g=g.map(f=>f)),a(e,["promptTokensDetails"],g)}const d=o(t,["cacheTokensDetails"]);if(d!=null){let g=d;Array.isArray(g)&&(g=g.map(f=>f)),a(e,["cacheTokensDetails"],g)}const m=o(t,["candidatesTokensDetails"]);if(m!=null){let g=m;Array.isArray(g)&&(g=g.map(f=>f)),a(e,["responseTokensDetails"],g)}const h=o(t,["toolUsePromptTokensDetails"]);if(h!=null){let g=h;Array.isArray(g)&&(g=g.map(f=>f)),a(e,["toolUsePromptTokensDetails"],g)}const p=o(t,["trafficType"]);return p!=null&&a(e,["trafficType"],p),e}function fr(t){const e={},i=o(t,["type"]);return i!=null&&a(e,["voiceActivityType"],i),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function yr(t){const e={},i=o(t,["data"]);if(i!=null&&a(e,["data"],i),o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function wr(t){const e={},i=o(t,["content"]);i!=null&&a(e,["content"],i);const n=o(t,["citationMetadata"]);n!=null&&a(e,["citationMetadata"],vr(n));const s=o(t,["tokenCount"]);s!=null&&a(e,["tokenCount"],s);const r=o(t,["finishReason"]);r!=null&&a(e,["finishReason"],r);const l=o(t,["avgLogprobs"]);l!=null&&a(e,["avgLogprobs"],l);const c=o(t,["groundingMetadata"]);c!=null&&a(e,["groundingMetadata"],c);const u=o(t,["index"]);u!=null&&a(e,["index"],u);const d=o(t,["logprobsResult"]);d!=null&&a(e,["logprobsResult"],d);const m=o(t,["safetyRatings"]);if(m!=null){let p=m;Array.isArray(p)&&(p=p.map(g=>g)),a(e,["safetyRatings"],p)}const h=o(t,["urlContextMetadata"]);return h!=null&&a(e,["urlContextMetadata"],h),e}function vr(t){const e={},i=o(t,["citationSources"]);if(i!=null){let n=i;Array.isArray(n)&&(n=n.map(s=>s)),a(e,["citations"],n)}return e}function br(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let r=B(s);Array.isArray(r)&&(r=r.map(l=>l)),a(i,["contents"],r)}return i}function Cr(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["tokensInfo"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(r=>r)),a(e,["tokensInfo"],s)}return e}function Ir(t){const e={},i=o(t,["values"]);i!=null&&a(e,["values"],i);const n=o(t,["statistics"]);return n!=null&&a(e,["statistics"],xr(n)),e}function xr(t){const e={},i=o(t,["truncated"]);i!=null&&a(e,["truncated"],i);const n=o(t,["token_count"]);return n!=null&&a(e,["tokenCount"],n),e}function Se(t){const e={},i=o(t,["parts"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(r=>Rl(r))),a(e,["parts"],s)}const n=o(t,["role"]);return n!=null&&a(e,["role"],n),e}function Ar(t){const e={},i=o(t,["controlType"]);i!=null&&a(e,["controlType"],i);const n=o(t,["enableControlImageComputation"]);return n!=null&&a(e,["computeControl"],n),e}function Tr(t){const e={};if(o(t,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(o(t,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(o(t,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return e}function Sr(t,e){const i={},n=o(t,["systemInstruction"]);e!==void 0&&n!=null&&a(e,["systemInstruction"],H(n));const s=o(t,["tools"]);if(e!==void 0&&s!=null){let l=s;Array.isArray(l)&&(l=l.map(c=>xn(c))),a(e,["tools"],l)}const r=o(t,["generationConfig"]);return e!==void 0&&r!=null&&a(e,["generationConfig"],yl(r)),i}function _r(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let l=B(s);Array.isArray(l)&&(l=l.map(c=>Se(c))),a(i,["contents"],l)}const r=o(e,["config"]);return r!=null&&Tr(r),i}function Er(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let l=B(s);Array.isArray(l)&&(l=l.map(c=>c)),a(i,["contents"],l)}const r=o(e,["config"]);return r!=null&&Sr(r,i),i}function kr(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["totalTokens"]);n!=null&&a(e,["totalTokens"],n);const s=o(t,["cachedContentTokenCount"]);return s!=null&&a(e,["cachedContentTokenCount"],s),e}function Mr(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["totalTokens"]);return n!=null&&a(e,["totalTokens"],n),e}function Pr(t,e){const i={},n=o(e,["model"]);return n!=null&&a(i,["_url","name"],P(t,n)),i}function Rr(t,e){const i={},n=o(e,["model"]);return n!=null&&a(i,["_url","name"],P(t,n)),i}function qr(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}function Dr(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}function Nr(t,e){const i={},n=o(t,["outputGcsUri"]);e!==void 0&&n!=null&&a(e,["parameters","storageUri"],n);const s=o(t,["negativePrompt"]);e!==void 0&&s!=null&&a(e,["parameters","negativePrompt"],s);const r=o(t,["numberOfImages"]);e!==void 0&&r!=null&&a(e,["parameters","sampleCount"],r);const l=o(t,["aspectRatio"]);e!==void 0&&l!=null&&a(e,["parameters","aspectRatio"],l);const c=o(t,["guidanceScale"]);e!==void 0&&c!=null&&a(e,["parameters","guidanceScale"],c);const u=o(t,["seed"]);e!==void 0&&u!=null&&a(e,["parameters","seed"],u);const d=o(t,["safetyFilterLevel"]);e!==void 0&&d!=null&&a(e,["parameters","safetySetting"],d);const m=o(t,["personGeneration"]);e!==void 0&&m!=null&&a(e,["parameters","personGeneration"],m);const h=o(t,["includeSafetyAttributes"]);e!==void 0&&h!=null&&a(e,["parameters","includeSafetyAttributes"],h);const p=o(t,["includeRaiReason"]);e!==void 0&&p!=null&&a(e,["parameters","includeRaiReason"],p);const g=o(t,["language"]);e!==void 0&&g!=null&&a(e,["parameters","language"],g);const f=o(t,["outputMimeType"]);e!==void 0&&f!=null&&a(e,["parameters","outputOptions","mimeType"],f);const w=o(t,["outputCompressionQuality"]);e!==void 0&&w!=null&&a(e,["parameters","outputOptions","compressionQuality"],w);const y=o(t,["addWatermark"]);e!==void 0&&y!=null&&a(e,["parameters","addWatermark"],y);const v=o(t,["labels"]);e!==void 0&&v!=null&&a(e,["labels"],v);const x=o(t,["editMode"]);e!==void 0&&x!=null&&a(e,["parameters","editMode"],x);const C=o(t,["baseSteps"]);return e!==void 0&&C!=null&&a(e,["parameters","editConfig","baseSteps"],C),i}function Lr(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["prompt"]);s!=null&&a(i,["instances[0]","prompt"],s);const r=o(e,["referenceImages"]);if(r!=null){let c=r;Array.isArray(c)&&(c=c.map(u=>Gl(u))),a(i,["instances[0]","referenceImages"],c)}const l=o(e,["config"]);return l!=null&&Nr(l,i),i}function Hr(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["predictions"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(r=>_e(r))),a(e,["generatedImages"],s)}return e}function Gr(t,e){const i={},n=o(t,["taskType"]);e!==void 0&&n!=null&&a(e,["requests[]","taskType"],n);const s=o(t,["title"]);e!==void 0&&s!=null&&a(e,["requests[]","title"],s);const r=o(t,["outputDimensionality"]);if(e!==void 0&&r!=null&&a(e,["requests[]","outputDimensionality"],r),o(t,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(o(t,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return i}function Fr(t,e){const i={},n=o(t,["taskType"]);e!==void 0&&n!=null&&a(e,["instances[]","task_type"],n);const s=o(t,["title"]);e!==void 0&&s!=null&&a(e,["instances[]","title"],s);const r=o(t,["outputDimensionality"]);e!==void 0&&r!=null&&a(e,["parameters","outputDimensionality"],r);const l=o(t,["mimeType"]);e!==void 0&&l!=null&&a(e,["instances[]","mimeType"],l);const c=o(t,["autoTruncate"]);return e!==void 0&&c!=null&&a(e,["parameters","autoTruncate"],c),i}function Br(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let c=it(t,s);Array.isArray(c)&&(c=c.map(u=>u)),a(i,["requests[]","content"],c)}const r=o(e,["config"]);r!=null&&Gr(r,i);const l=o(e,["model"]);return l!==void 0&&a(i,["requests[]","model"],P(t,l)),i}function Ur(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let l=it(t,s);Array.isArray(l)&&(l=l.map(c=>c)),a(i,["instances[]","content"],l)}const r=o(e,["config"]);return r!=null&&Fr(r,i),i}function Wr(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["embeddings"]);if(n!=null){let r=n;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["embeddings"],r)}const s=o(t,["metadata"]);return s!=null&&a(e,["metadata"],s),e}function Or(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["predictions[]","embeddings"]);if(n!=null){let r=n;Array.isArray(r)&&(r=r.map(l=>Ir(l))),a(e,["embeddings"],r)}const s=o(t,["metadata"]);return s!=null&&a(e,["metadata"],s),e}function Vr(t){const e={},i=o(t,["endpoint"]);i!=null&&a(e,["name"],i);const n=o(t,["deployedModelId"]);return n!=null&&a(e,["deployedModelId"],n),e}function zr(t){const e={};if(o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const i=o(t,["fileUri"]);i!=null&&a(e,["fileUri"],i);const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function Jr(t){const e={},i=o(t,["id"]);i!=null&&a(e,["id"],i);const n=o(t,["args"]);n!=null&&a(e,["args"],n);const s=o(t,["name"]);if(s!=null&&a(e,["name"],s),o(t,["partialArgs"])!==void 0)throw new Error("partialArgs parameter is not supported in Gemini API.");if(o(t,["willContinue"])!==void 0)throw new Error("willContinue parameter is not supported in Gemini API.");return e}function Yr(t){const e={},i=o(t,["allowedFunctionNames"]);i!=null&&a(e,["allowedFunctionNames"],i);const n=o(t,["mode"]);if(n!=null&&a(e,["mode"],n),o(t,["streamFunctionCallArguments"])!==void 0)throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");return e}function Kr(t){const e={},i=o(t,["description"]);i!=null&&a(e,["description"],i);const n=o(t,["name"]);n!=null&&a(e,["name"],n);const s=o(t,["parameters"]);s!=null&&a(e,["parameters"],s);const r=o(t,["parametersJsonSchema"]);r!=null&&a(e,["parametersJsonSchema"],r);const l=o(t,["response"]);l!=null&&a(e,["response"],l);const c=o(t,["responseJsonSchema"]);if(c!=null&&a(e,["responseJsonSchema"],c),o(t,["behavior"])!==void 0)throw new Error("behavior parameter is not supported in Vertex AI.");return e}function Zr(t,e,i){const n={},s=o(e,["systemInstruction"]);i!==void 0&&s!=null&&a(i,["systemInstruction"],Se(H(s)));const r=o(e,["temperature"]);r!=null&&a(n,["temperature"],r);const l=o(e,["topP"]);l!=null&&a(n,["topP"],l);const c=o(e,["topK"]);c!=null&&a(n,["topK"],c);const u=o(e,["candidateCount"]);u!=null&&a(n,["candidateCount"],u);const d=o(e,["maxOutputTokens"]);d!=null&&a(n,["maxOutputTokens"],d);const m=o(e,["stopSequences"]);m!=null&&a(n,["stopSequences"],m);const h=o(e,["responseLogprobs"]);h!=null&&a(n,["responseLogprobs"],h);const p=o(e,["logprobs"]);p!=null&&a(n,["logprobs"],p);const g=o(e,["presencePenalty"]);g!=null&&a(n,["presencePenalty"],g);const f=o(e,["frequencyPenalty"]);f!=null&&a(n,["frequencyPenalty"],f);const w=o(e,["seed"]);w!=null&&a(n,["seed"],w);const y=o(e,["responseMimeType"]);y!=null&&a(n,["responseMimeType"],y);const v=o(e,["responseSchema"]);v!=null&&a(n,["responseSchema"],nt(v));const x=o(e,["responseJsonSchema"]);if(x!=null&&a(n,["responseJsonSchema"],x),o(e,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(o(e,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const C=o(e,["safetySettings"]);if(i!==void 0&&C!=null){let R=C;Array.isArray(R)&&(R=R.map(J=>Fl(J))),a(i,["safetySettings"],R)}const A=o(e,["tools"]);if(i!==void 0&&A!=null){let R=ae(A);Array.isArray(R)&&(R=R.map(J=>Jl(se(J)))),a(i,["tools"],R)}const _=o(e,["toolConfig"]);if(i!==void 0&&_!=null&&a(i,["toolConfig"],zl(_)),o(e,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const k=o(e,["cachedContent"]);i!==void 0&&k!=null&&a(i,["cachedContent"],$(t,k));const E=o(e,["responseModalities"]);E!=null&&a(n,["responseModalities"],E);const D=o(e,["mediaResolution"]);D!=null&&a(n,["mediaResolution"],D);const T=o(e,["speechConfig"]);if(T!=null&&a(n,["speechConfig"],ot(T)),o(e,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const M=o(e,["thinkingConfig"]);M!=null&&a(n,["thinkingConfig"],M);const N=o(e,["imageConfig"]);N!=null&&a(n,["imageConfig"],Il(N));const z=o(e,["enableEnhancedCivicAnswers"]);if(z!=null&&a(n,["enableEnhancedCivicAnswers"],z),o(e,["modelArmorConfig"])!==void 0)throw new Error("modelArmorConfig parameter is not supported in Gemini API.");return n}function $r(t,e,i){const n={},s=o(e,["systemInstruction"]);i!==void 0&&s!=null&&a(i,["systemInstruction"],H(s));const r=o(e,["temperature"]);r!=null&&a(n,["temperature"],r);const l=o(e,["topP"]);l!=null&&a(n,["topP"],l);const c=o(e,["topK"]);c!=null&&a(n,["topK"],c);const u=o(e,["candidateCount"]);u!=null&&a(n,["candidateCount"],u);const d=o(e,["maxOutputTokens"]);d!=null&&a(n,["maxOutputTokens"],d);const m=o(e,["stopSequences"]);m!=null&&a(n,["stopSequences"],m);const h=o(e,["responseLogprobs"]);h!=null&&a(n,["responseLogprobs"],h);const p=o(e,["logprobs"]);p!=null&&a(n,["logprobs"],p);const g=o(e,["presencePenalty"]);g!=null&&a(n,["presencePenalty"],g);const f=o(e,["frequencyPenalty"]);f!=null&&a(n,["frequencyPenalty"],f);const w=o(e,["seed"]);w!=null&&a(n,["seed"],w);const y=o(e,["responseMimeType"]);y!=null&&a(n,["responseMimeType"],y);const v=o(e,["responseSchema"]);v!=null&&a(n,["responseSchema"],nt(v));const x=o(e,["responseJsonSchema"]);x!=null&&a(n,["responseJsonSchema"],x);const C=o(e,["routingConfig"]);C!=null&&a(n,["routingConfig"],C);const A=o(e,["modelSelectionConfig"]);A!=null&&a(n,["modelConfig"],A);const _=o(e,["safetySettings"]);if(i!==void 0&&_!=null){let Y=_;Array.isArray(Y)&&(Y=Y.map(Re=>Re)),a(i,["safetySettings"],Y)}const k=o(e,["tools"]);if(i!==void 0&&k!=null){let Y=ae(k);Array.isArray(Y)&&(Y=Y.map(Re=>xn(se(Re)))),a(i,["tools"],Y)}const E=o(e,["toolConfig"]);i!==void 0&&E!=null&&a(i,["toolConfig"],E);const D=o(e,["labels"]);i!==void 0&&D!=null&&a(i,["labels"],D);const T=o(e,["cachedContent"]);i!==void 0&&T!=null&&a(i,["cachedContent"],$(t,T));const M=o(e,["responseModalities"]);M!=null&&a(n,["responseModalities"],M);const N=o(e,["mediaResolution"]);N!=null&&a(n,["mediaResolution"],N);const z=o(e,["speechConfig"]);z!=null&&a(n,["speechConfig"],ot(z));const R=o(e,["audioTimestamp"]);R!=null&&a(n,["audioTimestamp"],R);const J=o(e,["thinkingConfig"]);J!=null&&a(n,["thinkingConfig"],J);const ut=o(e,["imageConfig"]);if(ut!=null&&a(n,["imageConfig"],xl(ut)),o(e,["enableEnhancedCivicAnswers"])!==void 0)throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");const mt=o(e,["modelArmorConfig"]);return i!==void 0&&mt!=null&&a(i,["modelArmorConfig"],mt),n}function Ei(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let l=B(s);Array.isArray(l)&&(l=l.map(c=>Se(c))),a(i,["contents"],l)}const r=o(e,["config"]);return r!=null&&a(i,["generationConfig"],Zr(t,r,i)),i}function ki(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["contents"]);if(s!=null){let l=B(s);Array.isArray(l)&&(l=l.map(c=>c)),a(i,["contents"],l)}const r=o(e,["config"]);return r!=null&&a(i,["generationConfig"],$r(t,r,i)),i}function Mi(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["candidates"]);if(n!=null){let u=n;Array.isArray(u)&&(u=u.map(d=>wr(d))),a(e,["candidates"],u)}const s=o(t,["modelVersion"]);s!=null&&a(e,["modelVersion"],s);const r=o(t,["promptFeedback"]);r!=null&&a(e,["promptFeedback"],r);const l=o(t,["responseId"]);l!=null&&a(e,["responseId"],l);const c=o(t,["usageMetadata"]);return c!=null&&a(e,["usageMetadata"],c),e}function Pi(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["candidates"]);if(n!=null){let d=n;Array.isArray(d)&&(d=d.map(m=>m)),a(e,["candidates"],d)}const s=o(t,["createTime"]);s!=null&&a(e,["createTime"],s);const r=o(t,["modelVersion"]);r!=null&&a(e,["modelVersion"],r);const l=o(t,["promptFeedback"]);l!=null&&a(e,["promptFeedback"],l);const c=o(t,["responseId"]);c!=null&&a(e,["responseId"],c);const u=o(t,["usageMetadata"]);return u!=null&&a(e,["usageMetadata"],u),e}function Qr(t,e){const i={};if(o(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(o(t,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const n=o(t,["numberOfImages"]);e!==void 0&&n!=null&&a(e,["parameters","sampleCount"],n);const s=o(t,["aspectRatio"]);e!==void 0&&s!=null&&a(e,["parameters","aspectRatio"],s);const r=o(t,["guidanceScale"]);if(e!==void 0&&r!=null&&a(e,["parameters","guidanceScale"],r),o(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const l=o(t,["safetyFilterLevel"]);e!==void 0&&l!=null&&a(e,["parameters","safetySetting"],l);const c=o(t,["personGeneration"]);e!==void 0&&c!=null&&a(e,["parameters","personGeneration"],c);const u=o(t,["includeSafetyAttributes"]);e!==void 0&&u!=null&&a(e,["parameters","includeSafetyAttributes"],u);const d=o(t,["includeRaiReason"]);e!==void 0&&d!=null&&a(e,["parameters","includeRaiReason"],d);const m=o(t,["language"]);e!==void 0&&m!=null&&a(e,["parameters","language"],m);const h=o(t,["outputMimeType"]);e!==void 0&&h!=null&&a(e,["parameters","outputOptions","mimeType"],h);const p=o(t,["outputCompressionQuality"]);if(e!==void 0&&p!=null&&a(e,["parameters","outputOptions","compressionQuality"],p),o(t,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(o(t,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const g=o(t,["imageSize"]);if(e!==void 0&&g!=null&&a(e,["parameters","sampleImageSize"],g),o(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return i}function Xr(t,e){const i={},n=o(t,["outputGcsUri"]);e!==void 0&&n!=null&&a(e,["parameters","storageUri"],n);const s=o(t,["negativePrompt"]);e!==void 0&&s!=null&&a(e,["parameters","negativePrompt"],s);const r=o(t,["numberOfImages"]);e!==void 0&&r!=null&&a(e,["parameters","sampleCount"],r);const l=o(t,["aspectRatio"]);e!==void 0&&l!=null&&a(e,["parameters","aspectRatio"],l);const c=o(t,["guidanceScale"]);e!==void 0&&c!=null&&a(e,["parameters","guidanceScale"],c);const u=o(t,["seed"]);e!==void 0&&u!=null&&a(e,["parameters","seed"],u);const d=o(t,["safetyFilterLevel"]);e!==void 0&&d!=null&&a(e,["parameters","safetySetting"],d);const m=o(t,["personGeneration"]);e!==void 0&&m!=null&&a(e,["parameters","personGeneration"],m);const h=o(t,["includeSafetyAttributes"]);e!==void 0&&h!=null&&a(e,["parameters","includeSafetyAttributes"],h);const p=o(t,["includeRaiReason"]);e!==void 0&&p!=null&&a(e,["parameters","includeRaiReason"],p);const g=o(t,["language"]);e!==void 0&&g!=null&&a(e,["parameters","language"],g);const f=o(t,["outputMimeType"]);e!==void 0&&f!=null&&a(e,["parameters","outputOptions","mimeType"],f);const w=o(t,["outputCompressionQuality"]);e!==void 0&&w!=null&&a(e,["parameters","outputOptions","compressionQuality"],w);const y=o(t,["addWatermark"]);e!==void 0&&y!=null&&a(e,["parameters","addWatermark"],y);const v=o(t,["labels"]);e!==void 0&&v!=null&&a(e,["labels"],v);const x=o(t,["imageSize"]);e!==void 0&&x!=null&&a(e,["parameters","sampleImageSize"],x);const C=o(t,["enhancePrompt"]);return e!==void 0&&C!=null&&a(e,["parameters","enhancePrompt"],C),i}function jr(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["prompt"]);s!=null&&a(i,["instances[0]","prompt"],s);const r=o(e,["config"]);return r!=null&&Qr(r,i),i}function el(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["prompt"]);s!=null&&a(i,["instances[0]","prompt"],s);const r=o(e,["config"]);return r!=null&&Xr(r,i),i}function tl(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["predictions"]);if(n!=null){let r=n;Array.isArray(r)&&(r=r.map(l=>hl(l))),a(e,["generatedImages"],r)}const s=o(t,["positivePromptSafetyAttributes"]);return s!=null&&a(e,["positivePromptSafetyAttributes"],Cn(s)),e}function il(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["predictions"]);if(n!=null){let r=n;Array.isArray(r)&&(r=r.map(l=>_e(l))),a(e,["generatedImages"],r)}const s=o(t,["positivePromptSafetyAttributes"]);return s!=null&&a(e,["positivePromptSafetyAttributes"],In(s)),e}function nl(t,e){const i={},n=o(t,["numberOfVideos"]);if(e!==void 0&&n!=null&&a(e,["parameters","sampleCount"],n),o(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(o(t,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const s=o(t,["durationSeconds"]);if(e!==void 0&&s!=null&&a(e,["parameters","durationSeconds"],s),o(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const r=o(t,["aspectRatio"]);e!==void 0&&r!=null&&a(e,["parameters","aspectRatio"],r);const l=o(t,["resolution"]);e!==void 0&&l!=null&&a(e,["parameters","resolution"],l);const c=o(t,["personGeneration"]);if(e!==void 0&&c!=null&&a(e,["parameters","personGeneration"],c),o(t,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const u=o(t,["negativePrompt"]);e!==void 0&&u!=null&&a(e,["parameters","negativePrompt"],u);const d=o(t,["enhancePrompt"]);if(e!==void 0&&d!=null&&a(e,["parameters","enhancePrompt"],d),o(t,["generateAudio"])!==void 0)throw new Error("generateAudio parameter is not supported in Gemini API.");const m=o(t,["lastFrame"]);e!==void 0&&m!=null&&a(e,["instances[0]","lastFrame"],Ee(m));const h=o(t,["referenceImages"]);if(e!==void 0&&h!=null){let p=h;Array.isArray(p)&&(p=p.map(g=>sc(g))),a(e,["instances[0]","referenceImages"],p)}if(o(t,["mask"])!==void 0)throw new Error("mask parameter is not supported in Gemini API.");if(o(t,["compressionQuality"])!==void 0)throw new Error("compressionQuality parameter is not supported in Gemini API.");return i}function ol(t,e){const i={},n=o(t,["numberOfVideos"]);e!==void 0&&n!=null&&a(e,["parameters","sampleCount"],n);const s=o(t,["outputGcsUri"]);e!==void 0&&s!=null&&a(e,["parameters","storageUri"],s);const r=o(t,["fps"]);e!==void 0&&r!=null&&a(e,["parameters","fps"],r);const l=o(t,["durationSeconds"]);e!==void 0&&l!=null&&a(e,["parameters","durationSeconds"],l);const c=o(t,["seed"]);e!==void 0&&c!=null&&a(e,["parameters","seed"],c);const u=o(t,["aspectRatio"]);e!==void 0&&u!=null&&a(e,["parameters","aspectRatio"],u);const d=o(t,["resolution"]);e!==void 0&&d!=null&&a(e,["parameters","resolution"],d);const m=o(t,["personGeneration"]);e!==void 0&&m!=null&&a(e,["parameters","personGeneration"],m);const h=o(t,["pubsubTopic"]);e!==void 0&&h!=null&&a(e,["parameters","pubsubTopic"],h);const p=o(t,["negativePrompt"]);e!==void 0&&p!=null&&a(e,["parameters","negativePrompt"],p);const g=o(t,["enhancePrompt"]);e!==void 0&&g!=null&&a(e,["parameters","enhancePrompt"],g);const f=o(t,["generateAudio"]);e!==void 0&&f!=null&&a(e,["parameters","generateAudio"],f);const w=o(t,["lastFrame"]);e!==void 0&&w!=null&&a(e,["instances[0]","lastFrame"],V(w));const y=o(t,["referenceImages"]);if(e!==void 0&&y!=null){let C=y;Array.isArray(C)&&(C=C.map(A=>ac(A))),a(e,["instances[0]","referenceImages"],C)}const v=o(t,["mask"]);e!==void 0&&v!=null&&a(e,["instances[0]","mask"],oc(v));const x=o(t,["compressionQuality"]);return e!==void 0&&x!=null&&a(e,["parameters","compressionQuality"],x),i}function sl(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response","generateVideoResponse"]);return l!=null&&a(e,["response"],cl(l)),e}function al(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response"]);return l!=null&&a(e,["response"],dl(l)),e}function rl(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["prompt"]);s!=null&&a(i,["instances[0]","prompt"],s);const r=o(e,["image"]);r!=null&&a(i,["instances[0]","image"],Ee(r));const l=o(e,["video"]);l!=null&&a(i,["instances[0]","video"],An(l));const c=o(e,["source"]);c!=null&&ul(c,i);const u=o(e,["config"]);return u!=null&&nl(u,i),i}function ll(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["prompt"]);s!=null&&a(i,["instances[0]","prompt"],s);const r=o(e,["image"]);r!=null&&a(i,["instances[0]","image"],V(r));const l=o(e,["video"]);l!=null&&a(i,["instances[0]","video"],Tn(l));const c=o(e,["source"]);c!=null&&ml(c,i);const u=o(e,["config"]);return u!=null&&ol(u,i),i}function cl(t){const e={},i=o(t,["generatedSamples"]);if(i!=null){let r=i;Array.isArray(r)&&(r=r.map(l=>gl(l))),a(e,["generatedVideos"],r)}const n=o(t,["raiMediaFilteredCount"]);n!=null&&a(e,["raiMediaFilteredCount"],n);const s=o(t,["raiMediaFilteredReasons"]);return s!=null&&a(e,["raiMediaFilteredReasons"],s),e}function dl(t){const e={},i=o(t,["videos"]);if(i!=null){let r=i;Array.isArray(r)&&(r=r.map(l=>fl(l))),a(e,["generatedVideos"],r)}const n=o(t,["raiMediaFilteredCount"]);n!=null&&a(e,["raiMediaFilteredCount"],n);const s=o(t,["raiMediaFilteredReasons"]);return s!=null&&a(e,["raiMediaFilteredReasons"],s),e}function ul(t,e){const i={},n=o(t,["prompt"]);e!==void 0&&n!=null&&a(e,["instances[0]","prompt"],n);const s=o(t,["image"]);e!==void 0&&s!=null&&a(e,["instances[0]","image"],Ee(s));const r=o(t,["video"]);return e!==void 0&&r!=null&&a(e,["instances[0]","video"],An(r)),i}function ml(t,e){const i={},n=o(t,["prompt"]);e!==void 0&&n!=null&&a(e,["instances[0]","prompt"],n);const s=o(t,["image"]);e!==void 0&&s!=null&&a(e,["instances[0]","image"],V(s));const r=o(t,["video"]);return e!==void 0&&r!=null&&a(e,["instances[0]","video"],Tn(r)),i}function hl(t){const e={},i=o(t,["_self"]);i!=null&&a(e,["image"],Al(i));const n=o(t,["raiFilteredReason"]);n!=null&&a(e,["raiFilteredReason"],n);const s=o(t,["_self"]);return s!=null&&a(e,["safetyAttributes"],Cn(s)),e}function _e(t){const e={},i=o(t,["_self"]);i!=null&&a(e,["image"],bn(i));const n=o(t,["raiFilteredReason"]);n!=null&&a(e,["raiFilteredReason"],n);const s=o(t,["_self"]);s!=null&&a(e,["safetyAttributes"],In(s));const r=o(t,["prompt"]);return r!=null&&a(e,["enhancedPrompt"],r),e}function pl(t){const e={},i=o(t,["_self"]);i!=null&&a(e,["mask"],bn(i));const n=o(t,["labels"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(r=>r)),a(e,["labels"],s)}return e}function gl(t){const e={},i=o(t,["video"]);return i!=null&&a(e,["video"],ic(i)),e}function fl(t){const e={},i=o(t,["_self"]);return i!=null&&a(e,["video"],nc(i)),e}function yl(t){const e={},i=o(t,["modelSelectionConfig"]);i!=null&&a(e,["modelConfig"],i);const n=o(t,["responseJsonSchema"]);n!=null&&a(e,["responseJsonSchema"],n);const s=o(t,["audioTimestamp"]);s!=null&&a(e,["audioTimestamp"],s);const r=o(t,["candidateCount"]);r!=null&&a(e,["candidateCount"],r);const l=o(t,["enableAffectiveDialog"]);l!=null&&a(e,["enableAffectiveDialog"],l);const c=o(t,["frequencyPenalty"]);c!=null&&a(e,["frequencyPenalty"],c);const u=o(t,["logprobs"]);u!=null&&a(e,["logprobs"],u);const d=o(t,["maxOutputTokens"]);d!=null&&a(e,["maxOutputTokens"],d);const m=o(t,["mediaResolution"]);m!=null&&a(e,["mediaResolution"],m);const h=o(t,["presencePenalty"]);h!=null&&a(e,["presencePenalty"],h);const p=o(t,["responseLogprobs"]);p!=null&&a(e,["responseLogprobs"],p);const g=o(t,["responseMimeType"]);g!=null&&a(e,["responseMimeType"],g);const f=o(t,["responseModalities"]);f!=null&&a(e,["responseModalities"],f);const w=o(t,["responseSchema"]);w!=null&&a(e,["responseSchema"],w);const y=o(t,["routingConfig"]);y!=null&&a(e,["routingConfig"],y);const v=o(t,["seed"]);v!=null&&a(e,["seed"],v);const x=o(t,["speechConfig"]);x!=null&&a(e,["speechConfig"],x);const C=o(t,["stopSequences"]);C!=null&&a(e,["stopSequences"],C);const A=o(t,["temperature"]);A!=null&&a(e,["temperature"],A);const _=o(t,["thinkingConfig"]);_!=null&&a(e,["thinkingConfig"],_);const k=o(t,["topK"]);k!=null&&a(e,["topK"],k);const E=o(t,["topP"]);if(E!=null&&a(e,["topP"],E),o(t,["enableEnhancedCivicAnswers"])!==void 0)throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");return e}function wl(t,e){const i={},n=o(e,["model"]);return n!=null&&a(i,["_url","name"],P(t,n)),i}function vl(t,e){const i={},n=o(e,["model"]);return n!=null&&a(i,["_url","name"],P(t,n)),i}function bl(t){const e={};if(o(t,["authConfig"])!==void 0)throw new Error("authConfig parameter is not supported in Gemini API.");const i=o(t,["enableWidget"]);return i!=null&&a(e,["enableWidget"],i),e}function Cl(t){const e={};if(o(t,["excludeDomains"])!==void 0)throw new Error("excludeDomains parameter is not supported in Gemini API.");if(o(t,["blockingConfidence"])!==void 0)throw new Error("blockingConfidence parameter is not supported in Gemini API.");const i=o(t,["timeRangeFilter"]);return i!=null&&a(e,["timeRangeFilter"],i),e}function Il(t){const e={},i=o(t,["aspectRatio"]);i!=null&&a(e,["aspectRatio"],i);const n=o(t,["imageSize"]);if(n!=null&&a(e,["imageSize"],n),o(t,["personGeneration"])!==void 0)throw new Error("personGeneration parameter is not supported in Gemini API.");if(o(t,["outputMimeType"])!==void 0)throw new Error("outputMimeType parameter is not supported in Gemini API.");if(o(t,["outputCompressionQuality"])!==void 0)throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");return e}function xl(t){const e={},i=o(t,["aspectRatio"]);i!=null&&a(e,["aspectRatio"],i);const n=o(t,["imageSize"]);n!=null&&a(e,["imageSize"],n);const s=o(t,["personGeneration"]);s!=null&&a(e,["personGeneration"],s);const r=o(t,["outputMimeType"]);r!=null&&a(e,["imageOutputOptions","mimeType"],r);const l=o(t,["outputCompressionQuality"]);return l!=null&&a(e,["imageOutputOptions","compressionQuality"],l),e}function Al(t){const e={},i=o(t,["bytesBase64Encoded"]);i!=null&&a(e,["imageBytes"],Q(i));const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function bn(t){const e={},i=o(t,["gcsUri"]);i!=null&&a(e,["gcsUri"],i);const n=o(t,["bytesBase64Encoded"]);n!=null&&a(e,["imageBytes"],Q(n));const s=o(t,["mimeType"]);return s!=null&&a(e,["mimeType"],s),e}function Ee(t){const e={};if(o(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const i=o(t,["imageBytes"]);i!=null&&a(e,["bytesBase64Encoded"],Q(i));const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function V(t){const e={},i=o(t,["gcsUri"]);i!=null&&a(e,["gcsUri"],i);const n=o(t,["imageBytes"]);n!=null&&a(e,["bytesBase64Encoded"],Q(n));const s=o(t,["mimeType"]);return s!=null&&a(e,["mimeType"],s),e}function Tl(t,e,i){const n={},s=o(e,["pageSize"]);i!==void 0&&s!=null&&a(i,["_query","pageSize"],s);const r=o(e,["pageToken"]);i!==void 0&&r!=null&&a(i,["_query","pageToken"],r);const l=o(e,["filter"]);i!==void 0&&l!=null&&a(i,["_query","filter"],l);const c=o(e,["queryBase"]);return i!==void 0&&c!=null&&a(i,["_url","models_url"],hn(t,c)),n}function Sl(t,e,i){const n={},s=o(e,["pageSize"]);i!==void 0&&s!=null&&a(i,["_query","pageSize"],s);const r=o(e,["pageToken"]);i!==void 0&&r!=null&&a(i,["_query","pageToken"],r);const l=o(e,["filter"]);i!==void 0&&l!=null&&a(i,["_query","filter"],l);const c=o(e,["queryBase"]);return i!==void 0&&c!=null&&a(i,["_url","models_url"],hn(t,c)),n}function _l(t,e){const i={},n=o(e,["config"]);return n!=null&&Tl(t,n,i),i}function El(t,e){const i={},n=o(e,["config"]);return n!=null&&Sl(t,n,i),i}function kl(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["_self"]);if(s!=null){let r=pn(s);Array.isArray(r)&&(r=r.map(l=>Oe(l))),a(e,["models"],r)}return e}function Ml(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["_self"]);if(s!=null){let r=pn(s);Array.isArray(r)&&(r=r.map(l=>Ve(l))),a(e,["models"],r)}return e}function Pl(t){const e={},i=o(t,["maskMode"]);i!=null&&a(e,["maskMode"],i);const n=o(t,["segmentationClasses"]);n!=null&&a(e,["maskClasses"],n);const s=o(t,["maskDilation"]);return s!=null&&a(e,["dilation"],s),e}function Oe(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["displayName"]);n!=null&&a(e,["displayName"],n);const s=o(t,["description"]);s!=null&&a(e,["description"],s);const r=o(t,["version"]);r!=null&&a(e,["version"],r);const l=o(t,["_self"]);l!=null&&a(e,["tunedModelInfo"],Yl(l));const c=o(t,["inputTokenLimit"]);c!=null&&a(e,["inputTokenLimit"],c);const u=o(t,["outputTokenLimit"]);u!=null&&a(e,["outputTokenLimit"],u);const d=o(t,["supportedGenerationMethods"]);d!=null&&a(e,["supportedActions"],d);const m=o(t,["temperature"]);m!=null&&a(e,["temperature"],m);const h=o(t,["maxTemperature"]);h!=null&&a(e,["maxTemperature"],h);const p=o(t,["topP"]);p!=null&&a(e,["topP"],p);const g=o(t,["topK"]);g!=null&&a(e,["topK"],g);const f=o(t,["thinking"]);return f!=null&&a(e,["thinking"],f),e}function Ve(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["displayName"]);n!=null&&a(e,["displayName"],n);const s=o(t,["description"]);s!=null&&a(e,["description"],s);const r=o(t,["versionId"]);r!=null&&a(e,["version"],r);const l=o(t,["deployedModels"]);if(l!=null){let h=l;Array.isArray(h)&&(h=h.map(p=>Vr(p))),a(e,["endpoints"],h)}const c=o(t,["labels"]);c!=null&&a(e,["labels"],c);const u=o(t,["_self"]);u!=null&&a(e,["tunedModelInfo"],Kl(u));const d=o(t,["defaultCheckpointId"]);d!=null&&a(e,["defaultCheckpointId"],d);const m=o(t,["checkpoints"]);if(m!=null){let h=m;Array.isArray(h)&&(h=h.map(p=>p)),a(e,["checkpoints"],h)}return e}function Rl(t){const e={},i=o(t,["mediaResolution"]);i!=null&&a(e,["mediaResolution"],i);const n=o(t,["codeExecutionResult"]);n!=null&&a(e,["codeExecutionResult"],n);const s=o(t,["executableCode"]);s!=null&&a(e,["executableCode"],s);const r=o(t,["fileData"]);r!=null&&a(e,["fileData"],zr(r));const l=o(t,["functionCall"]);l!=null&&a(e,["functionCall"],Jr(l));const c=o(t,["functionResponse"]);c!=null&&a(e,["functionResponse"],c);const u=o(t,["inlineData"]);u!=null&&a(e,["inlineData"],yr(u));const d=o(t,["text"]);d!=null&&a(e,["text"],d);const m=o(t,["thought"]);m!=null&&a(e,["thought"],m);const h=o(t,["thoughtSignature"]);h!=null&&a(e,["thoughtSignature"],h);const p=o(t,["videoMetadata"]);return p!=null&&a(e,["videoMetadata"],p),e}function ql(t){const e={},i=o(t,["productImage"]);return i!=null&&a(e,["image"],V(i)),e}function Dl(t,e){const i={},n=o(t,["numberOfImages"]);e!==void 0&&n!=null&&a(e,["parameters","sampleCount"],n);const s=o(t,["baseSteps"]);e!==void 0&&s!=null&&a(e,["parameters","baseSteps"],s);const r=o(t,["outputGcsUri"]);e!==void 0&&r!=null&&a(e,["parameters","storageUri"],r);const l=o(t,["seed"]);e!==void 0&&l!=null&&a(e,["parameters","seed"],l);const c=o(t,["safetyFilterLevel"]);e!==void 0&&c!=null&&a(e,["parameters","safetySetting"],c);const u=o(t,["personGeneration"]);e!==void 0&&u!=null&&a(e,["parameters","personGeneration"],u);const d=o(t,["addWatermark"]);e!==void 0&&d!=null&&a(e,["parameters","addWatermark"],d);const m=o(t,["outputMimeType"]);e!==void 0&&m!=null&&a(e,["parameters","outputOptions","mimeType"],m);const h=o(t,["outputCompressionQuality"]);e!==void 0&&h!=null&&a(e,["parameters","outputOptions","compressionQuality"],h);const p=o(t,["enhancePrompt"]);e!==void 0&&p!=null&&a(e,["parameters","enhancePrompt"],p);const g=o(t,["labels"]);return e!==void 0&&g!=null&&a(e,["labels"],g),i}function Nl(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["source"]);s!=null&&Hl(s,i);const r=o(e,["config"]);return r!=null&&Dl(r,i),i}function Ll(t){const e={},i=o(t,["predictions"]);if(i!=null){let n=i;Array.isArray(n)&&(n=n.map(s=>_e(s))),a(e,["generatedImages"],n)}return e}function Hl(t,e){const i={},n=o(t,["prompt"]);e!==void 0&&n!=null&&a(e,["instances[0]","prompt"],n);const s=o(t,["personImage"]);e!==void 0&&s!=null&&a(e,["instances[0]","personImage","image"],V(s));const r=o(t,["productImages"]);if(e!==void 0&&r!=null){let l=r;Array.isArray(l)&&(l=l.map(c=>ql(c))),a(e,["instances[0]","productImages"],l)}return i}function Gl(t){const e={},i=o(t,["referenceImage"]);i!=null&&a(e,["referenceImage"],V(i));const n=o(t,["referenceId"]);n!=null&&a(e,["referenceId"],n);const s=o(t,["referenceType"]);s!=null&&a(e,["referenceType"],s);const r=o(t,["maskImageConfig"]);r!=null&&a(e,["maskImageConfig"],Pl(r));const l=o(t,["controlImageConfig"]);l!=null&&a(e,["controlImageConfig"],Ar(l));const c=o(t,["styleImageConfig"]);c!=null&&a(e,["styleImageConfig"],c);const u=o(t,["subjectImageConfig"]);return u!=null&&a(e,["subjectImageConfig"],u),e}function Cn(t){const e={},i=o(t,["safetyAttributes","categories"]);i!=null&&a(e,["categories"],i);const n=o(t,["safetyAttributes","scores"]);n!=null&&a(e,["scores"],n);const s=o(t,["contentType"]);return s!=null&&a(e,["contentType"],s),e}function In(t){const e={},i=o(t,["safetyAttributes","categories"]);i!=null&&a(e,["categories"],i);const n=o(t,["safetyAttributes","scores"]);n!=null&&a(e,["scores"],n);const s=o(t,["contentType"]);return s!=null&&a(e,["contentType"],s),e}function Fl(t){const e={},i=o(t,["category"]);if(i!=null&&a(e,["category"],i),o(t,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=o(t,["threshold"]);return n!=null&&a(e,["threshold"],n),e}function Bl(t){const e={},i=o(t,["image"]);return i!=null&&a(e,["image"],V(i)),e}function Ul(t,e){const i={},n=o(t,["mode"]);e!==void 0&&n!=null&&a(e,["parameters","mode"],n);const s=o(t,["maxPredictions"]);e!==void 0&&s!=null&&a(e,["parameters","maxPredictions"],s);const r=o(t,["confidenceThreshold"]);e!==void 0&&r!=null&&a(e,["parameters","confidenceThreshold"],r);const l=o(t,["maskDilation"]);e!==void 0&&l!=null&&a(e,["parameters","maskDilation"],l);const c=o(t,["binaryColorThreshold"]);e!==void 0&&c!=null&&a(e,["parameters","binaryColorThreshold"],c);const u=o(t,["labels"]);return e!==void 0&&u!=null&&a(e,["labels"],u),i}function Wl(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["source"]);s!=null&&Vl(s,i);const r=o(e,["config"]);return r!=null&&Ul(r,i),i}function Ol(t){const e={},i=o(t,["predictions"]);if(i!=null){let n=i;Array.isArray(n)&&(n=n.map(s=>pl(s))),a(e,["generatedMasks"],n)}return e}function Vl(t,e){const i={},n=o(t,["prompt"]);e!==void 0&&n!=null&&a(e,["instances[0]","prompt"],n);const s=o(t,["image"]);e!==void 0&&s!=null&&a(e,["instances[0]","image"],V(s));const r=o(t,["scribbleImage"]);return e!==void 0&&r!=null&&a(e,["instances[0]","scribble"],Bl(r)),i}function zl(t){const e={},i=o(t,["retrievalConfig"]);i!=null&&a(e,["retrievalConfig"],i);const n=o(t,["functionCallingConfig"]);return n!=null&&a(e,["functionCallingConfig"],Yr(n)),e}function Jl(t){const e={};if(o(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=o(t,["computerUse"]);i!=null&&a(e,["computerUse"],i);const n=o(t,["fileSearch"]);n!=null&&a(e,["fileSearch"],n);const s=o(t,["codeExecution"]);if(s!=null&&a(e,["codeExecution"],s),o(t,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");const r=o(t,["functionDeclarations"]);if(r!=null){let m=r;Array.isArray(m)&&(m=m.map(h=>h)),a(e,["functionDeclarations"],m)}const l=o(t,["googleMaps"]);l!=null&&a(e,["googleMaps"],bl(l));const c=o(t,["googleSearch"]);c!=null&&a(e,["googleSearch"],Cl(c));const u=o(t,["googleSearchRetrieval"]);u!=null&&a(e,["googleSearchRetrieval"],u);const d=o(t,["urlContext"]);return d!=null&&a(e,["urlContext"],d),e}function xn(t){const e={},i=o(t,["retrieval"]);i!=null&&a(e,["retrieval"],i);const n=o(t,["computerUse"]);if(n!=null&&a(e,["computerUse"],n),o(t,["fileSearch"])!==void 0)throw new Error("fileSearch parameter is not supported in Vertex AI.");const s=o(t,["codeExecution"]);s!=null&&a(e,["codeExecution"],s);const r=o(t,["enterpriseWebSearch"]);r!=null&&a(e,["enterpriseWebSearch"],r);const l=o(t,["functionDeclarations"]);if(l!=null){let h=l;Array.isArray(h)&&(h=h.map(p=>Kr(p))),a(e,["functionDeclarations"],h)}const c=o(t,["googleMaps"]);c!=null&&a(e,["googleMaps"],c);const u=o(t,["googleSearch"]);u!=null&&a(e,["googleSearch"],u);const d=o(t,["googleSearchRetrieval"]);d!=null&&a(e,["googleSearchRetrieval"],d);const m=o(t,["urlContext"]);return m!=null&&a(e,["urlContext"],m),e}function Yl(t){const e={},i=o(t,["baseModel"]);i!=null&&a(e,["baseModel"],i);const n=o(t,["createTime"]);n!=null&&a(e,["createTime"],n);const s=o(t,["updateTime"]);return s!=null&&a(e,["updateTime"],s),e}function Kl(t){const e={},i=o(t,["labels","google-vertex-llm-tuning-base-model-id"]);i!=null&&a(e,["baseModel"],i);const n=o(t,["createTime"]);n!=null&&a(e,["createTime"],n);const s=o(t,["updateTime"]);return s!=null&&a(e,["updateTime"],s),e}function Zl(t,e){const i={},n=o(t,["displayName"]);e!==void 0&&n!=null&&a(e,["displayName"],n);const s=o(t,["description"]);e!==void 0&&s!=null&&a(e,["description"],s);const r=o(t,["defaultCheckpointId"]);return e!==void 0&&r!=null&&a(e,["defaultCheckpointId"],r),i}function $l(t,e){const i={},n=o(t,["displayName"]);e!==void 0&&n!=null&&a(e,["displayName"],n);const s=o(t,["description"]);e!==void 0&&s!=null&&a(e,["description"],s);const r=o(t,["defaultCheckpointId"]);return e!==void 0&&r!=null&&a(e,["defaultCheckpointId"],r),i}function Ql(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","name"],P(t,n));const s=o(e,["config"]);return s!=null&&Zl(s,i),i}function Xl(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["config"]);return s!=null&&$l(s,i),i}function jl(t,e){const i={},n=o(t,["outputGcsUri"]);e!==void 0&&n!=null&&a(e,["parameters","storageUri"],n);const s=o(t,["safetyFilterLevel"]);e!==void 0&&s!=null&&a(e,["parameters","safetySetting"],s);const r=o(t,["personGeneration"]);e!==void 0&&r!=null&&a(e,["parameters","personGeneration"],r);const l=o(t,["includeRaiReason"]);e!==void 0&&l!=null&&a(e,["parameters","includeRaiReason"],l);const c=o(t,["outputMimeType"]);e!==void 0&&c!=null&&a(e,["parameters","outputOptions","mimeType"],c);const u=o(t,["outputCompressionQuality"]);e!==void 0&&u!=null&&a(e,["parameters","outputOptions","compressionQuality"],u);const d=o(t,["enhanceInputImage"]);e!==void 0&&d!=null&&a(e,["parameters","upscaleConfig","enhanceInputImage"],d);const m=o(t,["imagePreservationFactor"]);e!==void 0&&m!=null&&a(e,["parameters","upscaleConfig","imagePreservationFactor"],m);const h=o(t,["labels"]);e!==void 0&&h!=null&&a(e,["labels"],h);const p=o(t,["numberOfImages"]);e!==void 0&&p!=null&&a(e,["parameters","sampleCount"],p);const g=o(t,["mode"]);return e!==void 0&&g!=null&&a(e,["parameters","mode"],g),i}function ec(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["_url","model"],P(t,n));const s=o(e,["image"]);s!=null&&a(i,["instances[0]","image"],V(s));const r=o(e,["upscaleFactor"]);r!=null&&a(i,["parameters","upscaleConfig","upscaleFactor"],r);const l=o(e,["config"]);return l!=null&&jl(l,i),i}function tc(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["predictions"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(r=>_e(r))),a(e,["generatedImages"],s)}return e}function ic(t){const e={},i=o(t,["uri"]);i!=null&&a(e,["uri"],i);const n=o(t,["encodedVideo"]);n!=null&&a(e,["videoBytes"],Q(n));const s=o(t,["encoding"]);return s!=null&&a(e,["mimeType"],s),e}function nc(t){const e={},i=o(t,["gcsUri"]);i!=null&&a(e,["uri"],i);const n=o(t,["bytesBase64Encoded"]);n!=null&&a(e,["videoBytes"],Q(n));const s=o(t,["mimeType"]);return s!=null&&a(e,["mimeType"],s),e}function oc(t){const e={},i=o(t,["image"]);i!=null&&a(e,["_self"],V(i));const n=o(t,["maskMode"]);return n!=null&&a(e,["maskMode"],n),e}function sc(t){const e={},i=o(t,["image"]);i!=null&&a(e,["image"],Ee(i));const n=o(t,["referenceType"]);return n!=null&&a(e,["referenceType"],n),e}function ac(t){const e={},i=o(t,["image"]);i!=null&&a(e,["image"],V(i));const n=o(t,["referenceType"]);return n!=null&&a(e,["referenceType"],n),e}function An(t){const e={},i=o(t,["uri"]);i!=null&&a(e,["uri"],i);const n=o(t,["videoBytes"]);n!=null&&a(e,["encodedVideo"],Q(n));const s=o(t,["mimeType"]);return s!=null&&a(e,["encoding"],s),e}function Tn(t){const e={},i=o(t,["uri"]);i!=null&&a(e,["gcsUri"],i);const n=o(t,["videoBytes"]);n!=null&&a(e,["bytesBase64Encoded"],Q(n));const s=o(t,["mimeType"]);return s!=null&&a(e,["mimeType"],s),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function rc(t,e){const i={},n=o(t,["displayName"]);return e!==void 0&&n!=null&&a(e,["displayName"],n),i}function lc(t){const e={},i=o(t,["config"]);return i!=null&&rc(i,e),e}function cc(t,e){const i={},n=o(t,["force"]);return e!==void 0&&n!=null&&a(e,["_query","force"],n),i}function dc(t){const e={},i=o(t,["name"]);i!=null&&a(e,["_url","name"],i);const n=o(t,["config"]);return n!=null&&cc(n,e),e}function uc(t){const e={},i=o(t,["name"]);return i!=null&&a(e,["_url","name"],i),e}function mc(t,e){const i={},n=o(t,["customMetadata"]);if(e!==void 0&&n!=null){let r=n;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["customMetadata"],r)}const s=o(t,["chunkingConfig"]);return e!==void 0&&s!=null&&a(e,["chunkingConfig"],s),i}function hc(t){const e={},i=o(t,["name"]);i!=null&&a(e,["name"],i);const n=o(t,["metadata"]);n!=null&&a(e,["metadata"],n);const s=o(t,["done"]);s!=null&&a(e,["done"],s);const r=o(t,["error"]);r!=null&&a(e,["error"],r);const l=o(t,["response"]);return l!=null&&a(e,["response"],gc(l)),e}function pc(t){const e={},i=o(t,["fileSearchStoreName"]);i!=null&&a(e,["_url","file_search_store_name"],i);const n=o(t,["fileName"]);n!=null&&a(e,["fileName"],n);const s=o(t,["config"]);return s!=null&&mc(s,e),e}function gc(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["parent"]);n!=null&&a(e,["parent"],n);const s=o(t,["documentName"]);return s!=null&&a(e,["documentName"],s),e}function fc(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);return e!==void 0&&s!=null&&a(e,["_query","pageToken"],s),i}function yc(t){const e={},i=o(t,["config"]);return i!=null&&fc(i,e),e}function wc(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["fileSearchStores"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["fileSearchStores"],r)}return e}function Sn(t,e){const i={},n=o(t,["mimeType"]);e!==void 0&&n!=null&&a(e,["mimeType"],n);const s=o(t,["displayName"]);e!==void 0&&s!=null&&a(e,["displayName"],s);const r=o(t,["customMetadata"]);if(e!==void 0&&r!=null){let c=r;Array.isArray(c)&&(c=c.map(u=>u)),a(e,["customMetadata"],c)}const l=o(t,["chunkingConfig"]);return e!==void 0&&l!=null&&a(e,["chunkingConfig"],l),i}function vc(t){const e={},i=o(t,["fileSearchStoreName"]);i!=null&&a(e,["_url","file_search_store_name"],i);const n=o(t,["config"]);return n!=null&&Sn(n,e),e}function bc(t){const e={},i=o(t,["sdkHttpResponse"]);return i!=null&&a(e,["sdkHttpResponse"],i),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Cc="Content-Type",Ic="X-Server-Timeout",xc="User-Agent",ze="x-goog-api-client",Ac="1.38.0",Tc=`google-genai-sdk/${Ac}`,Sc="v1beta1",_c="v1beta";class Ec{constructor(e){var i,n,s;this.clientOptions=Object.assign({},e),this.customBaseUrl=(i=e.httpOptions)===null||i===void 0?void 0:i.baseUrl,this.clientOptions.vertexai&&(this.clientOptions.project&&this.clientOptions.location?this.clientOptions.apiKey=void 0:this.clientOptions.apiKey&&(this.clientOptions.project=void 0,this.clientOptions.location=void 0));const r={};if(this.clientOptions.vertexai){if(!this.clientOptions.location&&!this.clientOptions.apiKey&&!this.customBaseUrl&&(this.clientOptions.location="global"),!(this.clientOptions.project&&this.clientOptions.location||this.clientOptions.apiKey)&&!this.customBaseUrl)throw new Error("Authentication is not set up. Please provide either a project and location, or an API key, or a custom base URL.");const c=e.project&&e.location||!!e.apiKey;this.customBaseUrl&&!c?(r.baseUrl=this.customBaseUrl,this.clientOptions.project=void 0,this.clientOptions.location=void 0):this.clientOptions.apiKey||this.clientOptions.location==="global"?r.baseUrl="https://aiplatform.googleapis.com/":this.clientOptions.project&&this.clientOptions.location&&(r.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`),r.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:Sc}else{if(!this.clientOptions.apiKey)throw new me({message:"API key must be set when using the Gemini API.",status:403});r.apiVersion=(s=this.clientOptions.apiVersion)!==null&&s!==void 0?s:_c,r.baseUrl="https://generativelanguage.googleapis.com/"}r.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=r,e.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(r,e.httpOptions))}isVertexAI(){var e;return(e=this.clientOptions.vertexai)!==null&&e!==void 0?e:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getCustomBaseUrl(){return this.customBaseUrl}async getAuthHeaders(){const e=new Headers;return await this.clientOptions.auth.addAuthHeaders(e),e}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(e){if(!e||e.baseUrl===void 0||e.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[e.baseUrl.endsWith("/")?e.baseUrl.slice(0,-1):e.baseUrl];return e.apiVersion&&e.apiVersion!==""&&n.push(e.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const e=this.getBaseUrl(),i=new URL(e);return i.protocol=i.protocol=="http:"?"ws":"wss",i.toString()}setBaseUrl(e){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=e;else throw new Error("HTTP options are not correctly set.")}constructUrl(e,i,n){const s=[this.getRequestUrlInternal(i)];return n&&s.push(this.getBaseResourcePath()),e!==""&&s.push(e),new URL(`${s.join("/")}`)}shouldPrependVertexProjectPath(e,i){return!(i.baseUrl&&i.baseUrlResourceScope===Fe.COLLECTION||this.clientOptions.apiKey||!this.clientOptions.vertexai||e.path.startsWith("projects/")||e.httpMethod==="GET"&&e.path.startsWith("publishers/google/models"))}async request(e){let i=this.clientOptions.httpOptions;e.httpOptions&&(i=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e,i),s=this.constructUrl(e.path,i,n);if(e.queryParams)for(const[l,c]of Object.entries(e.queryParams))s.searchParams.append(l,String(c));let r={};if(e.httpMethod==="GET"){if(e.body&&e.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else r.body=e.body;return r=await this.includeExtraHttpOptionsToRequestInit(r,i,s.toString(),e.abortSignal),this.unaryApiCall(s,r,e.httpMethod)}patchHttpOptions(e,i){const n=JSON.parse(JSON.stringify(e));for(const[s,r]of Object.entries(i))typeof r=="object"?n[s]=Object.assign(Object.assign({},n[s]),r):r!==void 0&&(n[s]=r);return n}async requestStream(e){let i=this.clientOptions.httpOptions;e.httpOptions&&(i=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e,i),s=this.constructUrl(e.path,i,n);(!s.searchParams.has("alt")||s.searchParams.get("alt")!=="sse")&&s.searchParams.set("alt","sse");let r={};return r.body=e.body,r=await this.includeExtraHttpOptionsToRequestInit(r,i,s.toString(),e.abortSignal),this.streamApiCall(s,r,e.httpMethod)}async includeExtraHttpOptionsToRequestInit(e,i,n,s){if(i&&i.timeout||s){const r=new AbortController,l=r.signal;if(i.timeout&&(i==null?void 0:i.timeout)>0){const c=setTimeout(()=>r.abort(),i.timeout);c&&typeof c.unref=="function"&&c.unref()}s&&s.addEventListener("abort",()=>{r.abort()}),e.signal=l}return i&&i.extraBody!==null&&kc(e,i.extraBody),e.headers=await this.getHeadersInternal(i,n),e}async unaryApiCall(e,i,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},i),{method:n})).then(async s=>(await Ri(s),new Be(s))).catch(s=>{throw s instanceof Error?s:new Error(JSON.stringify(s))})}async streamApiCall(e,i,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},i),{method:n})).then(async s=>(await Ri(s),this.processStreamResponse(s))).catch(s=>{throw s instanceof Error?s:new Error(JSON.stringify(s))})}processStreamResponse(e){return W(this,arguments,function*(){var n;const s=(n=e==null?void 0:e.body)===null||n===void 0?void 0:n.getReader(),r=new TextDecoder("utf-8");if(!s)throw new Error("Response body is empty");try{let l="";const c="data:",u=[`

`,"\r\r",`\r
\r
`];for(;;){const{done:d,value:m}=yield S(s.read());if(d){if(l.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const h=r.decode(m,{stream:!0});try{const f=JSON.parse(h);if("error"in f){const w=JSON.parse(JSON.stringify(f.error)),y=w.status,v=w.code,x=`got status: ${y}. ${JSON.stringify(f)}`;if(v>=400&&v<600)throw new me({message:x,status:v})}}catch(f){if(f.name==="ApiError")throw f}l+=h;let p=-1,g=0;for(;;){p=-1,g=0;for(const y of u){const v=l.indexOf(y);v!==-1&&(p===-1||v<p)&&(p=v,g=y.length)}if(p===-1)break;const f=l.substring(0,p);l=l.substring(p+g);const w=f.trim();if(w.startsWith(c)){const y=w.substring(c.length).trim();try{const v=new Response(y,{headers:e==null?void 0:e.headers,status:e==null?void 0:e.status,statusText:e==null?void 0:e.statusText});yield yield S(new Be(v))}catch(v){throw new Error(`exception parsing stream chunk ${y}. ${v}`)}}}}}finally{s.releaseLock()}})}async apiCall(e,i){return fetch(e,i).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const e={},i=Tc+" "+this.clientOptions.userAgentExtra;return e[xc]=i,e[ze]=i,e[Cc]="application/json",e}async getHeadersInternal(e,i){const n=new Headers;if(e&&e.headers){for(const[s,r]of Object.entries(e.headers))n.append(s,r);e.timeout&&e.timeout>0&&n.append(Ic,String(Math.ceil(e.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(n,i),n}getFileName(e){var i;let n="";return typeof e=="string"&&(n=e.replace(/[/\\]+$/,""),n=(i=n.split(/[/\\]/).pop())!==null&&i!==void 0?i:""),n}async uploadFile(e,i){var n;const s={};i!=null&&(s.mimeType=i.mimeType,s.name=i.name,s.displayName=i.displayName),s.name&&!s.name.startsWith("files/")&&(s.name=`files/${s.name}`);const r=this.clientOptions.uploader,l=await r.stat(e);s.sizeBytes=String(l.size);const c=(n=i==null?void 0:i.mimeType)!==null&&n!==void 0?n:l.type;if(c===void 0||c==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");s.mimeType=c;const u={file:s},d=this.getFileName(e),m=b("upload/v1beta/files",u._url),h=await this.fetchUploadUrl(m,s.sizeBytes,s.mimeType,d,u,i==null?void 0:i.httpOptions);return r.upload(e,h,this)}async uploadFileToFileSearchStore(e,i,n){var s;const r=this.clientOptions.uploader,l=await r.stat(i),c=String(l.size),u=(s=n==null?void 0:n.mimeType)!==null&&s!==void 0?s:l.type;if(u===void 0||u==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");const d=`upload/v1beta/${e}:uploadToFileSearchStore`,m=this.getFileName(i),h={};n!=null&&Sn(n,h);const p=await this.fetchUploadUrl(d,c,u,m,h,n==null?void 0:n.httpOptions);return r.uploadToFileSearchStore(i,p,this)}async downloadFile(e){await this.clientOptions.downloader.download(e,this)}async fetchUploadUrl(e,i,n,s,r,l){var c;let u={};l?u=l:u={apiVersion:"",headers:Object.assign({"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${i}`,"X-Goog-Upload-Header-Content-Type":`${n}`},s?{"X-Goog-Upload-File-Name":s}:{})};const d=await this.request({path:e,body:JSON.stringify(r),httpMethod:"POST",httpOptions:u});if(!d||!(d!=null&&d.headers))throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const m=(c=d==null?void 0:d.headers)===null||c===void 0?void 0:c["x-goog-upload-url"];if(m===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return m}}async function Ri(t){var e;if(t===void 0)throw new Error("response is undefined");if(!t.ok){const i=t.status;let n;!((e=t.headers.get("content-type"))===null||e===void 0)&&e.includes("application/json")?n=await t.json():n={error:{message:await t.text(),code:t.status,status:t.statusText}};const s=JSON.stringify(n);throw i>=400&&i<600?new me({message:s,status:i}):new Error(s)}}function kc(t,e){if(!e||Object.keys(e).length===0)return;if(t.body instanceof Blob){console.warn("includeExtraBodyToRequestInit: extraBody provided but current request body is a Blob. extraBody will be ignored as merging is not supported for Blob bodies.");return}let i={};if(typeof t.body=="string"&&t.body.length>0)try{const r=JSON.parse(t.body);if(typeof r=="object"&&r!==null&&!Array.isArray(r))i=r;else{console.warn("includeExtraBodyToRequestInit: Original request body is valid JSON but not a non-array object. Skip applying extraBody to the request body.");return}}catch{console.warn("includeExtraBodyToRequestInit: Original request body is not valid JSON. Skip applying extraBody to the request body.");return}function n(r,l){const c=Object.assign({},r);for(const u in l)if(Object.prototype.hasOwnProperty.call(l,u)){const d=l[u],m=c[u];d&&typeof d=="object"&&!Array.isArray(d)&&m&&typeof m=="object"&&!Array.isArray(m)?c[u]=n(m,d):(m&&d&&typeof m!=typeof d&&console.warn(`includeExtraBodyToRequestInit:deepMerge: Type mismatch for key "${u}". Original type: ${typeof m}, New type: ${typeof d}. Overwriting.`),c[u]=d)}return c}const s=n(i,e);t.body=JSON.stringify(s)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Mc="mcp_used/unknown";let Pc=!1;function _n(t){for(const e of t)if(Rc(e)||typeof e=="object"&&"inputSchema"in e)return!0;return Pc}function En(t){var e;const i=(e=t[ze])!==null&&e!==void 0?e:"";t[ze]=(i+` ${Mc}`).trimStart()}function Rc(t){return t!==null&&typeof t=="object"&&t instanceof at}function qc(t){return W(this,arguments,function*(i,n=100){let s,r=0;for(;r<n;){const l=yield S(i.listTools({cursor:s}));for(const c of l.tools)yield yield S(c),r++;if(!l.nextCursor)break;s=l.nextCursor}})}class at{constructor(e=[],i){this.mcpTools=[],this.functionNameToMcpClient={},this.mcpClients=e,this.config=i}static create(e,i){return new at(e,i)}async initialize(){var e,i,n,s;if(this.mcpTools.length>0)return;const r={},l=[];for(const m of this.mcpClients)try{for(var c=!0,u=(i=void 0,O(qc(m))),d;d=await u.next(),e=d.done,!e;c=!0){s=d.value,c=!1;const h=s;l.push(h);const p=h.name;if(r[p])throw new Error(`Duplicate function name ${p} found in MCP tools. Please ensure function names are unique.`);r[p]=m}}catch(h){i={error:h}}finally{try{!c&&!e&&(n=u.return)&&await n.call(u)}finally{if(i)throw i.error}}this.mcpTools=l,this.functionNameToMcpClient=r}async tool(){return await this.initialize(),ds(this.mcpTools,this.config)}async callTool(e){await this.initialize();const i=[];for(const n of e)if(n.name in this.functionNameToMcpClient){const s=this.functionNameToMcpClient[n.name];let r;this.config.timeout&&(r={timeout:this.config.timeout});const l=await s.callTool({name:n.name,arguments:n.args},void 0,r);i.push({functionResponse:{name:n.name,response:l.isError?{error:l}:l}})}return i}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */async function Dc(t,e,i){const n=new is;let s;i.data instanceof Blob?s=JSON.parse(await i.data.text()):s=JSON.parse(i.data),Object.assign(n,s),e(n)}class Nc{constructor(e,i,n){this.apiClient=e,this.auth=i,this.webSocketFactory=n}async connect(e){var i,n;if(this.apiClient.isVertexAI())throw new Error("Live music is not supported for Vertex AI.");console.warn("Live music generation is experimental and may change in future versions.");const s=this.apiClient.getWebsocketBaseUrl(),r=this.apiClient.getApiVersion(),l=Gc(this.apiClient.getDefaultHeaders()),c=this.apiClient.getApiKey(),u=`${s}/ws/google.ai.generativelanguage.${r}.GenerativeService.BidiGenerateMusic?key=${c}`;let d=()=>{};const m=new Promise(C=>{d=C}),h=e.callbacks,p=function(){d({})},g=this.apiClient,f={onopen:p,onmessage:C=>{Dc(g,h.onmessage,C)},onerror:(i=h==null?void 0:h.onerror)!==null&&i!==void 0?i:function(C){},onclose:(n=h==null?void 0:h.onclose)!==null&&n!==void 0?n:function(C){}},w=this.webSocketFactory.create(u,Hc(l),f);w.connect(),await m;const x={setup:{model:P(this.apiClient,e.model)}};return w.send(JSON.stringify(x)),new Lc(w,this.apiClient)}}class Lc{constructor(e,i){this.conn=e,this.apiClient=i}async setWeightedPrompts(e){if(!e.weightedPrompts||Object.keys(e.weightedPrompts).length===0)throw new Error("Weighted prompts must be set and contain at least one entry.");const i=rr(e);this.conn.send(JSON.stringify({clientContent:i}))}async setMusicGenerationConfig(e){e.musicGenerationConfig||(e.musicGenerationConfig={});const i=ar(e);this.conn.send(JSON.stringify(i))}sendPlaybackControl(e){const i={playbackControl:e};this.conn.send(JSON.stringify(i))}play(){this.sendPlaybackControl(te.PLAY)}pause(){this.sendPlaybackControl(te.PAUSE)}stop(){this.sendPlaybackControl(te.STOP)}resetContext(){this.sendPlaybackControl(te.RESET_CONTEXT)}close(){this.conn.close()}}function Hc(t){const e={};return t.forEach((i,n)=>{e[n]=i}),e}function Gc(t){const e=new Headers;for(const[i,n]of Object.entries(t))e.append(i,n);return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Fc="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function Bc(t,e,i){const n=new ts;let s;i.data instanceof Blob?s=await i.data.text():i.data instanceof ArrayBuffer?s=new TextDecoder().decode(i.data):s=i.data;const r=JSON.parse(s);if(t.isVertexAI()){const l=dr(r);Object.assign(n,l)}else Object.assign(n,r);e(n)}class Uc{constructor(e,i,n){this.apiClient=e,this.auth=i,this.webSocketFactory=n,this.music=new Nc(this.apiClient,this.auth,this.webSocketFactory)}async connect(e){var i,n,s,r,l,c;if(e.config&&e.config.httpOptions)throw new Error("The Live module does not support httpOptions at request-level in LiveConnectConfig yet. Please use the client-level httpOptions configuration instead.");const u=this.apiClient.getWebsocketBaseUrl(),d=this.apiClient.getApiVersion();let m;const h=this.apiClient.getHeaders();e.config&&e.config.tools&&_n(e.config.tools)&&En(h);const p=zc(h);if(this.apiClient.isVertexAI()){const T=this.apiClient.getProject(),M=this.apiClient.getLocation(),N=this.apiClient.getApiKey(),z=!!T&&!!M||!!N;this.apiClient.getCustomBaseUrl()&&!z?m=u:(m=`${u}/ws/google.cloud.aiplatform.${d}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(p,m))}else{const T=this.apiClient.getApiKey();let M="BidiGenerateContent",N="key";T!=null&&T.startsWith("auth_tokens/")&&(console.warn("Warning: Ephemeral token support is experimental and may change in future versions."),d!=="v1alpha"&&console.warn("Warning: The SDK's ephemeral token support is in v1alpha only. Please use const ai = new GoogleGenAI({apiKey: token.name, httpOptions: { apiVersion: 'v1alpha' }}); before session connection."),M="BidiGenerateContentConstrained",N="access_token"),m=`${u}/ws/google.ai.generativelanguage.${d}.GenerativeService.${M}?${N}=${T}`}let g=()=>{};const f=new Promise(T=>{g=T}),w=e.callbacks,y=function(){var T;(T=w==null?void 0:w.onopen)===null||T===void 0||T.call(w),g({})},v=this.apiClient,x={onopen:y,onmessage:T=>{Bc(v,w.onmessage,T)},onerror:(i=w==null?void 0:w.onerror)!==null&&i!==void 0?i:function(T){},onclose:(n=w==null?void 0:w.onclose)!==null&&n!==void 0?n:function(T){}},C=this.webSocketFactory.create(m,Vc(p),x);C.connect(),await f;let A=P(this.apiClient,e.model);if(this.apiClient.isVertexAI()&&A.startsWith("publishers/")){const T=this.apiClient.getProject(),M=this.apiClient.getLocation();T&&M&&(A=`projects/${T}/locations/${M}/`+A)}let _={};this.apiClient.isVertexAI()&&((s=e.config)===null||s===void 0?void 0:s.responseModalities)===void 0&&(e.config===void 0?e.config={responseModalities:[be.AUDIO]}:e.config.responseModalities=[be.AUDIO]),!((r=e.config)===null||r===void 0)&&r.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const k=(c=(l=e.config)===null||l===void 0?void 0:l.tools)!==null&&c!==void 0?c:[],E=[];for(const T of k)if(this.isCallableTool(T)){const M=T;E.push(await M.tool())}else E.push(T);E.length>0&&(e.config.tools=E);const D={model:A,config:e.config,callbacks:e.callbacks};return this.apiClient.isVertexAI()?_=sr(this.apiClient,D):_=or(this.apiClient,D),delete _.config,C.send(JSON.stringify(_)),new Oc(C,this.apiClient)}isCallableTool(e){return"callTool"in e&&typeof e.callTool=="function"}}const Wc={turnComplete:!0};class Oc{constructor(e,i){this.conn=e,this.apiClient=i}tLiveClientContent(e,i){if(i.turns!==null&&i.turns!==void 0){let n=[];try{n=B(i.turns),e.isVertexAI()||(n=n.map(s=>Se(s)))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof i.turns}'`)}return{clientContent:{turns:n,turnComplete:i.turnComplete}}}return{clientContent:{turnComplete:i.turnComplete}}}tLiveClienttToolResponse(e,i){let n=[];if(i.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(i.functionResponses)?n=i.functionResponses:n=[i.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const r of n){if(typeof r!="object"||r===null||!("name"in r)||!("response"in r))throw new Error(`Could not parse function response, type '${typeof r}'.`);if(!e.isVertexAI()&&!("id"in r))throw new Error(Fc)}return{toolResponse:{functionResponses:n}}}sendClientContent(e){e=Object.assign(Object.assign({},Wc),e);const i=this.tLiveClientContent(this.apiClient,e);this.conn.send(JSON.stringify(i))}sendRealtimeInput(e){let i={};this.apiClient.isVertexAI()?i={realtimeInput:cr(e)}:i={realtimeInput:lr(e)},this.conn.send(JSON.stringify(i))}sendToolResponse(e){if(e.functionResponses==null)throw new Error("Tool response parameters are required.");const i=this.tLiveClienttToolResponse(this.apiClient,e);this.conn.send(JSON.stringify(i))}close(){this.conn.close()}}function Vc(t){const e={};return t.forEach((i,n)=>{e[n]=i}),e}function zc(t){const e=new Headers;for(const[i,n]of Object.entries(t))e.append(i,n);return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qi=10;function Di(t){var e,i,n;if(!((e=t==null?void 0:t.automaticFunctionCalling)===null||e===void 0)&&e.disable)return!0;let s=!1;for(const l of(i=t==null?void 0:t.tools)!==null&&i!==void 0?i:[])if(oe(l)){s=!0;break}if(!s)return!0;const r=(n=t==null?void 0:t.automaticFunctionCalling)===null||n===void 0?void 0:n.maximumRemoteCalls;return r&&(r<0||!Number.isInteger(r))||r==0?(console.warn("Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:",r),!0):!1}function oe(t){return"callTool"in t&&typeof t.callTool=="function"}function Jc(t){var e,i,n;return(n=(i=(e=t.config)===null||e===void 0?void 0:e.tools)===null||i===void 0?void 0:i.some(s=>oe(s)))!==null&&n!==void 0?n:!1}function Ni(t){var e;const i=[];return!((e=t==null?void 0:t.config)===null||e===void 0)&&e.tools&&t.config.tools.forEach((n,s)=>{if(oe(n))return;const r=n;r.functionDeclarations&&r.functionDeclarations.length>0&&i.push(s)}),i}function Li(t){var e;return!(!((e=t==null?void 0:t.automaticFunctionCalling)===null||e===void 0)&&e.ignoreCallHistory)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Yc extends Z{constructor(e){super(),this.apiClient=e,this.generateContent=async i=>{var n,s,r,l,c;const u=await this.processParamsMaybeAddMcpUsage(i);if(this.maybeMoveToResponseJsonSchem(i),!Jc(i)||Di(i.config))return await this.generateContentInternal(u);const d=Ni(i);if(d.length>0){const w=d.map(y=>`tools[${y}]`).join(", ");throw new Error(`Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations is not yet supported. Incompatible tools found at ${w}.`)}let m,h;const p=B(u.contents),g=(r=(s=(n=u.config)===null||n===void 0?void 0:n.automaticFunctionCalling)===null||s===void 0?void 0:s.maximumRemoteCalls)!==null&&r!==void 0?r:qi;let f=0;for(;f<g&&(m=await this.generateContentInternal(u),!(!m.functionCalls||m.functionCalls.length===0));){const w=m.candidates[0].content,y=[];for(const v of(c=(l=i.config)===null||l===void 0?void 0:l.tools)!==null&&c!==void 0?c:[])if(oe(v)){const C=await v.callTool(m.functionCalls);y.push(...C)}f++,h={role:"user",parts:y},u.contents=B(u.contents),u.contents.push(w),u.contents.push(h),Li(u.config)&&(p.push(w),p.push(h))}return Li(u.config)&&(m.automaticFunctionCallingHistory=p),m},this.generateContentStream=async i=>{var n,s,r,l,c;if(this.maybeMoveToResponseJsonSchem(i),Di(i.config)){const h=await this.processParamsMaybeAddMcpUsage(i);return await this.generateContentStreamInternal(h)}const u=Ni(i);if(u.length>0){const h=u.map(p=>`tools[${p}]`).join(", ");throw new Error(`Incompatible tools found at ${h}. Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations" is not yet supported.`)}const d=(r=(s=(n=i==null?void 0:i.config)===null||n===void 0?void 0:n.toolConfig)===null||s===void 0?void 0:s.functionCallingConfig)===null||r===void 0?void 0:r.streamFunctionCallArguments,m=(c=(l=i==null?void 0:i.config)===null||l===void 0?void 0:l.automaticFunctionCalling)===null||c===void 0?void 0:c.disable;if(d&&!m)throw new Error("Running in streaming mode with 'streamFunctionCallArguments' enabled, this feature is not compatible with automatic function calling (AFC). Please set 'config.automaticFunctionCalling.disable' to true to disable AFC or leave 'config.toolConfig.functionCallingConfig.streamFunctionCallArguments' to be undefined or set to false to disable streaming function call arguments feature.");return await this.processAfcStream(i)},this.generateImages=async i=>await this.generateImagesInternal(i).then(n=>{var s;let r;const l=[];if(n!=null&&n.generatedImages)for(const u of n.generatedImages)u&&(u!=null&&u.safetyAttributes)&&((s=u==null?void 0:u.safetyAttributes)===null||s===void 0?void 0:s.contentType)==="Positive Prompt"?r=u==null?void 0:u.safetyAttributes:l.push(u);let c;return r?c={generatedImages:l,positivePromptSafetyAttributes:r,sdkHttpResponse:n.sdkHttpResponse}:c={generatedImages:l,sdkHttpResponse:n.sdkHttpResponse},c}),this.list=async i=>{var n;const l={config:Object.assign(Object.assign({},{queryBase:!0}),i==null?void 0:i.config)};if(this.apiClient.isVertexAI()&&!l.config.queryBase){if(!((n=l.config)===null||n===void 0)&&n.filter)throw new Error("Filtering tuned models list for Vertex AI is not currently supported");l.config.filter="labels.tune-type:*"}return new j(K.PAGED_ITEM_MODELS,c=>this.listInternal(c),await this.listInternal(l),l)},this.editImage=async i=>{const n={model:i.model,prompt:i.prompt,referenceImages:[],config:i.config};return i.referenceImages&&i.referenceImages&&(n.referenceImages=i.referenceImages.map(s=>s.toReferenceImageAPI())),await this.editImageInternal(n)},this.upscaleImage=async i=>{let n={numberOfImages:1,mode:"upscale"};i.config&&(n=Object.assign(Object.assign({},n),i.config));const s={model:i.model,image:i.image,upscaleFactor:i.upscaleFactor,config:n};return await this.upscaleImageInternal(s)},this.generateVideos=async i=>{var n,s,r,l,c,u;if((i.prompt||i.image||i.video)&&i.source)throw new Error("Source and prompt/image/video are mutually exclusive. Please only use source.");return this.apiClient.isVertexAI()||(!((n=i.video)===null||n===void 0)&&n.uri&&(!((s=i.video)===null||s===void 0)&&s.videoBytes)?i.video={uri:i.video.uri,mimeType:i.video.mimeType}:!((l=(r=i.source)===null||r===void 0?void 0:r.video)===null||l===void 0)&&l.uri&&(!((u=(c=i.source)===null||c===void 0?void 0:c.video)===null||u===void 0)&&u.videoBytes)&&(i.source.video={uri:i.source.video.uri,mimeType:i.source.video.mimeType})),await this.generateVideosInternal(i)}}maybeMoveToResponseJsonSchem(e){e.config&&e.config.responseSchema&&(e.config.responseJsonSchema||Object.keys(e.config.responseSchema).includes("$schema")&&(e.config.responseJsonSchema=e.config.responseSchema,delete e.config.responseSchema))}async processParamsMaybeAddMcpUsage(e){var i,n,s;const r=(i=e.config)===null||i===void 0?void 0:i.tools;if(!r)return e;const l=await Promise.all(r.map(async u=>oe(u)?await u.tool():u)),c={model:e.model,contents:e.contents,config:Object.assign(Object.assign({},e.config),{tools:l})};if(c.config.tools=l,e.config&&e.config.tools&&_n(e.config.tools)){const u=(s=(n=e.config.httpOptions)===null||n===void 0?void 0:n.headers)!==null&&s!==void 0?s:{};let d=Object.assign({},u);Object.keys(d).length===0&&(d=this.apiClient.getDefaultHeaders()),En(d),c.config.httpOptions=Object.assign(Object.assign({},e.config.httpOptions),{headers:d})}return c}async initAfcToolsMap(e){var i,n,s;const r=new Map;for(const l of(n=(i=e.config)===null||i===void 0?void 0:i.tools)!==null&&n!==void 0?n:[])if(oe(l)){const c=l,u=await c.tool();for(const d of(s=u.functionDeclarations)!==null&&s!==void 0?s:[]){if(!d.name)throw new Error("Function declaration name is required.");if(r.has(d.name))throw new Error(`Duplicate tool declaration name: ${d.name}`);r.set(d.name,c)}}return r}async processAfcStream(e){var i,n,s;const r=(s=(n=(i=e.config)===null||i===void 0?void 0:i.automaticFunctionCalling)===null||n===void 0?void 0:n.maximumRemoteCalls)!==null&&s!==void 0?s:qi;let l=!1,c=0;const u=await this.initAfcToolsMap(e);return(function(d,m,h){return W(this,arguments,function*(){for(var p,g,f,w,y,v;c<r;){l&&(c++,l=!1);const _=yield S(d.processParamsMaybeAddMcpUsage(h)),k=yield S(d.generateContentStreamInternal(_)),E=[],D=[];try{for(var x=!0,C=(g=void 0,O(k)),A;A=yield S(C.next()),p=A.done,!p;x=!0){w=A.value,x=!1;const T=w;if(yield yield S(T),T.candidates&&(!((y=T.candidates[0])===null||y===void 0)&&y.content)){D.push(T.candidates[0].content);for(const M of(v=T.candidates[0].content.parts)!==null&&v!==void 0?v:[])if(c<r&&M.functionCall){if(!M.functionCall.name)throw new Error("Function call name was not returned by the model.");if(m.has(M.functionCall.name)){const N=yield S(m.get(M.functionCall.name).callTool([M.functionCall]));E.push(...N)}else throw new Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${m.keys()}, mising tool: ${M.functionCall.name}`)}}}}catch(T){g={error:T}}finally{try{!x&&!p&&(f=C.return)&&(yield S(f.call(C)))}finally{if(g)throw g.error}}if(E.length>0){l=!0;const T=new le;T.candidates=[{content:{role:"user",parts:E}}],yield yield S(T);const M=[];M.push(...D),M.push({role:"user",parts:E});const N=B(h.contents).concat(M);h.contents=N}else break}})})(this,u,e)}async generateContentInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=ki(this.apiClient,e);return c=b("{model}:generateContent",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Pi(m),p=new le;return Object.assign(p,h),p})}else{const d=Ei(this.apiClient,e);return c=b("{model}:generateContent",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Mi(m),p=new le;return Object.assign(p,h),p})}}async generateContentStreamInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=ki(this.apiClient,e);return c=b("{model}:streamGenerateContent?alt=sse",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.requestStream({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}),l.then(function(h){return W(this,arguments,function*(){var p,g,f,w;try{for(var y=!0,v=O(h),x;x=yield S(v.next()),p=x.done,!p;y=!0){w=x.value,y=!1;const C=w,A=Pi(yield S(C.json()));A.sdkHttpResponse={headers:C.headers};const _=new le;Object.assign(_,A),yield yield S(_)}}catch(C){g={error:C}}finally{try{!y&&!p&&(f=v.return)&&(yield S(f.call(v)))}finally{if(g)throw g.error}}})})}else{const d=Ei(this.apiClient,e);return c=b("{model}:streamGenerateContent?alt=sse",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.requestStream({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}),l.then(function(h){return W(this,arguments,function*(){var p,g,f,w;try{for(var y=!0,v=O(h),x;x=yield S(v.next()),p=x.done,!p;y=!0){w=x.value,y=!1;const C=w,A=Mi(yield S(C.json()));A.sdkHttpResponse={headers:C.headers};const _=new le;Object.assign(_,A),yield yield S(_)}}catch(C){g={error:C}}finally{try{!y&&!p&&(f=v.return)&&(yield S(f.call(v)))}finally{if(g)throw g.error}}})})}}async embedContent(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Ur(this.apiClient,e);return c=b("{model}:predict",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Or(m),p=new ui;return Object.assign(p,h),p})}else{const d=Br(this.apiClient,e);return c=b("{model}:batchEmbedContents",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Wr(m),p=new ui;return Object.assign(p,h),p})}}async generateImagesInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=el(this.apiClient,e);return c=b("{model}:predict",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=il(m),p=new mi;return Object.assign(p,h),p})}else{const d=jr(this.apiClient,e);return c=b("{model}:predict",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=tl(m),p=new mi;return Object.assign(p,h),p})}}async editImageInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=Lr(this.apiClient,e);return r=b("{model}:predict",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>{const d=Hr(u),m=new Vo;return Object.assign(m,d),m})}else throw new Error("This method is only supported by the Vertex AI.")}async upscaleImageInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=ec(this.apiClient,e);return r=b("{model}:predict",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>{const d=tc(u),m=new zo;return Object.assign(m,d),m})}else throw new Error("This method is only supported by the Vertex AI.")}async recontextImage(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=Nl(this.apiClient,e);return r=b("{model}:predict",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=Ll(u),m=new Jo;return Object.assign(m,d),m})}else throw new Error("This method is only supported by the Vertex AI.")}async segmentImage(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=Wl(this.apiClient,e);return r=b("{model}:predict",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=Ol(u),m=new Yo;return Object.assign(m,d),m})}else throw new Error("This method is only supported by the Vertex AI.")}async get(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=vl(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>Ve(m))}else{const d=wl(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>Oe(m))}}async listInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=El(this.apiClient,e);return c=b("{models_url}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Ml(m),p=new hi;return Object.assign(p,h),p})}else{const d=_l(this.apiClient,e);return c=b("{models_url}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=kl(m),p=new hi;return Object.assign(p,h),p})}}async update(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Xl(this.apiClient,e);return c=b("{model}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>Ve(m))}else{const d=Ql(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>Oe(m))}}async delete(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Rr(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Dr(m),p=new pi;return Object.assign(p,h),p})}else{const d=Pr(this.apiClient,e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=qr(m),p=new pi;return Object.assign(p,h),p})}}async countTokens(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Er(this.apiClient,e);return c=b("{model}:countTokens",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=Mr(m),p=new gi;return Object.assign(p,h),p})}else{const d=_r(this.apiClient,e);return c=b("{model}:countTokens",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=kr(m),p=new gi;return Object.assign(p,h),p})}}async computeTokens(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=br(this.apiClient,e);return r=b("{model}:computeTokens",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>{const d=Cr(u),m=new Ko;return Object.assign(m,d),m})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideosInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=ll(this.apiClient,e);return c=b("{model}:predictLongRunning",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l.then(m=>{const h=al(m),p=new Ce;return Object.assign(p,h),p})}else{const d=rl(this.apiClient,e);return c=b("{model}:predictLongRunning",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l.then(m=>{const h=sl(m),p=new Ce;return Object.assign(p,h),p})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Kc extends Z{constructor(e){super(),this.apiClient=e}async getVideosOperation(e){const i=e.operation,n=e.config;if(i.name===void 0||i.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const s=i.name.split("/operations/")[0];let r;n&&"httpOptions"in n&&(r=n.httpOptions);const l=await this.fetchPredictVideosOperationInternal({operationName:i.name,resourceName:s,config:{httpOptions:r}});return i._fromAPIResponse({apiResponse:l,_isVertexAI:!0})}else{const s=await this.getVideosOperationInternal({operationName:i.name,config:n});return i._fromAPIResponse({apiResponse:s,_isVertexAI:!1})}}async get(e){const i=e.operation,n=e.config;if(i.name===void 0||i.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const s=i.name.split("/operations/")[0];let r;n&&"httpOptions"in n&&(r=n.httpOptions);const l=await this.fetchPredictVideosOperationInternal({operationName:i.name,resourceName:s,config:{httpOptions:r}});return i._fromAPIResponse({apiResponse:l,_isVertexAI:!0})}else{const s=await this.getVideosOperationInternal({operationName:i.name,config:n});return i._fromAPIResponse({apiResponse:s,_isVertexAI:!1})}}async getVideosOperationInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Go(e);return c=b("{operationName}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json()),l}else{const d=Ho(e);return c=b("{operationName}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json()),l}}async fetchPredictVideosOperationInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=Mo(e);return r=b("{resourceName}:fetchPredictOperation",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Zc(t){const e={},i=o(t,["data"]);if(i!=null&&a(e,["data"],i),o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function $c(t){const e={},i=o(t,["parts"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(r=>sd(r))),a(e,["parts"],s)}const n=o(t,["role"]);return n!=null&&a(e,["role"],n),e}function Qc(t,e,i){const n={},s=o(e,["expireTime"]);i!==void 0&&s!=null&&a(i,["expireTime"],s);const r=o(e,["newSessionExpireTime"]);i!==void 0&&r!=null&&a(i,["newSessionExpireTime"],r);const l=o(e,["uses"]);i!==void 0&&l!=null&&a(i,["uses"],l);const c=o(e,["liveConnectConstraints"]);i!==void 0&&c!=null&&a(i,["bidiGenerateContentSetup"],od(t,c));const u=o(e,["lockAdditionalFields"]);return i!==void 0&&u!=null&&a(i,["fieldMask"],u),n}function Xc(t,e){const i={},n=o(e,["config"]);return n!=null&&a(i,["config"],Qc(t,n,i)),i}function jc(t){const e={};if(o(t,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const i=o(t,["fileUri"]);i!=null&&a(e,["fileUri"],i);const n=o(t,["mimeType"]);return n!=null&&a(e,["mimeType"],n),e}function ed(t){const e={},i=o(t,["id"]);i!=null&&a(e,["id"],i);const n=o(t,["args"]);n!=null&&a(e,["args"],n);const s=o(t,["name"]);if(s!=null&&a(e,["name"],s),o(t,["partialArgs"])!==void 0)throw new Error("partialArgs parameter is not supported in Gemini API.");if(o(t,["willContinue"])!==void 0)throw new Error("willContinue parameter is not supported in Gemini API.");return e}function td(t){const e={};if(o(t,["authConfig"])!==void 0)throw new Error("authConfig parameter is not supported in Gemini API.");const i=o(t,["enableWidget"]);return i!=null&&a(e,["enableWidget"],i),e}function id(t){const e={};if(o(t,["excludeDomains"])!==void 0)throw new Error("excludeDomains parameter is not supported in Gemini API.");if(o(t,["blockingConfidence"])!==void 0)throw new Error("blockingConfidence parameter is not supported in Gemini API.");const i=o(t,["timeRangeFilter"]);return i!=null&&a(e,["timeRangeFilter"],i),e}function nd(t,e){const i={},n=o(t,["generationConfig"]);e!==void 0&&n!=null&&a(e,["setup","generationConfig"],n);const s=o(t,["responseModalities"]);e!==void 0&&s!=null&&a(e,["setup","generationConfig","responseModalities"],s);const r=o(t,["temperature"]);e!==void 0&&r!=null&&a(e,["setup","generationConfig","temperature"],r);const l=o(t,["topP"]);e!==void 0&&l!=null&&a(e,["setup","generationConfig","topP"],l);const c=o(t,["topK"]);e!==void 0&&c!=null&&a(e,["setup","generationConfig","topK"],c);const u=o(t,["maxOutputTokens"]);e!==void 0&&u!=null&&a(e,["setup","generationConfig","maxOutputTokens"],u);const d=o(t,["mediaResolution"]);e!==void 0&&d!=null&&a(e,["setup","generationConfig","mediaResolution"],d);const m=o(t,["seed"]);e!==void 0&&m!=null&&a(e,["setup","generationConfig","seed"],m);const h=o(t,["speechConfig"]);e!==void 0&&h!=null&&a(e,["setup","generationConfig","speechConfig"],st(h));const p=o(t,["thinkingConfig"]);e!==void 0&&p!=null&&a(e,["setup","generationConfig","thinkingConfig"],p);const g=o(t,["enableAffectiveDialog"]);e!==void 0&&g!=null&&a(e,["setup","generationConfig","enableAffectiveDialog"],g);const f=o(t,["systemInstruction"]);e!==void 0&&f!=null&&a(e,["setup","systemInstruction"],$c(H(f)));const w=o(t,["tools"]);if(e!==void 0&&w!=null){let k=ae(w);Array.isArray(k)&&(k=k.map(E=>rd(se(E)))),a(e,["setup","tools"],k)}const y=o(t,["sessionResumption"]);e!==void 0&&y!=null&&a(e,["setup","sessionResumption"],ad(y));const v=o(t,["inputAudioTranscription"]);e!==void 0&&v!=null&&a(e,["setup","inputAudioTranscription"],v);const x=o(t,["outputAudioTranscription"]);e!==void 0&&x!=null&&a(e,["setup","outputAudioTranscription"],x);const C=o(t,["realtimeInputConfig"]);e!==void 0&&C!=null&&a(e,["setup","realtimeInputConfig"],C);const A=o(t,["contextWindowCompression"]);e!==void 0&&A!=null&&a(e,["setup","contextWindowCompression"],A);const _=o(t,["proactivity"]);if(e!==void 0&&_!=null&&a(e,["setup","proactivity"],_),o(t,["explicitVadSignal"])!==void 0)throw new Error("explicitVadSignal parameter is not supported in Gemini API.");return i}function od(t,e){const i={},n=o(e,["model"]);n!=null&&a(i,["setup","model"],P(t,n));const s=o(e,["config"]);return s!=null&&a(i,["config"],nd(s,i)),i}function sd(t){const e={},i=o(t,["mediaResolution"]);i!=null&&a(e,["mediaResolution"],i);const n=o(t,["codeExecutionResult"]);n!=null&&a(e,["codeExecutionResult"],n);const s=o(t,["executableCode"]);s!=null&&a(e,["executableCode"],s);const r=o(t,["fileData"]);r!=null&&a(e,["fileData"],jc(r));const l=o(t,["functionCall"]);l!=null&&a(e,["functionCall"],ed(l));const c=o(t,["functionResponse"]);c!=null&&a(e,["functionResponse"],c);const u=o(t,["inlineData"]);u!=null&&a(e,["inlineData"],Zc(u));const d=o(t,["text"]);d!=null&&a(e,["text"],d);const m=o(t,["thought"]);m!=null&&a(e,["thought"],m);const h=o(t,["thoughtSignature"]);h!=null&&a(e,["thoughtSignature"],h);const p=o(t,["videoMetadata"]);return p!=null&&a(e,["videoMetadata"],p),e}function ad(t){const e={},i=o(t,["handle"]);if(i!=null&&a(e,["handle"],i),o(t,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return e}function rd(t){const e={};if(o(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=o(t,["computerUse"]);i!=null&&a(e,["computerUse"],i);const n=o(t,["fileSearch"]);n!=null&&a(e,["fileSearch"],n);const s=o(t,["codeExecution"]);if(s!=null&&a(e,["codeExecution"],s),o(t,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");const r=o(t,["functionDeclarations"]);if(r!=null){let m=r;Array.isArray(m)&&(m=m.map(h=>h)),a(e,["functionDeclarations"],m)}const l=o(t,["googleMaps"]);l!=null&&a(e,["googleMaps"],td(l));const c=o(t,["googleSearch"]);c!=null&&a(e,["googleSearch"],id(c));const u=o(t,["googleSearchRetrieval"]);u!=null&&a(e,["googleSearchRetrieval"],u);const d=o(t,["urlContext"]);return d!=null&&a(e,["urlContext"],d),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ld(t){const e=[];for(const i in t)if(Object.prototype.hasOwnProperty.call(t,i)){const n=t[i];if(typeof n=="object"&&n!=null&&Object.keys(n).length>0){const s=Object.keys(n).map(r=>`${i}.${r}`);e.push(...s)}else e.push(i)}return e.join(",")}function cd(t,e){let i=null;const n=t.bidiGenerateContentSetup;if(typeof n=="object"&&n!==null&&"setup"in n){const r=n.setup;typeof r=="object"&&r!==null?(t.bidiGenerateContentSetup=r,i=r):delete t.bidiGenerateContentSetup}else n!==void 0&&delete t.bidiGenerateContentSetup;const s=t.fieldMask;if(i){const r=ld(i);if(Array.isArray(e==null?void 0:e.lockAdditionalFields)&&(e==null?void 0:e.lockAdditionalFields.length)===0)r?t.fieldMask=r:delete t.fieldMask;else if(e!=null&&e.lockAdditionalFields&&e.lockAdditionalFields.length>0&&s!==null&&Array.isArray(s)&&s.length>0){const l=["temperature","topK","topP","maxOutputTokens","responseModalities","seed","speechConfig"];let c=[];s.length>0&&(c=s.map(d=>l.includes(d)?`generationConfig.${d}`:d));const u=[];r&&u.push(r),c.length>0&&u.push(...c),u.length>0?t.fieldMask=u.join(","):delete t.fieldMask}else delete t.fieldMask}else s!==null&&Array.isArray(s)&&s.length>0?t.fieldMask=s.join(","):delete t.fieldMask;return t}class dd extends Z{constructor(e){super(),this.apiClient=e}async create(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("The client.tokens.create method is only supported by the Gemini Developer API.");{const c=Xc(this.apiClient,e);r=b("auth_tokens",c._url),l=c._query,delete c.config,delete c._url,delete c._query;const u=cd(c,e.config);return s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),s.then(d=>d)}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ud(t,e){const i={},n=o(t,["force"]);return e!==void 0&&n!=null&&a(e,["_query","force"],n),i}function md(t){const e={},i=o(t,["name"]);i!=null&&a(e,["_url","name"],i);const n=o(t,["config"]);return n!=null&&ud(n,e),e}function hd(t){const e={},i=o(t,["name"]);return i!=null&&a(e,["_url","name"],i),e}function pd(t,e){const i={},n=o(t,["pageSize"]);e!==void 0&&n!=null&&a(e,["_query","pageSize"],n);const s=o(t,["pageToken"]);return e!==void 0&&s!=null&&a(e,["_query","pageToken"],s),i}function gd(t){const e={},i=o(t,["parent"]);i!=null&&a(e,["_url","parent"],i);const n=o(t,["config"]);return n!=null&&pd(n,e),e}function fd(t){const e={},i=o(t,["sdkHttpResponse"]);i!=null&&a(e,["sdkHttpResponse"],i);const n=o(t,["nextPageToken"]);n!=null&&a(e,["nextPageToken"],n);const s=o(t,["documents"]);if(s!=null){let r=s;Array.isArray(r)&&(r=r.map(l=>l)),a(e,["documents"],r)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class yd extends Z{constructor(e){super(),this.apiClient=e,this.list=async i=>new j(K.PAGED_ITEM_DOCUMENTS,n=>this.listInternal({parent:i.parent,config:n.config}),await this.listInternal(i),i)}async get(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=hd(e);return r=b("{name}",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>u)}}async delete(e){var i,n;let s="",r={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const l=md(e);s=b("{name}",l._url),r=l._query,delete l._url,delete l._query,await this.apiClient.request({path:s,queryParams:r,body:JSON.stringify(l),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal})}}async listInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=gd(e);return r=b("{parent}/documents",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=fd(u),m=new Zo;return Object.assign(m,d),m})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class wd extends Z{constructor(e,i=new yd(e)){super(),this.apiClient=e,this.documents=i,this.list=async(n={})=>new j(K.PAGED_ITEM_FILE_SEARCH_STORES,s=>this.listInternal(s),await this.listInternal(n),n)}async uploadToFileSearchStore(e){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files to a file search store.");return this.apiClient.uploadFileToFileSearchStore(e.fileSearchStoreName,e.file,e.config)}async create(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=lc(e);return r=b("fileSearchStores",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>u)}}async get(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=uc(e);return r=b("{name}",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>u)}}async delete(e){var i,n;let s="",r={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const l=dc(e);s=b("{name}",l._url),r=l._query,delete l._url,delete l._query,await this.apiClient.request({path:s,queryParams:r,body:JSON.stringify(l),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal})}}async listInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=yc(e);return r=b("fileSearchStores",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=wc(u),m=new $o;return Object.assign(m,d),m})}}async uploadToFileSearchStoreInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=vc(e);return r=b("upload/v1beta/{file_search_store_name}:uploadToFileSearchStore",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=bc(u),m=new Qo;return Object.assign(m,d),m})}}async importFile(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=pc(e);return r=b("{file_search_store_name}:importFile",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),s.then(u=>{const d=hc(u),m=new et;return Object.assign(m,d),m})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let kn=function(){const{crypto:t}=globalThis;if(t!=null&&t.randomUUID)return kn=t.randomUUID.bind(t),t.randomUUID();const e=new Uint8Array(1),i=t?()=>t.getRandomValues(e)[0]:()=>Math.random()*255&255;return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,n=>(+n^i()&15>>+n/4).toString(16))};const vd=()=>kn();/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Je(t){return typeof t=="object"&&t!==null&&("name"in t&&t.name==="AbortError"||"message"in t&&String(t.message).includes("FetchRequestCanceledException"))}const Ye=t=>{if(t instanceof Error)return t;if(typeof t=="object"&&t!==null){try{if(Object.prototype.toString.call(t)==="[object Error]"){const e=new Error(t.message,t.cause?{cause:t.cause}:{});return t.stack&&(e.stack=t.stack),t.cause&&!e.cause&&(e.cause=t.cause),t.name&&(e.name=t.name),e}}catch{}try{return new Error(JSON.stringify(t))}catch{}}return new Error(t)};/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class U extends Error{}class F extends U{constructor(e,i,n,s){super(`${F.makeMessage(e,i,n)}`),this.status=e,this.headers=s,this.error=i}static makeMessage(e,i,n){const s=i!=null&&i.message?typeof i.message=="string"?i.message:JSON.stringify(i.message):i?JSON.stringify(i):n;return e&&s?`${e} ${s}`:e?`${e} status code (no body)`:s||"(no status code or body)"}static generate(e,i,n,s){if(!e||!s)return new ke({message:n,cause:Ye(i)});const r=i;return e===400?new Pn(e,r,n,s):e===401?new Rn(e,r,n,s):e===403?new qn(e,r,n,s):e===404?new Dn(e,r,n,s):e===409?new Nn(e,r,n,s):e===422?new Ln(e,r,n,s):e===429?new Hn(e,r,n,s):e>=500?new Gn(e,r,n,s):new F(e,r,n,s)}}class Ke extends F{constructor({message:e}={}){super(void 0,void 0,e||"Request was aborted.",void 0)}}class ke extends F{constructor({message:e,cause:i}){super(void 0,void 0,e||"Connection error.",void 0),i&&(this.cause=i)}}class Mn extends ke{constructor({message:e}={}){super({message:e??"Request timed out."})}}class Pn extends F{}class Rn extends F{}class qn extends F{}class Dn extends F{}class Nn extends F{}class Ln extends F{}class Hn extends F{}class Gn extends F{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bd=/^[a-z][a-z0-9+.-]*:/i,Cd=t=>bd.test(t);let Ze=t=>(Ze=Array.isArray,Ze(t));const Id=Ze;let xd=Id;const Hi=xd;function Ad(t){if(!t)return!0;for(const e in t)return!1;return!0}function Td(t,e){return Object.prototype.hasOwnProperty.call(t,e)}const Sd=(t,e)=>{if(typeof e!="number"||!Number.isInteger(e))throw new U(`${t} must be an integer`);if(e<0)throw new U(`${t} must be a positive integer`);return e},_d=t=>{try{return JSON.parse(t)}catch{return}};/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ed=t=>new Promise(e=>setTimeout(e,t));/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ee="0.0.1";/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function kd(){return typeof Deno<"u"&&Deno.build!=null?"deno":typeof EdgeRuntime<"u"?"edge":Object.prototype.toString.call(typeof globalThis.process<"u"?globalThis.process:0)==="[object process]"?"node":"unknown"}const Md=()=>{var t,e,i,n,s;const r=kd();if(r==="deno")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":ee,"X-Stainless-OS":Fi(Deno.build.os),"X-Stainless-Arch":Gi(Deno.build.arch),"X-Stainless-Runtime":"deno","X-Stainless-Runtime-Version":typeof Deno.version=="string"?Deno.version:(e=(t=Deno.version)===null||t===void 0?void 0:t.deno)!==null&&e!==void 0?e:"unknown"};if(typeof EdgeRuntime<"u")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":ee,"X-Stainless-OS":"Unknown","X-Stainless-Arch":`other:${EdgeRuntime}`,"X-Stainless-Runtime":"edge","X-Stainless-Runtime-Version":globalThis.process.version};if(r==="node")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":ee,"X-Stainless-OS":Fi((i=globalThis.process.platform)!==null&&i!==void 0?i:"unknown"),"X-Stainless-Arch":Gi((n=globalThis.process.arch)!==null&&n!==void 0?n:"unknown"),"X-Stainless-Runtime":"node","X-Stainless-Runtime-Version":(s=globalThis.process.version)!==null&&s!==void 0?s:"unknown"};const l=Pd();return l?{"X-Stainless-Lang":"js","X-Stainless-Package-Version":ee,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":`browser:${l.browser}`,"X-Stainless-Runtime-Version":l.version}:{"X-Stainless-Lang":"js","X-Stainless-Package-Version":ee,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":"unknown","X-Stainless-Runtime-Version":"unknown"}};function Pd(){if(typeof navigator>"u"||!navigator)return null;const t=[{key:"edge",pattern:/Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"chrome",pattern:/Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"firefox",pattern:/Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"safari",pattern:/(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/}];for(const{key:e,pattern:i}of t){const n=i.exec(navigator.userAgent);if(n){const s=n[1]||0,r=n[2]||0,l=n[3]||0;return{browser:e,version:`${s}.${r}.${l}`}}}return null}const Gi=t=>t==="x32"?"x32":t==="x86_64"||t==="x64"?"x64":t==="arm"?"arm":t==="aarch64"||t==="arm64"?"arm64":t?`other:${t}`:"unknown",Fi=t=>(t=t.toLowerCase(),t.includes("ios")?"iOS":t==="android"?"Android":t==="darwin"?"MacOS":t==="win32"?"Windows":t==="freebsd"?"FreeBSD":t==="openbsd"?"OpenBSD":t==="linux"?"Linux":t?`Other:${t}`:"Unknown");let he;const Rd=()=>he??(he=Md());/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function qd(){if(typeof fetch<"u")return fetch;throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new GeminiNextGenAPIClient({ fetch })` or polyfill the global, `globalThis.fetch = fetch`")}function Fn(...t){const e=globalThis.ReadableStream;if(typeof e>"u")throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");return new e(...t)}function Dd(t){let e=Symbol.asyncIterator in t?t[Symbol.asyncIterator]():t[Symbol.iterator]();return Fn({start(){},async pull(i){const{done:n,value:s}=await e.next();n?i.close():i.enqueue(s)},async cancel(){var i;await((i=e.return)===null||i===void 0?void 0:i.call(e))}})}function Bn(t){if(t[Symbol.asyncIterator])return t;const e=t.getReader();return{async next(){try{const i=await e.read();return i!=null&&i.done&&e.releaseLock(),i}catch(i){throw e.releaseLock(),i}},async return(){const i=e.cancel();return e.releaseLock(),await i,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}async function Nd(t){var e,i;if(t===null||typeof t!="object")return;if(t[Symbol.asyncIterator]){await((i=(e=t[Symbol.asyncIterator]()).return)===null||i===void 0?void 0:i.call(e));return}const n=t.getReader(),s=n.cancel();n.releaseLock(),await s}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ld=({headers:t,body:e})=>({bodyHeaders:{"content-type":"application/json"},body:JSON.stringify(e)});/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Un=()=>{var t;if(typeof File>"u"){const{process:e}=globalThis,i=typeof((t=e==null?void 0:e.versions)===null||t===void 0?void 0:t.node)=="string"&&parseInt(e.versions.node.split("."))<20;throw new Error("`File` is not defined as a global, which is required for file uploads."+(i?" Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`.":""))}};function qe(t,e,i){return Un(),new File(t,e??"unknown_file",i)}function Hd(t){return(typeof t=="object"&&t!==null&&("name"in t&&t.name&&String(t.name)||"url"in t&&t.url&&String(t.url)||"filename"in t&&t.filename&&String(t.filename)||"path"in t&&t.path&&String(t.path))||"").split(/[\\/]/).pop()||void 0}const Gd=t=>t!=null&&typeof t=="object"&&typeof t[Symbol.asyncIterator]=="function";/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wn=t=>t!=null&&typeof t=="object"&&typeof t.size=="number"&&typeof t.type=="string"&&typeof t.text=="function"&&typeof t.slice=="function"&&typeof t.arrayBuffer=="function",Fd=t=>t!=null&&typeof t=="object"&&typeof t.name=="string"&&typeof t.lastModified=="number"&&Wn(t),Bd=t=>t!=null&&typeof t=="object"&&typeof t.url=="string"&&typeof t.blob=="function";async function Ud(t,e,i){if(Un(),t=await t,Fd(t))return t instanceof File?t:qe([await t.arrayBuffer()],t.name);if(Bd(t)){const s=await t.blob();return e||(e=new URL(t.url).pathname.split(/[\\/]/).pop()),qe(await $e(s),e,i)}const n=await $e(t);if(e||(e=Hd(t)),!(i!=null&&i.type)){const s=n.find(r=>typeof r=="object"&&"type"in r&&r.type);typeof s=="string"&&(i=Object.assign(Object.assign({},i),{type:s}))}return qe(n,e,i)}async function $e(t){var e,i,n,s,r;let l=[];if(typeof t=="string"||ArrayBuffer.isView(t)||t instanceof ArrayBuffer)l.push(t);else if(Wn(t))l.push(t instanceof Blob?t:await t.arrayBuffer());else if(Gd(t))try{for(var c=!0,u=O(t),d;d=await u.next(),e=d.done,!e;c=!0){s=d.value,c=!1;const m=s;l.push(...await $e(m))}}catch(m){i={error:m}}finally{try{!c&&!e&&(n=u.return)&&await n.call(u)}finally{if(i)throw i.error}}else{const m=(r=t==null?void 0:t.constructor)===null||r===void 0?void 0:r.name;throw new Error(`Unexpected data type: ${typeof t}${m?`; constructor: ${m}`:""}${Wd(t)}`)}return l}function Wd(t){return typeof t!="object"||t===null?"":`; props: [${Object.getOwnPropertyNames(t).map(i=>`"${i}"`).join(", ")}]`}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class On{constructor(e){this._client=e}}On._key=[];/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Vn(t){return t.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g,encodeURIComponent)}const Bi=Object.freeze(Object.create(null)),Od=(t=Vn)=>(function(i,...n){if(i.length===1)return i[0];let s=!1;const r=[],l=i.reduce((m,h,p)=>{var g,f,w;/[?#]/.test(h)&&(s=!0);const y=n[p];let v=(s?encodeURIComponent:t)(""+y);return p!==n.length&&(y==null||typeof y=="object"&&y.toString===((w=Object.getPrototypeOf((f=Object.getPrototypeOf((g=y.hasOwnProperty)!==null&&g!==void 0?g:Bi))!==null&&f!==void 0?f:Bi))===null||w===void 0?void 0:w.toString))&&(v=y+"",r.push({start:m.length+h.length,length:v.length,error:`Value of type ${Object.prototype.toString.call(y).slice(8,-1)} is not a valid path parameter`})),m+h+(p===n.length?"":v)},""),c=l.split(/[?#]/,1)[0],u=new RegExp("(?<=^|\\/)(?:\\.|%2e){1,2}(?=\\/|$)","gi");let d;for(;(d=u.exec(c))!==null;)r.push({start:d.index,length:d[0].length,error:`Value "${d[0]}" can't be safely passed as a path parameter`});if(r.sort((m,h)=>m.start-h.start),r.length>0){let m=0;const h=r.reduce((p,g)=>{const f=" ".repeat(g.start-m),w="^".repeat(g.length);return m=g.start+g.length,p+f+w},"");throw new U(`Path parameters result in path with invalid segments:
${r.map(p=>p.error).join(`
`)}
${l}
${h}`)}return l}),pe=Od(Vn);/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class zn extends On{create(e,i){var n;const{api_version:s=this._client.apiVersion}=e,r=xe(e,["api_version"]);if("model"in r&&"agent_config"in r)throw new U("Invalid request: specified `model` and `agent_config`. If specifying `model`, use `generation_config`.");if("agent"in r&&"generation_config"in r)throw new U("Invalid request: specified `agent` and `generation_config`. If specifying `agent`, use `agent_config`.");return this._client.post(pe`/${s}/interactions`,Object.assign(Object.assign({body:r},i),{stream:(n=e.stream)!==null&&n!==void 0?n:!1}))}delete(e,i={},n){const{api_version:s=this._client.apiVersion}=i??{};return this._client.delete(pe`/${s}/interactions/${e}`,n)}cancel(e,i={},n){const{api_version:s=this._client.apiVersion}=i??{};return this._client.post(pe`/${s}/interactions/${e}/cancel`,n)}get(e,i={},n){var s;const r=i??{},{api_version:l=this._client.apiVersion}=r,c=xe(r,["api_version"]);return this._client.get(pe`/${l}/interactions/${e}`,Object.assign(Object.assign({query:c},n),{stream:(s=i==null?void 0:i.stream)!==null&&s!==void 0?s:!1}))}}zn._key=Object.freeze(["interactions"]);class Jn extends zn{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Vd(t){let e=0;for(const s of t)e+=s.length;const i=new Uint8Array(e);let n=0;for(const s of t)i.set(s,n),n+=s.length;return i}let ge;function rt(t){let e;return(ge??(e=new globalThis.TextEncoder,ge=e.encode.bind(e)))(t)}let fe;function Ui(t){let e;return(fe??(e=new globalThis.TextDecoder,fe=e.decode.bind(e)))(t)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Me{constructor(){this.buffer=new Uint8Array,this.carriageReturnIndex=null}decode(e){if(e==null)return[];const i=e instanceof ArrayBuffer?new Uint8Array(e):typeof e=="string"?rt(e):e;this.buffer=Vd([this.buffer,i]);const n=[];let s;for(;(s=zd(this.buffer,this.carriageReturnIndex))!=null;){if(s.carriage&&this.carriageReturnIndex==null){this.carriageReturnIndex=s.index;continue}if(this.carriageReturnIndex!=null&&(s.index!==this.carriageReturnIndex+1||s.carriage)){n.push(Ui(this.buffer.subarray(0,this.carriageReturnIndex-1))),this.buffer=this.buffer.subarray(this.carriageReturnIndex),this.carriageReturnIndex=null;continue}const r=this.carriageReturnIndex!==null?s.preceding-1:s.preceding,l=Ui(this.buffer.subarray(0,r));n.push(l),this.buffer=this.buffer.subarray(s.index),this.carriageReturnIndex=null}return n}flush(){return this.buffer.length?this.decode(`
`):[]}}Me.NEWLINE_CHARS=new Set([`
`,"\r"]);Me.NEWLINE_REGEXP=/\r\n|[\n\r]/g;function zd(t,e){for(let s=e??0;s<t.length;s++){if(t[s]===10)return{preceding:s,index:s+1,carriage:!1};if(t[s]===13)return{preceding:s,index:s+1,carriage:!0}}return null}function Jd(t){for(let n=0;n<t.length-1;n++){if(t[n]===10&&t[n+1]===10||t[n]===13&&t[n+1]===13)return n+2;if(t[n]===13&&t[n+1]===10&&n+3<t.length&&t[n+2]===13&&t[n+3]===10)return n+4}return-1}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ae={off:0,error:200,warn:300,info:400,debug:500},Wi=(t,e,i)=>{if(t){if(Td(Ae,t))return t;G(i).warn(`${e} was set to ${JSON.stringify(t)}, expected one of ${JSON.stringify(Object.keys(Ae))}`)}};function ue(){}function ye(t,e,i){return!e||Ae[t]>Ae[i]?ue:e[t].bind(e)}const Yd={error:ue,warn:ue,info:ue,debug:ue};let Oi=new WeakMap;function G(t){var e;const i=t.logger,n=(e=t.logLevel)!==null&&e!==void 0?e:"off";if(!i)return Yd;const s=Oi.get(i);if(s&&s[0]===n)return s[1];const r={error:ye("error",i,n),warn:ye("warn",i,n),info:ye("info",i,n),debug:ye("debug",i,n)};return Oi.set(i,[n,r]),r}const X=t=>(t.options&&(t.options=Object.assign({},t.options),delete t.options.headers),t.headers&&(t.headers=Object.fromEntries((t.headers instanceof Headers?[...t.headers]:Object.entries(t.headers)).map(([e,i])=>[e,e.toLowerCase()==="x-goog-api-key"||e.toLowerCase()==="authorization"||e.toLowerCase()==="cookie"||e.toLowerCase()==="set-cookie"?"***":i]))),"retryOfRequestLogID"in t&&(t.retryOfRequestLogID&&(t.retryOf=t.retryOfRequestLogID),delete t.retryOfRequestLogID),t);/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ie{constructor(e,i,n){this.iterator=e,this.controller=i,this.client=n}static fromSSEResponse(e,i,n){let s=!1;const r=n?G(n):console;function l(){return W(this,arguments,function*(){var u,d,m,h;if(s)throw new U("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");s=!0;let p=!1;try{try{for(var g=!0,f=O(Kd(e,i)),w;w=yield S(f.next()),u=w.done,!u;g=!0){h=w.value,g=!1;const y=h;if(!p)if(y.data.startsWith("[DONE]")){p=!0;continue}else try{yield yield S(JSON.parse(y.data))}catch(v){throw r.error("Could not parse message into JSON:",y.data),r.error("From chunk:",y.raw),v}}}catch(y){d={error:y}}finally{try{!g&&!u&&(m=f.return)&&(yield S(m.call(f)))}finally{if(d)throw d.error}}p=!0}catch(y){if(Je(y))return yield S(void 0);throw y}finally{p||i.abort()}})}return new ie(l,i,n)}static fromReadableStream(e,i,n){let s=!1;function r(){return W(this,arguments,function*(){var u,d,m,h;const p=new Me,g=Bn(e);try{for(var f=!0,w=O(g),y;y=yield S(w.next()),u=y.done,!u;f=!0){h=y.value,f=!1;const v=h;for(const x of p.decode(v))yield yield S(x)}}catch(v){d={error:v}}finally{try{!f&&!u&&(m=w.return)&&(yield S(m.call(w)))}finally{if(d)throw d.error}}for(const v of p.flush())yield yield S(v)})}function l(){return W(this,arguments,function*(){var u,d,m,h;if(s)throw new U("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");s=!0;let p=!1;try{try{for(var g=!0,f=O(r()),w;w=yield S(f.next()),u=w.done,!u;g=!0){h=w.value,g=!1;const y=h;p||y&&(yield yield S(JSON.parse(y)))}}catch(y){d={error:y}}finally{try{!g&&!u&&(m=f.return)&&(yield S(m.call(f)))}finally{if(d)throw d.error}}p=!0}catch(y){if(Je(y))return yield S(void 0);throw y}finally{p||i.abort()}})}return new ie(l,i,n)}[Symbol.asyncIterator](){return this.iterator()}tee(){const e=[],i=[],n=this.iterator(),s=r=>({next:()=>{if(r.length===0){const l=n.next();e.push(l),i.push(l)}return r.shift()}});return[new ie(()=>s(e),this.controller,this.client),new ie(()=>s(i),this.controller,this.client)]}toReadableStream(){const e=this;let i;return Fn({async start(){i=e[Symbol.asyncIterator]()},async pull(n){try{const{value:s,done:r}=await i.next();if(r)return n.close();const l=rt(JSON.stringify(s)+`
`);n.enqueue(l)}catch(s){n.error(s)}},async cancel(){var n;await((n=i.return)===null||n===void 0?void 0:n.call(i))}})}}function Kd(t,e){return W(this,arguments,function*(){var n,s,r,l;if(!t.body)throw e.abort(),typeof globalThis.navigator<"u"&&globalThis.navigator.product==="ReactNative"?new U("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api"):new U("Attempted to iterate over a response with no body");const c=new $d,u=new Me,d=Bn(t.body);try{for(var m=!0,h=O(Zd(d)),p;p=yield S(h.next()),n=p.done,!n;m=!0){l=p.value,m=!1;const g=l;for(const f of u.decode(g)){const w=c.decode(f);w&&(yield yield S(w))}}}catch(g){s={error:g}}finally{try{!m&&!n&&(r=h.return)&&(yield S(r.call(h)))}finally{if(s)throw s.error}}for(const g of u.flush()){const f=c.decode(g);f&&(yield yield S(f))}})}function Zd(t){return W(this,arguments,function*(){var i,n,s,r;let l=new Uint8Array;try{for(var c=!0,u=O(t),d;d=yield S(u.next()),i=d.done,!i;c=!0){r=d.value,c=!1;const m=r;if(m==null)continue;const h=m instanceof ArrayBuffer?new Uint8Array(m):typeof m=="string"?rt(m):m;let p=new Uint8Array(l.length+h.length);p.set(l),p.set(h,l.length),l=p;let g;for(;(g=Jd(l))!==-1;)yield yield S(l.slice(0,g)),l=l.slice(g)}}catch(m){n={error:m}}finally{try{!c&&!i&&(s=u.return)&&(yield S(s.call(u)))}finally{if(n)throw n.error}}l.length>0&&(yield yield S(l))})}class $d{constructor(){this.event=null,this.data=[],this.chunks=[]}decode(e){if(e.endsWith("\r")&&(e=e.substring(0,e.length-1)),!e){if(!this.event&&!this.data.length)return null;const r={event:this.event,data:this.data.join(`
`),raw:this.chunks};return this.event=null,this.data=[],this.chunks=[],r}if(this.chunks.push(e),e.startsWith(":"))return null;let[i,n,s]=Qd(e,":");return s.startsWith(" ")&&(s=s.substring(1)),i==="event"?this.event=s:i==="data"&&this.data.push(s),null}}function Qd(t,e){const i=t.indexOf(e);return i!==-1?[t.substring(0,i),e,t.substring(i+e.length)]:[t,"",""]}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */async function Xd(t,e){const{response:i,requestLogID:n,retryOfRequestLogID:s,startTime:r}=e,l=await(async()=>{var c;if(e.options.stream)return G(t).debug("response",i.status,i.url,i.headers,i.body),e.options.__streamClass?e.options.__streamClass.fromSSEResponse(i,e.controller,t):ie.fromSSEResponse(i,e.controller,t);if(i.status===204)return null;if(e.options.__binaryResponse)return i;const u=i.headers.get("content-type"),d=(c=u==null?void 0:u.split(";")[0])===null||c===void 0?void 0:c.trim();return(d==null?void 0:d.includes("application/json"))||(d==null?void 0:d.endsWith("+json"))?await i.json():await i.text()})();return G(t).debug(`[${n}] response parsed`,X({retryOfRequestLogID:s,url:i.url,status:i.status,body:l,durationMs:Date.now()-r})),l}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class lt extends Promise{constructor(e,i,n=Xd){super(s=>{s(null)}),this.responsePromise=i,this.parseResponse=n,this.client=e}_thenUnwrap(e){return new lt(this.client,this.responsePromise,async(i,n)=>e(await this.parseResponse(i,n),n))}asResponse(){return this.responsePromise.then(e=>e.response)}async withResponse(){const[e,i]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:i}}parse(){return this.parsedPromise||(this.parsedPromise=this.responsePromise.then(e=>this.parseResponse(this.client,e))),this.parsedPromise}then(e,i){return this.parse().then(e,i)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Yn=Symbol("brand.privateNullableHeaders");function*jd(t){if(!t)return;if(Yn in t){const{values:n,nulls:s}=t;yield*n.entries();for(const r of s)yield[r,null];return}let e=!1,i;t instanceof Headers?i=t.entries():Hi(t)?i=t:(e=!0,i=Object.entries(t??{}));for(let n of i){const s=n[0];if(typeof s!="string")throw new TypeError("expected header name to be a string");const r=Hi(n[1])?n[1]:[n[1]];let l=!1;for(const c of r)c!==void 0&&(e&&!l&&(l=!0,yield[s,null]),yield[s,c])}}const ce=t=>{const e=new Headers,i=new Set;for(const n of t){const s=new Set;for(const[r,l]of jd(n)){const c=r.toLowerCase();s.has(c)||(e.delete(r),s.add(c)),l===null?(e.delete(r),i.add(c)):(e.append(r,l),i.delete(c))}}return{[Yn]:!0,values:e,nulls:i}};/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const De=t=>{var e,i,n,s,r,l;if(typeof globalThis.process<"u")return(n=(i=(e=Ao)===null||e===void 0?void 0:e[t])===null||i===void 0?void 0:i.trim())!==null&&n!==void 0?n:void 0;if(typeof globalThis.Deno<"u")return(l=(r=(s=globalThis.Deno.env)===null||s===void 0?void 0:s.get)===null||r===void 0?void 0:r.call(s,t))===null||l===void 0?void 0:l.trim()};/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Kn;class Pe{constructor(e){var i,n,s,r,l,c,u,{baseURL:d=De("GEMINI_NEXT_GEN_API_BASE_URL"),apiKey:m=(i=De("GEMINI_API_KEY"))!==null&&i!==void 0?i:null,apiVersion:h="v1beta"}=e,p=xe(e,["baseURL","apiKey","apiVersion"]);const g=Object.assign(Object.assign({apiKey:m,apiVersion:h},p),{baseURL:d||"https://generativelanguage.googleapis.com"});this.baseURL=g.baseURL,this.timeout=(n=g.timeout)!==null&&n!==void 0?n:Pe.DEFAULT_TIMEOUT,this.logger=(s=g.logger)!==null&&s!==void 0?s:console;const f="warn";this.logLevel=f,this.logLevel=(l=(r=Wi(g.logLevel,"ClientOptions.logLevel",this))!==null&&r!==void 0?r:Wi(De("GEMINI_NEXT_GEN_API_LOG"),"process.env['GEMINI_NEXT_GEN_API_LOG']",this))!==null&&l!==void 0?l:f,this.fetchOptions=g.fetchOptions,this.maxRetries=(c=g.maxRetries)!==null&&c!==void 0?c:2,this.fetch=(u=g.fetch)!==null&&u!==void 0?u:qd(),this.encoder=Ld,this._options=g,this.apiKey=m,this.apiVersion=h,this.clientAdapter=g.clientAdapter}withOptions(e){return new this.constructor(Object.assign(Object.assign(Object.assign({},this._options),{baseURL:this.baseURL,maxRetries:this.maxRetries,timeout:this.timeout,logger:this.logger,logLevel:this.logLevel,fetch:this.fetch,fetchOptions:this.fetchOptions,apiKey:this.apiKey,apiVersion:this.apiVersion}),e))}baseURLOverridden(){return this.baseURL!=="https://generativelanguage.googleapis.com"}defaultQuery(){return this._options.defaultQuery}validateHeaders({values:e,nulls:i}){if(!(e.has("authorization")||e.has("x-goog-api-key"))&&!(this.apiKey&&e.get("x-goog-api-key"))&&!i.has("x-goog-api-key"))throw new Error('Could not resolve authentication method. Expected the apiKey to be set. Or for the "x-goog-api-key" headers to be explicitly omitted')}async authHeaders(e){const i=ce([e.headers]);if(!(i.values.has("authorization")||i.values.has("x-goog-api-key"))){if(this.apiKey)return ce([{"x-goog-api-key":this.apiKey}]);if(this.clientAdapter.isVertexAI())return ce([await this.clientAdapter.getAuthHeaders()])}}stringifyQuery(e){return Object.entries(e).filter(([i,n])=>typeof n<"u").map(([i,n])=>{if(typeof n=="string"||typeof n=="number"||typeof n=="boolean")return`${encodeURIComponent(i)}=${encodeURIComponent(n)}`;if(n===null)return`${encodeURIComponent(i)}=`;throw new U(`Cannot stringify type ${typeof n}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)}).join("&")}getUserAgent(){return`${this.constructor.name}/JS ${ee}`}defaultIdempotencyKey(){return`stainless-node-retry-${vd()}`}makeStatusError(e,i,n,s){return F.generate(e,i,n,s)}buildURL(e,i,n){const s=!this.baseURLOverridden()&&n||this.baseURL,r=Cd(e)?new URL(e):new URL(s+(s.endsWith("/")&&e.startsWith("/")?e.slice(1):e)),l=this.defaultQuery();return Ad(l)||(i=Object.assign(Object.assign({},l),i)),typeof i=="object"&&i&&!Array.isArray(i)&&(r.search=this.stringifyQuery(i)),r.toString()}async prepareOptions(e){if(this.clientAdapter&&this.clientAdapter.isVertexAI()&&!e.path.startsWith(`/${this.apiVersion}/projects/`)){const i=e.path.slice(this.apiVersion.length+1);e.path=`/${this.apiVersion}/projects/${this.clientAdapter.getProject()}/locations/${this.clientAdapter.getLocation()}${i}`}}async prepareRequest(e,{url:i,options:n}){}get(e,i){return this.methodRequest("get",e,i)}post(e,i){return this.methodRequest("post",e,i)}patch(e,i){return this.methodRequest("patch",e,i)}put(e,i){return this.methodRequest("put",e,i)}delete(e,i){return this.methodRequest("delete",e,i)}methodRequest(e,i,n){return this.request(Promise.resolve(n).then(s=>Object.assign({method:e,path:i},s)))}request(e,i=null){return new lt(this,this.makeRequest(e,i,void 0))}async makeRequest(e,i,n){var s,r,l;const c=await e,u=(s=c.maxRetries)!==null&&s!==void 0?s:this.maxRetries;i==null&&(i=u),await this.prepareOptions(c);const{req:d,url:m,timeout:h}=await this.buildRequest(c,{retryCount:u-i});await this.prepareRequest(d,{url:m,options:c});const p="log_"+(Math.random()*(1<<24)|0).toString(16).padStart(6,"0"),g=n===void 0?"":`, retryOf: ${n}`,f=Date.now();if(G(this).debug(`[${p}] sending request`,X({retryOfRequestLogID:n,method:c.method,url:m,options:c,headers:d.headers})),!((r=c.signal)===null||r===void 0)&&r.aborted)throw new Ke;const w=new AbortController,y=await this.fetchWithTimeout(m,d,h,w).catch(Ye),v=Date.now();if(y instanceof globalThis.Error){const C=`retrying, ${i} attempts remaining`;if(!((l=c.signal)===null||l===void 0)&&l.aborted)throw new Ke;const A=Je(y)||/timed? ?out/i.test(String(y)+("cause"in y?String(y.cause):""));if(i)return G(this).info(`[${p}] connection ${A?"timed out":"failed"} - ${C}`),G(this).debug(`[${p}] connection ${A?"timed out":"failed"} (${C})`,X({retryOfRequestLogID:n,url:m,durationMs:v-f,message:y.message})),this.retryRequest(c,i,n??p);throw G(this).info(`[${p}] connection ${A?"timed out":"failed"} - error; no more retries left`),G(this).debug(`[${p}] connection ${A?"timed out":"failed"} (error; no more retries left)`,X({retryOfRequestLogID:n,url:m,durationMs:v-f,message:y.message})),A?new Mn:new ke({cause:y})}const x=`[${p}${g}] ${d.method} ${m} ${y.ok?"succeeded":"failed"} with status ${y.status} in ${v-f}ms`;if(!y.ok){const C=await this.shouldRetry(y);if(i&&C){const T=`retrying, ${i} attempts remaining`;return await Nd(y.body),G(this).info(`${x} - ${T}`),G(this).debug(`[${p}] response error (${T})`,X({retryOfRequestLogID:n,url:y.url,status:y.status,headers:y.headers,durationMs:v-f})),this.retryRequest(c,i,n??p,y.headers)}const A=C?"error; no more retries left":"error; not retryable";G(this).info(`${x} - ${A}`);const _=await y.text().catch(T=>Ye(T).message),k=_d(_),E=k?void 0:_;throw G(this).debug(`[${p}] response error (${A})`,X({retryOfRequestLogID:n,url:y.url,status:y.status,headers:y.headers,message:E,durationMs:Date.now()-f})),this.makeStatusError(y.status,k,E,y.headers)}return G(this).info(x),G(this).debug(`[${p}] response start`,X({retryOfRequestLogID:n,url:y.url,status:y.status,headers:y.headers,durationMs:v-f})),{response:y,options:c,controller:w,requestLogID:p,retryOfRequestLogID:n,startTime:f}}async fetchWithTimeout(e,i,n,s){const r=i||{},{signal:l,method:c}=r,u=xe(r,["signal","method"]);l&&l.addEventListener("abort",()=>s.abort());const d=setTimeout(()=>s.abort(),n),m=globalThis.ReadableStream&&u.body instanceof globalThis.ReadableStream||typeof u.body=="object"&&u.body!==null&&Symbol.asyncIterator in u.body,h=Object.assign(Object.assign(Object.assign({signal:s.signal},m?{duplex:"half"}:{}),{method:"GET"}),u);c&&(h.method=c.toUpperCase());try{return await this.fetch.call(void 0,e,h)}finally{clearTimeout(d)}}async shouldRetry(e){const i=e.headers.get("x-should-retry");return i==="true"?!0:i==="false"?!1:e.status===408||e.status===409||e.status===429||e.status>=500}async retryRequest(e,i,n,s){var r;let l;const c=s==null?void 0:s.get("retry-after-ms");if(c){const d=parseFloat(c);Number.isNaN(d)||(l=d)}const u=s==null?void 0:s.get("retry-after");if(u&&!l){const d=parseFloat(u);Number.isNaN(d)?l=Date.parse(u)-Date.now():l=d*1e3}if(!(l&&0<=l&&l<60*1e3)){const d=(r=e.maxRetries)!==null&&r!==void 0?r:this.maxRetries;l=this.calculateDefaultRetryTimeoutMillis(i,d)}return await Ed(l),this.makeRequest(e,i-1,n)}calculateDefaultRetryTimeoutMillis(e,i){const r=i-e,l=Math.min(.5*Math.pow(2,r),8),c=1-Math.random()*.25;return l*c*1e3}async buildRequest(e,{retryCount:i=0}={}){var n,s,r;const l=Object.assign({},e),{method:c,path:u,query:d,defaultBaseURL:m}=l,h=this.buildURL(u,d,m);"timeout"in l&&Sd("timeout",l.timeout),l.timeout=(n=l.timeout)!==null&&n!==void 0?n:this.timeout;const{bodyHeaders:p,body:g}=this.buildBody({options:l}),f=await this.buildHeaders({options:e,method:c,bodyHeaders:p,retryCount:i});return{req:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({method:c,headers:f},l.signal&&{signal:l.signal}),globalThis.ReadableStream&&g instanceof globalThis.ReadableStream&&{duplex:"half"}),g&&{body:g}),(s=this.fetchOptions)!==null&&s!==void 0?s:{}),(r=l.fetchOptions)!==null&&r!==void 0?r:{}),url:h,timeout:l.timeout}}async buildHeaders({options:e,method:i,bodyHeaders:n,retryCount:s}){let r={};this.idempotencyHeader&&i!=="get"&&(e.idempotencyKey||(e.idempotencyKey=this.defaultIdempotencyKey()),r[this.idempotencyHeader]=e.idempotencyKey);const l=await this.authHeaders(e);let c=ce([r,Object.assign(Object.assign({Accept:"application/json","User-Agent":this.getUserAgent(),"X-Stainless-Retry-Count":String(s)},e.timeout?{"X-Stainless-Timeout":String(Math.trunc(e.timeout/1e3))}:{}),Rd()),this._options.defaultHeaders,n,e.headers,l]);return this.validateHeaders(c),c.values}buildBody({options:{body:e,headers:i}}){if(!e)return{bodyHeaders:void 0,body:void 0};const n=ce([i]);return ArrayBuffer.isView(e)||e instanceof ArrayBuffer||e instanceof DataView||typeof e=="string"&&n.values.has("content-type")||globalThis.Blob&&e instanceof globalThis.Blob||e instanceof FormData||e instanceof URLSearchParams||globalThis.ReadableStream&&e instanceof globalThis.ReadableStream?{bodyHeaders:void 0,body:e}:typeof e=="object"&&(Symbol.asyncIterator in e||Symbol.iterator in e&&"next"in e&&typeof e.next=="function")?{bodyHeaders:void 0,body:Dd(e)}:this.encoder({body:e,headers:n})}}Pe.DEFAULT_TIMEOUT=6e4;class L extends Pe{constructor(){super(...arguments),this.interactions=new Jn(this)}}Kn=L;L.GeminiNextGenAPIClient=Kn;L.GeminiNextGenAPIClientError=U;L.APIError=F;L.APIConnectionError=ke;L.APIConnectionTimeoutError=Mn;L.APIUserAbortError=Ke;L.NotFoundError=Dn;L.ConflictError=Nn;L.RateLimitError=Hn;L.BadRequestError=Pn;L.AuthenticationError=Rn;L.InternalServerError=Gn;L.PermissionDeniedError=qn;L.UnprocessableEntityError=Ln;L.toFile=Ud;L.Interactions=Jn;/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function eu(t,e){const i={},n=o(t,["name"]);return n!=null&&a(i,["_url","name"],n),i}function tu(t,e){const i={},n=o(t,["name"]);return n!=null&&a(i,["_url","name"],n),i}function iu(t,e){const i={},n=o(t,["sdkHttpResponse"]);return n!=null&&a(i,["sdkHttpResponse"],n),i}function nu(t,e){const i={},n=o(t,["sdkHttpResponse"]);return n!=null&&a(i,["sdkHttpResponse"],n),i}function ou(t,e,i){const n={};if(o(t,["validationDataset"])!==void 0)throw new Error("validationDataset parameter is not supported in Gemini API.");const s=o(t,["tunedModelDisplayName"]);if(e!==void 0&&s!=null&&a(e,["displayName"],s),o(t,["description"])!==void 0)throw new Error("description parameter is not supported in Gemini API.");const r=o(t,["epochCount"]);e!==void 0&&r!=null&&a(e,["tuningTask","hyperparameters","epochCount"],r);const l=o(t,["learningRateMultiplier"]);if(l!=null&&a(n,["tuningTask","hyperparameters","learningRateMultiplier"],l),o(t,["exportLastCheckpointOnly"])!==void 0)throw new Error("exportLastCheckpointOnly parameter is not supported in Gemini API.");if(o(t,["preTunedModelCheckpointId"])!==void 0)throw new Error("preTunedModelCheckpointId parameter is not supported in Gemini API.");if(o(t,["adapterSize"])!==void 0)throw new Error("adapterSize parameter is not supported in Gemini API.");const c=o(t,["batchSize"]);e!==void 0&&c!=null&&a(e,["tuningTask","hyperparameters","batchSize"],c);const u=o(t,["learningRate"]);if(e!==void 0&&u!=null&&a(e,["tuningTask","hyperparameters","learningRate"],u),o(t,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");if(o(t,["beta"])!==void 0)throw new Error("beta parameter is not supported in Gemini API.");return n}function su(t,e,i){const n={};let s=o(i,["config","method"]);if(s===void 0&&(s="SUPERVISED_FINE_TUNING"),s==="SUPERVISED_FINE_TUNING"){const g=o(t,["validationDataset"]);e!==void 0&&g!=null&&a(e,["supervisedTuningSpec"],Vi(g))}else if(s==="PREFERENCE_TUNING"){const g=o(t,["validationDataset"]);e!==void 0&&g!=null&&a(e,["preferenceOptimizationSpec"],Vi(g))}const r=o(t,["tunedModelDisplayName"]);e!==void 0&&r!=null&&a(e,["tunedModelDisplayName"],r);const l=o(t,["description"]);e!==void 0&&l!=null&&a(e,["description"],l);let c=o(i,["config","method"]);if(c===void 0&&(c="SUPERVISED_FINE_TUNING"),c==="SUPERVISED_FINE_TUNING"){const g=o(t,["epochCount"]);e!==void 0&&g!=null&&a(e,["supervisedTuningSpec","hyperParameters","epochCount"],g)}else if(c==="PREFERENCE_TUNING"){const g=o(t,["epochCount"]);e!==void 0&&g!=null&&a(e,["preferenceOptimizationSpec","hyperParameters","epochCount"],g)}let u=o(i,["config","method"]);if(u===void 0&&(u="SUPERVISED_FINE_TUNING"),u==="SUPERVISED_FINE_TUNING"){const g=o(t,["learningRateMultiplier"]);e!==void 0&&g!=null&&a(e,["supervisedTuningSpec","hyperParameters","learningRateMultiplier"],g)}else if(u==="PREFERENCE_TUNING"){const g=o(t,["learningRateMultiplier"]);e!==void 0&&g!=null&&a(e,["preferenceOptimizationSpec","hyperParameters","learningRateMultiplier"],g)}let d=o(i,["config","method"]);if(d===void 0&&(d="SUPERVISED_FINE_TUNING"),d==="SUPERVISED_FINE_TUNING"){const g=o(t,["exportLastCheckpointOnly"]);e!==void 0&&g!=null&&a(e,["supervisedTuningSpec","exportLastCheckpointOnly"],g)}else if(d==="PREFERENCE_TUNING"){const g=o(t,["exportLastCheckpointOnly"]);e!==void 0&&g!=null&&a(e,["preferenceOptimizationSpec","exportLastCheckpointOnly"],g)}let m=o(i,["config","method"]);if(m===void 0&&(m="SUPERVISED_FINE_TUNING"),m==="SUPERVISED_FINE_TUNING"){const g=o(t,["adapterSize"]);e!==void 0&&g!=null&&a(e,["supervisedTuningSpec","hyperParameters","adapterSize"],g)}else if(m==="PREFERENCE_TUNING"){const g=o(t,["adapterSize"]);e!==void 0&&g!=null&&a(e,["preferenceOptimizationSpec","hyperParameters","adapterSize"],g)}if(o(t,["batchSize"])!==void 0)throw new Error("batchSize parameter is not supported in Vertex AI.");if(o(t,["learningRate"])!==void 0)throw new Error("learningRate parameter is not supported in Vertex AI.");const h=o(t,["labels"]);e!==void 0&&h!=null&&a(e,["labels"],h);const p=o(t,["beta"]);return e!==void 0&&p!=null&&a(e,["preferenceOptimizationSpec","hyperParameters","beta"],p),n}function au(t,e){const i={},n=o(t,["baseModel"]);n!=null&&a(i,["baseModel"],n);const s=o(t,["preTunedModel"]);s!=null&&a(i,["preTunedModel"],s);const r=o(t,["trainingDataset"]);r!=null&&yu(r);const l=o(t,["config"]);return l!=null&&ou(l,i),i}function ru(t,e){const i={},n=o(t,["baseModel"]);n!=null&&a(i,["baseModel"],n);const s=o(t,["preTunedModel"]);s!=null&&a(i,["preTunedModel"],s);const r=o(t,["trainingDataset"]);r!=null&&wu(r,i,e);const l=o(t,["config"]);return l!=null&&su(l,i,e),i}function lu(t,e){const i={},n=o(t,["name"]);return n!=null&&a(i,["_url","name"],n),i}function cu(t,e){const i={},n=o(t,["name"]);return n!=null&&a(i,["_url","name"],n),i}function du(t,e,i){const n={},s=o(t,["pageSize"]);e!==void 0&&s!=null&&a(e,["_query","pageSize"],s);const r=o(t,["pageToken"]);e!==void 0&&r!=null&&a(e,["_query","pageToken"],r);const l=o(t,["filter"]);return e!==void 0&&l!=null&&a(e,["_query","filter"],l),n}function uu(t,e,i){const n={},s=o(t,["pageSize"]);e!==void 0&&s!=null&&a(e,["_query","pageSize"],s);const r=o(t,["pageToken"]);e!==void 0&&r!=null&&a(e,["_query","pageToken"],r);const l=o(t,["filter"]);return e!==void 0&&l!=null&&a(e,["_query","filter"],l),n}function mu(t,e){const i={},n=o(t,["config"]);return n!=null&&du(n,i),i}function hu(t,e){const i={},n=o(t,["config"]);return n!=null&&uu(n,i),i}function pu(t,e){const i={},n=o(t,["sdkHttpResponse"]);n!=null&&a(i,["sdkHttpResponse"],n);const s=o(t,["nextPageToken"]);s!=null&&a(i,["nextPageToken"],s);const r=o(t,["tunedModels"]);if(r!=null){let l=r;Array.isArray(l)&&(l=l.map(c=>Zn(c))),a(i,["tuningJobs"],l)}return i}function gu(t,e){const i={},n=o(t,["sdkHttpResponse"]);n!=null&&a(i,["sdkHttpResponse"],n);const s=o(t,["nextPageToken"]);s!=null&&a(i,["nextPageToken"],s);const r=o(t,["tuningJobs"]);if(r!=null){let l=r;Array.isArray(l)&&(l=l.map(c=>Qe(c))),a(i,["tuningJobs"],l)}return i}function fu(t,e){const i={},n=o(t,["name"]);n!=null&&a(i,["model"],n);const s=o(t,["name"]);return s!=null&&a(i,["endpoint"],s),i}function yu(t,e){const i={};if(o(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");if(o(t,["vertexDatasetResource"])!==void 0)throw new Error("vertexDatasetResource parameter is not supported in Gemini API.");const n=o(t,["examples"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(r=>r)),a(i,["examples","examples"],s)}return i}function wu(t,e,i){const n={};let s=o(i,["config","method"]);if(s===void 0&&(s="SUPERVISED_FINE_TUNING"),s==="SUPERVISED_FINE_TUNING"){const l=o(t,["gcsUri"]);e!==void 0&&l!=null&&a(e,["supervisedTuningSpec","trainingDatasetUri"],l)}else if(s==="PREFERENCE_TUNING"){const l=o(t,["gcsUri"]);e!==void 0&&l!=null&&a(e,["preferenceOptimizationSpec","trainingDatasetUri"],l)}let r=o(i,["config","method"]);if(r===void 0&&(r="SUPERVISED_FINE_TUNING"),r==="SUPERVISED_FINE_TUNING"){const l=o(t,["vertexDatasetResource"]);e!==void 0&&l!=null&&a(e,["supervisedTuningSpec","trainingDatasetUri"],l)}else if(r==="PREFERENCE_TUNING"){const l=o(t,["vertexDatasetResource"]);e!==void 0&&l!=null&&a(e,["preferenceOptimizationSpec","trainingDatasetUri"],l)}if(o(t,["examples"])!==void 0)throw new Error("examples parameter is not supported in Vertex AI.");return n}function Zn(t,e){const i={},n=o(t,["sdkHttpResponse"]);n!=null&&a(i,["sdkHttpResponse"],n);const s=o(t,["name"]);s!=null&&a(i,["name"],s);const r=o(t,["state"]);r!=null&&a(i,["state"],un(r));const l=o(t,["createTime"]);l!=null&&a(i,["createTime"],l);const c=o(t,["tuningTask","startTime"]);c!=null&&a(i,["startTime"],c);const u=o(t,["tuningTask","completeTime"]);u!=null&&a(i,["endTime"],u);const d=o(t,["updateTime"]);d!=null&&a(i,["updateTime"],d);const m=o(t,["description"]);m!=null&&a(i,["description"],m);const h=o(t,["baseModel"]);h!=null&&a(i,["baseModel"],h);const p=o(t,["_self"]);return p!=null&&a(i,["tunedModel"],fu(p)),i}function Qe(t,e){const i={},n=o(t,["sdkHttpResponse"]);n!=null&&a(i,["sdkHttpResponse"],n);const s=o(t,["name"]);s!=null&&a(i,["name"],s);const r=o(t,["state"]);r!=null&&a(i,["state"],un(r));const l=o(t,["createTime"]);l!=null&&a(i,["createTime"],l);const c=o(t,["startTime"]);c!=null&&a(i,["startTime"],c);const u=o(t,["endTime"]);u!=null&&a(i,["endTime"],u);const d=o(t,["updateTime"]);d!=null&&a(i,["updateTime"],d);const m=o(t,["error"]);m!=null&&a(i,["error"],m);const h=o(t,["description"]);h!=null&&a(i,["description"],h);const p=o(t,["baseModel"]);p!=null&&a(i,["baseModel"],p);const g=o(t,["tunedModel"]);g!=null&&a(i,["tunedModel"],g);const f=o(t,["preTunedModel"]);f!=null&&a(i,["preTunedModel"],f);const w=o(t,["supervisedTuningSpec"]);w!=null&&a(i,["supervisedTuningSpec"],w);const y=o(t,["preferenceOptimizationSpec"]);y!=null&&a(i,["preferenceOptimizationSpec"],y);const v=o(t,["tuningDataStats"]);v!=null&&a(i,["tuningDataStats"],v);const x=o(t,["encryptionSpec"]);x!=null&&a(i,["encryptionSpec"],x);const C=o(t,["partnerModelTuningSpec"]);C!=null&&a(i,["partnerModelTuningSpec"],C);const A=o(t,["customBaseModel"]);A!=null&&a(i,["customBaseModel"],A);const _=o(t,["experiment"]);_!=null&&a(i,["experiment"],_);const k=o(t,["labels"]);k!=null&&a(i,["labels"],k);const E=o(t,["outputUri"]);E!=null&&a(i,["outputUri"],E);const D=o(t,["pipelineJob"]);D!=null&&a(i,["pipelineJob"],D);const T=o(t,["serviceAccount"]);T!=null&&a(i,["serviceAccount"],T);const M=o(t,["tunedModelDisplayName"]);M!=null&&a(i,["tunedModelDisplayName"],M);const N=o(t,["veoTuningSpec"]);return N!=null&&a(i,["veoTuningSpec"],N),i}function vu(t,e){const i={},n=o(t,["sdkHttpResponse"]);n!=null&&a(i,["sdkHttpResponse"],n);const s=o(t,["name"]);s!=null&&a(i,["name"],s);const r=o(t,["metadata"]);r!=null&&a(i,["metadata"],r);const l=o(t,["done"]);l!=null&&a(i,["done"],l);const c=o(t,["error"]);return c!=null&&a(i,["error"],c),i}function Vi(t,e){const i={},n=o(t,["gcsUri"]);n!=null&&a(i,["validationDatasetUri"],n);const s=o(t,["vertexDatasetResource"]);return s!=null&&a(i,["validationDatasetUri"],s),i}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class bu extends Z{constructor(e){super(),this.apiClient=e,this.list=async(i={})=>new j(K.PAGED_ITEM_TUNING_JOBS,n=>this.listInternal(n),await this.listInternal(i),i),this.get=async i=>await this.getInternal(i),this.tune=async i=>{var n;if(this.apiClient.isVertexAI())if(i.baseModel.startsWith("projects/")){const s={tunedModelName:i.baseModel};!((n=i.config)===null||n===void 0)&&n.preTunedModelCheckpointId&&(s.checkpointId=i.config.preTunedModelCheckpointId);const r=Object.assign(Object.assign({},i),{preTunedModel:s});return r.baseModel=void 0,await this.tuneInternal(r)}else{const s=Object.assign({},i);return await this.tuneInternal(s)}else{const s=Object.assign({},i),r=await this.tuneMldevInternal(s);let l="";return r.metadata!==void 0&&r.metadata.tunedModel!==void 0?l=r.metadata.tunedModel:r.name!==void 0&&r.name.includes("/operations/")&&(l=r.name.split("/operations/")[0]),{name:l,state:Ge.JOB_STATE_QUEUED}}}}async getInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=cu(e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>Qe(m))}else{const d=lu(e);return c=b("{name}",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>Zn(m))}}async listInternal(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=hu(e);return c=b("tuningJobs",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=gu(m),p=new fi;return Object.assign(p,h),p})}else{const d=mu(e);return c=b("tunedModels",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=pu(m),p=new fi;return Object.assign(p,h),p})}}async cancel(e){var i,n,s,r;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=tu(e);return c=b("{name}:cancel",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=nu(m),p=new yi;return Object.assign(p,h),p})}else{const d=eu(e);return c=b("{name}:cancel",d._url),u=d._query,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(s=e.config)===null||s===void 0?void 0:s.httpOptions,abortSignal:(r=e.config)===null||r===void 0?void 0:r.abortSignal}).then(m=>m.json().then(h=>{const p=h;return p.sdkHttpResponse={headers:m.headers},p})),l.then(m=>{const h=iu(m),p=new yi;return Object.assign(p,h),p})}}async tuneInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI()){const c=ru(e,e);return r=b("tuningJobs",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>Qe(u))}else throw new Error("This method is only supported by the Vertex AI.")}async tuneMldevInternal(e){var i,n;let s,r="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=au(e);return r=b("tunedModels",c._url),l=c._query,delete c._url,delete c._query,s=this.apiClient.request({path:r,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json().then(d=>{const m=d;return m.sdkHttpResponse={headers:u.headers},m})),s.then(u=>vu(u))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Cu{async download(e,i){throw new Error("Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.")}}const Iu=1024*1024*8,xu=3,Au=1e3,Tu=2,Te="x-goog-upload-status";async function Su(t,e,i){var n;const s=await $n(t,e,i),r=await(s==null?void 0:s.json());if(((n=s==null?void 0:s.headers)===null||n===void 0?void 0:n[Te])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return r.file}async function _u(t,e,i){var n;const s=await $n(t,e,i),r=await(s==null?void 0:s.json());if(((n=s==null?void 0:s.headers)===null||n===void 0?void 0:n[Te])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");const l=sn(r),c=new tt;return Object.assign(c,l),c}async function $n(t,e,i){var n,s;let r=0,l=0,c=new Be(new Response),u="upload";for(r=t.size;l<r;){const d=Math.min(Iu,r-l),m=t.slice(l,l+d);l+d>=r&&(u+=", finalize");let h=0,p=Au;for(;h<xu&&(c=await i.request({path:"",body:m,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:e,headers:{"X-Goog-Upload-Command":u,"X-Goog-Upload-Offset":String(l),"Content-Length":String(d)}}}),!(!((n=c==null?void 0:c.headers)===null||n===void 0)&&n[Te]));)h++,await ku(p),p=p*Tu;if(l+=d,((s=c==null?void 0:c.headers)===null||s===void 0?void 0:s[Te])!=="active")break;if(r<=l)throw new Error("All content has been uploaded, but the upload status is not finalized.")}return c}async function Eu(t){return{size:t.size,type:t.type}}function ku(t){return new Promise(e=>setTimeout(e,t))}class Mu{async upload(e,i,n){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Su(e,i,n)}async uploadToFileSearchStore(e,i,n){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await _u(e,i,n)}async stat(e){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Eu(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Pu{create(e,i,n){return new Ru(e,i,n)}}class Ru{constructor(e,i,n){this.url=e,this.headers=i,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(e){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.send(e)}close(){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.close()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const zi="x-goog-api-key";class qu{constructor(e){this.apiKey=e}async addAuthHeaders(e,i){if(e.get(zi)===null){if(this.apiKey.startsWith("auth_tokens/"))throw new Error("Ephemeral tokens are only supported by the live API.");if(!this.apiKey)throw new Error("API key is missing. Please provide a valid API key.");e.append(zi,this.apiKey)}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Du="gl-node/";class ct{get interactions(){if(this._interactions!==void 0)return this._interactions;console.warn("GoogleGenAI.interactions: Interactions usage is experimental and may change in future versions.");const e=this.httpOptions;e!=null&&e.extraBody&&console.warn("GoogleGenAI.interactions: Client level httpOptions.extraBody is not supported by the interactions client and will be ignored.");const i=new L({baseURL:this.apiClient.getBaseUrl(),apiKey:this.apiKey,apiVersion:this.apiClient.getApiVersion(),clientAdapter:this.apiClient,defaultHeaders:this.apiClient.getDefaultHeaders(),timeout:e==null?void 0:e.timeout});return this._interactions=i.interactions,this._interactions}constructor(e){var i;if(e.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(e.project||e.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(i=e.vertexai)!==null&&i!==void 0?i:!1,this.apiKey=e.apiKey;const n=Eo(e.httpOptions,e.vertexai,void 0,void 0);n&&(e.httpOptions?e.httpOptions.baseUrl=n:e.httpOptions={baseUrl:n}),this.apiVersion=e.apiVersion,this.httpOptions=e.httpOptions;const s=new qu(this.apiKey);this.apiClient=new Ec({auth:s,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:this.httpOptions,userAgentExtra:Du+"web",uploader:new Mu,downloader:new Cu}),this.models=new Yc(this.apiClient),this.live=new Uc(this.apiClient,s,new Pu),this.batches=new na(this.apiClient),this.chats=new Ga(this.models,this.apiClient),this.caches=new Na(this.apiClient),this.files=new Ka(this.apiClient),this.operations=new Kc(this.apiClient),this.authTokens=new dd(this.apiClient),this.tunings=new bu(this.apiClient),this.fileSearchStores=new wd(this.apiClient)}}const Nu=["Alginate/Agar (Hydrocolloids) are unstable; pour immediately due to syneresis/imbibition.","Condensation reactions release by-products (Water for Polysulfide, Alcohol for C-Silicone) causing shrinkage.","Addition Silicone (PVS) is the most stable (No by-product) but inhibited by Sulfur in Latex gloves.","Polyether is the most hydrophilic elastomer but is very stiff (careful with undercuts).","Thixotropic materials flow under pressure but stay in place when static.","Rapid 'snap' removal of viscoelastic materials reduces permanent deformation."],Lu=`
# Impression Materials — Detailed impression like cements are one of the highest yield topics so detail of them must DO

### Why impressions matter

* An impression is a **negative** reproduction of teeth and oral tissues.
* A cast/model is the **positive** reproduction poured from the impression. Accurate prostheses (crowns, RPDs, complete dentures) depend on an accurate impression and a stable cast.

---

## 1) Key glossary (high-yield meanings)

### Polymer / setting chemistry

* **Accelerator:** compound that speeds a reaction (often loosely used for “catalyst” in impression materials).
* **Catalyst:** reduces activation energy and is not consumed (in dentistry the term is sometimes misused for the “reactor/initiator” component).
* **Initiator:** starts polymerization (chemical / heat / photo).
* **Polymerization:** small molecules → long chains (polymers).
* **Addition reaction (chain-growth):** chains grow to maximum length **without by-products** (classic idea).
* **Condensation reaction (step-growth):** monomers form dimers → trimers → long chains; condensation impression materials produce **by-products** (e.g., water/alcohol).
* **Cross-linking:** joining polymer chains into a 3-D network (turns a paste into an elastic “rubber”).

![Polymerization Chemistry](assets/impression_chemistry.png)

![Rheology Diagram](assets/rheology_diagram.png)

### Material behavior terms you’re tested on

1. **Rheology:** science of flow/viscosity.

   **Pseudoplasticity (shear thinning):** viscosity ↓ immediately when shear ↑; returns **immediately** when shear stops.(toothpaste example it becomes thin/flows when u squeeze it )

2. **Thixotropy (time-dependent shear thinning):**

   **Under continuous stress/shear → viscosity gradually decreases (gets more fluid).**
   **When stress stops → it doesn’t snap back; it thickens slowly over time (time-dependent recovery).**

| Feature | Pseudoplasticity | Thixotropy |
| :--- | :--- | :--- |
| **Reaction to Shear** | Becomes Thinner | Becomes Thinner |
| **Recovery Speed** | Immediate (Instant) | Delayed (Takes Time) |
| **Clinical Feel** | Flows when pushed, freezes when stopped. | Flows when pushed, stays runny for a moment, then thickens. |
| **Key Word** | "Shear Rate" dependent | "Time" dependent |

3. **Viscoelasticity:** acts more like an elastic solid when strained quickly, but **deforms over time** (creep) when the load is slow or prolonged — so **fast “snap” removal reduces distortion** (good for impression as no distortion=accuracy), while slow removal increases deformation.
4. **Set:** rigid/elastic enough to remove without permanent deformation.
5. **Setting time:** mixing start → loss of flow/plasticity (clinically: safe removal time).part to flow, causing permanent distortion.

### Tear Energy vs. Tear Strength

* **Tear Strength:** Force needed to break the material.
* **Tear Energy:** Accounts for how much the material stretches before breaking.

* **Polysulfide** has high tear energy (stretches a lot).
* **PVS** has lower tear energy but better recovery

**Hydrocolloid water balance (common MCQ traps)**

![Hydrocolloid Water Balance](assets/syneresis_imbibition.png)

6. **Syneresis:** gel **loses** fluid onto its surface → **shrinkage**.
7. **Imbibition:** gel **absorbs** water when immersed → **swelling**.
8. **Gelation:** sol → gel transformation.
9. **Micelle / fibrils:** the “brush-heap” network that traps water inside the gel structure.

### Clinical geometry

* **Undercuts:** recessed areas that make removal harder and increase tearing/distortion risk.
* **Inelastic:** cannot sustain meaningful elastic deformation; fractures if forced over undercuts. It will fracture instead of flexing — it breaks like glass, not deforms like rubber.

---

## 2) “Ideal impression material” requirements (7-point checklist)

To produce accurate replicas, impression materials should be:

1. Fluid enough to adapt to tissues
2. Viscous enough to stay in the tray
3. Set in a reasonable time (commonly targeted < 7 min)
4. Resist tearing/distortion on removal
5. Dimensionally stable long enough to pour casts (sometimes multiple pours)
6. Biocompatible
7. Cost-effective (time + equipment)

### Critical question answers ()

* **Which criteria relate to time in the mouth?**
  Mainly (3) setting within a reasonable time and (the practical side of) (1–2) handling during working time so it can be seated before setting progresses too far.
* **Which one is mainly about the set impression?**
  (4) resistance to tearing/distortion during removal and (5) dimensional stability after set (these are “set material” performance).

---

## 3) Classification of impression materials (the clean way to remember)

### A) By setting mechanism

**Reversible (physical change; can soften again with heat)**

* **Impression compound** (thermoplastic)
* **Agar** (reversible hydrocolloid; sol↔gel by temperature)

**Irreversible (chemical reaction; cannot revert in clinic)**

* **Alginate** (irreversible hydrocolloid)
* **Elastomers:** polysulfide, silicones, polyether
* **ZOE paste, impression plaster**

### B) By mechanical behavior after set

**Inelastic (rigid; fractures over undercuts)**

* Impression plaster, ZOE, impression compound

**Elastic (flexible; can pass mild undercuts and rebound)**

* Hydrocolloids (agar/alginate) + elastomers

### C) By Pressure Applied on Tissues

This divides materials based on whether they push (displace) the gum tissue or record it in a resting state.

1. **Mucostatic (Non-Pressure)**

* **Concept:** Records the tissue in its passive, resting state without displacing it.
* **Characteristics:** These materials are very runny (low viscosity) and flow easily.
* **Examples:**
  * Impression Plaster (The classic example)
  * Zinc Oxide Eugenol (ZOE)
  * Light Body Elastomers (very thin mix)

2. **Mucocompressive (Pressure / Displacement)**

* **Concept:** Compresses and displaces the soft tissue while taking the impression.
* **Characteristics:** These materials are thick (high viscosity) and require force to seat the tray.
* **Examples:**
  * Impression Compound (The classic example)
  * Putty Elastomers
  * Soft Liners (when used functionally)

### The 6 big clinical steps (fixed prosthetic workflow) <span style="color: red; font-weight: bold;">can skip this</span>

1. **Tray selection/prep** (adhesive, rigidity, custom vs stock)
2. **Tissue management** (retraction, hemostasis, moisture control)
3. **Mixing / loading** (hand, static automix, dynamic)
4. **Impression technique** (multiple-mix, monophase, putty-wash)
5. **Removal** (proper set + snap removal)
6. **Pouring casts/dies** (stone compatibility, surfactants for silicones)

![Clinical Steps](assets/clinical_steps.png)

# 5) Each impression material — composition, setting, pros/cons, handling

## A) Alginate (Irreversible hydrocolloid)

### What it is

* **Elastic, hydrophilic**, easy/cheap for study models, preliminary impressions, many removable cases.

### Composition essentials (<span style="color: red">what you must know</span>)

* **Soluble alginate** (e.g., sodium/potassium alginate) = main polymer
* **Calcium sulfate** = provides Ca²⁺ to cross-link (reactor)
* **Trisodium phosphate** = **retarder** (controls working time)
* **Fillers** (diatomaceous earth) = strength/body
* **Potassium titanium fluoride** = gypsum surface hardener/accelerator for better stone surface

### Setting reaction (classic exam explanation)

1. Retarder stage: Ca²⁺ reacts **first** with phosphate (slows gelation)
2. After phosphate is used up: Ca²⁺ cross-links alginate chains → **calcium alginate gel**

### Controlling setting time (safe vs unsafe)

* **Safe:** change **water temperature** (warmer = faster set; cooler = slower).
* **Not ideal:** changing W/P ratio or mixing time too much → can weaken gel, change elasticity/tear behavior.

### Proper mixing (why water-first matters)

* **Water first, then powder:** prevents dry pockets at the bottom, reduces lumps, shortens mixing time—especially important for fast-set alginate.

### Removal & distortion control

* Don’t remove too early: alginate’s strength/elasticity improves shortly after gelation.
* Remove with a **quick snap** (viscoelastic material: shorter strain time = less permanent deformation).

### Dimensional stability (big pitfall)

* **Syneresis (shrink) in air + imbibition (swell) in water** → pour **immediately** whenever possible.
* If you must delay: wrap in a **damp** towel + sealed bag (humid environment), don’t soak in water.

### Disinfection (practical, minimal distortion)

* Prefer **spray + wrap + sealed bag (≈10 min)** rather than long immersion (immersion can distort). Keep immersion short if used.

### Typical uses

* Diagnostic casts, orthodontic models, preliminary impressions, many removable partial denture impressions (when ultra-fine detail isn’t critical).

---

## B) Agar (Reversible hydrocolloid)

### What it is

* **Elastic, hydrophilic**, very accurate detail, but needs **special equipment** (conditioning unit + water-cooled trays often).

### Sol ↔ gel mechanism

* **Heat** → gel becomes sol (liquefaction)
* **Cooling** → sol becomes gel (gelation)

### The 3-bath conditioning unit (a favorite theory question)

* **Boil ~100°C (≈10 min):** liquefy
* **Store ~65°C:** keep as sol until needed
* **Temper ~46°C (short time):** cool to safe handling temp before seating

### Key problems

* **Syneresis + evaporation** → shrinkage if left out
* **Imbibition** → swelling if immersed
* Must **pour immediately** (or maintain near-100% humidity if delayed).

### Clinical note (why it’s less common now)

* Technique-sensitive, extra equipment, tears more easily vs elastomers.

---

## Elastomeric impression materials (rubber impressions)

### What makes an elastomer an elastomer?

* Polymer-based materials that **cross-link** on setting into a rubbery network.
* Typically supplied as **base + catalyst/accelerator** systems in different viscosities (light, medium, heavy, putty).

### C) Polysulfide (Elastomer; condensation-type)

**Composition essentials**

* **Base paste:** polysulfide polymer with mercaptan (-SH), fillers, plasticizer; may include sulfur accelerator.
* **Catalyst/accelerator paste:** traditionally includes **lead dioxide** (brown color) + fillers/plasticizer; retarders (oleic/stearic acid) to control set.

**Setting reaction + by-product**

* Cross-linking occurs; **water is produced as by-product** (important for stability).
* Loss of this by-product over time → dimensional change → **pour early**.

**Properties (how it behaves clinically)**

* **High tear resistance** (good for thin sulcus areas)
* More flexible / lower stiffness vs many elastomers → easier removal from undercuts
* <span style="color: red">Odor, can stain</span>, longer working/setting times
* Often benefits from **custom tray** to reduce bulk and shrink-related distortion

**Best for**

* Cases where tear resistance and flexibility matter, but you can pour promptly and manage odor/handling.

---

### D) Condensation silicone

**Key idea**

* Sets by cross-linking and produces a volatile by-product (alcohol) → evaporation → shrinkage → **pour immediately** is the rule.

**Clinical technique tied to the chemistry**

* **Putty-wash** was popular to reduce shrink effects (less wash bulk; putty acts like an intraoral custom tray).

**Main disadvantage**

* Hydrophobic + by-product → stability issues if delayed.

---

## E) Addition silicone (PVS / VPS)

**Why it’s loved**

* Addition polymerization: **no classic volatile by-product**, so it’s **dimensionally stable** and can be poured multiple times (clinically very forgiving).

**Practical pitfalls to remember**

* **Hydrogen gas release** can create bubbles/voids in stone if poured too soon (many products include scavengers; otherwise delay pour).
* **Latex/sulfur inhibition:** sulfur compounds can inhibit set if the prep/tooth was touched with latex gloves (very testable).

**Hydrophobicity vs “hydrophilized PVS”**

* Standard PVS is hydrophobic; “hydrophilized” versions add surfactants to improve wettability during pouring.

**Best for**

* Fixed prosthesis (crowns/bridges), implant impressions (with proper technique), multiple pours, when you need maximum stability.

---

### F) Polyether

**What makes it different?**

* Generally the <span style="color: red">most hydrophilic</span> elastomer group → good wetting, good detail in moist environments compared with silicones.
* Typically <span style="color: red">stiffer</span> (higher modulus) than many others → can be harder to remove from significant undercuts.
* Must avoid long immersion disinfection (water uptake → distortion).

**Slide points to remember**

* Base + catalyst pastes; good mechanical/compressive properties; available in viscosities.

**Best for**

* Accurate impressions where moisture control is challenging, and undercuts are controlled/blocked.

---

# 6) Inelastic impression materials

## A) ZOE (Zinc Oxide–Eugenol) impression paste

**What it’s used for**

* Edentulous mucostatic impressions, bite registrations, surgical dressings, etc.

**Why it sets faster in humidity (the exam explanation)**

* Setting is **moisture-assisted**: zinc oxide hydrolyzes toward zinc hydroxide; eugenol reacts to form zinc eugenolate. More moisture → faster progress.

**Pros/cons**

* **Very stable dimensionally** once set (great for storing).
* **Rigid/inelastic** → not for undercuts.
* Eugenol can irritate/sting; EBA substitutes reduce irritation.

## B) Impression plaster <span style="color: red">not used</span>

* Very fluid → mucostatic soft-tissue impressions.
* Brittle → may need to fracture to remove over undercuts, then reassemble.
* Useful in some implant splinting/transfer contexts because rigidity can stabilize components.

## C) Impression compound (modeling plastic)

**Temperature behavior is everything**

* **Thermoplastic:** soft on heating, hard on cooling (reversible).
* Low thermal conductivity → needs **uniform slow heating** and thorough cooling before removal to avoid warping.

**Clinical uses**

* Primary impressions for edentulous cases (tray compound)
* Border molding for custom trays
* Often combined with a “wash” material (ZOE, plaster, hydrocolloid, elastomer) for secondary impression.

---

# 7) Mixing system <span style="color: red; font-weight: bold;">can skip</span>

## Hand mixing

* Equal lengths of base/catalyst; mix to uniform color, avoid streaks.

## Static automix (cartridge + mixing tip)

* Stationary helical elements **split and recombine** streams repeatedly → many thin layers → uniform mix with fewer voids.

## Dynamic mechanical mixing

* The motor-driven device uses an **impeller** inside tip to mix as it extrudes (good for high viscosity materials.

**Main difference (static vs dynamic):** static has **no moving parts** inside the tip; dynamic has a **motor-driven** mixer/impeller.

---

# 8) Impression techniques (and why they fail)

## Multiple-mix (light body + heavy body)

* Light body syringed around margins; heavy body in tray seats over it.
* If either material goes past working time before seating → poor bonding and distortion risk.

## Monophase

* Same material used in tray + syringe.
* Relies on **shear thinning**: in syringe it becomes less viscous; in tray it holds shape.

## Putty-wash

* Putty forms “tray”; wash captures detail.
* Too little wash space or too much seating pressure can cause rebound distortion (short/narrow dies).

### The classic failure mechanism (important)

* Seating when material has begun developing elasticity → compresses → rebounds (“spring back”) → dies become too narrow/short (fixed prosthetic misfit).

---

# 9) Removal rules (viscoelastic logic)

* Do **not** remove until adequately set (test leftover material outside the field).
* Break the seal first, then remove with a <span style="color: red">quick snap:</span>
  * Less time under strain → less permanent deformation.
* Avoid rocking/teasing as the main removal method (teasing increases time-dependent deformation).

---

# 10) Dimensional inaccuracy — the “6 causes” list

1. Polymerization shrinkage
2. Loss of by-product (water/alcohol)
3. Thermal contraction (37°C → room temp)
4. Water/disinfectant absorption over time
5. Incomplete recovery (viscoelastic)
6. Plastic deformation (true permanent change)

**High yield:** condensation silicone + polysulfide are more affected by (2); polyether is more affected by (4) if stored wet; PVS is strong on (5–6) recovery.

---

# 11) Quick selection guide (clinical use)

* **Diagnostic casts / ortho models:** Alginate (fast, hydrophilic, cheap)(also for dentate patient)
* **High-accuracy fixed prosthesis:** PVS (addition silicone) or polyether
* **Moist field challenge:** Polyether (better wetting than silicone families)
* **Deep sulcus / thin areas where tearing is risky:** Polysulfide (high tear resistance)
* **Edentulous mucostatic:** ZOE paste or impression plaster (when undercuts are minimal)
* **Border molding / preliminary edentulous tray shaping:** Impression compound

---

# 12) Common failure patterns (what to check first)

* **Bubbles/voids:** air during mixing, syringe tip not kept within material, moisture/debris on tooth
* **Rough surface / unset patches:** wrong ratio, incomplete mixing, contamination (latex with PVS), premature removal
* **Distortion:** tray flexure, movement during set, too much bulk, seating after working time, delayed pour for unstable materials
* **Tearing in sulcus:** inadequate bulk, premature removal, thin wash in deep sulcus, severe undercuts, wrong removal direction

---

## Summary table <span style="color: red">VVIMP</span>

**If u cannot remember all just remember the first one in the order at least**

Important to note that polysulphide will not tear easily but that doesn't help much because it deforms it has the lowest elastic recovery

| Property | Ranking (Best/Most/Greatest/Longest → Worst/Least/Shortest) |
| :--- | :--- |
| **Working time & setting time** | Polysulfide > Silicones (addition & condensation) > Polyether |
| **Stiffness** | Polyether > Addition silicone (PVS) > Condensation silicone > Polysulfide |
| **Tear strength** | Polysulfide > Addition silicone (PVS) > Polyether > Condensation silicone |
| **Elastic recovery** | Addition silicone (PVS) > Condensation silicone > Polyether > Polysulfide |
| **Dimensional stability** | Addition silicone (PVS) > Polyether > Polysulfide > Condensation silicone |
| **Wettability** | Hydrocolloids > Polyether > Hydrophilic addition silicone > Polysulfide > Hydrophobic addition silicone > Condensation silicone |

**Addition silicon is the best elastomeric material over all just keep sulfur away and also**

| Material Condition | Effect on Addition Silicone (PVS) |
| :--- | :--- |
| **Old/Fully Cured Composite** | No Effect. Safe to take impression. |
| **Fresh Composite (Cut/Prepped)** | No Effect. Safe to take impression. |
| **Fresh Composite (Uncut Surface)** | **INHIBITION.** PVS will not set (stays gooey).the platinum catalyst will be poisoned |

<br/>

---

**Above portion over all properties and uses similar for all dental fields other subjects now we see only dm aspect**

**Below is one single coherent exam note for ALL impression materials (composition + setting mechanism + key points).**

# Impression Materials — One Coherent Exam Note
**(Composition + Setting + Key Points)**

### A) HYDROCOLLOIDS

**1) Agar (Reversible Hydrocolloid)**
**Type:** Elastic, reversible, hydrophilic
**Setting (reaction system):** Physical gelation (temperature)
* **Heat:** gel → sol
* **Cool:** sol → gel

**Composition (main):**
* **Agar + water** (major)
* **Borax** (strengthens gel)
* **K₂SO₄** (improves gypsum set)
* **Fillers**, plasticizers, preservatives, color/flavor

**Key points (exam):**
* **No chemical by-product**, but water movement causes distortion
* **Syneresis/imbibition** → pour immediately

**The "Hysteresis" Loop (Agar)**
* **Liquefaction:** We boil it at 100°C to turn it into a Sol (Liquid).
* **Storage:** We keep it ready in a bath at 65°C.
* **Tempering:** Before putting it in the mouth, we cool it to 45°C (so it doesn't burn the patient).
* **Gelation (Setting):** It turns back to a Gel at 43°C.
  * Note: This requires Water-Cooled Trays to lower the temperature quickly. The mouth is too warm to set it efficiently.
Its basically heating a gel and then cooling a gel to get an impression

**2) <span style="color: red">Alginate (Irreversible Hydrocolloid)</span>**
**Type:** Elastic, irreversible, hydrophilic
**Setting (reaction system):** Chemical gelation (Ca²⁺ crosslinking)
* **Retarder stage:** CaSO₄ + Na₃PO₄ → Ca₃(PO₄)₂ (delays set)
* **Final gel:** Soluble alginate + Ca²⁺ → calcium alginate gel (insoluble)

**Composition (main):**
* **Sodium/potassium alginate** (soluble)
* **Calcium sulfate** (reactor)
* **Trisodium phosphate** (retarder)
* **Diatomaceous earth** (filler/strength)
* **Potassium titanium fluoride** (better gypsum surface)

**Key points (exam):**
* **No volatile by-product**, but syneresis/imbibition → pour ASAP
* Generally less accurate than elastomers (not for fine crown margins)

The reaction of sodium alginate is very fast, leaving no working time. Therefore, a Retarder (Sodium Phosphate) is added. The reactor (CaSO4) reacts with the retarder first, keeping it occupied. Once the retarder is finished, the reactor then reacts with the alginate to form CALCIUM Alginate (the Gel)."

### B) THERMOPLASTIC (RIGID) MATERIALS

**3) <span style="color: red">Impression Compound</span>**
**Type:** Rigid when set, thermoplastic
**Setting (reaction system):** Physical change (heat softens, cooling hardens)

**Composition (main):**
* **Resins/waxes** (softening + flow)
* <span style="color: red">**Stearic acid**</span>/plasticizers
* **Fillers** (talc/diatomaceous earth)

**Key points (exam):**
* **High thermal contraction** → distortion risk
* Used for preliminary edentulous impressions + border molding, not crown margins
This is a thermoplastic material its like a wax(technically it is a wax)

When heated (~55–60 °C): it softens and becomes moldable (high flow).
When cooled to mouth temperature (~37 °C): it hardens/sets by physical cooling (low flow).
No chemical reaction and no by-product — it just changes state with temperature.

### C) RIGID CHEMICAL PASTES

**4) ZOE Impression Paste (Zinc Oxide–Eugenol)(already in detail in cemenets)**
**Type:** Rigid, mucostatic, accurate for edentulous
**Setting (reaction system):** Acid–base chelation
* **ZnO + eugenol** → zinc eugenolate

**Composition:**
* **Base paste:** ZnO + oils/resins/fillers
* **Catalyst paste:** eugenol + accelerators (often zinc acetate) + fillers

**Key points (exam):**
* **No by-product** → good stability
* **Brittle** → avoid undercuts
* **Eugenol** may irritate/burn

### D) ELASTOMERS (RUBBER IMPRESSION MATERIALS)

**5) Polysulfide**
**Type:** Elastic, hydrophobic-ish, high tear strength, messy
**Setting (reaction system):** Condensation polymerization

**Key chemicals:**
* **Base:** mercaptan (–SH)
* **Catalyst:** <span style="color: red">lead dioxide (PbO₂)</span>
**By-product:** <span style="color: red">Water</span>

**Key points (exam):**
* **Water evaporates** → shrinkage → pour early (~within 1 hour)
* **PbO₂** → brown color + stains, –SH → bad odor

**6) Condensation Silicone (C-silicone)**
**Type:** Elastic, hydrophobic, moderate accuracy
**Setting (reaction system):** Condensation polymerization

**Key chemicals:**
* **Base:** hydroxyl-terminated PDMS (–OH)
* **Cross-linker:** alkyl silicate
* **Catalyst:** <span style="color: red">stannous octoate (tin)</span>
**By-product:** <span style="color: red">Ethyl alcohol</span>

**Key points (exam):**
* **Alcohol evaporates fast** → highest shrinkage among elastomers
* **Pour ASAP** (~within 30 min)

**7) Addition Silicone (PVS/VPS)**
**Type:** Elastic, very accurate, excellent stability
**Setting (reaction system):** Addition (hydrosilylation)

**Key chemicals:**
* **Base:** vinyl-terminated polysiloxane
* **Cross-linker:** Si–H (poly(methylhydrogen siloxane))
* **Catalyst:** <span style="color: red">platinum (Pt)</span>
**By-product:** None

**Key points (exam):**
* **Excellent dimensional stability** (can delay pour)
* **Sulfur inhibits Pt** (latex gloves, some materials) → incomplete set

**8) Polyether**
**Type:** Elastic but very rigid/stiff, hydrophilic (good wetting)
**Setting (reaction system):** Cationic ring-opening polymerization

**Key chemicals:**
* **Base:** polyether with aziridine rings
* **Initiator:** aromatic sulfonate ester
**By-product:** None

**Key points (exam):**
* **Very stable**
* **Hard to remove from undercuts** due to stiffness

### EXAM SUPER-SUMMARY (Most Tested)
**By-product → shrinkage risk**
* **Polysulfide** → water → shrink
* **C-silicone** → alcohol → shrink (worst)
* **PVS** → none → stable
* **Polyether** → none → stable
* **Agar/Alginate** → water movement (syneresis/imbibition) → pour immediately

**When to pour (high yield)**
* **Alginate/Agar:** immediately
* **C-silicone:** ~30 min
* **Polysulfide:** ~1 hour
* **PVS/Polyether:** stable (delayed pour acceptable

**Disinfection Protocol**
* **Alginate/Polyether (Hydrophilic):** Spray with disinfectant (chlorine/iodophor), wrap in damp paper towel for <10 mins. **Do not immerse.**
* **Silicones/Polysulfides (Hydrophobic):** Can be immersed in glutaraldehyde or phenol solutions for the required time (usually 10+ mins).

### Type of Failure Causes (Agar vs Alginate)

| Type of Failure | Causes: Agar (Reversible) | <span style="color: red">Causes: Alginate (Irreversible)imp</span> |
| :--- | :--- | :--- |
| **Grainy Material** | • Inadequate boiling<br>• Storage temperature too low<br>• **Storage time too long** | • **Improper mixing**<br>• Prolonged mixing<br>• Excessive gelation<br>• Water/powder ratio too low |
| **Separation of Syringe Materials** | • **Water-soaked tray** material surface not removed<br>• Premature gelation of either material | • Not applicable |
| **Tearing** | • **Inadequate bulk**<br>• Premature removal from mouth<br>• Syringe material partially gelled when tray was seated | • **Inadequate bulk**<br>• Moisture contamination<br>• **Premature removal** from mouth<br>• Prolonged mixing |
| **External Bubbles** | • **Gelation of syringe material**, preventing flow | • **Undue gelation**, preventing flow<br>• **Air incorporated** during mixing |
| **Irregularly Shaped Voids** | • Material **too cold** | • **Moisture or debris** on tissue |
| **Rough or Chalky Stone Model** | • Inadequate cleansing of impression<br>• Excess water or hardening solution left in impression<br>• Premature removal of die<br>• Improper manipulation of stone | • **Air drying of impression** before pouring (Major cause)<br>• Inadequate cleaning of impression<br>• Excess water left in impression<br>• Premature removal of impression<br>• Model left in impression too long<br>• Improper manipulation of stone |
| **Distortion** | • Impression not poured within **30 min**<br>• Movement of tray during gelation<br>• Premature removal from mouth<br>• Improper removal from mouth<br>• Use of ice water during initial gelation | • Impression **not poured immediately**<br>• Movement of tray during gelation<br>• Premature removal from mouth<br>• Improper removal from mouth |

![Impression Materials Summary Table](assets/impression_downloadable_summary.png)
`,Ji=[{id:"imp-3",question:"Why must Condensation Silicone impressions be poured immediately/soon?",options:["Hydrogen gas causes voids","Water absorption causes swelling","Ethanol by-product evaporates causing shrinkage","Platinum catalyst continues curing for 24 h"],correctAnswerIndex:2,explanation:"Condensation silicone releases ethyl alcohol; evaporation → dimensional shrinkage."},{id:"imp-5",question:"Which material is naturally hydrophilic and works well in moisture but should not be stored in water?",options:["Condensation silicone","Addition silicone (PVS)","Polyether","Impression compound"],correctAnswerIndex:2,explanation:"Polyether is inherently hydrophilic (good in moisture) but absorbs water (imbibition) if stored in liquid."},{id:"imp-6",question:"Which alginate powder component acts as a retarder to provide working time?",options:["Calcium sulfate","Trisodium phosphate","Potassium titanium fluoride","Diatomaceous earth"],correctAnswerIndex:1,explanation:"Phosphate preferentially ties up Ca²⁺ first; alginate crosslinking starts after phosphate is depleted."},{id:"imp-new-1",question:"In alginate impression material, which component is the main soluble hydrocolloid that reacts with calcium ions to form the elastic gel?",options:["Calcium sulfate","Sodium alginate","Diatomaceous earth","Trisodium phosphate"],correctAnswerIndex:1,explanation:"Sodium alginate dissolves in water to form the sol and reacts with calcium ions to form the calcium alginate gel."},{id:"imp-16",question:"Polyether stiffness compared to other elastomers is best described as:",options:["Lowest modulus; easiest removal","High modulus; difficult removal from undercuts","Similar to polysulfide; very flexible","Only stiff before set, soft after set"],correctAnswerIndex:1,explanation:"Polyether is classically the stiffest elastomer (high modulus), harder to remove from undercuts."},{id:"imp-22",question:"You are a clinical supervisor... patient has developed acute redness, swelling, and itching (signs of contact dermatitis/hypersensitivity)... Among the elastomeric materials, which one is the most likely culprit for this allergic reaction?",options:["Addition Silicone (PVS)","Polysulfide","Polyether","Condensation Silicone"],correctAnswerIndex:2,explanation:"Polyether. Short reasoning: Polyether is the elastomer most commonly linked to allergic/contact reactions compared with silicones and polysulfide."},{id:"imp-24",question:"Primary function of diatomaceous earth in alginate powder:",options:["Retarder","Reactor source of Ca²⁺","Filler increasing strength","Photoinitiator"],correctAnswerIndex:2,explanation:"It provides body and improves strength and rigidity."},{id:"imp-27",question:"A dentist is using a condensation silicone... what is the best time window to pour the stone cast to minimize dimensional inaccuracy?",options:["After 1 hour to allow for elastic recovery","After 24 hours to ensure full polymerization","Immediately or within 15–30 minutes","After 1 week, similar to PVS"],correctAnswerIndex:2,explanation:"Immediately or within 15–30 minutes. Justification: Condensation silicone undergoes a condensation reaction that releases ethanol. Ethanol evaporates quickly, producing significant shrinkage..."},{id:"imp-28",question:"Why is zinc oxide–eugenol (ZOE) impression paste generally unsuitable for recording the fine details of a crown preparation?",options:["It is too fluid to stay in the tray.","It reacts with the temporary crown material.","It is inelastic and may fracture/lock in undercuts during removal.","It sets too slowly."],correctAnswerIndex:2,explanation:"It is inelastic and will fracture/lock in undercuts. Justification: ZOE sets into a rigid, inelastic material..."},{id:"imp-29",question:"Which component in polysulfide impression material is responsible for its characteristic dark brown color (and associated staining)?",options:["Titanium dioxide","Sulfur","Dibutyl phthalate","Lead dioxide (PbO₂)"],correctAnswerIndex:3,explanation:"Lead dioxide (PbO₂). Justification: In polysulfide impression materials, lead dioxide (PbO₂) is present in the accelerator/catalyst paste..."},{id:"imp-32",question:"Which impression material releases water as a by-product during its setting reaction, meaning the impression should be poured within about 30–60 minutes to reduce dimensional change (shrinkage)?",options:["Polysulfide","Addition silicone (PVS)","Polyether","Impression compound"],correctAnswerIndex:0,explanation:"Polysulfide. Justification: Polysulfide sets via a condensation reaction... produces water as a by-product..."},{id:"imp-33",question:"What is the primary role of Diatomaceous Earth in an alginate impression powder?",options:["It acts as a filler to provide stiffness and strength.","It acts as a retarder.","It acts as a reactor.","It provides the dustless coating."],correctAnswerIndex:0,explanation:"It acts as a filler to provide stiffness and strength. Justification: Diatomaceous earth makes up the bulk of alginate powder (often ~50–60%)..."},{id:"imp-34",question:"Which property of Polyether impression material makes it difficult to remove from the mouth, especially in undercut areas?",options:["High plasticity","High stiffness (high modulus of elasticity)","High tear strength","Low surface tension"],correctAnswerIndex:1,explanation:"High stiffness (high modulus of elasticity). Statement (key concept): Polyether sets into a very rigid elastomer..."},{id:"imp-38",question:"Which impression material shows hysteresis, meaning there is a temperature gap between liquefaction (sol) and gelation (gel) temperatures?",options:["Impression Compound","Polyether","Agar","Alginate"],correctAnswerIndex:2,explanation:"Agar. Statement (key concept): Agar (reversible hydrocolloid) demonstrates thermal hysteresis..."},{id:"imp-40",question:"If an Alginate impression is removed from the mouth and left on the countertop for 1 hour in dry air, it will distort primarily due to:",options:["Polymerization shrinkage","Thermal expansion","Imbibition","Syneresis and evaporation"],correctAnswerIndex:3,explanation:"Syneresis and evaporation. Statement (key concept): Alginate (an irreversible hydrocolloid) is a water-based gel..."},{id:"imp-41",question:"Which impression material is most likely to produce hydrogen gas as a side effect?",options:["Addition Silicone (PVS)","Polysulfide","Condensation Silicone","Polyether"],correctAnswerIndex:0,explanation:"Addition Silicone (PVS). Statement (key concept): Addition silicone (PVS) sets by an addition (hydrosilylation) reaction. Some formulations can release hydrogen gas (H₂)..."}],Yi=[{id:"imp-1",question:"Addition Silicone (PVS) sets everywhere except the margin (margin is gooey). Most likely cause?",options:["Too much tray adhesive","Ethanol by-product evaporation","Sulfur contamination inhibited polymerization","Water contamination accelerated setting"],correctAnswerIndex:2,explanation:"Platinum catalyst in PVS can be “poisoned” by sulfur (latex gloves / some cords), so the contaminated area stays unset."},{id:"imp-2",question:"Which phenomenon explains: flows easily through syringe under stress but doesn’t drip off tray at rest?",options:["Thixotropy","Viscoelasticity","Pseudoplasticity","Syneresis"],correctAnswerIndex:2,explanation:"Pseudoplasticity (shear thinning) = viscosity drops immediately under shear and recovers immediately when stress stops."},{id:"imp-4",question:"Why is “snap” (quick jerk) removal recommended for elastomeric impressions?",options:["Prevents tearing by increasing viscosity","Minimizes permanent plastic deformation from viscoelastic flow","Increases wetting on the tooth","Prevents hydrogen bubbles"],correctAnswerIndex:1,explanation:"Fast strain favors elastic recovery; slow removal allows viscous flow → permanent distortion."},{id:"imp-7",question:"Patient has very mobile teeth / severe periodontal undercuts. Which material should be avoided due to high stiffness?",options:["Alginate","Polysulfide","Polyether","Agar"],correctAnswerIndex:2,explanation:"Polyether has a high modulus (stiff), risking locking into undercuts or even extracting mobile teeth."},{id:"imp-10",question:"Agar tray material left too long in tempering bath (>10 min). Primary consequence?",options:["Increased tear strength","Early gelation in tray","Ethanol evaporation","Inhibition by sulfur"],correctAnswerIndex:1,explanation:"Partial gelation in tray prevents flow/adaptation and interferes with bonding to syringe material."},{id:"imp-12",question:"Why is agar syringe material never tempered?",options:["Tempering increases its stiffness for support","It must stay as a fluid sol to adapt and bond","It needs ethanol to evaporate","It must become thixotropic"],correctAnswerIndex:1,explanation:"It must remain fluid (sol) for adaptation; staying untempered also supports bonding with tray material."},{id:"imp-13",question:"In polysulfide, lead dioxide has which dual function?",options:["Filler + surfactant","Retarder + plasticizer","Reactor/oxidizer + provides brown color","Crosslinker + releases ethanol"],correctAnswerIndex:2,explanation:"Lead dioxide supplies oxygen for reaction and gives characteristic brown color."},{id:"imp-15",question:"Most common cause of separation between agar tray and agar syringe material?",options:["No tray adhesive applied","Syringe material was tempered","Water-soaked surface layer on tray not removed","Use of cold water circulation"],correctAnswerIndex:2,explanation:"The wet superficial layer blocks bonding if not scraped/removed."},{id:"imp-17",question:"Why does alginate compressive strength increase markedly in first ~4 minutes after gelation?",options:["Water evaporates rapidly","Ethanol by-product forms","Crosslinking continues and network matures","Plasticizer leaches out"],correctAnswerIndex:2,explanation:"Calcium-alginate network continues organizing/strengthening after initial set."},{id:"imp-19",question:"You are preparing to take a preliminary impression using Impression Compound... it had become grainy, sticky, and unworkable. What is the primary cause of this degradation?",options:["Imbibition of water causing the filler to dissolve","Leaching out of the plasticizer","Polymerization of the resin matrix due to heat","Syneresis causing surface collapse"],correctAnswerIndex:1,explanation:"Leaching out of the plasticizer (stearic acid/stearin). Short reasoning: Prolonged hot-water immersion extracts/leaches the plasticizer → compound loses proper flow/cohesion → turns grainy and sticky."},{id:"imp-25",question:"A patient reports an intense burning sensation on their lips and alveolar ridge immediately after the insertion of a custom tray loaded with Zinc Oxide Eugenol (ZOE) impression paste. What is the most likely cause?",options:["Thermal shock from the setting reaction","The acidity of the impression material","Hypersensitivity to zinc oxide","Contact stomatitis due to eugenol"],correctAnswerIndex:3,explanation:"Contact stomatitis due to eugenol. Short reasoning: Eugenol is a phenolic compound that can irritate mucosa and trigger chemical burns/contact stomatitis, causing immediate burning."},{id:"imp-26",question:"In monophase technique, viscosity decreases during syringe injection due to:",options:["Low temperature in syringe","High shear rate in narrow tip","Ethanol by-product formation","Polymer chains shortening"],correctAnswerIndex:1,explanation:"High shear rate triggers shear thinning."},{id:"imp-30",question:"During a final impression with Addition Silicone (PVS), the material fails to set only in the area adjacent to a newly placed composite core build-up... What is the most likely chemical cause?",options:["Moisture contamination from the dentin.","Inhibition (poisoning) of the platinum catalyst by residual methacrylates/tertiary amines from the composite.","Reaction with the aluminum chloride hemostatic agent.","Thermal shock from the curing light."],correctAnswerIndex:1,explanation:"Inhibition of the platinum catalyst by residual methacrylates/amines. Justification: Addition silicone (PVS) sets by a platinum-catalyzed addition reaction. Certain contaminants can poison the platinum catalyst..."},{id:"imp-31",question:"The “snap removal” (quick jerk) technique is critical when removing viscoelastic impression materials because it:",options:["Increases the flow of the material into the sulcus.","Stops the chemical reaction immediately.","Maximizes elastic recovery and minimizes viscous flow (permanent deformation).","Prevents the tearing of thin sections."],correctAnswerIndex:2,explanation:"Maximizes elastic recovery and minimizes viscous flow (permanent deformation). Justification: Viscoelastic materials behave like both a spring (elastic) and a dashpot (viscous). If you remove the impression slowly..."},{id:"imp-35",question:"Why is Agar (Reversible Hydrocolloid) considered an excellent material for crown impressions, even though it requires special conditioning equipment...?",options:["It can be poured continuously for 7 days.","It is naturally hydrophilic and captures fine detail well in moist environments.","It is rigid enough to splint implants.","It has the highest tear strength of all impression materials."],correctAnswerIndex:1,explanation:"It is naturally hydrophilic and captures fine detail well in moist environments. Statement (key concept): Agar has a high water content..."},{id:"imp-37",question:"Manufacturers add surfactants to Addition Silicone (PVS). What is the main reason for adding these surfactants?",options:["To make the material completely resistant to sulfur/latex inhibition","To significantly shorten the setting time","To make gypsum slurry and oral moisture spread better","To markedly increase tear strength"],correctAnswerIndex:2,explanation:"To make gypsum slurry and oral moisture spread better. Statement (key concept): Standard PVS is hydrophobic..."},{id:"imp-42",question:"You are making an implant-level impression for a case with multiple impression copings that are not parallel. What is the primary disadvantage of using polyether as the impression material in this situation?",options:["The material will tear upon removal.","The material will distort permanently.","The high rigidity makes removal extremely difficult and may loosen the copings or tray.","The setting time is too fast to seat the tray."],correctAnswerIndex:2,explanation:"The high rigidity makes removal extremely difficult and may loosen the copings or tray. Statement (key concept): Polyether has a high modulus of elasticity (high stiffness/rigidity)..."},{id:"imp-45",question:"During a crown impression appointment, you need an elastomeric material that offers the least working time (very short “mix + load + seat” window) and then shows a distinct snap set, leaving minimal time for manipulation. Which elastomer typically has the shortest working time?",options:["Addition Silicone (PVS) — Fast set","Polyether","Condensation Silicone","Polysulfide"],correctAnswerIndex:1,explanation:"Polyether."},{id:"imp-46",question:"A border-molding impression is being made with Impression Compound. The tray is removed from the mouth before the compound has fully cooled to oral temperature. What is the most likely consequence?",options:["It will expand rapidly.","It will undergo plastic deformation (drag/distortion).","It will be too brittle and fracture.","It will adhere to the teeth."],correctAnswerIndex:1,explanation:"It will undergo plastic deformation (drag/distortion). Statement (key concept): Impression compound is a thermoplastic material..."},{id:"imp-new-2",question:"In alginate impression material, which ingredient makes up the largest percentage by weight of the powder (i.e., the main bulk/filler component)?",options:["Sodium alginate","Calcium sulfate","Diatomaceous earth","Trisodium phosphate"],correctAnswerIndex:2,explanation:"Diatomaceous earth is the main filler (~50–60% by weight). It provides bulk, strength, and improves handling but does not participate in the gel-forming reaction."}],Ki=[{id:"imp-8",question:"In cationic polymerization of polyether, which component functions as the initiator?",options:["Platinum salt","Stannous octoate","Aromatic sulfonate ester","Trisodium phosphate"],correctAnswerIndex:2,explanation:"Aromatic sulfonate ester generates cations that open aziridine rings, initiating polymerization."},{id:"imp-9",question:"Why can polysulfide show high Tear Energy despite being prone to distortion?",options:["It is very rigid (high modulus)","It produces ethanol by-product","It can elongate greatly (high λ) before tearing","It is hydrophilic and absorbs water"],correctAnswerIndex:2,explanation:"Tear Energy accounts for extension; polysulfide stretches a lot before tearing (high λ), though it may distort permanently."},{id:"imp-11",question:"Impression compound distortion due to “relaxation” is worsened mainly by:",options:["High hydrophilicity","Low thermal conductivity","High contact angle","Hydrogen gas evolution"],correctAnswerIndex:1,explanation:"Outer cools/hardens first while inside stays hot; later internal cooling causes contraction/stress → distortion (relaxation)."},{id:"imp-14",question:"Polyether stored in water swells (imbibition). What simultaneous process degrades properties?",options:["Ethanol evaporation","Leaching of water-soluble plasticizer","Platinum poisoning","Syneresis"],correctAnswerIndex:1,explanation:"Water uptake occurs while plasticizer leaches out, altering flexibility and accuracy."},{id:"imp-18",question:"In addition silicone reaction, which group reacts with the vinyl group?",options:["–OH terminal group","–SH group","Si–H group","Phosphate group"],correctAnswerIndex:2,explanation:"Si–H on polymethylhydrosiloxane adds across vinyl groups (Pt-catalyzed)."},{id:"imp-20",question:"To reduce hydrogen gas voids in gypsum casts from PVS, manufacturers add:",options:["Borax","Palladium","Trisodium phosphate","Potassium titanium fluoride"],correctAnswerIndex:1,explanation:"Noble metals (commonly palladium) act as hydrogen scavengers."},{id:"imp-21",question:"A dentist takes a diagnostic alginate impression... slowly “teases” and rocks the tray out... the abutment teeth are slightly wider and distorted compared to reality. What is the most likely cause of this distortion?",options:["The slow removal allowed the alginate to absorb saliva (imbibition).","The slow removal caused permanent deformation because alginate is viscoelastic.","The alginate tore internally because the tear strength was exceeded.","The slow removal caused syneresis (water loss) due to prolonged air exposure."],correctAnswerIndex:1,explanation:"The slow removal caused permanent deformation because alginate is viscoelastic. Short reasoning: Slow removal allows time-dependent viscous flow → permanent set → teeth on the cast appear distorted/wider."},{id:"imp-23",question:"In condensation silicone, the alkyl silicate primarily acts as:",options:["Plasticizer","Cross-linking agent","Hydrogen scavenger","Retarder"],correctAnswerIndex:1,explanation:"Alkyl silicate reacts with terminal –OH groups to create the 3D network."},{id:"imp-36",question:"Which disinfectant is commonly recommended for Zinc Oxide–Eugenol (ZOE) impression paste but is NOT typically preferred for hydrocolloids...?",options:["Alcohol immersion","2% Glutaraldehyde (Alkaline)","Boiling water","Chlorine compounds"],correctAnswerIndex:1,explanation:"2% Glutaraldehyde (Alkaline). Statement (key concept): Glutaraldehyde is effective for ZOE..."},{id:"imp-39",question:"Why is Potassium Sulfate added to the setting bath or formulation of Agar (reversible hydrocolloid)...?",options:["To counteract the retarding effect of borax/sol on the gypsum surface.","To increase the shelf life.","To improve taste.","To act as a retarder for the impression."],correctAnswerIndex:0,explanation:"To counteract the retarding effect of borax/sol on the gypsum surface. Statement (key concept): Borax in agar acts as a strengthener, but it can retard the setting of gypsum..."},{id:"imp-43",question:"A clinician places a ferric sulfate hemostatic agent around the gingival sulcus before making an impression with Addition Silicone (PVS). The area is not rinsed thoroughly and the impression is taken. What is the most likely outcome?",options:["It dissolves the filler particles.","The sulfur in the ferric sulfate inhibits the platinum catalyst.","The iron stains the impression black.","It accelerates the setting reaction violently."],correctAnswerIndex:1,explanation:"The sulfur in the ferric sulfate inhibits the platinum catalyst. Justification (why B is correct): If a hemostatic agent residue is left on the tooth/gingiva, it can interfere with PVS polymerization..."},{id:"imp-44",question:"After removing an elastomeric impression from a mouth with mild undercuts, you notice the impression shows shape change that does not fully rebound back (i.e., highest permanent deformation / lowest elastic recovery after strain). Which elastomer is most likely to show this behavior?",options:["Condensation Silicone","Polysulfide","Polyether","Addition Silicone (PVS)"],correctAnswerIndex:1,explanation:"Polysulfide. Statement (key concept): Permanent deformation in elastomers happens because the material has a viscous (flow) component..."}],Hu=`
# GYPSUM PRODUCTS (DENTAL) — Combined High-Yield Notes

## 1) What gypsum is + where it comes from

● Gypsum = calcium sulfate dihydrate (CaSO₄·2H₂O).  
IN A NUT SHELL ITS CALCIUM SULFATE WITH 2 WATER MOLECULE (DIHYDRATE FANCY WORDING )  
We heat it in 3 ways to get different size shape particles , when we heat it the gypsum loses one water molecule and becomes hemihydrate and then we add water again to make the same gypsum back ( pretty basic stuff lol ) if we heat it too much it loses all water molecule and it becomes anhydrate

---

## 2) Why dentistry uses it (applications)

Main dental uses:  
● **Study models/casts** for oral & maxillofacial structures  
● <span style="color: red">**Dies**</span><span style="color: red"> for restorations</span>  
● **Mounting casts / denture mold/flasking**  
● <span style="color: red">**Investment**</span><span style="color: red"> (gypsum + refractory fillers like silica → heat-resistant mold for casting metals)</span>

**Definitions**  
● **Model** = replica of several teeth + soft tissues / edentulous arch  
● **Die** = replica of a single tooth

**Requirements of a good cast material (slides)**  
1. Dimensional accuracy  
2. Adequate mechanical properties  
3. Must be **fluid at pouring** to capture fine detail  
4. **Low contact angle** (better wetting → fewer surface voids)  
5. <span style="color: red">Strong + hard enough to resist fracture/abrasion (wax carving)</span>  
6. Compatible with other materials

---

## 3) Production (<span style="color: red">calcination</span>) — how powders are made

![Image](assets/gypsum_img_3_1.png)

**Key idea**  
Dental gypsum powders are **hemihydrates** made by heating gypsum (dihydrate). When mixed with water, they **revert back to dihydrate and set**.

**Calcination reaction (slides)**  
**2CaSO₄·2H₂O → (CaSO₄)₂·H₂O + 3H₂O**

**Comparison of Types:**

### β-hemihydrate (Plaster of Paris / dental plaster)  
● Produced in **open containers/kettle** (~120°C; your text: 110–130°C).  
● Particles are **irregular, porous (“spongy”)** → need **more water** → weaker.

### α-hemihydrate (Dental stone)  
● Produced in a **wet environment/steam pressure** (autoclave/kettle/vat/rotary kiln).  
● Particles are **denser, prismatic/regular** → need **less water** → stronger.

### Modified α-hemihydrate (Die stone; Type IV/V)  
● produced under pressure in **30% CaCl₂** or with **>1% sodium succinate**, then washed with hot water to remove residues.  
● boiling gypsum in salt solution like **CaCl₂** to get even less porosity.

### Overheating vs underheating  
● **Overheating → anhydrite (CaSO₄)**  
● **Underheating → residual dihydrate remains**  
Both **strongly affect setting characteristics**.

---

## 4) Setting of gypsum (what happens after mixing with water)

✅ **Critical question answer :**  
When hemihydrate powder is mixed with water → it **sets back to dihydrate** (solid gypsum) and releases **heat** (exothermic).

**Three theories**  
● Colloidal theory  
● Hydration theory  
● ✅ **Most accepted: Dissolution–precipitation theory**

**Dissolution–precipitation (high yield steps)**  
1. Hemihydrate + water → workable suspension  
2. Hemihydrate dissolves → saturated Ca²⁺ and SO₄²⁻ solution  
3. Solution becomes supersaturated with dihydrate → **dihydrate precipitates**  
4. More hemihydrate dissolves as dihydrate keeps precipitating → crystals grow & interlock until reaction ends

**Why this works:**  
Hemihydrate solubility ≈ **4×** dihydrate near room temperature.  
Because **dihydrate is much less soluble in water than hemihydrate**, the water can’t “hold” it in solution—so it **comes out of the water as crystals** and sets. And when water evaporates we are left with hard dental stone/plaster

**Extra:** Set gypsum often doesn’t reach 100% conversion quickly; some unreacted hemihydrate may remain

![Image](assets/gypsum_img_5_1.png)

<video src="/assets/Living_microscopic_scene_1080p_202601110631.mp4"></video>

| Type | Name | Description & Particle | W/P Ratio | Primary Use |
| :--- | :--- | :--- | :--- | :--- |
| **I** | **Impression Plaster** | β-hemihydrate + chemicals. Very porous. | 0.50 – 0.75 | *Rarely used*. Final impressions for edentulous ridges. |
| **II** | **Model Plaster** | β-hemihydrate. Irregular, spongy, porous particles. | 0.45 – 0.50 | Study models, mounting casts on articulators. (White color). |
| **III** | **Dental Stone** | α-hemihydrate (Hydrocal). Prismatic, regular, less porous. | 0.28 – 0.30 | Working casts for full dentures, diagnostic casts. (Yellow color). |
| **IV** | **Die Stone (High Strength, Low Expansion)** | Modified α-hemihydrate (Densite). Dense, cuboidal particles. | 0.22 – 0.24 | **Dies** for crowns, bridges, and inlays. Hard surface resistant to abrasion. |
| **V** | **Die Stone (High Strength, High Expansion)** | Modified α-hemihydrate. Highest expansion (0.1% - 0.3%). | 0.18 – 0.22 | Dies for **Base Metal** castings (because base metals shrink more and need the mold to expand more). |

---

## 5) How to know it has set

● <span style="color: red">**Loss of gloss test**</span><span style="color: red"> (surface shine disappears as water is consumed)</span>  
● **Gillmore test**  
  ○ Initial set: light needle (2.12 mm tip, 113.4 g) no longer penetrates  
  ○ Final set: heavy needle (1.06 mm tip, 453.6 g) leaves barely visible mark  
● **Vicat test** (Vicat penetrometer: setting time when needle no longer reaches bottom)

![Image](assets/gypsum_img_6_1.png)

**A) Operator-controlled factors (under the technician /dentist controlled)**

**1) Temperature**  
● The effect is **small/variable overall**.  
● ↑ Temperature can **increase dissolution** of hemihydrate **but** it can also **reduce the driving force for precipitation/crystallization**, so the net effect may be minimal or even slower at higher temps.

**<span style="color: red">2) Water/Powder ratio (W/P)</span>**

**↑ W/P ratio does TWO things**:  
● **↑ W/P → slower setting** (fewer nuclei per unit volume → slower crystal interlocking)

![Image](assets/gypsum_img_7_1.png)

● **↑ W/P → ↓ setting expansion** (crystals are farther apart, so there’s less crystal “pushing/impingement,”

**3) Mixing (spatulation)**  
● **More/longer/faster mixing → faster setting**  
● Reason: mixing **breaks forming crystals** into smaller pieces → creates **more nuclei** → faster crystallization and earlier set.  
● <span style="color: red">(Within limits—extreme overmixing can harm final structure/strength.)</span>

**B) Powder-related factors (material itself)**

**1) Unconverted dihydrate contamination**  
● **Acts as nuclei (“seed crystals”)** → **accelerates** setting.

**2) Anhydrite content**  
● **Anhydrite reacts quickly with water** → can cause **marked acceleration** (very rapid set).

**3) Age / storage conditions**  
● Moisture exposure can partially hydrate powder → changes nuclei content and surface coating → **alters setting time** (can speed up or slow down depending on extent).

**C) Chemical modifiers**

**Accelerators**  
● **<span style="color: red">Potassium sulfate</span>** (especially effective at **>2%**) → speeds setting.  
● **Slurry water** (from model trimmer): contains **fine gypsum particles** → extra nuclei → **accelerates**.

**Retarders**  
● **<span style="color: red">Borax</span>**: common retarder (mechanism often described as interfering with crystal growth/setting).

**One-line memory rule**  
More nuclei = faster set (↑ mixing, slurry water, dihydrate contamination, some salts)  
Less nuclei density = slower set (↑ W/P)

**Accelerators (make it set faster)**  
● **<span style="color: red">K₂SO₄ (Potassium sulfate)</span>**: strong accelerator (commonly used; effective at higher %).  
● **Na₂SO₄ (Sodium sulfate)**: accelerator; effect depends on concentration.  
● **Gypsum slurry / terra alba / seed crystals**: provides nuclei → faster set.  
● **NaCl (LOW concentration ~0.5–1%)**: accelerator.

**Retarders (make it set slower)**  
● **NaCl (HIGH concentration ~10%)**: strong retarder.  
● **<span style="color: red">Borax</span>**: common retarder; also lowers early strength.  
● **Sodium citrate / sodium acetate**: retarders (dose-dependent).  
● <span style="color: red">**Blood/saliva/organic contamination**: retards (bad contamination). If the impression is not washed it can contaminate the gypsum</span>

---

## 7) Setting expansion (normal + hygroscopic)

**Why expansion happens**  
Even though dihydrate is denser (so you’d expect shrinkage), the **growing dihydrate crystals intermesh and push outward** → “crystal thrust” → expansion.

add:  
● Expansion is linked to **growing crystals**, and if placed in water at initial set → expansion increases (hygroscopic expansion).

**Hygroscopic expansion**

![Image](assets/gypsum_img_10_1.png)

● Setting **under water** → water is replenished → crystals grow more freely before intermeshing stops them → **greater expansion**.

**Controlling expansion**  
● To keep accuracy, keep expansion low; manufacturer additives that control setting time also **reduce setting expansion** → called **anti-expansion agents**.  
● W/P ratio and mixing time affect expansion, but **<span style="color: red">manufacturer chemicals are the most effective control</span>**<span style="color: red">.</span>  
● examples:  
  ○ Lower W/P + longer mixing increase expansion  
  ○ **4% potassium sulfate** can reduce expansion (example value shown).

---

## 8) Strength of set gypsum (wet vs dry) + what controls strength

**Wet vs dry strength**  
● **Wet/green strength:** excess water still present → weaker

**Practical exam / clinic timings**  
● **0–1 hour:** Cast is still **wet/green** (excess water in pores) → weaker/softer.  
● **~8–24 hours (room air-drying):** Biggest jump toward **dry strength** happens here. By **~24 hours**, gypsum is usually considered **“dry strength” range** for practical purposes (much harder/stronger than at 1 hour).  
● **Up to ~7 days:** Strength can continue to rise and may **roughly double** compared with the 1-hour wet strength (depends on product and drying conditions).

**If you want one line to memorize**  
**“Green strength = first hour; most drying strength gain occurs by ~24 hours; further increase continues up to about a week.”**

● **Dry strength:** after drying → can be **2× or more higher**

**Main determinants**  
● Strength depends mainly on **porosity** and **time allowed to dry**.

**<span style="color: red">W/P ratio effect</span>**  
● ↑W/P → ↑porosity → ↓dry strength (compressive strength inversely proportional to W/P).

**<span style="color: red">Manipulation effects</span>**  
Increasing mixing time increases strength up to a limit (~equivalent to hand mixing 1 min), but **overmixing breaks the crystal network** → weaker.  
● Accelerators/retarders can lower wet and dry strength.

**Drying speed**  
● **Microwave irradiation** can speed drying; some studies show possible dimensional change.

**<span style="color: red">Surface hardness / abrasion</span>**  
● Surface hardness relates to compressive strength and increases faster than bulk strength.  
● Abrasion resistance can increase when impregnated with epoxy resins; hardness improved by mixing with hardening solutions (e.g., colloidal silica mentioned).

---

## 9) <span style="color: red">Types of gypsum products (ISO/ADA 5 types)</span>

Slides list ISO types:  
1. **Type I**: Dental plaster (impression)  
2. **Type II**: Dental plaster (model)  
3. **Type III**: Dental stone (die/model)  
4. **Type IV**: Die stone (high strength, low expansion)  
5. **Type V**: Die stone (high strength, high expansion)

clinical logic:  
● Type III for denture casts (tolerates slight expansion)  
● Type IV for dies needing strength + low expansion  
● Type V has higher expansion to compensate higher casting shrinkage of newer base-metal alloys; avoid for inlays/onlays because fit may become too tight (from your text)

---

## 10) Manipulation (how to get a clean cast) — HAND mixing (slides) <span style="color: red">skip</span>

● Use a clean, scratch-free rubber/plastic bowl (~130 mm top diameter) + stiff spatula.  
● Add measured water, **add powder slowly over ~10 s**, mix/spatulate ~**60 s** (circular/figure-8).  
● Clean the bowl after each mix because residues alter working/setting.

**Reduce porosity (slides) < — <span style="color: green">do this</span>**  
● Air can be incorporated during mixing → porosity/weakness  
Best: vacuum mixing (under vacuum) + vibration during pouring.  
● **Vacuum mixing** removes air from the mix (biggest reduction in porosity).  
● **Vibration** then helps the mix flow into details and releases any remaining bubbles while pouring.

---

## 11) Storage + cast care  
● Hemihydrate absorbs moisture from air; high humidity can start partial hydration → changes setting time.  
● Store in a dry** atmosphere**; seal in a moisture-proof container.  
● Cast soaking: safest in **calcium-sulfate–saturated water** (with gypsum debris at bottom)

---

## <span style="color: red">Types of dental gypsum (Type I–V) — what each is used for + why it fits that job</span>

The **reason types exist** is mainly differences in:  
● **Crystal form/packing** (β vs α vs modified α)  
● **Water/powder (W/P) ratio needed**  
● Resulting **porosity → strength/hardness**  
● **Setting expansion**

Lower W/P → **less porosity → stronger + harder**, but usually **more technique-sensitive**.

---

## Type I — Impression Plaster

**Where used**  
● Historically for **impressions** (rare today)

**Why it was suitable**  
● **Very low setting expansion** (so impression stays accurate)  
● Can be formulated to set relatively fast

**Why it’s NOT used now**  
● Sets **rigid** and fractures/locks in undercuts → difficult to remove safely from teeth/soft tissue undercuts.  
● Replaced by elastomers/hydrocolloids (flexible).

**Key idea:** Impression materials need **accuracy + safe removal**; gypsum is accurate but **too rigid**.

---

## Type II — Model Plaster (Laboratory plaster)

**Where used**  
● **Flasking denture processing**  
● **Mounting casts** on articulators (mounting plasters are basically fast Type II style)  
● Situations where **high strength is not critical**

**What makes it suitable**  
● **β-hemihydrate** → needs **higher W/P** → ends up more porous → **lower strength**  
● That sounds “bad”, but it’s useful because:  
  ○ It’s **easy to trim and carve**  
  ○ Good for “supporting” roles (e.g., filling a flask) where accuracy/strength demands are moderate  
● Usually **white** (helpful contrast in lab)

**Key idea:** Type II is chosen when you want a cast material that’s **cheap, easy to handle/trim**, and strength isn’t the top priority.

---

## Type III — Dental Stone (Stone for casts)

**Where used**  
● **Diagnostic/study casts**  
● **Working casts for complete dentures** (soft tissue casts)  
● Many routine lab models

**What makes it suitable**  
● **α-hemihydrate** (denser, prismatic crystals) → requires **lower W/P** than plaster  
● Lower W/P → **less porosity** → **higher strength and hardness**  
● **Setting expansion is moderate/controlled**, usually acceptable for soft-tissue denture casts.

**Why not Type II here?**  
● Study/working casts need to resist **chipping, abrasion**, and handling.  
● Type II breaks more easily.

**Key idea:** Type III is the “everyday strong cast” — strong enough for routine models and denture casts.

---

## Type IV — High-Strength, Low-Expansion Die Stone (Die stone)

**Where used**  
● **Dies** for crowns, bridges, inlays/onlays (especially where margins must be sharp)  
● Any case requiring **high accuracy + high strength + abrasion resistance+low expansion**

**What makes it suitable**  
● Made from **modified α-hemihydrate** → particles are **more regular/blocky** and pack very efficiently  
● Needs **very low W/P**  
● Gives:  
  ○ **High compressive strength**  
  ○ **High surface hardness / abrasion resistance** (important because you carve wax against it)  
  ○ **<span style="color: red">Low setting expansion</span>** (critical so restorations don’t end up oversized)

**Key idea:** Type IV is chosen when you need a die that will **not wear**, will keep **sharp margins**, and will have **minimal expansion** for accuracy.

---

## Type V — High-Strength, High-Expansion Die Stone

**Where used**  
● Dies for restorations made from **base-metal alloys** (or cases where you need extra expansion to offset larger casting shrinkage)  
● When the lab’s total expansion is otherwise insufficient

**What makes it suitable**  
● Even **lower W/P** than Type IV → **very high strength**  
● But formulated to have **higher setting expansion** than Type IV

**Why you avoid it for some work**  
● For **inlays/onlays** (very precision-fit) the extra expansion can make restorations **too tight**.

**Key idea:** Type V is used when you need more expansion on purpose (to compensate for metal shrinkage), not because it’s “better” universally.

---

## Quick “pick the type” logic (exam style)

● Need something **easy to trim / low strength acceptable** → **Type II**  
● Need a **routine cast/study model** → **Type III**  
● Need a **die with sharp margins high strength + minimal expansion** → **Type IV**  
● Need a **die but extra expansion needed (base-metal casting)** → **Type V**  
● Impression gypsum (rare) → **Type I**
`,Gu=["Gypsum = Calcium sulfate Dihydrate; Heated to Hemihydrate (powder).","Type II (Plaster) = Beta-hemihydrate (Spongy/Porous, high W/P, weak).","Type III/IV (Stone) = Alpha-hemihydrate (Prismatic/Dense, low W/P, strong).","Retarders: BORAX, Blood, Citrates.","Accelerators: POTASSIUM SULFATE, Slurry water.","Hygroscopic Expansion: Setting under water = MORE expansion.","Strength: Depends on W/P ratio (More water = More porosity = Weaker)."],Fu=[{id:"gyp-new-1",question:"Gypsum calcined in open containers (dry heating) mainly produces:",options:["α-hemihydrate","β-hemihydrate","Modified α-hemihydrate","Orthorhombic anhydrite"],correctAnswerIndex:1,explanation:""},{id:"gyp-new-2",question:"Gypsum heated in a wet environment / steam pressure (autoclave, kettle/vat/rotary kiln with moisture) mainly produces:",options:["α-hemihydrate","β-hemihydrate","Modified α-hemihydrate","Hexagonal anhydrite"],correctAnswerIndex:0,explanation:""},{id:"gyp-new-3",question:"Gypsum calcined under pressure in ~30% CaCl₂ solution (or with sodium succinate), then washed produces:",options:["α-hemihydrate","β-hemihydrate","Modified α-hemihydrate","Dihydrate"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-4",question:"The manufacturing process used to make dental gypsum powder by heating gypsum (removing part of its crystal water) is called:",options:["Hydration","Dehydration","Calcination","Setting"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-5",question:"The setting process where hemihydrate dissolves and dihydrate forms as crystals is called:",options:["Fibers","Plates","Spherulites","Bubbles"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-6",question:"Overheating gypsum during calcination mainly forms:",options:["Residual dihydrate","Hemihydrate only","Anhydrite (CaSO₄)","Calcium hydroxide"],correctAnswerIndex:2,explanation:"Overheating → anhydrite, which changes setting behavior."},{id:"gyp-new-7",question:"Underheating during calcination leads to:",options:["Pure anhydrite","Residual dihydrate remaining","Complete hemihydrate conversion","No effect on setting"],correctAnswerIndex:1,explanation:"Residual dihydrate stays → acts as nuclei → alters/usually speeds set."},{id:"gyp-new-8",question:"β-hemihydrate (plaster of Paris) has crystals that are:",options:["Dense, prismatic, regular","Spongy, irregular, porous","Cuboidal, very smooth","Glass-like, non-porous"],correctAnswerIndex:1,explanation:"β-hemihydrate needs more water → more porosity → weaker."},{id:"gyp-new-9",question:"α-hemihydrate (dental stone) is stronger mainly because it:",options:["Needs more water","Has more porosity","Needs less water (lower W/P)","Produces fewer crystals"],correctAnswerIndex:2,explanation:"Lower W/P → less porosity → higher strength/hardness."},{id:"gyp-new-10",question:"Most accepted setting mechanism of gypsum is:",options:["Colloidal sol–gel","Hydration only","Dissolution–precipitation","Dissolution–-Polymerization"],correctAnswerIndex:2,explanation:"Hemihydrate dissolves then dihydrate precipitates as crystals."},{id:"gyp-new-11",question:"Gypsum sets because:",options:["Dihydrate is more soluble and stays dissolved","Dihydrate is less soluble and precipitates as crystals","Hemihydrate becomes gas","Water evaporates first, then sets"],correctAnswerIndex:1,explanation:"Dihydrate is less soluble, so it comes out as crystals → interlocks → sets."},{id:"gyp-new-12",question:"During gypsum setting, dihydrate starts forming even while hemihydrate is still dissolving. This happens because:",options:["Hemihydrate turns into dihydrate without dissolving","Dihydrate is more soluble, so it forms in solution first","Water evaporates and forces crystals to appear","A solution saturated with hemihydrate is supersaturated with respect to dihydrate, so dihydrate precipitates out"],correctAnswerIndex:3,explanation:"Hemihydrate dissolves to a higher ion level; that same solution is too concentrated for dihydrate, so dihydrate precipitates and setting proceeds."},{id:"gyp-new-13",question:"The MOST effective operator change to make gypsum set faster (without adding chemicals) is:",options:["Increase W/P ratio","Use colder water","Increase spatulation speed/time (within limits)","Let the mix stand longer before pouring"],correctAnswerIndex:2,explanation:"More/faster mixing creates more nuclei (by breaking early crystals) → faster crystallization → faster set. Increasing W/P slows set."},{id:"gyp-new-14",question:"(harder). Compared with setting in air, the key early-stage difference when gypsum sets under water is:",options:["The hemihydrate-to-dihydrate reaction stops earlier","The solution never becomes supersaturated with respect to dihydrate","The particle/crystal spacing is maintained during early hydration instead of being pulled closer","The final product contains a different calcium sulfate hydrate"],correctAnswerIndex:2,explanation:"In air, early hydration reduces free water around particles, so they get pulled closer; under water, water is continuously available so that early “pulling closer” is reduced → crystals can grow longer before impingement → greater expansion."},{id:"gyp-new-15",question:". Increasing the water/powder (W/P) ratio generally results in:",options:["Lower strength (more porosity)","Longer setting time","Lower setting expansion","All of the above"],correctAnswerIndex:3,explanation:""}],Bu=[{id:"gyp-new-16",question:"Increasing W/P ratio does which TWO?",options:["Faster set + ↑ expansion","Slower set + ↓ expansion","Faster set + ↓ expansion","Slower set + ↑ expansion"],correctAnswerIndex:1,explanation:"↑W/P → nuclei farther apart → slower set + less crystal thrust → ↓ expansion."},{id:"gyp-new-17",question:"Increasing spatulation (mixing) generally:",options:["Slows setting","Speeds setting","No change","Prevents crystals forming"],correctAnswerIndex:1,explanation:"More mixing breaks crystals → more nuclei → faster set."},{id:"gyp-new-18",question:"Overmixing (excessive spatulation) of gypsum mix can cause:",options:["Always increases final strength","Shorter working time and reduced final strength","Eliminates porosity completely","Stops the exothermic reaction"],correctAnswerIndex:1,explanation:""},{id:"gyp-new-19",question:"To obtain the most accurate, least porous die stone mix, the BEST mixing method is:",options:["Hand spatulation only (no mechanical mixing)","Mixing in an amalgamator","Vibrating the bowl during the entire mixing stage","Vacuum mechanical mixing"],correctAnswerIndex:3,explanation:"Vacuum removes air from mix; vibration releases remaining bubbles."},{id:"gyp-new-20",question:"Most common accelerator used in gypsum:",options:["Borax","Potassium sulfate","Sodium citrate","Blood contamination"],correctAnswerIndex:1,explanation:"K₂SO₄ is a strong, common accelerator."},{id:"gyp-new-21",question:"Slurry water accelerates setting because it:",options:["Dissolves crystals","Adds heat","Provides nuclei (fine gypsum particles)","Removes calcium"],correctAnswerIndex:2,explanation:"Fine particles act as seed crystals."},{id:"gyp-new-22",question:"NaCl at low concentration (~0.5–1%) acts as:",options:["Strong retarder","Accelerator","Neutral","Anti-expansion only"],correctAnswerIndex:1,explanation:"Low NaCl can accelerate; high conc retards."},{id:"gyp-new-23",question:"Borax is mainly a:",options:["Accelerator","Retarder","Wetting agent","Binder"],correctAnswerIndex:1,explanation:"Borax retards gypsum set and reduces early strength."},{id:"gyp-new-24",question:"Setting expansion occurs mainly because:",options:["Dihydrate is less dense than hemihydrate","Water expands","Growing crystals interlock and push outward","Air bubbles expand"],correctAnswerIndex:2,explanation:"Intermeshing crystal growth creates outward force → expansion."},{id:"gyp-new-25",question:"Hygroscopic expansion is greater because:",options:["Gypsum dissolves under water","Immersion water replenishes water","Heat is higher under water","It becomes anhydrite"],correctAnswerIndex:1,explanation:"Continuous water supply → freer/longer growth → more thrust → more expansion."}],Uu=[{id:"gyp-new-49",question:"The correct material for a die that will be exposed to porcelain firing temperatures is:",options:["Type IV stone","Type V stone","Refractory die/model material (not regular gypsum)","Alginate"],correctAnswerIndex:2,explanation:"Regular gypsum dehydrates/breaks down at high firing temperatures."},{id:"gyp-new-50",question:"Best investment type for casting a gold inlay/onlay (low-fusing noble alloy):",options:["Gypsum-bonded investment","Phosphate-bonded investment","Alginate investment","Zinc-oxide eugenol investment"],correctAnswerIndex:0,explanation:"Gold alloys traditionally use gypsum-bonded investments."},{id:"gyp-new-51",question:"Best investment type for casting base-metal crowns/metal-ceramic frameworks (high-temp):",options:["Gypsum-bonded investment","Phosphate-bonded investment","Zinc phosphate cement","Impression plaster"],correctAnswerIndex:1,explanation:`High-temp alloys need phosphate-bonded.
Waxes correlation (inlay wax logic)`},{id:"gyp-new-52",question:"While carving an inlay wax pattern, the die surface must resist wear from instruments. This property is mainly provided by:",options:["High setting expansion","High surface hardness/abrasion resistance of Type IV stone","High W/P ratio","Wet/green strength"],correctAnswerIndex:1,explanation:"Wax carving needs a hard die so margins stay sharp."},{id:"gyp-new-53",question:"Type V stone is generally AVOIDED for inlays/onlays because:",options:["It is too weak","It dissolves in water","Higher expansion can make the restoration fit too tight","It cannot be poured into impressions"],correctAnswerIndex:2,explanation:'Type V Stone has high setting expansion (0.1%–0.3%). While good for base-metal crowns to offset shrinkage, for precision inlays/onlays, this extra expansion results in a restoration that is effectively "too large" for the cavity, leading to a fit that is too tight.'}],Wu=[{id:"gyp-new-1",question:"Gypsum calcined in open containers (dry heating) mainly produces:",options:["α-hemihydrate","β-hemihydrate","Modified α-hemihydrate","Orthorhombic anhydrite"],correctAnswerIndex:1,explanation:""},{id:"gyp-new-2",question:"Gypsum heated in a wet environment / steam pressure (autoclave, kettle/vat/rotary kiln with moisture) mainly produces:",options:["α-hemihydrate","β-hemihydrate","Modified α-hemihydrate","Hexagonal anhydrite"],correctAnswerIndex:0,explanation:""},{id:"gyp-new-3",question:"Gypsum calcined under pressure in ~30% CaCl₂ solution (or with sodium succinate), then washed produces:",options:["α-hemihydrate","β-hemihydrate","Modified α-hemihydrate","Dihydrate"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-4",question:"The manufacturing process used to make dental gypsum powder by heating gypsum (removing part of its crystal water) is called:",options:["Hydration","Dehydration","Calcination","Setting"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-5",question:"The setting process where hemihydrate dissolves and dihydrate forms as crystals is called:",options:["Fibers","Plates","Spherulites","Bubbles"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-6",question:"Overheating gypsum during calcination mainly forms:",options:["Residual dihydrate","Hemihydrate only","Anhydrite (CaSO₄)","Calcium hydroxide"],correctAnswerIndex:2,explanation:"Overheating → anhydrite, which changes setting behavior."},{id:"gyp-new-7",question:"Underheating during calcination leads to:",options:["Pure anhydrite","Residual dihydrate remaining","Complete hemihydrate conversion","No effect on setting"],correctAnswerIndex:1,explanation:"Residual dihydrate stays → acts as nuclei → alters/usually speeds set."},{id:"gyp-new-8",question:"β-hemihydrate (plaster of Paris) has crystals that are:",options:["Dense, prismatic, regular","Spongy, irregular, porous","Cuboidal, very smooth","Glass-like, non-porous"],correctAnswerIndex:1,explanation:"β-hemihydrate needs more water → more porosity → weaker."},{id:"gyp-new-9",question:"α-hemihydrate (dental stone) is stronger mainly because it:",options:["Needs more water","Has more porosity","Needs less water (lower W/P)","Produces fewer crystals"],correctAnswerIndex:2,explanation:"Lower W/P → less porosity → higher strength/hardness."},{id:"gyp-new-10",question:"Most accepted setting mechanism of gypsum is:",options:["Colloidal sol–gel","Hydration only","Dissolution–precipitation","Dissolution–-Polymerization"],correctAnswerIndex:2,explanation:"Hemihydrate dissolves then dihydrate precipitates as crystals."},{id:"gyp-new-11",question:"Gypsum sets because:",options:["Dihydrate is more soluble and stays dissolved","Dihydrate is less soluble and precipitates as crystals","Hemihydrate becomes gas","Water evaporates first, then sets"],correctAnswerIndex:1,explanation:"Dihydrate is less soluble, so it comes out as crystals → interlocks → sets."},{id:"gyp-new-12",question:"During gypsum setting, dihydrate starts forming even while hemihydrate is still dissolving. This happens because:",options:["Hemihydrate turns into dihydrate without dissolving","Dihydrate is more soluble, so it forms in solution first","Water evaporates and forces crystals to appear","A solution saturated with hemihydrate is supersaturated with respect to dihydrate, so dihydrate precipitates out"],correctAnswerIndex:3,explanation:"Hemihydrate dissolves to a higher ion level; that same solution is too concentrated for dihydrate, so dihydrate precipitates and setting proceeds."},{id:"gyp-new-13",question:"The MOST effective operator change to make gypsum set faster (without adding chemicals) is:",options:["Increase W/P ratio","Use colder water","Increase spatulation speed/time (within limits)","Let the mix stand longer before pouring"],correctAnswerIndex:2,explanation:"More/faster mixing creates more nuclei (by breaking early crystals) → faster crystallization → faster set. Increasing W/P slows set."},{id:"gyp-new-14",question:"(harder). Compared with setting in air, the key early-stage difference when gypsum sets under water is:",options:["The hemihydrate-to-dihydrate reaction stops earlier","The solution never becomes supersaturated with respect to dihydrate","The particle/crystal spacing is maintained during early hydration instead of being pulled closer","The final product contains a different calcium sulfate hydrate"],correctAnswerIndex:2,explanation:"In air, early hydration reduces free water around particles, so they get pulled closer; under water, water is continuously available so that early “pulling closer” is reduced → crystals can grow longer before impingement → greater expansion."},{id:"gyp-new-15",question:". Increasing the water/powder (W/P) ratio generally results in:",options:["Lower strength (more porosity)","Longer setting time","Lower setting expansion","All of the above"],correctAnswerIndex:3,explanation:""},{id:"gyp-new-16",question:"Increasing W/P ratio does which TWO?",options:["Faster set + ↑ expansion","Slower set + ↓ expansion","Faster set + ↓ expansion","Slower set + ↑ expansion"],correctAnswerIndex:1,explanation:"↑W/P → nuclei farther apart → slower set + less crystal thrust → ↓ expansion."},{id:"gyp-new-17",question:"Increasing spatulation (mixing) generally:",options:["Slows setting","Speeds setting","No change","Prevents crystals forming"],correctAnswerIndex:1,explanation:"More mixing breaks crystals → more nuclei → faster set."},{id:"gyp-new-18",question:"Overmixing (excessive spatulation) of gypsum mix can cause:",options:["Always increases final strength","Shorter working time and reduced final strength","Eliminates porosity completely","Stops the exothermic reaction"],correctAnswerIndex:1,explanation:""},{id:"gyp-new-19",question:"To obtain the most accurate, least porous die stone mix, the BEST mixing method is:",options:["Hand spatulation only (no mechanical mixing)","Mixing in an amalgamator","Vibrating the bowl during the entire mixing stage","Vacuum mechanical mixing"],correctAnswerIndex:3,explanation:"Vacuum removes air from mix; vibration releases remaining bubbles."},{id:"gyp-new-20",question:"Most common accelerator used in gypsum:",options:["Borax","Potassium sulfate","Sodium citrate","Blood contamination"],correctAnswerIndex:1,explanation:"K₂SO₄ is a strong, common accelerator."},{id:"gyp-new-21",question:"Slurry water accelerates setting because it:",options:["Dissolves crystals","Adds heat","Provides nuclei (fine gypsum particles)","Removes calcium"],correctAnswerIndex:2,explanation:"Fine particles act as seed crystals."},{id:"gyp-new-22",question:"NaCl at low concentration (~0.5–1%) acts as:",options:["Strong retarder","Accelerator","Neutral","Anti-expansion only"],correctAnswerIndex:1,explanation:"Low NaCl can accelerate; high conc retards."},{id:"gyp-new-23",question:"Borax is mainly a:",options:["Accelerator","Retarder","Wetting agent","Binder"],correctAnswerIndex:1,explanation:"Borax retards gypsum set and reduces early strength."},{id:"gyp-new-24",question:"Setting expansion occurs mainly because:",options:["Dihydrate is less dense than hemihydrate","Water expands","Growing crystals interlock and push outward","Air bubbles expand"],correctAnswerIndex:2,explanation:"Intermeshing crystal growth creates outward force → expansion."},{id:"gyp-new-25",question:"Hygroscopic expansion is greater because:",options:["Gypsum dissolves under water","Immersion water replenishes water","Heat is higher under water","It becomes anhydrite"],correctAnswerIndex:1,explanation:"Continuous water supply → freer/longer growth → more thrust → more expansion."},{id:"gyp-new-26",question:"The initial strength of a gypsum cast is termed:",options:["Dry strength","Green (wet) strength","Compressive strength at 24 hours",`Hygroscopic strength

water occupies spaces between gypsum crystals, so crystals don’t contact and interlock tightly, making the cast weak initially.
When the cast dries, the water leaves → crystals come into closer contact → strength (dry strength) increases significantly.`],correctAnswerIndex:1,explanation:""},{id:"gyp-new-27",question:"At about 45–60 minutes after mixing gypsum, the cast’s strength is best described as:",options:["Dry strength (maximum strength)","Green/wet strength (initial strength)","Hygroscopic expansion strength",`Final compressive strength after 24 hours

Option 1`],correctAnswerIndex:1,explanation:""},{id:"gyp-new-28",question:"Separation of a gypsum cast from an impression is best done when the cast has:",options:["Completed the initial reaction phase","Developed adequate rigidity to resist distortion on removal","Achieved maximum hardness",`Finished all dimensional change

Option 2`],correctAnswerIndex:1,explanation:""},{id:"gyp-new-29",question:"The most appropriate stage to separate a gypsum cast from the impression is when it has:",options:["Just begun to thicken","Attained sufficient set to permit handling without damage","Become completely moisture-free",`Started hygroscopic expansion

Option 3`],correctAnswerIndex:1,explanation:""},{id:"gyp-new-30",question:"Under normal conditions, the earliest recommended time window to separate a gypsum cast is approximately:",options:["5–10 minutes","15–20 minutes","45–60 minutes","24 hours"],correctAnswerIndex:2,explanation:""},{id:"gyp-new-31",question:"Most practical “dry strength range” is reached around:",options:["5 minutes","1 hour","~24 hours (air drying)","10 days only"],correctAnswerIndex:2,explanation:"Big strength gain occurs by 8–24 h; continues up to ~1 week."},{id:"gyp-new-32",question:"Safe soaking of gypsum cast is best done in:",options:["Running tap water","Distilled water only","Water saturated with calcium sulfate (with gypsum debris)","Hot boiling water"],correctAnswerIndex:2,explanation:`Unsaturated water dissolves gypsum → loss of dimensions.
Correlation MCQs (Inlay wax / Impression materials / Investments / “Best gypsum property”)`},{id:"gyp-new-33",question:"For carving an inlay wax pattern, the best gypsum type for the working replica is:",options:["Type II model plaster","Type III stone","Type IV high-strength low-expansion stone","Type I impression plaster"],correctAnswerIndex:2,explanation:"Inlay wax needs hard, abrasion-resistant, low-expansion replica for sharp margins → Type IV."},{id:"gyp-new-34",question:`(Ceramic restoration)
In fabrication of a metal-ceramic(PFM)/PURE CERAMIC/GOLD ) restoration, gypsum is MOST commonly used as:`,options:["A refractory die that can be placed directly in the porcelain firing furnace","A high-strength die/cast material (Type IV stone) for wax patterning and margin finishing before investing","The binder of phosphate-bonded investment used for high-temperature casting","The final coping material that remains under porcelain after firing"],correctAnswerIndex:1,explanation:"For ceramic restorations, gypsum (especially Type IV die stone) is used to make an accurate, hard die/cast for wax-up and margin work."},{id:"gyp-new-35",question:"The most important gypsum property for wax margin carving accuracy is:",options:["High W/P ratio","Low surface hardness","High surface hardness + low setting expansion","High setting expansion"],correctAnswerIndex:2,explanation:"You want a die/model that won’t wear and won’t oversize → hard + low expansion."},{id:"gyp-new-36",question:"Why is gypsum a poor impression material for dentate patients?",options:["It sets too slowly","It is flexible","It is rigid and locks into undercuts","It has low accuracy"],correctAnswerIndex:2,explanation:"Gypsum impressions are accurate but too rigid → undercut locking."},{id:"gyp-new-37",question:"Best cast material requirement that reduces surface voids when pouring impressions:",options:["High contact angle","Low contact angle (good wetting)","High expansion","High porosity"],correctAnswerIndex:1,explanation:"Low contact angle = better wetting → fewer bubbles/voids."},{id:"gyp-new-38",question:"Type V stone is preferred over Type IV mainly when:",options:["You want minimal expansion always","You need more expansion to compensate base-metal casting shrinkage","You need a weak cast","You’re making diagnostic models only"],correctAnswerIndex:1,explanation:"Type V = high strength + high expansion for alloys with higher shrinkage."},{id:"gyp-new-39",question:"For a gypsum-based investment, the key added component that provides heat resistance is:",options:["Wax","Silica (quartz/cristobalite/fused silica) filler","Saliva","Borax"],correctAnswerIndex:1,explanation:"Investment = binder (gypsum) + refractory filler (silica)."},{id:"gyp-new-40",question:"Best investment binder choice for metal-ceramic / base metal alloys (high temp):",options:["Gypsum-bonded investment","Phosphate-bonded investment","Agar impression material","Alginate"],correctAnswerIndex:1,explanation:"High-temp work needs phosphate-bonded (more thermal stability)."},{id:"gyp-new-41",question:"If an impression is contaminated with saliva/blood and not washed, the cast may:",options:["Set faster always","Set slower (retard)","Become anhydrite","Have zero porosity"],correctAnswerIndex:1,explanation:"Organic impurities can act as retarders → slower setting + poorer surface."},{id:"gyp-new-42",question:"For inlay wax pattern work, why is low setting expansion important?",options:["It makes restoration intentionally tight","It prevents oversizing of the die → improves fit accuracy","It increases margin gap","It weakens gypsum"],correctAnswerIndex:1,explanation:"Expansion enlarges replica → restoration fit errors; low expansion improves accuracy."},{id:"gyp-new-43",question:"If gypsum sets too slowly in an alginate impression, the main problem is:",options:["Increased strength","Alginate distortion over time","Zero porosity","Conversion to anhydrite"],correctAnswerIndex:1,explanation:"Delay increases water exchange/time-dependent distortion → loss of accuracy."},{id:"gyp-new-44",question:"Best gypsum type for a die where you will carve an inlay/onlay wax pattern with sharp margins:",options:["Type II plaster","Type III stone","Type IV high-strength, low-expansion stone","Type V high-expansion stone"],correctAnswerIndex:2,explanation:"Inlay/onlay wax needs hard, abrasion-resistant + minimal expansion die."},{id:"gyp-new-45",question:"Type V stone is MOST indicated when:",options:["Inlay/onlay wax patterns require maximum accuracy","Casting base-metal alloys where extra expansion is needed to offset higher casting shrinkage","Making diagnostic casts for dentures","Making alginate study models only"],correctAnswerIndex:1,explanation:"Type V = high strength + higher expansion to compensate base-metal shrinkage."},{id:"gyp-new-46",question:"For a full denture working cast (soft-tissue cast), the preferred gypsum is:",options:["Type I","Type II","Type III","Type V"],correctAnswerIndex:2,explanation:"Type III is strong enough and expansion is acceptable for soft tissue casts."},{id:"gyp-new-47",question:"Which gypsum property is MOST critical for accurate crown margins (before investing)?",options:["High W/P ratio","High surface hardness + low setting expansion","High setting expansion","Long setting time"],correctAnswerIndex:1,explanation:"Margins must not abrade; dimensions must stay accurate."},{id:"gyp-new-48",question:"In a porcelain-fused-to-metal (PFM) workflow, gypsum is MOST properly used as:",options:["A material placed directly in the porcelain firing furnace","A Type IV working die/cast for wax pattern and margin finishing","The refractory die for porcelain build-up","The coping material under porcelain"],correctAnswerIndex:1,explanation:"Gypsum supports wax/margin work; firing needs refractory materials."},{id:"gyp-new-49",question:"The correct material for a die that will be exposed to porcelain firing temperatures is:",options:["Type IV stone","Type V stone","Refractory die/model material (not regular gypsum)","Alginate"],correctAnswerIndex:2,explanation:"Regular gypsum dehydrates/breaks down at high firing temperatures."},{id:"gyp-new-50",question:"Best investment type for casting a gold inlay/onlay (low-fusing noble alloy):",options:["Gypsum-bonded investment","Phosphate-bonded investment","Alginate investment","Zinc-oxide eugenol investment"],correctAnswerIndex:0,explanation:"Gold alloys traditionally use gypsum-bonded investments."},{id:"gyp-new-51",question:"Best investment type for casting base-metal crowns/metal-ceramic frameworks (high-temp):",options:["Gypsum-bonded investment","Phosphate-bonded investment","Zinc phosphate cement","Impression plaster"],correctAnswerIndex:1,explanation:`High-temp alloys need phosphate-bonded.
Waxes correlation (inlay wax logic)`},{id:"gyp-new-52",question:"While carving an inlay wax pattern, the die surface must resist wear from instruments. This property is mainly provided by:",options:["High setting expansion","High surface hardness/abrasion resistance of Type IV stone","High W/P ratio","Wet/green strength"],correctAnswerIndex:1,explanation:"Wax carving needs a hard die so margins stay sharp."},{id:"gyp-new-53",question:"Type V stone is generally AVOIDED for inlays/onlays because:",options:["It is too weak","It dissolves in water","Higher expansion can make the restoration fit too tight","It cannot be poured into impressions"],correctAnswerIndex:2,explanation:""}],Ne=["Composites shrink during polymerization (~2-5%); higher filler → less shrinkage.","C-Factor = bonded surface area / unbonded surface area; high C-factor = more stress.","Bis-GMA: high strength, high viscosity, low shrinkage per molecule.","TEGDMA: diluting agent with HIGH shrinkage (low molecular weight).","Higher filler % = lower shrinkage, better mechanical properties.","Incremental layering (≤2 mm) reduces C-factor and ensures complete cure."],Zi=`
# Composite Resins — Detailed Notes

## What a "composite" is

- ● **Composite (materials science)**: A solid made from two or more distinct phases (example: filler particles dispersed in a polymer matrix) combined to give properties better than (or intermediate between) the constituents.
- ● **Dental composite / resin-based composite**: A highly cross-linked polymer matrix reinforced by silica/glass/mineral/organic filler particles and/or short fibers, bonded to the matrix by a coupling agent.

![Dental Composite Structure](assets/composite_img_1_1.png)

If u remember dental amalgam had a similar structure even though the reactions are not the same

---

## 1) Core Terminology (Must-Know Definitions)

### Activation

- ● Process where enough energy is provided to make an initiator produce free radicals, so polymerization begins.

### Activator

- ● Energy source used to activate an initiator and generate free radicals. Main energy sources:
  - 1. **Heat** → thermal activation
  - 2. **Chemical activator** (electron donor) like tertiary amine → lowers energy needed so polymerization can occur at room temperature
  - 3. **Visible light** → photoinitiation (with a photosensitizer like **camphorquinone, CQ**)

![Activator Types](assets/composite_img_2_1.png)

### Initiator

- ● A chemical that forms **free radicals** to start polymerization and becomes part of the final polymer (so it is not a catalyst).
- ● **Free radical** = species with an unpaired electron that initiates chain-growth polymerization by attacking **C=C** bonds.

### Inhibitor

- ● Added to reduce spontaneous polymerization → **increases working time + shelf life**, typically by scavenging free radicals (e.g., **BHT**).

![Initiator and Inhibitor](assets/composite_img_3_1.png)

The above are general terms are used for other material as well

<span style="color: red">**General terms for all can skip**</span>

### What is the resin (matrix) in composite?

- ● The **resin matrix** is the plastic part of the composite (the "cement" that later hardens). It is mainly a mix of **methacrylate monomers** (like Bis-GMA, UDMA, TEGDMA) plus small additives (initiator, inhibitor, pigments).

---

### 2) What is a monomer?

- ● A **monomer** is a **small single molecule** that can join with many others to form a polymer. In dental composites, monomers usually have a reactive group called:
  - ▫️ **Methacrylate group** with a **C=C double bond**
- ● That **C=C** is the "handle" that opens during curing so monomers can join.

Example idea:
- ● Monomer = one "link" of a chain

---

### 3) What is a polymer?

- ● A **polymer** is a **very large molecule** made when many monomers join together.
  - ▫️ If it's mostly one long line → **linear polymer**
  - ▫️ If many chains join together → **cross-linked polymer network** (this is what composite becomes)

Example idea:
- ● Polymer = a long chain / network made of many links

---

### 4) What groups do composite monomers have?

- ● Most composite monomers are **dimethacrylates** (very important word):
  - ▫️ **Dimethacrylate = 2 methacrylate groups (2 C=C bonds) on the same molecule**

Examples:
- ● **Bis-GMA** (big, thick, strong backbone)
- ● **UDMA** (strong, slightly less viscous)
- ● **TEGDMA** (small "thinner" monomer)

✅ **Why "two" groups matter**:
- ● If a monomer has two **C=C** bonds, it can join two chains by forming –C–C– it has 2 open arms which can bind to similar monomers → creates cross-linking.

---

### 5) What are "pendant groups"?

- ● A **pendant group** is a side group that hangs off the main polymer chain **without being part of the backbone**. In composites, this usually means:
  - ▫️ Some methacrylate **C=C bonds do NOT react**
  - ▫️ They remain as **unreacted side double bonds** attached to the polymer network
- ● So you get:
  - ▫️ A polymer backbone (main chain)
  - ▫️ Plus **pendant unreacted C=C groups** sticking out

✅ **Why pendant groups matter**:
- ● They explain why **degree of conversion is not 100%**

- ● **Matrix**: The continuous resin phase (plastic monomer blend) that cures into a solid and binds fillers together.
- ● **Filler**: Inorganic/glass/organic resin particles dispersed in matrix to increase strength.
- ● **Coupling agent**: A chemical that bonds filler to resin matrix (most commonly organosilanes like γ-methacryloxypropyltrimethoxysilane). Essential for strength/toughness and resistance to degradation.
- ● **Depth of cure**: How deep a light-cured resin can cure under specific curing conditions (practical limit usually **~2–3 mm** per increment).

![Depth of Cure Diagram](assets/composite_depth_of_cure_new.png)

---

## Dental Composite Polymerization: Mechanism & Clinical Reality
<span style="color: red">can skip</span> just but this is the same process that will be seen in 2 more topics so better to once or **dental composites, elastomers, and denture base resins**.

### 1) Initiation (The Curing Light)

- ● **Generic**: Initiator + Energy → Free Radical
- ● **Dental Context**:
  - ▫️ **The Energy Source**: The dentist uses a Blue Curing Light (wavelength ~468 nm).
  - ▫️ **The Initiator**: The composite contains **Camphorquinone** (the photoinitiator).
  - ▫️ **The Process**: When the blue light hits the Camphorquinone, it gets excited and reacts with an **Amine** (accelerator) in the paste.
  - ▫️ **The Result**: This reaction releases **Free Radicals**.
  - ▫️ ✅ **Key Idea**: You press the button on the curing light → Free radicals are born.

### 2) Propagation (The Hardening)

![Polymerization Process](assets/composite_img_8_1.png)

- ● **Generic**: Active center + monomer → Polymer Chain
- ● **Dental Context**:
  - ▫️ **The Monomers**: The soft paste is full of resin monomers like **bis-GMA** or **TEGDMA**. These molecules have Carbon-Carbon double bonds (**C=C**).
  - ▫️ **The Reaction**: The free radicals attack the **C=C** double bonds, breaking them open.

### 3) Termination (The Stop)

![Free Radicals Process](assets/composite_img_9_1.png)

- ● **Generic**: Active center destroyed → Reaction stops
- ● **Dental Context**:
  - ▫️ **Chain Collision**: Two growing polymer chains crash into each other, canceling out their free radicals. The network is "locked."
  - ▫️ **Oxygen Inhibition (Crucial Clinical Detail)**: Oxygen is a "radical scavenger." On the very top surface of the filling (where air touches it), oxygen kills the radicals *before* they can cure.
  - ▫️ **The Result**: This leaves a sticky, uncured layer on top called the **Oxygen Inhibition Layer**.
  - ▫️ ✅ **Key Idea**: The sticky layer is actually good—it allows the *next* layer of composite you add to stick to the previous one chemically.

We use an activator (energy source) to activate an initiator, which starts polymerization by producing a highly reactive free radical. The free radical attacks the C=C double bond of a monomer, opens it, and creates a reactive end ("free hand"). That reactive end keeps adding more monomers, so the chain grows and forms a cross-linked network. The reaction stops when two growing polymer chains with free radicals combine with each other, or when radicals are inhibited (especially by oxygen at the surface, forming an oxygen-inhibited layer).

### Summary Table for Review

| Step | In General Chemistry | In Dental Composite |
|:---|:---|:---|
| Start | Energy + Initiator | Blue Light + Camphorquinone |
| Growth | Monomer + Radical | bis-GMA + Free Radical (Paste turns hard) |
| Stop | Radical Death / Impurities | Oxygen Inhibition Layer (Sticky top surface) |



**Gel point / Gelation:** Point where crosslinks become sufficient → resin becomes rigid (glassy), internal flow stops.
● Before gel point: stress can relax by polymer chain flow
● After gel point: stress cannot relax → stress concentrates at bonded interfaces

**Oxygen-inhibited layer:** Thin surface layer of cured composite with unreacted methacrylate groups due to oxygen inhibiting free-radical polymerization ("air-inhibited layer"). Helpful for bonding additional increments.

**Degree of Conversion (DC):** % of C=C double bonds converted to C–C single bonds during cure.
● Higher DC → generally better strength, wear resistance, durability
● Typical DC for bis-GMA composites: around 50–70% (not "all monomer left" — many unreacted double bonds are pendant groups).

**Polymerisation shrinkage (we don't want this):** In dental composites, polymerization shrinkage typically ranges from 2% to 5% by volume.
- ● Composite continues to shrink even after curing because polymerization can keep going slowly. Shrinkage happens because when monomers join and cross-link, the molecules pack closer together, reducing the overall volume.

![Composite Shrinkage](assets/composite_img_11_1.png)

- ● **C-factor (Configuration factor)**: Bonded surface area / unbonded free surface area
- ● Higher C-factor → higher shrinkage stress at margins → gap formation, marginal leakage, staining, secondary caries risk
- ● The more bonded surfaces a composite restoration has, the more the material is locked in. So when the composite polymerization-shrinks, it can't flow freely and instead pulls away from the tooth walls, creating shrinkage stress. This may open marginal gaps, leading to microleakage, post-operative sensitivity, marginal staining, and eventually secondary caries.

![C-Factor Dangers](assets/composite_img_12_1.png)

![Shrinkage Stress](assets/composite_img_13_1.png)

## 3. The C-Factor (Configuration Factor)

- ● The C-Factor is a formula used to predict the level of polymerization stress a filling will exert on the tooth walls.

### The Formula

- ● **C-Factor = (Number of Bonded Surfaces) / (Number of Unbonded Surfaces)**

### Why it Matters: The "Stress Relief" Concept

- ● **Bonded surfaces**: These are "locked." The composite is glued to the tooth and cannot move.
- ● **Unbonded surfaces**: These are "free." When the material shrinks, it can "flow" from these free surfaces toward the center to relieve tension.
- ✅ **The Rule**: The higher the C-Factor, the higher the stress on the tooth.

### Clinical Examples Table

| Cavity Class | Bonded Walls | Unbonded Walls | Calculation | C-Factor | Risk Level |
|:---|:---|:---|:---|:---|:---|
| Class I (Occlusal) | 5 (Floor + 4 Walls) | 1 (Top surface) | 5/1 | 5 | 🚨 Highest Risk |
| Class II (MO/OD) | 4 | 2 | 4/2 | 2 | Moderate |
| Class IV (Front tooth) | 2 | 4 | 2/4 | 0.5 | ✅ Low Risk |

- ● Note: A Class I cavity is a "recipe for disaster" because 5 walls are pulling inward against only 1 free surface. This often causes **Post-Operative Sensitivity** or **Cracked Cusp Syndrome**.

---

## 3) Dental Uses / Applications

Resin composites are used for:
- ● Direct restorations (Class I–V depending on material)
- ● Bonding agents/adhesives (with etch systems)
- ● Pit & fissure sealants
- ● Endodontic sealants
- ● Veneer bonding
- ● Cementation/luting of indirect restorations (resin cements)
- ● Core build-ups/foundations (especially dual/self-cure)

---

## 2. The Three Essential Components

- ● To understand a dental composite, think of it as a **three-part system**. If any one of these is missing, the material fails.

### A. The Resin Matrix (The "Glue")

- ● **What it is**: A blend of fluid plastic monomers (like **bis-GMA** or **UDMA**).
- ● **Function**: It creates the continuous phase that binds everything together. It gives the composite its ability to be molded and shaped before curing.
- ● **Weakness**: On its own, the resin is relatively weak, flexible, prone to wear, and shrinks significantly when it hardens (polymerizes).

- ✅ **One line summary**: **Bis-GMA** and **UDMA** form the continuous resin matrix that acts as the "glue" to hold the filler particles together.

| Monomer Type | Examples | Key Characteristics | Clinical Function / Analogy |
|:---|:---|:---|:---|
| Principal | Bis-GMA, UDMA | High Molecular Weight; Aromatic (Stiff); Very Viscous | Analogy: "Cold Honey". Provides strength, stiffness, and durability to the filling. |
| Diluent | TEGDMA, EGDMA | Low Molecular Weight; Aliphatic (Flexible); Fluid | Analogy: "Milk / Water". Reduces viscosity to make the paste workable, but causes more shrinkage. |

![Resin Matrix Components](assets/composite_img_16_1.png)

---

### B. The Fillers (The "STONE")

- ● **What they are**: Particles of silica, quartz, barium glass, or zirconia.
- ● **Function**: They reinforce the matrix.
  - ▫️ **Strength**: They increase stiffness and wear resistance.
  - ▫️ **Stability**: They reduce polymerization shrinkage (because glass doesn't shrink) and thermal expansion.
  - ▫️ **Appearance**: They provide translucency and radiopacity (visibility on x-rays)

### Why fillers matter (functions)

- ● Fillers provide:
  - 1. **Reinforcement**: ↑ compressive/tensile strength, ↑ modulus, ↑ toughness
  - 2. **Reduce polymerization shrinkage**: less resin volume to shrink
  - 3. **Reduce thermal expansion**: closer to tooth structure → less marginal stress during temperature changes
  - 4. **Control viscosity/handling**: more filler → thicker paste
  - 5. **Reduce water sorption**: less resin → less softening/staining
  - 6. **Radiopacity**: heavy metal fillers (Ba, Sr, Zn, YbF₃) absorb x-rays → detect caries/gaps

- ● Fillers are important because we mainly change a composite's properties by increasing or decreasing the filler. More filler usually makes the composite stronger, but the surface can become rougher (like having more "hard particles" in it). Less filler usually makes the composite weaker, but it becomes easier to polish and gives a better finish.
- ● ✅ **Hybrid composites** are considered the most balanced option, because they combine the good qualities of both worlds.

| Feature | High Filler / Large Particles (The "Rocks") | Low Filler / Small Particles (The "Sand") |
|:---|:---|:---|
| Strength | High (Stronger, fracture resistant) | Lower (More prone to chipping/breaking) |
| Polishability | Poor (Surface feels rough; "plucking" occurs) | Excellent (Retains high gloss) |
| Wear | High Wear (Rough particles grind opposing teeth) | Low Wear (Smooth surface is gentle) |
| Example | Macrofilled (Old school) | Microfilled (Great for front teeth veneers) |

![Filler Comparison](assets/composite_img_17_1.png)

---

- ● **Esthetic requirement: refractive index matching**
  - ▫️ Filler refractive index should match cured resin → good translucency
  - ▫️ Particle size affects light scattering (big particles increase opacity and roughness)

- ● **Filler loading & packing**
  - ▫️ Using multiple particle sizes allows tighter packing → higher filler fraction → better properties and reduced shrinkage.

- ● **Coupling agent (Silane)**
  - ▫️ Forms chemical bridge between filler and resin network
  - ▫️ Improves strength, wear resistance, and reduces water penetration at interface

- ● ✅ **Without coupling**: fillers act like voids → crack bypasses filler, weak composite.

### Summary

| Component | In Concrete | In Dental Composite | Role |
|:---|:---|:---|:---|
| Matrix | Cement paste | Resin (bis-GMA) | Holds everything together; cures to solid. |
| Coupling | Surface friction | Silane Agent | Bonds the filler to the matrix so they act as one. |
| Filler | Rocks/Gravel | Glass/Silica particles | Provides bulk, strength, and stops shrinkage. |

![Silane Coupling](assets/composite_img_19_1.png)

---

## 5) Classification — Types of Composites (Crucial Topic)

![Classification Chart](/composite-classification.png)

### A) Classification by filler particle size / distribution



**1) Traditional (Macrofilled / Conventional)**
- ● Larger fillers (older category)
- ● Strong but rough surface over time (matrix wears away → filler protrudes)

**2) Small/Fine particle composites**
- ● Mean diameters roughly 0.1–10 µm
- ● Good strength; better polish than macrofilled; cannot reach ultra-high gloss like microfills

**3) Hybrid composites (Most "general purpose")**
- ● **Hybrid** = mixture of at least two size ranges (often fine glass + micro/nanofiller)
- ● **Goal**: balance strength + wear resistance + polishability
- ● Widely used in anterior and many posterior indications (depending on brand)

**4) Microfilled composites**
- ● **Primary filler** ~ 40 nm colloidal silica
- ● Extremely high polish and smoothness
- ● **Problem**: very small particles have huge surface area → increase viscosity → limits filler loading
- ● **Clinical**: best for low-stress areas, Class III/V, excellent esthetics

Two styles often described:
- ● **Homogeneous microfill**: mostly microfiller → very polishable, lower strength
- ● **Heterogeneous microfill**: contains prepolymerized resin filler particles + microfiller → better handling and loading but weaker interfaces → chipping/wear

---

**5) Nanofilled composites**
- ● **Primary particles** in nano range (<100 nm), often with "nanoclusters"
- ● **Aim**: microfill-like polish + higher filler loading (strength)
- ● In practice, many are actually **nanohybrids** because they include clusters/other particle sizes.

**6) Nanohybrid composites** (Very common modern "universal")
- ● Mix of nano particles + fine glass fillers
- ● **Great balance**: strength + good polish + posterior usability

- ● ✅ **High yielding info**: The two main composite types we commonly use are hybrid and nanocomposite.
  - ▫️ **Hybrid composite** is preferred when we need extra strength (e.g., stress-bearing areas like posterior restorations).
  - ▫️ Nano/nanohybrid composite is preferred when we need maximum esthetics and polishability (e.g., highly visible anterior restorations).

BUT why are hybrids preferred anyways explained below:
● Hybrids mix large particles to give the heavy-duty strength missing in microfills, while filling the gaps with tiny particles to give the smooth polish missing in conventional composites. The Result: This "rocks and sand" structure creates a perfect universal material that is strong enough for chewing forces on back teeth yet smooth enough for beautiful smiles on front teeth.

![Hybrid Composites Goldilocks Solution](assets/composite_hybrid_goldilocks.jpg)

### B) Classification by manipulation/handling

**1) Flowable composites**
- ● Lower filler and/or altered particle distribution → flows
- ● **Uses**:
  ○ liners/bases
  ○ small defects
  ○ areas needing adaptation
- ● **Weakness**: lower filler → lower wear resistance and strength

**2) Packable / condensable composites**
- ● Designed to feel more like amalgam (stiffer handling)
- ● Achieved by fiber/irregular fillers that interlock
- ● Intended for posterior placement ease; real-world advantage over good hybrids is limited

---

### C) Classification by curing mode (Very high yield)

| Feature | Chemically Activated (Self-Cure) | Light-Cured (Photo-Cure) | Dual-Cure System |
|:---|:---|:---|:---|
| Format | Two Pastes (Base + Catalyst) | Single Paste | Two Pastes (usually) |
| Activation Mechanism | Chemical Reaction: Benzoyl Peroxide (Initiator) + Tertiary Amine (Activator) | Light Energy: Camphorquinone (CQ) + Amine + Blue Light (~468 nm) | Combination: Chemical cure (slow) + Light cure (fast command set) |
| Porosity | High (Mixing introduces air bubbles) | Low (No mixing required) | Moderate (Requires mixing) |
| Working Time | Limited (Starts immediately upon mixing) | "Command Set" (Controlled by operator) | Flexible (Command set + chemical backup) |
| Esthetics / Color | Poor Stability (Amine oxidation causes yellowing over time) | Excellent Stability (No aromatic amine accelerators) | Compromised (Contains amines, less stable than light-cure) |
| Stress Buildup | Lower (Slower cure allows stress relaxation) | Higher (Rapid crosslinking locks in stress) | Moderate |
| Cure Depth | Unlimited (Cures throughout bulk chemically) | Limited (Requires 2mm increments) | Reliable Bulk Cure (Chemical backup for deep areas) |
| Primary Use | Core build-ups, areas hard to reach with light | Direct restorations (fillings), veneers | Cementing crowns/inlays, deep core build-ups |

---

## 6) Photocuring Lamps & Wavelength Matching

- ● Photoinitiation depends on wavelength overlap with photoinitiator (CQ absorbs ~400–500 nm).
- ● **Main curing light types**:
  - 1. **LED**
    ○ Emits blue range (often 440–480 nm), no filters required
    ○ Low heat, low power consumption, often battery
  - 2. **QTH (Quartz-Tungsten-Halogen)**
    ○ Broad spectrum → needs filters (blue region)
    ○ Output decreases with age → needs radiometer checks
  - 3. **PAC (Plasma Arc Curing)**
    ○ High-intensity filtered output
  - 4. **Argon laser**
    ○ Very high intensity, narrow wavelength

### Energy requirement concept (high yield)

- ● Need sufficient **radiant energy** (irradiance × time).

### Critical technique rules

- ● Light intensity decreases rapidly with distance (clinically huge).
- ● Keep tip as close as possible and perpendicular (90°).
- ● Clean light guide (resin on tip reduces output).
- ● Check curing light output periodically.

### Depth of cure limitation

- ● Even with high intensity, light is absorbed/scattered within composite.
- ● Practical depth remains **~ 2–3 mm** per increment unless curing time is extended significantly.

![Depth of Cure Diagram](assets/composite_depth_of_cure_new.png)

---

## 7) Polymerization Shrinkage & Stress (Most Tested Concept)

### Why shrinkage happens

- ● Monomers pack closer when polymerized → volume reduces. Shrinkage creates stress especially after gel point.

### What increases shrinkage stress

- ● Higher **C-factor** (more bonded surfaces, less free surface)
- ● Larger bulk volume cured at once
- ● Faster curing rate (light-cure, high intensity)
- ● Higher proportion of low-MW diluent monomers (like **TEGDMA**)
- ● Inadequate incremental technique

### Clinical consequences

- ● Marginal gaps → leakage → sensitivity, staining, secondary caries
- ● Marginal breakdown
- ● Post-op sensitivity
- ● Reduced restoration longevity

### How to reduce shrinkage stress (clinical techniques)

- ● **Incremental layering**: Place composite in diagonal wedges ≤ 2 mm thick. This lowers the effective C-factor and creates more free surfaces.
- ● **Stress-absorbing liners**: Use a thin base of flowable composite or glass ionomer. Their greater flexibility (lower modulus) acts like a cushion.
- ● **Soft-start curing**: Use a ramped light curing method. This keeps the material in the pre-gel phase longer, allowing flow.
- ● **Material choice**: Choose composites with a high filler-to-resin ratio and favor larger monomers (**Bis-GMA/UDMA**).
- ● **Cavity preparation**: Round internal line angles to avoid sharp corners (stress concentration points).
- 
![Strategies to Reduce Shrinkage & Stress](/composite-shrinkage-strategies.png)

---

## 8) Properties of Resin-Based Composites (What controls what)

### Strength & modulus
- ● Increase with filler loading and good coupling
- ● Higher filler fraction → higher stiffness (modulus), hardness, wear resistance
- ● ▫️ *Trade-off*: more filler can increase brittleness and reduce handling ease.

### Water sorption
- ● Mainly from resin matrix
- ● Higher filler loading → less water uptake → better stain resistance and wear

### Thermal expansion
- ● Polymers expand more than tooth; fillers reduce expansion closer to tooth structure → less marginal stress.

### Radiopacity
- ● Achieved by heavy metal glass fillers (**Ba, Sr, Zn**) or YbF₃.
- ● Ideally radiopacity should allow diagnosis without masking secondary caries.

### Wear
- ● Two main wear modes:
  ○ **Two-body wear**: direct contact (tooth/restoration)
  ○ **Three-body wear**: food bolus abrasion
- ● Wear resistance improves with small well-bonded fillers and high filler loading.

## 9) Biocompatibility & BPA / Estrogenicity (Short note)

● Risk mainly from leachable components if composite is inadequately cured, especially near pulp.
● Clinically, proper cure and finishing reduce unreacted monomer exposure.

## 10) Finishing, Polishing, Surface Sealing (Very exam-friendly)

### Finishing vs Polishing

● Finishing: shaping margins, anatomy, removing overhangs
● Polishing: smoothing to minimal roughness
- ● **Finishing**: shaping margins, anatomy, removing overhangs.
- ● **Polishing**: smoothing to minimal roughness.

### Timing & Technique
- ● **Excessive dry polishing** → heat → may increase marginal leakage; use water cooling.
- ● **Timing**: Often best to finish/polish shortly after placement.
- ● **Surface sealing**: Applying a low-viscosity resin sealer can fill microcracks and reduce microleakage.

---

## 11) Repair of composites

- ● Fresh composite bonds well due to the **oxygen-inhibited layer**.
- ● Older composite has fewer reactive groups → bond strength drops.
- ● **Repair strategies**:
  - ○ surface roughening + etch + bonding resin
  - ○ silane application to improve bond to exposed filler
- ● ✅ **Note**: Repaired strength is usually lower than original bulk composite.

---

## 12) Posterior composite selection

### Indications
- ● Esthetic demand
- ● Conservative preparations
- ● Patient without heavy parafunction

### Contraindications / cautions
- ● **Bruxism** (wear/fracture risk)
- ● Very large restorations
- ● High caries activity

---

## 13) Quick Exam Tables (Fast Recall)

### A) Classification by filler size

| Type | Typical Filler Scale | Big Strength | Big Advantage | Big Drawback |
|:---|:---|:---|:---|:---|
| Macrofilled | Large (10–50 µm) | Strong | Shrinkage reduced | Rough surface (plucking) |
| Hybrid / Nanohybrid | Mixed sizes | Strong | "Best balance" | Technique sensitive |
| Microfilled | 40 nm silica | Lower | Best polish | Lower strength |
| Nanofilled | <100 nm + clusters | Good | Polish + Strength | Cure depth issues |

### B) Curing types (must memorize)

| Cure Type | Activator (Energy) | Initiator (Chemical) | Pros | Cons |
|:---|:---|:---|:---|:---|
| Self-cure | Tertiary Amine | Benzoyl Peroxide | Deep cure; No light needed | No "command set"; Porosity |
| Light-cure | Blue Light (~470nm) | Camphorquinone (CQ) | "Command set"; Low porosity | Depth limit; High stress |
| Dual-cure | Light + Chemical | Both systems | Reliable deep cure | Requires mixing |
| UV-cure (Old) | UV Light | Benzoin Methyl Ether | First "command set" | Limited penetration; Risks |

---

## 15) Ultra-High Yield "One-liners" SUMMARY

- ● Higher **C-factor** → higher shrinkage stress → marginal leakage.
- ● After **gel point**, stress cannot relax — it concentrates at bonded interfaces.
- ● More filler → less shrinkage + less thermal expansion + more strength.
- ● **Microfilled** = best polish, weaker; **Hybrid/Nanohybrid** = best overall balance.
- ● Light cure needs correct wavelength match (**CQ ~ blue region**) + minimal distance + 90° angle.
- ● **Incremental placement** solves both depth of cure and reduces stress per increment.

---

**End of Composite Resins Notes**
`,Ou=`
# Composite Resins — High-Yield Summary

## 1) STRUCTURE (3 Components)

1. **Organic Matrix (Resin)** — Bis-GMA, UDMA, TEGDMA
2. **Inorganic Filler** — Glass/ceramic particles (70-85% by weight)
3. **Coupling Agent** — Silane (bonds filler to resin)

---

## 2) KEY MONOMERS

| Monomer | Properties | Clinical Note |
|:---|:---|:---|
| **Bis-GMA** | High viscosity, low shrinkage per molecule | Main resin, needs dilution |
| **TEGDMA** | Low viscosity, HIGH shrinkage | Diluting agent (bad for shrinkage) |
| **UDMA** | Lower viscosity, flexible | Alternative to Bis-GMA |

**Key Point**: ↑ Bis-GMA = ↓ shrinkage but ↑ viscosity; ↑ TEGDMA = ↑ shrinkage

---

## 3) POLYMERIZATION

- **Light-Cure**:
  - **Photoinitiator**: Camphorquinone (CQ)
  - **Wavelength**: 460-470 nm (blue light)
  - **Degree of Conversion**: 55-75% (never 100%)

- **Dual-Cure**:
  - Benzoyl peroxide + tertiary amine
  - Use when light can't reach (deep post spaces, thick restorations)

---

## 4) POLYMERIZATION SHRINKAGE ⭐ (Most Tested)

- **Why**: Monomers pack closer (4 Å → 1.5 Å) = **2-5% volumetric shrinkage**
- **Consequences**:
  - Gap formation → microleakage → secondary caries
  - Post-op sensitivity
  - Cusp deflection / fracture

**C-Factor = Bonded Surface / Free Surface**
- High C-factor (Class I = 5) → **MORE stress**
- Low C-factor (Class IV = 0.5) → **LESS stress**

**How to Minimize**:
- ↑ Filler loading
- Incremental layering (≤2 mm)
- Soft-start curing
- Good bonding

---

## 5) COMPOSITE CLASSIFICATION

**By Filler Size**:

| Type | Particle Size | Best For |
|:---|:---|:---|
| **Macrofill** | 10-100 µm | Obsolete (rough surface) |
| **Microfill** | 0.01-0.1 µm | Best polish, low strength |
| **Hybrid** | Mixed sizes | Universal (anterior + posterior) |
| **Nanofill** | 1-100 nm | Best aesthetics + strength |
| **Nanohybrid** | Nano + larger | Clinical workhorse |

**By Viscosity**:
- **Flowable**: Low filler (~60-70%), high shrinkage, liners / small cavities
- **Universal**: Medium filler (~75-80%), anterior & posterior
- **Packable**: High filler (~85%+), posterior
- **Bulk-Fill**: Special chemistry, 4-5 mm increments

---

## 6) CLINICAL TECHNIQUE

- **Incremental Layering**:
  - ≤2 mm per layer
  - Cure 20-40 seconds each
  - Reduces C-factor

- **Bulk-Fill**:
  - 4-5 mm increments
  - Increased translucency + modified chemistry
  - Faster but may sacrifice aesthetics

- **Curing Light**:
  - Close and perpendicular (90°)
  - Adequate intensity (≥1000 mW/cm²)

---

## 7) COMPOSITE vs AMALGAM (Quick Comparison)

| Property | Composite | Amalgam |
|:---|:---|:---|
| **Aesthetics** | Tooth-colored ✓ | Metallic ✗ |
| **Bonding** | Yes (adhesive) | No (mechanical) |
| **Shrinkage** | Yes (~2-5%) | Slight expansion |
| **Technique** | High sensitivity | Moderate |
| **Longevity** | ~7-10 years | 10-15+ years |

---

## 8) HIGH-YIELD EXAM POINTS ⭐

### Shrinkage & C-Factor
- **C-factor = bonded ÷ free surfaces**
- Class I (C = 5) = highest stress
- Incremental layering reduces effective C-factor

### Monomers
- **Bis-GMA**: high strength, low shrinkage
- **TEGDMA**: HIGH shrinkage (diluting agent)

### Filler Function
- ↑ Filler % = ↓ shrinkage, ↑ strength, ↓ thermal expansion
- Typical: 70-85% by weight

### Silane
- Bonds filler to resin (Si-O-Si linkage)
- Without it, filler acts like voids

### Degree of Conversion
- Only 55-75% of C=C bonds react
- Unreacted monomers can leach → sensitivity

### Composite Selection
- **Anterior aesthetics**: Nanofill (best polish + strength)
- **Posterior strength**: Hybrid / Nanohybrid
- **Cervical flexure**: Flowable (low modulus)
- **Deep cavities**: Bulk-fill

---

## 9) COMMON CLINICAL PROBLEMS

| Problem | Cause | Solution |
|:---|:---|:---|
| **Marginal gap** | High C-factor, shrinkage stress | Incremental layering, good bonding |
| **Post-op sensitivity** | Microleakage, bond failure | Proper technique, adequate seal |
| **Incomplete cure** | Thick increment, low light | ≤2 mm layers, adequate curing time |
| **Veneer debonding** | Excessive shrinkage stress | Low-viscosity cement, thin layer |

---

## 10) MUST-KNOW NUMBERS

- **Shrinkage**: 2-5%
- **Degree of Conversion**: 55-75%
- **Filler Loading**: 70-85% by weight
- **Increment Thickness**: ≤2 mm (conventional), 4-5 mm (bulk-fill)
- **Curing Time**: 20-40 seconds per layer
- **Light Wavelength**: 460-470 nm (blue)
- **C-Factor Class I**: ~5 (highest stress)

---

**End of Summary**

---

**End of Summary**
`,Qn=[{id:"comp-easy-1",question:'Which component of a dental composite functions as a "molecular bridge," chemically bonding the inorganic filler particles to the organic resin matrix?',options:["Bis-GMA","TEGDMA","Camphorquinone","Silane coupling agent"],correctAnswerIndex:3,explanation:"The silane coupling agent bonds the filler to the resin matrix. Without it, fillers act like defects/voids, weakening the composite."},{id:"comp-easy-2",question:"You are using a light-cured composite. Which specific photoinitiator is most likely present, and what wavelength of light is required to activate it?",options:["Benzoyl Peroxide; UV light (~300 nm)","Camphorquinone; Blue light (~468 nm)","Tertiary Amine; Red light (~600 nm)","Hydroquinone; Green light (~500 nm)"],correctAnswerIndex:1,explanation:"Camphorquinone (CQ) is the common photoinitiator in composites and is activated by blue light (~468 nm). Benzoyl peroxide is mainly for chemical/self-cure systems."},{id:"comp-easy-3",question:"Degree of Conversion (DC) means:",options:["% filler by volume","% C=C bonds converted to C-C during cure","% oxygen removed from surface","% polymer dissolved in water"],correctAnswerIndex:1,explanation:"DC measures how many double bonds reacted. Typical conversion is about 50-70%."},{id:"comp-easy-4",question:"If a patient requires a restoration on a front tooth (Class III or Veneer) where the primary concern is maximum gloss and polishability, which composite type is historically best suited?",options:["Macrofilled composite","Microfilled composite","Packable composite","Traditional hybrid composite"],correctAnswerIndex:1,explanation:"Microfilled composites (very small fillers) give the best polish and gloss, but lower strength."},{id:"comp-easy-5",question:'Which of the following statements about "Hybrid" composites is true?',options:["They contain only nanofillers.","They offer a balance of strength (from large particles) and polishability (from small particles).","They have the poorest physical properties of all composites.","They are primarily used as flowable liners."],correctAnswerIndex:1,explanation:'Hybrids mix multiple particle sizes ("rocks + sand") to achieve the best overall balance of properties.'},{id:"comp-easy-6",question:"Typical volumetric shrinkage of many composites is roughly:",options:["0-1%","2-5%","10-15%","20-30%"],correctAnswerIndex:1,explanation:"The common clinical range for polymerization shrinkage is approximately 2-5%."},{id:"comp-easy-7",question:"C-factor (Configuration Factor) is defined as:",options:["Unbonded surfaces / bonded surfaces","Bonded surfaces / unbonded (free) surfaces","Depth of cure / curing time","Filler % / resin %"],correctAnswerIndex:1,explanation:"C-factor = bonded surfaces / free (unbonded) surfaces."},{id:"comp-easy-8",question:"Higher polymerization shrinkage stress can lead to:",options:["Increased marginal seal always","Marginal gaps, sensitivity, staining, and secondary caries","Higher radiopacity","Better polishability"],correctAnswerIndex:1,explanation:"Stress can lead to debonding and gap formation, resulting in leakage problems like sensitivity and secondary caries."},{id:"comp-easy-9",question:"Practical incremental thickness for conventional light-cure composite is usually:",options:["5-6 mm","4-5 mm","2 mm","0.2 mm"],correctAnswerIndex:2,explanation:"The common clinical increment is approximately 2 mm for a reliable depth of cure."},{id:"comp-easy-10",question:"Light intensity at the composite surface decreases significantly when:",options:["Tip is close and perpendicular","Tip is far away from the surface","Tip is clean","Composite is thinner"],correctAnswerIndex:1,explanation:"Distance reduces irradiance rapidly according to the inverse square law."},{id:"comp-easy-11",question:"The best curing tip position is:",options:["Far and angled","Close and perpendicular (90°)","Far and perpendicular","Close and parallel (0°)"],correctAnswerIndex:1,explanation:"A close and perpendicular position maximizes the energy delivered to the composite."},{id:"comp-easy-12",question:"Camphorquinone is activated best by:",options:["Green light","Red light","Blue light","UV only"],correctAnswerIndex:2,explanation:"Camphorquinone (CQ) absorbs light most effectively in the blue region (~468 nm)."},{id:"comp-easy-13",question:'Which curing system has "command set" (user controls working time)?',options:["Self-cure only","Light-cure","Condensation polymerization","Heat-cure only"],correctAnswerIndex:1,explanation:"Light-cure composites stay workable until they are exposed to the curing light."},{id:"comp-easy-14",question:"Self-cure (chemical-cure) systems commonly use which initiator system?",options:["CQ + blue light","Benzoyl peroxide + tertiary amine","Silane + filler","Acid etch + primer"],correctAnswerIndex:1,explanation:"The classic chemical cure initiator system is Benzoyl Peroxide (BPO) and a tertiary amine."},{id:"comp-easy-15",question:"The main function of fillers in resin composites is to:",options:["Increase hardness but significantly increase shrinkage","Reinforce the resin and improve stability","Improve translucency while reducing the need for silane","Increase water sorption for better adaptation"],correctAnswerIndex:1,explanation:"Fillers act as the strong phase, strengthening the composite and reducing resin-related problems like shrinkage and thermal expansion."},{id:"comp-easy-16",question:"The coupling agent (silane) is essential because it:",options:["Removes oxygen inhibition","Chemically bonds filler to resin for stress transfer","Replaces the resin matrix","Prevents light scattering"],correctAnswerIndex:1,explanation:"Without silane, there is no bond between filler and matrix, and the filler acts like a defect/void."},{id:"comp-easy-17",question:"Microfilled composites are best known for their:",options:["High strength for posterior loads","Excellent polishability and gloss","Highest radiopacity","Fastest curing time"],correctAnswerIndex:1,explanation:"Small filler particles allow for excellent polish, but their lower loading results in lower strength."},{id:"comp-easy-18",question:"Which component provides radiopacity on X-rays to distinguish the restoration from caries?",options:["Camphorquinone photoinitiator","Silane coupling agent","Heavy-metal glass fillers (Ba, Sr, Zn, Zr)","Bis-GMA resin matrix"],correctAnswerIndex:2,explanation:"Manufacturers add radiopaque fillers containing heavy elements like Barium or Strontium to absorb X-rays."},{id:"comp-easy-19",question:"Standard LED curing lights are specifically designed to activate which photoinitiator?",options:["Benzoyl peroxide","Luciferin","Camphorquinone (CQ)","Hydroquinone"],correctAnswerIndex:2,explanation:"LED lights are tuned to match the absorption peak of Camphorquinone (~468 nm)."}],Xn=[{id:"comp-medium-1",question:"Why is TEGDMA often added to a composite formulation containing Bis-GMA?",options:["To increase viscosity and strength","To reduce viscosity and allow better handling","To act as an inhibitor","To eliminate shrinkage entirely"],correctAnswerIndex:1,explanation:"Bis-GMA is very viscous, so TEGDMA is added as a diluent to improve handling, though it can increase shrinkage."},{id:"comp-medium-2",question:"Degree of Conversion (DC) is usually NOT 100% mainly because:",options:["Filler prevents polymerization","The polymer network restricts molecular mobility as it sets","Water stops the reaction","Oxygen inhibition is too strong"],correctAnswerIndex:1,explanation:"As the network stiffens, it traps unreacted groups that cannot reach each other to react further."},{id:"comp-medium-3",question:"Which of the following cavity preparations has the HIGHEST C-Factor and highest risk of shrinkage stress?",options:["Class IV (Anterior edge)","Class II (MO or DO)","Class I (Occlusal box)","Class V (Buccal surface)"],correctAnswerIndex:2,explanation:"Class I box has 5 bonded surfaces and only 1 free surface, leading to a C-factor of 5."},{id:"comp-medium-4",question:"Which technique is recommended to reduce the effective C-Factor and shrinkage stress?",options:["Bulk filling in one increment","High-intensity light for short time","Incremental placement (diagonal wedges <= 2 mm)","Drying the tooth structure excessively"],correctAnswerIndex:2,explanation:"Incremental wedges create more free surfaces per increment, allowing flow before the gel point."},{id:"comp-medium-5",question:"What is the primary cause of polymerization shrinkage in resin composites?",options:["Expansion of filler particles","Evaporation of water","Monomers packing closer as Van der Waals forces change to covalent bonds","Loss of the silane coupling agent"],correctAnswerIndex:2,explanation:"Monomers pull closer together as they form covalent bonds, resulting in volumetric shrinkage."},{id:"comp-medium-6",question:"A Class I occlusal cavity with 5 bonded walls and 1 free surface has a C-factor of:",options:["0.2","1.0","5.0","0.5"],correctAnswerIndex:2,explanation:"C-factor = Bonded / Free = 5 / 1 = 5."},{id:"comp-medium-7",question:"Incremental wedge layering reduces effective stress mainly by:",options:["Increasing cumulative shrinkage","Increasing the ratio of unbonded to bonded surfaces for each increment","Using less material overall","Eliminating the hybrid layer"],correctAnswerIndex:1,explanation:"By reducing the C-factor of individual increments, the material can flow more easily during the pre-gel phase."},{id:"comp-medium-8",question:"Soft-start (ramped) curing reduces stress mainly by:",options:["Increasing polymerization heat","Prolonging the pre-gel phase for stress relaxation","Reducing the degree of conversion","Increasing filler content"],correctAnswerIndex:1,explanation:"A slower early cure allows the material to move and relax stresses before it reaches the rigid gel point."},{id:"comp-medium-9",question:"Flowable liners are thought to reduce stress because:",options:["They have zero shrinkage","Their lower modulus of elasticity acts as a stress-absorbing buffer","They have higher filler loading","They increase the C-factor"],correctAnswerIndex:1,explanation:"The relative flexibility of the flowable liner can cushion the pull of the overlying composite."},{id:"comp-medium-10",question:"Bulk-fill composites differ from conventional composites by being able to cure in increments of:",options:["0.5 mm","1 mm","2 mm only","4-5 mm"],correctAnswerIndex:3,explanation:"Modified chemistry and increased translucency allow effective curing in much thicker increments."},{id:"comp-medium-11",question:"Which situation MOST strongly favors using bulk-fill rather than conventional layering?",options:["Small shallow Class V","Deep posterior cavity where speed and depth of cure matter","Thin veneer cementation","Pit and fissure sealing"],correctAnswerIndex:1,explanation:"Bulk-fill is highly advantageous in deep posterior boxes to save time and ensure cure at the base."},{id:"comp-medium-12",question:"A bulk-fill flowable is MOST commonly used as:",options:["Final occlusal layer","A base/lining bulk layer, followed by a sculptable capping layer","A substitute for bonding agent","Fissure sealant"],correctAnswerIndex:1,explanation:"Flowable bulk-fills are usually covered with a stronger 'capping' layer for better wear resistance."},{id:"comp-medium-13",question:"The chemical bond formed between silane and the silica filler particle is a:",options:["Ionic bond","Siloxane bond (Si-O-Si)","Metallic bond","Hydrogen bond only"],correctAnswerIndex:1,explanation:"Silane links to the filler surface through a siloxane bridge."},{id:"comp-medium-14",question:'Hybrid/Nanohybrid composites are considered "universal" because:',options:["They are only for anterior teeth","Mixed particle sizes provide a balance of strength and polishability","They do not require curing lights","They match every shade automatically"],correctAnswerIndex:1,explanation:"The 'rocks + sand' approach allows high filler loading for strength while maintaining a polishable surface."},{id:"comp-medium-15",question:'A marginal "white line" visible after composite placement typically indicates:',options:["Excessive use of silane","Marginal gap caused by polymerization shrinkage stress","Correct shade matching","Incomplete filler loading"],correctAnswerIndex:1,explanation:"If shrinkage stress exceeds the bond strength, a microscopic gap or fracture occurs at the margin."}],jn=[{id:"comp-hard-1",question:"When cementing a fiber post 10 mm deep into a canal, why is a dual-cure composite preferred over a light-cure one?",options:["It is more radiopaque","It ensures full polymerization even where light intensity is too low to reach","It has a lower C-factor","It simplifies the procedure"],correctAnswerIndex:1,explanation:"Light intensity diminishes rapidly with distance; the chemical cure component ensures solidification at the apical depths."},{id:"comp-hard-2",question:"For a fractured incisal edge (Class IV) needing both high esthetics and functional strength, which is the best modern choice?",options:["Macrofilled composite","Microfilled composite","Nanofilled composite","Packable composite"],correctAnswerIndex:2,explanation:"Nanofilled composites provide the superior polish retention (like microfills) along with high mechanical strength (like hybrids)."},{id:"comp-hard-3",question:"Immediate debonding of a porcelain veneer cemented with high-viscosity resin is most likely caused by:",options:["Creep","Excessive polymerization shrinkage stress exceeding bond strength","Hygroscopic expansion","Oxygen inhibition layer"],correctAnswerIndex:1,explanation:"High-viscosity materials in thin, high-constraint areas can generate stresses that rip the restoration off the tooth immediately."},{id:"comp-hard-4",question:"Why is a low modulus of elasticity (flexibility) beneficial for Class V cervical restorations?",options:["It increases wear resistance","It allows the restoration to flex with the tooth during occlusal loading","It prevents radiopacity issues","It speeds up the curing process"],correctAnswerIndex:1,explanation:"Teeth flex at the neck; a flexible restorative material can accommodate this movement without debonding at the margin."}],Vu=[...Qn,...Xn,...jn],zu=["Micromechanical bonding (Hybrid Layer + Resin Tags) is the primary mechanism.","Acid etching creates microporosities; Primer adapts to wet dentin; Adhesive seals.","Dentin must be moist ('wet bonding') to prevent collagen collapse.","Enamel bonding is predictable (dry/frosty); Dentin bonding is technique-sensitive.","Smear layer reduces permeability but interferes with bonding (must be removed or modified).","HEMA is the key hydrophilic monomer (primer); Bis-GMA/TEGDMA are hydrophobic resins."],Ju=`
# Bonding & Bonding Agents — High-Yield Notes

## 1) Core Terminology (1-liners)

- ● **Adhesion**: attraction between two different materials at an interface (chemical +/or mechanical).
- ● **Cohesion**: attraction within the same material.
- ● **Adhesive**: the bonding substance (resin/primer/cement etc).
- ● **Adherend**: the substrate being bonded (enamel, dentin, metal, ceramic, composite).
- ● **Bonding**: resistance to separation of two joined materials.
- ● **Wetting**: adhesive spreads over surface → needed before any bonding can happen.
- ● **Contact angle**: smaller angle = better wetting (0° = complete wetting; 180° = no wetting).
- ● **Smear layer**: weak debris layer created by cutting tooth; blocks bonding unless treated.
- ● **Hybrid layer**: resin + collagen + dentin complex formed after dentin conditioning + resin infiltration.
- ● **Resin tags**: resin extensions into etched microporosities/tubules → micromechanical lock.
- ● **Luting agent**: cement that fills gap and retains an indirect restoration.
- ● **Microleakage**: fluid/bacteria movement through microscopic gap at interface.

![Dental Bonding Key Terms](assets/adhesion_img_2_1.png)

---

## 2) Why we bond (big 3 functions)

A dental bonding system should:
1. Resist separation of restoration/cement from tooth/substrate
2. Distribute stress along the interface
3. Seal margins → ↓ microleakage → ↓ sensitivity, staining, secondary caries

- ● Composite **cannot naturally bond** to tooth structure on its own.
- ● So, to create a strong bond, we **prepare the tooth surface** first:
  - ▫️ We apply an **acid etchant** to dissolve a thin superficial layer of enamel (and condition dentin), which creates **microscopic pores/irregularities**.
  - ▫️ When the bonding resin is applied, it flows into these microporosities and, after polymerization, forms **resin tags**.
  - ▫️ These tags lock into the tooth surface—like fingers interlocking—producing a strong **micromechanical bond**.

- ● In this topic, we mainly discuss **how this bond is formed**, **what materials** (etch, primer, adhesive) are used, and **why bonding is important** (retention, stress distribution, and sealing to reduce microleakage).
- ● We will primarily focus on **dentin bonding** as enamel bonding is much easier.

---

## 3) Historical turning points

- ● **Early dentistry**: mostly mechanical retention + non-adhesive luting (zinc phosphate era).
- ● **Hagger (late 1940s/1950s)**: early bonding concept (Sevriton-type self-adhesive idea).
- ● **Buonocore (1955)**: phosphoric acid enamel etch → **modern adhesive dentistry**.
- ● **Fusayama (1979)**: **total-etch concept** (enamel + dentin together).
- ● **Nakabayashi (1984)**: resin infiltrates demineralized dentin collagen → **hybrid layer concept**.
- ● **Kanca**: **wet bonding** (keep dentin moist so collagen doesn’t collapse).

---

## 4) How is the Bond Formed? (The Mechanism)

Since composite resin cannot naturally stick to tooth structure, we must create a **mechanical lock**.

### Step 1: Surface Demineralization (Making the Holes)
- ● **Enamel**: Acid dissolves the centers or peripheries of the enamel rods, removing about **10 microns** of surface and creating a **honeycomb-like microporous structure**.
- ● **Dentin**: Acid dissolves the mineral (hydroxyapatite) to expose a **mesh of collagen fibers** (the organic network).

### Step 2: Infiltration (Wetting)
- ● The bonding agent (resin) flows into these microscopic pores.
- ● In dentin, it infiltrates the collagen network to form a **"Hybrid Layer."**

### Step 3: Locking (Resin Tags)
- ● Once the resin hardens (polymerizes), it forms **Resin Tags** (approx. **6–20 µm** long in enamel).
- ● These tags lock into the tooth structure like a puzzle piece or, as you described, **fingers interlocking**.
- ● This is called **Micromechanical Bonding**.

![How Acid-Etch Bonding Works](assets/adhesion_img_4_1.png)

#### Why wetting alone is NOT enough for long-term bonding?
- ● Because you still need **stable infiltration + polymerized interlocking**, plus **durability against water/hydrolysis**, stresses, and contamination.

---

## 5) Factors that control bonding success (super high-yield)

### Wetting requirements
Good wetting needs:
- ● Clean surface
- ● Low surface tension adhesive
- ● High surface energy substrate

### A) Contamination
Saliva/blood/oil contamination → ↓ surface energy → ↓ wetting → ↓ resin tag formation → **FAILURE**.

### B) Water
Water interferes with adhesion; **more water = poorer adhesion**.
But dentin must still be **moist**, not desiccated (see dentin section).

- ● Contamination and excess moisture are major reasons why composite bonding fails.
- ● For a reliable bond, the field must be **clean and well-isolated**—free of saliva, blood, and debris—because contamination and water **prevent proper resin wetting and penetration**, reduce bond strength, and commonly cause **adhesive failure at the tooth–restoration interface**.
- ● However, dentin should **not be over-dried**.
  - ▫️ Aggressive air-drying can **collapse the exposed collagen network**, making the surface relatively impermeable and preventing resin infiltration—so the bond fails.

---

## 6) Smear layer (what it is + why it matters)

- ● **Smear layer**: Poorly adherent layer of ground dentin produced by cutting a dentin surface; also, a tenacious deposit of microscopic debris that covers enamel and dentin surfaces that have been prepared for a restoration.
- ● **Composition**:
  - ▫️ **Inorganic**: tooth structure + contaminants
  - ▫️ **Organic**: coagulated proteins/gelatinized collagen, pulp tissue, microorganisms
- ● **Clinical role** = double-edged:
  - ○ ✅ reduces dentin permeability (protective)
  - ○ ❌ very weak cohesive layer → interferes with strong bonding

![Smear Layer on Dentin](assets/adhesion_img_6_1.png)

### Two strategies:
1. **Remove smear layer** (etch-and-rinse)
2. **Modify/penetrate through it** (self-etch systems)

#### Factors affecting smear layer:
- ● **High-speed** = tightly attached
- ● **Coarse diamond** = thicker
- ● **Water spray** reduces amount/distribution but doesn’t prevent it.

---

## 7) Acid-etch technique

### ENAMEL Etching (Key Numbers)

**The Agent**
- ● **Material**: **Phosphoric acid** (usually supplied as a gel).
- ● **Concentration**: Typically **37%** (range **30%–50%**).
  - ▫️ **Note**: Concentrations **>50%** deposit **monocalcium phosphate monohydrate**, which inhibits etching.

**The Process (Key Numbers)**
- ● **Etching Time**: Approximately **15 seconds**.
  - ▫️ **Variation**: Primary teeth or teeth with high fluoride content may require longer etching time.
- ● **Rinsing Time**: Rinse thoroughly for about **20 seconds**.
- ● **Drying**: Must be dried completely until it takes on a **white, frosted appearance**.

**The Effect (Microscopic Details)**
- ● **Depth of Removal**: Dissolves the smear layer and removes approximately **10 microns** of the enamel surface.
- ● **Etching Patterns**:
  - ○ **Type I**: Dissolves the **centers** of enamel rods.
  - ○ **Type II**: Dissolves the **peripheral areas** of enamel rods.
- ● **Resulting Structure**: Creates a **high-energy, honeycomb-like surface**.

**Resin Tags (Mechanical Interlocking)**
- ● Resin penetrates these etched micropores to form "tags."
- ● **Tag Diameter**: Approximately **6 µm**.
- ● **Tag Length**: **10 to 20 µm**.

![Enamel Acid Etching](assets/adhesion_img_7_1.png)

---

### DENTIN Etching (Why it is Technique-Sensitive)

#### 1. Complex Composition (The Challenge)
Unlike enamel, dentin is a **living tissue** with a complex composition:
- ● **50% Inorganic**: Calcium phosphate mineral (hydroxyapatite).
- ● **30% Organic**: Mainly **Type I Collagen**.
- ● **20% Fluid**: Water.

#### 2. The Mechanism
- ● **Action**: The acid dissolves the mineral phase (hydroxyapatite) completely for **several microns**.
- ● **Result**: This exposes a **microporous network of collagen fibrils** that are suspended in water.

#### 3. The "Wet Bonding" Critical Balance
Dentin etching is highly sensitive because the collagen network relies on **water support** to remain expanded.
The dentist must manage the moisture level perfectly:

- ● **If Too Dry (The Collapse Hazard)**:
  - ○ If the dentin is air-dried aggressively, the **collagen network collapses**.
  - ○ This forms a relatively **impermeable layer** that prevents resin monomers from infiltrating.
  - ○ **Result**: Poor bond strength and failure.

- ● **If Too Wet**:
  - ○ If too much water remains, the resin (which is **hydrophobic**) cannot fully displace the water.
  - ○ **Result**: Resin infiltration is incomplete, leading to **voids and subsequent leakage**.

- ● **The Goal**:
  - ○ The dentin must be kept **moist (glistening)** to keep the collagen "fluffed" and expanded for resin uptake.
  - ○ A **Primer** is then used to displace the water and carry the adhesive into the collagen network.

![Dentin Wet Bonding Moisture Balance](assets/adhesion_img_9_1.png)

---

## 8) Process & procedural factors

- ● **Etching time**: usually **~15 sec** (may need slightly longer in high fluoride enamel or primary teeth).
- ● **Rinse properly** (often taught **~20 sec**) → remove acid residues.
- ● **Drying difference**:
  - ○ **Enamel**: dry hard (frosty)
  - ○ **Dentin**: keep moist (wet bonding concept)
- ● **If contaminated**: clean + re-etch (commonly **~10 sec** is taught in many manuals).

---

## 9) Why Condition (Etch) Dentin?

- ● **To Remove the Smear Layer**: Acid conditioning removes or modifies this layer.
- ● **To Expose the Network**: It dissolves the mineral part of the dentin (hydroxyapatite) to expose the **collagen network**.
  - ▫️ This creates the microporous "mesh" that the resin needs to infiltrate to form a bond.

---

## 10) Dentin Bonding Agents (DBA) Definition

- ● A thin layer of resin located between the conditioned dentin and the resin matrix of the composite restorative material.

### 1. The Hydrophilic Component (The Primer)
- ● **Chemical Used**: **HEMA** (2-hydroxylethyl methacrylate).
- ● **Why we need it**:
  - ○ **To Penetrate**: Dentin is wet (hydrophilic). HEMA is water-loving, so it can penetrate deep into the wet collagen network where other resins cannot go.
  - ○ **To Prevent Collapse**: It keeps the collagen fibers "fluffed up" and expanded after the acid is rinsed off.
  - ○ **To "Chase" Water**: It helps displace the water inside the dentin, making room for the resin.

![Why We Use A Primer](assets/adhesion_img_11_1.png)

### 2. The Hydrophobic Component (The Bonding Agent)
- ● **Chemical Used**: **Bis-GMA** (Bisphenol A glycidyl methacrylate) or **TEGDMA**.
- ● **Why we need it**:
  - ○ **To Match the Filling**: This is the same resin matrix used in the composite filling. Because they are chemically identical, they bond together perfectly (copolymerize).
  - ○ **To Seal**: It creates a tough, **hydrophobic layer** that seals the dentin tubules.
  - ○ **Strength**: It provides the physical strength of the bond.

### The "Why": The Bridge Effect
We need both because they act as a **chemical bridge**:
- ● **HEMA** holds hands with the **Wet Dentin**.
- ● **Bis-GMA** holds hands with the **Composite**.
- ● Together, they allow a **dry plastic filling** to stick to a **wet, living tooth**.

---

## 11) Enamel vs Dentin Bonding (Key Difference)

- ● **Enamel**: It is almost entirely mineral (hydroxyapatite) and can be dried completely. It acts as a **high-energy, dry surface** that resins can easily wet.
- ● **Dentin**: It is a living, wet tissue with a much higher organic content.
  - ▫️ **Inorganic (Mineral)**: ~50%
  - ▫️ **Organic (Collagen)**: ~30%
  - ▫️ **Fluid (Water)**: ~20%

- ● **Dentin is more challenging to bond than enamel** because it contains **much more organic material and water** (about **20–30% organic content plus fluid**), whereas enamel is mostly mineral with very little organic content.
- ● Since composite resins are relatively **hydrophobic**, they do not bond well to a wet surface, so bonding directly to dentin would be **weak and unpredictable**.
- ● At the same time, we **cannot over-dry dentin** after etching.
  - ▫️ Aggressive air-drying causes the exposed collagen network to **collapse**, which closes the microporosities created by etching and prevents resin from penetrating.
- ● To solve this, we use a **primer**.
  - ▫️ A primer contains **hydrophilic monomers** and a solvent that can **penetrate moist dentin and the exposed collagen network**, while still being compatible with the **hydrophobic bonding resin/composite**.
  - ▫️ In this way, the primer acts as a **bridge** between wet dentin and resin, enabling proper infiltration and formation of a strong **hybrid layer**.

---

## 12) Requirements for a "Successful DBA"

- ● Manage or remove the smear layer.
- ● Maintain the collagen scaffold (avoid collapse).
- ● Achieve excellent wetting and penetration.
- ● Polymerize inside the dentin and bond to the overlying resin.
- ● Resist water degradation over time.

---

## 13) Two Bonding "Targets"

1. **Tooth Side**: Formation of a micromechanical **hybrid layer and resin tags**.
2. **Restoration Side**: **Copolymerization** with the composite or cement resin matrix.

---

## 14) Hybrid layer

- ● After acid etching, the **primer and bonding resin** are applied.
- ● They flow into the microporosities of etched dentin and infiltrate the exposed collagen network.
- ● After light curing, this creates a layered interfacial zone called the **hybrid layer**—a “sandwich” made of **dentin collagen + infiltrated resin** (from primer/adhesive) that links the tooth to the composite.

#### Micro-hybrid layer
- ● The true microscopic interdiffusion zone inside dentin.
- ● Resin penetrates between collagen fibrils (nano/micro spaces) within the demineralized intertubular dentin.
- ● This is the real “hybridization” that gives **bond strength**.

#### Macro-hybrid layer
- ● The larger, visible/clinical “hybrid complex” at the interface, including:
  - ○ the hybrid layer region plus the adhesive layer on top
  - ○ and often resin tags extending into tubules
- ● Basically: everything at the bonding interface you can see as a thicker band, not just the microscopic collagen infiltration.

![Hybrid Layer Structure](assets/adhesion_img_12_1.png)
![Hybrid Layer Micro vs Macro](assets/adhesion_img_13_1.png)

---

## 15) Composition of bonding systems (what’s inside)

- ● **Etchant**: strong acid (often phosphoric **~30–50%**; commonly **37%**) to create microporosity.
- ● **Primer**: hydrophilic monomers + solvent (water/ethanol/acetone). Helps keep collagen expanded + replaces water.
- ● **Adhesive resin**: more hydrophobic dimethacrylates to form the sealing intermediate layer.
- ● **Initiators**: light-cure / self-cure / dual-cure systems.
- ● **Fillers (optional)**: may thicken/strengthen adhesive layer.
- ● **Other additives**: desensitizers, antimicrobials, fluoride, **MMP inhibitors** (like CHX in some protocols).

---

## 16) Dentin Bonding Agent (DBA) Classification

Different bonding systems are classified by **how many clinical steps** they require.
- ● In some systems, the steps are **separate**—for example **etch (rinse) → prime → bond**—so you apply each component one after another.
- ● In other systems, the materials are **combined** (primer + bond together, or even etch + prime + bond in one bottle), so you apply **one product** that performs multiple steps and simplifies the procedure.

![Dental Bonding Systems Step-by-Step](assets/adhesion_img_15_1.png)

| Category | System | Steps | Clinical Process | Key Characteristics from Text |
|:---|:---|:---|:---|:---|
| **Etch-and-Rinse** (Total-Etch) | **3-Step** (4th Gen) | 3 | 1. Etch (Rinse)<br>2. Primer<br>3. Adhesive | • The **"Gold Standard"**; most reliable and established.<br>• Separate hydrophobic resin layer seals the bond best. |
| **Etch-and-Rinse** (Total-Etch) | **2-Step** (5th Gen) | 2 | 1. Etch (Rinse)<br>2. Prime + Bond (Combined) | • Most effective for **Enamel**.<br>• Less durable on dentin (no separate hydrophobic layer, leading to water degradation). |
| **Self-Etch** | **2-Step** (6th Gen) | 2 | 1. Self-Etch Primer (No Rinse)<br>2. Adhesive | • **Good for dentin** because it prevents collagen collapse.<br>• Smear layer is modified/incorporated, not removed. |
| **Self-Etch** | **1-Step** (7th Gen) | 1 | 1. All-in-One (Etch+Prime+Bond) | • User-friendly but **least durable**.<br>• Acts as a semi-permeable membrane (attracts water).<br>• Prone to **hydrolytic degradation**. |

**Note**: **Universal Adhesives** (8th Gen) often contain **10-MDP** (bonds to Ca in tooth & Zirconia).

---

## 17) Universal adhesives / functional monomers

- ● **10-MDP** highlighted as key monomer:
  - ○ Bonds with dentin hydroxyapatite forming **stable calcium salts** (“nanolayering” concept in slide).
  - ○ Also helps bonding to **zirconia oxides**.
- ● Meta-analyses comparing UA strategies (ER vs SE) show that **enamel bond strength** tends to be lower with pure SE strategy, improved by **longer/active application or double-coat**.

---

## 18) Luting agents & resin cements (what to choose)

- ● **Traditional**: zinc phosphate (mainly mechanical), polycarboxylate, GIC/RMGI (chemical ionic bonding).
- ● **Resin cements**:
  - ▫️ Best mechanical properties + high bond strength.
  - ▫️ Can bond to many substrates (tooth, composite, ceramics, metals) with **appropriate surface treatment**.
- ● **Self-adhesive resin cements**: fewer steps; generally **weaker to intact enamel** than full etch systems (teaching point).
- ● **Veneers**: commonly prefer **light-cure resin cement** (color stability + working time).
- ● **Ceramics** may require:
  - ▫️ Sandblasting / **HF etch** (glass ceramics) / **Silane** / **Primers** (zirconia uses **MDP primers** + air abrasion type protocols).

✅ **Critical idea**: **No single cement is perfect** for every indirect restoration in every scenario—substrate and restoration type dictate protocol.

---

## 19) Orthodontic bracket bonding (steps)

Typical bonding sequence:
1. **Prophylaxis**
2. **Phosphoric acid etch**
3. **Rinse**
4. **Dry**
5. **Primer/sealant**
6. **Resin cement placement + bracket**
7. **Light cure**

![Orthodontic Bracket Bonding](assets/adhesion_img_17_1.png)

- ● **Note**: Self-adhesive cements are generally **not recommended** for ortho brackets because of lower bond to intact enamel vs conventional etch systems (common teaching).

---

## 20) Root canal sealers (bonding limitations)

Why bonding in canals is hard:
- ● **Long narrow space** → hard to uniformly apply/evaporate solvents/penetrate dentin.
- ● **Irrigants** (e.g., NaOCl) can affect collagen and bonding.
- ● **Extremely high C-factor** (ratio bonded:unbonded walls) → huge polymerization shrinkage stress → debonding/gaps → leakage → failure risk.

**Systems**:
- ● **Conventional**: gutta-percha + ZOE/CaOH/epoxy sealers (predictable).
- ● **Resin-based obturation systems** exist, but true durable adhesive seal is challenging.

---

## 21) Glass ionomer restoratives (GIC / RMGI)

- ● **True chemical bonding**: carboxyl groups (polyalkenoic acid) bond **ionically to Ca in hydroxyapatite**.
- ● **Low shrinkage stress** → good retention in low-stress areas (like class V cervical lesions).
- ● **Sandwich technique**: GIC base (fluoride release) + composite overlay.
- ● **Why not routine sealants?**: lower wear resistance and retention in high-stress occlusal areas (common exam logic).

---

## 22) Amalgam bonding

- ● **Bonded amalgam** = dentin bonding system + amalgam.
- ● **Aims**: ↓ microleakage, ↑ fracture resistance.
- ● **Mechanism**: mainly **mechanical interlocking** of condensed amalgam into viscous adhesive layer (macroretention), not true chemical bonding.

---

## 23) Pit & fissure sealants (clinical logic)

- ● **Goal**: flow into fissures + seal against bacteria/debris.
- ● **Needs low viscosity + excellent wetting** → etch is critical.
- ● **Evidence teaching point**: if sealant remains intact, caries progression under it can be **arrested/doesn’t progress**.

---

## 24) Quick “exam answers” to critical questions

- ● **Why wetting alone isn’t enough?** Needs resin infiltration + polymerization + hydrolytic stability + stress resistance; wetting is necessary but not sufficient.
- ● **What bonds form with DBA?** Mainly **micromechanical** (hybrid layer + resin tags) + **copolymerization** with composite/cement; limited chemical contribution.
- ● **Why dentin bond strengths vary?** Dentin water content, tubule orientation/density, smear layer variability, test method stress distribution—huge variability.
- ● **Do bonding agents behave same on enamel vs dentin?** No—enamel is dry/inorganic (predictable etch pattern); dentin is wet/organic/tubular (technique-sensitive).
- ● **Why self-adhesive cements not for ortho brackets?** Lower bond to intact enamel compared to phosphoric acid-etched conventional bracket resin systems (teaching standard).

---

`,$i=[{id:"bonding-1",question:"What is the primary mechanism of bonding composite to tooth structure?",options:["True chemical bonding","Micromechanical interlocking","Macromechanical retention","Van der Waals forces"],correctAnswerIndex:1,explanation:"The bond is primarily micromechanical, formed by resin tags interlocking with etched enamel and the hybrid layer in dentin."},{id:"bonding-2",question:"What is the function of acid etching on enamel?",options:["To dry the tooth","To create microporosities for resin infiltration","To kill bacteria","To chemically bond to calcium"],correctAnswerIndex:1,explanation:"Acid etching dissolves hydroxyapatite to create a honeycomb microporous structure that allows resin to penetrate and lock."},{id:"bonding-3",question:"The 'Hybrid Layer' is formed by the infiltration of resin into:",options:["Etched enamel prisms","The smear layer","The exposed collagen network of dentin","The pulp chamber"],correctAnswerIndex:2,explanation:"The hybrid layer is the zone where resin infiltrates the demineralized collagen mesh of etched dentin."},{id:"bonding-4",question:"Which component of a bonding system is hydrophilic and helps re-expand collapsed collagen?",options:["Etchant","Primer","Adhesive resin","Filler"],correctAnswerIndex:1,explanation:"The primer contains hydrophilic monomers (like HEMA) and solvents that penetrate wet dentin and prevent collagen collapse."},{id:"bonding-q1",question:"Adhesion is best defined as:",options:["Attraction within the same material","Attraction between two different materials at an interface","Resistance to crack propagation inside a material","Ability of a liquid to evaporate"],correctAnswerIndex:1,explanation:"✅ Answer: B — Adhesion = attraction between different materials at an interface."},{id:"bonding-q2",question:"Cohesion refers to:",options:["Attraction within the same material","Attraction between tooth and resin","Movement of bacteria through margins","Resin penetration into dentinal tubules"],correctAnswerIndex:0,explanation:"✅ Answer: A — Cohesion = internal attraction within one material."},{id:"bonding-q3",question:"The tooth structure (enamel/dentin/ceramic/metal) being bonded is called:",options:["Adhesive","Adherend","Luting agent","Primer"],correctAnswerIndex:1,explanation:"✅ Answer: B — Adherend = substrate being bonded."},{id:"bonding-q4",question:"Which term means “adhesive spreads over the surface and is required before bonding”?",options:["Cohesion","Wetting","Polymerization","Microleakage"],correctAnswerIndex:1,explanation:"✅ Answer: B — Wetting must happen before any true bond develops."},{id:"bonding-q5",question:"A smaller contact angle indicates:",options:["Worse wetting","Better wetting","No effect on wetting","Only chemical bonding increases"],correctAnswerIndex:1,explanation:"✅ Answer: B — Smaller angle = better wetting (0° = complete wetting)."},{id:"bonding-q10",question:"Resin tags mainly contribute to bond strength by:",options:["Chemical bonding to enamel crystals","Micromechanical retention into etched microporosities/tubules","Increasing dentin moisture","Increasing smear layer thickness"],correctAnswerIndex:1,explanation:"✅ Answer: B — Tags = physical interlocking extensions."},{id:"bonding-q13",question:"“More water = poorer adhesion” is TRUE because water mainly:",options:["Enhances hydrophobic resin infiltration","Prevents polymerization shrinkage","Interferes with adhesion and resin infiltration","Creates more resin tags"],correctAnswerIndex:2,explanation:"✅ Answer: C — Water competes with resin penetration and durability."},{id:"bonding-q19",question:"Most commonly used enamel etchant is:",options:["Hydrofluoric acid 9%","EDTA 17%","Phosphoric acid ~37% gel","Polyacrylic acid 10%"],correctAnswerIndex:2,explanation:"✅ Answer: C — Standard enamel etch is phosphoric ~37%."},{id:"bonding-q20",question:"Typical enamel etching time is about:",options:["5 seconds","15 seconds","60 seconds","2 minutes"],correctAnswerIndex:1,explanation:"✅ Answer: B — High-yield number: ~15 s."},{id:"bonding-q22",question:"A correctly etched enamel surface should look:",options:["Glossy and wet","White, frosted/chalky","Brown and stained","Oily and shiny"],correctAnswerIndex:1,explanation:"✅ Answer: B — “Frosty” = good etch pattern and dryness."},{id:"bonding-q24",question:"Enamel etch pattern Type I means:",options:["Dissolves peripheral enamel rods","Dissolves centers of enamel rods","No demineralization occurs","Produces only smear layer removal"],correctAnswerIndex:1,explanation:"✅ Answer: B — Type I = rod core dissolution."},{id:"bonding-q27",question:"Dentin composition is approximately:",options:["95% inorganic, 5% water","50% inorganic, 30% organic, 20% fluid","20% inorganic, 80% organic","100% inorganic like enamel"],correctAnswerIndex:1,explanation:"✅ Answer: B — Key concept: dentin is wetter/organic → harder to bond."},{id:"bonding-q38",question:"After etching, drying requirements are:",options:["Enamel moist, dentin dry hard","Enamel dry hard, dentin moist","Both enamel and dentin flooded","Both enamel and dentin bone-dry"],correctAnswerIndex:1,explanation:"✅ Answer: B — Classic exam contrast: enamel dry / dentin moist."},{id:"bonding-q40",question:"Glass ionomer bonds to tooth primarily by:",options:["Micromechanical resin tags","Ionic bonding of carboxyl groups to calcium in hydroxyapatite","Metallic bonding","Hydrogen bonding to saliva proteins"],correctAnswerIndex:1,explanation:"✅ Answer: B — True chemical ionic bond to Ca."}],Qi=[{id:"bonding-m1",question:"Why must dentin be kept 'moist' after etching (Wet Bonding technique)?",options:["To dilute the primer","To prevent collagen network collapse","To increase surface energy of hydroxyapatite","To neutralize the acid"],correctAnswerIndex:1,explanation:"If dentin is dried too much, the collagen network collapses and forms an impermeable layer, preventing resin infiltration and hybrid layer formation."},{id:"bonding-m2",question:"Which generation of bonding systems is considered the 'Gold Standard' for long-term durability?",options:["1-Step Self-Etch (7th Gen)","2-Step Etch-and-Rinse (5th Gen)","3-Step Etch-and-Rinse (4th Gen)","Universal Adhesives (8th Gen)"],correctAnswerIndex:2,explanation:"The 3-Step Etch-and-Rinse system (Etch + Primer + Bond) is the gold standard because it allows separate placement of a hydrophobic bonding layer, ensuring the best seal and durability."},{id:"bonding-m3",question:"What is the role of 10-MDP in universal adhesives?",options:["It is a solvent","It provides chemical bonding to calcium and zirconia","It acts as a photoinitiator","It removes the smear layer aggressively"],correctAnswerIndex:1,explanation:"10-MDP is a functional monomer that can chemically bond to hydroxyapatite (calcium) and oxide ceramics (like Zirconia), enhancing bond stability."},{id:"bonding-q6",question:"The “big 3” goals of a bonding system are best represented by:",options:["Color matching, fluoride release, radiopacity","Resist separation, distribute stress, seal margins","Faster setting, higher viscosity, low cost","Increase smear layer, reduce wetting, increase porosity"],correctAnswerIndex:1,explanation:"✅ Answer: B — Core goals: retention + stress distribution + seal."},{id:"bonding-q7",question:"Composite resin primarily bonds to etched enamel by:",options:["Ionic bonding to calcium","Micromechanical interlocking via resin tags","Hydrogen bonding to collagen","Metallic bonding"],correctAnswerIndex:1,explanation:"✅ Answer: B — Etching creates microporosities → resin tags → micromechanical lock."},{id:"bonding-q8",question:"The correct sequence for micromechanical bonding is:",options:["Polymerize → etch → rinse","Etch/demineralize → infiltration/wetting → polymerized locking (tags/hybrid layer)","Rinse → dry dentin completely → bond","Smear layer formation → bond → etch"],correctAnswerIndex:1,explanation:"✅ Answer: B — You first make micropores, then infiltrate, then polymerize to lock."},{id:"bonding-q11",question:"To achieve optimal wettability (contact angle → 0°) during bonding, which relationship must exist?",options:["High surface tension resin + low surface energy tooth","High surface energy tooth (clean/etched) + low surface tension resin","Equal, high surface tension values in both for “cohesive equilibrium”","Saliva contamination lowers surface energy and improves flow"],correctAnswerIndex:1,explanation:"✅ Answer: B — High-energy substrate + low-tension adhesive = best wetting (small contact angle)."},{id:"bonding-q12",question:"Saliva/blood contamination usually causes bond failure mainly by:",options:["Increasing surface energy","Decreasing surface energy","Increasing etch depth","Increasing resin tag length"],correctAnswerIndex:1,explanation:"✅ Answer: B — Contamination lowers surface energy → worse wetting → weaker bond."},{id:"bonding-q14",question:"After dentin etching, the ideal moisture condition is:",options:["Bone-dry (chalky) dentin","Glistening moist dentin (not puddled)","Flooded dentin with visible water droplets","No rinse after etch"],correctAnswerIndex:1,explanation:"✅ Answer: B — Moist keeps collagen expanded; too dry collapses, too wet blocks infiltration."},{id:"bonding-q15",question:"Smear layer is BEST defined as:",options:["Strong enamel layer formed after etching","Poorly adherent debris layer created by cutting that covers prepared enamel/","A cured bonding resin layer","A bacterial biofilm only"],correctAnswerIndex:1,explanation:"✅ Answer: B — Cutting produces a weak debris layer that interferes with bonding."},{id:"bonding-q16",question:"Clinically, the smear layer is “double-edged” because it:",options:["Always improves bond strength","Reduces permeability (protective) BUT is weak and interferes with bonding","Increases enamel hardness","Makes dentin drier"],correctAnswerIndex:1,explanation:"✅ Answer: B — Protective barrier but weak cohesive layer."},{id:"bonding-q17",question:"Two major strategies regarding smear layer are:",options:["Remove it with self-etch; keep it with total-etch","Remove (etch-and-rinse) OR modify/penetrate (self-etch)","Never touch it; always bond over it","Only remove it in enamel, never in dentin"],correctAnswerIndex:1,explanation:"✅ Answer: B — That’s the core difference in systems."},{id:"bonding-q18",question:"Smear layer tends to be thicker with:",options:["Fine finishing burs only","Coarse diamond preparation","Increased rinsing time only","Low-speed polishing only"],correctAnswerIndex:1,explanation:"✅ Answer: B — Coarse diamond → thicker smear layer."},{id:"bonding-q28",question:"The major risk of over-drying etched dentin is:",options:["Increased resin tag formation","Collagen network collapse","Deeper etching pattern","Better bond durability"],correctAnswerIndex:1,explanation:"✅ Answer: B — Collapsed collagen. → impermeable surface → poor infiltration"},{id:"bonding-q29",question:"If dentin is left too wet after etching, bond strength drops mainly because:",options:["Hydrophobic resin cannot displace water","Water increases polymerization","Smear layer becomes stronger","Enamel rods dissolve"],correctAnswerIndex:0,explanation:"✅ Answer: A — Hydrophobic resin cannot displace water → incomplete infiltration/voids → leakage."},{id:"bonding-q30",question:"The MOST important role of the primer in dentin bonding is:",options:["Make enamel frosty","Displace water and carry monomers into exposed collagen network","Increase smear layer thickness","Replace etching completely in total-etch systems"],correctAnswerIndex:1,explanation:"✅ Answer: B — Primer bridges moist collagen to resin."},{id:"bonding-q31",question:"HEMA in primer is primarily:",options:["Hydrophobic monomer that seals tubules","Hydrophilic monomer that penetrates moist dentin collagen","Acid etchant","Filler particle"],correctAnswerIndex:1,explanation:"✅ Answer: B — HEMA = hydrophilic, penetrates wet collagen."},{id:"bonding-q33",question:"Why is isolation (rubber dam/cotton roll + suction) critical during composite bonding?",options:["It increases dentin tubule diameter, improving resin tag length","It prevents saliva/blood contamination that lowers surface energy and blocks proper wetting","It makes enamel rods dissolve faster, creating deeper etch patterns","It prevents polymerization of the bonding agent"],correctAnswerIndex:1,explanation:"✅ Answer: B — Contamination reduces wetting/penetration → weak bond + leakage."},{id:"bonding-q34",question:"4th generation (3-step etch-and-rinse) sequence is:",options:["Etch → bond only","Etch (rinse) → primer → adhesive","Self-etch primer → adhesive","All-in-one single bottle only"],correctAnswerIndex:1,explanation:"✅ Answer: B — Gold standard: separate primer + separate adhesive."},{id:"bonding-q35",question:"A key weakness of 5th generation (2-step etch-and-rinse) vs 4th gen is:",options:["Cannot bond to enamel at all","No separate hydrophobic adhesive layer","Always removes smear layer incompletely","Requires no etching"],correctAnswerIndex:1,explanation:"✅ Answer: B — Combining steps reduces long-term dentin durability.No separate hydrophobic adhesive layer → more water degradation over time"},{id:"bonding-q36",question:"Self-etch systems are often “good for dentin” because they:",options:["Require complete desiccation of collagen","Reduce collagen collapse risk and incorporate/modify smear layer","Produce the frosty enamel appearance","Always give highest enamel bond strength without selective etch"],correctAnswerIndex:1,explanation:"✅ Answer: B — Less collapse risk; smear layer is modified rather than fully removed."},{id:"bonding-q37",question:"7th generation (1-step self-etch) systems tend to be less durable because they:",options:["Are fully hydrophobic","Act like semi-permeable membranes and attract water","Cannot polymerize","Always increase resin tag length"],correctAnswerIndex:1,explanation:"✅ Answer: B — “All-in-one” often → more water movement and breakdown."},{id:"bonding-q39",question:"If the etched surface gets contaminated (saliva/blood), the BEST immediate management is typically:",options:["Cure the adhesive immediately without cleaning","Clean and re-etch","Skip bonding agent and place composite directly","Use GIC only"],correctAnswerIndex:1,explanation:"✅ Answer: B — Contamination kills wetting; re-etch restores surface energy."},{id:"bonding-q41",question:"Bonded amalgam improves outcomes mainly by:",options:["Strong chemical bonding between amalgam and dentin","Mechanical interlocking of condensed amalgam into viscous adhesive (macroretention) + reduced microleakage","Enamel resin tags inside amalgam","Increasing polymerization shrinkage"],correctAnswerIndex:1,explanation:"✅ Answer: B — Mostly mechanical, not true chemical bonding."},{id:"bonding-q42",question:"Pit & fissure sealant success MOST depends on:",options:["High viscosity and poor wetting","Excellent flow + etch-created microporosity for retention","Chemical bonding like GIC","No need for isolation"],correctAnswerIndex:1,explanation:"✅ Answer: B — Low viscosity + etch → retention + seal."},{id:"bonding-q43",question:"Orthodontic bracket bonding typically includes:",options:["Prophylaxis → phosphoric etch → rinse → dry → primer/sealant → resin + bracket → light cure","HF etch only → silane → cement","No etching required","Only GIC placement"],correctAnswerIndex:0,explanation:"✅ Answer: A — Standard bracket bonding protocol sequence."}],Xi=[{id:"bonding-h1",question:"A 'Type I' enamel etching pattern involves:",options:["Dissolution of the peripheral enamel rods","Dissolution of the centers of enamel rods","Removal of the smear layer only","Precipitation of calcium salts"],correctAnswerIndex:1,explanation:"Type I etching pattern dissolves the centers (cores) of enamel rods. Type II dissolves the peripheries."},{id:"bonding-q9",question:"In dentin bonding, the Hybrid Layer is structurally distinct from Resin Tags because it consists of:",options:["Projections of adhesive resin extending deep into opened dentinal tubules","A layer of pure, unfilled adhesive resin sitting on top of the primed surface","Resin monomers infiltrated and polymerized within the demineralized intertubular collagen network","Modified smear layer incorporated into the acidic primer without removal"],correctAnswerIndex:2,explanation:"✅ Answer: C — Hybrid layer = resin-infiltrated demineralized collagen (intertubular dentin)."},{id:"bonding-q21",question:"A clinician accidentally uses high-concentration phosphoric acid (>50%) or leaves the etchant on too long, and later notices the enamel does not etch effectively despite “more time.” What is the MOST likely reason?",options:["Collagen network collapses due to overdrying","Formation of a monocalcium phosphate monohydrate precipitate that inhibits further etching","Enamel rods become more resistant because smear layer thickens","Resin tags become excessively long, causing cohesive enamel fracture"],correctAnswerIndex:1,explanation:"✅ Answer: B — >50% phosphoric acid (or excessive etching conditions) can deposit monocalcium phosphate monohydrate on the surface, which inhibits further dissolution, reducing etching effectiveness and risking weak bonding."},{id:"bonding-q25",question:"Why is simply air-drying a saliva-contaminated etched enamel surface insufficient to restore bond strength, so re-etching is needed?",options:["Saliva water penetrates deep and cannot evaporate, causing hydrolytic degradation","Salivary glycoproteins adsorb to etched enamel, lowering surface energy and preventing resin wetting","Bacterial enzymes inhibit camphorquinone, preventing full cure","Saliva minerals precipitate into a hyper-mineralized smear layer that blocks micropores"],correctAnswerIndex:1,explanation:'✅ Answer: B Why B is the best answer: The "ambiguity" here is that while saliva contains water (A), bacteria (C), and minerals (D), the immediate reason for bond failure is the organic biofilm (glycoproteins). Acid-etched enamel is a "high-energy" surface. Organic proteins function like oil—they coat the surface instantly. You cannot "dry" oil off; you must re-etch to burn it off.'},{id:"bonding-q32",question:"Question: In a multi-step adhesive system, what is the primary role of the hydrophobic dimethacrylates (such as Bis-GMA and TEGDMA) found in the bonding agent?",options:["To act as a solvent that displaces water from the collagen network.","To copolymerize with the restorative composite and seal the primed dentin.","To demineralize the smear layer and expose the collagen fibrils.","To provide a hydrophilic interface that wets the naturally moist dentin surface."],correctAnswerIndex:1,explanation:"✅ Answer: B The bonding agent (Bis-GMA/TEGDMA) is chemically identical to the resin matrix of the composite filling. Its job is to bind to the primer and then copolymerize (link chemically) with the composite, creating a strong, sealed union."},{id:"bonding-q44",question:"Why is bonding in root canals difficult?",options:["Low C-factor and easy solvent evaporation","High C-factor + difficult access + irrigants (e.g., NaOCl) affecting bonding","Enamel-like substrate and dry field","No fluid in dentin tubules"],correctAnswerIndex:1,explanation:"✅ Answer: B — High C-factor + technique challenges + irrigant effects."},{id:"bonding-q45",question:"The major risk of high C-factor in canals is:",options:["Increased wetting","Huge polymerization shrinkage stress","Better marginal seal always","Increased fluoride release"],correctAnswerIndex:1,explanation:"✅ Answer: B — High bonded:unbonded ratio concentrates shrinkage stress."},{id:"bonding-q46",question:"Why is bonding to sclerotic dentin (glassy, shiny dentin) significantly harder than bonding to normal dentin?",options:["It is excessively wet and hydrophilic.","The dentinal tubules are obliterated with mineral, preventing hybrid layer formation.","It is too soft to support the bond.","It contains excessive bacteria."],correctAnswerIndex:1,explanation:`✅ Answer: B
Why (exam logic):
● Sclerotic dentin is hyper-mineralized.
● Dentinal tubules are occluded with mineral deposits.
● Acid etching cannot adequately demineralize the surface → collagen network is not exposed → poor resin infiltration → weak or absent hybrid layer.`}],ji=`
# Dental Waxes

The only wax that requires detail is the inlay wax other u have to remember uses mostly and
some properties

**Inlay wax**: The wax used to make the wax pattern (positive replica) of a restoration; this
pattern is then invested and burned out to create a negative mold for casting.

![Inlay Wax Overview](assets/images/wax/wax_pdf_img_1.png)

## Inlay wax (Pattern wax) — complete topic

### 1) What inlay wax actually does (core concept)
- **Inlay wax is a pattern wax** → you build a positive wax pattern of the restoration (inlay/onlay/crown, etc.).
- That wax pattern is invested (surrounded by investment).
- Then wax is burned out → leaves a negative mold space inside the investment.
- Molten alloy (or pressed ceramic in some systems) fills that space → **final restoration can only be as accurate as the wax pattern**.

![Pattern Process](assets/images/wax/wax_pdf_img_2.png)

![Pattern Example](assets/images/wax/wax_pdf_img_3.png)


### 2) Where it fits in classification
Dental waxes can be classified:

**By use location**
- **Clinical**: bite registration wax, disclosing wax, utility wax, Type I inlay wax (direct technique; low melting; used in mouth).
- **Laboratory**: boxing wax, baseplate wax, sticky wax, beading wax, utility wax, Type II inlay wax (indirect technique; used on die/model).

**By function**
- **Pattern wax/modeling waxes**: inlay wax, casting wax, baseplate wax
- **Processing wax**: boxing, utility, sticky
- **Impression wax**: bite registration/corrective

✅ **Inlay wax belongs to pattern waxes.**
✅ **Type II wax is required for lost-wax processing of cast prostheses/frameworks.**

---

### 3) Composition (what’s inside + why) IMP
- **Paraffin (~40–60%)** → main body; moldable but flakes and lacks smooth/gloss alone.
- **Gum dammar (dammar resin)** → improves smoothness, ↑ toughness, ↓ cracking/flaking, improves luster.
- **Carnauba wax** → very hard, high MP → reduces flow at mouth temperature, adds gloss.
- **Candelilla wax** → can replace carnauba partly/fully (similar effect; lower MP; less hard).
- **Ceresin** → improves toughness + carving behavior (may replace part of paraffin).
- **Synthetic waxes** (compatible with paraffin) → more uniform; allow better working characteristics.
- **Coloring agents** → contrast with tooth/die/model; helps margin carving.
- **Fillers (sometimes)** → help control expansion/shrinkage; must burn out cleanly.

#### The few constituents that matter (exam logic)
**High-yield**: different waxes are basically the same “base wax” recipe, but you shift the % of key constituents to force the behavior you want (tacky vs hard vs pliable vs low-flow).

Here’s the high-yield “ingredient → effect → which wax uses more of it”:

**1) Paraffin (hydrocarbon base)**
- More paraffin → more moldable/flowy, but also more shrinkage + more flaking/brittleness if it’s “too pure.”
- ✅ Used in most waxes as the main body (often ~40–60% in inlay wax).

**2) Hardeners (Carnauba > Candelilla)**
- More carnauba/candelilla → harder, higher melting range, lower flow at mouth temp, more gloss, but can become more brittle.
- ✅ “Hardness + low mouth-flow” waxes use more of this.

**3) Tougheners / anti-flake modifiers**
- Dammar resin (gum dammar) / microcrystalline wax / ceresin
- More dammar → smoother surface + tougher, less cracking/flaking
- More microcrystalline/ceresin → tougher, less brittle, better carving/adaptation than paraffin alone
- ✅ Waxes that must carve nicely or not chip use more of these.

**4) Tackifier resin (Rosin / sticky resins)**
- More rosin → very tacky when melted, brittle when cooled (classic sticky wax behavior).
- ✅ **Sticky wax = high rosin** (this is the big differentiator).

**5) Plasticizers (often Beeswax / soft wax fractions)**
- More beeswax/soft fractions → more pliable, easier to adapt at room temp, but more distortion/flow at mouth temp if excessive.
- ✅ Used in waxes that need to be soft and adaptable.

**6) Fillers (sometimes added)**
- More filler → stiffer, less thermal distortion/shrink, can improve handling (common idea in bite reg waxes).
- ✅ Used where dimensional stability is critical.

#### Now apply it: “If you want this wax… increase these”

**Sticky wax**
- Goal: tacky when hot, locks parts when cool
- Main use: Hold metal parts together before soldering (also holds broken denture parts/model pieces temporarily).
- ● ↑ Rosin / tackifying resins (main difference)
- ● Moderate base wax (paraffin/microcrystalline)
- ● Low plasticizer (so it becomes brittle/firm when cooled)

**Inlay wax (pattern wax) ← must do**
- Goal: accurate pattern, low flow at mouth temp, good carving, clean burnout
- ● ↑ Paraffin base
- ● ↑ Carnauba (hardener) to reduce mouth-temp flow
- ● ↑ Dammar resin to reduce flaking + improve smoothness/gloss
- ● Sometimes ↑ ceresin/microcrystalline for toughness/carvability
- **Type I (direct)**: generally tuned for lower flow at 37°C (so “more hardener / higher-MP fractions” idea).
- **Type II (indirect)**: comes soft/medium/hard depending on how much hardener/toughener is used.

**Boxing wax**
- Goal: soft, pliable sheet, seals around impression
- ● ↑ Plasticizer/soft wax fractions (more pliable)
- ● Often ↑ microcrystalline for smooth bending without cracking
- ● Low carnauba (you don’t want it hard)
- ● Small resin content helps it “self-seal” when pressed

**Baseplate wax**
- Goal: stable record base + rim form (dentures)
- ● ↑ Paraffin/ceresin base (major portion)
- ● ↑ Beeswax/resins to control flow and handling
- ● Hard/medium/soft types = mostly by shifting hardener vs plasticizer

**Utility wax**
- Goal: very adaptable at room temp for tray borders
- ● ↑ microcrystalline + plasticizers (very pliable)
- ● Low hardeners (otherwise it won’t adapt easily)

**Bite registration (impression) wax**
- Goal: records occlusion with minimal rebound/distortion after removal
- ● Often ↑ fillers and stability modifiers
- ● Controlled flow: soft enough at mouth temp to record, rigid enough at room temp to hold shape

---

### 4) Types (Type I vs Type II)
- **Type I inlay wax (Direct technique)**
  - Used in the mouth
  - Must have very low flow at 37°C so it can be carved/removed without distortion.
- **Type II inlay wax (Indirect technique)**
  - Used on die/model
  - Comes as soft/medium/hard varieties; used for lost-wax patterns made outside the mouth.

### 5) Flow (most tested property)
Why flow matters: too much flow → distortion and wrong fit.

**Type I**
- 37°C: max 1%
- 45°C: 70–90%

**Type II**
- 30°C: max 1%
- 37°C: max 50%
- 45°C: 70–90%

**Meaning (exam logic):**
- At 45°C, wax must flow a lot → to adapt into fine details.
- At 37°C, Type I must barely flow → so the pattern doesn’t distort while carving/removing in the mouth.

---

### 6) Thermal properties (why direct technique is tricky)
- **Low thermal conductivity** → wax heats/cools unevenly unless given time.
- **High coefficient of thermal expansion (CTE)** → tiny temperature changes = big dimensional change (**largest among dental materials**).
  - Wax may expand ~0.7% with +20°C
  - May contract ~0.35% cooling 37°C → 25°C
- Glass transition region (~35°C) in paraffin-rich waxes → expansion/plasticity behavior changes around here.
- ✅ This is less significant in indirect technique because the pattern isn’t going mouth → room temp.

### 7) Wax distortion (common causes)
Wax patterns distort due to:
- Physical deformation during molding/carving/removal
- Trapped stresses from cooling/manipulation
- Elastic memory
- Occluded air
- Excess storage time (stress relaxation)
- Temperature extremes/changes during storage/handling

**Key rule**: best fit occurs when a pattern is **invested immediately** after removal.

### 8) Burnout requirement (must know)
- Wax must be eliminated completely from the mold during burnout.
- If wax leaves residue/impervious coating → casting quality and fit suffer.
- Ideal: at ~500°C, residue should be **≤0.10%** of original wax weight.

### 9) The classic “critical question” (direct vs indirect fit)
**Why can a direct wax pattern produce a looser inlay than indirect?**
- Because in direct technique the pattern is formed at mouth temperature, then removed and cools to room temperature causing thermal contraction + stress release (elastic memory) → distortion/shrinkage → inaccurate pattern → poorer fit.
`,Yu=`
# Wax (Summary)

## Key Definitions
- **Pattern Wax**: Used to create the mold (e.g., Inlay Wax).
- **Processing Wax**: Used to aid laboratory steps (e.g., Boxing Wax).
- **Impression Wax**: Used to record bites (e.g., Aluwax).

## Composition Highlights
- **Paraffin**: Main ingredient (40-60%).
- **Carnauba**: Hardener + Gloss.
- **Dammar**: Toughener + Smoothness.

## Critical Exam Points
- **CTE**: Highest of ALL dental materials (expands/contracts the most).
- **Conductivity**: Very low (insulator). Heat evenly to avoid stress.
- **Elastic Memory**: Wax distorts over time. **Invest immediately.**
- **Type I vs II**: 
  - Type I (Direct/Mouth): Low flow at 37°C.
  - Type II (Indirect/Bench): Used on dies.
`,Le=["Inlay wax is a pattern wax used to create the lost-wax mold space.","Paraffin (~40-60%) is the main component but causes brittleness if used alone.","Carnauba wax is added as a hardener to reduce flow at mouth temperature.","Gum Dammar is a toughener added to prevent carving from flaking or cracking.","Type I inlay wax is for direct (in-mouth) use; it has stricter flow limits at 37°C.","Dental waxes have the highest coefficient of thermal expansion of all dental materials.","Waxes have low thermal conductivity; they must be heated slowly and evenly.","Investing immediately after removal prevents distortion caused by stress relaxation.","Clean burnout requires residue to be ≤ 0.10% by weight."],eo=[{id:"wax-pdf-2",question:"Biggest reason wax is dimensionally unstable vs other materials:",options:["High CTE","High strength","High k","High density"],correctAnswerIndex:0,explanation:"✅ Answer: A Wax has very high thermal expansion (CTE)."},{id:"wax-pdf-5",question:"Cause of shape change hours after carving:",options:["Elastic memory","Hygroscopy","Corrosion","Polymerization"],correctAnswerIndex:0,explanation:"✅ Answer: A Wax relieves trapped stresses over time."},{id:"wax-pdf-10",question:"Main base wax:",options:["Paraffin","Rosin","Gypsum","Eugenol"],correctAnswerIndex:0,explanation:"✅ Answer: A Paraffin is the main body (often 40–60%)."},{id:"wax-pdf-13",question:"During inlay wax manipulation, dry heat is preferred over a water bath. The main reason is that a water bath can:",options:["Cause staining of wax","Introduce water droplets into wax","Increase radiopacity of wax","Cause corrosion of wax"],correctAnswerIndex:1,explanation:"✅ Answer: B Water droplets incorporated into wax can cause varying expansion and spattering (smearing) during heating."},{id:"wax-pdf-18",question:"Highest thermal conductivity (k):",options:["Wax","Metal","Ceramic","PMMA"],correctAnswerIndex:1,explanation:"✅ Answer: B Metals transfer heat fastest."},{id:"wax-pdf-20",question:"Material that softens over a range (not a single sharp point):",options:["Pure metal","Wax","Gypsum","Ceramic"],correctAnswerIndex:1,explanation:"✅ Answer: B Wax is a mixture → softens over a melting range."},{id:"wax-pdf-21",question:"Material with sharp melting point:",options:["Wax","Pure metal","PMMA","Alginate"],correctAnswerIndex:1,explanation:"✅ Answer: B Pure metals melt at a defined temperature."},{id:"wax-pdf-23",question:"Material designed for elastic recovery after removal from undercuts:",options:["Inlay wax","Elastomer impression","Gypsum die","Ceramic"],correctAnswerIndex:1,explanation:"✅ Answer: B Elastomers are meant to recover elastically."},{id:"wax-pdf-26",question:"Pattern material that must burn out cleanly to leave a mold:",options:["Wax pattern","Gypsum die","Ceramic crown","Metal coping"],correctAnswerIndex:0,explanation:"✅ Answer: A Lost-wax needs clean burnout → clean cavity."},{id:"wax-pdf-29",question:"The biggest reason direct wax patterns are less accurate than indirect:",options:["No die needed","Mouth→room temp change","Wax is radiolucent","Wax is brittle"],correctAnswerIndex:1,explanation:"✅ Answer: B Cooling causes thermal contraction + distortion."},{id:"wax-pdf-30",question:"Material that is chemically set (not thermoplastic):",options:["Wax","Gypsum","Impression compound","PMMA sheet"],correctAnswerIndex:1,explanation:"✅ Answer: B Gypsum hardens by a setting reaction."},{id:"wax-pdf-32",question:"Which pair is correct?",options:["Wax = chemical set; gypsum = thermoplastic","Wax = thermoplastic; gypsum = chemical set","Wax = crystalline lattice; metal = amorphous","Wax = rigid; ceramic = flexible"],correctAnswerIndex:1,explanation:"✅ Answer: B Wax softens with heat; gypsum sets chemically."},{id:"wax-pdf-34",question:"A wax pattern leaves a film inside the mold after burnout. The most likely casting effect is:",options:["Surface defect/misfit","Stronger casting","Higher conductivity","Less porosity always"],correctAnswerIndex:0,explanation:"✅ Answer: A Residue coats mold wall → poor surface/fit."},{id:"wax-pdf-35",question:"Best material for rigid die (carving margins against it):",options:["Wax","Gypsum die stone","Alginate","Elastomer impression"],correctAnswerIndex:1,explanation:"✅ Answer: B Die must be rigid and stable."}],to=[{id:"wax-pdf-1",question:"Direct wax pattern → looser casting mainly due to:",options:["Expansion","Contraction","Corrosion","Setting"],correctAnswerIndex:1,explanation:"✅ Answer: B Mouth → room cooling causes thermal contraction + distortion."},{id:"wax-pdf-4",question:"A wax pattern looks perfect on the die, but after 1–2 hours the margins open slightly. The BEST step to prevent this is:",options:["Bench storage","Immediate investing","Reheating margins","Finger pressure"],correctAnswerIndex:1,explanation:"✅ Answer: B Wax undergoes stress relaxation/elastic memory with time; immediate investing locks the pattern inside the set investment, so it can’t deform later."},{id:"wax-pdf-6",question:"You’re assisting in clinic. The operator says: “I’m doing a direct wax pattern for an inlay. Warm the wax, adapt it inside the prepared cavity in the mouth, carve margins at oral temperature, then remove it without distortion.” Which wax is indicated?",options:["Type I inlay wax","Type II inlay wax","Baseplate wax","Sticky wax"],correctAnswerIndex:0,explanation:"✅ Answer: A Type I is for direct intraoral waxing and is formulated to resist distortion at 37°C."},{id:"wax-pdf-7",question:"Lab bench scenario The patient has left. You’re at the bench with a stone die. Your technician says: “Make the inlay wax pattern on the die using the indirect technique. Pick the wax that comes in soft/medium/hard grades for lab waxing.” Which wax is indicated?",options:["Type I inlay wax","Type II inlay wax","Bite registration wax","Boxing wax"],correctAnswerIndex:1,explanation:"✅ Answer: B Type II is designed for indirect waxing on die/model and is supplied in different hardness grades."},{id:"wax-pdf-8",question:"At 37°C, the maximum permitted flow for Type I inlay wax is:",options:["≤ 1%","≤ 20%","≤ 50%","70–90%"],correctAnswerIndex:0,explanation:"✅ Answer: A Very low flow at mouth temperature prevents distortion during carving/removal."},{id:"wax-pdf-9",question:"At 45°C, the required flow range for Type I and Type II inlay wax is:",options:["≤ 1%","≤ 20%","≤ 50%","70–90%"],correctAnswerIndex:3,explanation:"✅ Answer: D High flow at 45°C allows wax to adapt and reproduce fine detail."},{id:"wax-pdf-11",question:"A paraffin-based inlay wax produces a rough, flaky surface when trimmed and fails to develop a smooth glossy finish. Which additive is specifically incorporated to improve smoothness and luster and to reduce cracking/flaking?",options:["Dammar resin","Rosin","Water","Silica"],correctAnswerIndex:0,explanation:"✅ Answer: A Dammar resin modifies paraffin by increasing toughness and smoothness, making the wax less prone to flaking/cracking and giving a better luster."},{id:"wax-pdf-12",question:"An inlay wax must resist distortion at oral temperature while still producing a smooth, glossy surface. Which component is added to decrease flow at mouth temperature and increase surface gloss?",options:["Carnauba wax","Glycerin","Plaster","Alcohol"],correctAnswerIndex:0,explanation:"✅ Answer: A Carnauba wax is a hard, high–melting point wax that reduces flow at 37°C and improves gloss."},{id:"wax-pdf-14",question:"In the lost-wax technique, the inlay wax pattern represents the restoration as a:",options:["Positive pattern","Negative mold","Die spacer","Separating film"],correctAnswerIndex:0,explanation:"✅ Answer: A The wax pattern is the positive replica of the final restoration."},{id:"wax-pdf-15",question:"After the wax pattern is eliminated during burnout, the investment contains a:",options:["Positive replica","Negative mold cavity","Separating layer","Die relief space"],correctAnswerIndex:1,explanation:"✅ Answer: B Burnout removes the wax and leaves a negative mold space that will be filled by molten alloy."},{id:"wax-pdf-17",question:"Highest thermal expansion (CTE) among these:",options:["Wax","Ceramic","Metal","Gypsum"],correctAnswerIndex:0,explanation:"✅ Answer: A Wax has the highest CTE → biggest size change with small temperature change."},{id:"wax-pdf-19",question:"Lowest thermal conductivity (k) (heats unevenly most):",options:["Metal","Ceramic","Wax","Gypsum"],correctAnswerIndex:2,explanation:"✅ Answer: C Wax is a poor heat conductor → surface softens first."},{id:"wax-pdf-22",question:"“Elastic memory” causing pattern distortion with time best matches:",options:["Wax","Gypsum","Ceramic","Metal"],correctAnswerIndex:0,explanation:"✅ Answer: A Wax releases trapped stresses → shape changes later."},{id:"wax-pdf-24",question:"“Creep” at room/mouth conditions is most problematic for:",options:["Wax","Ceramic","Gypsum","Glass"],correctAnswerIndex:0,explanation:"✅ Answer: A Wax is viscoelastic → deforms under small loads over time."},{id:"wax-pdf-25",question:"Best step to stop wax “creep/memory” from ruining accuracy:",options:["Store overnight","Invest immediately","Reheat repeatedly","Press hard while cooling"],correctAnswerIndex:1,explanation:"✅ Answer: B Set investment locks the pattern → no later distortion."},{id:"wax-pdf-27",question:"If burnout leaves residue, the main problem is:",options:["Higher CTE","Mold wall coating","Higher hardness","Higher k"],correctAnswerIndex:1,explanation:"✅ Answer: B Residue coats mold walls → casting defects/misfit."},{id:"wax-pdf-28",question:"Most “dimensionally stable” with temperature change (lowest thermal distortion risk):",options:["Wax","Metal","PMMA","Impression compound"],correctAnswerIndex:1,explanation:"✅ Answer: B Compared to wax/PMMA, metals change less with small temp changes."},{id:"wax-pdf-31",question:"Material that undergoes polymerization shrinkage (not “cooling shrinkage”):",options:["Wax","PMMA denture base","Metal alloy","Ceramic"],correctAnswerIndex:1,explanation:"✅ Answer: B PMMA shrinks mainly by polymerization + processing."},{id:"wax-pdf-33",question:"A direct wax pattern is removed from the mouth; the operator keeps holding it between fingers “to inspect margins.” Most likely outcome:",options:["Better fit","Distortion","Stronger wax","Cleaner burnout"],correctAnswerIndex:1,explanation:"✅ Answer: B Finger heat causes temperature change → wax dimension shifts/distorts."},{id:"wax-pdf-36",question:"Glass transition temperature (Tg) concept fits best with:",options:["Wax becomes soft/plastic near Tg","Metal becomes plastic near Tg","Gypsum melts at Tg","Ceramic flows at Tg"],correctAnswerIndex:0,explanation:"✅ Answer: A Near Tg, wax shifts from stiff → more plastic/flowable."}],io=[{id:"wax-pdf-3",question:"When softening inlay wax, the best reason to heat it slowly and allow “soak time” is because wax has:",options:["Rapid heat spread","Poor heat spread","High stiffness","High strength"],correctAnswerIndex:1,explanation:"✅ Answer: B Wax has low thermal conductivity, so if you don’t heat slowly/allow soak time, the outside overheats and becomes too soft/runny while the core stays firm → you get uneven flow, poor adaptation, and a higher chance of pattern distortion."},{id:"wax-pdf-16",question:"In a paraffin-rich inlay wax, the point near ~35°C where the rate of thermal expansion increases abruptly and the wax becomes more plastic is called:",options:["Melting point","Glass transition temperature","Boiling point","Dew point"],correctAnswerIndex:1,explanation:"✅ Answer: B Glass transition temperature is where wax shifts toward a more plastic/rubbery behavior and its thermal expansion rate changes sharply (commonly around 35°C in paraffin-rich inlay waxes) Below Tg: molecules are “stuck” → wax stays hard. At Tg: molecules start slipping past each other → wax becomes soft/plastic and flows more, so its expansion also increases faster."}],Ku=[...eo,...to,...io],Zu=["Metals are crystalline solids with metallic bonds.","Properties include ductility, malleability, and conductivity.","Dental applications: Restorations, prostheses, implants, and orthodontics."],$u=`
# Metals in Dentistry

## 1) Introduction to Dental Metals
### Why use metals?
- **Strength**: High toughness and fatigue resistance (won't break easily).
- **Stiffness (Modulus)**: Good for RPD frameworks and PFM copings (doesn't bend too much).
- **Hardness**: Durable, but can wear opposing teeth if too hard.

### Key Types in Dentistry
- **Noble Alloys**: Gold, Palladium, Platinum (Corrosion resistant).
- **Base Metal Alloys**: Ni-Cr, Co-Cr, Ti (Stronger, stiffer, rely on passivation).
- **Wrought Alloys**: Wires (SS, NiTi) shaped by bending/drawing.



---

## 2) Biocompatibility: The Big Risks
### Nickel (Ni) Allergy
- **Most common** metal allergy (females > males).
- **Risk**: Contact dermatitis (rash/inflammation).
- **Beryllium (Be)**: Sometimes added to Ni-Cr to lower melting point, but is defined as a **carcinogen** and causes **berylliosis** (lung disease). **Use is declining.**

### Galvanic Shock/Corrosion
- **Two different metals** + **Saliva (electrolyte)** = **Battery**.
- **Pain**: Short-circuit current through pulp.
- **Corrosion**: The less noble (anode) metal corrodes.
- *Example*: Old amalgam touching a new gold crown.

---

## 3) Passivation (The "Shield" Concept)
### Definition
- Base metals (Ti, Cr, Al) are chemically reactive, BUT they form a thin, invisible, stable **oxide film** that blocks further corrosion.
- The film can "self-heal" if oxygen is available.

### Key Dental Examples
- **Stainless steel / Co–Cr / Ni–Cr**: Chromium forms **Cr₂O₃** passive layer.
- **Titanium**: Forms **TiO₂** passive layer (excellent biocompatibility).

### What can challenge passivation clinically?
- Low-oxygen crevices → **crevice corrosion** risk.
- Chloride-rich environments + defects → **pitting** risk.
- Grain-boundary chromium depletion (sensitization) → **intergranular corrosion**.

---

## 4) Stainless Steel: Phases, Microstructures, and the Role of Chromium + Carbon

### A) Phases of Iron/Steel (true phases)
- **Ferrite (α-Fe)**
  - **BCC** structure.
  - Soft, ductile; **low carbon solubility**.
- **Austenite (γ-Fe)**
  - **FCC** structure.
  - Higher carbon solubility; tough/ductile at higher temperature.
- **Cementite (Fe₃C)**
  - Very hard, brittle iron carbide.
- **Delta ferrite (δ-Fe)**
  - High-temperature **BCC** phase.

### B) Common steel microstructures
- **Pearlite** = **ferrite + cementite** lamellae
  - Strength ↑, ductility ↓ compared with ferrite.
- **Martensite**
  - Formed by rapid quenching (diffusionless transformation).
  - Very hard, brittle unless tempered.
- **Tempered martensite**
  - Balance of hardness + improved toughness.

### C) What ferrochromium does in steel (Fe–Cr additive)
- Adds **chromium (Cr)** to steel.
  - Enables **Cr₂O₃** passive film → **corrosion resistance ↑** (stainless behavior).
  - **Hardenability ↑** and **oxidation resistance ↑**.
  - Forms hard **chromium carbides** → **wear resistance ↑** (when carbon is present).

### D) What carbon does in steel (high-yield)
- Increasing **carbon (C)** generally causes:
  - **Hardness ↑**, **strength ↑**, **wear resistance ↑**.
  - **Ductility ↓**, **toughness ↓** (more brittle tendency).
  - Supports formation of **Fe₃C (cementite)** and **martensite**.

### E) Chromium + carbon issue: sensitization (exam concept)
- At certain temperatures (e.g., overheating/welding range):
  - **Cr + C → chromium carbides** (e.g., **Cr₂₃C₆**) at grain boundaries.
  - This creates nearby **chromium-depleted zones**.
  - ✅ Chromium depletion → weaker passivation → **intergranular corrosion risk**.
- **Prevention concepts**: Use **low-carbon stainless** (e.g., **L-grades**) or stabilized steels (e.g., **Ti/Nb stabilized**) to tie up carbon.

---

## 5) Nitinol (NiTi): Key Details for Dentistry
- **NiTi (Nitinol)** = **Nickel–Titanium alloy** used in:
  - **Orthodontic wires**.
  - **Endodontic rotary files**.

### Key behaviors
- **Shape memory**: deformation → heat/body temperature → returns toward original shape.
- **Superelasticity**: stress causes reversible phase change → large elastic deflection.

### NiTi phases (high-yield)
- **Austenite** (parent phase).
- **Martensite** (more easily deformed phase).
- **R-phase** may exist as an intermediate.

### Clinical pros/cons
- **Ortho**: more **constant, gentle force** over a range of activation.
- **Endo**: high **flexibility** helps follow curved canals.
- ✅ **Risks**: **cyclic fatigue** (curved canals) and **torsional fracture** (binding).

---

## 6) RPD Clasps: Metallic Properties
### Rest (support)
- Must be **rigid** and **strong** (no flex).
- ✅ Provides **vertical support** and helps define fulcrum behavior.

### Retentive arm
- Must have **controlled flexibility**, mainly in the **terminal third**.
- The **terminal tip** flexes over the height of contour → engages the undercut.
- ✅ Flexible enough to engage undercut without stressing the abutment.

### Reciprocal arm / reciprocal plate
- Must be **rigid** (non-flexing).
- ✅ Provides **reciprocation + bracing**, countering lateral forces from the retentive arm.

### Minor connector
- Must be **rigid** and dimensionally stable.
- ✅ Transmits forces between the clasp and the framework.

### Approach arm (bar clasp)
- Origin/body should be relatively **rigid**, with **flexibility near the terminal**.
- Designed to approach undercut from the gingival direction.
- ✅ Must flex without permanently deforming, then return to passive position.

---


---

## 8) Critical Exam Questions (High-Yield Essentials)

### Q: Why do metal properties differ so much from ceramics or polymers?
- **A**: **Metallic bonding** (the "electron sea"). It allows for nondirectional bonds, high thermal/electrical conductivity, and **ductility**. Ceramics have ionic/covalent bonds which are directional and brittle.

### Q: Why aren't pure metals (like pure gold) usually used for cast restorations?
- **A**: They are typically **too soft** and have low yield strength. Alloying is required to improve hardness, strength, and tarnish resistance.

### Q: Why does faster cooling result in smaller grains?
- **A**: Faster cooling (large supercooling) creates many stable nuclei at once. Because many grains start growing simultaneously, they collide quickly and cannot grow large. **Smaller grains = stronger metal (Hall-Petch effect)**.

### Q: What is the benefit of Iridium (Ir) or Ruthenium (Ru) in gold alloys?
- **A**: They act as **grain refiners**. They provide artificial sites for heterogeneous nucleation, ensuring a fine, uniform grain structure that is less likely to crack during adjustment.

### Q: What is the most common metal allergy in dentistry?
- **A**: **Nickel (Ni)**. It is frequently found in base metal alloys (Ni-Cr) and stainless steel.

![Grain Refinement & Strengthening](assets/metals/metals_img_14_1.png)
`,Qu=["Alloy: Mixture of two or more metals.","Phase diagrams: Solid solutions (substitutional vs interstitial).","Heat treatment affects properties (e.g., gold alloys)."],Xu=`
# Metals are a low yielding topic
## Dental alloys — ultra-high-yield concise notes

---

### 1)Why “Metal” Is Hard to Define (Clinical View)

- ● A textbook definition (**good heat/electric conductor**, **lustrous**, **reflective**) is not enough for dentistry because clinicians care about:

  - ▫️ **Plaque adhesion**

  - ▫️ **Porcelain bonding**

  - ▫️ **Joining/soldering**

  - ▫️ **Fit**

  - ▫️ **Opposing wear**

  - ▫️ **Biocompatibility**

  - ▫️ **Corrosion/tarnish**
---

### 2)  Metals vs Alloys (Important)

- ● Dentistry mostly uses **alloys (not pure metals)**, because pure metals are usually too **soft** and/or **corrode**.

- ● Exception examples:

  - ▫️ **Gold foil** (direct filling)

  - ▫️ **Commercially pure titanium (CP-Ti)**

  - ▫️ **Silver points**


---

### 3) What Cast Metals Are Used For

- ● **All-metal**: **inlays**, **onlays**, **partial crowns**, **full crowns**, **bridges**, **posts/cores**

- ● **Frameworks**: **PFM (metal-ceramic)** and **metal-resin** prostheses

- ● **RPD frameworks** + **implant abutments**

---

### 4) Dental Alloy Groups (Core Classification) — **IMP**

| Classification | Definition | Typical Uses |
|---|---|---|
| **High Noble (HN)** | **≥ 40% Au** and **≥ 60% total noble metal** | Crowns, bridges, inlays (**excellent corrosion resistance**). |
| **Noble (N)** | **≥ 25% total noble metal** | PFM frameworks, bridges (**good balance of cost/performance**). |
| **Predominantly Base (PB)** | **< 25% noble metal**<br>Common systems: **Ni-Cr**, **Co-Cr**, **Fe-C-Cr**, **CP-Ti**, **Ti-Al-V** | Partial dentures, specific crowns (**high strength**, relies on **passivation**). |
| **Amalgam** | “Amalgam contains metals, but it doesn’t behave like a typical metal. After setting it acts more like a composite (**particles + matrix**), so it can undergo **creep** (slow deformation under load). Also it is **brittle** it can fracture.”<br><br>**Amalgam = an alloy that contains mercury (Hg).**<br>**Mercury + an alloy powder (mainly silver, tin, copper)** that reacts to form a hard set restoration. | Posterior restorations where esthetics don’t matter: **Class I & Class II** (occlusal + proximal) in premolars/molars<br><br>Large posterior fillings needing **high strength + wear resistance**, especially when isolation is difficult<br><br>**Core build-up / foundation under a crown** (amalgam core)<br><br>Sometimes **Class V** on posterior/buccal cervical areas if not esthetic zone and moisture control is hard |

---

### 5) Key Alloying Elements — **VV IMP**

- ● **Gold (Au)**: provides **corrosion resistance** and **ductility**

- ● **Palladium (Pd)**: **whitens** alloys, increases **melting range** and **stiffness (modulus)**

- ● **Platinum (Pt)**: increases **strength** and **melting point**

- ● **Silver (Ag)**: increases **thermal expansion**; can cause **“greening”** of porcelain

- ● **Copper (Cu)**: increases **strength** and **hardness**; **reddens** the alloy

- ● **Zinc (Zn)**: **oxygen scavenger**; reduces **porosity** during casting

- ● **Iridium (Ir)** / **Ruthenium (Ru)**: **grain refiners** (promote **smaller grain size**)

---

### 6) Metallic Bonding (Why Metals Behave “Metal-like”)

- ● Valence electrons form a **“sea/cloud” of electrons** → **non-directional bonds**

- ● Explains:

  - ○ **High thermal/electrical conductivity**

  - ○ **Luster**

  - ○ **Ductility/malleability**

  - ○ Basically metals electrons are free to go anywhere therefore they can easily conduct heat and electricity fast

- ● **Stretch without breaking**

  - ▫️ When you pull/stretch, layers of metal atoms can slide past each other and the electron sea still “holds” them together → deforms instead of cracking

- ● **Diagram space**:

  - ▫️ ![Metallic Bonding](assets/metals/metals_page_3_img_1.png)

---

### 7) Solidification + Microstructure (Casting Context)

- ● When we cast, the alloy is melted and poured into the **investment mold**.

- ● The topic here is what happens inside the metal as it cools from liquid to solid:

  - ▫️ **Nucleation**:

    - ○ Solidification starts when tiny atomic clusters (**embryos**) form in the liquid.

    - ○ Most embryos are unstable; only those that reach a **critical size** become stable nuclei and grow into crystals.

  - ▫️ **Heterogeneous nucleation (common in dental casting)**:

    - ○ Nuclei form on existing “seeds” such as **mold walls**, **investment irregularities**, **oxides**, **dust**, or **grain refiners (Ir/Ru/Re)**.

    - ○ Because part of the nucleus sits on a surface, the surface energy barrier is lower → nucleation happens easily.

  - ▫️ **Homogeneous nucleation (rare in dentistry)**:

    - ○ Nuclei form randomly in the bulk liquid without any surface/seed.

    - ○ Requires a much higher energy barrier → usually needs **very large supercooling**, which typical dental casting conditions don’t reach.

- ● **Diagram space**:

  - ▫️ ![Nucleation](assets/metals/NUCLEATION.png)

---

### 8) Solidification (Can **SKIP**)

- ● Imagine metal is like water turning to ice:

  - ▫️ **1) Hot liquid → temperature drops**

    - ○ You’re just removing heat, so the temperature falls normally.

  - ▫️ **2) It reaches Tf (melting/freezing point)… but may NOT freeze yet**

    - ○ Freezing needs a first crystal seed.

    - ○ If no seed forms immediately, the liquid goes a little below Tf → that tiny dip is **supercooling**.

  - ▫️ **3) The moment the first crystals form**

    - ○ As soon as freezing actually starts, liquid → solid.

  - ▫️ **4) Freezing releases hidden heat**

    - ○ Turning liquid into solid gives out “stored” heat called **latent heat of fusion**.

  - ▫️ **5) That released heat keeps temperature stuck at Tf**

    - ○ The temperature stops falling and stays flat at Tf (**the plateau**) until all liquid becomes solid.

  - ▫️ **6) After it’s 100% solid**

    - ○ No more latent heat release → temperature starts falling again.

---

### 9) The “5 Steps” With Dentist Relevance (Can Skip)

- ● **1. Supercooling (The Strength Factor)**

  - ▫️ The Physics: the metal drops below its freezing point to find the energy to start crystallizing.

  - ▫️ Dentist Relevance: determines the **Grain Size**.

    - ○ If the metal supercools naturally (without help), it forms large, tree-like crystals (**dendrites**).

    - ○ Consequence: large grains make the metal brittle. A clasp made this way will snap when you try to adjust it.

- ● **2. Nucleation (The “Grain Refiner” Step)**

  - ▫️ The Physics: tiny crystal seeds form and solidification starts.

  - ▫️ Dentist Relevance: why you pay extra for alloys with **Iridium** or **Ruthenium** (**Grain Refiners**).

    - ○ These elements act as artificial “seeds” that force nucleation to happen everywhere at once.

    - ○ Consequence: creates **Fine Grains**, which makes the alloy significantly stronger and allows you to burnish the margins without flaking.

- ● **3. Latent Heat Release / Recalescence (The “Hot Tear” Risk)**

  - ▫️ The Physics: the metal releases heat as it turns solid, warming itself back up.

  - ▫️ Dentist Relevance: release of heat keeps the metal “mushy” for longer.

    - ○ If your mold is too hot (high burnout temp), this extra heat can prevent thin sections (like margins) from freezing quickly enough.

    - ○ Consequence: leads to **Hot Tears**—micro-cracks in the metal that cause the casting to fail under stress.

- ● **4. The Plateau (The “Do Not Touch” Phase)**

  - ▫️ The Physics: the temperature stays flat while the metal finishes freezing.

  - ▫️ Dentist Relevance: the casting is a fragile mix of solid crystals floating in liquid.

    - ○ Consequence: if you or the technician move or bump the casting ring during this glow phase, you will fracture the internal structure.

    - ○ The casting will likely break when you try to seat it.

- ● **5. Solid Cooling (The Fit)**

  - ▫️ The Physics: the fully solid metal cools down to room temperature and contracts.

  - ▫️ Dentist Relevance: **Shrinkage** (TF → Room Temp).

    - ○ Consequence: this is why your **investment material must expand**.

    - ○ If investment expansion doesn’t perfectly match this cooling shrinkage → crown too tight or won’t seat at all.

- ● Just remember:

  - ▫️ Supercooling means the liquid’s temperature drops below its freezing point (Tf) because freezing needs a starting point (**a nucleus**).

  - ▫️ Analogy: the car is on, but it still needs acceleration to actually move forward — just like the liquid is “ready to freeze,” but without a nucleus it doesn’t start yet (like gypsum nucleation).

- ● **Diagram space**:

  - ▫️ ![Solidification Graph](assets/metals/SOLIDIFICATION.png)

---

### 10) MICROSTRUCTURE (Can Skip — Very Extensive Explanation)

#### A) Atom → Grain → Boundary → Dislocation → Slip (Simplest Build)

- ● **1) Atom**

  - ▫️ An atom is the smallest “unit” of the metal (**Au atom**, **Cu atom**, etc.).

  - ▫️ ![Atom Structure](assets/metals/ATOM%20STRUCUTRE.png)

- ● **2) Atoms in solid metal don’t sit randomly**

  - ▫️ When metal solidifies, atoms stack in a repeating pattern like a 3D wallpaper.

  - ▫️ That repeating pattern = **crystal lattice (FCC/BCC/HCP)**.

  - ▫️ Analogy: bricks stacked in a repeating way.

  - ✅ **FCC is the most common one in dentistry**
- ▫️ ![Crystal Structure 1](assets/metals/CRYSTAL%20ALTTICE.png)
---

#### B) Crystal vs Grain (Polycrystal)

- ● **3) Crystal (one “ordered block”)**

  - ▫️ Definition: a region where atoms are stacked in one continuous, unbroken pattern.

  - ▫️ In a “single crystal,” the entire material is one solid block of perfect order.

  - ▫️ Analogy: a perfectly tiled floor where every single tile is laid straight, covering the entire room without a break.

  - ▫️ ![Tiled Floor Analogy](assets/metals/TILED_FLOOR.png)

| Feature | Crystal (Single) | Grain (Polycrystal) | CAN SKIP 
|---|---|---|
| Structure | One giant, perfect block. | Many small blocks stuck together. |
| Orientation | Same direction everywhere. | Changes direction from one grain to the next. |
| Boundaries | None (internal perfection). | Separated by “Grain Boundaries.” |
| Commonality | Rare (specialty tech). | Standard (almost all dental metals). |

- ● **4) Grain = a tiny crystal region in the metal**

  - ▫️ A real casting (metal) is not one giant crystal. It’s made of many tiny crystals.

  - ✅ **Grain = a small crystal chunk** where atoms are lined up in the same pattern and the same direction.

  - ▫️ ![Grain Structure](assets/metals/GRAIN.png)

  - ▫️ Analogy: a tiled floor made of patches:

    - ○ One patch of tiles all pointing the same way = one grain

    - ○ Next patch tiles rotated a bit = another grain




- ● **5) Why do grains exist?**

  - ▫️ During solidification, many crystals start growing at many different spots at the same time (many “starts” = nucleation).

  - ▫️ Each start grows in its own direction. Eventually they meet.

- ● **6) Grain boundary = where two grains meet**

  - ▫️ When two grains with different directions collide, you get a “seam”.

  - ✅ **Grain boundary = the border/seam** between two grains with different orientations.

  - ▫️ Analogy: the line where two different tile patches meet.
 - ▫️ ![Grain Boundary](assets/metals/metals_page_11_img_1.png)---

#### C) Dislocations + Slip (Why Metals Bend)

- ● **7) Dislocation = the “defect line” that lets metal deform**

  - ▫️ A perfect lattice would be super strong. Real metals have dislocations (built-in line defects).

  - ✅ **Dislocation = a line where the atomic layers are mis-stacked (an extra atom)**

  - ▫️ It’s why we can bend metal: it’s a weak point that can move.

  - ▫️ Arm analogy:

    - ○ The Normal Arm (Perfect Crystal): rigid bone; if you force it, it snaps (fracture).

    - ○ The “Extra Joint” (Dislocation): a “mistake” but allows bending in a new place.

  - ✅ Key takeaway: defects (dislocations) sound bad, but they are the only reason metals are useful. Without these “extra joints,” a metal spoon would shatter like glass if you tried to bend it.

  

- ● **Malleability** = ability to deform under **compression** (hammer/press into shape).

- ● **Ductility** = ability to deform under **tension** (stretch/elongate into a wire).

    - ▫️ ![Ductility and Malleability](assets/metals/DUCILITY%20AND%20MEALIBILITY.png)
 

Analogy:If you want the tile analogy, think of it like an extra tile—something we don’t usually need—so it can move pretty easily because it isn’t “locked in” like the rest. 


![Dislocation](assets/metals/DISLOCATION.png)

  

- ● **8) Slip = dislocation movement (this is how metal bends)**

  - ▫️ When you bend a metal, atoms don’t all shift together.

  - ▫️ Instead the dislocation moves, and the metal changes shape gradually.

  - ▫️ It moves in straight directions (up/down/left/right) → called a **slip plane** (dislocation slips in a 2D plane like a ball rolling on a table).



  - ▫️ EXTRA INFO:

    - ○ When shaping an **Adams clasp** or making letters from wire for practice adjusting a denture clasp, dislocations move.

    - ○ With repeated bending, dislocations pile up and get tangled → wire becomes more rigid/hard and less ductile.

    - ○ Keep bending back and forth → can crack and break.

  - ✅ **Slip = a dislocation moving along a slip plane** (same plane left/right up/down)

  - ▫️ Analogy:

    - ○ Track/road = slip plane

    - ○ Car/train = dislocation (moves forward/reverse only on its track)

  - ▫️ ![Slip Analogy](assets/metals/metals_page_13_img_1.png)

---

#### D) Why Grain Boundaries Strengthening Metals (Exam Rule)

- ● **9) Why grain boundaries “block” dislocations**

  - ▫️ Inside one grain, dislocation has a clear track (slip plane).

  - ▫️ At the grain boundary, the next grain is rotated, so the track doesn’t line up.

  - ✅ Dislocation gets stuck or needs extra force to continue.

  - ▫️ Train analogy:

    - ○ Inside a grain = rails are straight

    - ○ Grain boundary = rails end

    - ○ Next grain = rails rotated → not connected → train can’t pass easily

    - ▫️ ![Annealing](assets/metals/metals_page_15_img_1.png)

  - ▫️ ![Grain Boundaries](assets/metals/metals_page_14_img_1.png)

- ● **10) The exam rule (super important)**

  - ✅ More grain boundaries = more stopping points = **stronger metal**

  - ✅ Smaller grains → **stronger/harder** (but usually **less ductile**)

---

- ● Tile analogy (TO SUMARIZE EVERYTHIGN IN SINGLE PARAGRAPH):

  - ▫️ One tile is like the repeating crystal pattern. A bunch of the same tiles, all facing the same direction, is one grain (one country). The lines separating different tile directions are grain boundaries (the border between countries).

  - ▫️ Sometimes the metal has a defect—like an “extra/misplaced tile” that can move easily (dislocation).

  - ▫️ Because it can move, it lets the metal deform along a slip plane (moving mainly in one direction—up/down or left/right), but mostly within the same country/grain where the tile pattern is the same.

  - ▫️ If it tries to cross the border (grain boundary) into another country/grain, the tile pattern doesn’t match, so it gets blocked and stress builds up at the border.

  - ▫️ That tension can lead to problems, and if it becomes too much, it can cause cracks/fractures.

  - ▫️ This is not necessarily a bad thing because it can increase the strength of a metal (strengthening). One way is grain refinement:

    - ○ Small grains (fine): many grain boundaries → dislocations are blocked → stronger/harder.

    - ○ Large grains (coarse): fewer grain boundaries → dislocations move more easily → softer/weaker.

 

---

#### E) Annealing (Stress-Relief / “Reset Button”) — **IMP**

- ● **11) Annealing**

  - ▫️ Annealing is a heat treatment process in which a metal is heated to a specific temperature, held for a set time, and then allowed to cool slowly.

  - ▫️ Primary purpose: relieve **internal stresses**, reduce **hardness**, restore **ductility** (softness) so the metal can be worked further without breaking.

  - ▫️ This “resets” the atomic structure, removing the internal stress (the train pile-up) and making the metal soft and bendable again.

  - ▫️ Heat treatment (stress-relief/annealing) reduces internal stresses (and dislocation tangles) so it becomes less likely to crack or fracture and is often more workable/bendable.

 - ▫️ ![Grain Refinement](assets/metals/ANEALING.png)


---

### 11) Dendritic vs Equiaxed (Grain Shape + Casting Reliability) — **IMP**

- ● **Dendritic growth (tree-like)**

  - ▫️ Common in many **base-metal** castings

  - ▫️ Bad part: interdendritic regions collect **segregation** (difference in composition) / **porosity** → crack initiation sites

  - ▫️ “Hot tears” can form in thin sections

- ● **Equiaxed fine grains (small, “roundish” grains)**

  - ▫️ Common in many **HN/N** alloys because of grain refiners: **Ir, Ru, Re**

  - ▫️ Benefits: better uniformity + corrosion resistance, often better mechanical reliability

  - ▫️ ![Dendritic vs Equiaxed](assets/metals/metals_page_17_img_1.png)

- ● **Grain size effects (Hall–Petch idea)**

  - ▫️ Smaller grains → higher **yield strength** (grain boundaries block dislocations)

  - ▫️ Smaller grains → higher **yield strength** (grain boundaries block dislocations)

  - ▫️ But grain boundaries can also concentrate porosity/low-melting phases, so quality of casting still matters

  - ▫️ ![Phase Diagram](assets/metals/metals_page_18_img_1.png)

| Feature | Equiaxed Fine Grains (Refined) | Dendritic/Coarse Grains (Unrefined) |
|---|---|---|
| Grain Shape | Round, small, uniform | Tree-like, long branches |
| Cause | Addition of **Ir, Ru, Re** (nucleating agents) | Slow cooling without refiners |
| Strength | High (Tensile & Yield) | Lower |
| Ductility | High (Good for burnishing) | Lower (Brittle) |
| Corrosion | High resistance | Prone to segregation/tarnish |

---

### 12) Solid Solutions in Dental Casting Alloys

- ● A **solid solution** occurs when two or more elements are completely soluble in each other in the solid state.

- ● Unlike a mixture where phases separate, a solid solution forms a single phase with a homogeneous microstructure.

- ● Relevance: most **noble dental casting alloys** (e.g., **Gold–Copper**, **Palladium–Silver**) are solid solutions.

- ● Solid solution analogy: like “salt dissolved in water,” but in a solid metal.

  - ▫️ Mix two metals while molten.

  - ▫️ When it solidifies, atoms of the second metal spread evenly inside the first metal’s crystal lattice.

  - ▫️ You get one uniform solid phase (looks the same everywhere under the microscope).

### A) Types of Solid Solutions

- ● Type depends on size of the solute (added atom) relative to the solvent (base atom):

- ● **A. Substitutional solid solution**

  - ▫️ Solute atoms are roughly the same size as solvent atoms.

  - ▫️ They substitute into lattice positions.

  - ▫️ Mechanism: direct replacement of atoms.

  - ▫️ Key requirement: similar atomic radii (usually within **15%**).

  - ▫️ Dental examples:

    - ○ **Gold–Copper (Au–Cu)**: common in Type III and IV gold alloys

    - ○ **Palladium–Silver (Pd–Ag)**: used in PFM alloys

- ● **B. Interstitial solid solution**

  - ▫️ Solute atoms are significantly smaller than solvent atoms.

  - ▫️ They fit into “interstices” (gaps) between larger solvent atoms.

  - ▫️ Mechanism: small atoms fit into voids of the lattice.

  - ▫️ Key requirement: solute atoms must be very small (typically **< 60%** of solvent diameter).

  - ▫️ Dental examples:

    - ○ **Carbon in Iron**: creates steel (improves hardness)

    - ○ **Oxygen, Nitrogen, or Carbon in Titanium**: in **CP-Ti**, these act like “impurities” that strengthen the metal but reduce ductility
- ▫️ ![Interstitial Solution](assets/metals/INTESERIOTNAL%20SOLOTUTON.png)
---

### 13) Mechanism: Solid-Solution Strengthening

- ● Primary method for increasing strength of pure metals without relying on precipitation hardening.

- ● Problem with pure metals: planes slide easily (dislocation movement) → soft and ductile.

- ● Solution (distortion): add solute atoms (substitutional or interstitial) → do not fit perfectly.

  - ▫️ Substitutional:

    - ○ Larger atom pushes neighbors apart; smaller pulls them in.

  - ▫️ Interstitial:

    - ○ Atom forces lattice to bulge outward.

    - ○ **Carbon in Iron**: creates steel (improves hardness)

    - ○ **Oxygen, Nitrogen, or Carbon in Titanium**: in **CP-Ti**, these act like “impurities” that strengthen the metal but reduce ductility

    

- ● Result (lattice strain): size mismatch creates strain field around solute atom.

  - ▫️ Distortion acts like a “speed bump/roadblock” for dislocations.

  - ▫️ Blocks dislocations: requires more energy for a dislocation to move past distorted areas.

  - ▫️ ![Solid Solution Strengthening](assets/metals/solid_solution_strengthening.png)

- ● Effect on properties:

  - ▫️ Strength & Hardness: Increased (↑)

  - ▫️ Ductility: Decreased (↓) — slip restricted

  - ▫️ Proportional Limit: Increased (↑)


| Property | Change | Reason |
|---|---|---|
| Strength & Hardness | Increase | Requires more force (stress) to move dislocations past distortions. |
| Ductility | Decrease | Cannot deform as easily → less “stretchable” before breaking. |
| Proportional Limit | Increase | Point where plastic deformation begins is raised. |

---

### 14) Phase Diagrams (Why Binary Diagrams Still Matter)

- ● Even though dental alloys are multicomponent + casting is nonequilibrium:

  - ▫️ Binary diagrams teach what phases can form, **liquidus/solidus**, **eutectic/peritectic**, and help predict heat treatment effects.

  - ▫️ In essence tell composition of the metals and physical/mechanical properties.

  - ▫️ **1. Predicting Composition (The “Map” Function)**

  - ▫️ **2. Predicting Physical & Mechanical Properties**

  - ▫️ **3. Defining Critical Casting Temperatures**

    - ○ Binary diagrams define critical freezing temperatures (liquidus/solidus), controlling where/when the last weak, low-melting liquid forms (often source of casting defects).

  - ▫️ **4. Guiding Heat Treatment**

---

### 15) Why Microsegregation Is Worse When Liquidus–Solidus Gap Is Large

- ● Bigger freezing range → longer solid + liquid coexistence → more composition partitioning → more coring + interdendritic enrichment.

- ● Rapid cooling doesn’t give atoms time to diffuse and equalize.

- ● So you get:

  - ▫️ Dendrite core = formed first → composition closer to the “first solid”

  - ▫️ Outer dendrite = formed later → composition shifts

  - ▫️ Interdendritic (between dendrites) = last-to-freeze liquid → enriched in the low-melting element

- ✅ That non-uniform composition = **cored structure**

- ● Quote (as given):

  - ▫️ “Rapid cooling gives a finer grain structure (more nuclei form), but it also traps the alloy in a non-uniform composition because atoms don’t have time to diffuse. This ‘frozen-in’ microsegregation (coring and interdendritic enrichment) lowers casting quality—more weak zones leads to poorer corrosion resistance, and higher risk of defects.”

  - ▫️ ![coring](assets/metals/metals_page_23_img_1.png)
---

### 16) Coring + Homogenization

- ● Rapid cooling → dendrite cores have different composition than outer regions + interdendritic areas.


![Coring](assets/metals/metals_page_23_img_2.png)

- ● **Homogenization heat treatment**:

  - ▫️ Heat casting to a high temperature just below the **solidus** (so it doesn’t melt), hold for a while, then cool.

  - ✅ Why it works:

    - ○ At high temperature, atoms can diffuse → alloy composition becomes more uniform (coring/microsegregation decreases).

  - ✅ What it improves:

    - ○ Corrosion/tarnish resistance ↑ (less composition difference → less galvanic attack)

    - ○ Ductility ↑ (fewer weak, brittle segregated regions)


![Homogenization](assets/metals/HOMOGNAZATION.png)

---

### 17) Eutectic Alloys (e.g., Silver–Copper)

- ● Occurs when metals have limited solubility.

- ● **Eutectic Point**: specific composition with the lowest melting temperature.

- ● **Structure**: solidifies into alternating layers (**lamellae**) of two phases (**α** and **β**) (sandwich of 2 metals, alternating layers).

  - ▫️ ![Eutectic Structure](assets/metals/EUTHTICTC.png)


- ● **Properties**: often brittle and chemically active (lower tarnish resistance), but useful for solders due to low melting point.

- ● Property trend:

  - ○ More eutectic lamellae → ↑ hardness/strength, ↓ ductility (more brittle)

  - ○ Often worse tarnish than single-phase solid solutions

  - ▫️ 


- ● Uses:

  - ▫️ **Solders/brazing**

  - ▫️ In **amalgam particle production**

---

### 18) Peritectic Alloys (Concept) — Can Skip

- ● Invariant reaction on cooling:

  - ▫️ Liquid + **β (solid)** → **α (new solid phase)**

- ● Needs lots of diffusion at interface → prone to coring if cooled fast → can hurt corrosion resistance + increase brittleness.

- ● SEEN IN DENTAL AMALGAM: **Ag–Sn** is a peritectic system.

  - ▫️ ![Peritectic](assets/metals/PREHTITIC.png)
---

### 19) Au–Cu Ordering + Heat Treatment (Types III/IV Gold)

- ● Copper strengthens gold by two mechanisms:

  - ▫️ **1. Solid-solution strengthening** (Cu in Au lattice)

    - ○ Stronger than pure gold but weaker than age-hardened gold.

  - ▫️ **2. Ordering (superlattice) / age hardening** at lower temperatures

    - ○ Ordered Au–Cu phases restrict dislocations.

- ✅ Strength ladder (as given):

  - ▫️ Pure Au < quenched (disordered) Au–Cu < aged (ordered) Au–Cu in strength/hardness.

  - ▫️ ![Au-Cu Ordering Analogy](assets/metals/AU%20HARDHING%20LADDDER%20ANAOLGY.png)


### A) Heat Treatment Cycle (What to Do + Why)

- ● **1) Solution heat treat + quench = soften (“turn off” hardening)**

  - ▫️ Heat to about **700°C** (often quoted **~700–750°C**) to make fully disordered.

  - ▫️ Quench (rapid cool) → “freezes” disordered state.

  - ▫️ Use: easier finishing, burnishing, margin adjustment.

- ● **2) Ageing (order hardening) = harden (“turn on”)**

  - ▫️ Reheat to about **200–450°C** and hold (time depends on alloy, often **~15–30 min** typical teaching value).

  - ▫️ Atoms rearrange into ordered structure.

  - ▫️ Use: final strengthening after adjustments.

- ● **3) Reset**

  - ▫️ So basically u can remove step 3 by doing the step 2.

| What you want | The Temperature | The Speed | Why? |
|---|---|---|---|
| I want it **SOFT** (to grind/polish) | High (**~700°C**) | Fast (**Quench**) | Scrambles atoms and freezes random mess. |
| I want it **HARD** (for the patient) | Low (**~400°C**) | Slow / Hold | Gives atoms time to shuffle into strong, rigid pattern. |

  - ▫️ ![Heat Treatment](assets/metals/metals_page_27_img_1.png)

---

### 20) Palladium Alloys (Big Distinction)

- ● **High-Pd PFM alloys ≠ Pd–Ag** simple solid-solution alloys.

- ● High-Pd systems can show complex precipitates / eutectic shifts / “tweed” submicron structures and strengthening by solid solution + precipitates, designed to survive porcelain firing and bond to porcelain.

---

### 21) Color of Cast Alloys (Simple Rules)

- ● **Au + Cu** → more reddish/yellow

- ● **Ag in Au–Ag–Cu** → reduces copper’s red but can give greenish tint if high

- ● Most **Pd/Ni/Co/Ag-based** casting alloys are white/silver

- ● Some **Pd–In** alloys can look yellowish (optical/intermetallic effect)

---

### 22) Answers to the “CRITICAL QUESTIONS” (Straight)

- ● Why metal properties differ from ceramics/polymers?

  - ▫️ Metallic bonding (free electrons, nondirectional) → conductivity + ductility + higher fracture toughness

  - ▫️ Ceramics/polymers have ionic/covalent bonding → brittleness/low KIc

- ● Why pure metals not useful in dentistry?

  - ▫️ Usually too soft and/or corrode

  - ▫️ Alloys tailor strength, hardness, TEC, corrosion, porcelain bonding

- ● Why heterogeneous nucleation (not homogeneous)?

  - ▫️ Mold walls/impurities/grain refiners lower energy barrier; real systems aren’t “clean/inert.”

- ● Why faster cooling → smaller grain size?

  - ▫️ More supercooling → smaller critical radius → more nuclei → grains can’t grow large

- ● How grain size affects properties?

  - ▫️ Smaller grains → higher yield strength; usually better uniformity/corrosion; grain boundaries also collect defects/phases

- ● Why binary diagrams important despite multicomponent + nonequilibrium?

  - ▫️ Baseline map for phase tendencies (composition) + heat-treatment predictions

- ● Eutectic pros/cons?

  - ▫️ Pro: lowest melting (great for soldering)

  - ▫️ Con: lamellar two-phase structure → brittle/tarnish-prone vs solid solutions

- ● How does Cu strengthen Au alloys?

  - ▫️ Solid-solution strengthening + ordering/age-hardening (superlattice phases)
`,ju=["Common types: Co-Cr, Ni-Cr, Ti alloys.","High stiffness and hardness compared to noble alloys.","Biocompatibility concerns: Nickel allergy."],em=`
# Base Metal Alloys

Base metal alloys are composed of non-noble metals and rely on **passivation** for corrosion resistance. They are generally stiffer, harder, and less expensive than noble alloys.

## 1) Classification & Applications
The two primary groups in dentistry are:
- **Cobalt-Chromium (Co-Cr)**: Primarily used for **RPD frameworks**. They are very hard, stiff, and have high proportional limits, enabling them to withstand high stresses without permanent deformation.
- **Nickel-Chromium (Ni-Cr)**: Primarily used for **PFM copings** and small castings (crowns/bridges). They have better castability and density than Co-Cr.

## 2) Key Alloying Elements
- **Chromium (Cr)**: The most critical element (usually >20%).
  - **Passivation**: Forms a tenacious **Cr₂O₃** oxide film that blocks corrosion.
  - **Hardening**: Provides solid-solution hardening.
- **Cobalt (Co)**: Increases stiffness (modulus) and strength.
- **Nickel (Ni)**: Increases ductility and reduces hardness. **Note**: 10-15% of the population (especially females) has a **Nickel allergy**.
- **Molybdenum/Manganese**: Refine grain structure and improve casting behavior.
- **Silicon**: Imparts good casting properties and increases ductility.
- **Beryllium (Be)**: Sometimes added to Ni-Cr to lower the melting range and improve castability. 
  - ⚠️ **CAUTION**: Beryllium is a known carcinogen (Berylliosis) and its use is strictly regulated or declining.

## 3) The Critical Role of Carbon
Carbon concentration is a major factor controlling alloy properties:
- **Controlled Carbon**: Increases hardness, strength, and proportional limit.
- **Excess Carbon**: Results in a **brittle alloy** with very low ductility and an increased danger of fracture.

## 4) Passivation: The "Shield" Concept
Base metals are chemically reactive but "self-protect" by forming a stable oxide layer. 
- **Self-Healing**: If the layer is scratched, it reforms in the presence of oxygen.
- **Breakdown**: Crevices or high-chloride environments (saliva) can lead to **pitting** or **crevice corrosion**.

## 5) Titanium & Modern Implantology
- **Commercially Pure Titanium (CP-Ti)**: Grades 1-4 are used for implants due to exceptional biocompatibility.
- **Ti-6Al-4V**: An alloy (Aluminium/Vanadium) used when higher strength is required.
- **Biocompatibility**: Relies on a stable **TiO₂** layer that allows for **osseointegration**.

## 6) Clinical Considerations
- **Polishing**: Due to their extreme hardness (especially Co-Cr), base metal alloys are very difficult to polish and adjust.
- **Opposing Wear**: Their hard surface is more likely to cause wear on opposing natural dentition compared to gold allies.
- **Density**: Ni-Cr has higher density than Co-Cr, resulting in better thrust during casting and fewer voids.

![Basal Metal Alloys - Passivation](assets/metals/metals_page_3_img_1.png)
`,tm=["Wrought: Shaped by plastic deformation (cold working).","Fibrous microstructure (not cast grains).","Examples: Orthodontic wires (SS, NiTi, Beta-Ti)."],im=`
# Wrought Alloys

Wrought alloys are shaped by **mechanical working** (rolling, drawing, bending) at temperatures well below the recrystallization point (**cold working**). This process fundamentally changes their microstructure and properties compared to cast alloys.

## 1) Microstructure & Strain Hardening
- **Fibrous Grain Structure**: Unlike the equiaxed grains of cast alloys, wrought grains become **elongated and fibrous** in the direction of work.
- **Dislocation Density**: Cold working massively increases the number of dislocations. These dislocations tangle and pile up, making further slip difficult.
- **Strain Hardening (Work Hardening)**: 
  - ✅ **Strength ↑** and **Hardness ↑**.
  - ⚠️ **Ductility ↓** and **Toughness ↓** (metal becomes brittle).

## 2) Reversing the Effect: Annealing
Annealing is a heat treatment used to reset the properties of cold-worked metal:
1. **Recovery**: Internal stresses are relieved; minimal changes in properties.
2. **Recrystallization**: New, strain-free equiaxed grains form. **Ductility returns**, and hardness drops.
3. **Grain Growth**: If heated too long, grains coarsen, and strength decreases.

## 3) Steel Phases (High-Yield Core)
Steel is an alloy of Iron (Fe) and Carbon (C). Its behavior depends on its phase structure:
- **Austenite (γ-Fe)**: **FCC** structure. Stable at high temperatures (>723°C). Tough and ductile.
- **Ferrite (α-Fe)**: **BCC** structure. Soft, ductile, but low carbon solubility.
- **Cementite (Fe₃C)**: Iron carbide. **Very hard and brittle**.
- **Pearlite**: A lamellar mixture of ferrite and cementite.
- **Martensite**: Formed by **rapid quenching** of austenite. It has a distorted BCC lattice and is **extremely hard and brittle**.

![Phase Diagram](assets/metals/metals_page_18_img_1.png)

## 4) Hardening and Tempering
- **Quenching**: Austenite → Martensite (Hardest possible state).
- **Tempering**: Heating martensite to 200–400°C to allow partial conversion to ferrite and cementite. This reduces brittleness and restores **toughness**.

![Tempering Cycle](assets/metals/metals_page_21_img_1.png)

## 5) Stainless Steel & Corrosion
Stainless steel contains >12% **Chromium**.
- **18/8 Stainless Steel**: Contains 18% Cr and 8% Ni. This is the **Austenitic** type used for orthodontic wires.
- **Weld Decay (Sensitization)**: Overheating causes Cr to react with C to form **Chromium Carbides** at grain boundaries. This depletes the surrounding areas of Chromium, leading to **intergranular corrosion**.

![Weld Decay](assets/metals/metals_page_15_img_1.png)

## 6) Orthodontic Wires
- **Stainless Steel**: High stiffness (modulus) and high force.
- **Nitinol (NiTi)**: 
  - **Superelasticity**: Reversible phase change (Austenite ↔ Martensite) allows large elastic deflections.
  - **Shape Memory**: Returns to original shape when heated.
  - ✅ Provides **light, continuous force**.
- **Beta-Titanium (TMA)**: Excellent formability and intermediate stiffness.

![Nitinol Superelasticity](assets/metals_page_20_img_1.png)
`,nm=["Noble metals (Au, Pt, Pd) are corrosion and oxidation resistant.","Classification depends on noble metal content (High Noble >= 60%, Noble >= 25%).","Gold foil works by cold welding and requires absolute isolation."],om=`
## 1) Noble Metals (Core Definition)

- ● **Noble metals**: **Gold (Au)**, **Platinum (Pt)**, **Palladium (Pd)**

  - ▫️ **Resistant to corrosion and oxidation** (chemically “noble” behavior in the oral electrolyte)

  - ▫️ Used when long-term **biocompatibility** + **tarnish/corrosion resistance** is critical

---

## 2) ADA Classification of Dental Casting Alloys (Noble Content)

- ● **High Noble (HN)**

  - ▫️ **≥ 60% noble metal** (Au + Pt + Pd + etc)

  - ▫️ **≥ 40% Au**

  - ✅ Best overall **corrosion resistance** + **clinical longevity** (classic exam association)

- ● **Noble (N)**

  - ▫️ **≥ 25% noble metal**

  - ▫️ Balanced cost/performance; commonly used for **PFM frameworks** and cast restorations depending on system

- ● **Predominantly Base (PB)**

  - ▫️ **< 25% noble metal**

  - ▫️ Examples: **Ni–Cr**, **Co–Cr**, **Fe–Cr**, **CP-Ti**, **Ti–6Al–4V**

  - ✅ High strength; corrosion resistance depends mainly on **passivation** (oxide film)

---

## 3) Noble Metal Alloy “Types” in Dentistry (What You Actually See Clinically)

### A) Gold-Based Casting Alloys (Au Alloys)

- ● **What they’re used for**

  - ▫️ **Inlays/onlays**, **partial crowns**, **full cast crowns**, **bridges** (depending on strength class)

  - ▫️ Some **post & cores**, **RPD components** (historically), and specialty castings

- ● **Why Au-based alloys are used**

  - ▫️ **Excellent corrosion resistance** + very stable in saliva

  - ▫️ **Good ductility** → margins can be finished/burnished well (thin margins less likely to chip)

  - ▫️ **Reliable castability** (flows well) and predictable finishing/polishing

- ● **Key alloying elements (classic exam lines)**

  - ▫️ **Au**: corrosion resistance + ductility

  - ▫️ **Cu**: major strengthener (solid-solution + ordering/age hardening in some systems)

  - ▫️ **Ag**: modifies color; increases thermal expansion; can influence porcelain color if used in PFM

  - ▫️ **Pt/Pd**: raises melting range, increases stiffness, strengthens

  - ▫️ **Zn**: deoxidizer → reduces casting porosity

  - ▫️ **Ir/Ru**: grain refiners → finer grain → improved mechanical reliability

---

### B) Gold Alloy “Types” (Traditional Type I–IV + High-Strength)

- ● **Type I (Soft)**

  - ▫️ Highest Au content (relative) and **most ductile**

  - ▫️ Historically for **small inlays** / very low stress areas

  - ▫️ Not commonly used today compared with stronger options

- ● **Type II (Medium)**

  - ▫️ Moderate strength

  - ▫️ Historically for **inlays/onlays** with moderate load

- ● **Type III (Hard)**

  - ▫️ Higher strength / lower ductility than Type I/II

  - ▫️ Used for **onlays**, **partial crowns**, **some full crowns**

- ● **Type IV (Extra-Hard / High Strength)**

  - ▫️ Highest strength among the traditional gold types

  - ▫️ Used for **full crowns**, **bridges**, and cases needing more rigidity

  - ✅ **Important association**: Type IV is commonly discussed with **heat treatment (Au–Cu ordering)**

- ● **High-strength / modified gold alloys**

  - ▫️ Modern gold alloys may be modified (different Au/Cu/Pd/Pt ratios)

  - ▫️ Aim: better strength, better wear resistance, controlled stiffness

- ● **Heat treatment concept (high-yield link to gold types)**

  - ▫️ **Solution heat treat + quench → soften** (disordered structure)

  - ▫️ **Ageing (order hardening) → harden** (ordered Au–Cu phases restrict dislocations)

  - ✅ **Exam chain**: **Au–Cu ordering** → dislocation blocking → **strength/hardness ↑** after ageing

- ● **Diagram space**

  - ▫️ ![Au–Cu ordering / heat treatment](assets/metals/aucu_ordering.png)

---

### C) Palladium-Based Noble Alloys (Pd Alloys)

- ● **Why Pd is used**

  - ▫️ Strong, white-colored metal

  - ▫️ Raises melting range, increases stiffness (modulus)

  - ▫️ Often chosen for **PFM frameworks** (designed to tolerate porcelain firing cycles)

- ● **Types you’ll hear clinically**

  - ▫️ **Pd–Ag alloys** (palladium–silver)

    - ○ More affordable vs high-gold

    - ○ Can have porcelain interaction issues if not properly formulated (classic “silver effects” teaching)

  - ▫️ **High-Pd PFM alloys** (Pd-rich systems)

    - ○ Can form complex strengthening structures (precipitates / submicron “tweed” patterns in some descriptions)

    - ○ Designed specifically for porcelain bonding + high-temp stability

- ● **Key point**

  - ✅ “Pd alloys” in PFM are not all the same—PFM-grade systems are engineered for **oxide bonding** + firing compatibility

---

### D) Platinum-Containing Noble Alloys (Pt influence)

- ● **Role of Pt (when present in noble systems)**

  - ▫️ Increases **melting point** and **strength**

  - ▫️ Increases stiffness

  - ▫️ Helps stabilize high-temperature behavior (useful in PFM-type designs)

- ● Practical note

  - ▫️ Pt is often used as an additive rather than the main bulk metal in many dental alloys

---

## 4) Direct Gold Fillings (Gold Foil) — “Direct Filling Gold”

### A) Core Mechanism: Cold Welding
Direct gold restorations rely on the property of **cold welding (cohesion)**. Clean surfaces of pure gold form metallic bonds upon contact under pressure, without the application of heat.
- **Key Condition**: The surface must be absolutely free of adsorbed gases (like ammonia), grease, or moisture.

### B) Clinical Handling & Preparation
- **Isolation**: Absolute isolation (rubber dam) is **mandatory**. Moisture completely ruins the cohesive property.
- **Degassing (Annealing)**: Before use, the gold is heated (e.g., to ~250°C) to remove any adsorbed contaminants. This "annealing" restores the gold to its most cohesive state.
- **Condensation**: The gold is built up incrementally (pieces are 0.001 mm thick). Each layer is condensed with high pressure to create a dense, void-free mass.
- **Sandwich Foils**: Foils of gold and platinum are sometimes used to produce a restoration with improved physical characteristics.

### C) Indications & Contraindications
- ✅ **Indications**: Small conservative restorations (Class I, Class III, Class V) where longevity is the priority and technique can be perfect.
- ❌ **Contraindications**: Large stress-bearing areas, poor isolation, or esthetic zones if the patient rejects the gold color.

![Gold Foil Condensation](assets/metals/metals_page_13_img_1.png)

## 5) Alloy Ordering & Heat Treatment
Traditional gold alloys (Type III & IV) can be strengthened after casting through **age hardening**.
- **Softening (Solution Heat Treat)**: Heat to ~700°C and **quench**. This scrambles the atoms (disordered state) for easy adjustment.
- **Hardening (Ageing)**: Heat to ~400°C and cool slowly. This allows atoms to form an **ordered superlattice (CuAu or Cu₃Au)**, which blocks dislocation movement and significantly increases strength.

![Au-Cu Ordering](assets/metals/metals_page_27_img_1.png)

---

## 5) Quick Linking Lines (Exam Memory Anchors)

- ● **Noble metals** (Au, Pt, Pd) → **corrosion resistance** + biocompatibility

- ● **High Noble** = **≥ 60% noble** and **≥ 40% Au**

- ● **Gold Types I–IV**: increasing strength from **Type I (soft)** → **Type IV (extra hard)**
- ● **Direct gold** works by **cold welding** → demands **absolute cleanliness + isolation**

`,sm=[{id:"mt_mcq_1",question:"Which property is typically higher in metals than ceramics?",options:["Brittleness","Fracture toughness","Porosity","Glass transition temperature"],correctAnswerIndex:1,explanation:"Metals can deform plastically at a crack tip and “blunt” it, so cracks don’t run easily. Ceramics are brittle, so cracks propagate fast → lower fracture toughness."},{id:"mt_mcq_2",question:"Which statement is TRUE about pure metals in dentistry?",options:["Pure metals are used for most cast crowns","Pure gold is strong enough for crowns","Pure metals are often too soft/corrode, so alloys are used","Pure metals are always brittle"],correctAnswerIndex:2,explanation:"Pure metals (like pure gold) are usually too soft/low stiffness for restorations, and many pure metals may corrode—so we alloy them to improve strength, hardness, corrosion resistance, etc."},{id:"mt_mcq_3",question:"Heterogeneous nucleation requires less energy because:",options:["It increases surface area","It reduces the surface energy barrier (nucleus forms on a surface)","It increases melting point","It prevents diffusion"],correctAnswerIndex:1,explanation:"When a nucleus forms on a mold wall/particle, it doesn’t need to create a full new “sphere” surface → less new surface area , lower surface free energy , easier nucleation."},{id:"mt_mcq_4",question:"Homogeneous nucleation usually needs:",options:["No cooling","Extreme supercooling","Grain refiners","High porosity"],correctAnswerIndex:1,explanation:"In the clean bulk liquid there’s no surface help , so you need a big driving force to overcome surface energy → achieved by large supercooling ."},{id:"mt_mcq_5",question:"Grain refiners used in noble dental alloys include:",options:["Hg, Sn, Cu","Ir, Ru, Re","Na, K, Cl","Ca, P, F"],correctAnswerIndex:1,explanation:"Ir/Ru/Re create many nucleation sites → more grains start , grains stay smaller (fine-grained) ."},{id:"mt_mcq_6",question:"Grain boundaries strengthen metals because they:",options:["Increase porosity","Block dislocation motion (Hall–Petch)","Melt early","Remove impurities"],correctAnswerIndex:1,explanation:"Dislocations (plastic slip carriers) have trouble crossing into a differently oriented grain → boundaries block slip , so higher stress is needed."},{id:"mt_mcq_7",question:"Fine grains increase yield strength primarily because:",options:["Dislocations pile up at grain boundaries","Alloys become pure","Liquidus increases","TEC decreases"],correctAnswerIndex:0,explanation:"More boundaries = shorter distance before a dislocation hits a boundary → pile-up happens sooner → higher stress required to continue deformation."},{id:"mt_mcq_8",question:"Solid-solution strengthening generally causes:",options:["Strength ↑, hardness ↑, ductility ↓","Strength ↓, hardness ↓, ductility ↑","Strength ↑, hardness ↓, ductility ↑","No property changes"],correctAnswerIndex:0,explanation:"Solute atoms distort the lattice → act like “speed bumps” to dislocations → strength/hardness rise; ability to deform easily (ductility) drops."},{id:"mt_mcq_9",question:"A key requirement for substitutional solid solution is:",options:["Atom size difference > 50%","Similar atomic radii (≈ within 15%)","Always different crystal structures","No metallic bonding"],correctAnswerIndex:1,explanation:"If the atoms are too different in size, the lattice distortion becomes too severe → solid solubility drops and multiple phases form."},{id:"mt_mcq_10",question:"Liquidus temperature is:",options:["Highest temp where alloy is fully solid","Lowest temp where alloy is fully liquid","Exact melting point for all alloys","Room temperature"],correctAnswerIndex:1,explanation:"Above liquidus = all liquid . Cooling below it = first solid starts forming."},{id:"mt_mcq_11",question:"Solidus temperature is:",options:["Lowest temp where alloy is fully solid","Lowest temp where alloy is fully liquid","The eutectic temperature always","The boiling point"],correctAnswerIndex:0,explanation:"Below solidus = all solid . Between liquidus and solidus = solid + liquid together (“mushy zone”)."},{id:"mt_mcq_12",question:"Coring happens mainly when:",options:["Cooling is slow and diffusion is complete","Cooling is rapid and diffusion cannot equalize composition","Alloy is a pure metal","Grain refiners are absent"],correctAnswerIndex:1,explanation:"Fast cooling traps composition differences: xdendrite core forms first with one composition, later layers/interdendritic liquid become different → composition gradient remains."},{id:"mt_mcq_13",question:"Homogenization generally improves:",options:["Corrosion resistance and ductility","Porosity and brittleness","Shrinkage and cracking","Supercooling"],correctAnswerIndex:0,explanation:"Heat near solidus lets atoms diffuse and even out composition , reducing micro-galvanic corrosion from segregated regions; more uniform structure tends to be less brittle."}],am=[{id:"mt_mcq_14",question:"A classic dental alloy system with peritectic relevance for amalgam alloy powders is:",options:["Ag–Sn","Pd–Ag","Au–Cu","Ag–Cu"],correctAnswerIndex:0,explanation:"Ag–Sn system shows peritectic-type phase relations and is the classic base for amalgam alloy powder metallurgy/phase behavior."},{id:"mt_mcq_15",question:"Dental amalgam is best defined as:",options:["Any ceramic restoration","An alloy containing mercury","Pure silver","A polymer composite"],correctAnswerIndex:1,explanation:"By definition, amalgam = mercury + other metal(s) forming a dental restorative alloy."},{id:"mt_mcq_16",question:"Compared with typical cast metals, set amalgam is:",options:["Highly ductile and malleable","Relatively brittle with low tensile strength","A single-phase solid solution","A glass"],correctAnswerIndex:1,explanation:"Set amalgam is multi-phase and has weak tensile behavior → tends to be brittle compared to ductile cast alloys."},{id:"mt_mcq_17",question:"Creep in amalgam is:",options:["Instant fracture on load","Time-dependent deformation under constant stress","Color change only","Increase in melting point"],correctAnswerIndex:1,explanation:"Creep = slow strain over time under constant load; clinically matters for marginal breakdown."},{id:"mt_mcq_18",question:"Zinc is added mainly as:",options:["Oxygen scavenger → reduces gas porosity","Grain refiner (primary)","A porcelain colorant","A mercury binder"],correctAnswerIndex:0,explanation:"Zn ties up oxygen during melting → less gas dissolved → less gas porosity in the casting."},{id:"mt_mcq_19",question:"Elements that help porcelain bonding by forming oxides include:",options:["Sn, In, Fe","Au, Pt, Pd only","Ag only","Hg only"],correctAnswerIndex:0,explanation:"Porcelain bonds to a controlled oxide layer; Sn/In/Fe are oxidizable → form bonding oxides."},{id:"mt_mcq_20",question:"Grain refiners in noble alloys include:",options:["Ir, Ru, Re","Sn, In, Fe","Hg, Sn, Cu","Na, K, Cl"],correctAnswerIndex:0,explanation:"Same concept as earlier: Ir/Ru/Re promote nucleation → finer grains."},{id:"mt_mcq_21",question:"Pure gold is generally not used for cast restorations because:",options:["It is too hard","It is too soft/low stiffness","It corrodes instantly","It is magnetic"],correctAnswerIndex:1,explanation:"Pure Au is very ductile but too weak/low modulus for functional cast restorations."},{id:"mt_mcq_22",question:"Palladium added to gold alloys generally:",options:["Redden color and lower melting range","Whitens, raises strength/hardness/melting range, lowers density","Turns alloy into ceramic","Eliminates all oxidation"],correctAnswerIndex:1,explanation:"Pd is a “whitener” and strengthens Au alloys; also raises melting range and lowers density relative to gold."},{id:"mt_mcq_23",question:"Which statement is TRUE about work hardening (cold working)?",options:["It makes metals softer and more ductile","It reduces dislocation density","It increases strength/hardness but decreases ductility","It only happens during melting"],correctAnswerIndex:2,explanation:"Deformation creates more dislocations; they tangle and block each other → harder to deform further (stronger) but less ductile."},{id:"mt_mcq_24",question:"Annealing / stress-relief heat treatment mainly:",options:["Adds more dislocations","Reduces internal","Creates more γ ₂ phase","Makes grains always smaller"],correctAnswerIndex:1,explanation:"Heat lets dislocations rearrange/annihilate; internal stresses drop; metal softens and ductility returns."},{id:"mt_mcq_25",question:"Which lattice type is most associated with high ductility and burnishability in dentistry?",options:["FCC","HCP","BCC","Amorphous"],correctAnswerIndex:0,explanation:"FCC has many slip systems → dislocations move easily → high ductility."},{id:"mt_mcq_26",question:"“Quench from ~700°C” in Type III/IV gold is mainly used to:",options:["Increase ordering immediately","Keep the alloy disordered and softer for finishing/burnishing","Create more precipitates","Increase casting shrinkage"],correctAnswerIndex:1,explanation:"Fast cooling prevents ordering/age hardening → remains softer for margin finishing."}],rm=[{id:"mt_mcq_27",question:"Age hardening (ordering) of Au–Cu is typically done to:",options:["Make the casting softer for margin adjustment","Make the restoration harder/stronger after adjustments are finished","Remove all grains","Prevent all corrosion"],correctAnswerIndex:1,explanation:"Controlled heat in ordering range creates ordered regions → blocks dislocations → strength/hardness increase."},{id:"mt_mcq_28",question:"Dental amalgam brittleness and galvanic/corrosion problems are MOST strongly linked to:",options:["A peritectic reaction during cooling from a melt","Multiple phases with different electrochemical potentials","Hygroscopic expansion of investment","FCC lattice of silver"],correctAnswerIndex:1,explanation:"Different phases act like tiny galvanic cells → corrosion + weakening → brittleness/marginal breakdown."},{id:"mt_mcq_29",question:"Best combined statement about ductility is:",options:["Only metallic bonding matters; dislocations are irrelevant","Only dislocations matter; bonding type is irrelevant","Metallic bonding allows sliding without bond breakage, and dislocations make sliding easy","Grain boundaries create ductility"],correctAnswerIndex:2,explanation:"The “electron sea” keeps bonding intact during sliding; dislocations reduce the stress needed for slip."},{id:"mt_mcq_30",question:"The main reason gold (Au) is added to dental alloys is to improve:",options:["Magnetic properties","Corrosion resistance and ductility","Thermal expansion mismatch","Porcelain greening"],correctAnswerIndex:1,explanation:"Au is noble/inert → excellent corrosion resistance; also very ductile."},{id:"mt_mcq_31",question:"Which element most strongly “whitens” gold alloys and also increases melting range + modulus?",options:["Silver","Copper","Palladium","Zinc"],correctAnswerIndex:2,explanation:"Pd is a strong whitener and stiffener; raises melting range and elastic modulus."},{id:"mt_mcq_32",question:"Platinum (Pt) is primarily added to PFM gold alloys to:",options:["Lower melting point and soften the alloy","Increase strength and melting point","Cause porcelain greening","Reduce porosity by scavenging oxygen"],correctAnswerIndex:1,explanation:"Pt increases strength and raises melting range (useful for PFM processing)."},{id:"mt_mcq_33",question:"In Pd-based PFM alloys, silver (Ag) is mainly added to:",options:["Decrease thermal expansion coefficient (TEC)","Increase thermal expansion coefficient (TEC)","Increase corrosion resistance more than gold","Act as grain refiner"],correctAnswerIndex:1,explanation:"Pd’s TEC is low; Ag raises TEC to better match porcelain."},{id:"mt_mcq_34",question:"“Greening” of porcelain is classically associated with which element in some alloys?",options:["Platinum","Silver","Zinc","Iridium"],correctAnswerIndex:1,explanation:"Some Ag-containing alloys can cause greenish discoloration in certain porcelains (older/classic issue)."},{id:"mt_mcq_35",question:"Copper (Cu) in Au alloys mainly:",options:["Lowers hardness and increases ductility only","Increases strength/hardness and reddens the alloy","Whitens the alloy and lowers density","Prevents oxide formation completely"],correctAnswerIndex:1,explanation:"Cu gives solid-solution strengthening/ordering effects and adds a reddish hue."},{id:"mt_mcq_36",question:"Zinc (Zn) is added mainly as an:",options:["Oxygen scavenger to reduce gas porosity","Element to increase porcelain greening","Grain refiner","Metal that increases modulus more than Pd"],correctAnswerIndex:0,explanation:"Zn reacts with oxygen → less gas pickup → fewer porosity defects."},{id:"mt_mcq_37",question:"Iridium (Ir) and Ruthenium (Ru) are added to noble casting alloys mainly to:",options:["Increase thermal expansion","Promote smaller grains (grain refinement)","Cause reddish color","Reduce melting range"],correctAnswerIndex:1,explanation:"They act as grain refiners → more nucleation → finer grains → better strength/consistency."},{id:"mt_mcq_38",question:"Which pairing is CORRECT?",options:["Ag → reddens alloy","Cu → whitens alloy","Pd → whitens and increases modulus","Zn → causes porcelain greening"],correctAnswerIndex:2,explanation:"Pd is the classic whitener/stiffener; Ag doesn’t redden (Cu does); Zn doesn’t cause greening."},{id:"mt_mcq_39",question:"A casting shows excessive gas porosity. Which alloying element helps prevent this?",options:["Copper","Silver","Zinc","Iridium"],correctAnswerIndex:2,explanation:"Zn is the oxygen scavenger → reduces gas-related porosity during melting/casting."}],lm=[{id:"mt_mcq_1",question:"Which property is typically higher in metals than ceramics?",options:["Brittleness","Fracture toughness","Porosity","Glass transition temperature"],correctAnswerIndex:1,explanation:"Metals can deform plastically at a crack tip and “blunt” it, so cracks don’t run easily. Ceramics are brittle, so cracks propagate fast → lower fracture toughness."},{id:"mt_mcq_2",question:"Which statement is TRUE about pure metals in dentistry?",options:["Pure metals are used for most cast crowns","Pure gold is strong enough for crowns","Pure metals are often too soft/corrode, so alloys are used","Pure metals are always brittle"],correctAnswerIndex:2,explanation:"Pure metals (like pure gold) are usually too soft/low stiffness for restorations, and many pure metals may corrode—so we alloy them to improve strength, hardness, corrosion resistance, etc."},{id:"mt_mcq_3",question:"Heterogeneous nucleation requires less energy because:",options:["It increases surface area","It reduces the surface energy barrier (nucleus forms on a surface)","It increases melting point","It prevents diffusion"],correctAnswerIndex:1,explanation:"When a nucleus forms on a mold wall/particle, it doesn’t need to create a full new “sphere” surface → less new surface area , lower surface free energy , easier nucleation."},{id:"mt_mcq_4",question:"Homogeneous nucleation usually needs:",options:["No cooling","Extreme supercooling","Grain refiners","High porosity"],correctAnswerIndex:1,explanation:"In the clean bulk liquid there’s no surface help , so you need a big driving force to overcome surface energy → achieved by large supercooling ."},{id:"mt_mcq_5",question:"Grain refiners used in noble dental alloys include:",options:["Hg, Sn, Cu","Ir, Ru, Re","Na, K, Cl","Ca, P, F"],correctAnswerIndex:1,explanation:"Ir/Ru/Re create many nucleation sites → more grains start , grains stay smaller (fine-grained) ."},{id:"mt_mcq_6",question:"Grain boundaries strengthen metals because they:",options:["Increase porosity","Block dislocation motion (Hall–Petch)","Melt early","Remove impurities"],correctAnswerIndex:1,explanation:"Dislocations (plastic slip carriers) have trouble crossing into a differently oriented grain → boundaries block slip , so higher stress is needed."},{id:"mt_mcq_7",question:"Fine grains increase yield strength primarily because:",options:["Dislocations pile up at grain boundaries","Alloys become pure","Liquidus increases","TEC decreases"],correctAnswerIndex:0,explanation:"More boundaries = shorter distance before a dislocation hits a boundary → pile-up happens sooner → higher stress required to continue deformation."},{id:"mt_mcq_8",question:"Solid-solution strengthening generally causes:",options:["Strength ↑, hardness ↑, ductility ↓","Strength ↓, hardness ↓, ductility ↑","Strength ↑, hardness ↓, ductility ↑","No property changes"],correctAnswerIndex:0,explanation:"Solute atoms distort the lattice → act like “speed bumps” to dislocations → strength/hardness rise; ability to deform easily (ductility) drops."},{id:"mt_mcq_9",question:"A key requirement for substitutional solid solution is:",options:["Atom size difference > 50%","Similar atomic radii (≈ within 15%)","Always different crystal structures","No metallic bonding"],correctAnswerIndex:1,explanation:"If the atoms are too different in size, the lattice distortion becomes too severe → solid solubility drops and multiple phases form."},{id:"mt_mcq_10",question:"Liquidus temperature is:",options:["Highest temp where alloy is fully solid","Lowest temp where alloy is fully liquid","Exact melting point for all alloys","Room temperature"],correctAnswerIndex:1,explanation:"Above liquidus = all liquid . Cooling below it = first solid starts forming."},{id:"mt_mcq_11",question:"Solidus temperature is:",options:["Lowest temp where alloy is fully solid","Lowest temp where alloy is fully liquid","The eutectic temperature always","The boiling point"],correctAnswerIndex:0,explanation:"Below solidus = all solid . Between liquidus and solidus = solid + liquid together (“mushy zone”)."},{id:"mt_mcq_12",question:"Coring happens mainly when:",options:["Cooling is slow and diffusion is complete","Cooling is rapid and diffusion cannot equalize composition","Alloy is a pure metal","Grain refiners are absent"],correctAnswerIndex:1,explanation:"Fast cooling traps composition differences: dendrite core forms first with one composition, later layers/interdendritic liquid become different → composition gradient remains."},{id:"mt_mcq_13",question:"Homogenization generally improves:",options:["Corrosion resistance and ductility","Porosity and brittleness","Shrinkage and cracking","Supercooling"],correctAnswerIndex:0,explanation:"Heat near solidus lets atoms diffuse and even out composition , reducing micro-galvanic corrosion from segregated regions; more uniform structure tends to be less brittle."},{id:"mt_mcq_14",question:"A classic dental alloy system with peritectic relevance for amalgam alloy powders is:",options:["Ag–Sn","Pd–Ag","Au–Cu","Ag–Cu"],correctAnswerIndex:0,explanation:"Ag–Sn system shows peritectic-type phase relations and is the classic base for amalgam alloy powder metallurgy/phase behavior."},{id:"mt_mcq_15",question:"Dental amalgam is best defined as:",options:["Any ceramic restoration","An alloy containing mercury","Pure silver","A polymer composite"],correctAnswerIndex:1,explanation:"By definition, amalgam = mercury + other metal(s) forming a dental restorative alloy."},{id:"mt_mcq_16",question:"Compared with typical cast metals, set amalgam is:",options:["Highly ductile and malleable","Relatively brittle with low tensile strength","A single-phase solid solution","A glass"],correctAnswerIndex:1,explanation:"Set amalgam is multi-phase and has weak tensile behavior → tends to be brittle compared to ductile cast alloys."},{id:"mt_mcq_17",question:"Creep in amalgam is:",options:["Instant fracture on load","Time-dependent deformation under constant stress","Color change only","Increase in melting point"],correctAnswerIndex:1,explanation:"Creep = slow strain over time under constant load; clinically matters for marginal breakdown."},{id:"mt_mcq_18",question:"Zinc is added mainly as:",options:["Oxygen scavenger → reduces gas porosity","Grain refiner (primary)","A porcelain colorant","A mercury binder"],correctAnswerIndex:0,explanation:"Zn ties up oxygen during melting → less gas dissolved → less gas porosity in the casting."},{id:"mt_mcq_19",question:"Elements that help porcelain bonding by forming oxides include:",options:["Sn, In, Fe","Au, Pt, Pd only","Ag only","Hg only"],correctAnswerIndex:0,explanation:"Porcelain bonds to a controlled oxide layer; Sn/In/Fe are oxidizable → form bonding oxides."},{id:"mt_mcq_20",question:"Grain refiners in noble alloys include:",options:["Ir, Ru, Re","Sn, In, Fe","Hg, Sn, Cu","Na, K, Cl"],correctAnswerIndex:0,explanation:"Same concept as earlier: Ir/Ru/Re promote nucleation → finer grains."},{id:"mt_mcq_21",question:"Pure gold is generally not used for cast restorations because:",options:["It is too hard","It is too soft/low stiffness","It corrodes instantly","It is magnetic"],correctAnswerIndex:1,explanation:"Pure Au is very ductile but too weak/low modulus for functional cast restorations."},{id:"mt_mcq_22",question:"Palladium added to gold alloys generally:",options:["Redden color and lower melting range","Whitens, raises strength/hardness/melting range, lowers density","Turns alloy into ceramic","Eliminates all oxidation"],correctAnswerIndex:1,explanation:"Pd is a “whitener” and strengthens Au alloys; also raises melting range and lowers density relative to gold."},{id:"mt_mcq_23",question:"Which statement is TRUE about work hardening (cold working)?",options:["It makes metals softer and more ductile","It reduces dislocation density","It increases strength/hardness but decreases ductility","It only happens during melting"],correctAnswerIndex:2,explanation:"Deformation creates more dislocations; they tangle and block each other → harder to deform further (stronger) but less ductile."},{id:"mt_mcq_24",question:"Annealing / stress-relief heat treatment mainly:",options:["Adds more dislocations","Reduces internal","Creates more γ ₂ phase","Makes grains always smaller"],correctAnswerIndex:1,explanation:"Heat lets dislocations rearrange/annihilate; internal stresses drop; metal softens and ductility returns."},{id:"mt_mcq_25",question:"Which lattice type is most associated with high ductility and burnishability in dentistry?",options:["FCC","HCP","BCC","Amorphous"],correctAnswerIndex:0,explanation:"FCC has many slip systems → dislocations move easily → high ductility."},{id:"mt_mcq_26",question:"“Quench from ~700°C” in Type III/IV gold is mainly used to:",options:["Increase ordering immediately","Keep the alloy disordered and softer for finishing/burnishing","Create more precipitates","Increase casting shrinkage"],correctAnswerIndex:1,explanation:"Fast cooling prevents ordering/age hardening → remains softer for margin finishing."},{id:"mt_mcq_27",question:"Age hardening (ordering) of Au–Cu is typically done to:",options:["Make the casting softer for margin adjustment","Make the restoration harder/stronger after adjustments are finished","Remove all grains","Prevent all corrosion"],correctAnswerIndex:1,explanation:"Controlled heat in ordering range creates ordered regions → blocks dislocations → strength/hardness increase."},{id:"mt_mcq_28",question:"Dental amalgam brittleness and galvanic/corrosion problems are MOST strongly linked to:",options:["A peritectic reaction during cooling from a melt","Multiple phases with different electrochemical potentials","Hygroscopic expansion of investment","FCC lattice of silver"],correctAnswerIndex:1,explanation:"Different phases act like tiny galvanic cells → corrosion + weakening → brittleness/marginal breakdown."},{id:"mt_mcq_29",question:"Best combined statement about ductility is:",options:["Only metallic bonding matters; dislocations are irrelevant","Only dislocations matter; bonding type is irrelevant","Metallic bonding allows sliding without bond breakage, and dislocations make sliding easy","Grain boundaries create ductility"],correctAnswerIndex:2,explanation:"The “electron sea” keeps bonding intact during sliding; dislocations reduce the stress needed for slip."},{id:"mt_mcq_30",question:"The main reason gold (Au) is added to dental alloys is to improve:",options:["Magnetic properties","Corrosion resistance and ductility","Thermal expansion mismatch","Porcelain greening"],correctAnswerIndex:1,explanation:"Au is noble/inert → excellent corrosion resistance; also very ductile."},{id:"mt_mcq_31",question:"Which element most strongly “whitens” gold alloys and also increases melting range + modulus?",options:["Silver","Copper","Palladium","Zinc"],correctAnswerIndex:2,explanation:"Pd is a strong whitener and stiffener; raises melting range and elastic modulus."},{id:"mt_mcq_32",question:"Platinum (Pt) is primarily added to PFM gold alloys to:",options:["Lower melting point and soften the alloy","Increase strength and melting point","Cause porcelain greening","Reduce porosity by scavenging oxygen"],correctAnswerIndex:1,explanation:"Pt increases strength and raises melting range (useful for PFM processing)."},{id:"mt_mcq_33",question:"In Pd-based PFM alloys, silver (Ag) is mainly added to:",options:["Decrease thermal expansion coefficient (TEC)","Increase thermal expansion coefficient (TEC)","Increase corrosion resistance more than gold","Act as grain refiner"],correctAnswerIndex:1,explanation:"Pd’s TEC is low; Ag raises TEC to better match porcelain."},{id:"mt_mcq_34",question:"“Greening” of porcelain is classically associated with which element in some alloys?",options:["Platinum","Silver","Zinc","Iridium"],correctAnswerIndex:1,explanation:"Some Ag-containing alloys can cause greenish discoloration in certain porcelains (older/classic issue)."},{id:"mt_mcq_35",question:"Copper (Cu) in Au alloys mainly:",options:["Lowers hardness and increases ductility only","Increases strength/hardness and reddens the alloy","Whitens the alloy and lowers density","Prevents oxide formation completely"],correctAnswerIndex:1,explanation:"Cu gives solid-solution strengthening/ordering effects and adds a reddish hue."},{id:"mt_mcq_36",question:"Zinc (Zn) is added mainly as an:",options:["Oxygen scavenger to reduce gas porosity","Element to increase porcelain greening","Grain refiner","Metal that increases modulus more than Pd"],correctAnswerIndex:0,explanation:"Zn reacts with oxygen → less gas pickup → fewer porosity defects."},{id:"mt_mcq_37",question:"Iridium (Ir) and Ruthenium (Ru) are added to noble casting alloys mainly to:",options:["Increase thermal expansion","Promote smaller grains (grain refinement)","Cause reddish color","Reduce melting range"],correctAnswerIndex:1,explanation:"They act as grain refiners → more nucleation → finer grains → better strength/consistency."},{id:"mt_mcq_38",question:"Which pairing is CORRECT?",options:["Ag → reddens alloy","Cu → whitens alloy","Pd → whitens and increases modulus","Zn → causes porcelain greening"],correctAnswerIndex:2,explanation:"Pd is the classic whitener/stiffener; Ag doesn’t redden (Cu does); Zn doesn’t cause greening."},{id:"mt_mcq_39",question:"A casting shows excessive gas porosity. Which alloying element helps prevent this?",options:["Copper","Silver","Zinc","Iridium"],correctAnswerIndex:2,explanation:"Zn is the oxygen scavenger → reduces gas-related porosity during melting/casting."}],cm=`

# Investment Material



![Dental Lost Wax Casting Technique](assets/investment/lost_wax_technique.png)



# 2) Investment: definition + ideal requirements



## Definition

**Investment** = ceramic mold material into which metal/alloy is cast; the process is **investing**.



## Ideal requirements (high yield)

- Easy manipulation; should not separate on mixing.

- Smooth surface/detail reproduction.

- Proper working/setting time.

- Strength to survive burnout + casting.

- **Controlled expansion** (to compensate alloy shrinkage).

- Adequate porosity (vent gases during casting).

- Easy divestment, inexpensive.



# 3) Composition (what’s inside an investment)



Most dental investments = **Refractory + Binder + Modifiers**



## A) Refractory (mainly silica)

- Silica allotropes used to control thermal behavior: quartz, cristobalite, tridymite (sometimes mixes).



## B) Binder (holds everything together)

Basically a glue that holds rocks (silica) together.

- **Gypsum (α-hemihydrate)** for low-temp casting.

- **Phosphate** for high-temp / metal-ceramic / base metal.

- **Ethyl silicate (silica-bonded)** mainly for some base-metal RPD work (obsolete).



## C) Modifiers / reducing agents

- Modifiers like NaCl, boric acid, etc. regulate setting time/expansion and influence high-temp behavior.



![Investment Classification](assets/investment/investment_img_3_1.png)



# 4) Classification (easy exam structure)



## I) Based on binder (most used classification)

1. **Gypsum-bonded** → gold alloy inlays/onlays/crowns (lower casting temps).

2. **Phosphate-bonded** → base metals + metal-ceramic alloys (higher temps) - mostly used and the best one.

3. **Ethyl silicate-bonded** → mainly some Co–Ni/Co–Cr partial denture castings (obsolete).



## II) Based on type of silica used

- Quartz investment vs Cristobalite investment.



## III) “Type I / II / III” (gypsum investment use-style)

- **Type I**: compensation mainly by thermal expansion (inlay/crown).

- **Type II**: compensation mainly by hygroscopic expansion (inlay/onlay/crown).

- **Type III**: used rarely; casting gold partial denture type situations.



# 5) Gypsum-bonded investments (GBI) — THE CLASSIC



## A) Indications (where you use it)



| Type | Category | Hardness (VHN)* | Description & Common Uses |
| :--- | :--- | :--- | :--- |
| **Type I** | Soft | 50 – 90 | Very high gold content (approx 83%). Highly burnishable (malleable). Small, one-surface inlays. Low-stress areas but weak. Rarely used today due to softness. |
| **Type II** | Medium | 90 – 120 | Moderate strength. Good balance of burnishability and stability. Larger inlays, onlays, 2 or 3 surface restorations. |
| **Type III** | Hard | 120 – 150 | High strength and durability. The standard for most crown and bridge work. Heat treatable. Full Crowns, Short-span bridges, Abutments. |
| **Type IV** | Extra Hard | 150+ | Highest strength. Lower gold content, higher Copper/Platinum. Very rigid and resistant to deflection. Removable Partial Denture (RPD) frameworks, Long-span bridges, Clasps and saddles. |



## B) Composition

Typical:

- **Gypsum binder ~25–35%** (strength + setting expansion).

- **Silica ~65–75%** (controls thermal expansion).

- **Modifiers ~2–3%**: reducing agents/color may be added.



## C) Big limitation: temperature ceiling

- Gypsum investment must not be heated above **~700°C** because decomposition releases sulfur gases → **shrinkage** + **contamination/tarnish** (sulfides) of alloying elements.

- Many texts also emphasize **carbon-containing gypsum investments** have a lower safe max (often ~650°C).



## D) Why silica is added (the “expansion science”)

Gypsum binder tends to **contract on heating** (after dehydration/phase changes), so silica is used to **counterbalance** that contraction via **silica inversions**.



### Silica inversion expansions (high-yield temperatures)

- **Cristobalite**: big expansion around **200–270°C** (highest expansion).

- **Quartz**: inversion at **573°C** (significant expansion).

- **Tridymite**: lower expansion overall (less than 1% by 600°C).



**Why it matters**: you choose silica type/amount to get the “right” mold enlargement at burnout temp.



## E) Setting Reaction

**Reaction**: Calcium sulfate hemihydrate → Dihydrate (Gypsum crystals)



**CaSO₄ · ½ H₂O + 1½ H₂O → CaSO₄ · 2 H₂O + Heat**



- **Mechanism**: This acts as the “glue.” The setting reaction is **exothermic** (releases heat).

- **Structure**: The newly formed **CaSO₄ · 2H₂O** crystals interlock and bridge the silica particles together to form a solid mold.

![Gypsum-Bonded Investment Structure](assets/investment/gypsum_bonded_structure.png)

## F) Expansion types (3 expansions you must separate)



### 1) Normal (air) setting expansion (LINEAR EXPANSION)

- Happens while setting in air; helps compensate casting shrinkage.

- Typical range ~0.4–0.6%.



### 2) Hygroscopic setting expansion (Type II concept)

- Setting while in contact with water → much larger (about “~6×” normal).

- Typical allowed range ~1.2–2.2%.

- **Key controls**:

    - ↑ silica content, finer silica → ↑ hygroscopic expansion.

    - α-hemihydrate + silica tends to give more hygroscopic expansion than β.

    - ↑ W/P ratio → ↓ hygroscopic expansion.

    - Less mixing time → ↓ hygroscopic expansion.

    - Older investment (shelf life) → ↓ hygroscopic expansion.

    - Earlier immersion (before initial set) → maximum expansion.



### 3) Thermal expansion (Type I concept)

- Mainly controlled by type + amount of silica and the W/P ratio.

- Typical target mentioned for gypsum Type I: about ~1.0–1.6%.

- **More water → less thermal expansion** (important clinically).



## G) Strength (don’t overthink — just know the rules)

- Strength decreases with higher W/P ratio (more water = weaker).

- Heating/cooling cycles can reduce strength (microcracking on cooling is a known issue).



## H) Porosity of the investment (not casting porosity)

- Porosity is needed so air/gases can escape as molten metal enters.

- Keep the pattern positioned so the end near the ring opening isn’t buried under too much investment (~6 mm as a classic guideline).



# 6) Phosphate-bonded investments (PBI) — HIGH TEMP WORKHORSE



![Phosphate-Bonded Investment](assets/investment/investment_img_8_1.png)



Phosphate-Bonded Investment = “High-Heat / Heavy-Duty” Investment



### ✅ Used for:

- Metal-ceramic (PFM) alloys (high-fusing).

- Base-metal alloys (Ni-Cr, Co-Cr).

- Can also be used for pressable ceramics (in many systems).

- **BEST investment material mostly used.**



### ✅ Why not gypsum-bonded here?

- Gypsum-bonded investments must NOT be heated above ~700°C → decomposition + contamination risk.

- Phosphate-bonded investments tolerate much higher burnout/casting temperatures.



## A) Composition (Simple recipe)

**Powder:**

- **Refractory filler** (mostly silica) = quartz / cristobalite (major portion).

- **Binder system**:

    - MgO (magnesia) = base.

    - NH₄H₂PO₄ (monoammonium phosphate) = acid source.



**Liquid (controls expansion):**

- Water → standard expansion.

- **Colloidal silica “special liquid”** → expansion booster.

- Increases setting expansion + thermal expansion.

- Also reduces the early thermal shrinkage seen when mixed with water.



## B) Setting reaction (Room temperature) — what type of reaction?

✅ **Acid–base reaction** (like a cement)

- **Acid**: NH₄H₂PO₄

- **Base**: MgO



**Key equation (high yield):**

**NH₄H₂PO₄ + MgO + 5H₂O → NH₄MgPO₄ · 6H₂O**

*(Ammonium Phosphate + Magnesia + Water → Magnesium Ammonium Phosphate / Struvite)*



That product (magnesium ammonium phosphate hexahydrate) forms a rigid binder matrix that locks the silica filler grains together.



## C) What happens on heating (burnout / furnace changes)?

When heated, the binder dehydrates + decomposes:

- **What you notice**: Ammonia smell can occur (binder breakdown products).

- **What it becomes (final high-temp binder)**: The set binder converts mainly to magnesium pyrophosphate (**Mg₂P₂O₇**).

- By high temperature, it behaves like a ceramic-like refractory mass that can withstand molten metal.



⭐  **Exam Key Point: “How to get MORE expansion?”**

If the question asks: “How do you increase mold expansion for a base-metal crown/framework?”

✅ **Replace water with colloidal silica special liquid** (or increase its concentration).

That increases:

- Setting expansion.

- Thermal expansion.

(And it reduces the early 200–400°C shrinkage seen with water mixes.)



## D) Carbon controversy (high yield)

- Carbon helps divesting/clean casting, BUT for high palladium alloys there’s concern about interaction/embrittlement; palladium reacting with carbon around high temperatures (~1500°C range), so **carbon-free phosphate investment** may be preferred in those cases.



# 7) Ethyl silicate–bonded investments (silica-bonded) — LESS COMMON NOW



### Where used:

- Historically important for some high-fusing base-metal RPD casting; use has declined because technique is more complex.



## Ethyl silicate–bonded investment: setting + green (high-yield) shrinkage



### 1) Key Reactions (Binder Formation)

**Step 1 — Acid-catalyzed hydrolysis** (HCl is the catalyst). HCl + water start the reaction by hydrolyzing ethyl silicate (TEOS):

**Si(OC₂H₅)₄ + 4H₂O (with HCl catalyst) → Si(OH)₄ + 4C₂H₅OH**

*(Silanols (Si–OH) + ethanol)*



**Step 2 — Condensation / polymerization** → “silica gel” binder. Those Si–OH groups join to form a 3-D gel network:

**Si–OH + HO–Si → Si–O–Si + H₂O**



**Step 3 — The gel binds the filler** (not “reacts to form ethyl silicate”). The gel coats/bridges the quartz/cristobalite grains and sets. Later, drying causes green shrinkage (loss of alcohol + water).



> In ethyl silicate–bonded investment, the ethyl silicate liquid undergoes hydrolysis (water breaks Si–OR bonds to form Si–OH), then condensation/gelation forms a silica gel network that coats and bridges the refractory silica filler grains, acting as a glue to hold the particles together.



![Shrinkage Compensation](assets/investment/investment_img_13_1.png)



### 2) Two shrinkages you MUST mention (this is the exam hook)



**A) Setting shrinkage**

- Happens during gel formation / setting of the binder.

- It reduces mold dimensions.



**B) Green shrinkage (IMPORTANT)**

- Happens during drying of the set gel before high-heat burnout.

- As the gel dries (loses alcohol + water), it undergoes additional volumetric contraction.

- This extra contraction is called **green shrinkage**, and it is additive to setting shrinkage.



✅ **Total mold reduction (before casting):**

**Total Shrinkage = Setting Shrinkage + Green Shrinkage**



### Why it matters clinically:

To get accurate castings, mold enlargement must compensate for:

**Compensation Required = Alloy Casting Shrinkage + Setting Shrinkage + Green Shrinkage**

That’s the key “why ethyl silicate systems are technique-sensitive.”



### 4) Extra high-yield handling note

- More complicated; flammable alcohol is released during heating → burnout/handling needs care.

`,dm=["Refractory (Silica) provides thermal expansion and heat resistance.","Binder (Gypsum/Phosphate) provides strength and holds the refractory.","Gypsum-bonded investments cannot be heated above 700°C (decomposition).","Phosphate-bonded investments are used for PFM and base metal alloys.","Phosphate-bonded investments are currently the most widely used and considered the best investment material.","Hygroscopic expansion can significantly increase the total mold expansion.","Colloidal silica 'special liquid' in phosphate investments increases both setting and thermal expansion.","Ethyl silicate systems involve hydrolysis and condensation to form a silica gel binder.","Green shrinkage is a unique challenge in ethyl silicate-bonded investments."],no=[{id:"inv_mcq_2",question:"Dental investments are mainly composed of:",options:[" Wax + resin + water"," Refractory + binder + modifiers"," Metal + flux"," Acrylic resin + catalyst"],correctAnswerIndex:1,explanation:"Core formula = filler (silica) + binder + modifiers."},{id:"inv_mcq_3",question:"A “sprue” is best defined as:",options:[" A wax hardener used on dies"," The channel in investment through which molten metal flows"," The ring liner inside the casting ring"," The water bath used for hygroscopic expansion"],correctAnswerIndex:1,explanation:"Sprue = channel for molten metal flow in the mold."},{id:"inv_mcq_4",question:"The investment material must be:",options:[" Soluble in water so it can be washed away"," Refractory and thermally stable at casting temperatures"," Soft to allow easy carving"," Metallic to conduct heat"],correctAnswerIndex:1,explanation:"It must withstand high temperatures without breaking down."},{id:"inv_mcq_5",question:"“Investment” is:",options:[" Wax used for patterns"," Ceramic mold material into which alloys are cast"," A die spacer paint"," A ring liner"],correctAnswerIndex:1,explanation:"Investment = ceramic mold into which metal is cast."},{id:"inv_mcq_6",question:"The common refractory used in investments is:",options:[" Zinc oxide"," Silica allotropes"," Calcium hydroxide"," Sodium alginate"],correctAnswerIndex:1,explanation:"Refractory filler is mostly silica .(quartz/cristobalite/tridymite)"},{id:"inv_mcq_7",question:"In investments, the “binder” mainly functions to:",options:[" Melt the alloy B holding silica filler particles together"," Prevent wax burnout"," Remove oxides from casting"],correctAnswerIndex:1,explanation:"Binder cements silica grains into a rigid mass. Classification"},{id:"inv_mcq_8",question:"The most commonly used classification of investments is based on:",options:[" Color"," Binder type"," Sprue length"," Ring size"],correctAnswerIndex:1,explanation:"Most common = gypsum / phosphate / ethyl silicate (binder-based) ."},{id:"inv_mcq_9",question:"Gypsum-bonded investments are most appropriate for:",options:[" Very high-fusing base metal alloys (Ni-Cr/Co-Cr)"," Gold alloy castings (lower casting temperatures)"," Titanium castings"," All ceramics only"],correctAnswerIndex:1,explanation:"Gypsum-bonded is for lower-fusing (gold) castings ."},{id:"inv_mcq_10",question:"Phosphate-bonded investments are mainly used for:",options:[" Low-fusing gold inlays only"," Metal-ceramic alloys and base metal alloys ()"," Only gypsum products"," Hydrocolloid impressions"],correctAnswerIndex:1,explanation:"Phosphate-bonded tolerates high temperatures for PFM/base metals ."},{id:"inv_mcq_11",question:"Ethyl silicate–bonded investments are best described as:",options:[" Most common modern investment for all crowns"," Silica-gel bonded, technique-sensitive, now less common"," Only for gypsum die stones"," Used only below 400°C"],correctAnswerIndex:1,explanation:"Ethyl silicate systems are older/complex , now less common ."},{id:"inv_mcq_12",question:"Type II investment compensates casting shrinkage mainly by:",options:[" Thermal expansion"," Hygroscopic expansion"," Wax contraction"," Shrinkage of investment"],correctAnswerIndex:1,explanation:"Type II = mainly hygroscopic expansion . Gypsum-bonded investments (GBI)"},{id:"inv_mcq_13",question:"Typical composition of gypsum-bonded investment is closest to:",options:[" 5% gypsum + 95% silica"," 25–35% gypsum binder + 65–75% silica + small modifiers"," 80% binder + 20% silica"," 100% gypsum only"],correctAnswerIndex:1,explanation:"Typical ranges: ~25–35% binder and ~65–75% silica ."},{id:"inv_mcq_14",question:"Gypsum-bonded investments should NOT be heated above approximately:",options:[" 300°C"," 500°C"," 700°C"," 1200°C"],correctAnswerIndex:2,explanation:"Above ~ 700°C gypsum decomposes → shrinkage + contamination."},{id:"inv_mcq_15",question:"A lab technician hands you a gold casting that has a dark/black discoloration (tarnish) . The most likely reason is:",options:[" Incorrect sprue angle"," Wet ring liner used"," Overheating the gypsum-bonded investment during burnout"," Excess vibration while investing"],correctAnswerIndex:2,explanation:"(why C is correct) Gypsum-bonded investments are stable only up to a certain burnout temperature(700-650 C). If the ring is overheated , the gypsum binder begins to decompose , and sulfur-containing products can be released. These sulfur compounds react with alloy components at the casting surface and form metal sulfides , which show up clinically as a dark/black surface discoloration (tarnish) ."},{id:"inv_mcq_16",question:"Quartz inversion (α → β) occurs at:",options:[" 117°C"," 270°C"," 573°C"," 1040°C"],correctAnswerIndex:2,explanation:"Quartz α→β inversion is at 573°C ."},{id:"inv_mcq_17",question:"Cristobalite inversion mainly occurs around:",options:[" 0–50°C"," 200–270°C"," 573°C"," 900–1000°C"],correctAnswerIndex:1,explanation:"Cristobalite inversion occurs ~200–270°C ."},{id:"inv_mcq_18",question:"The gypsum setting reaction is:",options:[" CaSO ₄ ·2H ₂ O → CaSO ₄ ·½H ₂ O"," CaSO ₄ ·½H ₂ O + 1½H ₂ O → CaSO ₄ ·2H ₂ O + heat"," MgO + NH ₄ H ₂ PO ₄ → Mg ₂ P ₂ O ₇"," Si(OC ₂ H ₅ ) ₄ → SiO ₂ only"],correctAnswerIndex:1,explanation:"Hemihydrate hydrates to dihydrate and releases heat ."},{id:"inv_mcq_19",question:"Normal (air) setting expansion of gypsum investments is typically:",options:[" 0.01–0.05%"," 0.4–0.6%"," 1.2–2.2%"," 3–5%"],correctAnswerIndex:1,explanation:"Normal setting expansion is around 0.4–0.6% ."},{id:"inv_mcq_20",question:"Maximum hygroscopic expansion is obtained when the investment ring is immersed:",options:[" After final set"," Before initial set"," Only after burnout"," Only in cold water (0–5°C)"],correctAnswerIndex:1,explanation:"Earlier immersion (before initial set) gives the highest hygroscopic expansion."},{id:"inv_mcq_21",question:"Hygroscopic expansion generally increases with:",options:[" Coarser silica and higher W/P"," Finer silica and higher silica content"," Increasing W/P ratio"," Longer shelf life (older investment)"],correctAnswerIndex:1,explanation:"More + finer silica → more hygroscopic expansion."},{id:"inv_mcq_22",question:"Why is porosity of investment important?",options:[" It makes casting heavier"," It vents gases/air ahead of molten metal to allow full mold filling"," It prevents burnout"," It increases alloy melting point"],correctAnswerIndex:1,explanation:"Porosity provides gas escape paths during casting."},{id:"inv_mcq_23",question:"Main reason phosphate investment is used instead of gypsum for PFM/base metals:",options:[" Gypsum expands too much"," Gypsum decomposes at high temperature"," Phosphate has lower strength"," Phosphate is only for hydrocolloid impressions"],correctAnswerIndex:1,explanation:"Gypsum breaks down at high heat-700°C; ; phosphate survives high-fusing phosphate tolerates high temperatures"},{id:"inv_mcq_24",question:"Acid used in phosphate investment powder is commonly:",options:[" Borax"," Monoammonium phosphate (NH ₄ H ₂ PO ₄ )"," Sodium chloride"," Calcium carbonate"],correctAnswerIndex:1,explanation:"NH ₄ H ₂ PO ₄ is the acid phosphate ."},{id:"inv_mcq_25",question:"Base in phosphate investment binder is:",options:[" MgO (magnesia)"," CaSO ₄ ·½H ₂ O"," SiO ₂"," HCl"],correctAnswerIndex:0,explanation:"MgO is the base component."},{id:"inv_mcq_26",question:"Setting product formed (room temperature) is:",options:[" CaSO ₄ ·2H ₂ O"," NH ₄ MgPO ₄ ·6H ₂ O"," Mg ₂ P ₂ O ₇"," Si(OH) ₄"],correctAnswerIndex:1,explanation:"Forms magnesium ammonium phosphate hexahydrate ."},{id:"inv_mcq_27",question:"On heating phosphate investments, the binder mainly converts to:",options:[" CaO"," Mg ₂ P ₂ O ₇"," NaCl"," CaSO ₄ ·2H ₂ O"],correctAnswerIndex:1,explanation:"Heating yields Mg ₂ P ₂ O ₇ (ceramic-like binder)."},{id:"inv_mcq_28",question:"A practical sign during heating of phosphate investments can be:",options:[" Chlorine smell"," Ammonia smell"," Sulfur dioxide smell"," Ozone smell"],correctAnswerIndex:1,explanation:"Binder decomposition can release ammonia ."},{id:"inv_mcq_29",question:"To increase mold expansion for base-metal castings using phosphate investment, you should:",options:[" Replace special liquid with oil"," Replace water with colloidal silica"," Add borax as retarder"," Use less silica filler"],correctAnswerIndex:1,explanation:"Colloidal silica boosts setting + thermal expansion ."},{id:"inv_mcq_30",question:"Carbon in phosphate investments is mainly added to:",options:[" Raise melting point"," Improve divesting/cleaner castings"," Reduce casting shrinkage to zero"," Stop ammonia release"],correctAnswerIndex:1,explanation:"Carbon helps clean casting + divesting , but may be avoided with high Pd. (High-yield follow-up on Carbon controversy in PBI) A phosphate-bonded investment WITHOUT carbon is preferred when casting which alloy? A. High-copper gold alloy B. Silver-palladium / high-palladium alloy C. Low-fusing Type I gold alloy D. Pure titanium B Carbon can interact with high-palladium alloys at high casting temperatures , increasing risk of embrittlement/contamination , so a carbon-free phosphate investment is preferred. Ethyl silicate–bonded investments"},{id:"inv_mcq_31",question:"“Green shrinkage” refers to shrinkage occurring mainly during:",options:[" Alloy solidification"," Drying of the silica gel"," Quartz inversion at 573°C"," Hygroscopic expansion in water bath"],correctAnswerIndex:1,explanation:"Green shrinkage = drying contraction of gel (loss of water/alcohol)."},{id:"inv_mcq_32",question:"Total mold reduction in ethyl silicate systems (before casting) is:",options:[" Only setting shrinkage"," Only green shrinkage"," Setting shrinkage + green shrinkage"," Thermal expansion + hygroscopic expansion"],correctAnswerIndex:2,explanation:"Total shrinkage = setting shrinkage + green shrinkage ."}],oo=[{id:"inv_mcq_33",question:"Dental alloys are most commonly cast into molds using:",options:[" Hand pressure only"," Centrifugal force, pressure, or vacuum + pressure"," Capillary action only"," Ultrasonic vibration only"],correctAnswerIndex:1,explanation:"Standard casting uses centrifugal / pressure / vacuum-pressure ."},{id:"inv_mcq_34",question:"Which is NOT an ideal requirement of an investment?",options:[" Controlled expansion"," Adequate porosity for gas venting"," Chemical reaction with molten metal for better bonding"," Smooth surface/detail reproduction"],correctAnswerIndex:2,explanation:"Investment should NOT chemically react with molten metal. Q7 . The main role of refractory silica in an investment is to: A. Act as binder B. Provide thermal expansion to compensate alloy shrinkage C. Act as reducing agent D. Lower alloy melting point B Silica gives thermal expansion/inversion expansion to offset alloy shrinkage."},{id:"inv_mcq_35",question:"Type I investment compensates casting shrinkage mainly by:",options:[" Hygroscopic expansion"," Thermal expansion"," Polymerization expansion"," Elastic recovery"],correctAnswerIndex:1,explanation:"Type I = mainly thermal expansion compensation."},{id:"inv_mcq_36",question:"Type II investments should have hygroscopic expansion (in water) roughly:",options:[" 0.1–0.3%"," 0.4–0.6%"," 1.2–2.2%"," 4–6%"],correctAnswerIndex:2,explanation:"Type II target/limits are ~1.2–2.2% . Gold shrinks about 1.2%"},{id:"inv_mcq_37",question:"Increasing W/P ratio (thinner mix) generally causes hygroscopic expansion to:",options:[" Increase"," Decrease"," Become 10× higher"," Stay unchanged always"],correctAnswerIndex:1,explanation:"More water → less hygroscopic expansion . This is a bit conflicting but increase W/P ratio will(more water less powder )will decrease expansion increase porosity and decrease strength but if the setting is done under water after the initial mixing is done at the time when chemical reaction is occurring submerged in water (taking a bath ) More gauging water = weaker + more porous + less expansion.” “More immersion water (early) = more hygroscopic expansion."},{id:"inv_mcq_38",question:"Thermal expansion for Type I gypsum investments is typically targeted around:",options:[" 0–0.2%"," 0.4–0.6%"," 1.0–1.6%"," 3.0–5.0%"],correctAnswerIndex:2,explanation:"Type I relies on thermal expansion ~1.0–1.6% . Q30 A gypsum-bonded investment is accidentally heated above its safe temperature during burnout. Which outcome is MOST likely? A. Increased hygroscopic expansion and improved fit B. Investment shrinkage with possible casting contaminatio n C. Stronger investment mold and smoother casting D. Complete prevention of porosity B Overheating gypsum investment causes decomposition , leading to contraction (shrinkage) and contamination of the casting (classically via sulfide formation) ."},{id:"inv_mcq_39",question:"Classic positioning guideline for venting in gypsum-bonded investments: top of pattern should be within about:",options:[" 1 mm of open end"," 3 mm of open end"," 6 mm of open end"," 15 mm of open end"],correctAnswerIndex:2,explanation:"Pattern should be within ~6 mm for effective venting. Phosphate-bonded investments (PBI)"},{id:"inv_mcq_40",question:"The phosphate binder system is mainly:",options:[" Polymerization"," Acid–base reaction"," Oxidation-reduction"," Crystallization without chemical change"],correctAnswerIndex:1,explanation:"It sets by an acid–base cement reaction ."},{id:"inv_mcq_41",question:"Ethyl silicate investments set mainly by:",options:[" Gypsum hydration"," Sol–gel chemistry"," Acid–base MgO + phosphate reaction only"," Polymerization of acrylic resin"],correctAnswerIndex:1,explanation:"Ethyl silicate uses hydrolysis + gelation → silica gel binder."},{id:"inv_mcq_42",question:"In ethyl silicate systems, HCl mainly acts as:",options:[" Refractory filler"," Catalyst for hydrolysis of ethyl silicate"," Ring liner"," Wax softener"],correctAnswerIndex:1,explanation:"HCl catalyzes hydrolysis of ethyl silicate."}],so=[{id:"inv_mcq_43",question:"Silica is added to gypsum-bonded investment mainly because it:",options:[" Prevents gypsum setting reaction"," Acts as the binder that holds the investment together"," Undergoes inversion expansion on heating, offsetting gypsum contraction"," Eliminates the need for a ring liner"],correctAnswerIndex:2,explanation:"Quartz/cristobalite show inversion expansion on heating, which counterbalances gypsum shrinkage and helps maintain mold size."},{id:"inv_mcq_44",question:"Reducing mixing time generally causes hygroscopic expansion to:",options:[" Increase"," Decrease"," Double"," Become unrelated to silica content"],correctAnswerIndex:1,explanation:"Less mixing → reduced hygroscopic expansion ."}],um=[...no,...oo,...so],mm=`
# Casting Procedure

![Casting Procedure Overview](assets/investment/investment_img_1_1.png)

# Dental Casting (Lost-Wax)
## The BIG GOAL (why we do all this)
A casting fits only if the mold is enlarged enough to compensate for:
- Wax pattern changes (minor, variable)
- Alloy solidification shrinkage (major; noble ≈ ~1.25%+, base metals≈ ~ 2.2% )

## Alloy Solidification Shrinkage (Major, Predictable)
This is the most important factor.
### 🔹 Why does metal shrink?
- Molten metal atoms are far apart
- On cooling and solidification, atoms pack closer together
- This causes volume contraction
### 🔹 Typical shrinkage values:
- **Noble alloys (gold-based)**: ≈ 1.25%
- **Base-metal alloys (Ni-Cr, Co-Cr)**: ≈ 2.0–2.3% (≈ 2.2%)

👉 Base metals shrink more because:
- Higher melting temperature
- Greater thermal contraction

![Shrinkage Compensation](assets/investment/casting_img_2.png)

We cannot control this shrinkage so what we do is we counter it by making the investment expand which we already learned in investment material by thermal expansion and hygroscopic expansion

**Investment expansion +2.2% - (Metal shrinkage )2.2%-=0**

**Total Investment Expansion = Metal Casting Shrinkage**
- Example: If the metal shrinks by 2.2%, the mold must expand by 2.2%.
- Result: The expansion (+2.2%) cancels out the shrinkage (-2.2%), resulting in a net change of 0.
If this is mismatched by any percentage we get either undersized or oversized casting

# 1) Lost-Wax Casting Procedure — FLOW CHART (what happens step-by-step)
**Impression**
-> **Master cast + Master die** (Type IV / Type V stone)
-> **Wax/resin pattern made on die** (margins/contacts/occlusion corrected)
-> **Sprue + reservoir added** (creates metal channel + feeding source)
-> **Investing** (pattern surrounded by investment in ring / ringless system) (a separate slide )
-> **Bench set (~1 hour)** (investment hardens)
-> **Burnout / Wax elimination + heating** (wax removed, mold expanded, water driven off)
-> **Casting** (molten alloy forced into mold: centrifugal / pressure / vacuum+pressure)
-> **Cooling** (then divest)
-> **Cleaning** (pickling / ultrasonic / sandblast as appropriate)
-> **Finish + fit check** (remove nodules, check margins under magnification)

# 2) Master die
Most commonly used:
- **Type IV stone**: high strength, setting expansion ≤0.1%
- **Type V stone**: high strength, higher expansion up to ~0.3% (helps compensate base-metal shrinkage)

**Main disadvantage of gypsum dies**: abrasion during wax carving.
Ways to increase abrasion resistance (but can slightly increase die size):
- Silver “plating” / electroforming approaches
- Cyanoacrylate coating
- Die hardener addition

**Die spacer (for cement space)**:
- Usually resin paint-on; applied in coats to within ~0.5 mm of finish line

**Electroformed dies (metal shell on impression)**:
- Very abrasion-resistant + accurate surface reproduction
- “Silver-plated die” is technically wrong wording because the impression surface is plated, not the die itself.

# 3) Sprue design — the highest-yield principles MUST
**Purpose of sprue former**: channel for molten alloy to reach mold after wax elimination.

## 6.1 Sprue diameter
- Sprue diameter ≈ thickest part of wax pattern
- Too small → sprue freezes first → localized shrinkage / suck-back near attachment

## 6.2 Sprue position + direction
- Attach to bulkiest area
- Best if metal flows thick → thin (toward margins) rather than thin → thick
- Avoid directing molten metal toward thin/delicate parts (may abrade/fracture investment)

## 6.3 Sprue angle (turbulence rule)
- Avoid attaching at 90° to broad flat surfaces → turbulence → severe porosity at attachment
- Prefer ~45° to proximal wall for smoother flow + less porosity

## 6.4 Sprue attachment shape
- Often flared for high-density gold alloys (helps entry like reservoir)
- Sometimes more restricted for lower-density alloys

## 6.5 Sprue length + pattern position (the “6 mm” rule)
- Pattern should be positioned close to ring end so gases vent:
    - **Gypsum-bonded**: top of pattern within ~6 mm of open end
    - **Phosphate-bonded**: can be closer (~3–4 mm) due to higher strength

![Sprue Design](assets/investment/casting_img_3.png)

## 6.6 Reservoir (feeding rule)
- Reservoir/button must remain molten longer than the pattern so it can feed metal during solidification → prevents shrinkage voids.

![Reservoir Concept](assets/investment/casting_img_4.png)

# 7) Rings, ring liners, and “Ringless” systems detail is unnecessary
## 7.1 Why liner is used
Metal ring restricts investment expansion → can distort mold.
Ring liner provides cushioning → allows investment expansion.

## 7.2 Liner materials
- Asbestos is obsolete (biohazard)
- Alternatives: cellulose (paper) and ceramic liner

## 7.3 One liner vs two liners
- More liner thickness (or two layers) → more normal + semihygroscopic expansion
- Liner thickness should not be < ~1 mm
- Liner must fit with no overlap (overlap = nonuniform expansion)

## 7.4 Wet liner vs dry liner
- Wet liner adds water during set → increases semihygroscopic expansion
- Don’t squeeze liner (uneven water removal → nonuniform expansion)

## 7.5 Controlling excessive longitudinal expansion
- Expansion is greater longitudinally than radially
- Keeping liner slightly short of ring ends (example ~3.25 mm short) can reduce longitudinal over-expansion and distortion.

## 7.6 Ringless (“Ingl(e)ss”) / PowerCast style concept
- Tapered plastic rings allow the set mold to be pushed out after setting
- Burnout occurs without rigid metal ring → greater investment expansion
- Used for cases needing more mold expansion than traditional techniques.

# 8) Crucibles (what to choose)
- **Clay**: many crown/bridge noble alloys
- **Carbon**: many gold-based alloys (NOT for carbon-sensitive alloys)
- **Quartz / alumina / zirconia-alumina**: recommended for high-fusing alloys and carbon-sensitive alloys
- Carbon crucible should NOT be used for: high-Pd, Pd-Ag, Ni-Cr, Co-Cr alloys (carbon contamination risk)

![Crucibles](assets/investment/casting_img_5.png)

# 8) Mixing + investing procedure (what causes nodules/roughness)

## 8.1 Cleaning wax pattern
- Must be cleaned of debris/grease/oil
- Thin film of cleaner/wetting agent improves wetting → fewer bubbles

## 8.2 Vacuum mixing/investing (high yield)
- Vacuum mixing removes bubbles → smoother surface, fewer nodules
- Excessive vibration is bad → solids settle + free water near pattern → roughness
- Excessive vibration can dislodge pattern from sprue → miscast

## 8.3 Liquid/powder ratio (L/P or W/P)
- Higher W/P (more water) → weaker investment, more porosity, rougher casting, generally less effective expansion
- Lower W/P → thicker mix, potentially more expansion BUT too thick risks pattern distortion + poor coverage
- Measure accurately.

![Vacuum Mixing](assets/investment/casting_img_6.png)

# 9) Burnout (wax elimination + heating) — what happens + how it’s done

## 9.1 What burnout accomplishes
- Eliminates wax → creates mold cavity
- Provides thermal expansion(detail in investment material )
- Drives off water; reduces wax absorption; water vapor helps flush wax from mold
- If mold is held too long at high temp: risk of investment breakdown + rough surface + contamination

![Burnout Oven](assets/investment/casting_img_7.png)

## 9.2 Orientation in furnace (practical)
- Often place ring sprue hole down over a slot/tray so melted wax drains.

## 9.3 Two main compensation techniques
### A) Hygroscopic / Low-heat method (gypsum)
- Compensation from:
    1. Wax expansion in warm water bath (~37°C)
    2. Hygroscopic expansion from water entering investment
    3. Thermal expansion at ~500°C
- Requires longer burnout time because wax oxidizes slower at low temp
- Typical: mold in furnace ≥60 min, can be held longer with little damage, but venting may reduce if residual carbon remains → back-pressure risk.

### B) High-heat / Thermal expansion method (gypsum)
- Heat from room temp up to ~650–700°C (controlled heating to avoid cracking)
- Hold at top temperature (short hold) then cast promptly
- Gypsum is more prone to decomposition if overheated.

## 9.4 Gypsum investment temperature ceiling (critical)
- Gypsum investments should not be heated above **~700°C**
- If gypsum investment contains carbon, safe maximum may be lower (often around **~650°C**)
- Above limits → sulfur gases + contamination → black/gray brittle layer on gold alloy; difficult to pickle clean.

## 9.5 Phosphate investment burnout (high heat)
- Typical burnout temperatures: **~750°C to 1030°C** (highest for base metals)
- Often staged heating: slow early (e.g., 200–315°C hold) then faster, then hold at top temp (~30 min), then cast.
- Phosphate investment permeability is lower than gypsum → often requires greater casting pressure.

## 9.6 “Cast soon after removing ring” (time allowable)
- Investment contracts as it cools.
- In high-heat technique, about **~1 minute** can pass without noticeable dimensional loss under average conditions → then contraction matters.

# 10) Casting machines
Alloys melted and cast by:
1. Torch melting → centrifugal casting
2. Electrical resistance or induction melting → centrifugal
3. Induction melting (often for base metals)
4. Vacuum-arc melted + pressure casting in inert atmosphere (esp. reactive metals like Ti)

![Casting Machines](assets/investment/casting_img_8.png)

# 11) Torch flame + melting

## 11.1 Proper flame
- Use a nonluminous brush flame (efficient/hot)
- Beginners often choose roaring “too much air” flame (sounds hot but is wrong)

## 11.2 Flame zones (must know)
- **Mixing zone**: no heat
- **Combustion/oxidizing zone**: oxidizes alloy → dross (keep away)
- **Reducing zone**: hottest usable zone → should contact alloy during melting
- Outer oxidizing area should not be used for melting.

![Flame Zones](assets/investment/casting_img_9.png)

## 11.3 Signs you’re using wrong zone
- **Correct reducing zone** → metal surface bright/mirrorlike
- **Oxidizing zone** → dull cloudy oxide film (“dross”)

## 11.4 Casting temperature rule
- Cast immediately when proper temp reached
- For many noble alloys: molten alloy should be **~38–66°C** above liquidus

## 11.5 Flux (noble alloys)
- Flux increases fluidity and reduces oxidation/porosity
- Borax + boric acid is classic
- Reducing fluxes with charcoal can shed carbon bits → margin defects

# 13) Cleaning after casting

## 13.1 Quenching (noble alloys)
- For type III/IV gold: quench when button shows **dull-red glow**
The button is the rounded mass of excess metal at the end of the sprue, near the crucible former, after casting

![Quenching 1](assets/investment/casting_img_10.png)
![Quenching 2](assets/investment/casting_img_11.png)

- Anneals metal (easier burnish/polish)(detail in metals )
- Hot investment breaks down → easier removal(thermal shock )
**Too hot (bright red) quench** → over-annealing + distortion;
**too cold (fully cooled) quench** → hard alloy(no annealing occurs ) + difficult divesting;(no thermal shock to break the investment)
**dull-red button** → ideal anneal + easy divesting.
If the metal is too hot and it is quench in water it can leads to Metal fins on casting

![Metal Fins](assets/investment/casting_img_12.png)

## 13.2 Pickling (removes oxides/discoloration)
- Often surface dark from oxides/tarnish → remove by acid pickling
- Common for gypsum-bonded: ~50% HCl (effective but fumes hazardous/corrosive; needs ventilation)
- Don’t boil acids (fumes)

**Important mistake to avoid (high yield):**
- **Never use steel tongs** in pickling solution while holding casting → galvanic cell deposits copper on casting → future discoloration.

## 13.3 Phosphate investment cleanup
- Investment adheres strongly; large quartz grains
- HCl/H₂SO₄(cannot use it )
- Neither phosphate binder nor silica is soluble in
- HF(used to etch ceramic ) dissolves silica but is dangerous (often avoided); safer commercial alternatives exist
- Base metal alloys: prefer sandblasting with fine alumina, avoid acids.

# 14) Casting defects (most testable) — types, causes, prevention

![Casting Defects](assets/investment/casting_img_13.png)

## A) Distortion
- Usually wax pattern distortion (handling/removal)
- Also nonuniform investment expansion can distort thin patterns
- Lower setting expansion generally → less distortion (but expansion still needed overall)

## B) Surface roughness / irregularities / discoloration
Common causes:
- Air voids on pattern → nodules (fix: vacuum investing, good wetting)
- Water films from investment separating from wax (jarring after investing)
- High W/P ratio → rough casting
- Coarse silica → rougher surface
- Foreign bodies in mold (bits of investment, carbon from flux)
- Sulfur contamination → black/gray brittle layer on gold alloy; doesn’t pickle clean

## C) Porosity (internal + external)
Two big groups:
1. **Solidification defects**
    - Localized shrinkage porosity
    - Microporosity
    - Suck-back porosity (hot spot)
2. **Trapped gases**
    - Pinhole porosity
    - Gas inclusions
    - Subsurface porosity
    - Back-pressure porosity

### 1) Localized shrinkage porosity
- **What**: a shrinkage void caused by poor “feeding” of molten metal during solidification.(basically the metal freezes/solidifies before it flows to all places )
- **Why**: metal shrinks as it freezes; if the sprue/button freezes before the casting, liquid metal can’t flow in to compensate → void forms.
- **Where/looks like**: irregular voids, often near the sprue–casting junction or thick areas.
- **Prevent**: sprue thick enough, attach to thickest part, add reservoir/button, correct casting temperature.

### 2) Microporosity
- **What**: many tiny internal pores within thick sections.
- **Why**: the surface freezes first; inside becomes a “mushy zone” of dendrites, and the last liquid metal can’t feed the shrinkage → tiny pores remain.
- **Where/looks like**: fine internal porosity in bulky areas; not always visible until sectioned/ground.
- **Prevent**: correct sprue + reservoir, avoid too-rapid freezing, maintain proper casting temperature and pressure.

### 3) Suck-back porosity (hot spot)
- **What**: a shrinkage void from a localized hot region that freezes last.
- **Why**: metal impinges at sprue junctions or sharp line angles, creating a hot spot; that area solidifies last and “pulls back” → void.
- **Where/looks like**: usually just inside casting near sprue attachment or near sharp internal angles; often a smooth void.
- **Prevent**: flare sprue attachment, round sharp line angles, correct sprue placement, avoid excessive mold/melt temp.

### 4) Trapped gases
- **What**: gas/air physically stuck in the mold or melt → rounded voids.
- **Why**: turbulence, poor venting, moisture/wax residues creating gas, inadequate pressure/flow.
- **Where/looks like**: rounded pores; may be scattered; can cause short castings.
- **Prevent**: smooth metal flow (proper sprue), complete burnout, dry mold, adequate pressure.

### 5) Pinhole porosity
- **What**: tiny surface pinholes.
- **Why**: gas in molten metal escapes at/near the surface during freezing (often from overheating, contamination, wrong flame, dirty alloy/crucible).
- **Where/looks like**: many small pin-point holes on surface after finishing.
- **Prevent**: don’t overheat, clean alloy/crucible, proper flux, controlled melting, avoid prolonged heating.

### 6) Gas inclusions
- **What**: larger rounded bubbles trapped inside the casting.
- **Why**: air/gas gets entrained during melting/casting (turbulence, splashing, contamination).
- **Where/looks like**: larger smooth round internal voids (bigger than pinholes).
- **Prevent**: avoid turbulence, correct sprueing, steady casting pressure, clean melt.

### 7) Subsurface porosity
- **What**: pores just below the surface (appear after grinding/polishing).
- **Why**: gas dissolves in molten metal; as it cools, gas solubility drops → gas comes out beneath a frozen surface skin.
- **Where/looks like**: looks fine initially, then pores show on finishing.
- **Prevent**: avoid overheating, minimize melt time, protect melt from gas pickup.

### 8) Back-pressure porosity
- **What**: rounded porosity + often incomplete casting due to “air pushing back.”
- **Why**: air in mold can’t escape through investment because investment is too dense or pores are clogged (carbon from incomplete burnout, moisture). Incoming metal meets resistance → voids/short margins.
- **Where/looks like**: rounded porosity + rounded incomplete margins / missing thin parts.
- **Prevent**: correct investment mix (good permeability), complete burnout, keep pattern ~6 mm from ring end/wall, adequate casting pressure/time.

## Shrinkage Porosity (The "Feeding" Problem)
**Cause**: Metal shrinks as it cools. If new liquid metal cannot reach the shrinking area, a vacuum void forms.

| Type | Visual Cues | Key Mechanism |
| :--- | :--- | :--- |
| **Localized Shrinkage** | Irregular shapes (jagged). Usually near the sprue-casting junction. | **Sprue froze too early.** The supply line was cut off while the casting was still thirsty for metal. |
| **Microporosity** | Tiny, fine voids throughout a thick section, often invisible until polished. | **Dendritic growth.** The "mushy zone" inside a thick chunk froze before liquid could fill the gaps between crystals. |
| **Suck-back (Hot Spot)** | Smooth void, often just inside the casting near the sprue or sharp line angle. | **Hot Spot.** The metal hit a sharp corner, overheated that spot, and that spot froze last, sucking metal back toward the sprue. |

## Gas Porosity (The "Trapped Air" Problem)
**Cause**: Gas (air, combustion products, or dissolved gas) is physically trapped inside the metal.

| Type | Visual Cues | Key Mechanism |
| :--- | :--- | :--- |
| **Pinhole Porosity** | Tiny spherical holes all over the surface. | **Gas release.** The metal was overheated or contaminated; gas dissolved in the liquid and bubbled out right as it froze. |
| **Gas Inclusions** | Larger rounded bubbles inside the metal. | **Turbulence.** Poor sprue design caused the metal to splash and trap air pockets, or debris released gas. |
| **Subsurface Porosity** | Hidden voids that appear only after polishing/grinding. | **Solubility drop.** Gas was trapped just under the frozen "skin" of the casting. |
| **Back-pressure Porosity** | Rounded voids + Rounded margins (incomplete casting). | **No Escape.** The air in the mold couldn't get out (investment too dense or pattern too deep). The air fought back against the metal. |
`,hm=["Casting involves forcing molten alloy into a mold cavity.","Stages: Wax pattern, Spruing, Investing, Burnout, Casting.","Expansion of the mold must perfectly compensate for alloy shrinkage.","Venting is necessary to allow gases to escape the mold."],ao=[],ro=[{id:"cast_mcq_set2_1",question:"Cleaning after casting (base metals) A cast restoration made from a Ni-Cr alloy needs cleaning after divesting. What is the preferred method?",options:["Pickling in 50% HCl","Pickling in sulfuric acid","Sandblasting with fine alumina","Ultrasonic cleaning in acid"],correctAnswerIndex:2,explanation:"Base-metal alloys (Ni-Cr, Co-Cr) are acid-resistant and acids are ineffective and potentially damaging. Fine alumina sandblasting is preferred to mechanically remove investment remnants."},{id:"cast_mcq_set2_2",question:"Pickling with gypsum-bonded investment After casting a Type III gold alloy using a gypsum-bonded investment, the surface appears dark and discolored. What is the most appropriate cleaning method?",options:["Sandblasting with alumina","Pickling with ~50% hydrochloric acid","Hydrofluoric acid immersion","No cleaning is required"],correctAnswerIndex:1,explanation:"For gypsum-bonded investments , ~50% HCl effectively removes surface oxides and discoloration. However, fumes are corrosive and require proper ventilation."},{id:"cast_mcq_set2_3",question:"Quenching of gold alloys When casting a Type IV gold alloy, when should the ring be quenched in water?",options:["Immediately after casting","When the sprue button shows a bright cherry-red color","When the button shows a dull-red glow","After complete cooling to room temperature"],correctAnswerIndex:2,explanation:"For Type III/IV gold alloys , quenching is done when the button shows a dull-red glow . This ensures proper annealing and facilitates easy divesting."},{id:"cast_mcq_set2_4",question:"Purpose of quenching gold castings Why is quenching performed when the button shows a dull-red glow in noble metal castings?",options:["To increase hardness","To reduce alloy shrinkage","To anneal the alloy and break down the hot investment","To prevent oxidation during melting"],correctAnswerIndex:2,explanation:"Quenching provides thermal shock , which breaks down the hot investment for easy removal and anneals the gold alloy , making it easier to burnish and polish."},{id:"cast_mcq_set2_5",question:"Definition of the “button” In dental casting, the button refers to:",options:["The crucible former","The thickest part of the crown","The rounded mass of excess metal at the end of the sprue","The reservoir inside the wax pattern"],correctAnswerIndex:2,explanation:"The button is the rounded excess metal mass that forms at the end of the sprue near the crucible former after casting."},{id:"cast_mcq_set2_6",question:"Flux in noble alloy casting What is the primary purpose of using flux during casting of noble metal alloys?",options:["Increase mold expansion","Prevent gypsum decomposition","Increase fluidity and reduce oxidation","Etch the metal surface"],correctAnswerIndex:2,explanation:"Flux improves fluidity of molten metal and reduces oxidation and porosity during melting and casting."},{id:"cast_mcq_set2_7",question:"Common flux for noble alloys Which combination is classically used as a flux for noble metal alloy casting?",options:["Borax + charcoal","Borax + boric acid","Boric acid + silica","Sodium fluoride + borax"],correctAnswerIndex:1,explanation:"Borax + boric acid is the classic flux for noble alloys, forming a protective glassy layer that limits oxidation."},{id:"cast_mcq_set2_8",question:"Correct torch flame zone During torch melting of a noble metal alloy, which flame zone should be directed onto the alloy?",options:["Mixing zone","Oxidizing (combustion) zone","Reducing zone","Outer oxidizing zone"],correctAnswerIndex:2,explanation:"The reducing zone is the hottest usable zone and minimizes oxidation. Contact with oxidizing zones produces dross and porosity."},{id:"cast_mcq_set2_9",question:"Effect of using the oxidizing flame zone Using the oxidizing zone of the flame during alloy melting most likely causes:",options:["Faster melting with better flow","Increased mold expansion","Dull, cloudy oxide formation (dross)","Reduced porosity"],correctAnswerIndex:2,explanation:"The oxidizing zone introduces oxygen, leading to oxide formation (dross) and increased porosity."},{id:"cast_mcq_set2_10",question:"Function of ring liner What is the primary function of a ring liner during investing?",options:["Strengthen the casting ring","Reduce setting time of investment","Provide cushioning to allow investment expansion","Prevent wax distortion during burnout"],correctAnswerIndex:2,explanation:"The ring liner cushions the investment , reducing restriction from the metal ring and allowing uniform setting and hygroscopic expansion ."}],lo=[{id:"cast_mcq_1",question:"The ideal site for sprue attachment on a wax pattern is:",options:["Thin marginal area","Nonfunctional cusp tip","Bulkiest part of the pattern","Any flat surface"],correctAnswerIndex:2,explanation:"Sprue must attach to the thickest section so metal flows thick → thin and the sprue does not freeze before the casting."},{id:"cast_mcq_2",question:"Attaching a sprue at a right angle (90°) to a broad flat surface most commonly causes:",options:["Microporosity","Back-pressure porosity","Turbulence and localized porosity","Distortion of wax pattern"],correctAnswerIndex:2,explanation:"90° attachment causes turbulent metal flow , leading to severe porosity at the attachment site ."},{id:"cast_mcq_3",question:"Sprue attachment at approximately 45° is preferred because it:",options:["Increases casting pressure","Reduces metal oxidation","Produces smooth, laminar metal flow","Shortens burnout time"],correctAnswerIndex:2,explanation:"A 45° angle reduces turbulence , ensuring smooth metal entry and fewer porosities."},{id:"cast_mcq_4",question:"A sprue with a diameter smaller than the thickest part of the wax pattern is most likely to cause:",options:["Gas inclusion porosity","Subsurface porosity","Localized shrinkage (suck-back) porosity","Surface roughness"],correctAnswerIndex:2,explanation:"Thin sprue freezes first , preventing feeding → localized shrinkage / suck-back porosity near attachment."},{id:"cast_mcq_5",question:"The main purpose of flaring the sprue attachment is to:",options:["Reduce investment expansion","Increase turbulence","Act as a reservoir and reduce hot-spot formation","Prevent wax distortion"],correctAnswerIndex:2,explanation:"Flared attachment acts like a mini-reservoir , reduces hot spots, and minimizes suck-back porosity."},{id:"cast_mcq_6",question:"The sprue should be directed away from thin areas of the wax pattern because molten metal may:",options:["Cool too fast","Abrade or fracture the investment","Increase hygroscopic expansion","Cause distortion of the die"],correctAnswerIndex:1,explanation:"Direct metal impact on thin areas can fracture or abrade investment , causing casting defects."},{id:"cast_mcq_7",question:"In gypsum-bonded investments, the wax pattern should be positioned:",options:["Anywhere inside the ring","At the center of the ring","Within 6 mm of the open end of the ring","At the bottom of the ring"],correctAnswerIndex:2,explanation:"≤6 mm rule ensures adequate gas venting , reducing back-pressure porosity."},{id:"cast_mcq_8",question:"The reservoir in a sprue system should solidify:",options:["Before the pattern","Simultaneously with the pattern","After the pattern","Independently of the pattern"],correctAnswerIndex:2,explanation:"Reservoir must remain molten longer than the pattern to feed metal during solidification. 👉 CASTING DEFECTS: Solidification Defects due to improper feeding."},{id:"cast_mcq_9",question:"Localized shrinkage porosity is primarily caused by:",options:["Gas trapped in the mold","Early freezing of the sprue","Oxidizing flame","High W/P ratio"],correctAnswerIndex:1,explanation:"If the sprue freezes early, molten metal cannot feed shrinkage → localized voids ."},{id:"cast_mcq_10",question:"Suck-back porosity most commonly occurs:",options:["At the margins","Near the sprue-casting junction","At the button surface","On the external surface only"],correctAnswerIndex:1,explanation:"Hot spots near sprue attachment freeze last → suck-back porosity ."},{id:"cast_mcq_11",question:"Suck-back porosity is best prevented by:",options:["Increasing mold temperature","Increasing casting temperature","Flaring sprue attachment and rounding line angles","Using oxidizing flame"],correctAnswerIndex:2,explanation:"Flared attachment + rounded line angles eliminate hot spots and reduce shrinkage voids."},{id:"cast_mcq_12",question:"Microporosity is usually associated with:",options:["High casting temperature","Rapid solidification","Incomplete wax elimination","Residual carbon"],correctAnswerIndex:1,explanation:"Rapid freezing prevents voids from coalescing → fine microporosities . B. GAS-RELATED DEFECTS"},{id:"cast_mcq_13",question:"Pinhole porosity is most commonly caused by:",options:["Inadequate sprue diameter","Trapped air from poor venting","Dissolved gases expelled during solidification","Investment cracking"],correctAnswerIndex:2,explanation:"Dissolved gases (O ₂, H ₂) are expelled as metal solidifies → small spherical pinholes ."},{id:"cast_mcq_14",question:"Back-pressure porosity occurs due to:",options:["Excessive casting pressure","Inadequate mold venting","Large sprue diameter","Overheating of alloy"],correctAnswerIndex:1,explanation:"Trapped air cannot escape through investment pores → metal entry is resisted ."},{id:"cast_mcq_15",question:"Which situation increases back-pressure porosity?",options:["Pattern placed close to ring end","High mold permeability","Residual carbon clogging investment pores","Adequate casting pressure"],correctAnswerIndex:2,explanation:"Carbon residue blocks pores , preventing gas escape. C. INCOMPLETE CASTING"},{id:"cast_mcq_16",question:"Rounded, dull margins on a casting indicate:",options:["Oxidation of alloy","Low metal temperature or insufficient pressure","Sulfur contamination","Excessive mold expansion"],correctAnswerIndex:1,explanation:"Metal solidifies before filling margins → rounded, dull edges ."},{id:"cast_mcq_17",question:"Rounded but shiny margins suggest incomplete casting due to:",options:["Low casting pressure","Residual wax producing reducing atmosphere","Low mold temperature","Thin sprue diameter"],correctAnswerIndex:1,explanation:"Residual wax creates reducing CO atmosphere , producing shiny but incomplete margins."},{id:"cast_mcq_18",question:"Which factor MOST improves prevention of incomplete casting?",options:["Higher W/P ratio","Adequate venting and sustained casting pressure","Lower mold temperature","Smaller sprue diameter"],correctAnswerIndex:1,explanation:"Proper venting + maintained pressure ensures complete mold filling. 👉 EXAM TAKEAWAY (One-Line Memory Hooks) 🔹 Thin sprue → shrinkage porosity 🔹 90° sprue → turbulence → porosity 🔹 45° sprue → smooth flow 🔹 Pattern ~ 6 mm from ring end 🔹 Reservoir solidifies LAST 🔹 Rounded dull margins = low pressure/temp 🔹 Rounded shiny margins = residual wax 🔹 Back-pressure = trapped air"}],pm=[...ao,...ro,...lo],gm=`
# Dental Cements & Tooth Structures (Comprehensive)

## 1) Liners vs Bases (definitions + what they actually do)

![Liner vs Base](assets/cements/cements_img_1.png)


**Liner (thin)**

- Definition: a thin layer mainly to act as a barrier (chemical/electrical + some thermal) between dentin and the restoration; protects dentin from diffusing residual reactants and from oral fluids penetrating margins.
- **When you use it:** especially with metallic restorations that are not bonded and not insulating (amalgam, cast gold, indirect restorations).

**Base (thicker)**

- Definition: a thicker layer used for:
  - thermal protection
  - mechanical support (distributes stresses to underlying dentin)
  - support during condensation of amalgam when remaining dentin is thin

**Quick memory rule**

- Liner = barrier (thin)
- Base = barrier + support (thick)

<u><strong>Clinical Rules (RDT):</strong></u>
- RDT ≥2 mm: restoration only
- 1–2 mm: seal/bond only
- 0.5–1 mm: add BASE
- <0.5 mm: spot LINER + cover with BASE
- exposure: cap (MTA/CaOH) + base → restore.

## 2) Requirements (ideal properties) for liners/bases

A pulp-protective layer should:

1. Form an impervious layer without stealing bulk from restoration
2. Be biocompatible with dentin/pulp
3. Be chemically compatible with tooth + restorative material
4. Not discolor tooth/restoration
5. Harden fast enough for restoration placement
6. Withstand condensation forces without moving/deforming
7. Reduce dentin permeability
8. Be easy to manipulate

<u>Note:</u> thermal insulation often needs ~0.75 mm minimal thickness for true thermal protection (that’s “base territory”).

## 3) Classification of dental cements (the slide version)



**By “type” (what they’re based on)**

- Water-based: GIC / RMGIC, zinc polyacrylate (polycarboxylate), zinc phosphate
- Resin-based: composite & adhesive resin, compomers
- Oil-based: ZOE and non-eugenol ZnO

**By setting reaction**

- Acid–base: zinc phosphate, zinc polycarboxylate, ZOE, GIC
- Polymerization + acid–base: RMGIC, compomer
- Polymerization: resin cement

## 4) The materials (what it’s made of + how it sets + where you use it)

### A) Varnish (not really a cement, but tested with liners/bases)

**Composition:** natural gum/rosin/synthetic resin in organic solvent → leaves a thin film.
**Main use:** reduce leakage around cavity walls/margins; reduce penetration of amalgam corrosion products into dentin.

<u>**Do NOT use under:**</u>
- Composite (interferes with setting/bonding)
- GIC (prevents fluoride release)

### B) Calcium Hydroxide (CaOH2) liner (pulp protection / pulp capping concept)

**Key chemistry idea**
- Main “feature”: very high alkalinity (pH ~11–12.5).

**Forms + compositions**

1. **Non-setting aqueous paste (CaOH2 + water)**
   - Doesn’t set, weak → can be displaced
   - Not used directly under resin restorations in this wet form because it’s hydrophilic and can interfere with bonding

2. **Setting CaOH2 cements (classic Dycal-type: two pastes)**
   - Based on alkyl salicylates (liquid), supplied as two pastes
     - Base paste
     - Catalyst paste

**Setting reaction (what actually happens)**
- An acid–base / chelation reaction between weakly acidic salicylate and alkaline Ca(OH)2 → calcium chelate salt formation (carboxylate bands form).

**The Pulp Protector**

**Status:** The historic "Gold Standard" for vital pulp therapy
**Commercial Name:** Dycal

1. **Mechanism of Action (The "Bridge Builder")**
   - **High Alkalinity (pH ~12.5):** The high pH causes a localized state of chemical irritation to the pulp tissue.
   - **Effect:** This irritation stimulates undifferentiated mesenchymal cells in the pulp to differentiate into odontoblasts.
   - **Result:** These new cells form a Reparative Dentin Bridge (a physical barrier of dentin) that walls off the pulp from the cavity.
   - **Antimicrobial:** The high alkalinity is bactericidal, killing bacteria remaining in deep carious lesions.

**Clinical uses**

Uses: Calcium Hydroxide
- **Pulp Capping (Direct/Indirect):** Stimulates reparative dentin bridges to protect vital pulp.
- **Intracanal Medicament:** Placed between root canal visits to kill bacteria (bactericidal) and dry up persistent weeping/pus.
- **Apexification:** Induces a calcified barrier at the root tip in non-vital (dead) immature teeth.
- **Apexogenesis:** Maintains pulp vitality to allow natural root completion in vital (alive) immature teeth.
- **Anti-Resorption:** Neutralizes acidic inflammation to stop the body from resorbing (eating) the tooth root after trauma.

### C) Zinc Oxide-Eugenol (ZOE)

➔ **Key Feature:** Obtundent (sedative) effect on the pulp.
➔ **Chemistry:** Zinc Oxide-Eugenol (ZOE) Chemistry – Detailed Expansion

**Classification:** Chelation Reaction (Acid-Base).

**1. Composition**
- **Powder:**
  - Zinc Oxide (ZnO): (~69%) The principal ingredient.
  - White Rosin: (~29%) Critical additive. It reduces brittleness and makes the mix smoother.
  - Accelerators: Zinc Stearate or Zinc Acetate (~1%) are added to speed up the setting time.
- **Liquid:**
  - Eugenol: (Oil of Cloves). Chemically, it is a weak acid (phenol).
  - Plasticizers: Olive oil or cottonseed oil are added to control viscosity (masking the strong taste and smoothing the mix).
  - Water: Trace amounts are essential to initiate the reaction.

**2. The Setting Reaction (Chelation)**
The setting process is a chemical "Chelation" reaction that happens in two stages:
- **Step 1: Hydrolysis (The Trigger)** The reaction requires water to start. The Zinc Oxide reacts with water (from the liquid or atmosphere) to form Zinc Hydroxide. ZnO + H2O → Zn(OH)2
- **Step 2: Chelation (The Set)** The Zinc Hydroxide reacts with the Eugenol. Two molecules of Eugenol grab (chelate) one Zinc ion to form Zinc Eugenolate. Zn(OH)2 + 2HE → ZnE2 + 2H2O (Where HE = Eugenol and ZnE2 = Zinc Eugenolate)

**3. Structure of the Set Cement**

The final hardened mass is a "Cored Structure":
- Core: Unreacted Zinc Oxide particles (providing strength).
- Matrix: Amorphous Zinc Eugenolate (holding the particles together).

![ZOE Structure](assets/cements/cements_img_2.png)

**4. Critical Factors Affecting Setting**
- **Water/Humidity:** The reaction is Autocatalytic (it produces water, which speeds it up). Therefore, high humidity accelerates the setting time.
- **Temperature:** Higher heat accelerates the reaction (it sets faster in the mouth than on the mixing pad).

➔ **Key Properties:**
- pH: Alkaline (~7-8).
- Strength: Lowest compressive strength and hardness of all cements.
- Solubility: High solubility in oral fluids (washes out).

➔ <u><strong>Biological Paradox (Exam Gold):</strong></u>

| Target Tissue | Effect | Description |
|---|---|---|
| **Pulp** | Sedative (Obtundent) | Soothes the nerve; stops pain. |
| **Mucosa (Gums)** | Irritant | Causes chemical burns; avoid contact. |
| **Bacteria** | Antibacterial | Weak antiseptic; inhibits bacterial growth. |

➔ **Contraindication:** Eugenol inhibits the polymerization of resin composites (do not use under Composite).

➔ **Clinical Use:** Because of its unique "Sedative" vs. "Irritating" duality, ZOE has very specific roles.

1. **Temporary Restoration (IRM)**
   - Material: Intermediate Restorative Material (ZOE reinforced with polymer).
   - Use: Placed as a temporary filling (lasts < 1 year) when a patient cannot get a permanent filling immediately.
   - Why: Sedates the pulp until the permanent treatment is done.

2. **Temporary Cementation (Luting)**
   - Material: Temp-Bond.
   - Use: Cementing provisional (temporary) crowns and bridges.
   - Why: Weak enough to be removed easily when the permanent crown is ready.

3. **Sedative Base (Deep Cavities)**
   - Use: Placed under Amalgam restorations in deep cavities.
   - Why: Acts as a thermal insulator and soothes a hypersensitive pulp.
   - <u>**CRITICAL WARNING:**</u> NEVER place under Composite Resin (Eugenol inhibits setting).

4. **Impression Material (Prosthodontics)**
   - Material: Zinc Oxide Eugenol Impression Paste.
   - Use: Final impressions for Edentulous Arches (Complete Dentures) specifically for the "Wash Impression" technique.
   - Why: Records fine detail in soft tissues without displacing them (mucostatic).

5. **Endodontics (Root Canal Sealer)**
   - Use: Used to coat gutta-percha points during root canal obturation.
   - Why: Antimicrobial and provides a seal. (Note: It is resorbable if excess is pushed out of the apex).

6. **Periodontal Dressing (Perio-Pack)**
   - Use: Placed over gums after surgery (like a "cast" for gums).
   - Why: Protect the wound.
   - Note: Non-Eugenol versions are now preferred here to avoid the "Mucosal Irritation" (burning) you noted earlier.

➔ **Modifications for Strength (Reinforced ZOE)**
Standard ZOE is too weak for permanent use. To fix this, the chemistry is modified to create EBA-ZOE Cements.
- **The Additive:** Ortho-Ethoxybenzoic Acid (EBA).
- **Composition Change:**
  - Liquid: The liquid is modified to contain ~62.5% Ortho-Ethoxybenzoic Acid (EBA) and only ~37.5% Eugenol.
  - Powder: Alumina (Aluminum Oxide) or Quartz is often added to the powder for reinforcement.
- **The Result (Exam Gold):**
  - Strength: Drastically increases compressive strength (making it comparable to Zinc Phosphate).
  - Solubility: Reduces solubility so it does not wash out easily.
- **Clinical Use:** This modification allows ZOE to be used for the permanent cementation of crowns and bridges (whereas standard ZOE is only for temporary use).

Limits: low strength/modulus, thin layer = little thermal insulation; contraindicated under composite (interferes with resin setting).

### D) Glass Ionomer Cement (GIC) (separate topic in detail)

**Composition**
- Powder: fluoroaluminosilicate glass
- Liquid: aqueous polycarboxylic acid solution (Polyalkenoic Acid)

**Setting reaction (the real mechanism)**
- Slow acid–base reaction: acid attacks glass → releases ions → forms an amorphous network/matrix around unreacted particles; plus a chelating/ion-exchange effect gives bonding to enamel/dentin.
- Glass-ionomers are “acid-base cements”: weak polymeric acid + basic ion-leachable glass + water.

**Why GIC is loved (and why it’s annoying)**
- Fluoride release helps inhibit recurrent caries
- Bonds to tooth + works on slightly moist dentin
- Moisture sensitive while setting

**Types / uses**
- Type I: luting (cementation of indirect restorations / ortho)
- Type II: restorations near gingiva (Class V)
- Type III: liner / bonding agent

<u>Clinical pearl:</u> If remaining dentin thickness is > 1 mm, some references state no extra pulpal protection is required under GIC.

### E) Resin-Modified Glass Ionomer (RMGIC)

**Why it exists:** to overcome GIC water sensitivity and improve mechanical properties.

**Composition (slide version)**
- Powder: fluoroaluminosilicate
- Liquid: polycarboxylic acid modified with pendant methacrylate group + HEMA

**Setting reaction**
- Two reactions happening:
  1. classic GIC acid–base
  2. resin polymerization (light/chemical)

### F) Zinc Phosphate Cement (ZP)

**Status:** The traditional "Gold Standard" against which new cements are compared. It functions as both a Type I (Luting) and Type II (Base) cement.

**1. Composition**
- **Powder:**
  - Zinc Oxide (ZnO): (~90%) The principal ingredient.
  - Magnesium Oxide (MgO): (~10%) Added to reduce the sintering temperature and maintain the white color.
  - Sintering: The powder is heated (sintered) at high temperatures during manufacturing to reduce reactivity.
- **Liquid:**
  - Phosphoric Acid: (~45-64%) The main reactant.
  - Water: (~30-35%) Critical component. Essential for ionizing the acid. Evaporation or humidity changes can drastically alter setting time.
  - Buffers: Aluminum and Zinc salts are dissolved in the acid to slow the reaction for better working time.

**2. Setting Reaction**
- **Type:** Acid-Base Reaction (Crystallization).
- **Reaction:** The phosphoric acid attacks the surface of the Zinc Oxide particles: ZnO + 2H2PO₄ → Zn(H2PO₄)2 + H2O
- **Exothermic:** The reaction releases a significant amount of heat.
- **Final Structure:** A "Cored Structure" containing unreacted ZnO particles (core) bound by an amorphous Zinc Aluminophosphate gel (matrix). (similar structure as seen in amalgam composite and gic)

![Zinc Phosphate Structure](assets/cements/cements_img_3.png)

**3. Clinical Issues & Pulp Irritation (Exam Focus)**

This is the most critical biological drawback of Zinc Phosphate.

- **Acidity (The "Sting"):**
  - Initial pH: Extremely acidic (~2.0 to 3.5) upon mixing.
  - Neutralization: It rises slowly, taking 24 to 48 hours to reach a neutral pH (~6.9).
  - Effect: This prolonged acidity causes chemical irritation to the pulp, often leading to post-operative sensitivity.
- **Osmotic Pressure:** Fluid movement in dentinal tubules caused by the acid can trigger pain (Hydrodynamic Theory).
- **Dentin Thickness (The Safety Buffer):**
  - Thick Dentin (>1.5mm): The natural buffering capacity of the dentin usually neutralizes the acid before it reaches the pulp.
  - Deep Cavities: The acid will penetrate to the pulp.
  - **Solution:** You MUST use a varnish (e.g., Copalite) or a protective liner (Calcium Hydroxide) under Zinc Phosphate in deep cavities.

**4. Manipulation (The "Frozen Slab" Technique)**

To manage the Exothermic Reaction and Acidity:
- **Cool Glass Slab:** Mixing is performed on a cool glass slab to absorb the heat released by the reaction.
- **Incremental Mixing:** Small increments of powder are added to the liquid one by one to slow the reaction and dissipate heat.
- **Wide Spread:** The mix is spread over a large surface area of the slab to maximize cooling.

### G) Zinc Polycarboxylate (Zinc Polyacrylate)

**Composition (from your dental cements slides)**
- Powder: similar to zinc phosphate (ZnO main; stannous oxide replacing MgO; fillers; fluoride additives)
- Liquid: aqueous polyacrylic acid (copolymers; itaconic acid mentioned as stabilizer)

**Setting reaction**
- Acid–base → zinc polycarboxylate salt matrix.

**Key clinical point (big difference vs zinc phosphate):**
- It has adhesion to tooth + less irritation than ZP (slide emphasizes advantages vs ZP).

### H) Resin cements (resin-based luting) (already done in detail)

**What they’re made of (the “must-know” composition)**

Resin-based dental materials (including luting resins) generally have:
- Organic resin matrix (oligomers/monomers) +
- Filler particles +
- Silane coupling agent linking fillers to resin

**Common monomers you MUST know (because they show up everywhere):**
- Bis-GMA, plus non-BPA methacrylates like UDMA, TEGDMA, HEMA

**Setting reaction**
- Polymerization (light / chemical / dual).

Also: conversion is never 100% → some residual monomer can remain.

### I) Compomers (polyacid-modified composites)

- **Distinct feature:** they contain hydrophilic components, so after curing they absorb water, which triggers an acid–base reaction, giving GIC-like benefits such as fluoride release.
- That’s why slides often list them under “polymerization + acid–base.”

**For easier comparison sake:**
(with the common name)
- RMGIC: GIC modified by resin (hybrid ionomer).
- Compomer: composite modified by ionomer (polyacid-modified composite).

| Feature | RMGIC (GIC is Parent) | Compomer (Composite is Parent) |
|---|---|---|
| **Main Reaction** | Acid-Base + Light Cure | Light Cure Only (Initially) |
| **Water Content** | Contains Water | Anhydrous (Needs saliva to activate acid-base) |
| **Bonding** | Chemical Bond (Self-adhesive) | Micromechanical (Needs Bonding Agent) |
| **Fluoride** | High | Low |
| **Esthetics** | Good | Better (Closer to Composite) |
| **Strength** | Moderate | High (Closer to Composite) |

### J) Mineral Trioxide Aggregate (MTA)

The bioactive "miracle material" for root repair and pulp therapy.
**Composition:** 75% Portland Cement (Tricalcium Silicate) + 20% Bismuth Oxide (Radiopacifier) + Gypsum.

**1. Mechanism of Action**
- **Hydration Reaction:** Sets with water to form a Calcium Silicate Hydrate gel and Calcium Hydroxide.
- **Bioactivity:** High pH (~12.5) creates an antibacterial environment and stimulates the formation of Hydroxyapatite, creating a biological seal.

**2. Key Properties**
- **Hydrophilic:** Unique ability to set in the presence of moisture and blood (unlike resin or ZOE).
- **Sealing Ability:** Superior marginal seal; expands slightly upon setting.
- **Biocompatibility:** Non-cytotoxic; induces cementum and bone regrowth.
- **Drawback:** Very long setting time (3–4 hours) and difficult "sandy" handling.

**3. Clinical Indications**
- **Perforation Repair:** Sealing accidental root perforations.
- **Apexification:** Creating a barrier at the tip of an open root.
- **Vital Pulp Therapy:** Pulp capping and pulpotomies (especially in kids).
- **Apexogenesis:** To maintain the vitality of an injured pulp in an immature tooth so the root can finish growing (lengthening and thickening).
- **Retrograde Filling:** Root-end filling during apicoectomy surgery.

**4. Gray vs. White MTA**
- **Gray:** Original formula; contains Iron; causes tooth discoloration.
- **White:** Iron removed to prevent staining; preferred for esthetic zones.

## 5) Fast “what goes under what” rules (exam-friendly)

**Under composite / adhesive restorations**
- Avoid ZOE and varnish (both can interfere with resin bonding/setting).
- Safer options: RMGIC liner/base or properly sealed/compatible systems (depends on technique).

**Under amalgam**
- Varnish is classic for sealing margins; bases used if thermal/mechanical need.
- Base if dentin thin / need support during condensation.

| Clinical Scenario | Best Material | Why? |
|---|---|---|
| Veneers / Esthetics | Resin Cement | Invisible margins, strongest bond. |
| High Caries Risk | GIC / RM-GIC | Releases Fluoride. |
| Deep Cavity / Pain | CaOH (Spot) + GIC Base | Heals pulp + Seals tubules. |
| Temporary Crown | ZOE | Soothes pulp + Easy to remove later. |
| Metal Crown (Standard) | Zinc Phosphate or RM-GIC | Cost-effective + Proven retention. |
`,fm=["Liners = Thin barrier; Bases = Thick support + thermal protection.","RDT Rules: >2mm restore only, 0.5-1mm add Base, <0.5mm Liner + Base.","Calcium Hydroxide: High pH (~12.5), stimulates reparative dentin.","ZOE: Sedative (obtundent), don't use under composite (inhibits set).","Zinc Phosphate: Exothermic, acidic (irritant), mix on cool slab.","GIC: Fluoride release, chemical bond, moisture sensitive.","MTA: Biocompatible, hydrophilic, used for perforations/apexification."],co=[{id:"cem_mcq_1",question:"A “liner” is best defined as:",options:["A thick layer that mainly provides mechanical support","A thin barrier layer that protects dentin/pulp from chemical/electrical irritation and microleakage","A luting agent for indirect restorations","A material used only to insulate against heat when ≥0.75 mm thick"],correctAnswerIndex:1,explanation:"Liners are thin and mainly act as a barrier (chemical/electrical, some thermal), reducing diffusion and leakage."},{id:"cem_mcq_2",question:"A “base” is best defined as:",options:["A thin film that reduces microleakage only","A thick barrier + stress-support layer placed to replace dentin and support restorations","A resin bonding agent","A varnish film placed under composites"],correctAnswerIndex:1,explanation:"Bases are thicker , give thermal protection + mechanical support , and help when dentin is thin."},{id:"cem_mcq_3",question:"Thermal insulation is more realistically achieved when the protective layer thickness is approximately:",options:["0.1 mm","0.2 mm","0.75 mm","2.5 mm"],correctAnswerIndex:2,explanation:"True thermal protection typically needs ~0.75 mm , which is “base territory.”"},{id:"cem_mcq_4",question:"According to the RDT rule, when RDT is ≥2 mm, the best approach is:",options:["Liner + base + restoration","Base only","Restoration only (or routine bonding/sealing as indicated)","Direct pulp cap"],correctAnswerIndex:2,explanation:"With ≥2 mm dentin , the dentin itself buffers well; no extra pulpal protection is typically needed."},{id:"cem_mcq_5",question:"According to the RDT rule, when RDT is 1–2 mm, you should usually:",options:["Add a thick base","Seal/bond only","Spot liner + cover with base","Direct pulp cap"],correctAnswerIndex:1,explanation:"1–2 mm: seal/bond only (extra thickness may steal restorative bulk)."},{id:"cem_mcq_6",question:"According to the RDT rule, when RDT is 0.5–1 mm, you should:",options:["Add a base","Restoration only","Direct pulp cap immediately","Varnish only"],correctAnswerIndex:0,explanation:"0.5–1 mm: add BASE for protection/support."},{id:"cem_mcq_7",question:"According to the RDT rule, when RDT is <0.5 mm (very deep dentin but not exposed), you should:",options:["Restoration only","Spot liner + cover with base","Direct pulp cap only","Varnish under composite"],correctAnswerIndex:1,explanation:"<0.5 mm: spot liner (near deepest area) then cover with base ."},{id:"cem_mcq_8",question:"In a true pulp exposure, the correct immediate approach is:",options:["Varnish + amalgam","ZOE directly on exposure","Pulp cap (MTA/Ca(OH) ₂ ) + base, then restore","Zinc phosphate directly over pulp"],correctAnswerIndex:2,explanation:"Exposure needs pulp capping material first, then a protective base."},{id:"cem_mcq_9",question:"An ideal pulp-protective liner/base should NOT:",options:["Be biocompatible","Reduce dentin permeability","Discolor tooth/restoration","Withstand condensation forces"],correctAnswerIndex:2,explanation:"Discoloration is an undesirable property."},{id:"cem_mcq_10",question:"“Forms an impervious layer without stealing bulk from the restoration” is most relevant to:",options:["Minimizing microleakage while keeping restorative thickness adequate","Increasing polymerization shrinkage","Enhancing corrosion","Increasing thermal conductivity"],correctAnswerIndex:0,explanation:"You want a seal/barrier without reducing restorative bulk ."},{id:"cem_mcq_11",question:"“Withstand condensation forces without moving/deforming” is most critical when placing:",options:["Composite veneer","Amalgam restoration","Glass ionomer fissure sealant","Resin cemented veneer"],correctAnswerIndex:1,explanation:"Amalgam condensation can displace weak bases/liners."},{id:"cem_mcq_12",question:"A patient reports severe throbbing pain in a molar. You diagnose reversible pulpitis but cannot complete the root canal or final restoration today. You need a temporary sedative restoration. Which material is most appropriate?",options:["Resin-Modified Glass Ionomer (RMGIC)(IRM)","Composite Resin(IRM)","Zinc Phosphate (IRM)","Zinc Oxide Eugenol (IRM)"],correctAnswerIndex:3,explanation:"Zinc Oxide Eugenol (IRM) Why (exam points): ● IRM = reinforced ZOE, used as a temporary restoration (intermediate/temporary filling). ● Eugenol has an obtundent (sedative) effect on the pulp → reduces pain and sensitivity. ● Provides a decent short-term seal and is easy to place/remove for the next visit"},{id:"cem_mcq_13",question:"Which is an “oil-based” cement?",options:["Zinc phosphate","Zinc polycarboxylate","ZOE","Resin cement"],correctAnswerIndex:2,explanation:"ZOE is the classic oil-based system (eugenol)."},{id:"cem_mcq_14",question:"Which cement sets primarily by an acid–base reaction?",options:["Resin cement","Zinc phosphate","Composite resin","Adhesive resin"],correctAnswerIndex:1,explanation:"Zinc phosphate is a classic acid–base cement."},{id:"cem_mcq_15",question:"Which material class is correctly matched to “polymerization + acid–base”?",options:["Zinc phosphate","RMGIC","Resin cement","Varnish"],correctAnswerIndex:1,explanation:"RMGIC has acid–base + resin polymerization ."},{id:"cem_mcq_16",question:"Compomers are best categorized as:",options:["Pure acid–base cements","Pure polymerization materials with no acid–base component ever","Polymerization first, then water-triggered acid–base later","Oil-based chelation only"],correctAnswerIndex:2,explanation:"Compomers cure by polymerization , then absorb water → limited acid–base."},{id:"cem_mcq_17",question:"Cavity varnish is best described as:",options:["A thick insulating base","A resin/rosin film in solvent that leaves a thin coating after evaporation","A self-adhesive fluoride-releasing cement","A resin cement for veneers"],correctAnswerIndex:1,explanation:"Varnish = thin film left after solvent evaporates."},{id:"cem_mcq_18",question:"Varnish is CONTRAINDICATED under:",options:["Amalgam","Cast gold","Composite resin restoration","Non-bonded metallic restorations"],correctAnswerIndex:2,explanation:"Varnish can interfere with bonding/setting of resin systems."},{id:"cem_mcq_19",question:"Varnish is generally avoided under GIC mainly because it:",options:["Increases fluoride release","Blocks ion exchange and interferes with GIC’s bonding/fluoride benefits","Strengthens GIC by crosslinking","Increases working time dramatically"],correctAnswerIndex:1,explanation:"Varnish can isolate the tooth surface, reducing GIC’s key interactions."},{id:"cem_mcq_20",question:"The most important biological feature of calcium hydroxide is:",options:["Its alkaline environment promotes antimicrobial action and stimulates hard-tissue barrier formation","Its low initial acidity creates a mild etching effect and encourages dentin deposition","Its chemical adhesion to dentin provides a biological seal that triggers bridge formation","Its high mechanical strength protects the pulp by resisting condensation forces"],correctAnswerIndex:0,explanation:"The key biological advantage is the very high pH (strong alkalinity), which is bactericidal and induces reparative dentin (hard-tissue barrier) formation. ."},{id:"cem_mcq_21",question:"The classic setting Ca(OH) 2 liner (Dycal-type) sets mainly by:",options:["Free radical polymerization","Chelation between calcium hydroxide and salicylate ester forming calcium chelate salts","Acid attack of glass releasing fluoride","Crystallization of zinc phosphate"],correctAnswerIndex:1,explanation:"Dycal-type systems set via chelation (salicylate chemistry)."},{id:"cem_mcq_22",question:"Which is TRUE about non-setting aqueous Ca(OH) 2 paste?",options:["High strength and supports amalgam condensation","Does not set and is weak → can be displaced","Bonds strongly to dentin chemically","Completely insoluble in oral fluids"],correctAnswerIndex:1,explanation:"Non-setting paste is weak and easily displaced."},{id:"cem_mcq_23",question:"Best clinical use of Ca(OH) 2 in a very deep cavity without exposure is:",options:["Thick base covering entire floor","Spot liner only at deepest area, then cover with a stronger base","Avoid any liner/base","Use Zn phosphate directly on dentin"],correctAnswerIndex:1,explanation:"Ca(OH) 2 is best as a spot liner , then cover with a stronger base."}],uo=[{id:"cem_mcq_24",question:"A key endodontic use of Ca(OH) 2 is:",options:["Inhibiting resin polymerization","Intracanal medicament between visits","Permanent luting of crowns","Increasing early strength of zinc phosphate"],correctAnswerIndex:1,explanation:"Ca(OH) 2 is a classic intracanal medicament ."},{id:"cem_mcq_25",question:"ZOE sets primarily by:",options:["Free radical polymerization","Chelation forming zinc eugenolate","Glass dissolution and polysalt matrix formation","Phosphate crystallization"],correctAnswerIndex:1,explanation:"Water helps (also accelerate )form Zn(OH) 2 , then chelation → zinc eugenolate ."},{id:"cem_mcq_26",question:"The major clinical “signature” of ZOE is:",options:["Strong adhesion to enamel","Obtundent/sedative effect on pulp","Highest compressive strength of all cements","Excellent long-term solubility resistance"],correctAnswerIndex:1,explanation:"Eugenol has a sedative effect on pulp."},{id:"cem_mcq_27",question:"ZOE is CONTRAINDICATED under resin composite primarily because:",options:["It increases polymerization shrinkage","Eugenol inhibits resin polymerization","It bonds too strongly to dentin","It releases excessive fluoride"],correctAnswerIndex:1,explanation:"Eugenol can inhibit resin setting ."},{id:"cem_mcq_28",question:"Which clinical use is most appropriate for standard ZOE?",options:["Permanent cementation of zirconia crowns","Temporary cementation of provisional crowns","Bonding ceramic veneers","Luting indirect composite inlays permanently"],correctAnswerIndex:1,explanation:"Standard ZOE is great for temporary cementation (easy removal, soothing)."},{id:"cem_mcq_29",question:"Reinforced ZOE (EBA-modified) compared with standard ZOE generally has:",options:["Lower strength and higher solubility","Higher strength and lower solubility","No chelation reaction","No clinical use in luting"],correctAnswerIndex:1,explanation:"EBA reinforcement improves strength and decreases washout."},{id:"cem_mcq_30",question:"Which statement is TRUE (exam “biological paradox”) about eugenol?",options:["Sedative to mucosa, irritant to pulp","Irritant to mucosa, sedative to pulp","Sedative to both","Irritant to both only"],correctAnswerIndex:1,explanation:"Eugenol can soothe pulp but irritate mucosa ."},{id:"cem_mcq_31",question:"Classic GIC powder is mainly:",options:["Zinc oxide + magnesium oxide","Fluoroaluminosilicate glass","Calcium hydroxide crystals","Quartz + rosin"],correctAnswerIndex:1,explanation:"GIC powder = fluoroaluminosilicate glass ."},{id:"cem_mcq_32",question:"Classic GIC liquid is mainly:",options:["Phosphoric acid","Aqueous polyalkenoic acid","Eugenol","UDMA + TEGDMA"],correctAnswerIndex:1,explanation:"Liquid = aqueous polycarboxylic acid solution."},{id:"cem_mcq_33",question:"The setting reaction of GIC is best described as:",options:["Polymerization only","Acid–base","Chelation only without ion release","Oil-based saponification"],correctAnswerIndex:1,explanation:"Classic acid–base with an ion-release polysalt matrix."},{id:"cem_mcq_34",question:"A major advantage of GIC is:",options:["No moisture sensitivity","Fluoride release + chemical bonding to enamel/dentin","Highest fracture toughness among cements","Complete polymerization with zero residual monomer"],correctAnswerIndex:1,explanation:"GIC bonds chemically and releases fluoride ."},{id:"cem_mcq_35",question:"A major early drawback of GIC is:",options:["Sets by polymerization only","Moisture sensitivity during initial setting","Requires etch-and-rinse adhesive always","Always inhibits resin polymerization"],correctAnswerIndex:1,explanation:"Early GIC is moisture sensitive .(both contamination and dehydration are harmful"},{id:"cem_mcq_36",question:"Correct match of GIC type to use:",options:["Type I = restoration; Type II = luting; Type III = impression","Type I = luting; Type II = restorative; Type III = liner/base","Type I = endodontic sealer; Type II = varnish; Type III = composite","Type I = temporary; Type II = permanent; Type III = none"],correctAnswerIndex:1,explanation:"Type I luting , Type II restorative , Type III liner/base ."},{id:"cem_mcq_37",question:"RMGIC exists primarily to:",options:["Remove fluoride release","Reduce GIC water sensitivity and improve handling","Eliminate acid–base reaction completely","Make eugenol compatible with composite"],correctAnswerIndex:1,explanation:"RMGIC improves water tolerance and properties.improve handling/strength"},{id:"cem_mcq_38",question:"RMGIC sets by:",options:["Acid–base only","Polymerization only","Acid–base + resin polymerization (dual chemistry)","Chelation only"],correctAnswerIndex:2,explanation:"RMGIC has two reactions : GIC + resin cure."},{id:"cem_mcq_39",question:"A common resin component associated with many RMGICs is:",options:["Eugenol","HEMA (plus methacrylate-modified polyacid)","Pure phosphoric acid","Rosin solvent varnish"],correctAnswerIndex:1,explanation:"RMGIC commonly includes HEMA and methacrylate-modified polyacids."},{id:"cem_mcq_40",question:"Zinc phosphate liquid is mainly:",options:["Eugenol with oils","Phosphoric acid + water","Polyacrylic acid only","UDMA/TEGDMA blend"],correctAnswerIndex:1,explanation:"Liquid = phosphoric acid + water , often with Al/Zn salts as buffers."},{id:"cem_mcq_41",question:"Zinc phosphate cement is initially very acidic. Approximately how long does it take to reach a near-neutral pH?",options:["5–10 minutes","30–60 minutes","24–48 hours","7 days "],correctAnswerIndex:2,explanation:"24–48 hours Why: Zinc phosphate starts at a very low pH (about 2–3.5) and neutralizes slowly, typically taking 1–2 days to approach near-neutral pH, which is why it can cause early pulpal irritation in deep cavities."},{id:"cem_mcq_42",question:". A dental assistant mixes Zinc Phosphate cement on a cool glass slab and uses a wide mixing area. What is the primary purpose of this specific manipulation technique?",options:["To increase the acidity for better etching.","To prevent the evaporation of eugenol.","To dissipate the heat from the exothermic reaction.","To increase the setting speed of the cement. "],correctAnswerIndex:2,explanation:"T o dissipate the heat from the exothermic reaction Why (exam points): ● Th e setting reaction of zinc phosphate is strongly exothermic (releases heat). ● Using a cool slab + wide area helps absorb and spread out heat, which: ○ slows the reaction, giving longer working time ○ reduces rapid thickening and improves handling"},{id:"cem_mcq_43",question:"In deep cavities, zinc phosphate should be placed:",options:["Directly on near-pulp dentin with no protection","Over a protective liner/varnish/base","Only under composites","Only under GIC"],correctAnswerIndex:1,explanation:"Deep dentin needs protection from its acidity."},{id:"cem_mcq_44",question:". An elderly patient with high caries risk presents with multiple Class V (cervical/root surface) lesions. Moisture control is moderately difficult. Which restorative material is best suited for this scenario?",options:["Composite Resin","Zinc Polycarboxylate","Glass Ionomer Cement (GIC)","Resin-Modified Glass Ionomer Cement (RMGIC) "],correctAnswerIndex:3,explanation:"Resin-Modified Glass Ionomer Cement (RMGIC) Why (key points): ● Better moisture tolerance than composite (composite is very moisture-sensitive for bonding). ● Fluoride release → ideal for high caries risk + root caries prevention. ● Chemical adhesion to enamel/dentin (no purely micromechanical bond dependence). ● Improved strength/handling vs conventional GIC + less early washout risk."},{id:"cem_mcq_45",question:"Patient has a hypersensitive tooth requiring a crown. You want a luting cement that chemically bonds to tooth structure and is also less irritating to the pulp. Which material best fits this description?",options:["Zinc Phosphate","ZOE (Standard)","Zinc Polycarboxylate","Resin Cement "],correctAnswerIndex:2,explanation:"Zinc Polycarboxylate Why: It chemically adheres to enamel/dentin via carboxyl groups chelating Ca² ⁺ , and it is less pulpal irritating than zinc phosphate (large polyacid molecules penetrate tubules less; higher/less aggressive acidity)."},{id:"cem_mcq_46",question:"Resin cements primarily set by:",options:["Acid–base only","Polymerization (light/chemical/dual cure)","Chelation only","Crystallization only"],correctAnswerIndex:1,explanation:"Resin cements = polymerization ."}],mo=[{id:"cem_mcq_47",question:"You are restoring a tooth with a deep amalgam restoration. You decide to use Zinc Phosphate as a base to provide thermal insulation. What critical step must be done before placing Zinc Phosphate?",options:["Etch the dentin with 37% phosphoric acid.","Dry the dentin completely until it is desiccated.","Place a varnish or liner to seal the dentinal tubules.","Mix the cement on a warm slab to speed up the set. "],correctAnswerIndex:2,explanation:"Place a varnish or liner to seal the dentinal tubules. Reason (high-yield): ● Zinc phosphate starts very acidic (low pH) and can irritate the pulp, especially in deep cavities. ● A varnish/liner seals dentinal tubules → reduces acid penetration + post-op sensitivity."},{id:"cem_mcq_48",question:"You are preparing a deep Class I cavity for a composite restoration. After excavation, the Remaining Dentin Thickness (RDT) is estimated to be 0.4 mm. There is no pulp exposure. According to the RDT-based pulp protection rules, which protocol is most appropriate?",options:["Place a spot liner of calcium hydroxide at the deepest point, cover with a GIC/RMGIC base, then proceed with bonding and composite.","Apply cavity varnish and restore directly cover with a GIC/RMGIC base, then proceed with bonding and composite.","Place a ZOE liner over the entire pulpal floor, then cover with a GIC/RMGIC base, then proceed with bonding and composite.","Place a thick zinc phosphate base directly on dentin, cover with a GIC/RMGIC base, then proceed with bonding and composite. "],correctAnswerIndex:0,explanation:"● RDT < 0.5 mm (0.4 mm here) = very deep dentin → you protect the pulp with a spot Ca(OH) 2 liner (only at the deepest area), then cover it with a base (GIC/RMGIC) for sealing/support, then restore."},{id:"cem_mcq_49",question:"A patient presents with a fractured incisor requiring an all-ceramic (lithium disilicate) veneer. You need a cement that offers the highest esthetics, translucency, and bond strength. Which material is most indicated?",options:["Zinc Phosphate Cement","Resin Cement","Zinc Polycarboxylate Cement","Resin-Modified Glass Ionomer (RMGIC) "],correctAnswerIndex:1,explanation:"Resin Cement Why (exam logic): ● Veneers (esp. lithium disilicate) depend on strong adhesive bonding + shade control/translucency → resin cement (usually light-cure for thin veneers) gives the best esthetics and highest bond strength."},{id:"cem_mcq_50",question:"Which comparison is MOST accurate?",options:["RMGIC is anhydrous; compomer contains water","RMGIC has chemical tooth bonding; compomer usually requires a bonding agent","Compomer releases more fluoride than RMGIC","RMGIC sets by polymerization only"],correctAnswerIndex:1,explanation:"RMGIC has chemical adhesion + dual set; compomer is mainly resin-based and needs bonding agent ."},{id:"cem_mcq_51",question:"Best material to AVOID directly under a composite restoration is:",options:["RMGIC liner (as indicated)","Calcium hydroxide (spot) covered by base","ZOE","Resin-compatible liner/base"],correctAnswerIndex:2,explanation:"Eugenol inhibits resin polymerization ."},{id:"cem_mcq_52",question:"A classic “sedative temporary restoration” material is:",options:["Zinc phosphate","ZOE/IRM","Pure GIC Type I","Resin cement"],correctAnswerIndex:1,explanation:"ZOE/IRM is widely used for temporary/sedative effects."},{id:"cem_mcq_53",question:"In a deep cavity with symptoms, a common protective sequence is:",options:["Zinc phosphate directly on pulp-side dentin","Spot Ca(OH) ₂ → cover with base (often GIC/RMGIC) → restore","Varnish only → restore composite","Compomer only with no adhesive"],correctAnswerIndex:1,explanation:"Ca(OH) 2 for biologic protection , then a stronger base for seal/support . ADVANCE MCQ"},{id:"cem_mcq_54",question:"What is the primary role of White Rosin in Zinc Oxide Eugenol (ZOE) powder?",options:["To increase the pH.","To accelerate the setting reaction.","To increase the antibacterial properties.","To reduce brittleness and improve film thickness. "],correctAnswerIndex:3,explanation:"White rosin mainly reduces brittleness and improves handling/film characteristics."},{id:"cem_mcq_55",question:"Regarding the Hydrodynamic Theory of Pain, how does a varnish reduce sensitivity under an amalgam restoration?",options:["It releases ions that hyperpolarize the nerve.","It provides significant thermal insulation.","It promotes the formation of reparative dentin.","It seals the dentinal tubules, preventing fluid movement. "],correctAnswerIndex:3,explanation:"Varnish seals dentinal tubules , reducing fluid movement → less sensitivity."},{id:"cem_mcq_56",question:"Which scenario presents the highest risk of post-operative sensitivity when using Zinc Phosphate?",options:["Cementing a crown on a vital tooth with 0.5 mm RDT and no varnish .","Cementing a crown on a tooth with a previous root canal.","Cementing a crown on a vital tooth with 2.0 mm RDT .","Cementing an orthodontic band on enamel. "],correctAnswerIndex:0,explanation:"Thin dentin ( low RDT ) + no tubule seal + zinc phosphate’s initial acidity = highest sensitivity risk."},{id:"cem_mcq_57",question:"Which component of zinc phosphate cement liquid is most responsible for controlling the reaction rate ?",options:["Eugenol","Free phosphoric acid","Dissolved aluminum and zinc salts (buffers)","Distilled water "],correctAnswerIndex:2,explanation:"Dissolved aluminum and zinc salts (buffers) Why (exam logic): ● Al³ ⁺ and Zn² ⁺ salts act as buffers in the liquid. ● They partially neutralize phosphoric acid , moderating the acid–base reaction , which slows the set and provides a usable working time . ● Free phosphoric acid drives the reaction (too fast/acidic by itself). ● Water is essential but does not control the rate. ● Eugenol is unrelated (ZOE cement, not zinc phosphate)."},{id:"cem_mcq_58",question:"Why is Calcium Hydroxide specifically used for Apexification in non-vital immature teeth?",options:["It provides significant structural reinforcement to the thin root walls.","It creates a hermetic chemical bond to the dentin walls.","Its low pH stimulates osteoclasts to remodel bone.","Its high alkalinity causes superficial necrosis, inducing calcified barrier formation. "],correctAnswerIndex:3,explanation:"Reason: Ca(OH) 2 has a very high pH (~11–12.5) → creates a superficial zone of coagulation necrosis at the apex and is antibacterial . This environment stimulates adjacent tissues to lay down a hard-tissue apical barrier (calcified barrier such as cementum/osteodentin), which is the goal of apexification ."},{id:"cem_mcq_59",question:"A student leaves the bottle of Zinc Phosphate liquid uncapped overnight. Next day, they use it to mix cement. How will the handling properties be affected?",options:["The setting time will be significantly delayed (slower set).","The acidity will decrease, making it less irritating.","The compressive strength will increase.","The setting time will be accelerated (flash set). "],correctAnswerIndex:3,explanation:"The setting time will be accelerated (flash set). Why: Zinc phosphate liquid contains phosphoric acid + water . If left uncapped, water evaporates , making the liquid more concentrated and more reactive -> shorter working time and faster/flash set (often with a thicker, harder-to-handle mix)."},{id:"cem_mcq_62",question:"A dentist notices the zinc phosphate liquid in the bottle has turned cloudy. What is the most likely cause, and what clinical effect will it have?",options:["The phosphoric acid has oxidized; the cement will be weaker.","Water has been absorbed from humidity; the cement will set too fast.","The buffer salts have precipitated; the cement will be too acidic.","Water has evaporated , causing crystallization/precipitation ; the cement will set too slowly . "],correctAnswerIndex:3,explanation:"Cloudiness usually means water loss → crystallization ; less water = poorer ionization → slower reaction/longer setting time ."},{id:"cem_mcq_63",question:"What is the clinical consequence of over-drying (desiccating) dentin before placing a resin cement?",options:["It increases the bond strength by removing water.","It collapses the collagen network, preventing resin infiltration.","It causes the pulp to calcify immediately.","It accelerates the setting of the resin. "],correctAnswerIndex:1,explanation:"Over-drying collapses the demineralized collagen mesh, so the resin/primer can’t infiltrate properly → weak hybrid layer, lower bond strength, more microleakage/post-op sensitivity."},{id:"cem_mcq_64",question:"When cementing with Zinc Phosphate, retention is primarily achieved via:",options:["Covalent bonding to collagen.","Macromechanical interlocks and casting geometry.","Chelation to calcium ions.","Formation of a hybrid layer. "],correctAnswerIndex:1,explanation:"Zinc phosphate does not chemically bond to tooth structure. Retention is mainly mechanical : friction + cement interlocking into surface irregularities , and it depends heavily on prep/casting geometry (taper, height, surface area)."},{id:"cem_mcq_65",question:"Zinc polycarboxylate cement adheres chemically to tooth structure via chelation to calcium . Which of the following restorative materials will it also chemically bond to ?",options:["Gutta-percha","Feldspathic porcelain","Stainless steel","Cast gold alloy "],correctAnswerIndex:2,explanation:"Stainless steel Why (high-yield): ● Zinc polycarboxylate can chelate metal oxides . ● Stainless steel has a stable oxide layer , allowing chemical interaction. ● Gold alloys are noble → minimal oxide → no chemical bond . ● Porcelain needs silane coupling , not polycarboxylate chelation. ● Gutta-percha is inert and does not chemically bond."},{id:"cem_mcq_66",question:"What is the primary function of a Silane Coupling Agent when repairing a fractured porcelain crown with composite resin ?",options:["To neutralize the acidity of hydrofluoric acid","To opacify the metal substructure","To etch the porcelain surface","To link the inorganic silica of the porcelain to the organic resin matrix "],correctAnswerIndex:3,explanation:"Why (high-yield): ● Silane is bifunctional : ○ One end bonds to silica (glass phase) of porcelain ○ The other end copolymerizes with methacrylate resin ● This creates a chemical bridge between ceramic and composite, greatly improving bond strength."},{id:"cem_mcq_67",question:"You remove a temporary crown cemented with ZOE . Before cementing the final crown with a resin cement , why must the preparation be vigorously cleaned with pumice or alcohol?",options:["ZOE lowers the pH of the dentin, neutralizing the adhesive.","Residual eugenol penetrates dentin and inhibits resin polymerization.","ZOE leaves a smear layer that is impervious to acid etch.","ZOE reacts with the silane coupling agent. "],correctAnswerIndex:1,explanation:"Why (high-yield): ● Eugenol is a free-radical scavenger , which inhibits resin polymerization . ● Residual eugenol can remain in dentin after temporary cement removal. ● Pumice/alcohol cleaning reduces eugenol contamination, allowing proper bonding and curing of resin"},{id:"cem_mcq_68",question:"Why are light-cure–only resin cements contraindicated for cementing metal PFM crowns?",options:["The heat of the curing light expands the metal excessively.","Light cannot penetrate the metal substructure to cure the cement.","They do not bond to metal.","The metal chemically inhibits the photoinitiator. "],correctAnswerIndex:1,explanation:"Why (exam logic): ● Metal blocks light completely. ● A light-cure–only resin cement placed under a metal coping will not polymerize , remaining uncured → failure."},{id:"cem_mcq_69",question:"What is the definition of Film Thickness for a Type I Luting Cement according to ISO standards?",options:["Maximum 25 microns","Maximum 5 microns","Minimum 50 microns","Maximum 100 microns "],correctAnswerIndex:0,explanation:"Maximum 25 microns Why (high-yield): ISO standards require luting cements to flow into a film ≤ 25 µm so that indirect restorations (crowns, inlays) seat fully without occlusal discrepancy or marginal opening."},{id:"cem_mcq_70",question:"Why is sandblasting (air abrasion) with alumina recommended before bonding to base metals or zirconia?",options:["To remove the oxide layer completely.","To increase surface energy and create micromechanical retention.","To implant silica particles for silanation.","To soften the metal for better adaptation. "],correctAnswerIndex:1,explanation:"Why (exam logic): ● Air abrasion cleans and roughens the surface, increasing surface energy and surface area , which improves micromechanical interlocking with resin cements. ● For zirconia , sandblasting is crucial to activate the surface so MDP-containing primers/cements can bond effectively."},{id:"cem_mcq_71",question:"What is the main advantage of bioceramic sealers in endodontics compared to ZOE-based sealers?",options:["They are hydrophilic, expand slightly on setting, and form hydroxyapatite.","They contain eugenol for sedation.","They shrink to ensure a tight fit.","They are easier to remove for retreatment. "],correctAnswerIndex:0,explanation:"Why (high-yield): ● Bioceramic sealers (calcium silicate–based) are hydrophilic , use moisture in the canal to set, and show slight expansion , improving the seal. ● They are bioactive , forming hydroxyapatite at the sealer–dentin interface, which enhances sealing and biocompatibility. ● ZOE sealers lack bioactivity and do not chemically integrate with dentin."}],ym=[...co,...uo,...mo],wm=`
## 1) Core definitions (high-yield)

- ● **Amalgam**: an alloy that contains **mercury** (**Ag–Sn (silver–tin) + mercury**).

- ● **Amalgamation**: mixing **liquid mercury** with **one/more metals/alloys** → forms **amalgam**. (the **chemical reaction**)

- ● **Trituration**: **mechanical mixing** of alloy powder + mercury in a **triturator (amalgamator)**. (the actual **physical mixing** of liquid and solid)

- ● **Creep**: **time-dependent deformation under stress** → margins can **flow/protrude** → **marginal breakdown**.

- ● **Delayed expansion (Zn-containing amalgam)**: **weeks–months** expansion due to **H₂ gas** when **moisture contaminates** the mix.

- ● **Marginal breakdown**: gradual **fracture/ditching** at margin → **gaps** between amalgam and tooth.

---

## 2) Amalgam Alloy Powders (what forms exist?)

- ● Alloy powder forms (because reaction occurs at the **interface**):

  - ▫️ **Lathe-cut (irregular particles)**: cut from an ingot; rougher; **more surface area**

  - ▫️ **Spherical (atomized droplets)**: smooth spheres; **less surface area**

  - ▫️ **Admix**: mixture of **lathe-cut Ag–Sn + spherical Ag–Cu**

- ● Why does particle form matter clinically?

  - ▫️ More surface area (**lathe-cut**, smaller particles) → needs more **Hg** to wet surfaces → faster reaction/hardening but risk **higher Hg content** if not condensed well.

  - ▫️ Less surface area (**spherical**) → needs less **Hg** → often better final properties if handled right, but mix is very plastic.

![Forms of Amalgam Alloy Powders + Copper Classification + Alloy Components](assets/amalgam/amalgam_img_0.png)

---

## 3) Copper Classification (critical)

### A) Low-copper (conventional) alloys

- ● Traditionally: **Ag** and **Sn** dominate, **Cu** is low (**~1–6%**)

- ● Problem: forms **γ₂ phase (Sn–Hg)**, which is **weak + corrodes easily**

- ● Typical phases include:

  - ▫️ **γ (Ag₃Sn)** = unreacted alloy core

  - ▫️ **γ₁ (Ag₂Hg₃)** = main matrix

  - ▫️ **γ₂ (Sn₇–₈Hg)** = weak/corrosion-prone phase (undesirable)

### B) High-copper alloys

- ● **Cu > ~6%** (often **12–30%**)

- ● Main goal: eliminate **γ₂**

- ● Two types:

  - ▫️ **High-copper admix (dispersed phase)**:

    - ○ lathe-cut **Ag₃Sn + spherical Ag–Cu eutectic**

  - ▫️ **High-copper single-composition (often spherical)**:

    - ○ each particle already contains **Ag–Sn–Cu phases**

- ●

### C) By zinc

- ● **Zn-containing** vs **Zn-free**

### D) By number of alloy components

- ● **Binary / Ternary / Quaternary**

- ● Explanation of why we need these different types are given further we go into the topic

---

## 3) Indications & contraindications

### Indications

- ● Moderate/large posterior cavities

- ● When isolation is difficult

- ● Stress-bearing areas / where longevity matters

### Contraindications

- ● High esthetic demand

- ● Very small conservative lesions (composite preferred)

- ● Known mercury allergy / hypersensitivity suspicion

---

## 4) Advantages vs disadvantages

### Advantages

- ● Good longevity, strong in compression

- ● Less technique sensitive than composite (especially moisture-tolerant overall)

- ● Self-sealing over time (via corrosion products)

### Disadvantages

- ● Not esthetic

- ● No chemical adhesion to tooth (needs mechanical retention / bonding systems if used)

- ● Mercury concerns + environmental issues

---

## 5) Composition and what each element does

- ● Typical components: **Ag, Sn, Cu ± Zn ± Pd/In**.

- ● Roles (classic exam lines)

  - ▫️ **Silver (Ag)**: ↑ strength, ↑ expansion, ↑ corrosion resistance

  - ▫️ **Tin (Sn)**: ↓ strength, ↑ creep, ↑ corrosion (but helps workability)

  - ▫️ **Copper (Cu)**: (big one) eliminates **γ₂**, ↑ strength, ↓ creep, ↑ corrosion resistance

  - ▫️ **Zinc (Zn)**: deoxidizer (oxygen scavenger) → better handling/plasticity; BUT moisture contamination → delayed expansion

  - ▫️ **Indium / Palladium**: handling/performance modifiers in some systems

---

## 6) Alloy powder types (how they’re made) + clinical behavior

- ● Lathe-cut: ingot is cut/milled → irregular particles; tends to resist condensation more → needs higher pressure.

- ● Spherical: atomized molten alloy droplets → spheres; more plastic, needs less Hg, but harder to build tight proximal contour (Class II overhang risk).

---

## 7) “Critical concept”: how powder becomes the final set structure

- ● Big Idea: How does amalgam set?

- ● What happens right after mixing alloy powder with mercury?

- ● When you triturate:

  - ▫️ **1. Surface dissolution**: The outer layer of each alloy particle dissolves into Hg.

  - ▫️ **2. Hg diffusion inward**: Hg diffuses into the alloy particle at the same time.

  - ▫️ **3. Supersaturation → precipitation**: Once Hg is “too full” of dissolved metals, new Hg-containing crystals precipitate in the Hg.

  - ▫️ **4. Plastic → hard**: At first, Hg is still present as liquid → mass is plastic (packable). As precipitates form, free Hg decreases → mass hardens (sets).

  - ▫️ **5. Unreacted cores remain**: Because Hg is not enough to dissolve all particles, the set amalgam ends up as a composite:

    - ○ Unreacted alloy cores = strong “filler”

    - ○ Reaction products = matrix that binds everything

- ● **Key exam line**: Set amalgam = **unreacted alloy particles embedded in a mercury-containing matrix**.

![How Amalgam Sets (flow diagram)](assets/amalgam/amalgam_img_1.png)

- ● (That’s why set amalgam is basically a composite: unreacted particles embedded in a reacted matrix.)

- ● Lets use an analogy glue and rocks

- ● Basically, mercury attacks the surface of the **Ag–Sn (Ag₃Sn)** alloy particles, dissolving silver and tin from the outer layer. These dissolved metals then react with mercury and precipitate as new mercury-containing phases—mainly **Ag₂Hg₃ (γ₁)** and, in low-copper alloys, **Sn₇–₈Hg (γ₂)**.

- ● The **Ag₂Hg₃ (γ₁)** phase forms the main matrix (“good glue”), binding the remaining unreacted **Ag–Sn cores (“rocks”)** together to create the final set amalgam structure.

- ● The **Sn₇–₈Hg (γ₂)** phase is the “bad glue” because it is weak and corrodes easily, so it worsens marginal breakdown over time.

- ● That’s why we add copper: copper pulls tin away from the Sn–Hg route and forms **Cu₆Sn₅ (η′)** instead, so **γ₂** is prevented or eliminated (explained in copper segment).

- ● If u can understand this u can easily understand composite and cements as well as they are the exact same process just different liquids and different rocks (actual rocks lol or u can say glass/silica)

![Oxide Film Disruption → Hg Dissolves Surface → Reaction Products Form](assets/amalgam/amalgam_img_3.png)

---

## Amalgamation reaction + phases (this is the “must know”)

- ● **Amalgamation**: mixing liquid mercury with one/more metals/alloys → forms amalgam.

- ● **Trituration**: mechanical mixing of alloy powder + mercury in a triturator (amalgamator).

- ● **Amalgamation reaction + phases (this is the “must know”)**

### Key phase names

- ● **γ (gamma)**: unreacted alloy core **Ag₃Sn**

- ● **γ₁**: matrix **Ag₂Hg₃** (main binder)

- ● **γ₂**: weak/corrosion-prone **Sn₇–₈Hg** (the “bad” phase)

- ● **η′ (eta prime)**: **Cu₆Sn₅** (good corrosion-resistant Cu–Sn product)

![Set Amalgam: A Composite Matrix](assets/amalgam/amalgam_img_2.png)

---

## Phase Table (as in your notes)

| Phase Name | Symbol | Formula | Role in the "Rocks and Glue" | Key Properties |
|---|---|---|---|---|
| **Gamma** | **γ** | **Ag₃Sn** | The "Rocks" (Unreacted Core) | The main component of the strong alloy particle. **strongest phase** |
| **Epsilon** | **ε** | **Cu₃Sn** | The "Copper Source" (Inside the Rocks) | Found within the alloy particles; it helps supply the copper needed to kill the weak phase. |
| **Gamma 1** | **γ₁** | **Ag₂Hg₃** | The "Main Glue" (Matrix) | The primary binder that holds the structure together. |
| **Gamma 2** | **γ₂** | **Sn₇–₈Hg** | The "Weak Glue" (Low-Copper Only) | The weakest phase; unstable, prone to corrosion and creep. |
| **Eta Prime** | **η′** | **Cu₆Sn₅** | The "Reinforcement" (High-Copper Only) | The reaction product formed when Tin reacts with Copper. |

---

## Low-copper (conventional) setting reaction

- ● **Ag₃Sn + Hg → γ₁ (Ag₂Hg₃) + γ₂ (Sn₇–₈Hg) + unreacted γ**

- ● Final microstructure: unreacted **γ cores** embedded in **γ₁ + γ₂ matrix**.

- ● **γ₂** is weakest + corrodes most → drives marginal breakdown over time. (we don't want this)

- ● So WHY WE NEED COPPER is to remove the gamma 2 phase; how ? explained below

---

## High-copper: WHY γ₂ is prevented/eliminated (critical question)

- ● Explained in detail in their respective headings

- ● Normally it is a reaction between silver-tin and mercury but to reduce gamma 2 phase we add copper in 2 ways:

  - ▫️ one is adding as a separate compound which is silver-copper compound **Ag–Cu**

  - ▫️ And 2nd is we add it in the silver tin compound as silver-tin-copper called the **Cu₃Sn (Epsilon ε)**

- ● Explained in detail in their respective headings

![“Why we need copper” slide / set amalgam matrix emphasis](assets/amalgam/amalgam_img_4.png)

---

## The Chemical "Preference" Mechanism

- ● The elimination of the weak Gamma 2 (**γ₂**) phase happens because of a chemical competition for Tin (**Sn**).

- ● The Conflict: Tin can react with either Mercury (**Hg**) or Copper (**Cu**).

- ● The Preference: Tin has a much higher chemical affinity for Copper than it does for Mercury.

- ● The Result: Tin is "pulled away" from the mercury to form the strong Eta-prime phase (**Cu₆Sn₅**).

- ● Conclusion: Because the tin is busy reacting with copper, it is unavailable to react with mercury. This effectively blocks the formation of the weak Gamma 2 "bad glue."

- ● This can occur in a single phase reaction or a two phase reaction as discussed below

---

## High-copper types

### A) Admixed high-copper (lathe-cut Ag–Sn + spherical Ag–Cu)

- ● Here 2 compounds are mixed therefore its called admixed

- ● silver-tin and silver-copper

- ● Early: **γ₁ + some γ₂** form

- ● Then tin diffuses to Ag–Cu particles → **η′** forms at their surface

- ● Secondary reaction consumes **γ₂** → **η′** (so **γ₂** ends up minimal/absent)

- ● In this the Sn–Hg is formed and then tin leaves mercury and goes with copper so its a 2 phase reaction

- ● “In admixed high-copper amalgam, γ₂ may form early, but a secondary Cu–Sn reaction converts it into η′, so γ₂ is eliminated.”

- ● Phase 1:

  - ▫️ Reaction: **Ag₃Sn + Hg → Gamma 1 (Ag₂Hg₃) + Gamma 2 (Sn₇–₈Hg)**

- ● Phase 2:

  - ▫️ Reaction: **Gamma 2 + Ag–Cu → Eta-prime (Cu₆Sn₅) η′ + Gamma 1**

- ● The Eta phase surrounds the unreacted core making it more resistant to further mercury attacks

- ● **η′** forms a protective Cu–Sn reaction layer around unreacted cores, reducing **γ₂** formation and improving corrosion/creep resistance.

![The Admixed Reaction: A Two-Step Process](assets/amalgam/amalgam_img_5.png)

### B) Single-composition high-copper (often spherical)

- ● No Sn–Hg is formed a single reaction

- ● Forms **γ₁ + η′**, with little/no **γ₂** → excellent creep + corrosion resistance

- ● Benefit vs risk vs admix: better early strength/low creep, but very plastic → contour control issues (proximal overhang/contacts) unless technique is good.

- ●

- ● Extended explanation

### Key Idea

- ● In single-composition high-copper alloys, every single particle contains the copper needed to kill the weak phase.

- ● This copper is stored in the Epsilon phase (**ε**) which is chemically **Cu₃Sn**.

- ● The chemistry is set up so tin reacts with this copper to form Eta-prime (**η′**) instead of forming **Sn–Hg**

- ● We basically add the copper in the silver -tin alloy instead of being a separate compound .

### Single-Composition High-Copper Alloys have NO Weak Phase:

- ● The Setup: In these alloys, the Copper is not a separate ingredient. It is melted directly into the Silver-Tin particle (as the Epsilon phase).

- ● The Release: When Mercury attacks the surface, it dissolves the particle, releasing both Tin and Copper at the exact same spot.

- ● The Race:

  - ▫️ Mercury tries to grab the Tin to form the weak Gamma 2 glue.

  - ▫️ Copper tries to grab the Tin to form the strong Eta-prime crystals.

- ● The Winner: Because the Copper is right there (Proximity) and Tin loves Copper more (Affinity), they snap together instantly.

- ● The Result: The Tin is "stolen" by the Copper before Mercury even has a chance to react with it.

- ● Bottom Line: The reaction is so fast and local that the weak Sn-Hg phase never gets the time to form.

---

## Reaction Summary (The Mechanism)

- ● The Copper Source: The unreacted alloy particles contain Epsilon (**ε**) phase (**Cu₃Sn**) and Gamma (**γ**) phase.

- ● The Reaction **(Ag₃Sn + Cu₃Sn) + Hg → Ag₂Hg₃ + Cu₆Sn₅ + Unreacted Core ((Ag₃Sn + Cu₃Sn))**

- ● Translation: (Gamma + Epsilon) + Mercury → Gamma 1 + Eta-prime + Unreacted Core

- ●

- ● What Forms:

  - ▫️ Gamma 1 (**γ₁**): The main matrix/binder (**Ag₂Hg₃**).

  - ▫️ Eta-prime (**η′**): The Copper–Tin reaction product (**Cu₆Sn₅**).

  - ▫️ Gamma 2 (**γ₂**): Eliminated. Because the Epsilon phase is right there supplying copper, the Tin reacts with it immediately, preventing the weak Sn-Hg phase.

  - ▫️

- ● Final Structure:

- ● Unreacted high-copper alloy particles (containing Gamma and Epsilon) embedded in a Gamma 1 matrix, with Eta-prime crystals dispersed throughout.

---

## Benefit vs. Risk (vs. Admixed High-Copper) EXTRA can skip

| Benefits | Risks / Handling Issues |
|---|---|
| Excellent creep resistance (due to Eta-prime locking the matrix) | Fresh mix is very plastic ("mushy") |
| Better corrosion resistance (No Gamma 2) | Harder to build proximal contour and tight contacts in Class II |
| Highest early strength (ready in 1 hour) | Higher risk of overhangs if technique is poor |

- ● One-Liner to Memorize

- ● Single-composition particles contain Epsilon phase (**Cu₃Sn**) which reacts to form Gamma 1 + Eta-prime; this eliminates Gamma 2 for low creep/high strength but makes the mix very plastic.

![Mercury Reaction in High-Copper Alloy (Instant Reaction / Final Structure)](assets/amalgam/amalgam_img_6.png)

---

## 9) Manipulation (clinical control)

### Mercury/alloy ratio (big clinical lever)

- ● Needs to be enough for a coherent plastic mass after trituration, but not so high that final set has too much weak matrix phase.

- ● Generally it is **1:1**

- ● More Hg → more **γ₁/γ₂ matrix**, less unreacted core → ↓ strength, ↑ creep, ↑ corrosion risk.

- ● Spherical powders generally need less Hg (lower surface area/volume).

![Key Phases in Dental Amalgam (low vs high copper)](assets/amalgam/amalgam_img_7.png)

### Trituration (mixing)

- ● Goal: break oxide layer + wet particles so reaction can proceed.

- ● How to know the correct time (critical question):

  - ▫️ Undertriturated: grainy, dull → weak, rough surface

  - ▫️ Proper: cohesive, smooth, shiny “rounded” mass

  - ▫️ Overtriturated: very shiny, mushy, sticks to capsule, shorter working time

### Condensation

- ● Goal: pack dense, adapt to walls, reduce porosity, and express excess Hg.

- ● Key rules from your text + slides:

  - ▫️ Start promptly; keep field absolutely dry

  - ▫️ Condense in increments; each increment should look shiny (Hg at surface helps bond next increment)

  - ▫️ Lathe-cut needs higher pressure; spherical needs less (too much pressure can “punch through”)

- ● When to discard mix (critical question):

- ● If it loses plasticity, becomes difficult to condense, won’t regain a shiny condensed surface, or you start getting voids/layering → discard and triturate fresh.

---

## The Consequences of Improper Manipulation

- ● This covers exactly what happens when you mess up the above variables.

- ● This section is critical for explaining why a restoration fails years later.

### 1. Trituration (Mixing Time & Speed)

| Error Type | Appearance of Mix | Clinical Consequence (The Result) |
|---|---|---|
| Under-Trituration (Too Slow/Short) | Grainy, Dull, Crumbly. Like dry sand. | High Porosity: The particles don't wet properly, leaving air gaps.<br>Weakness: Voids make it break easily.<br>Corrosion: Rough surface traps plaque.<br>Expansion: Can cause post-op sensitivity. |
| Normal Mix | Shiny, Smooth. Separates from the capsule in one mass. | Optimal Strength: Minimum voids and proper setting time. |
| Over-Trituration (Too Fast/Long) | Soupy, Sticky, Shiny. May feel hot to the touch. | Short Working Time: It sets too fast, so you can't pack it properly.<br>High Contraction: It shrinks too much, leaving gaps at the margins (leakage).<br>Stickiness: Adheres to instruments, making it hard to handle. |

![Under-trituration vs Normal Mix vs Over-trituration](assets/amalgam/amalgam_img_8.png)

### 2. Condensation (Packing Pressure)

- ● The goal of condensation is to adapt the material to the walls and squeeze out excess mercury.

- ● Low Condensation Pressure (Weak Packing):

  - ▫️ High Residual Mercury: You failed to squeeze the extra mercury out. This leaves a "Mercury-Rich" restoration (More Weak Matrix, Less Strong Core).

  - ▫️ Result: Drastic loss of strength and Increased Creep.

  - ▫️ Voids: Leaves air pockets between layers (lamination defects).

- ● Delayed Condensation (Waiting too long):

  - ▫️ The Problem: The matrix crystals have already started to grow and lock.

  - ▫️ The Result: Packing it late fractures these new crystals. The filling will be weak and crumbly because you broke the internal skeleton as it was forming.

![Condensation: Low Pressure vs Delayed Condensation](assets/amalgam/amalgam_img_9.png)

### 3. Mercury : Alloy Ratio

- ● Too Much Mercury (**>50%**):

  - ▫️ Microstructure: You create too much Gamma 1 (Glue) and not enough Gamma (Rocks).

  - ▫️ Result: The restoration is Weaker (glue is weaker than rock) and has High Creep (glue moves).

- ● Too Little Mercury (**<45-50%**):

  - ▫️ Microstructure: Not enough liquid to wet the particles.

  - ▫️ Result: A Grainy, Porous mix (similar to under-trituration). The particles don't stick together, leading to a rough, pitted surface that corrodes.

![Too Much Mercury vs Too Little Mercury](assets/amalgam/amalgam_img_10.png)

### One-Liner Summary for Exam Questions:

- ● Under-trituration = Grainy/Weak/Corrodes.

- ● Over-trituration = Sticky/Shrinks/Sets too fast.

- ● Low Condensation Pressure = Leaves too much Mercury behind (Weak/Creep).

- ● More Mercury = More Weak Matrix.

---

## 10) Properties you must link to causes

### A) Dimensional change (setting)

- ● Amalgam can contract or expand depending mainly on Hg content + condensation.

- ● More Hg remaining when **γ₁ crystals impinge** → expansion

- ● Less Hg / higher condensation pressure / smaller particles / longer trituration → favors net contraction

- ●

![Dimensional Change in Amalgam](assets/amalgam/amalgam_img_12.png)

### B) Delayed expansion (Zn + moisture) — the “pain” question

- ● Moisture contamination of Zn-containing amalgam → **H₂ gas** → internal pressure → expansion starting days later and continuing **weeks–months** → can cause severe postoperative pain and protrusion.

- ● So zinc is a double-edged sword (critical question):

  - ▫️ Benefit: deoxidizer → better handling/plasticity

  - ▫️ Risk: if moisture contaminates → delayed expansion (pain)

- ● .

![Zinc in Dental Amalgam: A Double-Edged Sword](assets/amalgam/amalgam_img_13.png)

### C) Strength (and why fractures happen)

- ● Amalgam is strong in compression, weak in tension → avoid thin sections/unsupported amalgam.

- ● Strength drops with: bad trituration, delayed condensation, high porosity, high final Hg.

### D) Creep → marginal breakdown (classic chain)

- ● High creep → marginal flow/protrusion → unsupported “flash” fractures → ditched margin.

- ● High-copper has much lower creep mainly because **γ₂** is absent and **η′ strengthens** the structure.

---

## Why it Matters Clinically

- ● why dentists care about that ditch. It’s not just cosmetic; it’s a biological risk.

- ● Plaque Trap: A smooth margin is easy to clean. A "ditched" margin acts like a canyon, trapping food debris and plaque that a toothbrush can't reach.

- ● Secondary Decay: Because bacteria sit undisturbed in that ditch, they produce acid, leading to recurrent caries (new decay) right next to the filling.

- ● Corrosion: The deep crevice creates a unique chemical environment that accelerates corrosion, weakening the filling further.

![High creep → marginal flow → flash fracture → ditched margin](assets/amalgam/amalgam_img_14.png)

---

## E) Tarnish vs corrosion

- ● Tarnish: surface discoloration (often **Ag sulfide**), not necessarily mechanical failure

- ● Corrosion: property degradation; **γ₂** is the big corrosion-sensitive phase (low-copper worst)

---

## 2. Corrosion: The Structural Destruction

- ● Corrosion is the actual degradation of the material (dissolution of metal) in the bulk of the restoration.

- ● Mechanism: Electrochemical attack (Galvanic Corrosion). The saliva acts as an electrolyte.

- ● The "Battery" Effect Different phases of amalgam have different electrical potentials:

  - ▫️ Cathode (Strong): **γ (Ag–Sn)** and **γ₁ (Ag–Hg)** are noble/strong.

  - ▫️ Anode (Weak): **γ₂ (Sn–Hg)** is the most electronegative (active).

- ● The Failure The **γ₂** phase acts as the anode and is "eaten away" or dissolved.

- ● Consequences

  - ▫️ Porosity: The restoration becomes porous and spongy.

  - ▫️ Weakness: Dramatic loss of strength (**50% strength loss in 5 years** for low-copper amalgam).

  - ▫️ Mercury Release: The mercury from the **γ₂** phase is released back into the restoration, reacting with remaining **γ** to form more **γ₁** and **γ₂** (known as **Mercuroscopic Expansion**).

- ●

- ● Positive side: corrosion products can seal the margin and reduce microleakage over time self sealing ability is due to these products

- ● Here are the corrosion product names:

  - ▫️ Tin Oxide

  - ▫️ Tin Hydroxychloride

  - ▫️ Copper Oxide (found in high-copper amalgams)

  - ▫️ Paratacamite (found in high-copper amalgams)

- ●

- ● \\\\

![Corrosion: battery effect + consequences + corrosion products](assets/amalgam/amalgam_img_15.png)

---

## Galvanism (Galvanic Shock)

- ● Definition: A sudden electrical pain caused by a "battery effect" in the mouth.

- ● Requirements:

  - ▫️ 1. Two Different Metals: e.g., Gold Crown (top) vs. Amalgam Filling (bottom).

  - ▫️ 2. Electrolyte: Saliva connects them.

  - ▫️ 3. Contact: Biting down touches the metals together.

- ● Mechanism: When the metals touch, an electrical current flows between them, passing through the tooth and shocking the nerve.

- ● Resolution: The pain usually stops after a few days because the amalgam forms a tarnish layer (oxides), which acts as an insulator and breaks the circuit.

![Galvanic Shock in the Mouth (Oral Battery)](assets/amalgam/amalgam_img_16.png)

---

## 11) Common exam “clinical problems” (answers in note form)

### Pain on chewing 1 day after placement

- ● Most likely:

  - ▫️ High occlusion (hyperocclusion) → adjust occlusion

- ● Tooth cracks from weakened cusps / over-reduction → may need cusp coverage/restoration redesign

- ● Not delayed expansion (that’s usually days later).

### Mechanism of marginal breakdown + prevention

- ● Mechanism: creep + low tensile strength + corrosion at weak/unsupported margins → fracture/ditching.

- ● Prevention:

  - ▫️ Choose high-copper alloy (low creep, no **γ₂**)

  - ▫️ Correct cavity design (avoid unsupported enamel/amalgam)

  - ▫️ Proper trituration + prompt condensation

  - ▫️ Adequate condensation pressure (esp. lathe-cut)

  - ▫️ Remove Hg-rich surface layer; proper carving; finish/polish appropriately

---

## 12) Mercury safety (short, factual, exam-safe)

- ● Allergy to mercury/amalgam is rare; true hypersensitivity needs clinical confirmation.

- ● Major reviews generally find no clear link between amalgam and systemic illness in the general population; agencies still advise precautionary minimization for certain groups.

- ● Quantifiable exposure: studies/reviews often estimate a few µg/day of absorbed mercury from amalgams, generally below tolerable daily intakes used by regulators/WHO frameworks.

- ● Office hygiene: encapsulated systems, good ventilation, high-volume suction + water spray during removal, avoid dry polishing (highest vapor release), proper scrap disposal.

`,vm=`
## 1) Core definitions (high-yield)

- ● **Amalgam**: an alloy that contains **mercury** (**Ag–Sn(silver–tin) + mercury**).
- ● **Amalgamation**: mixing **liquid mercury** with **one/more metals/alloys** → forms **amalgam**. (the **chemical reaction**)
- ● **Trituration**: **mechanical mixing** of alloy powder + mercury in a **triturator(amalgamator)**. (the actual **physical mixing** of liquid and solid)
- ● **Creep**: **time-dependent deformation under stress** → margins can **flow/protrude** → **marginal breakdown**.
- ● **Delayed expansion (Zn-containing amalgam)**: **weeks–months** expansion due to **H₂ gas** when **moisture contaminates** the mix.
- ● **Marginal breakdown**: gradual **fracture/ditching** at margin → **gaps** between amalgam and tooth.

---

## 2) Amalgam Alloy Powders (what forms exist?)

- ● Alloy powder forms (because reaction occurs at the **interface**):
- ▫️ **Lathe-cut (irregular particles)**: cut from an ingot; rougher; **more surface area**
- ▫️ **Spherical (atomized droplets)**: smooth spheres; **less surface area**
- ▫️ **Admix**: mixture of **lathe-cut Ag–Sn + spherical Ag–Cu**

- ● Why does particle form matter clinically?
- ▫️ More surface area (**lathe-cut**, smaller particles) → needs more **Hg** to wet surfaces → faster reaction/hardening but risk **higher Hg content** if not condensed well.
- ▫️ Less surface area (**spherical**) → needs less **Hg** → often better final properties if handled right, but mix is very plastic.

![Forms of Amalgam Alloy Powders](assets/amalgam_forms_powders.png)

---

## 3) Copper Classification (critical)

### A) Low-copper (conventional) alloys

- ● Traditionally: **Ag** and **Sn** dominate, **Cu** is low (**~1–6%**)
- ● Problem: forms **γ₂ phase (Sn–Hg)**, which is weak + corrodes easily
- ● Typical phases include:
- ▫️ **γ (Ag₃Sn)** = unreacted alloy core
- ▫️ **γ₁ (Ag₂Hg₃)** = main matrix
- ▫️ **γ₂ (Sn₇–₈Hg)** = weak/corrosion-prone phase (undesirable)

### B) High-copper alloys

- ● **Cu > ~6%** (often **12–30%**)
- ✅ Main goal: **eliminate γ₂**
- ● Two types:
- ▫️ **High-copper admix (dispersed phase)**
  - ○ lathe-cut **Ag₃Sn** + spherical **Ag–Cu eutectic**
- ▫️ **High-copper single-composition (often spherical)**
  - ○ each particle already contains **Ag–Sn–Cu** phases

---

## 4) Indications & Contraindications

- ● **Indications**
  - ▫️ Moderate/large posterior cavities
  - ▫️ When isolation is difficult
  - ▫️ Stress-bearing areas / where longevity matters
- ● **Contraindications**
  - ▫️ High esthetic demand
  - ▫️ Very small conservative lesions (composite preferred)
  - ▫️ Known mercury allergy / hypersensitivity suspicion

---

## 5) Advantages vs Disadvantages

- ● **Advantages**
  - ▫️ Good longevity, strong in compression
  - ▫️ Less technique sensitive than composite (especially moisture-tolerant overall)
  - ▫️ **Self-sealing** over time (via corrosion products)
- ● **Disadvantages**
  - ▫️ Not esthetic
  - ▫️ No chemical adhesion to tooth (needs mechanical retention)
  - ▫️ Mercury concerns + environmental issues

---

## 6) Composition and What Each Element Does

- ● Typical components: **Ag, Sn, Cu ± Zn ± Pd/In**
- ● Roles (classic exam lines):
- ▫️ **Silver (Ag)**: **↑ strength**, **↑ expansion**, **↑ corrosion resistance**
- ▫️ **Tin (Sn)**: **↓ strength**, **↑ creep**, **↑ corrosion** (but helps workability)
- ▫️ **Copper (Cu)**: ✅ **eliminates γ₂**, **↑ strength**, **↓ creep**, **↑ corrosion resistance**
- ▫️ **Zinc (Zn)**: deoxidizer; ✅ **moisture contamination → delayed expansion**
- ▫️ **Indium/Palladium**: handling/performance modifiers

---

## 7) How Amalgam Sets: “Rocks and Glue”

- ● Set amalgam behaves like a **composite**:
- ▫️ **Unreacted alloy cores (“rocks”)** = strong filler
- ▫️ **Reaction products (“glue/matrix”)** = matrix binding everything
- ✅ Key exam line: **Set amalgam = unreacted alloy particles embedded in a mercury-containing matrix.**

### Phase Hierarchy (Rocks and Glue)

| Phase Name | Symbol | Formula | Role | Key Properties |
| ---| ---| ---| ---| ---|
| **Gamma** | **γ** | **Ag₃Sn** | “Rocks” (Unreacted Core) | **Strongest phase** |
| **Epsilon** | **ε** | **Cu₃Sn** | Copper source | Supplies Cu to kill γ₂ |
| **Gamma 1** | **γ₁** | **Ag₂Hg₃** | Main “glue” (matrix) | Primary binder |
| **Gamma 2** | **γ₂** | **Sn₇–₈Hg** | “Weak glue” | **Weakest phase**; unstable, prone to corrosion |
| **Eta Prime** | **η′** | **Cu₆Sn₅** | Reinforcement | High-Copper reaction product; reduces creep |

---

## 8) Why We Need Copper (Eliminating γ₂)

- ● The **Chemical “Preference”** Mechanism:
- ▫️ Tin (**Sn**) has a much higher chemical affinity for **Copper (Cu)** than for **Mercury (Hg)**.
- ▫️ Tin is “pulled away” to form **η′ (Cu₆Sn₅)**.
- ✅ This effectively **blocks** the formation of the weak **γ₂** "bad glue."

### A) Admixed High-Copper (2-Phase Reaction)
- ● **Phase 1**: Initial reaction forms **γ₁** and some **γ₂**.
- ● **Phase 2**: Secondary reaction consumes **γ₂** as Tin diffuses to **Ag-Cu** particles to form **η′**.
- ✅ γ₂ ends up minimal/absent.

### B) Single-Composition High-Copper (1-Phase Reaction)
- ● Every particle contains **Epsilon phase (ε)**.
- ● Tin reacts with available Copper **instantly** to form **η′**.
- ✅ **No γ₂ is ever formed.**

---

## 9) Manipulation (Clinical Control)

- ● **Mercury/Alloy Ratio**: Generally **1:1**.
- ▫️ **More Hg** → **↑ weak matrix**, **↓ strength**, **↑ creep**.
- ▫️ **Spherical powders** need **less Hg** (lower surface area).

- ● **Trituration (Mixing)**:
- ▫️ **Undertriturated**: Grainy, dull → **weak**, rough.
- ▫️ **Proper**: Cohesive, smooth, shiny.
- ▫️ **Overtriturated**: Soupy, sticky → **short working time**, **high contraction**.

- ● **Condensation (Packing)**:
- ▫️ Goal: Adapt to walls and **express excess Hg**.
- ▫️ **Low pressure** → leaves "Mercury-rich" restoration (**weak/high creep**).
- ▫️ **Delayed condensation** → fractures growing crystals (**brittle/crumbly**).

- ● **Carving & Finishing**:
- ▫️ Carve when it offers **resistance** (ringing feel).
- ▫️ **Final polishing delayed ~24h** to allow complete setting.

---

## 10) Clinical Consequences Table

| Error Type | Appearance | Result |
| ---| ---| ---|
| **Under-Trituration** | Grainy, Dull | High Porosity, Weakness, Corrosion |
| **Over-Trituration** | Soupy, Sticky | High Contraction, Sets too fast |
| **Low Condensation** | Voids, Layering | High Residual Hg, Low Strength, High Creep |
| **Moisture + Zn** | - | **Delayed Expansion**, Post-op Pain |

---

## 11) Tarnish vs Corrosion

- ● **Tarnish**: Surface discoloration (**Ag sulfide**); usually no mechanical failure.
- ● **Corrosion**: Structural destruction via **Galvanic Battery Effect**.
- ▫️ **Anode (Weak)**: **γ₂ (Sn–Hg)** is dissolved/eaten away.
- ✅ **Self-sealing**: Corrosion products (Tin Oxide, etc.) can seal margins over time.

---

## 12) Mercury Safety

- ● **Office Hygiene**:
- ▫️ Use **encapsulated systems**.
- ▫️ **High-volume suction** + **water spray** during removal.
- ▫️ Avoid **dry polishing** (vapor release).
- ✅ Mercury allergy is **rare**; true hypersensitivity needs confirmation.
`,en=["Amalgam = Alloy (Ag-Sn-Cu) + Mercury (Hg).","Gamma-2 (Sn-Hg) is the weakest, most corrosion-prone phase.","High-Copper alloys eliminate Gamma-2 by forming Eta-Prime (Cu-Sn).","Trituration: Under = Grainy; Over = Sticky/Fast Set.","Zinc + Moisture = Delayed Expansion (H2 gas) causing pain.","Creep defined as time-dependent deformation under stress.","Corrosion products provide a 'self-sealing' ability."],ho=[{id:"am_mcq_1",question:"Dental amalgam is best defined as:",options:["Pure mercury used as a filling","An alloy that contains mercury","An alloy of only silver and tin","A resin-based restorative material"],correctAnswerIndex:1,explanation:"Amalgam = an alloy containing mercury ."},{id:"am_mcq_2",question:"“Amalgamation” means:",options:["Cutting alloy ingot into particles","Chemical reaction of Hg with metals/alloys to form amalgam","Carving anatomy after condensation","Polishing after 24 hours"],correctAnswerIndex:1,explanation:"Amalgamation is the reaction process ."},{id:"am_mcq_3",question:"“Trituration” means:",options:["Chemical setting only","Mechanical mixing of alloy powder + mercury in a triturator","Expressing mercury during condensation","Corrosion of γ ₂"],correctAnswerIndex:1,explanation:"Trituration = physical mixing in an amalgamator."},{id:"am_mcq_3_1",question:`A triturated amalgam mix comes out grainy and dull and later produces a weak, porous restoration. The operator suspects the main objective of trituration was not achieved.
The PRIMARY purpose of trituration is to:`,options:["Express excess mercury so the final restoration contains <40% Hg","Disrupt the oxide layer and uniformly wet alloy particles so mercury can diffuse/react evenly, creating a cohesive plastic mass","Produce immediate hardening by completing all γ ₁ formation inside the capsule","Prevent γ ₂ formation by converting tin directly into η′ before condensation"],correctAnswerIndex:1,explanation:"Trituration’s main job is to break/disrupt the oxide film on alloy particles and thoroughly wet them with mercury, so Hg can diffuse in and metals can dissolve out evenly. That gives a cohesive, plastic, packable mass and a uniform reaction."},{id:"am_mcq_4",question:"“Creep” is:",options:["Instant elastic strain","Time-dependent plastic deformation under stress","Moisture expansion due to Zn","Surface discoloration only"],correctAnswerIndex:1,explanation:"Creep = slow flow under load."},{id:"am_mcq_5",question:"“Marginal breakdown” is:",options:["Only tarnish on surface","gap formation","Polymerization shrinkage","Hygroscopic expansion"],correctAnswerIndex:1,explanation:"Margins fracture/ditch → gaps."},{id:"am_mcq_6",question:"A patient has a 15-year-old conventional (low-copper) amalgam on a mandibular molar. The restoration shows a raised “flash” at the margin with a surrounding ditch, and the explorer catches in the defect. The area has become a plaque trap and a small recurrent lesion is suspected. This marginal failure pattern is MOST primarily due to which material property?",options:["Tarnish","Corrosion resistance","Delayed expansion","Creep"],correctAnswerIndex:3,explanation:"Creep is the time-dependent deformation that causes marginal flash and subsequent fracture/ditching."},{id:"am_mcq_14",question:"Low-copper alloys usually contain copper:",options:["0%","~1–6%","12–30%",">60%"],correctAnswerIndex:1,explanation:"Conventional = low Cu ."},{id:"am_mcq_15",question:"High-copper alloys are defined as:",options:["Cu < 1%","Cu 1–5%","Cu > ~6% (often 12–30%)","Cu > 80%"],correctAnswerIndex:2,explanation:"High-copper = >6% Cu ."},{id:"am_mcq_16",question:"γ (gamma) phase is:",options:["Ag ₂ Hg ₃","Sn ₇ – ₈ Hg","Ag ₃ Sn (unreacted core)","Cu ₆ Sn ₅"],correctAnswerIndex:2,explanation:"γ = Ag ₃ Sn “rocks”."},{id:"am_mcq_17",question:"γ ₁ phase is:",options:["Ag ₂ Hg ₃ (matrix)","Sn ₇ – ₈ Hg (weak)","Ag ₃ Sn (core)","Cu ₃ Sn (epsilon)"],correctAnswerIndex:0,explanation:"γ ₁ = main glue matrix ."},{id:"am_mcq_18",question:"γ ₂ phase is:",options:["Ag ₂ Hg ₃","Sn ₇ – ₈ Hg (weak/corrosion-prone)","Cu ₆ Sn ₅","Cu ₃ Sn"],correctAnswerIndex:1,explanation:"γ ₂ = bad glue ."},{id:"am_mcq_19",question:"η′ (eta-prime) phase is:",options:["Cu ₆ Sn ₅","Ag ₃ Sn","Ag ₂ Hg ₃","Sn ₇ – ₈ Hg"],correctAnswerIndex:0,explanation:"η′ = Cu ₆ Sn ₅ (good)."},{id:"am_mcq_20",question:"ε (epsilon) phase is:",options:["Cu ₃ Sn","Cu ₆ Sn ₅","Ag ₂ Hg ₃","Sn ₇ – ₈ Hg"],correctAnswerIndex:0,explanation:"ε = Cu ₃ Sn copper source (inside particles). Setting reactions (low-copper vs high-copper)"}],po=[{id:"am_mcq_21",question:"Low-copper setting produces:",options:["γ only","γ ₁ + γ ₂ + unreacted γ","η′ only","No reaction products"],correctAnswerIndex:1,explanation:"Low-copper → γ ₁ + γ ₂ + cores ."},{id:"am_mcq_22",question:"The microstructure of set amalgam is best described as:",options:["Pure γ ₁ with no particles","Unreacted cores embedded in reacted matrix","Only copper-tin crystals","Only mercury remaining"],correctAnswerIndex:1,explanation:"Amalgam = composite (rocks in glue)."},{id:"am_mcq_23",question:"Why is γ ₂ called the “bad phase”?",options:["It is the strongest phase","It is weak and most corrosion-prone","It improves proximal contacts","It eliminates creep"],correctAnswerIndex:1,explanation:"γ ₂ → corrosion + weakness + marginal breakdown ."},{id:"am_mcq_34",question:"The plastic consistency right after mixing is because:",options:["No reaction occurs","Liquid Hg remains while precipitation is forming","All Hg is already consumed","The matrix band provides plasticity"],correctAnswerIndex:1,explanation:"Liquid Hg + ongoing reaction → packable mass."},{id:"am_mcq_35",question:"The “primary matrix” that binds the structure is:",options:["γ","γ ₁","γ ₂","ε"],correctAnswerIndex:1,explanation:"γ ₁ = primary matrix ."},{id:"am_mcq_36",question:"Which microstructural phase is the strongest component of a set dental amalgam?",options:["γ ₂ (Sn ₇ – ₈ Hg)","γ ₁ (Ag ₂ Hg ₃ )","γ (Ag ₃ Sn, unreacted alloy core)","η′ (Cu ₆ Sn ₅ )"],correctAnswerIndex:2,explanation:"γ (Ag ₃ Sn) Reasoning: The unreacted γ (Ag ₃ Sn) cores are the strongest “rock-like” component; γ ₂ is the weakest, while γ ₁ is the main matrix and η′ is reinforcing but not the primary strongest phase overall."},{id:"am_mcq_37",question:"Silver (Ag) generally:",options:["Decreases strength","Increases strength and corrosion resistance","Causes delayed expansion","Eliminates γ ₁"],correctAnswerIndex:1,explanation:"Ag → ↑ strength, ↑ corrosion resistance."},{id:"am_mcq_38",question:"Tin (Sn) tends to:",options:["Increase strength and decrease creep","Decrease strength and increase creep/corrosion","Eliminate γ ₂","Prevent corrosion entirely"],correctAnswerIndex:1,explanation:"Sn → ↑ creep/corrosion, ↓ strength (but improves workability)."},{id:"am_mcq_39",question:"Copper (Cu) in dental amalgam mainly makes the amalgam:",options:["Weaker and more likely to bend (↑ creep)","Stronger and less likely to deform (↓ creep)","Softer so it carves easier but breaks more","More likely to expand days later in every case"],correctAnswerIndex:1,explanation:"Copper improves mechanical performance: ↑ strength and ↓ creep (less deformation)."},{id:"am_mcq_40",question:"Zinc (Zn) is primarily a:",options:["Oxygen scavenger","Matrix phase+gamma 2 reducer","Corrosion product","Filler only"],correctAnswerIndex:0,explanation:"Zn reduces oxide formation during melting."},{id:"am_mcq_41",question:`A 45-year-old with long-standing GERD comes for a routine check. Several mandibular molars have old amalgam restorations that look “standing proud” (raised above the surrounding tooth). The restorations are intact and the patient has had no recent dental treatment.
What is the MOST likely cause of this “standing proud” appearance?`,options:["Delayed expansion of amalgam from moisture contamination during placement","Creep (time-dependent flow) of amalgam under occlusal load","Chemical erosion of surrounding enamel/dentin, making the tooth wear away around the restoration","Galvanic action physically lifting the restoration"],correctAnswerIndex:2,explanation:"Chemical erosion/loss of tooth structure around the restoration (GERD-related acid wear) makes the amalgam appear elevated."},{id:"am_mcq_42",question:"Mercury/alloy ratio must be:",options:["Always maximal to improve strength","Enough for plastic mass, but low enough to avoid weak matrix excess","Zero in spherical alloys","Increased after trituration if mix is dry"],correctAnswerIndex:1,explanation:"Balance plasticity vs final properties."},{id:"am_mcq_43",question:"Adding mercury after trituration is:",options:["Recommended","Contraindicated","Required for spherical alloys","Needed to reduce creep"],correctAnswerIndex:1,explanation:"Post-addition of Hg is contraindicated ."},{id:"am_mcq_44",question:"Undertitrated mix looks:",options:["Grainy, dull, crumbly","Smooth rounded shiny mass","Soupy sticky very shiny","Black tarnished"],correctAnswerIndex:0,explanation:"Undertriturated = grainy/dull ."},{id:"am_mcq_45",question:"Properly triturated mix looks:",options:["Dull and sandy","Smooth, cohesive, rounded, shiny","Watery and flat","Powdery only"],correctAnswerIndex:1,explanation:"Proper mix = cohesive shiny mass."},{id:"am_mcq_46",question:"Overtriturated mix tends to be:",options:["Grainy and stiff","Very shiny, mushy, sticky, shorter working time","Impossible to carve at all","Always expands severely"],correctAnswerIndex:1,explanation:"Overtriturated = soupy/sticky , sets faster."},{id:"am_mcq_47",question:`During placement of a Class II amalgam, the operator uses heavy, well-directed condensation in small increments and removes the “mushy” mercury-rich material that rises to the surface after each increment.
The PRIMARY purpose of this condensation technique is to:`,options:["Increase the γ ₁ matrix content so the restoration becomes more plastic and easier to carve","Improve adaptation and density by reducing voids and residual mercury, thereby improving strength and lowering creep","Promote delayed expansion by trapping moisture and hydrogen gas within the restoration","Accelerate tarnish formation so microleakage seals immediately"],correctAnswerIndex:1,explanation:"Condensation aims to pack amalgam densely, adapt to cavity walls, minimize porosity, and express excess mercury, which increases strength and reduces creep/marginal breakdown."},{id:"am_mcq_48",question:"Lathe-cut alloys generally need:",options:["Lower condensation pressure","Higher condensation pressure","No pressure","Only ultrasonic condensation"],correctAnswerIndex:1,explanation:"Lathe-cut resists condensation → needs more pressure ."},{id:"am_mcq_49",question:"A sign of good bonding between increments is:",options:["Each increment is matte and dry","Shiny surface after condensation of each increment","Overfilled cavity is avoided","Carving starts immediately"],correctAnswerIndex:1,explanation:"Shiny surface indicates enough Hg for increment bonding ."}],go=[{id:"am_mcq_50",question:"A triturated mix should be discarded when:",options:["It’s still plastic and cohesive","It loses plasticity and causes voids/layering","It is freshly mixed","It is shiny"],correctAnswerIndex:1,explanation:"Partially set mix → weak + voids ."},{id:"am_mcq_51",question:"While shaping a freshly condensed amalgam restoration, you want to start carving at the point that minimizes marginal pull-away and preserves anatomy. Which clinical sign BEST indicates the correct carving time?",options:["The surface appears highly shiny and “wet,” and the instrument glides with no resistance","A light explorer stroke produces a clean shaving and a distinct “ringing/scraping” sound, with the material resisting deformation","The matrix band can be removed easily and the amalgam still feels rubbery to a burnisher","Carving should be postponed until the next appointment (24 hours) to avoid any risk of fracture"],correctAnswerIndex:1,explanation:"Carve when it resists , not too early."},{id:"am_mcq_52",question:"Starting carving too early can cause:",options:["Better margins","Pulling material away from margins","Increased η′ formation","Elimination of γ ₂"],correctAnswerIndex:1,explanation:"Too plastic → margins can be pulled away."},{id:"am_mcq_53",question:"What is the BEST next step to prevent marginal damage and still achieve a smooth final restoration?",options:["Immediately polish with a dry bur using firm pressure to obtain high luster","wait 30 mins and then Burnish vigorously with heavy force to force mercury to the surface for a smoother finish","Perform gentle burnishing/smoothing now, and delay final polishing until the next visit","Re-triturate a new mix and add a thin layer of fresh amalgam over the surface to improve luster"],correctAnswerIndex:2,explanation:"Polish after adequate strength develops (often ~24h)."},{id:"am_mcq_54",question:"Dry polishing is discouraged mainly because it can:",options:["Stop corrosion products forming","Heat the surface and increase mercury vapor release","Eliminate creep","Increase proximal contact tightness"],correctAnswerIndex:1,explanation:"Heat ↑ Hg vapor → use wet polishing."},{id:"am_mcq_55",question:"Which alloy component is most responsible for this delayed expansion phenomenon when moisture is incorporated into the mix?",options:["Silver","Copper","Zinc","Tin"],correctAnswerIndex:2,explanation:"When moisture contaminates an amalgam mix, zinc can react and generate hydrogen gas, which builds internal pressure and produces delayed expansion starting a few days after placement—making the restoration feel “high” and painful.."},{id:"am_mcq_56",question:"Delayed expansion usually begins:",options:["Within minutes","Same day only","3–5 days after placement and may continue months","Only at 24 hours"],correctAnswerIndex:2,explanation:"Delayed expansion is days later , continues weeks–months."},{id:"am_mcq_57",question:"Delayed expansion is caused by production of:",options:["CO ₂","H ₂ gas","O ₂","NH ₃"],correctAnswerIndex:1,explanation:"Zn + moisture → hydrogen gas ."},{id:"am_mcq_58",question:"Amalgam is generally:",options:["Strong in tension, weak in compression","Strong in compression, weak in tension","Equal in all directions","Strong only at 1 hour"],correctAnswerIndex:1,explanation:"Amalgam resists compression best."},{id:"am_mcq_59",question:"High early strength is an advantage because:",options:["It increases delayed expansion","It reduces risk of early fracture if patient bites soon","It increases γ ₂","It prevents corrosion permanently"],correctAnswerIndex:1,explanation:"Early strength reduces early fracture risk."},{id:"am_mcq_60",question:`A dentist designs a cavity preparation. For amalgam, they place retentive undercuts and grooves. For composite, they keep the preparation more conservative and rely on etch + bond. For GIC, minimal retention is needed.
Why is cavity design (retentive form) a bigger concern for amalgam than for composite and GIC?`,options:["Amalgam bonds micromechanically to enamel, so it needs undercuts to protect the bond","Amalgam needs macromechanical retention","Amalgam chemically bonds to dentin, so undercuts are optional","Amalgam polymerizes and shrinks, so undercuts prevent it from pulling away"],correctAnswerIndex:1,explanation:"Amalgam doesn’t adhere to tooth, so it needs macromechanical undercuts, while composite bonds micromechanically (etch+bond) and GIC bonds chemically, allowing conservative preps."},{id:"am_mcq_61",question:"Correct sequence is:",options:["Creep → bleaching → staining → caries","Creep → marginal flow/protrusion → unsupported flash → fracture → ditch","Creep → H ₂ → delayed expansion → ditch","Creep → stronger margins"],correctAnswerIndex:1,explanation:"That’s the classic marginal ditching mechanism."},{id:"am_mcq_62",question:`A dentist is choosing an amalgam for a large posterior Class II restoration where margins must last long-term.
Why do we usually choose a high-copper amalgam instead of a low-copper amalgam?`,options:["High-copper has more creep, so it flows better and seals margins","High-copper has less creep and less corrosion, so margins break down less","High-copper expands more, so it always feels “high”","High-copper is weaker, so it is easier to carve"],correctAnswerIndex:1,explanation:"High-copper alloys remove γ ₂ (weak/corrosion-prone) by converting tin into η′ (Cu ₆ Sn ₅ ) → lower creep + less corrosion + better marginal durability."},{id:"am_mcq_63",question:"Tarnish is:",options:["Bulk structural dissolution","Surface discoloration","Hydrogen expansion","Time-dependent flow"],correctAnswerIndex:1,explanation:"Tarnish is mainly surface discoloration.(often sulfides)"},{id:"am_mcq_64",question:"Corrosion causes:",options:["Only cosmetic change","Material degradation","Only improved strength","Permanent insulation against galvanism"],correctAnswerIndex:1,explanation:"Corrosion = structural destruction .Material degradation + porosity + strength loss"},{id:"am_mcq_65",question:"In low-copper amalgam, the most anodic (most attacked) phase is:",options:["γ and γ ₁","γ ₂","η′","Enamel"],correctAnswerIndex:1,explanation:"γ ₂ is least noble , corrodes most."},{id:"am_mcq_66",question:"A beneficial effect of corrosion products is:",options:["Increased polymerization","Sealing the tooth–amalgam interface","Guaranteed elimination of ditching","Increased Hg vapor release"],correctAnswerIndex:1,explanation:"Corrosion products can reduce microleakage over time."},{id:"am_mcq_68",question:"While checking occlusion after placing a new posterior amalgam, you ask the patient to bite. The patient reports an instant “electric shock” sensation that occurs only when the teeth contact. Your supervisor tells you to check the opposing tooth and you find a metal crown. What is the MOST likely explanation?",options:["Delayed expansion from moisture contamination","Galvanic shock due to contact between dissimilar metals through saliva","Normal setting contraction causing microleakage pain","Creep of amalgam causing marginal protrusion"],correctAnswerIndex:1,explanation:"When two different metals (e.g., fresh amalgam and an opposing metal crown) touch, saliva acts as an electrolyte, completing a circuit and causing a sudden sharp electric pain."},{id:"am_mcq_69",question:`The patient returns 2 years after a posterior amalgam. You detect a small marginal ditch with an explorer, but there is no softness, no radiographic recurrent caries, and the patient is asymptomatic. You decide to monitor rather than replace immediately because amalgam margins can become more resistant to microleakage over time.
The MOST important reason small marginal discrepancies may not automatically mean contamination/recurrent caries is that amalgam develops which feature at the tooth–restoration interface?`,options:["Polymerization shrinkage stresses that close the gap","A resin-based adhesive hybrid layer","Self-sealing by corrosion products","Enamel remineralizes into the metal margin forming a new enamel bridge"],correctAnswerIndex:2,explanation:"Amalgam can self-seal because tin-containing corrosion products accumulate at the interface and block microleakage, so a small ditch isn’t automatically “contaminate"},{id:"am_mcq_71",question:"Pain on chewing 1 day after an amalgam restoration is MOST likely due to:",options:["Delayed expansion","Hyperocclusion","H ₂ gas pressure peak","Secondary caries"],correctAnswerIndex:1,explanation:"Delayed expansion is days later; day-1 pain = high occlusion/cracks ."},{id:"am_mcq_72",question:"Delayed expansion pain is typically:",options:["Within 10 minutes","Same day only","10–12 days later","Only after 5 years"],correctAnswerIndex:2,explanation:"Delayed expansion symptoms occur days later , can be severe."},{id:"am_mcq_73",question:"A major prevention step for delayed expansion is:",options:["Increase moisture exposure","Keep field absolutely dry during condensation","Carve earlier","Use dry polishing"],correctAnswerIndex:1,explanation:"Moisture incorporation triggers the Zn reaction."},{id:"am_mcq_74",question:"Best clinical indication for choosing dental amalgam over composite is:",options:["Small Class I pit caries in a dry, well-isolated field","Class III anterior proximal lesion where esthetics matters most","Large Class II MOD restoration in a high-caries-risk patient where moisture control is poor and margins are in heavy occlusion","Any posterior cavity when the patient requests tooth-colored fillings"],correctAnswerIndex:2,explanation:"Amalgam is strongest and most reliable in large posterior stress-bearing restorations, especially when isolation is difficult and the case needs durability. ."},{id:"am_mcq_75",question:"Contraindication for amalgam:",options:["Difficult isolation","High esthetic demand","Large occlusal cavity","Need high compressive strength"],correctAnswerIndex:1,explanation:"Esthetics favors tooth-colored materials."},{id:"am_mcq_76",question:"Best practice during amalgam removal to reduce exposure is:",options:["Dry cutting without suction","Water spray + high-volume suction","Heating restoration to soften","Incinerating scrap"],correctAnswerIndex:1,explanation:"Reduces aerosol and Hg vapor."},{id:"am_mcq_77",question:"Scrap amalgam and mercury-contaminated waste should be:",options:["Heat sterilized/incinerated","Stored sealed and disposed properly","Flushed down sink","Vacuumed from carpet"],correctAnswerIndex:1,explanation:"Heat releases Hg vapor; proper sealed disposal is required.(not heated)"},{id:"am_mcq_78",question:"True hypersensitivity/allergy to amalgam is:",options:["Extremely common","Rare (<1% is often cited for contact reactions)","Guaranteed in all patients","Impossible"],correctAnswerIndex:1,explanation:"Allergic reactions are rare ."}],bm=[...ho,...po,...go],tn={subject:I.DENTAL_MATERIALS,content:`
---

## 1) What GIC is (definition + why it exists)

- ● **Glass ionomer** is the generic name for materials based on the reaction of **glass powder + polyacrylic acid**.

- ● It is **fluoroaluminosilicate glass + polyalkenoic acid**.

- ● Developed in the **1970s** to:
  - ▫️ Improve clinical performance compared with **silicate cements**.
  - ▫️ Reduce risk of **pulp damage**.

- ● **GIC is a water-based cement**.

### A) Why polyacrylic acid matters

- ● The use of **polyacrylic acid** makes GIC capable of **bonding to tooth structure** (**chemical adhesion**).

- ● GIC is considered superior to many cements because it is:
  - ▫️ **Adherent**
  - ▫️ **Translucent**

- ● Various formulas exist depending on intended clinical application.

- ● In newer formulations:
  - ▫️ Water-soluble polymers and polymerizable monomers have replaced part of the liquid content.
  - ▫️ Metal, metal-ceramic, and ceramic particles have been added to enhance mechanical properties.
  - ▫️ Products can be **chemical-cure**, **light-cure**, or **dual-cure**.

---

## 2) Advantages & disadvantages (high-yield, exam format)

### A) Advantages

- ● **Adhesion & seal**
  - ▫️ Bonds to **enamel and dentin** (**inherent adhesion**).
  - ▫️ Good **marginal seal**.
  - ▫️ Minimal cavity preparation often required (because it bonds).

- ● **Fluoride / anticariogenic**
  - ▫️ Significant **fluoride release**.
  - ▫️ **Fluoride recharge** possible (**fluoride reservoir**).
  - ▫️ **Anticariogenic** property.

- ● **Thermal properties**
  - ▫️ Coefficient of thermal expansion similar to tooth structure.
  - ▫️ Low thermal conductivity (insulating effect).

- ● **Esthetics & biology**
  - ▫️ Tooth-coloured.
  - ▫️ Biocompatible.

- ● **Clinical evidence**
  - ▫️ Conventional GI: supported by **~10-year clinical studies**.

### B) Disadvantages

- ● **Esthetics / surface finish**
  - ▫️ More opaque than resin/composite.
  - ▫️ Less polishable than resin/composite.
  - ▫️ Less esthetic than composite.

- ● **Strength / fracture / wear**
  - ▫️ Brittle.
  - ▫️ Low tensile strength.
  - ▫️ Low fracture resistance.
  - ▫️ Poor wear resistance.

- ● **Moisture sensitivity (during setting)**
  - ▫️ Water sensitive during setting phase.
  - ▫️ If not protected → surface can become white/chalky and crazed.

- ● **Clinical limitations**
  - ▫️ May debond readily in difficult conditions.
  - ▫️ Technique sensitive (needs good moisture control + surface protection).
  - ▫️ Poor longevity in xerostomic patients.

---

## 3) Clinical uses (where GIC is used)

### A) “Clinical use” lecture classification (Type I–IX)

- ● Types list:
  - ▫️ Type I: Luting
  - ▫️ Type II: Restorative
  - ▫️ Type III: Liner/Base
  - ▫️ Type IV: Pit & fissure sealant
  - ▫️ Type V: Orthodontic luting (bands/brackets)
  - ▫️ Type VI: Core build-up
  - ▫️ Type VII: High fluoride releasing
  - ▫️ Type VIII: ART (atraumatic restorative treatment)
  - ▫️ Type IX: Paediatric GIC

- ● Table (quick recall):

| Type | Use |
|---|---|
| Type I | Luting |
| Type II | Restorative |
| Type III | Liner/Base |
| Type IV | Pit & fissure sealant |
| Type V | Orthodontic luting (bands/brackets) |
| Type VI | Core build-up |
| Type VII | High fluoride releasing |
| Type VIII | ART (atraumatic restorative treatment) |
| Type IX | Paediatric GIC |

- ● **Type I–IX classification graphic:**

![Glass Ionomer Cement Classification (Type I–IX)](/assets/type_i_luting_type_ii_restorative_1.png)

### B) Type-specific notes

- ● **Type I (Luting)**
  - ▫️ Crowns, bridges.
  - ▫️ Ortho bands/brackets (depending on product).

- ● **Type II (Restorative)**
  - ▫️ Class III and Class V (esthetic cervical/anterior), non–high stress areas.
  - ▫️ Deciduous restorations in suitable situations.

- ● Repair of margins / minimal cavity preparations (tunnel, conservative).

- ● **Type III (Liner/Base)**
  - ▫️ Liner/base under restorations.
  - ▫️ Sandwich concept commonly taught clinically (**GIC base + composite on top**) for marginal seal/fluoride benefit (product dependent).

- ● **Pit & fissure sealing (Type IV)**
  - ▫️ Flowable/low viscosity GIC forms used for pits/fissures and sealing sensitive cervical areas in some product categories.

- ● **Core build-up (Type VI)**
  - ▫️ Core build-up indications exist especially for specific high-viscosity/packable systems.
  - ▫️ (Some sources note encapsulated systems improve consistency.)

---

## 4) Classification

### A) Classification (by clinical use)

- ● Type I: Luting crowns, bridges, and orthodontic brackets.

- ● Type IIa: Esthetic restorative cements.

- ● Type IIb: Reinforced restorative cements.

- ● Type III: Lining cements, base.

### B) Skinner classification

- ● Type I – Luting.

- ● Type II – Restorative.

- ● Type III – Liner and base.

- ● original (conventional) GIC: **silicate glass particles + polyacrylic acid solution**. Other variations are discussed later.

### C) Sturdevant classification (“By formulation / modification style”)

- ● Traditional / Conventional GIC.

- ● Metal-modified GIC:
  - ▫️ (a) **Cermet**
  - ▫️ (b) **Miracle Mix**

- ● Light-cured GIC.

- ● Hybrid (**Resin-modified GIC**).

- ● Polyacid-modified resin composite (**Compomer**).

- ● Note: Sturdevant here is basically telling you the “family tree” of GIC modifications.

---

## 5) Chemistry and setting (conventional GIC)

### A) “Same chemistry across types—different powder/particle size”

- ● Chemistry is essentially the same across types **I–III**.

- ● Variations are mainly in:
  - ▫️ Powder composition.
  - ▫️ Particle size.
  - ▫️ **P/L ratio** (powder/liquid ratio).

- ● Consistency varies widely among manufacturers:
  - ▫️ Low viscosity → very flowable mixes.
  - ▫️ High viscosity → packable mixes.

- ● Typical particle sizes by indication:
  - ▫️ Restorative: larger particles (**~50 µm**).
  - ▫️ Luting: finer particles (**~15 µm**).

---

## 6) Composition (IMP)

### A) Glass (powder) composition: what’s inside and why

- ● The glass composition varies among manufacturers, but always includes:
  - ▫️ **Silica**
  - ▫️ **Calcia**
  - ▫️ **Alumina**
  - ▫️ **Fluoride**

- ● Key concept: the **alumina : silica ratio** is critical for reactivity with polyacrylic acid.

- ● To increase radiopacity, add higher atomic number metal oxides (e.g., **barium**, **strontium**).

- ● It is **fluoroaluminosilicate glass**.

### B) Liquid composition (conventional vs modern) (IMP)

- ● Older liquids:
  - ▫️ Aqueous polyacrylic acid solutions (**~40–50%**).
  - ▫️ Problems:
    - ○ High viscosity.
    - ○ Short shelf life (gelation).

- ● Current liquids (common modern approach):
  - ▫️ Copolymers of:
    - ○ **Itaconic acid**
    - ○ **Maleic acid**
    - ○ **Tricarboxylic acids**
  - ▫️ These improve stability/handling compared with early polyacrylic acid-only liquids.

### C) Tartaric acid (rate-controlling additive): what it does (list exactly)

- ● **Tartaric acid**:
  - ▫️ Allows a wider range of glasses to be used.
  - ▫️ Improves handling.
  - ▫️ Decreases viscosity.
  - ▫️ Lengthens shelf life before gelation.
  - ▫️ Increases working time.
  - ▫️ Shortens setting time.

- ● **Itaconic acid**
  - ▫️ Promotes glass–liquid reactivity.
  - ▫️ Prevents gelation of polyacrylic acid liquid (improves shelf stability).

- ● **Maleic acid**
  - ▫️ Stronger acid effect → helps the cement harden faster and become less moisture sensitive earlier.

- ● **Tartaric acid (HIGH-YIELD)**:
  - ▫️ Controls the “speed profile” of setting by affecting pH and glass dissolution rate.
  - ▫️ In practice gives better handling; described as controlling pH during setting and typically increasing working time.
  - ▫️ Acts as a temporary “decoy” to delay hardening so you have time to mix (working time), then triggers a rapid “snap set” once it is used up (setting time).

---



## 7) Setting reaction (what happens after mixing powder + liquid) (IMP)

### A) Water is CRITICAL (two roles)

- ● Water is not “just a solvent”:
  - ▫️ **1) Reaction medium**
    - ○ Ions released from glass need an aqueous phase to move and react.
  - ▫️ **2) Part of the set structure (maturation)**
    - ○ The matrix becomes a hydrated gel over time; early water imbalance disrupts the matrix formation.

- ● That’s why early contamination/dehydration can destroy surface integrity.

### B) Critical role of water (exam framing)

- ● Water is essential, but it must be carefully balanced:
  - ▫️ **Function:** Water hydrates the salts, allows cross-linking, and acts as the medium for cation transport.
  - ▫️ **Balance:**
    - ○ Too much water dilutes ions → weak, opaque restoration.
    - ○ Too little water → desiccation → cracking and “crazing”.
  - ▫️ **Types of water:**
    - ○ Loosely bound: easily lost to desiccation.
    - ○ Tightly bound: part of the hydration shell; as this increases with aging, it improves the strength and modulus of elasticity of the base.

- ● **GIC—Why Water is Critical (balance + types of water):**

![Critical Role of Water](/assets/critical_role_of_water_step_by_step_ion_release_cross_linking_maturation_1.png)

### C) Step-by-step (ion release → cross-linking → maturation)

- ● **Step 1: Acid attack on glass surface (DECOMPOSITION)**
  - ▫️ Polyacid releases **H⁺** that attacks the glass surface → glass dissolves at reactive sites.

- ● **Step 2: Ion release (“leaching”) (Migration)**
  - ▫️ Glass releases ions into the aqueous medium:
    - ○ **Ca²⁺**, **Al³⁺**, plus **Na⁺** and **F⁻**

- ● **Step 3: Early cross-linking (initial set) (Gelation)**
  - ▫️ **Ca²⁺** first cross-links the carboxylate groups (**–COO⁻**) on polyacrylic acid chains → forms calcium polyacrylate gel network (initial hardening).

- ● **Setting Reaction Diagram:**

![Final Set Microstructure](/assets/final_set_microstructure_what_the_set_cement_is_1.png)

- ● **Step 4: Post-set hardening / maturation / strengthening**
  - ▫️ Over time, **Al³⁺** contributes stronger cross-linking (more stable polysalt network), improving final properties.
  - ▫️ Over the next **~24 hours**: **Ca²⁺ is replaced by Al³⁺** (maturation/strengthening).
  - ▫️ Further slow maturation: even after the first day, the material continues to mature, improving its translucency and resistance to acid attack and desiccation (drying out).
  - ▫️ **Na⁺** and **F⁻** do not participate in cross-linking:
    - ○ Some Na⁺ may replace H⁺ on carboxyl groups.
    - ○ F⁻ disperses within the matrix phase and remains available for release.
  - ▫️ The cross-linked phase becomes hydrated over time as it matures.
  - ▫️ The undissolved glass particles become sheathed by a silica-rich gel layer formed on their surfaces.

---

## 8) Final set microstructure (what the set cement “is”)

- ● A set GIC consists of:
  - ▫️ Undissolved glass particles
    - ○ Coated with **silica gel**
  - ▫️ Embedded in an amorphous matrix of:
    - ○ Hydrated **calcium** and **aluminum polysalts**
    - ○ Containing **fluoride**

- ● **GIC Setting Reaction + Final Set Microstructure:**

![Set GIC Microstructure](/assets/set_gic_microstructure_new.png)

---

## 9) Mechanism of adhesion to tooth (IMP)

- ● GIC bonds to tooth mainly by **chemical interaction**, not just “sticking.”

### A) Surface conditioning prepares the tooth

- ● A mild **polyacrylic acid conditioner**:
  - ▫️ Removes/cleans smear layer surface.
  - ▫️ Increases surface energy and wettability.
  - ▫️ Improves chemical bonding.

- ● Example commonly taught: **~10% polyacrylic acid for ~10 seconds** (product protocols vary).

### B) What bonds to what?

- ● Carboxylate groups (**–COO⁻**) from the cement interact with **calcium ions** in hydroxyapatite (enamel/dentin).
  - ▫️ Commonly described as **chelation / ionic bonding**.

### C) Early stage assistance: wetting + hydrogen bonding (why “glossy” matters clinically)

- ● Freshly mixed GIC has available carboxyl groups and water; rapid intimate contact supports early adhesion phenomena (including hydrogen bonding interactions described in maturation literature) before the more stable ionic exchange develops.

- ● Key exam line you can safely use:
  - ▫️ “GIC bonds to teeth by ion exchange/chelation between polyacid carboxyl groups and tooth calcium, with development of an ion-rich interfacial layer.”

- ● Cavity illustration is not accurate—just to give an idea.

- ● **GIC Chemical Adhesion to Tooth (–COO⁻ chelation to Ca²⁺):**

![Chemical Adhesion](/assets/c_early_stage_assistance_wetting_hydrogen_bonding_why_glossy_matters_clinically_1.png)

---

## 10) Clinical manipulation (cementing + restorative): the “do it right or it fails” section

### A) Conditions required for cementing fixed prostheses (8.1)

- ● For luting, these must be satisfied:
  - ▫️ Prepared tooth surface must be clean and blotted dry.
  - ▫️ Entire intaglio surface must be coated with luting cement and seated completely.
  - ▫️ Excess cement must be removed at the appropriate time.

### B) Surface preparation (conditioning) — details + purpose (8.2) (IMP)

- ● Goal: sustained adhesion requires a properly prepared tooth surface.

- ● Options described:
  - ▫️ Clean with pumice slurry to remove smear layer.
  - ▫️ OR condition/etch with:
    - ○ **Phosphoric acid 34–37%**, or
    - ○ **Polyacrylic acid 10–20%**

- ● Typical time:
  - ▫️ **10–20 seconds** conditioning.
  - ▫️ Then **20–30 seconds** water rinse.

- ● Drying:
  - ▫️ Surface should be dried but not desiccated.
  - ▫️ Must remain uncontaminated by saliva/blood.

- ● If residual dentin thickness is **< 0.5 mm**:
  - ▫️ Use a **calcium hydroxide liner** (**Ca(OH)₂**).

- ● “Surface conditioning” (IMP):
  - ▫️ Introduced by **McLean and Wilson (1977)** and termed surface conditioning.
  - ▫️ Purpose: mainly remove smear layer so GIC bonds to dentin, not the smear layer; improves wetting, promotes ion exchange, increases surface energy.
  - ▫️ Polyacrylic acid options mentioned:
    - ○ **10%**, **25%**, or **40%** solutions (examples given).
    - ○ Often recommended: passive **10 seconds** of **10%**, or **10–15 seconds** of **10–25%**.
  - ▫️ Other acids listed:
    - ○ **10% citric acid**
    - ○ **3% hydrogen peroxide**
    - ○ **25% tannic acid**
    - ○ **10% EDTA**

### C) Material preparation (mixing rules that control bonding) (8.3) (can skip)

- ● Follow the manufacturer’s **P/L ratio**.

- ● Mixing surface:
  - ▫️ Paper pad or cool, dry glass slab (retards reaction, extends working time).
  - ▫️ Slab should not be colder than the dew point.

- ● Dispense just before mixing (to avoid water evaporation → changes acid/water ratio).

- ● Incorporate powder rapidly:
  - ▫️ Usually half powder first (**5–15 s**), then remaining powder quickly.
  - ▫️ Mix by folding until a uniform, glossy appearance is achieved.

- ● Mixing time limit: should not exceed **~45 s** (may be less for some products).

- ● **Glossy appearance = critical:**
  - ▫️ Indicates unreacted polyacid is still present → needed for good bonding.

- ● **Dull appearance = bad sign:**
  - ▫️ Indicates acid has reacted too much → fewer free carboxyl groups for bonding.

![Placement and Early Protection](/assets/8_4_placement_and_early_protection_moisture_control_imp_1.png)

### D) Placement and early protection (moisture control) (8.4) (IMP)

#### 1) Restorative placement

- ● Cavity should be slightly overfilled.

- ● Freshly mixed GIC is **hygroscopic** (absorbs water).

- ● Immediately after placement, protect surface for **~5 minutes** using a plastic matrix:
  - ▫️ Prevents gaining/losing water during initial set.
  - ▫️ Too much water can dilute matrix-forming ions → disrupt hydrated matrix formation.

- ● After matrix removal:
  - ▫️ Coat surface immediately with varnish supplied with GIC or **petrolatum**.

![Resin Modified GIC](/assets/page_16_1.png)

- ● Finishing:
  - ▫️ Avoid excessive drying (dehydration → surface damage).

- ● Deck’s “effect of water on cement” (very exam-friendly) (very IMP)
  - ▫️ Dehydration → fissuring/cracking as water of hydration is lost.
  - ▫️ Saliva exposure early → surface softening because vital cement-forming ions are lost.
  - ▫️ Moisture contamination sensitivity:
    - ○ Some sources suggest up to **24 hours**.
    - ○ Others recommend protection for **10–30 minutes** after placement.

- ● Failure pattern if not protected:
  - ▫️ Surface becomes chalky/crazed and more opaque.

- ● **GIC Placement and Early Protection:**
  
  

#### 2) Luting placement

- ● Apply by plastic instrument to prosthesis.

- ● Excess cement can be removed:
  - ▫️ Immediately upon seating, or
  - ▫️ After the time stated by manufacturer.

- ● No matrix needed for initial set.

- ● After complete removal of excess:
  - ▫️ Coat margins with varnish to allow proper maturation.

---

## 11) Fluoride release (what happens after setting)

- ● After setting, GIC releases fluoride in amounts comparable to silicate cement.

- ● In vitro studies show potential inhibition of enamel/dentin demineralization.

- ● Not all clinical studies confirm prevention of secondary caries vs other materials (e.g., composites).

---

## 12) Biological and mechanical properties (conventional GIC)

### A) Biocompatibility

- ● Pulpal response to GIC is favorable and generally mild.

- ● Reasons for mild response:
  - ▫️ High buffering capacity of hydroxyapatite.
  - ▫️ Large molecular weight of polyacrylic acid prevents it from entering dentinal tubules.

- ● Comparative pulp reaction: **ZOE < Glass Ionomer < Zinc Phosphate**.

- ● Acidity: the powder-to-liquid ratio influences the acidity of the material.

- ● Deep cavities: manufacturers recommend using a **Ca(OH)₂** liner when the restoration is within **0.5 mm** of the dental pulp.

### B) Solubility & disintegration

- ● Initial solubility: high due to the leaching of intermediate products.

- ● Setting time: the complete setting reaction takes **24 hours**.

- ● Protection: cement should be protected from saliva during this initial **24-hour** period.

### C) Anticariogenic properties

- ● Fluoride is released from the matrix at the time of mixing.

- ● Physical integrity: fluoride can be released without affecting the physical properties of the cement.

- ● Release pattern:
  - ▫️ Initial release is high but declines after **3 months**.
  - ▫️ Following this decline, fluoride release continues for a long period.

- ● Fluoride reservoir: GIC can take up fluoride during topical fluoride treatments and release it again, acting as a “fluoride reservoir”.

### D) Strength, stiffness, and toughness

- ● Key comparisons:
  - ▫️ Compressive strength: similar to **zinc phosphate**.
  - ▫️ Diametral tensile: slightly higher than zinc phosphate.
  - ▫️ Modulus of elasticity: about half that of zinc phosphate → GIC is less stiff, more elastic deformation.
  - ▫️ Because it is less stiff, GIC is less desirable than zinc phosphate to support an all-ceramic crown (greater tensile stress may develop in the crown under load).

- ● Fracture toughness (as listed):

| Material | Fracture toughness (Avg) |
|---|---:|
| Hybrid Composite | **~1.84** |
| Hybrid GIC (Restoration) | **1.37** |
| Resin Cement | **1.30** |
| Amalgam | **~1.29** |
| Compomer | **~1.10** |
| Hybrid GIC (Luting) | **~0.94** |
| Conventional GIC (Restoration) | **0.72** |
| High-Viscosity GIC | **~0.59** |
| Metal-Reinforced GIC (Cermet) | **0.51** |
| Conventional GIC (Luting) | **~0.32** |
| Metal-Reinforced GIC (Admixture) | **0.30** |

- ● Hybrid GIC is the strongest GIC (as noted).

### E) Wear

- ● Restorative GICs are more vulnerable to wear than composites in toothbrush abrasion and simulated occlusal wear tests.

---

## 13) “Related cement” Zinc polycarboxylate cement (keep separate so you don’t mix it with GIC)

- ● Added as it has the same chemical bond.

### A) Working time and viscosity (figure description in text)

- ● Working time:
  - ▫️ Polycarboxylate ≈ **2.5 min**
  - ▫️ Zinc phosphate ≈ **5 min**

- ● Relative viscosities as they set:
  - ▫️ Zinc phosphate is initially more viscous but longer seating time compared with polycarboxylate and GIC.

### B) Excess cement removal (polycarboxylate)

- ● Polycarboxylate passes through a rubbery stage.

- ● Do not remove excess during rubbery stage:
  - ▫️ You may pull cement from margins → voids.

- ● Remove excess:
  - ▫️ Immediately after cementing, or
  - ▫️ After it becomes hard.
  - ▫️ (If removing later, coat prosthesis outer surface with a separating medium.)

### C) Control of working time (polycarboxylate)

- ● Cool slab lengthens working time but can thicken polyacrylic acid (hinders mixing).

- ● Refrigerating powder is useful: retards reaction without raising liquid viscosity.

- ● Polycarboxylate is more viscous than similar GIC mix but becomes thinner at high shear:
  - ▫️ Clinically: rapid spatulation + fast seating lowers viscosity for complete seating.

### D) Mechanical/biological snapshot (polycarboxylate)

- ● Compressive strength (lower than zinc phosphate).

- ● More elastic than zinc phosphate → harder to remove after setting.

- ● Acids dissolve it; low P/L ratio increases solubility.

### E) Why polycarboxylate is mentioned (and why GIC uses similar chemistry)

- ● Polycarboxylate cement is important because it was one of the first cements to show true chemical adhesion to tooth.

- ● What gives polycarboxylate its adhesion?
  - ▫️ Liquid is polyacrylic acid; carboxyl groups chelate calcium in enamel/dentin → chemical bond.

- ● Why is that relevant to GIC?
  - ▫️ GIC also relies on polyacrylic acid carboxyl groups for bonding to tooth calcium—same core adhesion chemistry idea, but with a different powder system (ion-leachable glass) and additional benefits like fluoride release.

---

## 14) Metal-reinforced glass ionomer cements (why they exist + what they actually do)

### A) What is added

- ● Metallic fillers to improve stress-bearing capacity:
  - ▫️ Alloy admixture: silver alloy powder particles mixed in → grayish, radiopaque.
  - ▫️ Cermet: silver sintered to glass particles → grayish, radiopaque.

- ● Same concerns/procedures as conventional GIC apply.

### B) Fluoride release differences (as described)

- ● Release decreases over time.

- ● Cermet releases less fluoride because some glass is metal-coated.

- ● Alloy admixture releases more because metal is not bonded to glass → more exposed glass surface for leaching.

### C) Where they are useful

- ● Core buildups for cast crowns.

- ● Restoratives on occlusal surfaces of primary molars.

- ● Benefit: adhesion + fluoride release.

### D) Limitations (must-know)

- ● Limited as an alternative to amalgam/composite for posterior restorations.

- ● In vitro: weaker than resin composite cores → do not use if cement is **> 40%** of total core buildup; use pins/retention forms if needed.

- ● Metallic fillers do not significantly improve fracture toughness compared with other restorative glass ionomers.

- ● No improvement in clinical performance/life expectancy for Class II in deciduous teeth vs conventional GIC.

- ● Practical advantage: harden rapidly → can finish sooner (useful in pedodontics).

---

## 15) High-viscosity GIC and ART (atraumatic restorative treatment)

### A) What ART is (concept)

- ● Developed for regions without electricity/water infrastructure.

- ● Uses hand instruments for:
  - ▫️ Opening cavity.
  - ▫️ Removing carious dentin.
  - ▫️ Mixing material.

- ● GIC is the “natural choice” because:
  - ▫️ Releases fluoride.
  - ▫️ Bonds chemically to tooth structure.
  - ▫️ Helpful when complete caries removal is difficult due to limited facilities.

### B) Why “high-viscosity” versions were developed

- ● Smaller glass particle sizes + higher P/L ratio.

- ● Higher compressive strength.

- ● Excellent packability/handling.

- ● Encapsulated packaging increases consistency and acceptance.

### C) ART clinical steps (as listed)

- ● Steps:
  - ▫️ 1. Isolate with cotton rolls.
  - ▫️ 2. Access lesion with hand instrument.
  - ▫️ 3. Remove soft caries with excavator.
  - ▫️ 4. Use weak acid to prepare tooth and enhance chemical bonding.
  - ▫️ 5. Place high-viscosity GIC using finger pressure.

### D) Survival rates

- ● Permanent teeth single-surface restorations retained:
  - ▫️ **99%** after **1 year**
  - ▫️ **88%** after **3 years**

- ● Sealant retention:
  - ▫️ **90%** after **1 year**
  - ▫️ **71%** after **3 years**

- ● **6.3-year** cumulative survival:
  - ▫️ ART high-viscosity GIC: **66.1%**
  - ▫️ Amalgam: **57.0%**

- ● Short-term practice studies:
  - ▫️ Suitable alternative to amalgam for Class I & II in primary teeth.
  - ▫️ Conventional prep improves Class II outcomes vs ART-only.

- ● Retrospective Class II high-viscosity GIC survival:
  - ▫️ **100%** at **1.5 years**
  - ▫️ **93%** at **3.5 years**
  - ▫️ **60%** at **6 years**

---

## 16) Resin-Modified Glass Ionomer Cement (Hybrid Ionomer)

### A) Definition / concept

- ● Replace part of the GIC liquid with water-soluble methacrylate-based monomers → resin-modified GIC.

- ● Can be chemical-cure, light-cure, or dual-cure.

- ● GIC acid-base reaction occurs along with resin polymerization.
  

### B) Chemistry and setting (what’s inside)

- ● Liquid: water solution of:
  - ▫️ Polyacrylic acid.
  - ▫️ **HEMA**.
  - ▫️ Polyacrylic acid modified with methacrylate.

- ● Powder:
  - ▫️ Fluoroaluminosilicate glass of conventional GIC.
  - ▫️ Initiators (e.g., **camphorquinone** for light curing) and/or chemical cure system.

### C) Reaction behavior

- ● Acid-base begins on mixing.

- ● Continues after polymerization but at a slower rate (less water, slower in solid phase).

### D) Bonding mechanism

- ● Same basic chelation mechanism as conventional GIC.

- ● Some speculate about “hybrid layer” infiltration into tubules, but:
  - ▫️ No conclusive evidence.
  - ▫️ Some studies show an indistinct/structureless layer at interface; others show no resin infiltration into etched dentin.

- ● Higher bond strengths to teeth/composites reported vs conventional GIC, likely due to micromechanical interlocking to roughened surface.

### E) Drawbacks you must not forget

- ● Resin polymerization causes more shrinkage than conventional GIC → can increase microleakage.

- ● Lower water and carboxylic acid contents reduce wetting → more microleakage than conventional GIC.

- ● **HEMA** release can cause pulpal inflammation and allergic contact dermatitis → less biocompatible than conventional GIC.

- ● Temperature rise during polymerization is another drawback.

### F) Liner/base role and “sandwich technique”

- ● Hybrid ionomer base/liner acts as intermediate bonding layer under composite:
  - ▫️ Adhesion to dentin reduces gap formation at gingival margins in dentin/cementum.
  - ▫️ Helps compensate for composite polymerization shrinkage.
  - ▫️ Reduces technique sensitivity.
  - ▫️ Provides fluoride anticariogenic effect.

- ● Recommended for Class II and V composite restorations in moderate/high caries risk.

### G) For Class V (cervical) restorations + Root caries (RMGIC preferred)

- ● Bonds well to dentin/cementum (ionic/chemical bond) → Class V margins often on root surface, where composite bond is more technique-sensitive.

- ● More forgiving in moisture control → cervical area hard to isolate; slight moisture contamination hurts composite bonding more.

- ● Low polymerization-shrinkage stress compared with composites → less chance of marginal gap at gingival margin.

- ● Fluoride release → helpful because Class V areas often have higher caries risk (especially root caries).

- ● Thermal expansion closer to tooth + elastic “stress absorption” → cervical region flexes (abfraction); RMGIC tolerates stress and mismatch better than brittle materials.

- ● Good marginal seal on root + less post-op sensitivity than many alternatives in real clinical conditions.

- ● Compared to conventional GIC:
  - ▫️ ✅ Higher fracture toughness, better tolerates moisture, and has lower wear.

- ● That’s why it’s a go-to for Class V cervical lesions, especially when the gingival margin is on dentin/cementum and isolation is difficult.

### H) Compared with conventional GIC, RMGIC generally

- ● ✅ Tolerates moisture better (early set) — resin polymerization gives an early “set” and reduces the extreme early water sensitivity.

- ● ✅ Has higher fracture toughness / flexural strength — resin network improves crack resistance and toughness.

- ● ✅ Shows better wear resistance than conventional GIC in many clinical situations (though it still usually wears more than composites).

### I) Water uptake and expansion (high-yield)

- ● **HEMA** increases water absorption → expansion up to **~8% by volume**.

- ● Linked to fracture of all-ceramic crowns in some contexts (core buildup or luting).

---

## 17) Calcium Aluminate Glass Ionomer Cements (hybrid calcium aluminate + GIC)

### A) What it is

- ● Hybrid material designed for luting fixed prostheses, between calcium aluminate cement and GIC.

### B) Calcium aluminate component (hydraulic cement behavior)

- ● Made by sintering high-purity **Al₂O₃ + CaO** (**~1:1 molar ratio**) → monocalcium aluminate.

- ● When mixed with water:
  - ▫️ Dissolves **Ca²⁺**, **Al(OH)₄⁻**, **OH⁻**.
  - ▫️ Weak acid-base reaction begins (powder base, water weak acid).
  - ▫️ At low water-to-cement ratios: immediate precipitation of hydrates → growth/hardening over time.

### C) Hybrid calcium aluminate GIC ingredients

- ● Powder includes:
  - ▫️ Calcium aluminate.
  - ▫️ Polyacrylic acid.
  - ▫️ Tartaric acid.
  - ▫️ Strontium-fluoro-alumino-glass.
  - ▫️ Strontium fluoride.

- ● Liquid:
  - ▫️ **~99.6% water + 0.4% additives** controlling setting.

### D) What each part contributes

- ● Glass ionomer components: early properties (viscosity, setting time, strength).

- ● Calcium aluminate: basic pH during curing, reduced microleakage, excellent biocompatibility, long-term stability/strength.

- ● Polyacrylic acid dual function:
  - ▫️ Cross-linked by Ca²⁺ from both glass and calcium aluminate.
  - ▫️ Dispersing agent for calcium aluminate.

- ● Final material: composite of hydrated ceramic + cross-linked polyacrylate polymer.

- ● Packaged in capsules for mechanical mixing.

### E) Reported handling/film thickness/expansion

- ● Surface hydroxyapatite formation in phosphate buffer reported.

---

## 18) Compomer (polyacid-modified composite)

### A) Definition (what it is trying to combine)

- ● Polyacid-modified composite made by incorporating GIC glass particles into a water-free polyacid liquid monomer with an initiator.

- ● Rationale: combine fluoride release of GIC with durability of resin composite.

- ● Properties are distinct from both composites and glass ionomers.

### B) Chemistry and setting

- ● Usually a one-paste, light-cure restorative (also powder-liquid systems for luting exist).

- ● Water-free materials contain:
  - ▫️ 1. Nonreactive inorganic fillers.
  - ▫️ 2. Reactive silicate glass particles.
  - ▫️ 3. Sodium fluoride.
  - ▫️ 4. Polyacid-modified monomers + photoactivators.

- ● Setting:
  - ▫️ Photopolymerization of acidic monomer starts the set.
  - ▫️ Intraoral water uptake starts a slow acid-base reaction → fluoride release.

- ● Moisture-sensitive → packaged to prevent moisture absorption.

### C) Bonding mechanism

- ● Restorative compomers need a dentin-bonding agent prior to placement (they lack water, so they are not self-adhesive like GIC/hybrid ionomer).

- ● Powder-liquid compomer luting systems can be self-adhesive because water in liquid makes mix acidic (like hybrid ionomers).

### D) Clinical manipulation / uses

- ● Mainly in low-stress areas (Class III and V) or as alternative to GIC/composite.

- ● Tooth should be etched before bonding agent + compomer.

- ● Finished like resin composites.

### E) Water uptake effects (important)

- ● Water absorption up to **~3.5% by weight** helps complete acid-base reaction and fluoride release.

- ● Compomers release less fluoride than conventional GICs and hybrid ionomers.

- ● Strength changes on storage:
  - ▫️ Compressive/flexural strength can decrease in saline (linked to water uptake + acid-base reaction).
  - ▫️ Surface hardness and microtensile strength may be unchanged.

- ● Silane-treated reactive glass reduces water uptake and increases strength.

### F) Clinical performance notes

- ● Not all compomers perform acceptably in Class V; color stability can be problematic (refractive index changes + staining).

- ● 24-month study: similar to composite sealants except marginal integrity.

- ● Performs as well as resin composites for Class I & II restorations and acceptable for orthodontic band luting.

---

## 19) Resin cements

- ● Resin cements polymerize by:
  - ▫️ Chemical cure.
  - ▫️ Light cure.
  - ▫️ Dual cure (majority today).

- ● Light-cure resin cement used for cementing porcelain veneers due to polymerization concerns under thick prostheses.

- ● Some systems aim to eliminate etch/prime/bond steps using acidic side-chain monomers (e.g., phosphoric acid groups) that bond to calcium → “self-adhesive resin cement.”

- ● Clinical manipulation:
  - ▫️ Monomer component is irritating to pulp.
  - ▫️ If remaining dentin **< 0.5 mm** → liner protection is important.
  - ▫️ Chemically cured resin cements: mixed **20–30 s**; slow activation gives extended working time; strength increases as cure completes.
  - ▫️ Gel stage can appear around **90 s** after mixing in some systems; excess removal at gel stage is typical (as described).

---

## 20) CRITICAL QUESTIONS

### A) Q1) Water plays two critical roles in the setting of conventional GIC. What are they and how do they work?

- ● Answer:
  - ▫️ **1) Reaction medium:** water allows the acid to attack glass and ions (**Ca²⁺/Al³⁺/etc.**) to dissolve, move, and react so the polysalt matrix can form.
  - ▫️ **2) Hydration/maturation:** the cross-linked matrix becomes hydrated over time as the cement matures; losing this water (dehydration) can cause cracking/crazing, while early contamination can wash out cement-forming ions and soften the surface.

### B) Q2) Under what condition might zinc phosphate cement be preferred over GIC for luting of ceramic crowns?

- ● Answer:
  - ▫️ When higher stiffness/support is needed: GIC has about half the modulus of zinc phosphate, so it is less stiff and can allow more elastic deformation.
  - ▫️ Under occlusal load this can increase tensile stresses in an all-ceramic crown; therefore zinc phosphate may be preferred for better rigid support.

### C) Q3) For ART, why is a high-viscosity GIC the most appropriate material?

- ● Answer:
  - ▫️ Because ART relies on hand instruments and minimal infrastructure, the ideal material must be:
    - ○ Chemically adhesive to tooth structure.
    - ○ Fluoride releasing (anticariogenic support).
    - ○ Workable in hand-mixed/field conditions.
  - ▫️ High-viscosity GICs also have improved packability and higher strength due to smaller particle sizes and higher P/L ratio.

### D) Q4) What are the advantages of incorporating polymerizing resin in GICs (resin-modified/hybrid ionomers)?

- ● Answer:
  - ▫️ Enables chemical/light/dual cure, improving early set control.
  - ▫️ Can improve early strength, extend working time (especially with some formulations), and increase translucency.
  - ▫️ Often shows higher tensile strength and improved bonding/interlocking on conditioned surfaces.
  - ▫️ But must be balanced against:
    - ○ Polymerization shrinkage.
    - ○ Increased microleakage risk.
    - ○ Water uptake/expansion.
    - ○ HEMA biocompatibility concerns.

### E) Q5) How does the compomer differ from resin-based composite?

- ● Answer:
  - ▫️ Compomer is a polyacid-modified composite: includes reactive GIC glass and polyacid-modified monomers.
  - ▫️ Sets first by photopolymerization, then undergoes a slow acid-base reaction after water uptake, leading to fluoride release.
  - ▫️ Restorative compomers require a dentin bonding agent (not self-adhesive like conventional GIC).

### F) Q6) What is the setting mechanism of calcium aluminate GIC?

- ● Answer:
  - ▫️ Calcium aluminate part behaves like a hydraulic cement: dissolves ions in water, then hydrates precipitate and harden over time.
  - ▫️ Simultaneously, the GIC portion undergoes the typical acid-base reaction, with polyacrylic acid cross-linking by Ca²⁺ ions leached from both the glass and calcium aluminate, producing a composite of hydrated ceramic + cross-linked polyacrylate polymer.
  `,keyPoints:["Composition: Fluoroaluminosilicate glass + Polyacrylic acid (Al:Si ratio critical).","Setting: Acid-base reaction. Ca²⁺ (initial set) replaced by Al³⁺ (maturation).","Adhesion: Chemical chelation to Calcium in enamel/dentin.","Water's Role: Critical for reaction & stability (Loss=Crazing, Excess=Weakness).","Modifications: RMGIC (Dual cure, HEMA), Compomer (Needs bond), ART (High viscosity).","Clinical: Condition with 10% Polyacrylic acid. Protect with varnish immediately."]},Cm=`
# GIC Notes

---

## 1) What GIC is

- ● **Glass ionomer cement (GIC)** = reaction of **fluoroaluminosilicate glass powder + polyalkenoic acid (polyacrylic acid) + water**.

- ● Developed to improve older materials (silicate) and reduce pulpal irritation; a **water-based cement**.

- ● Core feature: **chemical adhesion** to tooth structure (not just “retention by shape”).

---

## 2) Composition (what’s inside)

- ● **Powder (glass)** contains:

  - ▫️ **Silica**, **alumina**, **calcia**, **fluoride** (fluoroaluminosilicate glass).

  - ▫️ Radiopacifiers may be added: **barium / strontium** compounds.

- ● **Liquid (polyacid + water)**

  - ▫️ Older: concentrated **polyacrylic acid (~40–50%)** (more viscous, shorter shelf life).

  - ▫️ Modern: polyacid systems often include copolymers (e.g., **itaconic/maleic**-type components) to improve stability/handling.

- ● **Tartaric acid** (high-yield additive)

  - ▫️ Improves handling; decreases viscosity.

  - ▫️ **↑ working time** but **↓ setting time** (gives a better “working window” and then faster set).

---

## 3) Setting reaction (Conventional GIC) (must know)

- ● **Acid attack on glass** → glass surface dissolves → releases ions:

  - ▫️ **Ca²⁺**, **Al³⁺**, plus **F⁻** (and others depending on glass).

- ● **Initial set**:

  - ▫️ **Ca²⁺** cross-links polyacid carboxyl groups (**–COO⁻**) → early gel network.

- ● **Maturation (post-set strengthening)**:

  - ▫️ Over time **Al³⁺** forms stronger cross-links → stronger polysalt matrix.

  - ▫️ Strength and stability improve over **~24 hours and beyond** (maturation continues).

- ● **Final set structure**:

  - ▫️ **Unreacted glass particles** remain as “fillers”.

  - ▫️ Particles are often coated by a **silica-rich gel**.

  - ▫️ Matrix is a **hydrated Ca/Al polysalt** containing fluoride.

- ● **Water is critical (2 roles)**

  - ▫️ **Reaction medium** for ion transport and acid-base reaction.

  - ▫️ **Hydration/maturation** component of the set matrix (early water gain/loss damages surface).

---

## 4) Adhesion to tooth (why it bonds)

- ● Main bonding is **chemical/ionic**:

  - ▫️ Cement **carboxylate groups (–COO⁻)** interact with **calcium in hydroxyapatite**.

- ● **Conditioning** (typical concept):

  - ▫️ Mild polyacrylic-acid conditioning removes/weakens smear layer and improves wetting, so bonding occurs to dentin/enamel rather than to the smear layer.

![Chemical Adhesion](/assets/c_early_stage_assistance_wetting_hydrogen_bonding_why_glossy_matters_clinically_1.png)

---

## 5) Advantages vs Disadvantages (exam style)

### A) Advantages

- ● **Chemical adhesion** to enamel/dentin → good seal and less aggressive preparation.

- ● **Fluoride release + recharge** → anticariogenic + “fluoride reservoir”.

- ● **Thermal expansion similar to tooth** and low thermal conductivity.

- ● **Biocompatible** and tooth-colored.

### B) Disadvantages

- ● **Brittle**, low tensile strength, lower fracture toughness vs composite.

- ● **Wear resistance is lower** than composites → limits heavy occlusal use.

- ● **Moisture sensitive early**:

  - ▫️ Early water contamination → surface softening / ion loss.

  - ▫️ Early dehydration → cracking/crazing.

  - ▫️ Needs surface protection during early set/maturation.

---

## 6) Clinical uses (Type I–IX quick map)

![GIC Classification](/assets/type_i_luting_type_ii_restorative_1.png)

- ● **Type I**: luting.

- ● **Type II**: restorative.

- ● **Type III**: liner/base.

- ● **Type IV**: pit & fissure sealant.

- ● **Type V**: orthodontic luting.

- ● **Type VI**: core build-up.

- ● **Type VII**: high fluoride release.

- ● **Type VIII**: ART.

- ● **Type IX**: paediatric.

---

## 7) ART (why GIC fits)

- ● **ART (Atraumatic Restorative Treatment)** uses hand instruments and minimal infrastructure.

- ● GIC is suitable because it:

  - ▫️ Bonds chemically to tooth.

  - ▫️ Releases fluoride.

  - ▫️ Works in conservative preparations.

- ● **High-viscosity GIC**: smaller particles + higher P/L ratio → improved handling/packability and higher strength for ART-style placement.

---

## 8) Other Related Materials (more detail than before)

### A) Metal-modified GIC (why it exists + what it is)

- ● Purpose: improve stress-bearing capacity and radiopacity compared with conventional GIC.

- ● Two classic forms:

  - ▫️ **Alloy admixture**: silver alloy powder mixed into GIC → gray, radiopaque.

  - ▫️ **Cermet**: silver is sintered onto glass particles → gray, radiopaque.

- ● Still retains: chemical adhesion and some fluoride release.

- ● Limitations:

  - ▫️ Metallic fillers do **not** reliably convert it into an “amalgam-like” posterior material.

  - ▫️ Clinical performance improvements can be limited; used selectively (e.g., some core build-ups, some primary tooth indications).

---

### B) Compomer (polyacid-modified composite) — what it actually is

- ● A hybrid concept between **composite resin** and **GIC**, but it behaves closer to resin.

- ● Composition idea:

  - ▫️ Resin-based matrix that contains **reactive glass fillers** capable of acid-base reaction later.

  - ▫️ Initially **water-free** at placement.

- ● Setting mechanism (two stages):

  - ▫️ **1) Light-cured polymerization first** (like composite).

  - ▫️ **2) Later water uptake** in the mouth triggers a **slow acid-base reaction** → fluoride release.

- ● Bonding:

  - ▫️ Restorative compomers usually need a **bonding agent** (not truly self-adhesive like conventional GIC).

- ● Fluoride:

  - ▫️ Releases fluoride, but typically **less than conventional GIC/RMGIC**.

---

### C) Resin-Modified Glass Ionomer Cement (RMGIC)

- ● **Definition**: Hybrid ionomer = conventional GIC + water-soluble methacrylate resin (often HEMA).

- ● **Setting**: Sets by two reactions together: acid–base + resin polymerization; acid–base continues later but slower.

- ● **Composition**:
  - ▫️ **Liquid**: polyacrylic acid + HEMA + methacrylated polyacid (water-based).
  - ▫️ **Powder**: fluoroaluminosilicate glass + initiators (light/chemical/dual).

- ● **Bonding**: Bonds mainly by chemical chelation to tooth calcium + some micromechanical interlocking (true “hybrid layer” not consistent).

- ● **Pros vs conventional GIC**:
  - ▫️ Earlier set + better early moisture tolerance.
  - ▫️ Higher toughness/flexural strength.
  - ▫️ Better wear (still less than composite).

- ● **Cons**:
  - ▫️ Resin shrinkage + reduced wetting → more microleakage risk than conventional GIC.
  - ▫️ HEMA release → pulpal irritation/allergy.
  - ▫️ Polymerization heat.
  - ▫️ Water uptake → hygroscopic expansion (up to ~8% vol) → possible risk under all-ceramic crowns.

- ● **Clinical Use**:
  - ▫️ **Sandwich technique**: base/liner to seal dentin/cementum margins + reduce composite shrinkage gaps + add fluoride.
  - ▫️ **Class V & Root Caries**: Preferred because it bonds to dentin/cementum, tolerates moisture better, lower shrinkage stress than composite, fluoride release, better marginal seal/less sensitivity.

---

### D) Calcium aluminate–GIC hybrid (what it is, why it’s different)

- ● Hybrid between:

  - ▫️ A **calcium aluminate hydraulic cement** component (hydrates in water).

  - ▫️ A **glass ionomer** acid-base component.

- ● Why it’s made:

  - ▫️ Intended for luting with improved stability/biocompatibility in some systems.

- ● Core setting concept:

  - ▫️ Calcium aluminate hydrates form as it reacts with water.

  - ▫️ Polyacrylic acid is cross-linked by Ca²⁺ released from both the glass and calcium aluminate.

  - ▫️ Final material is a composite of **hydrated ceramic + cross-linked polyacrylate matrix**.

---

### D) Resin cements (only the essentials to not confuse with GIC)

- ● Polymerization systems:

  - ▫️ **Chemical-cure**, **light-cure**, **dual-cure**.

- ● “Self-adhesive” resin cements:

  - ▫️ Use acidic functional monomers that can bond to calcium (reduce etch/prime steps in some systems).

- ● Practical:

  - ▫️ Monomers can be irritating; deep dentin needs protection (liner when very thin dentin remains).

`,nn={subject:I.DENTAL_MATERIALS,content:Cm,keyPoints:["Composition: Fluoroaluminosilicate glass + Polyacrylic acid (Al:Si ratio critical).","Setting: Acid-base reaction. Ca²⁺ (initial set) replaced by Al³⁺ (maturation).","Adhesion: Chemical chelation to Calcium in enamel/dentin.","Water's Role: Critical for reaction & stability (Loss=Crazing, Excess=Weakness).","Modifications: RMGIC (Dual cure, HEMA), Compomer (Needs bond), ART (High viscosity).","Clinical: Condition with 10% Polyacrylic acid. Protect with varnish immediately."]},fo=[{id:"gic_mcq_1",question:"Conventional glass ionomer cement mainly sets by",options:["Acid base reaction in water based system","Free radical curing of resin monomers","Thermal fusion of glass powder particles","Chelation only without matrix formation"],correctAnswerIndex:0,explanation:"Conventional GIC hardens through an acid base reaction between polyacid and reactive glass. Ions released from the glass cross link the polyacid chains to form a polysalt matrix."},{id:"gic_mcq_2",question:"The main powder component in conventional GIC is",options:["Fluoroaluminosilicate reactive glass powder","Zinc oxide powder with aromatic oil additive","Calcium hydroxide with fillers and pigments","Silica filler with silane coupling coating"],correctAnswerIndex:0,explanation:"The reactive glass is designed to release calcium and aluminum ions during the acid attack. Those ions are essential for early set and later maturation."},{id:"gic_mcq_3",question:"The main liquid component in conventional GIC is",options:["Polyalkenoic acid in an aqueous solution","Phosphoric acid with buffering stabilizers","Eugenol containing oil based accelerator paste","Methacrylate monomers with photo initiators"],correctAnswerIndex:0,explanation:"The liquid provides polyacid chains with carboxyl groups needed for cross linking and tooth bonding. Modern systems often use copolymers to improve shelf stability."},{id:"gic_mcq_4",question:"The ion most responsible for early gelation in GIC is",options:["Calcium ions forming early ionic cross links","Aluminum ions forming immediate strong links","Fluoride ions producing early crystal growth","Sodium ions acting as main cross link source"],correctAnswerIndex:0,explanation:"Calcium is released earlier and creates the first gel network. Aluminum contributes more to later strengthening and maturation."},{id:"gic_mcq_5",question:"The primary bonding of GIC to tooth structure occurs by",options:["Ionic interaction with calcium in tooth mineral","Resin tag formation within opened tubules","Covalent linkage to exposed collagen network","Weak surface attraction without true adhesion"],correctAnswerIndex:0,explanation:"Carboxyl groups in the polyacid chelate calcium in hydroxyapatite. This creates chemical adhesion to enamel and dentin."},{id:"gic_mcq_6",question:"The anticariogenic effect of GIC is mainly linked to release of",options:["Fluoride ions from the set cement matrix","Calcium ions that harden enamel prisms","Aluminum ions that sterilize dentin tubules","Sodium ions that buffer plaque acidity"],correctAnswerIndex:0,explanation:"Fluoride release can inhibit demineralization and support remineralization. GIC can also take up fluoride later and release it again."},{id:"gic_mcq_7",question:"A key limitation of conventional restorative GIC is",options:["Brittleness with low fracture resistance","High tensile strength with tough behavior","Superior wear resistance on occlusal load","Excellent polish and high translucency"],correctAnswerIndex:0,explanation:"Conventional GIC is relatively brittle and weaker in tension. That is why it performs poorly in high stress occlusal areas."},{id:"gic_mcq_8",question:"Before placing conventional GIC, a common surface conditioner is",options:["Polyacrylic acid used briefly then rinsed","Concentrated phosphoric acid for long etch","Hydrofluoric acid used to roughen dentin","Silane primer applied to dentin surface"],correctAnswerIndex:0,explanation:"Mild polyacrylic acid cleans the surface and removes smear layer without aggressive demineralization. This improves wetting and chemical bonding."},{id:"gic_mcq_9",question:"After conditioning for GIC, the tooth surface should be",options:["Blotted dry, moist surface not overdried","Air dried until chalky white appearance","Left with visible water pooling on dentin","Coated with resin bonding agent routinely"],correctAnswerIndex:0,explanation:"Overdrying can reduce proper interaction and may pull water from the cement. A lightly moist surface supports chemical interaction and maturation."},{id:"gic_mcq_10",question:"Freshly placed conventional GIC should be protected early mainly to",options:["Prevent water gain or water loss during set","Prevent oxygen inhibition at surface layer","Prevent rapid light cure temperature rise","Prevent silane hydrolysis from contamination"],correctAnswerIndex:0,explanation:"Early water imbalance damages the developing matrix. Too much water causes washout and weakness, too little causes cracking and chalky surface."},{id:"gic_mcq_11",question:"The complete setting and maturation of conventional GIC is best described as",options:["Continues for about a day with maturation","Completed in minutes after initial gelation","Finished immediately after first surface hard","Stops once the restoration feels hard"],correctAnswerIndex:0,explanation:"GIC gains strength over time as the matrix matures and cross linking becomes more stable. The first hard feel is not the end of the reaction."},{id:"gic_mcq_12",question:"Type I GIC is most associated with",options:["Luting crowns and fixed prosthesis work","Posterior bulk restorations under heavy load","Enamel etch replacement for orthodontics","Composite repair bonding on ceramic surface"],correctAnswerIndex:0,explanation:"Type I is formulated as a luting cement with finer particles and flow suitable for seating restorations."},{id:"gic_mcq_13",question:"Type II GIC is most associated with",options:["Restorative fillings such as cervical lesions","Luting thin crowns with very low film thickness","Etching enamel to create micro retention pattern","Casting investment expansion control in lab"],correctAnswerIndex:0,explanation:"Type II is restorative grade GIC. It is used where chemical adhesion and fluoride are useful, especially in lower stress sites."},{id:"gic_mcq_14",question:"The best description of fluoride behavior of GIC is",options:["Initial burst then long term low level release","No meaningful release after the first hour","Release occurs only if resin is not present","Release causes major loss of cement strength"],correctAnswerIndex:0,explanation:"Fluoride release is highest early then declines, but continues for a long period. GIC can also be recharged with topical fluoride."},{id:"gic_mcq_15",question:"In very deep cavities close to pulp, the commonly advised liner is",options:["Calcium hydroxide as a protective base liner","Phosphoric acid as a deep conditioning step","Silane primer to improve cement coupling","Eugenol liner to strengthen the GIC matrix"],correctAnswerIndex:0,explanation:"Calcium hydroxide can protect the pulp when remaining dentin is very thin. It reduces risk of pulpal irritation from early acidity."}],yo=[{id:"gic_mcq_16",question:"Tartaric acid in conventional GIC is best known for",options:["Increasing working time while shortening set","Shortening working time while delaying set","Eliminating moisture sensitivity completely","Preventing fluoride release from cement matrix"],correctAnswerIndex:0,explanation:"Tartaric acid improves handling by giving more working time and then a faster snap set. It also helps reduce viscosity and improves consistency."},{id:"gic_mcq_17",question:"Water in GIC is best described as",options:["Reaction medium and part of set structure","Temporary solvent that must evaporate fully","Only needed for fluoride release, not setting","Only needed in powder, not in the liquid"],correctAnswerIndex:0,explanation:"Water allows ion transport during setting and later becomes part of the hydrated matrix. Early imbalance disrupts formation of the set structure."},{id:"gic_mcq_18",question:"Early saliva contamination of conventional GIC most likely causes",options:["Surface softening due to washout of ions","Higher strength due to extra hydration water","Deeper bonding due to increased tubule opening","Faster set due to dilution of polyacid chains"],correctAnswerIndex:0,explanation:"Saliva can wash out essential ions and disrupt early matrix formation, producing a weak, softened surface and poor margins."},{id:"gic_mcq_19",question:"Early dehydration of conventional GIC most likely causes",options:["Surface crazing and cracking with opacity","Improved strength due to tighter ion packing","Increased working time due to slowed reaction","Increased fluoride recharge due to open pores"],correctAnswerIndex:0,explanation:"Loss of water prevents proper hydration of the matrix and can cause cracks and chalky appearance. This reduces wear resistance and seal quality."},{id:"gic_mcq_20",question:"Restorative GIC particle size compared with luting GIC is typically",options:["Larger for restorative, finer for luting","Finer for restorative, larger for luting","Same size, only powder liquid ratio differs","Same size, only color additives are changed"],correctAnswerIndex:0,explanation:"Restorative needs packability and bulk strength, so larger particles are common. Luting needs thin film and flow, so finer particles are used."},{id:"gic_mcq_21",question:"Increasing powder to liquid ratio generally results in",options:["Higher viscosity and higher compressive strength","Lower viscosity and improved marginal wetting","Lower strength and higher long term solubility","Longer working time and delayed final set"],correctAnswerIndex:0,explanation:"More powder means more glass and more ions to form a denser matrix. It improves strength but reduces working time and increases mix stiffness."},{id:"gic_mcq_22",question:"A glossy mix appearance is clinically valued because it suggests",options:["More free carboxyl groups remain for bonding","Full completion of set reaction has occurred","Fluoride release is completed and stabilized","Maximum strength has already been achieved"],correctAnswerIndex:0,explanation:"A glossy surface indicates the mix is still reactive and has free polyacid groups that can bond to tooth mineral. A dull mix often indicates over reaction before placement."},{id:"gic_mcq_23",question:"A practical reason to avoid long slow mixing of GIC is",options:["Reaction progresses, reducing adaptation and bond","Resin polymerization begins, shrinking the cement","Tubules become occluded, preventing wetting","Fluoride becomes trapped, preventing anticaries effect"],correctAnswerIndex:0,explanation:"Prolonged mixing advances the acid base reaction early, reducing working time and leaving less ability for the cement to wet and bond effectively."},{id:"gic_mcq_24",question:"Immediate surface protection after placement is mainly to",options:["Control early water exchange at the surface","Prevent oxygen inhibition of radical curing","Prevent light activation from curing too fast","Prevent saliva from etching enamel prisms"],correctAnswerIndex:0,explanation:"The surface is the most vulnerable area early. Protection prevents washout and dehydration that damage marginal seal and surface integrity."},{id:"gic_mcq_25",question:"Initial solubility of GIC is relatively higher because",options:["Intermediate products can leach early in set","Resin phase dissolves and leaves voids rapidly","Glass fully dissolves into saliva during first hour","Hydroxyapatite buffers dissolve the cement mass"],correctAnswerIndex:0,explanation:"Early in setting, the matrix is immature and intermediate ions can leach. This is why the first day is critical for protection."},{id:"gic_mcq_26",question:"Conventional GIC is less desirable under some all ceramic crowns mainly because it has",options:["Lower stiffness that can increase ceramic tensile stress","Higher stiffness that concentrates stress at the margin","No chemical bond so it always debonds from enamel","No fluoride release so caries risk rises immediately"],correctAnswerIndex:0,explanation:"Lower modulus means more deformation under load, potentially increasing tensile stress in brittle ceramics. A stiffer base can reduce flexure in some crown systems."},{id:"gic_mcq_27",question:"Which description best fits RMGIC",options:["Acid base reaction plus resin polymerization","Only acid base reaction with no resin component","Only resin polymerization with no glass reaction","Only chelation bond with no hardening matrix"],correctAnswerIndex:0,explanation:"RMGIC has traditional GIC chemistry plus a resin component that cures, often by light or dual cure. The acid base continues slower after polymerization."},{id:"gic_mcq_28",question:"A specific drawback introduced by RMGIC is",options:["Polymerization shrinkage with leakage risk","Complete loss of fluoride release over time","Inability to bond to dentin and cementum","Extreme brittleness compared to conventional GIC"],correctAnswerIndex:0,explanation:"Resin curing causes shrinkage stress which can open margins. Conventional GIC does not have this resin shrinkage component."},{id:"gic_mcq_29",question:"A component linked with allergy or irritation in RMGIC is",options:["HEMA in the resin containing liquid system","Fluoride in the reactive glass component","Calcium in the early cross linking phase","Alumina in the glass network structure"],correctAnswerIndex:0,explanation:"HEMA can leach and has been associated with pulpal irritation and contact dermatitis in susceptible individuals."},{id:"gic_mcq_30",question:"Compomer differs most from conventional GIC because it",options:["Light cures mainly, acid base occurs after water uptake","Sets immediately only by acid base cross linking","Bonds chemically without any bonding system step","Contains no fluoride capable glass or any ion release"],correctAnswerIndex:0,explanation:"Compomers are resin based materials that cure by polymerization first. Later water uptake allows a delayed acid base type reaction and some fluoride release."}],wo=[{id:"gic_mcq_31",question:"A newly placed conventional GIC turns chalky and rough within minutes. Most likely cause is",options:["Water imbalance during early setting at surface","Excess fluoride release dissolving matrix rapidly","Oxygen inhibition preventing full polymer cure","Heat rise causing internal void formation"],correctAnswerIndex:0,explanation:"Early exposure to moisture or dehydration disrupts the hydrated matrix before it stabilizes. The surface becomes chalky and crazed, and the margin seal becomes weak."},{id:"gic_mcq_32",question:"A conventional GIC surface becomes soft after patient rinses repeatedly soon after placement. The best mechanism is",options:["Washout of ions needed for matrix development","Collapse of collagen network from over etching","Resin phase inhibition from oxygen exposure","Thermal expansion mismatch causing microcracks"],correctAnswerIndex:0,explanation:"Early saliva exposure can leach calcium and aluminum ions and disrupt the forming polysalt matrix. The surface layer becomes weak and easily abraded."},{id:"gic_mcq_33",question:"Over drying dentin before conventional GIC placement can lead to",options:["Poor set and sensitivity due to water draw from cement","Improved bond due to higher surface energy always","No change since GIC is moisture independent early","Stronger matrix due to reduced dilution effects"],correctAnswerIndex:0,explanation:"GIC needs water for ion mobility and hydration. Desiccated dentin can pull water from the cement, disrupting set and increasing post operative sensitivity."},{id:"gic_mcq_34",question:"The main reason polyacrylic acid is preferred over phosphoric acid before GIC is",options:["Preserves calcium for chemical adhesion while cleaning smear","Produces deeper etch for resin tag type retention","Eliminates need for any protection after placement","Creates higher fluoride release by exposing more glass"],correctAnswerIndex:0,explanation:"GIC relies on chemical bonding to calcium in tooth mineral. Aggressive phosphoric acid can remove too much mineral and interfere with optimal chemical interaction."},{id:"gic_mcq_35",question:"In the sandwich technique, GIC base is placed mainly to",options:["Improve seal and fluoride at dentin margins","Increase composite translucency and polish","Increase composite curing time for control","Replace bonding agent requirement entirely"],correctAnswerIndex:0,explanation:"Dentin and cementum margins are more leakage prone with composite due to shrinkage stress and technique sensitivity. GIC provides chemical adhesion and fluoride release at those margins."},{id:"gic_mcq_36",question:"A disadvantage of RMGIC compared to conventional GIC is mainly",options:["Shrinkage stress from resin cure can open margins","Immediate water sensitivity is worse than conventional","Fluoride release becomes absent after curing","Chemical adhesion to dentin becomes impossible"],correctAnswerIndex:0,explanation:"RMGIC adds resin polymerization which produces shrinkage and stress. This can increase microleakage compared with conventional GIC, even though bond strength may be higher."},{id:"gic_mcq_37",question:"A clinical concern with RMGIC relevant to ceramics can be",options:["Water uptake and expansion in resin containing systems","Complete lack of maturation after initial cure","Total loss of adhesion in moist field always","Absence of fluoride release due to resin barrier"],correctAnswerIndex:0,explanation:"Resin components can increase water absorption and expansion. In some clinical contexts, dimensional change and stress can contribute to ceramic complications."},{id:"gic_mcq_38",question:"Metal reinforced GIC was developed mainly to",options:["Improve stress bearing capacity and radiopacity","Increase translucency for anterior esthetics","Eliminate fluoride release for better polish","Replace bonding systems for composite restorations"],correctAnswerIndex:0,explanation:"Adding metallic fillers improves handling in certain stress bearing indications and increases radiopacity. It does not transform GIC into a high toughness posterior restorative like composite."},{id:"gic_mcq_39",question:"Compared to other GIC types, metal reinforced GIC generally shows",options:["Limited improvement in fracture toughness overall","Dramatic improvement making it ideal for Class II","Complete elimination of moisture sensitivity early","Much higher esthetics suitable for veneers"],correctAnswerIndex:0,explanation:"Metal fillers do not greatly improve fracture toughness compared with other restorative GICs. Clinical performance gains are limited, so indications remain selective."},{id:"gic_mcq_40",question:"High viscosity GIC differs mainly by",options:["Higher powder content and improved packability","Lower powder content and extended working time","Resin polymerization as the only set reaction","No fluoride release due to dense glass coating"],correctAnswerIndex:0,explanation:"High viscosity versions use higher powder to liquid and often smaller particles, improving strength and handling. They are designed for ART and similar situations."},{id:"gic_mcq_41",question:"ART primarily uses high viscosity GIC because it",options:["Bonds chemically and tolerates field conditions","Requires perfect isolation and rubber dam use","Needs light cure so electricity is necessary","Depends on resin tags for dentin retention"],correctAnswerIndex:0,explanation:"ART is designed for minimal equipment settings. High viscosity GIC can be placed with hand instruments, bonds chemically, and provides fluoride benefits."},{id:"gic_mcq_42",question:"A key early step after removing the matrix for GIC restoration is",options:["Apply a surface coating such as varnish or petrolatum","Etch enamel again to deepen microretention","Light cure for additional resin polymerization","Sandblast surface to raise surface energy"],correctAnswerIndex:0,explanation:"After initial protection, coating reduces further water exchange during maturation. This preserves surface integrity and reduces early dissolution and cracking."},{id:"gic_mcq_43",question:"The fluoride reservoir concept means GIC can",options:["Take up fluoride and later release it again","Release fluoride only during first few minutes","Permanently lock fluoride with no later diffusion","Release fluoride only if sealed with varnish"],correctAnswerIndex:0,explanation:"Fluoride ions can diffuse into the material from topical sources and later diffuse back out. This supports ongoing anticaries benefit in high risk patients."},{id:"gic_mcq_44",question:"If a GIC mix is made too runny by adding liquid, the likely long term outcome is",options:["Lower strength with greater solubility and wear","Higher strength with better resistance to abrasion","Higher stiffness with improved ceramic support","Faster maturation with reduced moisture sensitivity"],correctAnswerIndex:0,explanation:"Lower powder content reduces available ions and produces a more porous weaker matrix. This increases wear and marginal breakdown risk."},{id:"gic_mcq_45",question:"In compomer placement, a frequent cause of debonding is",options:["Omission of bonding system step on dentin","Excess water contamination before light cure","Use of polyacrylic acid conditioner on enamel","Immediate varnish coating after placement"],correctAnswerIndex:0,explanation:"Compomers are resin based and generally require a bonding agent for predictable adhesion. They do not inherently bond like conventional GIC. TRAP EXTREME 46–60 Long stems, clinical traps, concept heavy"},{id:"gic_mcq_46",question:"A student conditions dentin, then aggressively air dries until it looks chalky. They place conventional GIC and coat it late. Two days later, margins show cracking and sensitivity. The best explanation is",options:["Desiccation disrupted hydration and early matrix stability","Oxygen inhibition prevented full resin cure at surface","Heat from curing caused pulpal pressure changes","Fluoride burst caused dissolution of the entire matrix"],correctAnswerIndex:0,explanation:"Conventional GIC depends on water as reaction medium and as part of the hydrated structure. Over drying removes surface moisture and can pull water from cement, causing incomplete hydration, microcracking, weaker margins, and sensitivity."},{id:"gic_mcq_47",question:"A clinician mixes GIC slowly until it looks dull and loses shine. They place it anyway. It debonds early despite proper isolation. The best mechanism is",options:["Reduced availability of free carboxyl groups for bonding","Excess resin tags created a weak hybrid layer zone","Fluoride release caused immediate cohesive failure","Glass particles dissolved completely leaving voids"],correctAnswerIndex:0,explanation:"A dull mix often means the reaction advanced before placement. Fewer free carboxyl groups remain to interact with tooth calcium, reducing wetting, adaptation, and chemical adhesion."},{id:"gic_mcq_48",question:"A very cold glass slab is used for mixing. Condensation forms on the slab surface. The restoration later appears weak and opaque. The most accurate explanation is",options:["Added water contaminated the mix and diluted ion formation","Cooling increased polymerization shrinkage of resin phase","Condensation increased alumina content reducing reactivity","Cooling created more calcium cross links improving strength"],correctAnswerIndex:0,explanation:"Condensed water is direct contamination. Extra water can dilute the early ionic environment and disrupt matrix formation, producing weak opaque material and poor surface integrity."},{id:"gic_mcq_49",question:"A patient rinses repeatedly within minutes after conventional GIC placement and the surface becomes soft. Which is the most defensible mechanism",options:["Early washout of ions before matrix becomes stable","Oxygen inhibition prevented polymerization of surface","Acid etch collapsed collagen and reduced infiltration","Thermal mismatch caused immediate marginal cracking"],correctAnswerIndex:0,explanation:"In the earliest phase, the cement surface can lose calcium and aluminum ions into oral fluids. That compromises the developing polysalt matrix and creates a soft surface layer."},{id:"gic_mcq_50",question:"A Class II composite restoration has a gingival margin on dentin in a high caries risk patient. Best strategy to reduce gap risk is",options:["Use a sandwich base to seal dentin margin chemically","Use compomer alone to combine both properties","Use zinc phosphate base to increase fluoride release","Use resin cement base to eliminate polymerization stress"],correctAnswerIndex:0,explanation:"Composite shrinkage stress makes dentin margins vulnerable to microleakage. A GIC or RMGIC base can bond to dentin and provide fluoride at the margin, improving seal and reducing sensitivity and caries risk."},{id:"gic_mcq_51",question:"Someone claims water is only a solvent in GIC and strength improves when all water is removed. The best correction is",options:["Water is also structural, loss causes cracking and weakness","Water only affects color, not strength or adhesion","Water is irrelevant after the first minute of set","Water is harmful, removal always increases strength"],correctAnswerIndex:0,explanation:"Water is needed for ion transport and becomes part of the hydrated matrix. Removing water disrupts hydration and causes shrinkage, crazing, and loss of integrity."},{id:"gic_mcq_52",question:"A ceramic crown fractures after luting with RMGIC in a heavy bruxer. Which material related factor is most consistent with known behavior",options:["Water uptake and expansion in resin containing system","Total absence of acid base reaction after curing","Fluoride release created massive porosity immediately","Complete dehydration increased stiffness beyond ceramic"],correctAnswerIndex:0,explanation:"RMGIC includes hydrophilic resin components and can absorb water, potentially expanding. In a brittle ceramic under stress, any additional stress and dimensional change can contribute to crack propagation."},{id:"gic_mcq_53",question:"A faculty member prefers zinc phosphate rather than GIC for some all ceramic crowns. The best rationale is",options:["Higher stiffness gives more rigid support to brittle ceramic","Strong fluoride reservoir improves enamel remineralization","Higher elasticity reduces stress concentration at margin","Faster setting eliminates need for moisture protection"],correctAnswerIndex:0,explanation:"A lower modulus cement may allow more flex under load, increasing tensile stress in the ceramic. A stiffer cement can provide more rigid support in selected cases."},{id:"gic_mcq_54",question:"A compomer restoration in a cervical lesion debonds. The operator used no bonding system because they assumed it bonds like GIC. The best explanation is",options:["Compomer is resin based and typically needs adhesive bonding","Compomer has no fluoride release so adhesion fails always","Compomer sets only by acid base and stays weak","Compomer requires varnish coating to form chemical bond"],correctAnswerIndex:0,explanation:"Compomers are polyacid modified composites. They cure mainly by polymerization and usually require an adhesive system for dentin bonding, unlike conventional GIC chemical adhesion."},{id:"gic_mcq_55",question:"A clinician says fluoride release weakens GIC so high fluoride versions must be mechanically poor. The best correction is",options:["Fluoride release can occur without major integrity loss","Fluoride release always dissolves the matrix extensively","Fluoride release stops once varnish is applied","Fluoride release occurs only in the first minute"],correctAnswerIndex:0,explanation:"Fluoride release is mainly by diffusion and ion exchange and can occur without significant loss of bulk properties. Mechanical weakness is more related to brittleness and tensile limits, not fluoride release alone."},{id:"gic_mcq_56",question:"In ART, the most important reason high viscosity GIC is preferred is",options:["Chemical adhesion and fluoride benefit in limited conditions","Mandatory light curing that ensures full depth conversion","Perfect isolation requirement to prevent immediate failure","Reliance on resin tags for retention in dentin tubules"],correctAnswerIndex:0,explanation:"ART is designed for minimal equipment and imperfect conditions. High viscosity GIC offers packability, chemical adhesion, and fluoride release, and works with hand instrumentation."},{id:"gic_mcq_57",question:"A student asks why finishing conventional GIC too early is discouraged. Best answer is",options:["Maturation is ongoing and dehydration risk is higher early","Resin polymerization remains incomplete for several days","Fluoride release has not started until after polishing","Conditioning cannot work unless finishing is delayed"],correctAnswerIndex:0,explanation:"Conventional GIC continues to mature for many hours. Early finishing can expose the surface to dehydration and disrupt the immature matrix, increasing wear and cracking risk."},{id:"gic_mcq_58",question:"A clinician claims conditioning before GIC is useless because GIC bonds anyway. Best correction is",options:["Conditioning cleans smear layer and improves wetting and bonding","Conditioning creates deep resin tags as main retention method","Conditioning removes fluoride so anticaries effect decreases","Conditioning increases brittleness so it is usually avoided"],correctAnswerIndex:0,explanation:"Smear layer can block chemical interaction and reduce surface energy. Mild conditioning improves wetting and allows better ionic interaction at the interface."},{id:"gic_mcq_59",question:"A high caries risk patient has multiple cervical root lesions and isolation is difficult. Most defensible material choice is",options:["RMGIC due to dentin bonding and cervical performance","Conventional GIC because it always has higher toughness","Composite because it always seals dentin better than GIC","Amalgam because it bonds chemically to cementum"],correctAnswerIndex:0,explanation:"Cervical lesions often involve dentin or cementum margins. RMGIC provides chemical adhesion and fluoride and is more forgiving in moisture challenged cervical areas than composite."},{id:"gic_mcq_60",question:"A student asks why GIC needs protection even after it feels hard. Best explanation is",options:["Maturation continues and hydration stability develops over time","Once hard, the reaction stops and protection is only cosmetic","Only fluoride release continues, strength is fixed immediately","Protection is needed only to keep color stable, not chemistry"],correctAnswerIndex:0,explanation:"Early hardness reflects initial gelation, not full maturation. Cross linking becomes more stable and hydration structure develops with time, and early water imbalance can still damage surface and margin"}],Im=[...fo,...yo,...wo],xm=String.raw`

## **Dental Ceramics —**

### **1) Introduction / Definition**

- Dental ceramics are **tooth-colored restorative materials** and are considered among the **most durable esthetic materials** used in dentistry.
- Ceramics are **crystalline compounds** made of metallic + non-metallic components, and their properties differ from their individual constituents.
- Traditional porcelain production used **kaolin + silica + feldspar**; blending these produced porcelains with **translucency + added strength** needed for dental restorations.
- Porcelains are described as **decorative vs dental porcelains**. Dental porcelains have **little or no kaolin** and are often more correctly described as **dental glasses**.
- General concept: porcelain is basically a **glassy silica network** based on silica + feldspar, with other additives in smaller amounts.

## 
![Image](images/ceramics/glassy_silica_network.jpg)

## **General Properties**

- **Biocompatibility:** Highly biocompatible; do not react with oral fluids; resistant to corrosion.
- **Esthetics:** Excellent potential to match natural tooth color (hue, chroma, value) and translucency.
- **Insulation:** Excellent thermal and electrical insulators (unlike metals).
- **Brittleness:** High compressive strength but low tensile strength. Susceptible to fracture from surface flaws (micro-cracks).
- **Hardness:** Generally harder than tooth enamel, which can lead to wear of opposing natural teeth if the ceramic is rough.

---

## **2) Composition of Dental Porcelain **

### **A) Feldspar (major component)**

- **60–80%**. Chemically: potassium and sodium aluminosilicates:

- K₂O·Al₂O₃·6SiO₂ and Na₂O·Al₂O₃·6SiO₂

- Naturally occurring. When heated, it fuses around **1290°C**, becomes glassy, and (if not overheated) **retains form without rounding**, helping restorations keep shape during fusing.
- Functions (important exam wording):

- “**Basic glass forme**r”; potassium feldspar forms a crystalline mineral **leucite** along with the glass phase.
- **Sodium** lowers the fusion temperature.
- **Potassium** increases viscosity of molten glass → helps control porcelain flow/slumping during firing.

### **B) Silica (quartz)**

- **15–25%**; obtained by grinding pure quartz.
- Acts as **refractory skeleton** → provides **strength and hardness** during fusing; remains unchanged during firing; dispersed throughout the glassy phase.

### **C) Kaolin (clay)(skip)**

- Hydrated aluminosilicate: **Al₂O₃·2SiO₂·2H₂O**, about **3–5%** (mainly in decorative porcelain).
- Gives **opacity** to the mass; some systems may use sugar or starch instead.
- Modern dental porcelain:it **does not contain kaolin**, so it can be viewed as **feldspathic glass with crystalline inclusions**.

### **D) Alumina (Al₂O₃)**

- Single-crystal alumina is “**sapphire**”; “blue sapphire” is alumina with Fe and Ti impurities.
- Replaces some silica in glass matrix; gives **strength + opacity**; alters softening point and **increases viscosity during firing**.

### **E) Metallic pigments (shade modifiers)**

- About **1%**; used to match natural tooth shades. Pigments are stable at fusion temperature and are typically metal oxides (tin, nickel, cobalt, titanium, iron, gold).

![Image](images/ceramics/metallic_pigments.png)

### **F) Glass modifiers(fluxes)**

- **Types:** Oxides of Potassium, Sodium, or Calcium.
- Metal ions added to control: **fusion temperature, sintering temperature, thermal contraction coefficient, solubility**. They can lower fusion temperature and increase flow during firing, and remove impurities. 
- *Drawback:* Too high a concentration reduces chemical durability (resistance to fluids).

**G) Fluxes**

- Low-fusing glasses added to reduce the temperature needed to **sinter porcelain powder particles together**.

![Image](images/ceramics/fluxes.png)

---

## **3) Manufacture of Porcelain Powder (how the powder is made)**

### **Fritting (core manufacturing method)**

- Components are mixed and fused, then **quenched in water while red hot**. Quenching causes cracking/fracturing throughout the fused mass → forming a **frit**, which is then ground to a fine powder.
- Porcelain fusion in the lab is described as essentially **remelting the fluxes**.
- ![Image](images/ceramics/fritting.png)

### **Phases after manufacturing / firing**

- Two principal phases:

- **Glass phase**: formed during firing process.
- **Crystalline/mineral phase**: includes silica, alumina, and certain metallic oxides (coloring agents/opacifiers) such as iron/tin/titanium oxides.

![Image](images/ceramics/phases_after_firing.jpg)

---

## **4) Applications of Dental Ceramics (where used)**

- Single unit crowns: **Porcelain jacket crown (PJC)**, **PFM (metal-ceramic crown)**, **castable glass ceramic crowns**.
- Veneers for crowns/bridges; artificial teeth; inlays/onlays; ceramic orthodontic brackets; prefabricated labial veneers.

---

## **4. Classification of Dental Ceramics**

### **A. By Fusing Temperature**

- High Fusing (>1300°C): Used for denture teeth.
- Medium Fusing (1100°C – 1300°C): Used for denture teeth and presintered zirconia.
- Low Fusing (850°C – 1100°C): Used for crown and bridge veneer ceramic.
- Ultra-low Fusing (<850°C): Used for veneers on titanium or special alloys.

![Image](images/ceramics/classification_fusing.jpg)

### **B. By Microstructure (Crystal Phase)**

- Glass-based (Amorphous): High translucency, lower strength.
- Glass-based with Fillers (Leucite, Lithium Disilicate): Balanced esthetics and strength.
- Crystalline-based (Alumina, Zirconia): High strength, high opacity, no glass matrix (polycrystalline).

![Image](images/ceramics/microstructure.jpg)

Can be seen on the above diagram in **Phases after manufacturing / firing**

as well 

### **C. By Fabrication Method**

- Sintering: Fusing powder particles by heat (e.g., Feldspathic porcelain).
- Castable/Heat-Pressed: Lost-wax technique used to press ceramic ingots (e.g., IPS Empress, e.max).
- Slip-Casting: Building a core on a porous die, sintering, then infiltrating with glass (e.g., In-Ceram).
- CAD/CAM: Milled from ceramic blocks (hard machining or soft machining).

---

## **6) Porcelain Fabrication (clinical/lab workflow in the )**

![Image](images/ceramics/fabrication.jpg)

### **Step 1: Platinum foil on the die**

- Working die is covered with **platinum foil ~0.025 mm** thick.
- Purpose:

- Retains porcelain mix in shape during firing
- Determines accuracy/fit of the restoration

### **Step 2: Build-up with porcelain slurry**

- Porcelain powder is mixed with water or supplied liquid and applied over platinum foil. The steps listed:

- **Compaction**
- **Firing**
- **Glazing**
- **Cooling**

**A) Compaction (condensation)**

- Defined as condensing mixed powder over the die by
- Process of packing porcelain powder/liquid mix.
- **Methods:** Vibration, Spatulation, Brush technique.
- **Purpose:** To remove excess water and reduce air voids.
- **Result:** Why it matters: condensation reduces **firing shrinkage and porosity**.

**THE MOST IMPORTANT STEP **

| **Error** | **Consequence (The Result)** |
| --- | --- |
| **Trapped Air / Voids** | The crown becomes **porous** (full of tiny holes), making it weaker and potentially opaque/chalky. |
| **Excess Water Left In** | The particles remain too far apart, leading to **excessive firing shrinkage**. |
| **Poor Packing Density** | The crown may distort or end up undersized, meaning it **won't fit the die** correctly after firing. |

### **B) Sintering (Firing)**

**Summary Checklist for Firing:**

**To ensure high-quality dental restorations, follow these essential firing precautions:**

- **Pre-Drying Phase: Perform a 5–10 minute pre-heat at the furnace door to eliminate moisture and prevent steam explosions.**
- Vacuum Application: Maintain the correct vacuum pressure (hPa) to remove air and achieve maximum translucency in the ceramic.
- **Controlled Cooling: Use a long-term or slow-cool cycle to avoid internal stress and prevent the material from cracking.**
- Regular Calibration: Calibrate the furnace monthly with silver wire to ensure the temperature remains accurate and prevents over-firing.
- Quality Assurance: These steps guarantee that the transition from a "Medium Bisque" to a finished product remains precise and stable.




- **Firing = complete *sintering* of powder particles together.(heating to melt and have them joined )**
- Heating the particles until they fuse at contact points.

- **Vacuum Firing:** Essential to reduce porosity. Air pressure is reduced, causing air bubbles to expand and escape or be compressed to negligible sizes upon return to atmospheric pressure.
-  firing mainly sinters(join) particles into a homogeneous mass.
- Done in a **muffle (electric) oven** with a pyrometer.
- **Stages:** Low bisque, Medium bisque, High bisque.

| **Stage** | **Surface Appearance** | **Internal Structure** | **Physical Properties** | **Use Case** |
| --- | --- | --- | --- | --- |
| **1. Low Bisque** | **Matte & Dull.** No shine; looks like dry chalk or plaster. | High porosity. Particles have just begun to "handshake" (initial necking). | **Very fragile.** Edges can be easily rubbed away with a finger. | Best for **initial build-up** and adding bulk ceramic material. |
| **2. Medium Bisque** | **Slight Sheen.** A faint "eggshell" or satin glow starts to appear. | Porosity is decreasing. Particles are bonding significantly. | **Stronger but carvable.** Can be shaped with abrasive stones/burs. | **The "Try-In" stage.** Dentist checks the fit and bite in the patient's mouth. |
| **3. High Bisque** | **Smooth & Glassy.** Surface is mostly sealed; looks like a real tooth. | Minimal porosity. The ceramic has reached near-maximum density. | **Very Hard.** Harder than natural tooth enamel; difficult to adjust. | **Final Characterization.** Ready for the final glaze or stain layer. |

**keep the ceramic away from the furnace walls,why?**

- Temperature is not uniform near the heating elements/walls → you can get overheating on one side.
- Uneven heating causes thermal gradients → warpage/slumping, uneven sintering, internal stresses.
- It also reduces direct radiant heat “hot spots” and helps the restoration heat more evenly from all sides.

![Image](images/ceramics/sintering_furnace.jpg)


### 

### **C) Glazing + Cooling**

- Glazing stage is reached in the last firing. Can be:

- **Self-glaze** (surface glass flow)
- **Applied glaze** (adding low-fusing glass)

- Self-glaze is preferred because applied glaze contains more glass modifiers, has lower firing temperature, and has **lower resistance to oral fluids**.
- Purpose of glazing: produce a **smooth, shiny, impervious** surface.
- Cooling should be gradual and uniform to avoid **crazing**.

![Image](images/ceramics/glazing_cooling.jpg)

---

## **7) Properties of Fused Porcelain (high-yield points)**

### **Strength profile (why ceramics fail)**

- Firing shrinkage occurs; compensated by oversized crown design and precise compaction + firing control.
- Porcelain has good strength but is **brittle** and tends to fracture.
- **Compressive strength high**, but **tensile strength low** due to unavoidable surface defects (porosities, microscopic cracks).
- **Shear strength low** because of lack of ductility from complex porcelain structure.

### **What affects strength (exam list)**

- Composition
- Surface integrity: microscopic cracks/porosities reduce strength
- Firing procedure: inadequate firing and over-firing weaken structure

![Image](images/ceramics/strength_factors.jpg)

### **Physical/clinical behavior**

- High elastic modulus.(will not bend)
- Much harder than natural teeth → can wear opposing natural teeth; wear resistance higher than natural teeth.
- Low thermal conductivity.
- Coefficient of thermal expansion close to natural teeth; fired porcelain is dimensionally stable.
- Chemical stability: insoluble/impermeable to oral fluids, resistant to most solvents; excellent esthetics and biocompatibility.

---

## **8) Ceramic Strengthening (how ceramics are made tougher/stronger)**

- Modern strengthening comes from modifying porcelain microstructure; major contribution: adding a **secondary crystalline phase**; newer all-ceramic systems use various reinforcement crystals.
- Two strategic approaches described:

- **Core + veneer concept**: high-strength but less esthetic core veneered with lower-strength esthetic porcelain.
- Develop a single ceramic with both good esthetics + high strength by reinforcement (no additional layer needed).

### **Mechanisms: IMP**

- Minimize stress concentration by proper restoration design.
- Reduce size/number of surface flaws → large increase in strength (one reason for glazing).
- Interrupt crack propagation:

- Tough particles absorb crack energy and reduce driving force (example: alumina dispersion).
- Crystal structural change under stress absorbs crack energy (example: zirconia transformation toughening; partially stabilized zirconia PSZ “smart ceramic”).

---

## **9) Metal-Ceramic Restorations (PFM)**

## **Metal-Ceramic Systems (PFM/MC)**

- **Concept:** A metal substructure (coping) provides strength, veneered with porcelain for esthetics.
- **Layers:**

- **Opaque Porcelain:** Masks the metal color; initiates the bond.
- **Body (Dentin) Porcelain:** Provides bulk shade.
- **Incisal (Enamel) Porcelain:** Provides translucency.
- **Glaze:** Seals surface flaws.

(images/ceramics/pfm_layers_1.jpg)

(images/ceramics/pfm_layers_2.jpg)

### **Bonding Mechanisms (Porcelain to Metal)**

- **Chemical bonding**: metal oxides on alloy react with porcelain to form chemical bond:

- Noble alloys: tin + indium oxides
- Base alloys: chromium oxides or titanium oxides

- **Mechanical Interlocking:** Sandblasting the metal creates micro-retention it flows into surface irregularities → mechanical interlocking.

- **Compressive Bonding (Thermal Compatibility):**If porcelain contracts less than alloy on cooling, porcelain is left in residual compression → higher applied stress required to fail the bond. The Coefficient of Thermal Expansion (CTE) of the metal must be *slightly higher* than the porcelain. Upon cooling, the metal shrinks more, placing the porcelain in compression (porcelain is strong in compression).

![bonding_mechanisms](images/ceramics/bonding_mechanisms.jpg)

### **Technical Failures in PFM**

- **Delamination:** Separation at the metal-oxide interface (oxide improperly formed).
- **Cohesive Fracture:** Breakage within the porcelain itself (stress or flaws).
- **Porosity:** Caused by improper condensation or firing without vacuum.

---

## **10) Requirements for Alloys Used in PFM**

Alloy must:

- Withstand porcelain firing without melting or sag (creep). Melting range should be **100–150°C higher** than porcelain firing temperature.
- Contract slightly more than porcelain → creates residual compression (“compressive bonding”).
- Have high modulus of elasticity and high yield strength → rigid metallic support.

---

## **11) Requirements for Porcelain Used in PFM + Practical Thicknesses**

- Porcelain must have close coefficient of thermal expansion/contraction with metal to avoid thermal stresses during cooling.
- Practical tooth preparation guideline (important numbers):

- About **1.5 mm** tooth structure removed to allow space for:

- metal coping **0.3–0.5 mm**
- porcelain veneer **~1.0 mm**

- Opaque porcelain is applied around **0.3 mm**, fired, then built with translucent porcelain; final glaze applied.

![PFM](images/ceramics/pfm_requirements.jpg)


---

## **12) Types of Alloys Used for PFM IMP**

- **Noble metal alloys**: high gold, gold-palladium, palladium-silver, high palladium.
- **Base metal alloys**: silver-palladium, nickel-chromium, titanium alloys.

**1. High Noble Alloys (High Gold)**

- **Definition:** Contains at least 40% Gold and at least 60% total noble metal content (Gold + Platinum/Palladium).
- **Advantages:**

- **Biocompatibility:** Most "tissue-friendly" option; non-corrosive and non-allergenic.
- **Fit/Accuracy:** Low casting shrinkage (approx. 1.2%) allows for the most precise margins.
- **Esthetics:** Warm yellow color is easier to mask with thin layers of porcelain.
- **Bonding:** Forms a predictable, thin oxide layer for chemical bonding.

- **Disadvantages:**

- **Mechanical Weakness:** Low Modulus of Elasticity (flexible). Requires thicker metal coping to prevent porcelain cracking.
- **Low "Sag" Resistance:** Low melting temperature means metal can deform under high heat.
- **Cost:** Extremely expensive.

**2. Noble Alloys (Silver-Palladium / High Palladium)**

- **Definition:** Contains at least 25% noble metal content. (Note: Silver-Palladium is Noble, not base metal).
- **Advantages:**

- **Strength:** Stiffer and harder than high gold; better resistance to sagging.
- **Cost-Effective:** Cheaper than high-gold while maintaining noble properties.
- **Thermal Compatibility:** CTE matches most porcelains well.

- **Disadvantages:**

- **Silver Greening:** Silver can vaporize and tint porcelain greenish-yellow.
- **Oxidation:** Palladium-Copper versions form dark, heavy oxides that are hard to hide.

**3. Base Metal Alloys (Ni-Cr, Co-Cr)**

- **Definition:** Contains less than 25% noble metal (usually 0%).
- **Advantages:**

- **High Modulus of Elasticity:** Stiffest alloys; can be cast very thin (0.1–0.3 mm) for long-span bridges.
- **High Melting Point:** No risk of sagging during firing.
- **Low Cost:** Most economical choice.

- **Disadvantages:**

- **Biocompatibility:** Nickel is a common allergen; can cause gingival tattooing.
- **Poor Castability:** High casting shrinkage (approx. 2.3%) makes marginal fit difficult.
- **Bonding Failures:** Thick, dark oxide layer can lead to porcelain peeling (adhesive failure).

## **4. Summary Table for Exams**

| **Feature** | **High Noble (Gold)** | **Noble (Ag-Pd)** | **Base Metal (Ni-Cr)** |
| --- | --- | --- | --- |
| **Noble Content** | 60% | 25% | < 25% |
| **Stiffness** | Low (Needs Bulk) | Medium | High (Can be Thin) |
| **Casting Shrinkage** | Low (Best Fit) | Moderate | High (Hard to Fit) |
| **Esthetics** | Excellent (Yellow) | Good (Silver) | Poor (Dark Oxides) |
| **Major Risk** | Sagging in furnace | "Greening" of porcelain | Nickel Allergy |

---

| **Metal Alloy Type** | **Melting Range (°C)** | **Sag Resistance** | **Best Usage Case** |
| --- | --- | --- | --- |
| **High Noble (Au-Pt-Pd)** | 1,150°C – 1,300°C | High | Premium restorations and biocompatibility |
| **Noble (Pd-Ag or Pd-Cu)** | 1,200°C – 1,380°C | Very High | High-stress areas and long-span bridges |
| **Base Metal (Co-Cr)** | 1,320°C – 1,450°C | Excellent | Maximum rigidity and thin-walled castings |
| **Base Metal (Ni-Cr)** | 1,250°C – 1,350°C | Good | General purpose; high strength-to-weight |

---

## **13) Tooth Preparation Notes for**

- Provide space for metal coping.
- Shoulder for porcelain, chamfer or bevel for metal coping to promote metal flow and better marginal esthetics.
- Capillary technology (Captech): metal substructure formed with melting metal loaded wax strips.
- Bonded platinum foil: two platinum foils; outer tin-plated for porcelain bonding; inner foil removed before cementation; outer remains bonded to ceramic; reduces coping space (alternate approach).

---

## **14) Nature of the Ceramo-Metallic Bond (3 mechanisms)**

- **Mechanical bonding**: if porcelain wets metal effectively, it flows into surface irregularities → mechanical interlocking.
- **Chemical bonding**: metal oxides on alloy react with porcelain to form chemical bond:

- Noble alloys: tin + indium oxides
- Base alloys: chromium oxides or titanium oxides

- **Compressive bonding**: if porcelain contracts less than alloy on cooling, porcelain is left in residual compression → higher applied stress required to fail the bond.

---

## **15) Failure of Ceramo-Metal Bond (what pattern means what)**

- With gold alloys and porcelain, strong bonds form; in testing, **cohesive failure of porcelain** usually indicates **good bonding** between metal and porcelain.
- With base metal alloys, failure tends to occur at the interface (**adhesive failure**) because of:

- high compressive residual stress due to excessive alloy shrinkage
- excessive oxidation at the interface

---

## **16) Full Ceramic Restorations **

### **A) Alumina inserts / aluminous porcelain**

Add aluminium ceramic(aluminum oxide ) as a core instead of normal porcelain core 

- Earlier porcelain jacket crowns (high fusing feldspathic porcelains) fractured easily. Alumina-reinforced porcelain (1965) with increased alumina content **40–50%** overcame this problem.
- Used as **inner layer (core)** of jacket crown; acts as stronger core ceramic instead of metal core; conventional body/enamel porcelains are condensed and fired over it.
- Strength: about **twice as strong** as conventional porcelains;** sufficient for anterior teeth; considered inadequate for posterior; less expensive than metal-ceramic and requires less tooth removal.**

### **B) Sintered alumina core ceramics (Incerams)**

- Alumina core is made over die and fired → strengthens core + reduces porosity; outer core painted with glass slurry and fired again; dentin/enamel porcelains then built and fired over core.
- **Crowns have good fit and marginal adaptation, good esthetics; reported as best strength among all-ceramic restorations; described as strong enough for anterior bridge use.**

**In this the alumina particles are joined with each other instead of just floating in a glass matrix**

(images/ceramics/pfm_requirements_2.png)

### **C) Injection molded / pressed ceramics (IPS Empress)**

- Injection molding used to make core layer:

- plastic mass heated to **180°C**
- injected under air pressure **1,500 psi**
- fired at **1300°C** to form core

- Better fit than hand condensation due to lower firing shrinkage.
- No metal coping → improved esthetics; strength similar to aluminous core materials. Limitation: complexity + cost + special equipment; may fracture in posterior use.

**Make a negative replica of the crown heat the ceramic to be liquid and press it in shape of the mould with pressure **

### **. Benefits & Limitations **

- **Esthetics:** Excellent. Because there is no metal "coping" underneath to block light, the tooth looks translucent and natural.
- **Strength:** Good (~160 MPa for original Empress), but **not strong enough for molars** or bridges (Zirconia is used for that now).
- **Use:** Best for **Front teeth (Veneers, Anterior Crowns)** where beauty is more important than biting force.

**Bottom Line:** You can think of it as "High-Pressure Die Casting" for porcelain.

### **D) Castable glass ceramics (DICOR) + polycrystalline ceramics**

**DICOR casting process (high-yield steps):**

- Desired shape formed in glass then heat treated.
- Glass casting similar to metal casting:(see casting same process just use molten ceramic instead of metal)

- wax pattern invested in phosphate-bonded investment
- wax burnout at **950°C**
- molten ceramic cast centrifugally at ~**1350°C**
- results in transparent glass crown → heat treated at **1075°C for 10 hours**

**C and D are the same basic process use lost wax technique to make mould and then use pressure or centrifugal casting to get a ceramic crown **

| **Feature** | **C (DICOR)** | **D (IPS Empress / Pressed)** |
| --- | --- | --- |
| **Mould Method** | **Lost Wax** | **Lost Wax** |
| **Fill Force** | **Centrifugal (Spinning)** | **Pressure (Plunger)** |
| **Material State** | **Liquid (Molten Glass)** | **Viscous (Soft Taffy)** |
| **Final Result** | **Glass-Ceramic Crown** | **Glass-Ceramic Crown** |

**Ceramming (heat treatment effect):**

- Causes partial crystallization to mica-like crystals:

- slightly reduces translucency
- significantly increases strength

- Final shading via external staining; strength comparable to aluminous porcelains.
- Casting technique offers accurate fit and may be strong enough for posterior use without alloy substructure.

**Y-TZP zirconia (polycrystalline “smart” ceramic)**

- Based on yttrium tetragonal zirconia polycrystals; yttrium oxide blended with zirconium oxide → partially stabilized zirconia.
- Very high flexural strength reported (**900–1200 MPa**) and high fracture toughness; attributed to polycrystalline structure and **transformation toughening** (crystal structure change under stress).

**What zirconia is:**

**Zirconia (ZrO₂)** is a very strong dental ceramic used mainly for **crowns/bridges**, made as **industrial “discs/blocks”** and shaped by **CAD/CAM milling**, then **sintered (fired)** to full strength. Its key advantage is **transformation toughening**: when a crack tries to grow, zirconia changes crystal phase locally and **puts the crack under compression**, so the crack **stops** → that’s why zirconia is the **toughest** common ceramic.

 **Transformation toughening**:

This might be stupid analogy but think of it someone trying to open ur bag and ur not letting it be opened 



- **The "Bag Opening" = The Crack**

- When a material breaks, it is basically being pulled apart (Tensile Stress). The "zipper" is trying to slide open.

- **"You Compressing the Bag" = The Crystal Expansion**

- Just as the bag tries to open, the Zirconia crystals next to it suddenly **get bigger** (Phase Transformation).
- This sudden expansion pushes against the "bag" from the outside.

- **"Not letting it be opened" = Compressive Stress**

- Your hands squeezing the bag represent the **Compressive Force**. It is physically impossible for the bag (crack) to open if the pressure pushing it closed is stronger than the pressure pulling it open.
![Image](images/ceramics/bag_analogy.jpg)

### **1. The Science (Simplified)**

Zirconia exists in two different crystal shapes depending on temperature and pressure:

- **Tetragonal Phase:** The "Standard" shape. It is compact and stable at room temperature (in the crown).
- **Monoclinic Phase:** The "Expanded" shape. It is about **4% larger** in volume.

### **2. How it Works (The Mechanism)**

- **The Threat:** A tiny crack starts to form in the Zirconia (from chewing or grinding).
- **The Trigger:** The high energy/stress at the tip of the crack disturbs the nearby crystals.
- **The Transformation:** This stress causes the nearby **Tetragonal** crystals to instantly snap into the **Monoclinic** phase.
- **The Effect:** Because the Monoclinic phase is **bigger**, the crystals expand.
- **The Result ( clamping):** This expansion **squeezes the crack shut**. It compresses the area around the crack tip, preventing it from growing any further.
![Transformation toughening](images/ceramics/transformation_toughening.jpg)
---

## **17) CAD-CAM Ceramic Systems (what it is + pros/cons)**

- CAD-CAM = computer-aided design and computer-aided machining system.
- Produces ceramic restoration in **a single appointment** by scanning prepared tooth; scanner captures preparation and a milling machine reproduces it from a ceramic block by grinding with diamond discs.
- Can do complex 3–4 surface restorations including cusp replacement; can manufacture ceramic veneers using newer systems (example mentioned: Cerec 3).
- **Advantages**: one appointment, reduced chair time, no impression required, **negligible porosity.**
- **Disadvantages:** costly equipment; scanning is technique sensitive.

### **Summary Verdict**

**Most homogeneous / least structural defects / most consistent quality:** ✅ **CAD/CAM industrial blocks
****Summary Verdict**

- **Best for Strength consistency? YES (Industrial blocks).**
- **Best for Speed? YES (1 visit).**
- **Best for Marginal Seal? No (Gold is king, but CAD/CAM is excellent).**
- **Best for Beauty? No (Hand-layered is better for front teeth).**

---

## **18) Porcelain Veneers (key facts + numbers)**

- Veneers improve the appearance of stained/discolored teeth.
- A thin shell closely adapted to the prepared tooth; labial enamel removal about **0.5 mm**; veneers are normally **0.5 -- 0.8 mm thick**.
- Materials/techniques: feldspathic porcelain, glass ceramic, pressed ceramic, or CAD-CAM. Veneers are bonded to enamel using composite resin luting agents.
- | **Feature** | **Metal Substrate (PFM)** | **Silica-Based Ceramic (Veneer/Inlay)** |
| --- | --- | --- |
| **Primary Tool**  **used to prepare the intaglio (inner) surface of a crown or veneer for bonding.** | Sandblasting ( | Hydrofluoric Acid (HF) |
| **Action** | Physical "pitting" of surface | Selective dissolution of glass phase |
| **Bonding Agent** | Oxide Layer (Chemical) | Silane (Chemical) |
| **Zirconia Note** | Sandblast only | **Do not HF etch** (no glass phase) |

---

| **Material** | **Step 1: Surface Texture** | **Step 2: Chemical Primer** |
| --- | --- | --- |
| **Glass Ceramic** (Feldspathic, Leucite, E.max) | **HF Etch** (Dissolves glass to create pits) | **Silane** (Bonds to the exposed silica) |
| **Zirconia** (Polycrystalline) | **Sandblast** (Creates roughness; HF creates no pattern here) | **MDP Primer** (Special primer for Zirconia; Silane doesn't work well) |
| **Metal** (Gold, PFM) | **Sandblast **(Increases surface area) | **Metal Primer** |

Tooth preparation for different materials 

| **Material** | **Occlusal / Incisal** | **Labial / Buccal** | **Lingual** | **Margin Design** |
| --- | --- | --- | --- | --- |
| **Full Metal (Gold)** | 1.0 mm (Non-functional)  1.5 mm (Functional) | 0.5 – 1.0 mm | 0.5 – 1.0 mm | **Chamfer** |
| **PFM (Porcelain Fused to Metal)** | 1.5 – 2.0 mm | 1.2 – 1.5 mm | 0.5 mm (Metal collar)  1.2 mm (Porcelain coverage) | **Shoulder** (Labial)  **Chamfer** (Lingual) |
| **All-Ceramic (e.g., E.max)** | 1.5 – 2.0 mm | 1.0 – 1.5 mm | 1.0 – 1.5 mm | **Deep Chamfer** or **Shoulder** (Rounded internal line angles) |
| **Zirconia (Monolithic)** | 1.0 – 1.5 mm | 0.5 – 1.0 mm | 0.5 – 1.0 mm | **Chamfer** |

---

## **19) Ceramic Summary**

- **bonding Mechanisms:** Chemical (oxides), Mechanical (sandblasting), Compressive (CTE mismatch)
- **Phases:** Glassy (translucency), Crystalline (strength/opacity)
- **Porcelain Components:** Feldspar (matrix), Silica (strength), Kaolin (opacity/handling)
- **Feldspathic Porcelain:** Aesthetic but brittle; used for veneers
- **Alumina/Zirconia:** High strength crystalline ceramics; Zirconia has transformation toughening
- **PFM Layers:** Opaque -> Body -> Incisal -> Glaze
- **Processing:** Sintering (firing), Heat pressing (IPS Empress), Slip casting (In-Ceram), CAD/CAM
- **Glazing:** Reduces flaws, smooths surface
- **Zirconia:** Y-TZP, very strong, transformation toughening inhibits crack propagation

`,Am={content:String.raw`
# Dental Ceramics — Summary Notes

---

## 1) Introduction / definition
- Dental ceramics are **tooth‑colored restorative materials** and are considered among the **most durable esthetic materials** in dentistry.
- They are **crystalline compounds** made of metallic + non‑metallic components, so their properties differ from each constituent.
- **Traditional porcelain:** kaolin + silica + feldspar (decorative porcelains). **Dental porcelains** have little/no kaolin → more accurately “dental glasses” (glassy silica network based on silica + feldspar with smaller additives).

### General properties
- **Biocompatible:** inert in oral fluids; corrosion‑resistant.
- **Esthetics:** excellent color match (hue/chroma/value) + translucency.
- **Insulators:** low thermal + electrical conductivity (unlike metals).
- **Brittle:** high compressive strength, low tensile strength → cracks start at surface flaws (microcracks/porosity).
- **Hard:** can wear opposing enamel if surface is rough (polish/glaze matters).

---

## 2) Composition of dental porcelain (what each does)

### A) Feldspar (major; ~60–80%)
- Potassium/sodium aluminosilicates.
- On heating, fuses → glassy phase; helps restoration keep form during fusing.
- **Exam functions:**
  - “Basic glass former”
  - forms leucite (crystalline) + glass phase
  - sodium lowers fusion temperature
  - potassium increases molten viscosity → controls flow/slumping during firing

### B) Silica / quartz (~15–25%)
- Refractory skeleton; provides strength/hardness during fusing; remains largely unchanged and is dispersed in glass phase.

### C) Kaolin (clay) (mainly decorative; dental porcelain usually minimal/none)
- Gives opacity (traditional). Modern dental porcelain: essentially feldspathic glass with crystalline inclusions.

### D) Alumina (Al₂O₃)
- Increases strength + opacity; replaces some silica; alters softening point and increases viscosity during firing.

### E) Metallic pigments (~1%)
- Shade modifiers; stable metal oxides (e.g., tin/nickel/cobalt/titanium/iron/gold oxides).

### F) Glass modifiers / fluxes
- Oxides of K/Na/Ca etc to control: fusion/sintering temp, thermal contraction/CTE, solubility and flow.
- Too much modifier ↓ chemical durability (more soluble/less resistant).

---

## 3) How porcelain powder is made (fritting) + phases

### Fritting (core method)
- Mix components → fuse → quench in water while red hot → cracked “frit” → grind into fine powder.

### After firing: two principal phases
- **Glass phase:** (formed during firing)
- **Crystalline/mineral phase:** (e.g., silica, alumina, certain metallic oxides/opacifiers/colorants)

---

## 4) Applications (where used)
- **Crowns:** porcelain jacket crown (PJC), PFM (metal‑ceramic), castable glass‑ceramic crowns
- **Veneers:** (crowns/bridges), artificial teeth, inlays/onlays, ceramic orthodontic brackets, prefabricated labial veneers

---

## 5) Classification (exam)

### A) By fusing temperature
- **High fusing (>1300°C):** denture teeth
- **Medium (1100–1300°C):** denture teeth; presintered zirconia
- **Low (850–1100°C):** crown/bridge veneer ceramic
- **Ultra‑low (<850°C):** veneers on titanium or special alloys

### B) By microstructure (crystal phase)
- **Glass‑based (amorphous):** highest translucency, lowest strength
- **Glass‑based with fillers** (leucite, lithium disilicate): balance of esthetics + strength
- **Crystalline/polycrystalline** (alumina, zirconia): highest strength, higher opacity, no glass matrix

### C) By fabrication method
- Sintering (powder‑layered feldspathic)
- Heat‑pressed / castable (lost‑wax press ingots)
- Slip‑casting + glass infiltration (In‑Ceram)
- CAD/CAM milling (hard/soft machining blocks)

---

## 6) Porcelain fabrication (lab workflow) — key definitions you must know

### Step 1: Platinum foil on die (~0.025 mm)
- Retains porcelain during firing
- Helps accuracy/fit

### Step 2: Build‑up with porcelain slurry (powder + water/special liquid) then:

### A) Condensation / compaction (MOST IMPORTANT)
**Definition:** packing/condensing the wet porcelain on the die (vibration/spatulation/brush) to:
- remove excess water
- remove trapped air/voids
- increase packing density

**Why it matters:**
- ↓ porosity (fewer internal flaws)
- ↓ firing shrinkage
- improves fit and strength

**Common errors → results:**
- trapped air/voids → porous, weak, chalky/opaque
- excess water → excessive firing shrinkage; distortion/undersized restoration
- poor packing density → poor fit; weak structure

### B) Sintering (firing) — what it means
**Definition:** heating porcelain powder so particles fuse at contact points (“necking”) and densify into a coherent mass.
- **Vacuum firing:** reduces porosity by removing/expanding entrapped air → better translucency and strength consistency.

**Bisque stages (clinical meaning)**
- **Low bisque:** matte/dull, high porosity, very fragile → good for adding bulk
- **Medium bisque:** slight sheen, less porosity, stronger but carvable → common try‑in stage
- **High bisque:** smooth/glassy, minimal porosity, very hard → final contour/characterization before glaze

**Firing precautions (high yield)**
- Pre‑dry (5–10 min at furnace door) to remove moisture and avoid “steam” defects
- Correct vacuum pressure (improves translucency/porosity control)
- Controlled/slow cooling to avoid internal stress and cracking
- Regular furnace calibration (temp accuracy prevents over/under‑firing)
- Keep restoration away from furnace walls/heating elements → more uniform heat; less warpage/hot spots/internal stresses

### C) Glazing + cooling — what glazing is
**Glazing** = final surface vitrification to produce a smooth, shiny, impervious surface that:
- seals surface microcracks/porosity → improves strength (fewer crack starters)
- reduces plaque retention and staining
- reduces abrasion/wear of opposing teeth compared with rough surfaces

**Types**
- **Self‑glaze:** surface glass flows during final firing (often preferred)
- **Applied glaze:** add low‑fusing glass layer; lower firing temp but more modifiers → generally less resistant to oral fluids than self‑glaze

**Cooling** must be gradual/uniform → avoids crazing (microcrack network) and residual thermal stress.

---

## 7) Why ceramics fail (strength profile)
- Brittle material; failure begins at flaws (porosity, microcracks, scratches).
- Tensile stress at flaws drives crack growth; compressive strength is high but tensile strength is low.

### What affects strength (exam list)
- composition
- surface integrity (flaws ↓ strength a lot)
- firing procedure (inadequate firing or over‑firing weakens structure)

---

## 8) Ceramic strengthening (how we increase toughness/strength)
- **Design:** reduce stress concentrators (sharp internal angles, thin connectors, unsupported porcelain).
- **Reduce surface flaws:** proper finishing + polishing + glazing.
- **Interrupt crack propagation:**
  - **alumina dispersion:** tough particles absorb crack energy and reduce driving force
  - **zirconia transformation toughening (PSZ/Y‑TZP):** stress‑induced crystal change absorbs energy and creates compressive zone at crack tip

---

## 9) Metal‑ceramic restorations (PFM) — layering, requirements, alloys, failures

### PFM concept
- Metal coping/framework provides strength + rigidity; porcelain veneer provides esthetics.

### Porcelain layering (what each layer does)
- **Opaque porcelain:** masks metal color and initiates bond (thin masking layer)
- **Body/dentin porcelain:** main shade and bulk contour
- **Incisal/enamel porcelain:** translucency and incisal effects
- **Glaze:** seals surface flaws and produces smooth surface

### PFM porcelain requirements (accurate)
- **Thermal compatibility:** metal should have slightly higher CTE than porcelain → porcelain ends in slight compression after cooling; mismatch → tensile stress → crazing/cracking.
- Porcelain firing temp must be below alloy solidus; alloy must resist sag/creep during firing.
- **Bond requirement:** controlled oxide layer on metal for chemical bonding (too little oxide = weak bond; too thick oxide = weak interface).
- Coping must be stiff (high modulus/yield) so it doesn’t flex; flexure puts porcelain in tension → fracture.

### Bonding mechanisms (metal ↔ porcelain)
- **Chemical:** oxide layer on metal bonds with porcelain (noble alloys often via Sn/In oxides; base alloys via Cr/Ti oxides).
- **Mechanical:** sandblasting creates micro‑retention; porcelain wets/locks into roughness.
- **Compressive (thermal):** CTE design leaves porcelain in residual compression.

### Typical thickness / reduction (teaching ranges)
- **Metal coping:** 0.3–0.5 mm (about 0.3 mm minimum for rigidity)
- **Opaque porcelain:** 0.2–0.3 mm
- **Veneering porcelain (body+incisal total):** ~0.8–1.2 mm (commonly ~1.0 mm)
- **Facial reduction for PFM:** ~1.2–1.5 mm
- **Occlusal/incisal reduction:** ~1.5–2.0 mm depending on functional cusp/incisal design

### PFM alloy types (what you must know)

#### 1) High Noble (High‑gold; Au‑Pt‑Pd)
- **Definition:** ≥40% Au and ≥60% total noble metal.
- **Pros:** best corrosion resistance/biocompatibility; good fit (lower casting shrinkage); predictable thin oxide for bonding; easier to mask warm color.
- **Cons:** lower modulus (more flexible) → may need thicker coping; lower sag resistance; very expensive.

#### 2) Noble (Pd‑Ag / High‑Pd / Pd‑Cu systems)
- **Definition:** ≥25% total noble metal.
- **Pros:** stronger/stiffer than high‑gold; better sag resistance; often good CTE match to porcelains; cheaper than high‑gold.
- **Cons:** Ag can cause porcelain “greening”; some Pd‑Cu systems form darker/heavier oxides that are harder to mask.

#### 3) Predominantly base (Ni‑Cr, Co‑Cr, Ti alloys)
- **Definition:** <25% noble metal.
- **Pros:** very high modulus (stiff) → can be thinner and support porcelain well; high melting range → excellent sag resistance; low cost.
- **Cons:** biocompatibility issues (Ni allergy in some patients); casting shrinkage higher (fit is harder); oxide can be thick/dark → porcelain bond problems/delamination risk.

### Common PFM failures (pattern recognition)
- **Delamination/adhesive failure:** separation at interface (often oxide problems or contamination).
- **Cohesive porcelain fracture:** crack within porcelain (often from flexure, flaws, occlusal overload).
- **Porosity:** poor condensation, trapped air, or incorrect vacuum firing.

`},on=["Bonds: Chemical (oxides), Mechanical (sandblasting), Compressive (CTE mismatch)","Phases: Glassy (translucency), Crystalline (strength/opacity)","Porcelain Components: Feldspar (matrix), Silica (strength), Kaolin (opacity/handling)","Feldspathic Porcelain: Aesthetic but brittle; used for veneers","Alumina/Zirconia: High strength crystalline ceramics; Zirconia has transformation toughening","PFM Layers: Opaque -> Body -> Incisal -> Glaze","Processing: Sintering (firing), Heat pressing (IPS Empress), Slip casting (In-Ceram), CAD/CAM","Glazing: Reduces flaws, smooths surface","Zirconia: Y-TZP, very strong, transformation toughening inhibits crack propagation"],vo=[{id:"cer_mcq_easy_1",question:"What is the primary chemical structure of dental porcelain?",options:["A crystalline metal lattice","An amorphous glassy silica network","A resin polymer chain","A carbon-based fiber"],correctAnswerIndex:1,explanation:`Dental porcelain is essentially a glass (amorphous solid) based on a silica ($SiO_2$) and
feldspar network.`},{id:"cer_mcq_easy_2",question:'Which component is known as the "basic glass former" in dental porcelain?',options:["Kaolin","Silica","Feldspar","Alumina"],correctAnswerIndex:2,explanation:"Feldspar (60–80%) melts to form the glass matrix that holds everything else together."},{id:"cer_mcq_easy_3",question:"In a PFM crown, which layer is responsible for masking the dark metal color?",options:["Body Porcelain","Incisal Porcelain","Opaque Porcelain","Glaze"],correctAnswerIndex:2,explanation:`The opaque layer is the first layer applied; it blocks light transmission to hide the metal coping
completely.`},{id:"cer_mcq_easy_4",question:"Dental ceramics are generally strongest in which type of force?",options:["Tensile","Shear","Compression","Torsion"],correctAnswerIndex:2,explanation:`Like stone or concrete, ceramics can withstand heavy crushing (compression) but break easily if
pulled apart (tension).`},{id:"cer_mcq_easy_5",question:'Which alloy type is the most "tissue-friendly" (biocompatible) and resistant to corrosion?',options:["Nickel-Chromium","Cobalt-Chromium","High Noble - Gold","Silver-Palladium"],correctAnswerIndex:2,explanation:`High Gold alloys are chemically inert and do not react with body fluids, making them the most
biocompatible option.`},{id:"cer_mcq_easy_6",question:"The process of firing porcelain powder to make it solid is called:",options:["Casting","Sintering","Etching","Milling"],correctAnswerIndex:1,explanation:`Sintering is the fusion of powder particles via heat to form a solid mass without melting it
completely into a liquid.`},{id:"cer_mcq_easy_7",question:"Which acid is used to etch the internal surface of a glass-ceramic (like e.max) crown?",options:["Phosphoric Acid","Hydrofluoric Acid - HF","Hydrochloric Acid","Polyacrylic Acid"],correctAnswerIndex:1,explanation:`HF acid selectively dissolves the glass matrix to create micropores for bonding. Other acids are
not strong enough to eat glass.`},{id:"cer_mcq_easy_8",question:'What is the main purpose of "glazing" a restoration?',options:["To change the shade","To create a smooth, shiny, and sealed surface","To melt the metal coping","To increase the size of the crown"],correctAnswerIndex:1,explanation:`Glazing seals microscopic surface flaws (increasing strength) and creates a glossy surface that
is hygienic and does not abrade opposing teeth.`},{id:"cer_mcq_easy_9",question:'Which material is known as "Ceramic Steel" due to its high strength?',options:["Feldspathic Porcelain","Zirconia","Leucite","Composite"],correctAnswerIndex:1,explanation:`Zirconia has very high flexural strength (900+ MPa) and fracture toughness, comparable to
some metals.`},{id:"cer_mcq_easy_10",question:'"Fritting" is a process used in the manufacturing of:',options:["Gold alloys","Porcelain powder","Zirconia blocks","Wax patterns"],correctAnswerIndex:1,explanation:"Fritting involves quenching hot glass in water to shatter it into the powder used by dental labs."},{id:"cer_mcq_easy_11",question:'Which component is added to porcelain to provide "translucency"?',options:["Kaolin","Opaque oxides","Silica/Feldspar - glass phase","Titanium"],correctAnswerIndex:2,explanation:`The glassy phase allows light to pass through, mimicking natural enamel. Crystalline additives
usually add opacity.`},{id:"cer_mcq_easy_12",question:'The "Try-In" of a crown is best done at which firing stage?',options:["Low Bisque","Medium Bisque","High Bisque","Glazed"],correctAnswerIndex:1,explanation:`At Medium Bisque, the crown is strong enough to handle but porous enough to make
adjustments with a stone.`},{id:"cer_mcq_easy_13",question:"A PFM crown consists of porcelain fused to:",options:["A composite core","A metal substructure - coping","A zirconia core","A fiber post"],correctAnswerIndex:1,explanation:"PFM stands for Porcelain Fused to Metal."},{id:"cer_mcq_easy_14",question:"Which porcelain layer mimics the natural enamel of the tooth?",options:["Body","Opaque","Incisal","Gingival"],correctAnswerIndex:2,explanation:"Incisal porcelain is translucent and placed at the cutting edge to look like enamel."},{id:"cer_mcq_easy_15",question:'"Sag resistance" is a property required for:',options:["The porcelain powder","The metal alloy","The cement","The die stone"],correctAnswerIndex:1,explanation:`The metal must not sag (deform) under its own weight when heated to near-melting
temperatures during porcelain firing.`}],bo=[{id:"cer_mcq_medium_16",question:"Why is potassium added to feldspathic porcelain?",options:["To lower fusion temperature","To increase viscosity and prevent slumping","To create a chemical bond","To act as a pigment"],correctAnswerIndex:1,explanation:`Potassium oxide ($K_2O$) makes the molten glass "thicker" (more viscous) so the crown holds
its shape and doesn't melt into a puddle during firing.`},{id:"cer_mcq_medium_17",question:"Which firing method is essential to reduce porosity in dental porcelain?",options:["Open air firing","Vacuum firing","Pressure firing","Steam firing"],correctAnswerIndex:1,explanation:`A vacuum sucks out air trapped between particles. If not removed, the air bubbles make the
porcelain opaque and weak.`},{id:"cer_mcq_medium_18",question:'In PFM bonding, the "Compressive Bond" is achieved because:',options:["Metal and porcelain contract at the same rate.","Porcelain contracts more than metal.","Metal contracts slightly more than porcelain.","The opaque layer expands."],correctAnswerIndex:2,explanation:`The metal shrinks more upon cooling (higher CTE), effectively "clamping" the porcelain.
Porcelain is strong under this compressive force.`},{id:"cer_mcq_medium_19",question:'Which element is responsible for the "greening" discoloration of porcelain?',options:["Gold","Palladium","Silver","Indium"],correctAnswerIndex:2,explanation:"Silver has a high vapor pressure; it vaporizes during firing and stains the porcelain yellow-green."},{id:"cer_mcq_medium_20",question:"What is the major disadvantage of Base Metal (Ni-Cr) alloys compared to Gold?",options:["Lower strength","Low modulus of elasticity","Excessive oxide formation and casting shrinkage","Low melting temperature"],correctAnswerIndex:2,explanation:`Base metals shrink significantly (leading to poor fit) and form thick, dark oxides that can cause
bond failure or delamination.`},{id:"cer_mcq_medium_21",question:'"Transformation Toughening" involves a crystal phase change from:',options:["Monoclinic to Tetragonal","Tetragonal to Monoclinic","Cubic to Hexagonal","Amorphous to Crystalline"],correctAnswerIndex:1,explanation:`Stress triggers the metastable Tetragonal crystals to expand into Monoclinic crystals (4%
expansion), which seals the crack.`},{id:"cer_mcq_medium_22",question:'Which material allows for "etchable" bonding due to its glass content?',options:["Zirconia","Alumina","Lithium Disilicate - e.max","Gold"],correctAnswerIndex:2,explanation:`Lithium Disilicate is a glass-ceramic. You can etch the glass phase. Zirconia is polycrystalline
(no glass) and cannot be etched.`},{id:"cer_mcq_medium_23",question:'The "Lost Wax" technique is NOT used for:',options:["Pressed Ceramics - Empress","Cast Gold","CAD/CAM Milled Zirconia","PFM Copings"],correctAnswerIndex:2,explanation:`CAD/CAM is a subtractive method (milling from a block), not a casting/pressing method, so it
does not use the lost wax process.`},{id:"cer_mcq_medium_24",question:'The primary function of "Condensation" during porcelain build-up is to:',options:["Mix the shades","Remove excess water to reduce firing shrinkage","Heat the porcelain","Apply the glaze"],correctAnswerIndex:1,explanation:`Packing particles tightly reduces the empty space that would cause massive shrinkage when the
water evaporates.`},{id:"cer_mcq_medium_25",question:`Which PFM failure is characterized by porcelain breaking away from the metal (clean
metal surface exposed)?`,options:["Cohesive failure","Adhesive failure","Tensile failure","Shear failure"],correctAnswerIndex:1,explanation:`Adhesive failure means the bond between materials failed. Cohesive failure is a break within
one material.`},{id:"cer_mcq_medium_26",question:'Why is Zirconia considered "opaque" compared to glass ceramics?',options:["It contains kaolin.","It has a high crystalline content and no glass matrix.","It is always covered in opaque porcelain.","It absorbs all light."],correctAnswerIndex:1,explanation:`Crystals scatter light. Since Zirconia is 100% crystalline (polycrystalline), it naturally blocks more
light than glass-based materials.`},{id:"cer_mcq_medium_27",question:"What is the approximate shrinkage of porcelain during firing?",options:["1-5%","10-15%","30-40%","0%"],correctAnswerIndex:2,explanation:`Porcelain powder is mixed with water. As water is removed and particles sinter, the volume
shrinks massively (30-40%), requiring the build-up to be oversized.`},{id:"cer_mcq_medium_28",question:'"Soft Machining" of Zirconia refers to:',options:["Milling the block after it is fully sintered.","Milling the block in a pre-sintered - chalk-like state.","Hand-carving the wax.","Using soft burs."],correctAnswerIndex:1,explanation:'It is easier and faster to mill the soft "green" Zirconia before it is fired to full hardness.'},{id:"cer_mcq_medium_29",question:'To prevent "sagging" of a long-span PFM bridge during firing, the alloy must have:',options:["A low melting temperature.","A high melting temperature - thermal stability.","High noble content.","Low stiffness."],correctAnswerIndex:1,explanation:"The alloy must remain solid and rigid at the high temperatures used to fire the porcelain."},{id:"cer_mcq_medium_30",question:"Silane is used to bond:",options:["Zirconia to Tooth","Metal to Tooth","Silica-based ceramic to Resin Cement","Enamel to Dentin"],correctAnswerIndex:2,explanation:`Silane acts as a chemical coupler/bridge between the inorganic silica in the crown and the
organic matrix of the resin cement.`}],Co=[{id:"cer_mcq_hard_31",question:`Which oxides are specifically added to Noble alloys to form the chemical bond with
porcelain?`,options:["Gold and Platinum oxides","Tin, Indium, or Iron oxides","Sulfur and Phosphorus","Calcium and Potassium"],correctAnswerIndex:1,explanation:`Noble metals (Au, Pt) don't oxidize. Trace base metals (Sn, In, Fe) migrate to the surface to form
the oxide layer needed for chemical bonding.`},{id:"cer_mcq_hard_32",question:`The volume expansion associated with the Tetragonal-to-Monoclinic transformation in
Zirconia is approximately:`,options:["0.5%","3–5%","10%","20%"],correctAnswerIndex:1,explanation:`The ~4% volume increase is exactly what creates the compressive force that "pinches" the crack
shut.`},{id:"cer_mcq_hard_33",question:`Which phenomenon occurs if the Coefficient of Thermal Expansion (CTE) of porcelain is
higher than that of the metal?`,options:["Compressive bonding - Good","The porcelain will craze or crack - Crazing","The metal will melt","The porcelain will detach immediately"],correctAnswerIndex:1,explanation:`If porcelain shrinks more than metal (higher CTE), it puts the porcelain in tension (pulling apart),
causing surface cracks called crazing.`},{id:"cer_mcq_hard_34",question:`The melting range of a PFM alloy must be at least how many degrees higher than the
porcelain firing temperature?`,options:["10°C","50°C","100–150°C","500°C"],correctAnswerIndex:2,explanation:`This safety margin prevents the metal framework from creeping or sagging (deforming) during
the firing cycles.`},{id:"cer_mcq_hard_35",question:'In the "In-Ceram" (Slip-Casting) technique, the core strength is achieved by:',options:["Sintering feldspar.","Glass infiltration into a porous alumina network.","Transformation toughening.","Casting molten glass."],correctAnswerIndex:1,explanation:`A porous alumina skeleton is created, and then a low-viscosity glass is melted over it to soak
into the pores (infiltration), removing porosity.`},{id:"cer_mcq_hard_36",question:'Which ion acts as a "flux" to disrupt the silica network and lower fusion temperature?',options:["Aluminum - $Al^{3+}$","Sodium - $Na^+$","Silicon - $Si^{4+}$","Zirconium - $Zr^{4+}$"],correctAnswerIndex:1,explanation:"Alkali metal ions (Na, K) are fluxes that break Si-O bonds to lower the melting point of the glass."},{id:"cer_mcq_hard_37",question:'"Devitrification" of dental porcelain refers to:',options:["The desired formation of leucite crystals.","The unwanted crystallization of the glass matrix due to repeated firing.","The process of glazing.","The removal of air bubbles."],correctAnswerIndex:1,explanation:`If porcelain is fired too many times, the glass can crystallize (devitrify), making it milky/cloudy
and physically weak.`},{id:"cer_mcq_hard_38",question:"The theoretical strength of ceramic is reduced in practice primarily due to:",options:["Griffith flaws - micro-cracks.","Lack of carbon.","High water content.","Excessive glazing."],correctAnswerIndex:0,explanation:`Griffith's theory explains that brittle materials fail at low stresses due to microscopic surface
defects that concentrate stress at a single point.`},{id:"cer_mcq_hard_39",question:'Why does Dicor (Castable Glass) require a "Ceramming" heat treatment?',options:["To melt the glass.","To grow mica crystals within the glass for strength.","To remove the investment material.","To change the color."],correctAnswerIndex:1,explanation:`The cast object is initially weak amorphous glass. Heating it (ceramming) precipitates mica
crystals, turning it into a stronger glass-ceramic.`},{id:"cer_mcq_hard_40",question:'A "Platinum Foil Matrix" technique is used for PJC (Porcelain Jacket Crowns) because:',options:["The foil remains in the crown for strength.","The foil is removed after firing, allowing for a better fit than a metal coping.","The foil dissolves into the porcelain.","It prevents the porcelain from shrinking."],correctAnswerIndex:1,explanation:`The foil supports the wet porcelain during firing but is peeled out at the end, leaving a pure
porcelain crown with good adaptation.`},{id:"cer_mcq_hard_41",question:`Which surface treatment is contraindicated for Zirconia because it fails to create
retentive patterns?`,options:["Sandblasting with Alumina","Tribochemical Silica Coating - CoJet","Hydrofluoric Acid Etching","Application of MDP Primer"],correctAnswerIndex:2,explanation:`HF acid works by dissolving glass. Zirconia has no glass phase. Acid etching does nothing but
clean it; it does not create retention.`},{id:"cer_mcq_hard_42",question:'The "sag" of a metal bridge is most closely related to which mechanical property?',options:["Creep","Hardness","Resilience","Toughness"],correctAnswerIndex:0,explanation:`Creep is the time-dependent deformation of a material under constant stress (gravity/weight of
the bridge) at high temperatures.`},{id:"cer_mcq_hard_43",question:"Leucite ($KAlSi_2O_6$) is created in feldspathic porcelain primarily to:",options:["Increase opacity.","Increase the Thermal Expansion Coefficient - CTE.","Decrease the melting point.","Improve polishability."],correctAnswerIndex:1,explanation:`Metals expand/contract a lot. Glass does not. Leucite is a crystal with high expansion that is
added to the glass so it expands/contracts with the metal, preventing cracks.`},{id:"cer_mcq_hard_44",question:`Which primer monomer is specifically designed to bond to metal oxides
(Zirconia/Alumina/Metal)?`,options:["Bis-GMA","10-MDP","HEMA","TEGDMA"],correctAnswerIndex:1,explanation:`10-MDP is the gold standard phosphate monomer that chemically bonds to the oxide surface of
Zirconia and metals.`},{id:"cer_mcq_hard_45",question:'"Capillary Technology" (Captek) utilizes gold-impregnated wax sheets to:',options:["Create a solid gold pontic.","Create a composite metal coping via capillary action.","Glaze the porcelain.","Etch the tooth."],correctAnswerIndex:1,explanation:`When heated, the wax burns off and molten gold flows (via capillary action) into the porous
platinum/gold structure, creating a dense coping.`}],Tm=[{id:"cer_mcq_hard_46",question:`Scenario: A patient returns 2 years after receiving a PFM crown on #8. The gum line has
receded, revealing a dark gray line at the margin. The crown itself is intact. What is the most
likely cause?`,options:["Porcelain fracture.","Metal collar visibility due to supragingival margin placement - or recession.","Adhesive failure of the cement.","Green discoloration from silver."],correctAnswerIndex:1,explanation:`Traditional PFMs often have a metal collar at the margin for fit. If the gum recedes, this metal
becomes visible. This is an esthetic failure, not a material failure.`},{id:"cer_mcq_hard_47",question:`Scenario: You are cementing a Zirconia crown. You try it in, it fits perfectly. You clean
the inside with phosphoric acid, rinse, and apply cement. A week later, the crown falls off.
The cement is on the tooth, the crown is clean. What went wrong?`,options:["The cement was expired.","Phosphoric acid deactivated the zirconia surface - blocked oxide sites.","You should have used HF acid.","Zirconia cannot be cemented, only screwed in."],correctAnswerIndex:1,explanation:`Phosphoric acid cleans Zirconia, but the Phosphate ions bind to the oxide sites, blocking the
MDP primer from bonding. You must use a dedicated cleaner (e.g., Ivoclean) or sandblast, NOT phosphoric
acid.`},{id:"cer_mcq_hard_48",question:`Scenario: A lab sends back a PFM bridge. You notice tiny bubble-like porosities on the
surface of the porcelain. What was the likely error in the lab?`,options:["Fired under too high vacuum.","Improper condensation or failure to vacuum fire.","Too much opaque layer.","The metal was too thick."],correctAnswerIndex:1,explanation:`Porosity is caused by trapped air. This happens if the technician didn't pack the powder
(condense) well enough to squeeze air out, or if the vacuum pump failed during firing.`},{id:"cer_mcq_hard_49",question:`Scenario: You are prepping tooth #30 for a monolithic Zirconia crown. The patient has a
heavy bruxing habit. Which reduction/prep style is most appropriate to prevent wear on the
opposing tooth?`,options:["Minimal reduction - 0.5mm and high polish of the occlusal surface.","Aggressive reduction - 2.0mm and glazing.","Feather edge prep.","Use a PFM instead."],correctAnswerIndex:0,explanation:`Polished Zirconia is very kind to opposing teeth (less abrasive than glaze). Because Zirconia is
strong, you can be conservative (0.5mm) and polish it well. Glaze wears off and exposes rough ceramic.`},{id:"cer_mcq_hard_50",question:`Scenario: A PFM crown fractures. The break leaves a thin layer of opaque porcelain
covering the metal. What does this indicate?`,options:["Poor bond between metal and opaque - Adhesive failure.","Good metal-ceramic bond; the failure was within the porcelain - Cohesive failure.","The metal was too smooth.","The opaque layer was too thick."],correctAnswerIndex:1,explanation:`Since porcelain (opaque) is still stuck to the metal, the chemical bond held. The material broke
within itself (cohesive). This suggests trauma or occlusion issues, not a manufacturing bond error.`},{id:"cer_mcq_hard_51",question:`Scenario: You cement a Feldspathic Veneer. As soon as you cure the cement, the veneer
cracks in half. The prep was conservative (enamel). What is the most likely error?`,options:["The veneer was too thick.","You used a light-cure cement.","The veneer was not fully seated or had a premature contact point during seating.","HF acid weakened the veneer."],correctAnswerIndex:2,explanation:`Feldspathic porcelain is extremely brittle before bonding. If you force it down on an uneven spot
or if it's not perfectly seated when pressure is applied, it will snap.`},{id:"cer_mcq_hard_52",question:`Scenario: A patient complains that their new PFM crown looks "chalky" and opaque
compared to the adjacent natural tooth. The lab followed the shade guide correctly. What
prep error likely caused this?`,options:["Excessive reduction.","Under-reduction - insufficient space.","Using a shoulder margin.","Using a noble alloy."],correctAnswerIndex:1,explanation:`If you don't reduce enough tooth (e.g., only 0.8mm), the lab has to squeeze in the metal and
opaque. They have no room left for the translucent incisal porcelain, resulting in a lifeless, opaque crown.`},{id:"cer_mcq_hard_53",question:`Scenario: During the try-in of an e.max (Lithium Disilicate) crown, you adjust the
occlusion with a diamond bur. What MUST you do before final cementation?`,options:["Nothing, just cement it.","Glaze it again in the furnace or use a purely mechanical polishing kit.","Sandblast the occlusal surface.","Dip it in alcohol."],correctAnswerIndex:1,explanation:`Grinding creates micro-cracks. If you don't re-glaze or meticulously polish to remove these
defects, the crown will likely fracture from that rough spot later.`},{id:"cer_mcq_hard_54",question:`Scenario: A PFM bridge rocks on the die. The technician decides to cut the bridge
connector, solder it, and re-fire the porcelain. Is this acceptable?`,options:["Yes, soldering is standard.","No, you cannot solder after porcelain is added without damaging the porcelain.","Yes, but only with a laser.","No, because the metal will shrink."],correctAnswerIndex:1,explanation:`Standard soldering requires heat that would melt or ruin the porcelain. Post-ceramic soldering is
very risky; usually, the porcelain must be stripped or the bridge remade.`},{id:"cer_mcq_hard_55",question:`Scenario: You are choosing a shade for a PFM crown. The patient has very translucent
enamel tips. Which porcelain layer should the technician emphasize to match this?`,options:["Body porcelain.","Opaque porcelain.","Incisal porcelain.","Aluminous core."],correctAnswerIndex:2,explanation:`The Incisal layer is the translucent layer that mimics the "see-through" nature of natural tooth
tips (halo effect).`},{id:"cer_mcq_hard_56",question:`Scenario: A patient has a Nickel allergy. They need a long-span posterior bridge (high
load). Which alloy system is the safest AND most rigid alternative?`,options:["High Gold - Type IV.","Cobalt-Chromium - Co-Cr.","Pure Titanium.","Silver-Palladium."],correctAnswerIndex:1,explanation:`Co-Cr is a Base Metal (very stiff/rigid for long spans) but does not contain Nickel, avoiding the
allergy. High Gold might be too flexible for a very long span and is expensive.`},{id:"cer_mcq_hard_57",question:`Scenario: A Zirconia crown comes back from the lab appearing larger than the die. The
lab claims they milled it correctly. What is the likely manufacturing error?`,options:["They used the wrong shrinkage factor.","They sintered it for too long.","They used a presintered block.","They forgot to glaze it."],correctAnswerIndex:0,explanation:`Zirconia shrinks ~25% during sintering. The computer must enlarge the milling file by a precise
"shrinkage factor" to compensate. If the factor is wrong, the final crown won't fit.`},{id:"cer_mcq_hard_58",question:`Scenario: You are removing an old crown. It is white on the outside but has a dark metal
core. When you cut into it, sparks fly, and it is extremely hard to cut, ruining several burs.
What is the alloy?`,options:["High Noble Gold.","Base Metal - Ni-Cr or Co-Cr.","Titanium.","Silver-Palladium."],correctAnswerIndex:1,explanation:`Base metals are notoriously hard and difficult to cut, often producing sparks and destroying
diamonds/carbides. Gold cuts softly like butter.`},{id:"cer_mcq_hard_59",question:`Scenario: An all-ceramic crown on a molar fractures after 6 months. Analysis shows the
fracture initiated at the internal surface (cement interface). What is a probable cause?`,options:["Occlusal overload.","Sharp line angle on the tooth prep.","The patient ate ice.","The porcelain was over-glazed."],correctAnswerIndex:1,explanation:`Ceramics are brittle and hate sharp corners. A sharp line angle on the prep acts as a stress riser
on the inside of the crown, causing a crack to start from the inside out.`},{id:"cer_mcq_hard_60",question:`Scenario: A dentist sandblasts the internal surface of a Zirconia crown with 50-micron
alumina at high pressure (4 bar). The crown fits well but fractures a month later. Why?`,options:["Sandblasting is not recommended.","The pressure was too high, causing micro-cracks and phase transformation damage.","The cement reacted with the alumina.","Zirconia absorbs water."],correctAnswerIndex:1,explanation:`While sandblasting is necessary for Zirconia bonding, it must be gentle (low pressure ~2 bar,
small particles). Excessive blasting induces surface damage and phase transformation that weakens the
restoration.


Bonus: Gypsum Die for Porcelain Work`},{id:"cer_mcq_hard_61",question:`What type of gypsum is used to make a working die for porcelain/indirect restorations,
and why?`,options:["Type II plaster - highest strength and least expansion","Type III dental stone - low strength but best detail reproduction","Type IV die stone - high strength and low expansion for accurate margins","Type V dental stone - lowest expansion for maximum accuracy"],correctAnswerIndex:2,explanation:`Key: Type IV = high-strength, low-expansion die stone for accurate margins and abrasion
resistance during lab work.`}],Sm=[...vo,...bo,...Co,...Tm],_m=[...Sm],Io=String.raw`
# **Properties of Dental Materials:summary**

**(Physical + Chemical + Mechanical + Rheological + Optical + Manufacturing + Electrical + Biological)**  
---

## **1\) Thermal Properties**

*Dental materials face constant thermal cycling (hot coffee ~60°C → ice cream ~0°C). Their response controls marginal seal, longevity, and pulpal safety.*

### **A) Dimensional Change & Integrity**

**1\) Coefficient of Thermal Expansion (CTE, α)**

* **Definition:** Fractional change in length per 1°C temperature change.  
* **Clinical Significance (Percolation):** Ideally, restorative CTE should **match enamel/dentin**.  
* **Mismatch scenario:** Composites often have **higher CTE** than enamel.  
  * Cold drink → composite contracts **more** than tooth → microscopic marginal gap opens  
  * Saliva/bacteria are sucked in → then warming closes gap and **traps** fluids  
* **Outcome:** **Percolation** → recurrent caries, marginal staining, post-op sensitivity.

**PFM bonding rule (CTE compatibility):**

* Metal substructure must have **slightly higher CTE** than porcelain.  
* Cooling after firing → metal contracts slightly more → porcelain placed under **compression** → fewer craze lines (porcelain strong in compression).

---

**2\) Glass Transition Temperature (Tg)**

* **Definition:** Temperature range where a polymer changes from **glassy/brittle** → **rubbery/flexible**.  
* **Clinical relevance:** Dental polymers (acrylic, composite resins) must have **Tg well above 37°C** (mouth temperature).  
* **If Tg is too low** → hot drinks can soften/warp denture base or reduce rigidity.

---

### **B) Heat Transfer**

**3\) Thermal Conductivity (k)**

* **Definition:** Rate of heat flow through a material.  
* **Clinical relevance:**  
  * Enamel/dentin = **poor conductors** (natural insulation)  
  * Metals (amalgam/gold) = **high conductors** → thermal shock can reach pulp  
  * Deep cavity removes insulation → place **base/liner** (low conductivity) under metal restorations → reduces pulpal pain.

**4\) Thermal Diffusivity (αᵗ)**

* **Definition:** Rate at which a temperature change spreads through a material.  
  * **Key relation:** αᵗ = k / (ρ · c) where k=conductivity, ρ=density, c=specific heat  
* **Clinical relevance:** More clinically useful than conductivity alone.  
  * Denture base should have **low diffusivity** → heat reaches mucosa slowly → “warning time” to avoid burns (acrylic helps).

---

### **C) State Changes**

**5\) Melting point / Fusion temperature (pure metals)**

* **Definition:** Temperature where a pure solid becomes liquid.  
* **Example reference:** **Pure gold = 1064°C**.

**6\) Melting range (alloys): Liquidus & Solidus**

* **Liquidus:** Above this, alloy is **100% liquid** (casting: must heat above this).  
* **Solidus:** Below this, alloy is **100% solid** (soldering: stay below this so components don’t melt).  
* **Melting range = Liquidus − Solidus**

**7\) Eutectic temperature**

* **Definition:** Specific alloy composition with **lowest melting temperature**, often melting sharply like a pure metal.  
* **Clinical relevance**  
* **During soldering:**

  * Solder melts quickly and completely

  * Parent crown/bridge alloy (higher solidus) does NOT melt

* **→ Accurate joints, minimal distortion, predictable results**

---
`,xo=String.raw`

### **Before We Start: How to Think About “Properties”**

**To use dental materials safely and intelligently, we first need:**

1. **Clear definitions**

   * **What each property actually means (strength, toughness, rheology, solubility, etc.).**

2. **Clinical correlation *(the more important part)***

   * **How that property affects:**

     * **Operative (restorations, liners, composites)**

     * **Ortho (wires, adhesives)**

     * **Prostho (impressions, cements, denture bases, crowns)**

**This may feel like a lot of theory, but the goal is simple:**

**Know the few key properties that actually change how you select, handle, and evaluate materials in the clinic—and the way they are asked in exams.**

# **MECHANICAL PROPERTIES**

*The fundamental relationship between force and deformation.*

## **1\) Stress (σ)**

***Definition:***  
 *Stress is the **internal resistance** of a material to an external load.*  
 *When an external force is applied, the material “pushes back” internally to maintain its structure—this internal reaction is stress.*

***Formula (Docs-friendly):***  
 *Stress \= Force / Area*

***Written as:***  
 *σ \= F / A*

***Units:***

* *Pascal (Pa)*

* *Megapascal (MPa)*

* *Common dental unit: MPa \= N/mm²*

***Clinical example:***

1. *When a patient bites on a restoration, the biting force is distributed over the restoration’s surface area, creating stress within the material. If the force is concentrated over a very small area (stress concentration), the stress becomes very high and may overload the restoration or tooth structure, leading to fracture of the restoration or even a cusp.*  
2. *So clinically, we try to avoid **excessively high stress** by improving occlusal contacts and distributing forces evenly.*  
1. ***Denture note (occlusal table):***  
   *If a denture tooth has a very large (wide) occlusal table, the chewing load is less efficient and tends to increase lateral/tipping forces. This can lead to poor cutting/biting efficiency and may destabilize the denture (more tipping/rocking). Therefore, denture teeth are often designed with a more appropriate occlusal table width to improve efficiency and stability.*  
2. ***However:** If the occlusal table is made **too narrow**, the same chewing force is applied over a smaller contact area, which can increase the pressure transmitted to the denture-bearing tissues. This may concentrate load on the mucosa/gingiva (especially if the denture is unstable), leading to **tissue soreness and sore spots**.*  
3. ***Clinical principle:** Aim for an occlusal table width that balances **chewing efficiency and denture stability** while avoiding excessive stress concentration on the supporting tissues.*

*![image1](/assets/mechanical/image1.png)*

## ***2\.*****Strain (ε)**  **Definition:** The amount of deformation (change in shape) that occurs in response to stress.

When a material is subjected to stress, it physically changes dimensions (stretches, compresses, or twists). Strain measures this change relative to the original length.

• **Formula**: Strain (ε) \= ΔL / L₀  
 – ΔL \= change in length  
 – L₀ \= original length

• Units: Dimensionless (often expressed as a percentage, %).

•**Dental bridge example:**  
 If a dental bridge bends slightly in the middle under chewing forces, the **force from chewing is the stress**, and the **bending/deformation of the bridge is the strain**.

* **Impression material / “chewing gum” analogy:**  
   When you **pull** an impression material (or something elastic like chewing gum), the **pulling force you apply is the stress**, and the **material elongating/stretching is the strain**.

**One-line rule to remember:**  
**Stress \= the load you apply (cause).**

**Strain \= the deformation that happens (effect).**

![image2](/assets/mechanical/image2.png)

## **3\. The Stress-Strain Curve Zones**

**The Stress–Strain Relationship** 

**Stress (σ)** causes **strain (ε)**.  
 A **stress–strain curve** shows how a material deforms as you increase the load.

We uses a metal diagram showing if u applies the stress on a material what phases it undergoes on a  stress strain curve

*![image3](/assets/mechanical/image3.png)*

# 

# **Elastic Region (The "Spring" Zone):**

##### **1.Elastic Modulus (Stiffness):** slope of the elastic (linear) part of the stress–strain curve \= Modulus of Elasticity (E).  This tells you how rigid (stiff) or flexible a material is.

* Higher E (steeper slope) \= more rigid / stiffer  
   → very little strain (bending) for a given stress.  
   Example idea:Porcelain / glass-like materials are extremely stiff, so they don’t bend much.

* **Lower E (less steep slope) \= more flexible**  
   → more strain (bending) for the same stress.  
   Example: metals with lower E flex more.

* It is the **stiffness** of the material — i.e., **how much it bends/strains for a given stress**.  
  * *High Modulus:* Rigid (e.g., PFM Metal Framework).  
    * *Low Modulus:* Flexible (e.g., Class V filling to flex with the tooth)

##### **2.Resilience \= area under the curve in the elastic region only**

##### **3.proportional limit:**  The **highest point on the stress–strain curve where stress is directly proportional to strain** (the end of the perfectly straight/linear region).

**After this point:**  
 The curve stops being perfectly linear, so **stress and strain no longer have a constant proportional relationship** (Hooke’s law no longer strictly applies).

Why we care about this because this  affects modulus of elasticity and we care about that alot 

#### **Why it matters clinically**

1. **Predictable deflection (using E)**

* Below the proportional limit, stress ∝ strain, so **calculations based on E are accurate**.

* Above it, the curve becomes nonlinear, so **E no longer predicts bending/deflection reliably**.

2. **Safety margin for “springback” behavior**

* For things that must act like springs (wires, clasps), you want them to work **within the proportional/elastic range**.

* A higher proportional limit means the material can take **more stress while still behaving elastically/linearly**.

3. **Early warning before permanent distortion**

* The proportional limit is usually **close to** the onset of non-ideal behavior that leads toward plastic deformation.

* In frameworks/bridges/wires, once you start leaving the linear elastic range, you risk **distortion, loss of fit, or fatigue**.

So if **Straight line (stress and strain increase together evenly)** \= **safe** → material springs back.

**Line starts to curve** \= **warning** → you may be near **yield**, so stop to avoid permanent bend.

#### **Simple one-liner**

**E tells you “how stiff.” The proportional limit tells you “how far you can load it and still trust that stiffness and get a clean springback.”**

**Elastic limit: the maximum stress a material can take and still return completely to its original shape when the load is removed.**

* **Below elastic limit: returns to original shape (no permanent change).**

* **Beyond elastic limit: permanent deformation occurs → it will not fully return to its original position.**

**(Elastic limit is basically the boundary between elastic and plastic behavior.)**

**It's pretty hard to see in metals so we use another terminology called the yield strength** 

**Yield Strength (σy)**  
**Definition: The stress required to produce 0.2% permanent (plastic) strain (also called 0.2% proof stress**

## **1\) Modulus of Elasticity (E) and “Stiffness” in Dental Alloys**

**High E \= stiffer (less bending)**  
**Low E \= more flexible (more bending)**

### **1\) Base-metal alloys (very stiff)**

* **Cobalt–Chromium (Co–Cr)** → **very high stiffness**  
* **Nickel–Chromium (Ni–Cr)** → **very high stiffness**  
  **Clinical meaning:** frameworks can be thinner and still resist flexing.

### **2\) Stainless steel (stiff)**

* Used in orthodontics; still **high stiffness**, but generally discussed more as a wire material.

### **3\) Noble alloys (less stiff than base metals)**

**Noble alloys \= high noble (gold-rich) or palladium-based alloys.**

* **Gold alloys (Type III/IV, high noble)** → **lower modulus than Co–Cr / Ni–Cr**  
* **Palladium-based noble alloys** → **moderate to high modulus**, but in many dental teaching comparisons, **base metals are still stiffer**.

**Clinical meaning:**  
If you use a **gold/high-noble framework**, it may need to be **bulkier/thicker** than a base-metal framework to achieve the same rigidity (same “no-flex” behavior).

---

### **Orthodontic Wires: Stiffness (E) vs Springback (Resilience)**

### **Common wire stiffness order (for similar size wires)**

* **Stainless steel** \= **stiff**  
* **Beta-titanium (TMA)** \= **moderate stiffness**  
* **NiTi** \= **low stiffness**, but **high springback** (resilience)

**Key clinical idea:**

* **NiTi**: bends easily but springs back strongly → best for **initial alignment** with light continuous forces.  
* **Stainless steel**: stiff control → best for **working/finishing, detailing, sliding mechanics**.  
* **TMA**: middle ground and easy to bend → good for **loops and adjustments**.

---

## **How wire stiffness changes with radius (ORTHO SPECIFIC)**

When you change the **thickness** of a wire, stiffness changes **a LOT**.

### **A) Bending stiffness (like when a wire flexes up/down)**

**Bending stiffness ∝ E × r⁴** (for a round wire)  
So **radius is to the 4th power** (super sensitive).

**Quick memory examples:**

* If **radius doubles** → stiffness increases **2⁴ \= 16×**  
* If **diameter doubles** → stiffness also increases **16×** (because diameter ∝ radius)

Even small changes matter:

* Increase radius by **10%** → stiffness ≈ **(1.1)⁴ ≈ 1.46** → about **46% stiffer**

### **B) Axial stiffness (pulling along its length)**

**Axial stiffness ∝ E × r²**  
(less dramatic than bending)

### **C) Torsional stiffness (twisting)**

For a round wire, torsional stiffness also scales strongly with size (commonly taught as **∝ r⁴**).

![image4](/assets/mechanical/image4.png)

To make it simple if u increase the radius if the wire is twice as thicker it will be 16 times hard to bend 4 times hard to pull it and 16 times harder to twist it

That's why when we were making adams clasp  from a 0.7mm wire it was so difficult on the other hand  finger spring and z spring were so easy as they were 0.5mm wire 

**Wire thickness (radius) effect — super important rule**  
 For a round wire, thickness affects stiffness a LOT:

* If the **radius doubles** (wire becomes twice as thick):

  * **Bending stiffness** becomes **16×** higher (r⁴) → 16× harder to bend

  * **Pulling (axial) stiffness** becomes **4×** higher (r²) → 4× harder to stretch/pull

  * **Twisting (torsional) stiffness** becomes **16×** higher (r⁴) → 16× harder to twist

**One-line memory:**  
 **Small increase in wire thickness → huge increase in bending and twisting stiffness (r⁴).**

### **One-line summary** 

* **E (modulus) \= stiffness (how much it bends).**  
* **Base metals (Co–Cr, Ni–Cr) are very stiff; gold/noble alloys are less stiff → need more bulk for the same rigidity.**  
* **Orthodontic wires:** Stainless steel **stiff**, TMA **medium**, NiTi **low stiffness but high springback**.  
* **Wire thickness rule:** **bending stiffness ∝ r⁴** → small increase in radius makes wire much stiffer.

## ---

## **2)Resilience (elastic energy storage)**

**Definition:** The **energy a material can absorb and store in the elastic range** (i.e., **without permanent deformation) and then release when the load is removed.**

### Where on the stress–strain curve:

* **Resilience \= area under the curve in the elastic region only**

* Practically: **up to the yield point / elastic limit**

* This is the “blue shaded area” in many diagrams.

**Meaning (simple):**  
 It is the **energy absorbed before permanent deformation begins**.

**So is it “energy required to permanently bend something”?**  
 Not exactly.

* **Resilience \= energy absorbed up to the start of permanent bending (yield).**

**how much energy a material can absorb and still be “unaffected”**

**Energy that can absorbed and return or its original position** 

**Clinical example:**

* **Mouthguards**: need high **resilience** so they can absorb impact and spring back (no permanent deformation).

**Orthodontic wire examples (Resilience / “springback”)** 

* **NiTi (Nickel–Titanium) — early alignment**

  * **Very high springback / high resilience**

  * Can be deflected a lot in crowded teeth and still returns

  * Gives **light, more constant forces** over a long activation range

* **TMA / Beta-titanium — mid-stage, loops & bends**

  * **Moderate springback** (between NiTi and stainless steel)

  * Easier to bend than NiTi, good for **loops and adjustments**

  * Useful when you want flexibility \+ ability to customize

* **Stainless steel — working/finishing**

  * **High stiffness (high modulus)** → less deflection

  * **Lower springback than NiTi**

  * Best for **control, detailing, sliding mechanics**, and maintaining arch form

**One-line memory:**  
 **NiTi \= maximum springback** → **TMA \= workable \+ moderate springback** → **Stainless steel \= stiff control,**

**One-line memory:**  
 **Resilience \= elastic energy before yield.**

![image5](/assets/mechanical/image5.png)

## **Plastic Region (The "Dent" Zone):**

### **3)Yield Strength (σy)**

**Definition:** The **amount of stress required to start permanent (plastic) deformation**.  
**Yield Strength:** The exact point where the material stops springing back and permanently deforms. If a bridge passes this point, it is ruined.

**Why we use “0.2% yield strength” (proof stress)**  
 Plastic deformation (permanent strain) starts gradually in many metals, so there isn’t always a sharp, obvious “yield point” on the stress–strain curve. Also, the first tiny amount of permanent strain is hard to detect directly.

**So we define a measurable standard: 0.2% yield strength (0.2% proof stress).**

* It is the **stress required to produce 0.2% permanent (plastic) strain**.

* **0.2% strain \= 0.002** (as a decimal).

* Method (conceptually): draw a line **parallel to the elastic slope**, but shifted to start at **0.2% strain** on the x-axis; where it meets the curve is the **0.2% yield strength**.

**Meaning:**  
 At stresses **below** this value → deformation is mostly elastic (material springs back).  
 At stresses **at/above** this value → the material has **measurable permanent deformation**.

**Clinical link:**  
 If a bridge/framework is stressed beyond its yield strength (especially the 0.2% proof value), it can become **permanently distorted** → misfit, open margins, occlusal issues.

If a material has low yield strength meaning less strength is required to bend it 

It tells how easily it bends do not confuse with modulus of elasticity which is how much it bends 

**Important distinction (so you don’t mix terms):**

* **Yield strength (σy)** tells you **how easily it permanently bends**.

* **Modulus (E)** tells you **how much it elastically bends** before permanent change.

**One-line example:**  
 A wire with **low yield strength** will **get permanently bent** with a smaller load compared to a wire with high yield strength.

### **Why not call it “plastic deformation”?**

Because plastic deformation is the **result** (how much permanent strain occurred), while yield strength is the **cause threshold** (how much stress is needed to cause a standard amount of permanent strain).

Because the exact start of plastic deformation can be unclear, we use the yield strength (often 0.2% proof stress) to define the onset of plastic deformation on the stress–strain curve.”

Clinically we want every material to have a very large yield point so that it is very hard to ruin it or deform it 

 **In most clinical situations, higher yield strength is “safer”** because it means the material is **harder to permanently bend or distort**.

**Why higher yield strength is usually better:**

* Needs **more stress** before permanent deformation starts

* Maintains **fit, margins, occlusion, and appliance shape** under chewing/handling forces

* Reduces risk of **distortion** in frameworks and wires

**Where this matters most (high priority):**

* **Bridges / PFM frameworks / RPD frameworks**

* **Implant bars/frameworks**

* **Working/finishing orthodontic wires (stainless steel)**

**But the correct exam line is:**  
 “Higher yield strength is generally preferred, **provided other required properties are also met** (e.g., stiffness/modulus, toughness, corrosion resistance, workability).”

**One-line memory:**  
 **Higher yield strength \= harder to permanently bend \= more clinically durable shape**

### **UTS (Ultimate Tensile Strength)**

**Definition:** The **maximum stress** a material can withstand in tension before it starts to fail.  
 On a stress–strain curve, it is the **highest point (peak)** of the curve.

**What happens after UTS (metals):**

* After reaching UTS, the material begins **necking** (local thinning).

* Then the stress the sample can carry **drops** until **fracture**.

The **maximum tensile stress** a material can withstand before **fracture**.

**Clinical meaning (dentistry):**

* **High UTS \= the material can withstand higher tensile stress before it fractures.**

* Relevant for: **bridges/frameworks, orthodontic wires, cast/forged metals**, and any component under pulling/bending forces.

**Remember:**

* **Yield strength** \= stress where **permanent bending starts**

* **UTS** \= stress where the material reaches its **maximum strength** before necking/fracture

**Definition:** Toughness is the **total energy a material absorbs before it fractures**.  
 **On the stress–strain curve:** it is the **total area under the entire curve** (elastic \+ plastic parts) up to fracture.

**Meaning (simple):**  
 “The total amount of energy required to break something.”

**Do NOT confuse with fracture toughness:**

* **Toughness** \= overall energy absorption until fracture (bulk behavior).

* **Fracture toughness** \= **resistance to crack propagation** (behavior when a crack/defect is present).

**Examples (dentistry):**

* **Zirconia:** relatively **tough for a ceramic** (more crack-resistant, harder to break than many ceramics).

* **Porcelain:** **brittle** (low energy absorption; tends to crack/shatter suddenly).

### **Fracture Toughness (KIC)**

**Definition:**  
 Fracture toughness is a material’s **resistance to crack growth (crack propagation)**.  
 It tells you **how hard it is for an existing crack to spread** and cause sudden failure.

**Why it matters:**  
 In real life, materials often contain **tiny flaws or microcracks**. A material can have high strength, but if its fracture toughness is low, a small crack can rapidly grow and the material can fracture catastrophically.

**How to think of it (simple):**

* **High fracture toughness:** cracks tend to **stop or grow slowly** → more damage-tolerant

* **Low fracture toughness:** cracks **run fast** → brittle, sudden fracture

![image6](/assets/mechanical/image6.png)

**On a stress–strain curve:**  
 Fracture toughness is **not** the same as “area under the curve.”

* Area under curve \= **toughness (energy to fracture)**

* Fracture toughness \= **crack resistance**

**Units (common):** MPa√m

**Dental relevance examples (conceptual):**

* **Glass/porcelain:** low fracture toughness → cracks spread easily

* **Metals:** high fracture toughness → cracks are less likely to run suddenly

* **Zirconia:** higher fracture toughness than many ceramics (crack resistance is improved)(HOW in ceramic )

**One-line memory:**  
 **Fracture toughness \= resistance to crack propagation.**

## **Other Mechanical Properties**

### **1\) Tensile Strength**

**Definition:** The maximum stress a material can withstand when being **pulled** before it fractures.  
 (Usually refers to **UTS** on the stress–strain curve.)

**Example:** Orthodontic wires must resist tensile/bending forces without breaking.

**Even though amalgam is a metal, it is much stronger in compression than in tension.**

So **thin or unsupported margins/edges** are prone to **fracture**, which is why amalgam restorations need **adequate bulk minimum of 1.5 mm** and **well-supported cavity design**

Dental ceramics and enamel are strong in compression but **weak in tension.**

**![image7](/assets/mechanical/image7.png)**

**Typically brittle materials are weak in tensile strength but strong in compression reasoning in ceramics** 

---

### **2\) Compressive Strength**

**Definition:** The maximum stress a material can withstand when being **compressed (pushed/squeezed)** before it crushes or fails.

**Example:** Dental ceramics and enamel perform well under compression.

Amalgam is **strong in compression but weaker in tension** (so thin edges can fracture if unsupported).

Most materials are **stronger in compression than in tension**, because **tensile forces open cracks/defects**, while compression tends to **close them**.

Metals are stronger in both 

---

### **3\) Impact Strength**

**Definition:** The ability of a material to **absorb sudden shock/impact energy** without fracturing.  
 (Related to toughness under rapid loading.)

**Impact Strength (examples)**

* **Mouthguards** should have **high impact strength** so they can absorb sudden blows without cracking.

 **For restorations Impact strength (shock resistance) tends to be:**  
 **Resin composite \> Amalgam \> Glass ionomer cement (GIC)**  
 **Why**

* **Composite (higher impact strength):** polymer resin matrix can **absorb and dissipate energy**, and crack growth is slowed by fillers/resin bonding → less “shattering.”

* **Amalgam (lower impact strength than composite):** it’s relatively **brittle in tension** with limited ability to absorb sudden energy → thin/unsupported parts can chip/fracture.

* **GIC (low impact strength):** more **brittle** (glass \+ ionic matrix) → cracks propagate easily, so it fractures with sudden удар/shock.

**One-line note:**  
 **Composite \= more shock-resistant; Amalgam and GIC \= more brittle (especially GIC**

**Low impact strength materials (brittle)**

* **Dental ceramics** have **low impact strength** → they can **chip or fracture** if dropped or struck.

* **Denture base acrylic (PMMA)** has **lower impact strength than mouthguard materials**, so dentures can **fracture if dropped**, especially on hard surfaces.  
  


**Impact strength tells us whether a material will break or not when a large amount of energy is applied very quickly.”**

### **Simple comparison (for memory)**

* **Toughness:**

   **“Total energy to break it (slow or fast).”**

* **Impact strength:**

   **“How well it survives a sudden blow.”**

**When we try to break something like a stick or something we try to do in in a fast jerk if we do it slowly it dosent break as smoothly** 

---

### **4\) Ductility**

**Definition:** The ability of a material to undergo **plastic deformation in tension** (can be drawn into wire) before fracture.  
 Measured by **% elongation** or **reduction in area**.

**Example:** Metals used for wires and bending procedures need good ductility.

**Gold** — especially **pure/annealed gold (gold foil)** — is considered the **most ductile dental material** (can be stretched/drawn without breaking).

**How we measure it:**

* **% elongation** (how much it lengthens before breaking)

* **% reduction in area**

**Simple meaning :**  
 “How much a wire can be stretched (permanently) before it breaks.”

**Important note:**  
 This is about **plastic stretch before fracture**, not just elastic stretch.

This is pulling force 

![image8](/assets/mechanical/image8.png)

---

### **5\) Malleability**

**Definition:** The ability of a material to undergo **plastic deformation in compression** (can be hammered/rolled into sheets) without cracking.

**Example:** Gold is the most ductile and  highly malleable (can be made into thin foils/sheets).

This is pushing force or compression force

![image9](/assets/mechanical/image9.png)

### 6\) **Brittleness**

**Definition:**  
 Brittleness is the tendency of a material to **fracture suddenly with little or no plastic deformation**.

**Simple meaning:**  
 **“It breaks without bending.”glass like** 

**On the stress–strain curve:**

* **Very small plastic region** (almost no “dent zone”)

* **Low strain at fracture**

* **Low toughness** (small area under curve)

**Related properties:**

* Brittle materials usually have **low fracture toughness** (cracks spread easily).

* Brittle ≠ soft. A material can be **hard but brittle** (e.g., ceramics).

**Dental examples (brittle):**

* **Porcelain / dental ceramics**

* **Enamel** (brittle compared to dentin)

* **Glass ionomer cement (GIC)**

* **Denture porcelain teeth** (more brittle than resin teeth)

**Less brittle (more ductile/energy-absorbing):**

* **Metals** (gold alloys, stainless steel, Co–Cr, Ni–Cr)

* **Resin composites** (generally tougher than ceramics)

**Clinical importance:**  
 Brittle materials should not be left **thin or unsupported** → they crack/chip easily.  
 So we use: **adequate thickness \+ rounded internal line angles \+ good support** (avoid sharp corners/stress concentration).

### **Brittleness — Clinical Summary (Margin Design)**

**Core rule:** Brittle materials fracture if they are **thin** or **unsupported** → they need **bulk and support** at margins.

#### **1\) Amalgam (low edge strength)**

* **Problem:** Thin amalgam margins snap.

* **Result:** **Marginal fracture/ditching** → leakage \+ recurrent caries.

* **Margin design:** **90° butt joint**; **no bevels**.

#### **2\) Porcelain / ceramics (low fracture toughness)**

* **Problem:** Cracks propagate easily, especially in thin areas.

* **Result:** **Chipping or catastrophic fracture**.

* **Margin design:** **Shoulder / heavy chamfer** \+ **adequate thickness** (avoid feather edges).  
* ![image10](/assets/mechanical/image10.png)

#### **3\) Unsupported enamel**

* **Problem:** Enamel is brittle without dentin support.

* **Result:** Margin fractures under chewing.

* **Fix:** Remove **unsupported enamel rods**.

#### **Quick comparison**

* **Amalgam:** brittle → **butt joint** (no bevel).

* **Porcelain:** brittle → **shoulder/heavy chamfer** (bulk).

* **Gold:** ductile → **bevel/feather** (can thin \+ burnish).

![image11](/assets/mechanical/image11.png)

### **7)Hardness:**

**Hardness \= surface scratch/indentation resistance.** 

Clinically, it mainly tells you **(1) how fast the restoration itself wears** and **(2) how much it *might* wear the opposing surface** — but **opposing-tooth wear depends MORE on surface roughness/polish than hardness alone.**

## **What hardness *correlates with* (clinically useful)**

* **Higher hardness → better self–wear resistance**  
  (keeps anatomy/occlusion longer; less scratching)  
* **Higher hardness → harder to finish/adjust/polish**  
  (more bur time, more heat, more difficulty getting a smooth surface)  
* **Higher hardness \+ rough surface → more antagonist wear** (enamel gets abraded)

  ## **What hardness does *NOT* guarantee**

* **Hard ≠ automatically more abrasive.**  
  A **high-hardness but well-polished** surface can be gentle, while a **less-hard but rough** surface can still abrade.  
* **Hardness ≠ strength.**  
  Strength \= load before fracture/bending; hardness \= surface resistance.

  ## **“Different materials” — how hardness plays out clinically**

  ### **Very hard / hard surfaces**

**Ceramics (porcelain) and zirconia**

* **Self-wear:** very low (they stay shiny/anatomic)  
* **Opposing enamel:** can be **high wear if rough** (after adjustment or if glaze is removed)  
* **Clinical key:** **polish matters more than glaze** for antagonist friendliness; rough ceramic is the enemy.

**Porcelain denture teeth**

* **Harder** → keep cusps (good self-wear resistance)  
* Can be **more abrasive** to opposing natural teeth if occlusion/polish isn’t ideal.


  ### **Natural tooth reference**

**Enamel**

* Hard, but can still wear if the opposing surface is rough/harder and unpolished.

  ### **Medium hardness (varies)**

**Composites**

* Usually **wear more than ceramics** (can lose occlusal anatomy over time)  
* Often **kinder to opposing enamel** than rough ceramics because they’re less hard and can be polished smoothly.

**Amalgam**

* **Good in compression**, but surface can wear/ditch over time compared to ceramics  
* Generally **less abrasive to opposing enamel** than rough ceramics (again: surface \+ microstructure matter).

  ### **Lower hardness**

**Gold / high noble**

* **Softer** → can wear a bit, but tends to be **“kind” to opposing enamel**  
* Great when you want a restoration that doesn’t act like sandpaper.

**Acrylic denture teeth (PMMA)**

* **Low hardness** → wears faster (flat cusps over time)  
* Usually **gentler** on opposing teeth than porcelain denture teeth.

## **Base-metal alloys (Co–Cr, Ni–Cr): hardness correlation \+ clinical relevance**

**Hardness level:** generally **high** (harder than noble gold alloys, often harder than many restorative metals).

### **What that means clinically**

1. **They resist scratching and surface wear (self-wear)**

* Co–Cr / Ni–Cr surfaces don’t get scratched easily → durable metal surface.

* Useful where you want the metal surface to stay intact (e.g., metal components rubbing/contacts).

2. **They are harder to adjust, finish, and polish**

* Chairside: more difficult to cut/shape; burs wear faster; takes longer to get a smooth polish.

* Lab: finishing and polishing is more demanding than gold.

3. **Opposing tooth wear**

* A **high-hardness metal** can contribute to wear of the opposing surface **if left rough** (after adjustment).

* But metals (including base metals) are usually **less abrasive than rough ceramics** because polished metal can be very smooth.

* **Clinical key:** after adjusting Co–Cr/Ni–Cr, **polish it properly** to reduce antagonist wear.

### **Quick comparison line (exam-friendly)**

* **Ceramic hardness \+ roughness → highest risk of opposing enamel wear.**

* **Base-metal alloys are hard, but when well polished they are usually relatively “enamel-friendly.”**

* **Gold is softer and typically the most “kind” to opposing enamel (but may wear itself more).**

  ## **The simplest clinical rule**

* If it’s **hard \+ rough** → **it will abrade the opposing tooth.**  
* If it’s **hard \+ highly polished** → **much safer.**  
* If it’s **soft** → **it may wear itself** (lose anatomy), but is often kinder to the opposing tooth.

**B. The "Confusables" Table**

| Concept A | Concept B | The Difference |
| :---- | :---- | :---- |
| **Ductility** | **Malleability** | **Ductility** \= Pulling into a wire (Tension). **Malleability** \= Hammering into a sheet (Compression). **Most malleable dental material:** **Gold** (especially **pure/annealed gold**, e.g., gold foil). **Memory line: Ductile \= wire** → Gold is best **Malleable \= sheet/foil** → Gold is best  |
| **Stress** | **Strain** | **Stress** \= The internal force (Pressure). **Strain** \= The physical shape change (Deformation). |
| **Hardness** | **Abrasion** | **Hardness** \= Resistance to indentation. **Abrasion** \= Resistance to rubbing/wear. A material can be hard but still wear away (abrade) opposing teeth\! |

---
`,Xe=String.raw`

# THERMAL PROPERTIES

### The physics of hot and cold in the mouth.

## 1. Coefficient of Thermal Expansion

The Coefficient of Thermal Expansion is arguably the most critical thermal property for the long-term clinical success of a dental restoration.

### 1. Definition & Formula
The CTE measures the **fractional change in length** (or volume) of a material for every degree of temperature change. Or:
*“CTE is the fractional change in length per unit change in temperature”*

- **In Simple Terms:** It describes how much a material "breathes" (expands or contracts) when exposed to hot or cold stimuli.
CTE tells how much a material expands or contracts for each 1°C change in temperature, relative to its original length.

**Formula:**
**ΔL = α × L₀ × ΔT**

or
Change in length = Coefficient of thermal expansion × Original length × Change in temperature

**Where:**
- **ΔL** = change in length
- **α** = coefficient of thermal expansion (this is what we are talking about)
- **L₀** = original length
- **ΔT** = temperature change

| Material | CTE (ppm/°C) | Match to Tooth | Clinical Risk |
| --- | --- | --- | --- |
| **Enamel** | **~11.4** | **Standard** | **N/A** |
| **Dentin** | **~8.3** | **Standard** | **N/A** |
| Ceramics | ~12.0 | Excellent | Very low leakage risk. |
| Glass Ionomer | 10.0 - 11.0 | Best Match | Expands almost exactly like Enamel |
| Gold Alloy | ~14.0 | Good | Reliable long-term seal. |
| Amalgam | ~25.0 | Moderate | Initial leakage; later sealed by corrosion products. |
| Composite | ~30 – 50 | Poor | High percolation risk; relies heavily on bond strength. |
| Unfilled Acrylic | ~80+ | Terrible | Guaranteed leakage; used for temporaries only. |

### 2. Clinical Relevance: Percolation
If a restorative material expands or contracts at a different rate than the tooth (mismatch in **α**), it leads to failure.

- **The Problem:**
  1. **Cold Stimulus:** Patient drinks ice water. If the filling contracts more than the tooth, a gap opens at the margin.
  2. **Percolation:** Saliva and bacteria are sucked into this gap.
  3. **Warm Stimulus:** Patient drinks hot tea. The filling expands and seals the gap, trapping the bacteria inside.

- **The Result:** Recurrent decay and tooth sensitivity.

![Image](/assets/thermal/thermal_p3_img0.png)

### 3. Clinical Consequences
A significant CTE mismatch leads to four primary clinical failures:
- **Microleakage:** Visible staining at the margins of the restoration.
- **Recurrent Caries:** Secondary decay forming under the filling due to trapped bacteria.
- **Post-Operative Sensitivity:** Fluid movement in the gap stimulates the nerve (based on the Hydrodynamic Theory of Pain).
- **Bond Failure:** Repeated thermal cycling causes "fatigue stress," eventually snapping the adhesive layer.

**Key Takeaway:** Since composites cannot match the tooth's CTE, we rely on **Bonding Agents** to mechanically resist these forces. If the bond is weak, thermal cycling will inevitably tear the filling away from the tooth wall.

**PFM Rule:** The metal substructure must have a slightly higher CTE than porcelain so that, on cooling after firing, the metal contracts more and places the porcelain in compression—reducing craze cracks (porcelain is strong in compression).

![Image](/assets/thermal/thermal_p4_img0.png)

**One-line exam takeaway:**
CTE mismatch causes percolation; close CTE matching (or compressive porcelain in PFM) preserves marginal integrity.

---

## 2. Thermal Diffusivity (αᵗ)

### 1. Definition
The rate at which a temperature change spreads through a material (how fast heat/cold reaches the other side).

**The Formula:**
**αᵗ = k / (ρ × c)**

or
Diffusivity = conductivity ÷ heat-storage ability (density × specific heat).

**What each term means:**
- **αᵗ** (thermal diffusivity) → how fast temperature changes spread
- **k** → thermal conductivity (how much a material allows temperature to go through)
- **ρ** → density
- **c** → specific heat

**Why this makes sense:**
- Higher **k** → heat moves more easily → **αᵗ** increases
- Higher **ρ** or **c** → material needs more energy to change temperature → **αᵗ** decreases

**Why it matters clinically:**
Diffusivity tells you **speed**, not amount. It predicts how quickly tissues feel temperature changes.

### 2. Clinical Relevance
Thermal diffusivity is often more clinically relevant than simple conductivity because it accounts for a material's mass and its ability to store heat (thermal inertia).

#### **A. Denture Bases**
**1. Acrylic (PMMA)**
- **Thermal Insulation:** Acts as a barrier: low thermal conductivity/diffusivity → temperature change reaches the palate more slowly.
- **Delayed Sensation (Reduced Thermal Feedback):** Palatal temperature is felt less quickly/less intensely → reduced “natural” temperature perception (patient may not notice temperature change as fast on the palate).

**2. Metal (Co-Cr)**
- **High Diffusivity (Rapid Temperature Transfer):** Transfers hot/cold rapidly → palate feels temperature changes quickly (more natural thermal sensation).
- **Natural Sensation:** Restores temperature perception closer to a natural palate (often improves comfort/food temperature awareness).
- **Instant Discomfort to Extremes:** Very hot/cold stimuli can be felt almost immediately on mucosa → patient may withdraw/spit quickly.

#### **B. Restorations**
- **Pulp Protection:** Materials with low diffusivity (such as Calcium Hydroxide liners or Zinc Phosphate bases) are excellent thermal insulators. They delay the heat pulse from a drill or hot foods, protecting the dental pulp from sudden thermal shock.

### 3. Relative comparison (high → low **αᵗ**)
- **Dental amalgam:** high (transmits heat very fast)
- **Enamel:** moderate
- **Composite resin:** similar to enamel
- **Dentin:** low (excellent natural insulator)
- **Zinc phosphate cement:** low (good insulator)

**Common exam trap**
- ❌ “Low diffusivity means no temperature sensation”
- ✅ Correct: Low diffusivity means **delayed** sensation (protective).

**One-line exam takeaway:**
Thermal diffusivity measures speed of temperature spread.
“For restorations we need lower conductivity and diffusivity to protect the pulp”
“For dentures it’s a double sword—both have benefits and risks”

---

## 3. Thermal Conductivity (K or κ)

### 1. Definition
The measure of how easily heat flows through a material.

**The Definition:**
Thermal conductivity is the quantity of heat that passes through a material of unit thickness and unit area, per unit time, when the temperature difference between its opposite faces is one degree.

- **The Difference:** While Diffusivity measures **speed** (how fast), Conductivity measures the **amount** of energy.
- **High Conductivity:** Heat passes through easily (Conductors).
- **Low Conductivity:** Heat is blocked (Insulators).

**The Formula:**
It is defined as the number of calories that pass through a specimen of 1 cm thickness and 1 cm² cross-sectional area per second, given a 1°C temperature difference.

**K = (Heat × Thickness) / (Area × Time × ΔT)**

### 2. Clinical Relevance
The goal in dentistry is generally to protect the living pulp from thermal changes.

#### A. Large Metallic Restorations (Amalgam/Gold)
- **The Problem:** Metals have high thermal conductivity. If a deep cavity is filled directly with amalgam, the cold from ice cream or heat from coffee will conduct straight through the metal to the pulp, causing sharp pain.
- **The Solution:** You must place an **Insulating Base** (like Zinc Phosphate or Calcium Hydroxide) under the metal filling. This layer has low conductivity and blocks the heat flow.

![Image](/assets/thermal/thermal_p6_img0.png)

### 3. Comparison of Materials
*Units: cal / sec / cm² / °C / cm (approx.)*

| Material | Conductivity (K) | Classification |
| --- | --- | --- |
| **Pure Gold** | **0.710** | **Super Conductor** |
| **Dental Amalgam** | **0.055** | **Conductor** (Requires base) |
| Zinc Phosphate | 0.0028 | Insulator (Used as base) |
| Composite Resin | 0.0026 | Insulator (Safe without base) |
| Glass Ionomer | ~0.0017 | Insulator (Matches Dentin closely) |
| **Enamel** | **0.0022** | **Natural Insulator** |
| **Dentin** | **0.0015** | **Natural Insulator** |

### 4. Thermal Diffusivity vs. Conductivity
Thermal conductivity and thermal diffusivity are correlated; if one increases the other might also increase.

| Property | Definition | Clinical "Golden Rule" |
| --- | --- | --- |
| **Conductivity** | The **quantity** of heat passed. | **Metal fillings need a Base.** Metal conducts heat instantly to the pulp; a cement base (0.5mm) acts as an insulator. |
| **Diffusivity** | The **speed** of heat passed. | **Denture bases need LOW diffusivity.** This gives the patient reaction time (to spit out hot soup) before burning their palate. |

`,Em=[],km=[],Mm=[],Pm=[],Rm=Io+`

---

`+xo+`

---

`+Xe,de=["Thermal Diffusivity = Speed of heat transfer (k / ρCp)","Thermal Conductivity = Quantity of heat transfer","Denture Base: Low diffusivity is desired for insulation but reduces sensation.","Metal Base: High diffusivity restores sensation but transmits hot/cold shock.","CTE Mismatch leads to percolation (microleakage).","Amalgam needs a base because it is a thermal conductor.","Zirconia has transformation toughening (tetragonal to monoclinic expansion)."],dt=t=>t==="FCPS"?`
      **CONTEXT: Postgraduate FCPS Part 1 (Dentistry/Medicine)**
      - **Level:** Advanced/Specialist.
      - **Focus:** High-yield "Golden File" past paper topics, specific values, deep mechanism of action, and exclusions.
      - **Key References:** Snell's Clinical Anatomy (not Gray's students), BRS Physiology, Robbins Basic Pathology, Katzung (Pharma).
      - **Tone:** Concise, technical, focusing on exam keywords and buzzwords used by CPSP.
    `:t==="ORE"?`
      **CONTEXT: ORE (Overseas Registration Exam) - UK**
      - **Level:** UK General Dental Council (GDC) Registration Standard.
      - **Focus:** UK Guidelines (NICE, SDCEP, FGDP, SIGN), Medical Emergencies in Dental Practice, Law & Ethics (GDC Standards), Evidence-Based Dentistry.
      - **Key References:** Oxford Handbook of Clinical Dentistry, Master Dentistry Vol 1 & 2, Pink Book (Essential of Oral Path), GDC Standards.
      - **Tone:** Professional, safety-critical, guideline-focused. Emphasize "Best Practice" in the UK.
    `:`
      **CONTEXT: Undergraduate BDS (Bachelor of Dental Surgery)**
      - **Level:** University Professional Exam / Finals.
      - **Focus:** Building core concepts, detailed anatomy/physiology, standard textbook definitions and classifications.
      - **Key References:** Ten Cate's Oral Histology, Guyton/Ganong Physiology, BD Chaurasia/Gray's Anatomy, Carranza's Periodontology, Phillips Science of Dental Materials.
      - **Tone:** Educational, explanatory, academic.
    `,Dm=async(t,e,i)=>{if(t===I.DENTAL_MATERIALS&&i){const c=i.toLowerCase();if(c==="properties - thermal"||c.includes("thermal properties")||c.includes("properties")&&c.includes("thermal"))return{subject:I.DENTAL_MATERIALS,content:Xe,keyPoints:de}}if(t===I.DENTAL_MATERIALS&&i&&(i.toLowerCase().includes("properties")||i.toLowerCase()==="physical & mechanical properties")){const c=i.toLowerCase();return c.includes("summary")?{subject:I.DENTAL_MATERIALS,content:Io,keyPoints:de}:c.includes("mechanical")?{subject:I.DENTAL_MATERIALS,content:xo,keyPoints:de}:c.includes("thermal")?{subject:I.DENTAL_MATERIALS,content:Xe,keyPoints:de}:{subject:I.DENTAL_MATERIALS,content:Rm,keyPoints:de}}if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("impression"))return{subject:I.DENTAL_MATERIALS,content:Lu,keyPoints:Nu};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("gypsum"))return{subject:I.DENTAL_MATERIALS,content:Hu,keyPoints:Gu};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("investment"))return{subject:I.DENTAL_MATERIALS,content:cm,keyPoints:dm};if(t===I.DENTAL_MATERIALS&&i&&(i.toLowerCase().includes("gic")||i.toLowerCase().includes("glass ionomer")))return i.toLowerCase().includes("summary")?{subject:I.DENTAL_MATERIALS,content:nn.content,keyPoints:nn.keyPoints}:{subject:I.DENTAL_MATERIALS,content:tn.content,keyPoints:tn.keyPoints};if(t===I.DENTAL_MATERIALS&&i&&(i.toLowerCase().includes("cement")||i.toLowerCase().includes("liner")||i.toLowerCase().includes("base")))return{subject:I.DENTAL_MATERIALS,content:gm,keyPoints:fm};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("casting"))return{subject:I.DENTAL_MATERIALS,content:mm,keyPoints:hm};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("composite")&&i.toLowerCase().includes("detailed"))return{subject:I.DENTAL_MATERIALS,content:Zi,keyPoints:Ne};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("composite")&&i.toLowerCase().includes("summary"))return{subject:I.DENTAL_MATERIALS,content:Ou,keyPoints:Ne};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase()==="composite")return{subject:I.DENTAL_MATERIALS,content:Zi,keyPoints:Ne};if(t===I.DENTAL_MATERIALS&&i&&(i.toLowerCase().includes("adhesion")||i.toLowerCase().includes("bonding")))return{subject:I.DENTAL_MATERIALS,content:Ju,keyPoints:zu};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("wax")&&i.toLowerCase().includes("detailed"))return{subject:I.DENTAL_MATERIALS,content:ji,keyPoints:Le};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("wax")&&i.toLowerCase().includes("summary"))return{subject:I.DENTAL_MATERIALS,content:Yu,keyPoints:Le};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase()==="wax")return{subject:I.DENTAL_MATERIALS,content:ji,keyPoints:Le};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("metals summary"))return{subject:I.DENTAL_MATERIALS,content:$u,keyPoints:Zu};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase()==="alloys")return{subject:I.DENTAL_MATERIALS,content:Xu,keyPoints:Qu};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("base metal"))return{subject:I.DENTAL_MATERIALS,content:em,keyPoints:ju};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("wrought"))return{subject:I.DENTAL_MATERIALS,content:im,keyPoints:tm};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("noble"))return{subject:I.DENTAL_MATERIALS,content:om,keyPoints:nm};if(t===I.DENTAL_MATERIALS&&i&&(i.toLowerCase().includes("ceramic")||i.toLowerCase().includes("porcelain")))return i.toLowerCase().includes("summary")?{subject:I.DENTAL_MATERIALS,content:Am.content,keyPoints:on}:{subject:I.DENTAL_MATERIALS,content:xm,keyPoints:on};if(t===I.DENTAL_MATERIALS&&i&&i.toLowerCase().includes("amalgam"))return i.toLowerCase().includes("summary")?{subject:I.DENTAL_MATERIALS,content:vm,keyPoints:en}:{subject:I.DENTAL_MATERIALS,content:wm,keyPoints:en};const n=new ct({apiKey:"PLACEHOLDER_API_KEY"}),s=dt(e),r=i?`Specific Topic: **${i}** (under subject ${t})`:`Subject: **${t}`,l=await n.models.generateContent({model:"gemini-3-flash-preview",contents:`
    ${s}
    
    Provide a high-yield summary for the ${r}.
    Ensure the content is strictly tailored to the reference books and level of difficulty specified in the context above.
    Start with a "Exam Scope" sentence defining what is most important for this specific topic in the exam.
    `,config:{responseMimeType:"application/json",responseSchema:{type:q.OBJECT,properties:{subject:{type:q.STRING},content:{type:q.STRING},keyPoints:{type:q.ARRAY,items:{type:q.STRING}}},required:["subject","content","keyPoints"]}}});return JSON.parse(l.text)},Nm=async(t,e=5,i,n,s="Medium")=>{if(t===I.DENTAL_MATERIALS&&n&&(n.toLowerCase().includes("properties")||n.toLowerCase()==="physical & mechanical properties")){let h=[];switch(s){case"Easy":h=[...Em];break;case"Hard":h=[...Mm];break;case"Challenge":h=[...Pm];break;case"Medium":default:h=[...km];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("impression")){let h=[];switch(s){case"Easy":h=[...Ji];break;case"Hard":h=[...Ki];break;case"Challenge":h=[...Ji,...Yi,...Ki];break;case"Medium":default:h=[...Yi];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("gypsum")){let h=[];switch(s){case"Easy":h=[...Fu];break;case"Hard":h=[...Uu];break;case"Challenge":h=[...Wu];break;case"Medium":default:h=[...Bu];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("investment")){let h=[];switch(s){case"Easy":h=[...no];break;case"Hard":h=[...so];break;case"Challenge":h=[...um];break;case"Medium":default:h=[...oo];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("casting")){let h=[];switch(s){case"Easy":h=[...ao];break;case"Hard":h=[...lo];break;case"Challenge":h=[...pm];break;case"Medium":default:h=[...ro];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&(n.toLowerCase().includes("cement")||n.toLowerCase().includes("liner")||n.toLowerCase().includes("base"))){let h=[];switch(s){case"Easy":h=[...co];break;case"Hard":h=[...mo];break;case"Challenge":h=[...ym];break;case"Medium":default:h=[...uo];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("composite")){let h=[];switch(s){case"Easy":h=[...Qn];break;case"Hard":h=[...jn];break;case"Challenge":h=[...Vu];break;case"Medium":default:h=[...Xn];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&(n.toLowerCase().includes("adhesion")||n.toLowerCase().includes("bonding"))){let h=[];switch(s){case"Easy":h=[...$i];break;case"Hard":h=[...Xi];break;case"Challenge":h=[...$i,...Qi,...Xi];break;case"Medium":default:h=[...Qi];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("wax")){let h=[];switch(s){case"Easy":h=[...eo];break;case"Hard":h=[...io];break;case"Challenge":h=[...Ku];break;case"Medium":default:h=[...to];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("amalgam")){let h=[];switch(s){case"Easy":h=[...ho];break;case"Hard":h=[...go];break;case"Challenge":h=[...bm];break;case"Medium":default:h=[...po];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&(n.toLowerCase().includes("gic")||n.toLowerCase().includes("glass ionomer"))){let h=[];switch(s){case"Easy":h=[...fo];break;case"Hard":h=[...wo];break;case"Challenge":h=[...Im];break;case"Medium":default:h=[...yo];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&n.toLowerCase().includes("metal")){let h=[];switch(s){case"Easy":h=[...sm];break;case"Hard":h=[...rm];break;case"Challenge":h=[...lm];break;case"Medium":default:h=[...am];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}if(t===I.DENTAL_MATERIALS&&n&&(n.toLowerCase().includes("ceramic")||n.toLowerCase().includes("porcelain"))){let h=[];switch(s){case"Easy":h=[...vo];break;case"Hard":h=[...Co];break;case"Challenge":h=[..._m];break;case"Medium":default:h=[...bo];break}const p=h.sort(()=>.5-Math.random());return p.slice(0,Math.min(e,p.length))}const r=new ct({apiKey:"PLACEHOLDER_API_KEY"});let l=dt(i);const c=t==="Comprehensive Mega Test";let u="";if(c){const h=n;u=`Comprehensive Exam covering: ${h}`,l=`You are generating a mixed-subject exam test for the ${i} curriculum. The student has completed the following modules: ${h}. Ensure questions are fairly distributed across these subjects.`}else u=n?`Topic: **${n}** (Subject: ${t})`:`Subject: **${t}**`;let d="";switch(s){case"Easy":d="Questions should be straightforward recall, definitions, or basic concept checks. Options should be clearly distinct.";break;case"Medium":d="Questions should be clinical scenarios or application-based. Options should have good distractors but a clear best answer.";break;case"Hard":case"Challenge":d="Questions should be complex clinical vignettes, requiring multi-step reasoning, diagnosis of rare presentations, or management of complications. Options should be very close distractors requiring precise knowledge.";break}const m=await r.models.generateContent({model:"gemini-3-flash-preview",contents:`
    You are an expert dental exam item-writer (FCPS/ADC style). Generate MCQs ONLY from modules marked as COMPLETED.

    INPUTS YOU WILL RECEIVE:
    1) COMPLETED_MODULES: ${u}
    2) MODULE_CONTENT: ${c?"Comprehensive Exam - Random Selection from Internal Knowledge Base aligned with Curriculum":l}

    STRICT RULES (MUST FOLLOW):
    - Use ONLY the modules listed in COMPLETED_MODULES.
    - Create Single Best Answer MCQs (A–D), exactly one correct option.
    - Do not use "All of the above" or "None of the above".
    ${c?"- Since this is a Mega Test, use your expert internal knowledge to generate high-yield questions for these subjects, strictly adhering to the curriculum level.":"- Explanations must be based ONLY on MODULE_CONTENT (no outside knowledge)."}
    - Difficulty distribution: 60% Medium, 25% Hard, 15% Easy.
    - Include at least 25% clinical vignette questions.
    - Avoid duplicates and repeated stems.

    **Difficulty Level: ${s}**
    ${d}

    Generate ${e} questions following these requirements:
    - If FCPS: Questions should be one-best-type (BCQ) often tricky, focusing on "Most common", "Most specific", or "First line".
    - If ORE: Questions should focus on UK guidelines, safety, ethical dilemmas, and "Single Best Answer" (SBA) format.
    - If BDS: Questions should focus on core curriculum, definitions, classification, and standard treatment planning.
    ${c?"":"- Ensure the explanation cites the logic from the relevant reference books mentioned in the context."}
    `,config:{responseMimeType:"application/json",responseSchema:{type:q.ARRAY,items:{type:q.OBJECT,properties:{id:{type:q.STRING},question:{type:q.STRING},options:{type:q.ARRAY,items:{type:q.STRING}},correctAnswerIndex:{type:q.NUMBER},explanation:{type:q.STRING}},required:["id","question","options","correctAnswerIndex","explanation"]}}}});return JSON.parse(m.text)},Lm=async(t,e="BDS")=>{const i=new ct({apiKey:"PLACEHOLDER_API_KEY"}),n=dt(e);return(await i.models.generateContent({model:"gemini-3-pro-preview",contents:`
    You are an AI Tutor.
    ${n}

    Student Question: "${t}"
    
    Answer the question strictly adhering to the depth and references required for the selected stream.
    Use Markdown for formatting.
    `,config:{thinkingConfig:{thinkingBudget:2e3}}})).text};export{Nm as a,Lm as b,Dm as f};
