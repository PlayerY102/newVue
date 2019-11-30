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
				user_id: 1, // 用户ID
				name: 'Elizabeth', // 姓名
				affiliation: 'Qubuppydr Dryqx Lntm',//机构
				country: 'CN', // 国籍 如{CN US,JP,EU,OTS}
				area_list: ['AI', 'CS'], // 领域
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