//接口参数替换
String.prototype.format = function() {
  if(arguments.length == 0) return this;
  var param = arguments[0];
  var s = this;
  if(typeof(param) == 'object') {
    for(var key in param)
      s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
    return webApi.Host + s;
  } else {
    for(var i = 0; i < arguments.length; i++)
      s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return webApi.Host + s;
  }
};

//删除字符两端空格
String.prototype.trim=function()
{
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
