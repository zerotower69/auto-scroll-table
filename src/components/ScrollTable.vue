<script setup>
import {nextTick, onMounted, onUpdated, reactive, ref, useAttrs, watch} from "vue";
import {useElementBounding, useIntervalFn, useRafFn} from "@vueuse/core";

const props =defineProps({
  //表格数据
  data:{
    type:Array,
    required:true
  },
  //滚动步进
  step:{
    type:Number,
    default:2,
    validator(val){
      if(val<1){
        console.warn("[ScrollTable] scroll step can't be smaller than 1, it will be reset to 1 instead.")
      }
    }
  },
})

const tableData =ref()
/**
 * @type {import('vue').Ref<import('vxe-table').VxeTableInstance>}
 */
const tableRef =ref()
const tableState =reactive({
  contentHeight:0,
  rowHeight:0,
  dataHeight:0,
  isLoaded:false,
  lock:false,
  //浏览器的scrollTop不能滚小于1，否则就算为0
  step: props.step<1 ? 1:props.step
})
//scroll的高度
const tableScrollTop =ref(0)
let resume,pause,isActive;


//根据手动滚动或者自动滚动两种模式设置表格的数据
function setTableData(isLock=false) {
  let datas =[];
  if(isLock){
     datas = [...props.data]
  } else {
     datas = [...tableData.value, ...props.data]
    datas.splice(1, props.data.length)
  }
  return tableRef.value.loadData(datas)
}

watch(()=>props.data,(data)=>{
  tableData.value =[...data,...data]
  if(isActive?.value){
    pause()
  }
  tableState.isLoaded=false
},{immediate:true})

//props剔除
function getAttrs(){
  return useAttrs()
}

function tableUpdated(){
  nextTick(()=>{
    setTableState()
  })
}
function handleScroll(data){
  const {$event,scrollTop} = data
  tableScrollTop.value = scrollTop;
  //自动滚
  // console.log($event)
  //滚去了一块，到了第二块的时候
  if (scrollTop > tableState.dataHeight) {
    stopScroll()
    setTableScrollTop(0)
    tableScrollTop.value = 0
    setTableData(tableState.lock).then(() => {
      if(tableState.lock){

      } else{
        restartScroll()
      }
    })
  } else {
  }
}

function setTableAutoScroll(){
  if(isActive?.value){
    pause()
  }
  const res = useRafFn(()=>{
    setTableScrollTop((tableScrollTop.value+tableState.step))
  })
  resume = res.resume;
  pause =res.pause;
  isActive = res.isActive
}
function stopScroll(){
  if(isActive?.value){
    pause && pause()
  }
}

function restartScroll(){
  tableState.lock=false
  if(isActive && !isActive.value){
    resume && resume()
  }
}

//设置table滚动位置，scrollTop
function setTableScrollTop(top){
  // tableRef.value.scrollTo(null,top)
  const left=tableRef.value.getScroll().scrollLeft
  tableRef.value.scrollTo(left,top)
}

  //获取table的原始的各处高度数据
  function setTableState(){
    if(!tableState.isLoaded) {
      // debugger
      const $contentEl = tableRef.value.$el.querySelector('.vxe-table--body-wrapper');
      const $tbodyEl = tableRef.value.$el.querySelector('.vxe-table--body  tbody');
      const $columnEl = tableRef.value.$el.querySelector('.vxe-table--body tbody tr');
      if($columnEl) {
        const {height: contentHeight} = useElementBounding($contentEl)
        const {height: tbodyHeight} = useElementBounding($tbodyEl);
        const {height: rowHeight} = useElementBounding($columnEl)
        tableState.rowHeight = rowHeight.value??0;
        tableState.contentHeight = contentHeight.value ?? 0;
        tableState.dataHeight = rowHeight.value *props.data.length
        //loaded后触发自动滚动
        tableState.isLoaded = true
        setTableScrollTop(tableState.dataHeight)
        setTableAutoScroll()
      }
    }
  }

function handleMouseover(){
   tableState.lock=true
   // setTableData()
   stopScroll()
}
function handleMouseleave(){
  setTableData()
  restartScroll()
  setTableScrollTop(tableScrollTop.value+tableState.step)
}
</script>

<template>
<vxe-table @mouseover="handleMouseover" @mouseleave="handleMouseleave" @scroll="handleScroll" @vue:updated="tableUpdated" ref="tableRef" class="mytable-scrollbar"  v-bind="getAttrs()" :data="tableData">
  <slot></slot>
</vxe-table>
</template>

<style lang="scss" scoped>
</style>
<style lang="scss">
.vxe-table--body-wrapper{
  overflow: hidden!important;
  //&:hover{
  //  //overflow-y: scroll;
  //  overflow-y: scroll!important;
  //}
}
</style>
