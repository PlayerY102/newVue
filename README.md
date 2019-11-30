### code

20000 正确返回

### 用户申请

#### 获取筛选后的用户申请

##### 接口

```
GET /api/apply
```

##### Request参数：

**params**

* page:  第几页：默认是1
* limit： 每页最多多少项，默认20
* id： 申请编号
* name: 姓名
* affiliation:  机构名称
* country： 国籍, 有{CN US,JP,EU,OTS}
* sort： 排序方式，默认 '+id' 升序， '-id' 降序

##### Response格式

```
{
	code: 20000, 
	data: {
		total: xxx, // 筛选后总的条数
		list: [ // 用户申请的数组
			{
				id: 1,  // 申请的编号
				userId: 1, // 用户ID
				name: 'Elizabeth', // 姓名
				affiliation: 'Qubuppydr Dryqx Lntm',//机构
				country: 'CN', // 国籍 如{CN US,JP,EU,OTS}
				areaList: ['AI', 'CS'], // 领域
				contact: '13743962800', // 联系方式
				portrait: 'http://url', // 肖像url
			},
			...
		]
	}
}
```



#### 同意申请

##### 接口

```
POST /apply/{id}
```

##### Request参数：

**内嵌到URL**

* id: 申请编号

##### Response格式

```
{
	code: 20000
}
```



#### 删除申请

##### 接口

```
DELETE /apply/{id}
```

##### Request参数：

**内嵌到URL**

- id: 申请编号

##### Response格式

```
{
	code: 20000
}
```

### 获取专家列表

#### 接口

```
GET /scholar
```

#### Request参数

**params**

* page:  第几页：默认是1
* limit： 每页最多多少项，默认20
* id： 申请编号
* name: 姓名
* affiliation:  机构名称
* country： 国籍, 有{CN US,JP,EU,OTS}
* email: 邮箱地址
* sort： 排序方式，默认 '+id' 升序， '-id' 降序

### 创建专家

#### 接口

```
POST /sholar
```

#### Request参数

##### data

* id:  专家id 默认undefined
* timestamp: 创建时间
* name: 姓名
* affiliation: 归属机构
* country: 国籍，有{CN US,JP,EU,OTS}
* email: 邮箱
* areaList: 相关领域

### 更新专家

#### 接口

```
POST /sholar/{id}
```

#### Request参数

##### data

* id:  专家id 默认undefined
* timestamp: 修改时间
* name: 姓名
* affiliation: 归属机构
* country: 国籍，有{CN US,JP,EU,OTS}
* email: 邮箱
* areaList: 相关领域

### 删除专家

#### 接口

```
DELETE /sholar/{id}
```

