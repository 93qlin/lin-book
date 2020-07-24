```
<template>
    <div class="">
        <div id="calendar">
        <!-- 年份 月份 -->
        <!-- <div class="month">
            <ul>
                
                <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                    <span class="choose-year">{{ currentYear }}年</span>
                    <span class="choose-month">{{ currentMonth }}月</span>
                </li>
                <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
        </div> -->
        <div class="datePicker-box">
            <button type="button" @click="pickYear(currentYear-1, currentMonth);" class="el-picker-panel__icon-btn el-icon-d-arrow-left"></button>
            <button type="button" @click="pickPre(currentYear,currentMonth)" class="el-picker-panel__icon-btn el-icon-arrow-left"></button>
            <el-date-picker
                v-model="selectedMonth"
                type="month"
                @change="changeDate"
                class="datePicker-item"
                :clearable='false'
                placeholder="选择月">
            </el-date-picker>
            <button type="button" @click="pickNext(currentYear,currentMonth)" class="el-picker-panel__icon-btn el-icon-arrow-right"></button>
            <button type="button" @click="pickYear(currentYear + 1,currentMonth)" class="el-picker-panel__icon-btn el-icon-d-arrow-right"></button>
            <span class="sunday-box now-box" @click="initToday">今天</span>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li class="sunday-box">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li v-for="dayobject in days" :key="dayobject.day.key">
                <!--本月-->
                <!--如果不是本月  改变类名加灰色-->

                <span v-if="dayobject.day.getMonth()+1 != currentMonth"
                    class="other-month">{{ dayobject.day.getDate() }}</span>

                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else @click="selectDate(dayobject.day.getDate())">
                    <template  v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()">     
                        <!--今天  同年同月同日-->
                        <span class="active">{{ dayobject.day.getDate() }}</span>
                    </template>
                    <template v-else>
                        <span v-if="dayobject.day.getDay() == 0 || dayobject.type == 'freeDay'" :class="[dayobject.day.getFullYear() == selectedDate.getFullYear() && dayobject.day.getMonth() == selectedDate.getMonth() && dayobject.day.getDate() == selectedDate.getDate() ? 'activeselecttClass' : '', 'sunday-box']">{{ dayobject.day.getDate() }}</span>
                        <span v-else  :class="[dayobject.day.getFullYear() == selectedDate.getFullYear() && dayobject.day.getMonth() == selectedDate.getMonth() && dayobject.day.getDate() == selectedDate.getDate() ? 'activeselecttClass' : '']">{{ dayobject.day.getDate() }}</span>
                    </template>
                </span>

            </li>
        </ul>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "",
    data() {
        return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            selectedMonth: new Date(),
            selectedDate: new Date(),
            freeDay: [
                '2019-11-12',
                '2019-11-13',
                '2019-11-14',
                '2019-11-15',
                '2019-11-16',
                '2019-11-17',
            ]
        }
    },
    components: {},
    methods: {
        changeDate(val) {
            this.initData(this.formatDate(val.getFullYear(), val.getMonth()+1, 1));
        },
        initData: function (cur) {
                var date;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now = new Date();
                    var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                    console.log(new Date(),d,103);
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                }
                this.currentDay = date.getDate();
                
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (let i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day = d;
                    dayobject.key = +d
                    if(this.freeDay.findIndex(item => item == this.formatDate(d.getFullYear(), d.getMonth()+1, d.getDate())) != -1){
                       dayobject.type = 'freeDay' 
                       
                    }
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用


                }
                //其他周
                for (let i = 1; i <= 42 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject = {};
                    dayobject.day = d;
                    dayobject.key = +d
                    if(this.freeDay.findIndex(item => item == this.formatDate(d.getFullYear(), d.getMonth()+1, d.getDate()))!= -1){
                       dayobject.type = 'freeDay' 

                    }
                    this.days.push(dayobject);
                }

            },
            getDay(day) {
                console.log(day.day.getDate());
            },
            pickPre: function (year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                this.selectedMonth = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            pickNext: function (year, month) {
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                this.selectedMonth = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            pickYear(year, month) {
                this.initData(this.formatDate(year, month, 1));
                this.selectedMonth = new Date(this.formatDate(year, month, 1));
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function (year, month, day) {
                var y = year;
                var m = month;
                if (m < 10) m = "0" + m;
                var d = day;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d
            },
            initToday() {
                this.initData(null);
                this.selectedMonth = new Date()
                this.selectedDate = new Date()
                this.selectDate(new Date().getDate())
            },
            selectDate(currentDay) {
                this.selectedDate = new Date(this.formatDate(this.currentYear,this.currentMonth,currentDay))
                this.$emit('changeDate', this.formatDate(this.currentYear,this.currentMonth,currentDay))
                console.log('传出的数据：'+this.formatDate(this.currentYear,this.currentMonth,currentDay));
                
            }
    },
    created() {
        this.initData(null);
    },
}
</script>

<style lang="scss" scoped>
        * {
            box-sizing: border-box;
        }
        ul,li {
            list-style-type: none;
        }
        #calendar {
            width: 280px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        }
        .activeselecttClass{
            background: #EAB2FA
        }
        .datePicker-box{
            display: flex;
            align-items: center;
            .datePicker-item{
                width: 120px;
            }
            .el-picker-panel__icon-btn {
                font-size: 12px;
                color: #303133;
                border: 0;
                background: transparent;
                cursor: pointer;
                outline: none;
                margin-top: 0px;
            }
            .el-icon-d-arrow-left:before {
                content: "\e6dd";
            }
            .el-icon-arrow-left:before {
                content: "\e6de";
            }
            .el-icon-arrow-right:before {
                content: "\e6e0";
            }
            .el-icon-d-arrow-right:before {
                content: "\e6dc";
            }
        }
        .sunday-box{
            color: red
        }
        .now-box{
            padding-left: 10px;
            cursor: pointer;
        }
        .month {
            width: 100%;
            background: #0080BB;
             ul {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-between;
            }
        }
        .year-month {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .year-month:hover {
            background: rgba(150, 2, 12, 0.1);
        }

        .choose-year {
            padding-left: 20px;
            padding-right: 20px;
        }

        .choose-month {
            text-align: center;
            font-size: 12px;
        }

        .arrow {
            padding: 30px;
        }

        .arrow:hover {
            background: rgba(100, 2, 12, 0.1);
        }

        .month ul li {
            color: white;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        .weekdays {
            padding: 10px 0;
            // background-color: #0080BB;
            display: flex;
            flex-wrap: wrap;
            color: #333;
            justify-content: space-around;
        }

        .weekdays li {
            display: inline-block;
            width: 40px;
            width: 40px;
            text-align: center;
        }

        .days {
            padding: 0;
            background: #FFFFFF;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .days li {
            text-align: center;
            font-size: 20px;
            color: #333;
            border-radius: 50%;
            span{
                width: 40px;
                height: 40px;
                display: block;
                line-height: 40px;
                border-radius: 50%;
                cursor: pointer;
            }
        }

        .days li .active {
            background: #28EDED;
        }

        .days li .other-month {
            color: gainsboro;
            cursor:no-drop;
            cursor:not-allowed
        }

        .days li:hover {
            background: #A4B9F9;
        }
</style>
```