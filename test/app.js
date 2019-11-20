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

app.get("/scholar", function(req, res) {
  res.json({
    code: 20000,
    data: {
      list: scholar
    }
  });
})

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


var apply = [
  { 'id': 1, 'name': 'Elizabeth', 'affiliation':"Qubuppydr Dryqx Lntm", 'country': 'CN', 'status': 'published', 'areaList':['AI',"CS"], 'contact': '13745678911' , 'portrait': 'http://www.baidu.com'},
  { 'id': 2, 'name': 'xxxx', 'affiliation':"aaaaaaaa", 'country': 'US', 'status':'draft', 'areaList':['math',"OS"],  'contact': '13745678911', 'portrait': 'http://www.baidu.com'}
]

var applyCount = 3

app.get("/apply", function(req, res) {
  res.json({
    code: 20000,
    data: {
      list: apply
    }
  });
})

app.post("/apply", function(req, res) {
  console.log(req.body);
  var data = req.body
  var item = { 'id': applyCount, 'name':data.name, 'affiliation':data.affiliation, 'country': data.country, 'status': data.status, 'areaList': data.areaList, 'contact': data.contact, 'portrait': data.portrait}
  apply.push(item)
  applyCount = applyCount+1
  res.json({code:20000})
})

// 修改
app.post('/apply/:id', function(req, res) {
  console.log(req.body);
  var data = req.body
  var item = { 'id': data.id, 'name':data.name, 'affiliation':data.affiliation, 'country': data.country, 'status': data.status, 'areaList': data.areaList, 'contact': data.contact, 'portrait': data.portrait}
  for (i = 0; i < apply.length; i++) {
    if (apply[i].id === item.id) {
      apply[i] = item
      break;
    }
  }
  res.json({code:20000})
})

// 删除
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
