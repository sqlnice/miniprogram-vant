/**
 * Created Jam 2020-04-02
 * 公共方法
 */

const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

//按照每3位逗号分隔,字符串截子串法
const toCommaFormat = (number) => {
  //如果是数字，则转换为字符串
  if (typeof number === "number") {
    number = String(number);
  }

  var pointIndex = number.lastIndexOf("."); //获取小数点的位置
  var hasDecimal = pointIndex !== -1; //检查是否包含小数点
  var numberInteger = hasDecimal ? number.substring(0, pointIndex) : number; //获取数的整数部分
  var length = numberInteger.length;
  if (length > 3) {
    var numberFormat = "";
    //从尾部往前截子串拼接
    for (var i = numberInteger.length; i > 0; i = i - 3) {
      //当前子串+之前拼接好的子串(因：substring(0,1) == substring(-2,1)，故无需判断i-3为负数的情况)
      numberFormat =
        numberInteger.substring(i - 3, i) +
        (numberFormat === "" ? "" : "," + numberFormat);
    }
    //整数部分+小数部分
    var numberDecimal = hasDecimal ? number.substring(pointIndex) : "";
    return numberFormat + numberDecimal;
  } else {
    //无需分隔，直接返回
    return number;
  }
};

module.exports = {
  formatTime,
  toCommaFormat,
};
