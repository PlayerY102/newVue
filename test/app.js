var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9527");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method=="OPTIONS") 
    res.send(200);/*让options请求快速返回*/
  else
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

var scholar = [
  { 'id': 1, 'name': 'Elizabeth', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'status': 'published','email':'12345678@qq.com', 'areaList':['AI',"CS"]},
  { 'id': 2, 'name': 'xxxx', 'affiliation':"aaaaaaaa", 'country': 'US', 'status':'draft','email':'292929292@qq.com', 'areaList':['math',"OS"]}
]

var count = 3

// 获取
// app.get("/scholar", function(req, res) {
//   res.json({
//     code: 20000,
//     data: {
//       list: scholar
//     }
//   });
// })


// 根据前端的query，返回符合的数据
app.get("/scholar", function(req, res) {
  console.log(req.query)

  const { id, affiliation, country, name, email, page = 1, limit = 20, sort } = req.query
  let mockList = scholar.filter(item => {
    if (email && item.email.indexOf(email) < 0) return false
    if (name && item.name.indexOf(name) < 0) return false
    if (country && item.country !== country) return false
    if (affiliation && item.affiliation.indexOf(affiliation) < 0) return false
    if (id && item.id !== parseInt(id)) return false
    return true
  })

  if (sort === '-id') {
      mockList = mockList.reverse()
  }

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      list:  pageList,
    }
  });
})

// 增加
app.post("/scholar", function(req, res) {
  console.log(req.body);
  var data = req.body
  var item = { 'id': count, 'name':data.name, 'affiliation':data.affiliation, 'country': data.country, 'email':data.email, 'areaList': data.areaList}
  scholar.push(item)
  count = count+1
  res.json({code:20000})
})

// 修改
app.post('/scholar/:id', function(req, res) {
  console.log(req.body);
  var data = req.body
  var item = { 'id': data.id, 'name':data.name, 'affiliation':data.affiliation, 'country': data.country, 'email':data.email, 'areaList': data.areaList}
  for (i = 0; i < scholar.length; i++) {
    if (scholar[i].id === item.id) {
      scholar[i] = item
      break;
    }
  }
  res.json({code:20000})
})

// 删除
app.delete('/scholar/:id', function(req, res) {
  console.log(typeof req.params.id)
  for (i = 0, len=scholar.length; i < len; i++) {
    if (scholar[i].id == req.params.id) {
      scholar.splice(i, 1)
      // scholar[i].status = "deleted"
      break;
    }
  }
  res.json({code:20000})
})

// 处理专家申请
var apply = [
  { 'id': 1, 'user_id': '1', 'name': 'Elizabeth', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 2, 'user_id': '2', 'name': 'cxk', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 3, 'user_id': '3', 'name': 'a', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 4, 'user_id': '4', 'name': 'b', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 5, 'user_id': '5', 'name': 'c', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 6, 'user_id': '6', 'name': 'd', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 7, 'user_id': '7', 'name': 'e', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 8, 'user_id': '8', 'name': 'f', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 9, 'user_id': '9', 'name': 'g', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 10, 'user_id': '10', 'name': 'ab', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 11, 'user_id': '11', 'name': 'ac', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 12, 'user_id': '12', 'name': 'af', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 13, 'user_id': '13', 'name': 'bd', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 14, 'user_id': '14', 'name': 'bc', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 15, 'user_id': '15', 'name': 'bg', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 16, 'user_id': '16', 'name': 'abc', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 17, 'user_id': '17', 'name': 'eg', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 18, 'user_id': '18', 'name': 'fg', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 19, 'user_id': '19', 'name': 'fd1', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 20, 'user_id': '20', 'name': 'cf1', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
  { 'id': 21, 'user_id': '21', 'name': 'lol', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'area_list':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 22, 'user_id': '22', 'name': 'dnf', 'affiliation':"aaa", 'country': 'US',  'area_list':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'},
]

// 根据前端的query，返回符合的数据
app.get("/apply", function(req, res) {
  // console.log(req.query)

  const { id, affiliation, country, name, page = 1, limit = 20, sort } = req.query
  let mockList = apply.filter(item => {
    if (country && item.country !== country) return false
    if (affiliation && item.affiliation.indexOf(affiliation) < 0) return false
    if (name && item.name.indexOf(name) < 0) return false
    if (id && item.id !== parseInt(id)) return false
    return true
  })

  if (sort === '-id') {
      mockList = mockList.reverse()
  }

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      list:  pageList,
    }
  });
})

// 同意申请
app.post('/apply/:id', function(req, res) {
  console.log(typeof req.params.id)
  for (i = 0, len=apply.length; i < len; i++) {
    if (apply[i].id == req.params.id) {
      apply.splice(i, 1)
      break;
    }
  }
  res.json({code:20000})
})

// 删除申请
app.delete('/apply/:id', function(req, res) {
  console.log(typeof req.params.id)
  for (i = 0, len=apply.length; i < len; i++) {
    if (apply[i].id == req.params.id) {
      apply.splice(i, 1)
      // scholar[i].status = "deleted"
      break;
    }
  }
  res.json({code:20000})
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
