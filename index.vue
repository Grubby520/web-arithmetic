<template>
    <div class="page-container">
        <!-- header -->
        <el-form :model="query" class="query-form" inline ref="queryForm">
            <div class="form-grid">
                <el-form-item label="底版SKU" prop="skuCode">
                    <el-input clearable maxlength="50" placeholder="请输入底版SKU" v-model.trim="query.skuCode"></el-input>
                </el-form-item>
                <el-form-item label="印花供应商" prop="supplyName">
                    <el-input clearable maxlength="50" placeholder="请输入印花供应商" v-model.trim="query.supplyName"></el-input>
                </el-form-item>
                <el-form-item label="出库/入库" prop="type">
                    <el-select clearable placeholder="请选择" v-model="query.type">
                        <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item of INVENTORY_TYPE"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="serialType">
                    <el-select clearable placeholder="请选择类型" v-model="query.serialType">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item of ITEM_TYPE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作时间" prop>
                    <sl-date-picker
                        :clearable="false"
                        :endValue.sync="query.operateTimeEnd"
                        v-model="query.operateTimeStart"
                    ></sl-date-picker>
                </el-form-item>
            </div>

            <div class="form-button">
                <el-form-item>
                    <el-button @click="searchHandle" type="primary">{{ $t("button.search") }}</el-button>
                    <el-button @click="resetHandle" type="warning">{{$t("button.reset")}}</el-button>
                    <el-button @click.stop="exportData" type="primary">{{$t("button.export")}}</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-divider />
        <!-- table -->
        <el-table :data="tableSource" border stripe v-loading="loading">
            <el-table-column align="center" label="底版SKU" prop="skuCode"></el-table-column>
            <el-table-column align="center" label="图片" prop="skuImage" width="100">
                <template v-slot="{row}">
                    <ShowImage :params="{width:60,height:60}" :src="row.skuImage" />
                </template>
            </el-table-column>
            <el-table-column header-align="center" label="商品名称" min-width="130" prop="productName">
                <template v-slot="{row}">
                    <div>
                        <div>{{row.productName}}</div>
                        <div class="info-text">{{row.attributes}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="出库/入库" prop="typeName"></el-table-column>
            <el-table-column align="center" label="类型" prop="serialTypeName"></el-table-column>
            <el-table-column align="center" label="期初数量" prop="originTotal" width="150"></el-table-column>
            <el-table-column align="center" label="出库/入库数量" prop="changeNum"></el-table-column>
            <el-table-column align="center" label="期末数量" prop="currentTotal" width="150"></el-table-column>
            <el-table-column align="center" label="操作时间" prop="createTime" width="100"></el-table-column>
            <el-table-column align="center" label="印花供应商" min-width="130" prop="supplyName"></el-table-column>
            <el-table-column align="center" label="操作">
                <template v-slot="{row}">
                    <el-button @click="openDialogHandle(row)" type="text">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- pagination -->
        <SlPagination :pageInfo="{...pageQuery, pagegroup: 6, skin: '#00D1B2'}" @change="pagechange" />
        <!-- 详情弹框 -->
        <DetailDialog :row="activeRow" :visible.sync="detailVisible" />
    </div>
</template>

<script>
import ShowImage from 'components/StarLinkTable/show_image'
import { ITEM_TYPE, INVENTORY_TYPE } from './constant'
import DetailDialog from './components/detailDialog'
import baseBoardInventoryFlowService from 'supplierCollaborationModule/api/supplierCollaborationModule/baseBoardInventoryFlow'
import lossAuditService from 'supplierCollaborationModule/api/supplierCollaborationModule/lossAudit'
import { exportExcel } from 'utils/index'
import moment from 'moment'

const startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
const endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')

export default {
    name: 'baseBoard-inventory-flow',
    components: { ShowImage, DetailDialog },

    data() {
        return {
            // query param
            query: {
                // skuCode
                skuCode: null,
                supplyName: '',
                type: '',
                serialType: '',
                operateTimeEnd: endTime,
                operateTimeStart: startTime
            },
            pageQuery: {
                pageIndex: 1,
                pageSize: 10,
                current: 1,
                pagenum: 10
            },
            // 表格
            tableSource: [],
            // loading
            loading: false,
            // 编辑row
            activeRow: {},
            // 类型 - option
            ITEM_TYPE,
            // 出库/入库 - option
            INVENTORY_TYPE,
            // 详情弹框
            detailVisible: false,
            // 损耗出库详情弹框
            lossVisible: false
        }
    },
    async mounted() {
        this.fetchData()
    },
    methods: {
        pagechange({ pageIndex, pageSize }) {
            this.pageQuery.pageSize = pageSize
            this.pageQuery.pageIndex = pageIndex
            this.pageQuery.pagenum = pageSize
            this.pageQuery.current = pageIndex
            this.fetchData()
        },
        // 获取数据
        fetchData() {
            if (!this.checkDate()) return
            const param = this.formatParam()
            this.loading = true
            baseBoardInventoryFlowService
                .totalPage(param)
                .then(({ data = {} }) => {
                    const { list = [], total = 0 } = data
                    this.pageQuery.total = total
                    this.tableSource = list
                    this.pageQuery.current = this.pageQuery.pageIndex
                    this.pageQuery.pagenum = this.pageQuery.pageSize
                })
                .finally(() => {
                    this.loading = false
                })
        },
        // 搜索
        searchHandle() {
            if (!this.checkDate()) return
            this.pageQuery.pageIndex = 1
            this.fetchData()
        },
        // 格式化param
        formatParam() {
            return {
                pageSize: this.pageQuery.pageSize,
                pageIndex: this.pageQuery.pageIndex,
                ...this.query
            }
        },
        checkDate() {
            if (!this.query.operateTimeStart || !this.query.operateTimeEnd) {
                this.$message.warning('操作时间不能为空！')
                return false
            }
            return true
        },
        // 重置
        resetHandle() {
            this.pageQuery.pageIndex = 1
            this.query.operateTimeStart = startTime
            this.query.operateTimeEnd = endTime
            this.$refs['queryForm'].resetFields()
            this.fetchData()
        },
        // 打开弹框
        openDialogHandle(row) {
            // 损耗单
            if (row.serialType === 'WASTAGE_ORDER') {
                lossAuditService.getDetail(row.referenceVo.wastageOrderId).then(({ success, data = {} }) => {
                    if (success) {
                        this.activeRow = {
                            ...row,
                            ...{
                                handleTypeName: data.handleTypeName,
                                liableSupplyName: data.liableSupplyName
                            }
                        }
                        this['detailVisible'] = true
                    }
                })
            } else {
                this.activeRow = row
                this['detailVisible'] = true
            }
        },
        // 导出
        exportData() {
            if (!this.checkDate()) return
            const { operateTimeEnd, operateTimeStart } = this.query
            const subs = Number(new Date(operateTimeEnd)) - Number(new Date(operateTimeStart))
            const diffs = subs / 24 / 60 / 60 / 1000
            if (diffs > 31) {
                this.$message.warning('只能导出一个月以内的底版库存流水！')
                return
            }
            const param = this.formatParam()
            exportExcel('/api/v1.0/srm-inventory-poi/inventory/serial/total/export', param, '底版库存流水.xlsx')
        }
    }
}
</script>
<style lang="scss" scoped>
.page-container {
    // display: flex;
    // height: calc(100vh - 52px);
    // flex-direction: column;
    padding: 20px;
    .form-button {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .query-form {
        /deep/ .el-form-item {
            display: flex;
            flex-direction: row;
            .el-form-item__label {
                width: 100px;
            }
            .el-form-item__content {
                flex: 1;
            }
            .el-select {
                width: 100%;
            }
        }
    }
    .form-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    /deep/ .info-text {
        color: #909090;
    }
}
</style>
