<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="申请编号"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.affiliation"
        placeholder="机构"
        style="width: 170px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.country"
        placeholder="国籍"
        clearable
        class="filter-item"
        style="width: 100px"
      >
        <el-option
          v-for="item in countryOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 100px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属机构 国籍" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.affiliation }}</span>
          <el-tag>{{ row.country | countryFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="领域" align="center" width="95">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleFetchPv(row.areaList)">{{ row.areaList.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">查看</el-button>
          <el-button
            size="mini"
            @click="handleConfirmed(row)"
          >同意</el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog title="查看" :visible.sync="dialogFormVisible">
      <el-form
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="申请编号" prop="id">
          <el-input v-model="temp.id" :readonly="true" />
        </el-form-item>
        <el-form-item label="用户编号" prop="id">
          <el-input v-model="temp.user_id" :readonly="true" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" :readonly="true" />
        </el-form-item>
        <el-form-item label="国籍" prop="country">
          <el-input v-model="temp.name" :readonly="true" />
        </el-form-item>
        <el-form-item label="所属机构" prop="affiliation">
          <el-input v-model="temp.affiliation" :readonly="true" />
        </el-form-item>
        <el-form-item label="相关领域" prop="areaList">
          <el-tag
            v-for="tag in temp.areaList"
            :key="tag"
            :disable-transitions="false"
            style="margin-left: 10px"
          >{{ tag }}</el-tag>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="temp.contact" :readonly="true" />
        </el-form-item>
        <el-form-item label="头像" prop="portrait">
          <el-input v-model="temp.portrait" :readonly="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="相关领域">
      <el-tag v-for="area in pvData" :key="area.id" type="success" style="margin: 5px">{{ area }}</el-tag>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  updateApply,
  deleteApply
} from '@/api/scholarApply'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const countryOptions = [
  { key: 'CN', display_name: '中国' },
  { key: 'US', display_name: '美国' },
  { key: 'JP', display_name: '日本' },
  { key: 'EU', display_name: '欧洲' },
  { key: 'OTS', display_name: '其他' }
]

const countryKeyValue = countryOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ScholarApply',
  components: { Pagination },
  directives: { waves },
  filters: {
    countryFilter(type) {
      return countryKeyValue[type]
    }
  },
  data() {
    return {
      inputValue: '',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        name: undefined,
        affiliation: undefined,
        country: undefined,
        sort: '+id'
      },
      countryOptions,
      sortOptions: [
        { label: 'ID升序', key: '+id' },
        { label: 'ID降序', key: '-id' }
      ],
      temp: {
        id: undefined,
        name: '',
        affiliation: '',
        country: '',
        areaList: [],
        contact: '',
        user_id: '',
        portrait: ''
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 根据list.query获取数据
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        console.log(this.list)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 查看详细内容
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
    },
    // 同意申请
    handleConfirmed(row) {
      this.$confirm('是否同意该申请?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        updateApply(row.id).then(() => {
          // 删除后，更新
          this.getList()
          this.$notify({
            title: 'Success',
            message: '处理成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {})
    },
    // 删除申请
    handleDelete(row) {
      this.$confirm('此操作将永久删除该申请, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        deleteApply(row.id).then(() => {
          // 删除后，更新
          this.getList()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {})
    },
    handleFetchPv(pv) {
      this.pvData = pv
      this.dialogPvVisible = true
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['申请编号', '用户编号', '姓名', '机构', '国籍', '领域', '联系方式', '照片']
        const filterVal = [
          'id',
          'user_id',
          'name',
          'affiliation',
          'country',
          'areaList',
          'contact',
          'portrait'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '专家申请表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
