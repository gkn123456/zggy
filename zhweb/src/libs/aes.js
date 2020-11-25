import cryptoJS from 'crypto-js'
import cfg from "@/../config/index"
import tool from "@/libs/aes"
import md5 from 'js-md5';

export default {
  //aes 加密
  encrypt(word, sk) {
    var key = cryptoJS.enc.Utf8.parse(sk)
    var srcs = cryptoJS.enc.Utf8.parse(word)
    var encrypted = cryptoJS.AES.encrypt(
      srcs,
      key,
      { iv: cryptoJS.enc.Utf8.parse(sk.substring(0, 16)), mode: cryptoJS.mode.CFB, padding: cryptoJS.pad.NoPadding },
    )
    return encrypted.toString()
  },

  //aes 解密
  decrypt(word, sk) {
    var key = cryptoJS.enc.Utf8.parse(sk)
    var decrypt = cryptoJS.AES.decrypt(
      word,
      key,
      { iv: cryptoJS.enc.Utf8.parse(sk.substring(0, 16)), mode: cryptoJS.mode.CFB, padding: cryptoJS.pad.NoPadding },
    )
    return cryptoJS.enc.Utf8.stringify(decrypt).toString()
  },

  // ASCII排序
  sortAsc(obj) {
    let arr = new Array();
    let num = 0;
    for (let i in obj) {
      arr[num] = i;
      num++;
    }

    let sortArr = arr.sort();
    let str = '';             //自定义排序字符串
    for (let i in sortArr) {
      str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
    }

    let char = '&'
    str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    return str;
  },

  /**
   * MD5加签
   * @param {加签数据} signData 
   */
  md5Encrypt(signData, key) {
    let data = tool.sortAsc(signData) + "&" + key
    let sign = md5.base64(data)
    return sign
  },

  /**
 * MD5验签
 * @param {加签的数据} signData 
 * @param {得到的签文} sgins 
 */
  md5Decrypt(signData, sgins, key) {
    let data = tool.sortAsc(signData) + "&" + key
    let sign2 = md5.base64(data)
    return sign2 === sgins
  },
  /*
  * 参数获取
   */
  getParams(a) {
    var p = tool.encrypt(JSON.stringify(a), cfg.dev.aesKey)
    var par = {
      p: p,
      tm: Date.parse(new Date()) / 1000
    }
    par.sign = tool.md5Encrypt(par, cfg.dev.signKey)
    return par
  }
}