<script setup>
import ScrollTable from "./components/ScrollTable.vue";
import {ref} from "vue";

//表格的数据
const tableData =ref( [
  {
    id:1,
    name:'张红',
    age:22,
    code:'YZ0001'
  },{
    id:2,
    name:'王强',
    age:23,
    code:'YZ0002'
  },
  {
    id:3,
    name:'李响',
    age:23,
    code:'YZ0003'
  },{
    id:4,
    name:'刑天',
    age:23,
    code:'YZ0004'
  },{
    id:5,
    name:'吴丽',
    age:23,
    code:'YZ0005'
  },{
    id:6,
    name:'楼峰',
    age:23,
    code:'YZ0006'
  },{
    id:7,
    name:'宋好',
    age:23,
    code:'YZ0007'
  },{
    id:8,
    name:'段刚',
    age:23,
    code:'YZ0008'
  }])
</script>

<template>
  <div>
    <ScrollTable :speed="1" row-class-name="row-item" height="240px" :data="tableData">
      <vxe-column align="center" field="id" title="id" width="60"/>
      <vxe-column align="center" field="name" title="姓名" min-width="100"/>
      <vxe-column align="center" field="age" title="年龄" width="60"/>
      <vxe-column align="center" field="code" title="编码" min-width="100"/>
    </ScrollTable>
  </div>
</template>

<style scoped>
</style>
<style>
.row-item{
  //height: 40px !important;
}
</style>
