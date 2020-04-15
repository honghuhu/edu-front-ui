<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li :class="{active:oneIndex == -1}">
                  <a title="全部" href="javascript:void(0);" @click="searchOne(null, index), oneIndex = -1">全部</a>
                </li>
                <li v-for="(subject,index) in subjectTree" :key="index" :class="{active:oneIndex == index}">
                  <a :title="subject.title" href="javascript:void(0);" @click="searchOne(subject.id, index), oneIndex = index, twoIndex = -1">{{subject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(subject,index) in subSubjects" :key="subject.id" :class="{active:twoIndex == index}">
                  <a :title="subject.title" href="javascript:void(0);" @click="searchTwo(subject.id, index), twoIndex = index">{{subject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=null}">
                <a title="关注度" href="javascript:void(0);" @click="searchBuyCount()">关注度&nbsp;{{buyCountSort === true ? '➹':'➷'}}</a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=null}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">创建时间&nbsp;{{gmtCreateSort === true ? '➹':'➷'}}</a>
              </li>
              <li :class="{'current bg-orange':priceSort!=null}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;{{priceSort === true ? '➹':'➷'}}</a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in data.records" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title" />
                    <div class="cc-mask">
                      <a :href="`/course/${course.id}`" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="`/course/${course.id}`" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{course.price === 0? '免费': course.price}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.buyCount}}购买</i>
                      |
                      <i class="c-999 f-fA">{{course.viewCount}}浏览</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a :class="{undisable: data.current == 1}" href="#" title="首页" @click.prevent="data.current == 1 ? '':gotoPage(1)">首</a>
            <a :class="{undisable: data.current == 1}" href="#" title="前一页" @click.prevent="data.current == 1 ? '':gotoPage(data.current - 1)">&lt;</a>
            <a v-for="page in data.pages" :key="page" :class="{current: data.current == page, undisable: data.current == page}" :title="'第'+page+'页'" href="#"
              @click.prevent="data.current == page ? '':gotoPage(page)">{{ page }}</a>
            <a :class="{undisable: data.current == data.pages}" href="#" title="后一页" @click.prevent="data.current == data.pages ? '':gotoPage(data.current + 1)">&gt;</a>
            <a :class="{undisable: data.current == data.pages}" href="#" title="末页" @click.prevent="data.current == data.pages ? '':gotoPage(data.pages)">末</a>
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "@/api/course";

export default {
  data() {
    return {
      data: {},
      subjectTree: [],
      subSubjects: [],
      courseVo: { limit: 8 }, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: null,
      gmtCreateSort: null,
      priceSort: null
    };
  },
  //加载完渲染时
  created() {
    //获取课程列表
    this.gotoPage();
    //获取分类
    this.initSubjectTree();
  },
  methods: {
    //查询课程列表
    gotoPage(page = 1) {
      this.courseVo.current = page;
      course.page(this.courseVo).then(response => {
        this.data = response.data.data;
      });
    },

    //查询分类树
    initSubjectTree() {
      //debugger
      course.subjectTree().then(response => {
        this.subjectTree = response.data.data;
      });
    },

    //点击一级分类，显示对应的二级分类，查询数据
    searchOne(subjectId, index) {
      this.subSubjects =
        index == undefined ? [] : this.subjectTree[index].children;
      this.courseVo.subjectParentId = subjectId;
      this.courseVo.subjectId = null;
      this.gotoPage(this.courseVo.current);
    },

    //点击二级分类，查询数据
    searchTwo(subjectId, index) {
      this.courseVo.subjectId = subjectId;
      // this.courseVo.subjectParentId = null;
      this.gotoPage(this.courseVo.current);
    },

    //购买量查询
    searchBuyCount() {
      this.buyCountSort =
        this.buyCountSort == null ? false : this.buyCountSort ? false : true;
      this.gmtCreateSort = null;
      this.priceSort = null;
      this.courseVo.buyCountSort = this.buyCountSort;
      this.courseVo.gmtCreateSort = this.gmtCreateSort;
      this.courseVo.priceSort = this.priceSort;
      this.gotoPage();
    },

    //创建时间排序
    searchGmtCreate() {
      this.buyCountSort = null;
      this.gmtCreateSort =
        this.gmtCreateSort == null ? false : this.gmtCreateSort ? false : true;
      this.priceSort = null;
      this.courseVo.buyCountSort = this.buyCountSort;
      this.courseVo.gmtCreateSort = this.gmtCreateSort;
      this.courseVo.priceSort = this.priceSort;
      this.gotoPage();
    },

    //价格查询
    searchPrice() {
      this.buyCountSort = null;
      this.gmtCreateSort = null;
      this.priceSort =
        this.priceSort == null ? true : this.priceSort ? false : true;
      this.courseVo.buyCountSort = this.buyCountSort;
      this.courseVo.gmtCreateSort = this.gmtCreateSort;
      this.courseVo.priceSort = this.priceSort;
      this.gotoPage();
    }
  }
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>