<template>
  <div v-click-outside class="wrap">
    <input type="text" :value="formateDate">
    <div class="pannel" v-if="isVisible">
      <div class="pannel-nav">
        <span @click="prevYear">&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{time.year}}年</span>
        <span>{{time.month+1}}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span @click="nextYear">&gt;</span>
      </div>
      <div class="pannel-content">
        <div class="days">
          <span v-for="d in weekDays" :key="d" class="cell">{{d}}</span>
          <div v-for="i in 6" :key="i">
            <span
              v-for="j in 7"
              :key="j"
              class="cell"
              @click="changeday(visibeDays[(i-1)*7+(j-1)])"
              :class="[
              {notCurrentMonth: !isCurrentMonth( visibeDays[(i-1)*7+(j-1)] )},
              {today:isToday(visibeDays[(i-1)*7+(j-1)])},
              {select: isSelect(visibeDays[(i-1)*7+(j-1)])}
              ]"
            >{{visibeDays[(i-1)*7+(j-1)].getDate()}}</span>
          </div>
        </div>
      </div>
      <div class="pannel-footer">今天</div>
    </div>
  </div>
</template>
<script>
import * as utils from "./util";
export default {
  name: "date-picker",
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    let { year, month } = utils.getYearMonthDay(this.value);
    return {
      weekDays: ["一", "二", "三", "四", "五", "六", "日"],
      time: { year, month },
      isVisible: false
    };
  },
  computed: {
    visibeDays() {
      let { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      // 获取当前月份的第一天
      let currentFirstDay = utils.getDate(year, month, 1);
      let week = currentFirstDay.getDay();
      // 当前月开始的天数
      let startDay = currentFirstDay - (week - 1) * 60 * 60 * 1000 * 24;
      // 循环42天
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
      }
      return arr;
    },
    formateDate() {
      let { year, month, day } = utils.getYearMonthDay(this.value);
      return `${year}-${month + 1}-${day}`;
    }
  },
  methods: {
    focus() {
      this.isVisible = true;
    },
    blur() {
      this.isVisible = false;
    },
    // 判断是否当天
    isToday(date) {
      let { year, month, day } = utils.getYearMonthDay(new Date());
      let { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    // 判断是不是当月
    isCurrentMonth(date) {
      let { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      let { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    },
    isSelect(date) {
      // 获取当前的年月日
      let { year, month, day } = utils.getYearMonthDay(this.value);
      let { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    changeday(date) {
      this.time = utils.getYearMonthDay(date);
      this.$emit("input", date);
      this.blur();
    },
    prevMonth() {
      let d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1);
      this.time = utils.getYearMonthDay(d);
    },
    nextMonth() {
      let d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1);
      this.time = utils.getYearMonthDay(d);
    },
    prevYear() {
      let d = utils.getDate(this.time.year, this.time.month, 1);
      console.log(d);
      d.setYear(d.getFullYear() - 1);
      this.time = utils.getYearMonthDay(d);
    },
    nextYear() {
      let d = utils.getDate(this.time.year, this.time.month, 1);
      d.setYear(d.getFullYear() + 1);
      this.time = utils.getYearMonthDay(d);
    }
  },
  directives: {
    clickOutside: {
      // 指令也有生命周期
      bind(el, bindings, vnode) {
        // context
        let handler = e => {
          if (el.contains(e.target)) {
            // 判断面版是否已经显示出来了
            if (!vnode.context.isVisible) {
              vnode.context.focus();
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur();
            }
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind() {
        document.removeEventListener("click", el.handler);
      }
    }
  }
};
</script>
<style lang="stylus">
.pannel {
  position: absolute;
  background: #fff;
  width: 32 * 7px;
  box-shadow: 2px 2px 2px pink, -2px -2px 2px pink;

  .pannel-nav {
    height: 30px;
    display: flex;
    justify-content: space-around;

    .span {
      cursor: pointer;
      user-select: none;
    }
  }

  .pannel-content {
    .cell {
      display: inline-flex;
      width: 32px;
      height: 32px;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      box-sizing: border-box;
    }

    .cell:hover {
      border: 1px solid pink;
    }
  }

  .pannel-footer {
    height: 30px;
  }

  .notCurrentMonth {
    color: gray;
  }

  .today {
    background: red;
    color: #ffff;
    border-radius: 4px;
  }

  .select {
    border: 1px solid pink;
  }
}
</style>

