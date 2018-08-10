var webApi = {
          Host:  'http://daniu.51vip.biz:10698/gyssAdminApp',
          //深圳开放平台数据。根据方法设置token
SzOpenData : { 
      PullData: '/api/SzOpenData/PullData?sjsybh={sjsybh}', //数据索引编号; 方式:POST; 是否需要token:不需要；参数说明:[sjsybh=》数据索引编号；]
      GetExDataIndex: '/api/SzOpenData/GetExDataIndex?keywords={keywords}&tbzt={tbzt}&pageNum={pageNum}&pageSize={pageSize}', //获取外部数据索引; 方式:GET; 是否需要token:不需要；参数说明:[keywords=》关键字；tbzt=》同步状态；pageNum=》页号；pageSize=》页大小；]
      GetData: '/api/SzOpenData/GetData?sjsybh={sjsybh}&p={p}&ps={ps}', //; 方式:GET; 是否需要token:不需要；参数说明:[sjsybh=》数据索引编号；p=》未注释；ps=》未注释；]
      DeleteData: '/api/SzOpenData/DeleteData/{id}?sjsybh={sjsybh}', //删除MongoDB指定数据; 方式:POST; 是否需要token:需要；参数说明:[sjsybh=》未注释；id=》数据_id；]
      UpdateData: '/api/SzOpenData/UpdateData', //更新数据; 方式:POST; 是否需要token:不需要；参数说明:[data=》数据；]
      InitTextIndex: '/api/SzOpenData/InitTextIndex', //; 方式:GET; 是否需要token:不需要；参数说明:[]
      },
      //知识库管理。全部需要token
      Knowledge : { 
      GetKnowledges: '/api/Knowledge/GetKnowledges?keyword={keyword}&type={type}&p={p}&ps={ps}', //获取知识库信息; 方式:GET; 参数说明:[keyword=》未注释；type=》类型：理论研究、法律法规；p=》未注释；ps=》未注释；]
      Get: '/api/Knowledge/Get/{id}', //获取指定信息; 方式:GET; 参数说明:[id=》未注释；]
      Add: '/api/Knowledge/Add', //新增知识库数据; 方式:POST; 参数说明:[item=》post with body,json:{Title:标题,Content:内容,Source:来源,Link:数据地址,Author:作者,PublishTime:发布时间,PublishTimeStr:发布时间字符串，当PublishTime不能转化为日期时使用,Site:采集站点,SiteName:采集站点中文名称,DataType:所属类别,法律法规、理论研究}；]
      Delete: '/api/Knowledge/Delete?bh={bh}', //删除; 方式:POST; 参数说明:[bh=》编号；]
      Modify: '/api/Knowledge/Modify', //更新; 方式:POST; 参数说明:[item=》参数参看Add接口，需要传入编号；]
      },
      //权限控制器。根据方法设置token
      Auth : { 
      Login: '/api/Auth/Login', //登录; 方式:POST; 是否需要token:不需要；参数说明:[data=》登录数据{'u':username,'p':pwd}；]
      Logout: '/api/Auth/Logout', //注销; 方式:POST; 是否需要token:需要；参数说明:[]
      ChangePwd: '/api/Auth/ChangePwd', //修改密码; 方式:POST; 是否需要token:需要；参数说明:[newPwd=》新密码；]
      },
      //未注释。根据方法设置token
      Doc : { 
      Add: '/api/Doc/Add', //; 方式:POST; 是否需要token:不需要；参数说明:[doc=》未注释；]
      AddTest: '/api/Doc/AddTest', //; 方式:POST; 是否需要token:不需要；参数说明:[doc=》未注释；]
      },
      //用户管理。根据方法设置token
      User : { 
      GetUser: '/api/User/GetUser', //获取当前用户信息; 方式:GET; 是否需要token:需要；参数说明:[]
      },
      //文本分析接口。根据方法设置token
      TextAnalysis : { 
      GetSummary: '/api/TextAnalysis/GetSummary', //获取摘要; 方式:POST; 是否需要token:不需要；参数说明:[p=》未注释；]
      GetKeyword: '/api/TextAnalysis/GetKeyword', //获取关键词; 方式:POST; 是否需要token:不需要；参数说明:[p=》未注释；]
      GetSegment: '/api/TextAnalysis/GetSegment', //获取人名、地名、机构名; 方式:POST; 是否需要token:不需要；参数说明:[p=》未注释；]
      },
      //新闻管理。全部需要token
      News : { 
      GetNews: '/api/News/GetNews?keyword={keyword}&p={p}&ps={ps}', //获取新闻集合; 方式:GET; 参数说明:[keyword=》未注释；p=》页面索引；ps=》页面大小；]
      Get: '/api/News/Get/{id}', //获取指定的新闻信息; 方式:GET; 参数说明:[id=》新闻编号；]
      Delete: '/api/News/Delete/{id}', //删除指定线索; 方式:POST; 参数说明:[id=》未注释；]
      },
      //互联网数据管理。根据方法设置token
      WebData : { 
      GetCities: '/api/WebData/GetCities', //获取全国行政区划信息; 方式:GET; 是否需要token:需要；参数说明:[]
      GetLabels: '/api/WebData/GetLabels', //获取标记信息; 方式:GET; 是否需要token:需要；参数说明:[]
      GetCollections: '/api/WebData/GetCollections', //获取MongoDB可处理数据集合; 方式:GET; 是否需要token:需要；参数说明:[]
      GetGyssClueTypes: '/api/WebData/GetGyssClueTypes', //获取公益诉讼线索类型集合(互联网); 方式:GET; 是否需要token:需要；参数说明:[]
      GetSites: '/api/WebData/GetSites', //获取Oracle数据来源网站集合; 方式:GET; 是否需要token:需要；参数说明:[]
      GetOrderFields: '/api/WebData/GetOrderFields', //获取排序字段集合; 方式:GET; 是否需要token:需要；参数说明:[]
      GetAll: '/api/WebData/GetAll?rqlx={rqlx}&qsrq={qsrq}&jzrq={jzrq}&order={order}&province={province}&city={city}&county={county}&keyword={keyword}&type1={type1}&type2={type2}&sfzsj={sfzsj}&sfzc={sfzc}&clr={clr}&site={site}&p={p}&ps={ps}', //获取互联网线索集合; 方式:GET; 是否需要token:需要；参数说明:[rqlx=》日期类型，cjrq或fbrq；qsrq=》起始日期；jzrq=》截至日期；order=》排序字段，asc或者desc；province=》省份；city=》地市；county=》区县；keyword=》关键词；type1=》数据大类；type2=》线索类型；sfzsj=》是否脏数据；sfzc=》是否暂存；clr=》处理人；site=》采集站点名称；p=》页码；ps=》页面大小，最大100；]
      Get: '/api/WebData/Get/{id}', //获取指定互联网数据; 方式:GET; 是否需要token:需要；参数说明:[id=》数据编号；]
      GetEventTrace: '/api/WebData/GetEventTrace/{id}', //获取线索事件跟踪信息; 方式:GET; 是否需要token:需要；参数说明:[id=》未注释；]
      Update: '/api/WebData/Update', //修改数据; 方式:POST; 是否需要token:需要；参数说明:[data=》未注释；]
      Delete: '/api/WebData/Delete/{id}', //删除线索; 方式:POST; 是否需要token:需要；参数说明:[id=》未注释；]
      Confirm: '/api/WebData/Confirm', //提交处理数据; 方式:POST; 是否需要token:需要；参数说明:[data=》未注释；]
      Add: '/api/WebData/Add', //手动录入新数据; 方式:POST; 是否需要token:需要；参数说明:[data=》未注释；]
      UploadFile: '/api/WebData/UploadFile', //上传文件（支持多文件）; 方式:POST; 是否需要token:不需要；参数说明:[]
      DownLoadFile: '/api/WebData/DownLoadFile/{id}', //下载文件流; 方式:GET; 是否需要token:不需要；参数说明:[id=》文件编号；]
      CountUntreatedData: '/api/WebData/CountUntreatedData?site={site}&province={province}&city={city}&county={county}&keyword={keyword}&beginDate={beginDate}&endDate={endDate}', //计算MongoDB未处理数据总量; 方式:GET; 是否需要token:需要；参数说明:[site=》网站。从GetCollections接口返回的collection名称；province=》省份；city=》地市；county=》区县；keyword=》关键词；beginDate=》起始时间；endDate=》截止时间；]
      GetUntreatedData: '/api/WebData/GetUntreatedData?site={site}&province={province}&city={city}&county={county}&keyword={keyword}&beginDate={beginDate}&endDate={endDate}&p={p}&ps={ps}', //获取MongoDB未处理数据; 方式:GET; 是否需要token:需要；参数说明:[site=》网站。从GetCollections接口返回的collection名称；province=》省份；city=》地市；county=》区县；keyword=》关键词；beginDate=》起始时间；endDate=》截止时间；p=》页面索引；ps=》页面大小；]
      GetTest: '/api/WebData/GetTest', //; 方式:GET; 是否需要token:不需要；参数说明:[]
      GetSourceData: '/api/WebData/GetSourceData/{id}?site={site}', //获取MongoDB指定数据; 方式:GET; 是否需要token:需要；参数说明:[site=》网站。从GetCollections接口返回的collection名称；id=》数据_id；]
      DeleteSourceData: '/api/WebData/DeleteSourceData/{id}?site={site}', //删除MongoDB指定数据; 方式:POST; 是否需要token:需要；参数说明:[site=》网站。从GetCollections接口返回的collection名称；id=》数据_id；]
      PushData: '/api/WebData/PushData?province={province}&city={city}&county={county}', //推送数据到指定检察院; 方式:POST; 是否需要token:不需要；参数说明:[province=》省份；city=》地市；county=》区县；]
      },
      }
      
      window.webApi = webApi;