var webApi = {
  Host:  'http://192.168.1.15/gyssAdmin',
  //文本分析接口。根据方法设置token
  TextAnalysis : { 
    GetSummary: '/api/TextAnalysis/GetSummary', //获取摘要; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:²»ÐèÒª£»²ÎÊýËµÃ÷:[p=¡·Î´×¢ÊÍ£»]
    GetKeyword: '/api/TextAnalysis/GetKeyword', //获取关键词; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:²»ÐèÒª£»²ÎÊýËµÃ÷:[p=¡·Î´×¢ÊÍ£»]
    GetSegment: '/api/TextAnalysis/GetSegment', //获取人名、地名、机构名; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:²»ÐèÒª£»²ÎÊýËµÃ÷:[p=¡·Î´×¢ÊÍ£»]
    },
    //用户管理¡£¸ù¾Ý·½·¨ÉèÖÃtoken
    User : { 
    GetUser: '/api/User/GetUser', //获取当前用户信息; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    },
    //新闻¡£È«²¿ÐèÒªtoken
    News : { 
    GetNews: '/api/News/GetNews?keyword={keyword}&p={p}&ps={ps}', //获取新闻集合; ·½Ê½:GET; ²ÎÊýËµÃ÷:[keyword=¡·Î´×¢ÊÍ£»p=¡·页面索引£»ps=¡·页面大小£»]
    Get: '/api/News/Get/{id}', //获取指定的新闻信息; ·½Ê½:GET; ²ÎÊýËµÃ÷:[id=¡·新闻编号£»]
    Delete: '/api/News/Delete/{id}', //获取各地在新闻中出现的频次; ·½Ê½:POST; ²ÎÊýËµÃ÷:[id=¡·Î´×¢ÊÍ£»]
    },
    //Î´×¢ÊÍ¡£È«²¿ÐèÒªtoken
    Knowledge : { 
    GetKnowledges: '/api/Knowledge/GetKnowledges?keyword={keyword}&type={type}&p={p}&ps={ps}', //获取知识库信息; ·½Ê½:GET; ²ÎÊýËµÃ÷:[keyword=¡·Î´×¢ÊÍ£»type=¡·类型：理论研究、法律法规£»p=¡·Î´×¢ÊÍ£»ps=¡·Î´×¢ÊÍ£»]
    Get: '/api/Knowledge/Get/{id}', //获取指定信息; ·½Ê½:GET; ²ÎÊýËµÃ÷:[id=¡·Î´×¢ÊÍ£»]
    Add: '/api/Knowledge/Add', //新增知识库数据; ·½Ê½:POST; ²ÎÊýËµÃ÷:[item=¡·post with body,json:{Title:标题,Content:内容,Source:来源,Link:数据地址,Author:作者,PublishTime:发布时间,PublishTimeStr:发布时间字符串，当PublishTime不能转化为日期时使用,Site:采集站点,SiteName:采集站点中文名称,DataType:所属类别,法律法规、理论研究}£»]
    Delete: '/api/Knowledge/Delete?bh={bh}', //删除; ·½Ê½:POST; ²ÎÊýËµÃ÷:[bh=¡·编号£»]
    Modify: '/api/Knowledge/Modify', //更新; ·½Ê½:POST; ²ÎÊýËµÃ÷:[item=¡·参数参看Add接口£»]
    },
    //Î´×¢ÊÍ¡£¸ù¾Ý·½·¨ÉèÖÃtoken
    WebData : { 
    GetCities: '/api/WebData/GetCities', //获取全国行政区划信息; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    GetLabels: '/api/WebData/GetLabels', //获取标记信息; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    GetCollections: '/api/WebData/GetCollections', //获取MongoDB可处理数据集合; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    GetTypes: '/api/WebData/GetTypes', //获取类型集合(互联网); ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    GetSites: '/api/WebData/GetSites', //获取来源网站集合; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    GetOrderFields: '/api/WebData/GetOrderFields', //获取排序字段集合; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    Get: '/api/WebData/Get?rqlx={rqlx}&qsrq={qsrq}&jzrq={jzrq}&order={order}&province={province}&city={city}&county={county}&keyword={keyword}&type1={type1}&type2={type2}&sfzsj={sfzsj}&sfzc={sfzc}&clr={clr}&site={site}&p={p}&ps={ps}', //获取互联网线索集合; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[rqlx=¡·日期类型£»qsrq=¡·起始日期£»jzrq=¡·截至日期£»order=¡·排序字段，默认为采集日期£»province=¡·省份£»city=¡·地市£»county=¡·区县£»keyword=¡·关键词£»type1=¡·数据大类£»type2=¡·线索类型£»sfzsj=¡·是否脏数据£»sfzc=¡·是否暂存£»clr=¡·处理人£»site=¡·采集站点名称£»p=¡·页码£»ps=¡·页面大小，最大100£»]
    Get: '/api/WebData/Get/{id}', //获取指定互联网数据; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[id=¡·数据编号£»]
    GetEventTrace: '/api/WebData/GetEventTrace/{id}', //获取线索事件跟踪信息; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[id=¡·Î´×¢ÊÍ£»]
    Update: '/api/WebData/Update', //修改数据; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[data=¡·Î´×¢ÊÍ£»]
    Confirm: '/api/WebData/Confirm', //提交处理数据; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[data=¡·Î´×¢ÊÍ£»]
    Add: '/api/WebData/Add', //手动录入新数据; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[data=¡·Î´×¢ÊÍ£»]
    GetUntreatedData: '/api/WebData/GetUntreatedData?site={site}&cjqsrq={cjqsrq}&cjjzrq={cjjzrq}&province={province}&city={city}&county={county}&keyword={keyword}&beginDate={beginDate}&endDate={endDate}&p={p}&ps={ps}', //获取MongoDB未处理数据; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[site=¡·Î´×¢ÊÍ£»cjqsrq=¡·Î´×¢ÊÍ£»cjjzrq=¡·Î´×¢ÊÍ£»province=¡·Î´×¢ÊÍ£»city=¡·Î´×¢ÊÍ£»county=¡·Î´×¢ÊÍ£»keyword=¡·Î´×¢ÊÍ£»beginDate=¡·Î´×¢ÊÍ£»endDate=¡·Î´×¢ÊÍ£»p=¡·Î´×¢ÊÍ£»ps=¡·Î´×¢ÊÍ£»]
    GetSourceData: '/api/WebData/GetSourceData/{id}?site={site}', //获取MongoDB指定数据; ·½Ê½:GET; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[site=¡·Î´×¢ÊÍ£»id=¡·Î´×¢ÊÍ£»]
    DeleteSourceData: '/api/WebData/DeleteSourceData/{id}?site={site}', //删除MongoDB指定数据; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[site=¡·Î´×¢ÊÍ£»id=¡·Î´×¢ÊÍ£»]
    PushData: '/api/WebData/PushData?province={province}&city={city}&county={county}', //推送数据到指定检察院; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:²»ÐèÒª£»²ÎÊýËµÃ÷:[province=¡·Î´×¢ÊÍ£»city=¡·Î´×¢ÊÍ£»county=¡·Î´×¢ÊÍ£»]
    },
    //权限控制器¡£¸ù¾Ý·½·¨ÉèÖÃtoken
    Auth : { 
    Login: '/api/Auth/Login', //登录; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:²»ÐèÒª£»²ÎÊýËµÃ÷:[data=¡·登录数据£»]
    Logout: '/api/Auth/Logout', //注销; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[]
    ChangePwd: '/api/Auth/ChangePwd', //修改密码; ·½Ê½:POST; ÊÇ·ñÐèÒªtoken:ÐèÒª£»²ÎÊýËµÃ÷:[newPwd=¡·新密码£»]
    },
    }
    
    window.webApi = webApi;
