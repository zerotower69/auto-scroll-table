import { VXETable, Table, Column, Colgroup } from "vxe-table";
import XEUtils from "xe-utils";

import zhCN from "vxe-table/lib/locale/lang/zh-CN";
import "vxe-table/lib/style.css";
import "vxe-table/styles/cssvar.scss";
// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});

/**
 *
 * @param {import('vue').App} app
 */
export function setupVXETable(app) {
  app.use(Table).use(Column).use(Colgroup);
}
