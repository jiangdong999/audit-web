// 列表页搜索表单名须为searchForm

export default {
  data(){
    return {
      loading: false,
      totalPage: 1,
      page: 1,
      size: 10,
      totalRecord: 0,
      tableData: [],
      pageInput: 1
    }
  },
  watch: {
    'pageInput': function(newValue){
      let no = /^[1-9]\d*$/g;
      if (!no.test(newValue)) {
        this.pageInput = 1
      } else {}
    }
  },
  methods: {
    pageReset(){
      this.page = 1;
      this.size = 10;
    },
    turnPage: function (page,size) {
      this.page = page || 1;
      this.size = size || 10;
      this.loadData(this.page, this.size)
    },
    limitChange: function (size) {
      console.log(size);
      this.size = size || 10;
      this.loadData(this.page, this.size)
    },
    indexMethod(index) {
      return index + (this.page-1) * 10 + 1;
    },
  }
}