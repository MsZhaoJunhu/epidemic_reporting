import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
	// redirect:'/Mytemporary'
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue"),
    // redirect: "/index/fugong",
    children: [
      {
        path: "index",
        name: "Cindex",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/默认首页.vue")
      },
      {
        path: "fugong",
        name: "fugong",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/复工.vue")
      },
      {
        path: "userfugong",
        name: "userfugong",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/个人首页.vue")
      }
    ]
  },
  {
    path: "/outsiders",
    name: "outsiders",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/外来人员管理.vue")
  },
  {
    path: "/jubaoxiangqing",
    name: "jubaoxiangqing",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/jubaoxiangqing.vue")
  },
  {
    path: "/jubaojilu",
    name: "jubaojilu",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/jubaojilu.vue")
  },
  {
    path: "/jubaochenggong",
    name: "jubaochenggong",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/jubaochenggong.vue")
  },
  {
    path: "/quzheng",
    name: "quzheng",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/quzheng.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue")
  },
  {
    path: "/member",
    name: "member",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/member.vue")
  },
  {
    path: "/mycenter",
    name: "mycenter",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mycenter.vue")
  },
  {
    path: "/myinfo",
    name: "myinfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/myinfo.vue")
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import(/* webpackChunkName: "about" */ "../views/reg.vue")
  },
  {
    path: "/affiliatedEnterprises",
    name: "affiliatedEnterprises",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/affiliatedEnterprises.vue"
      )
  },
  {
    path: "/actionReport",
    name: "actionReport",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/actionReport.vue")
  },
  {
    path: "/healthReport",
    name: "healthReport",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/healthReport.vue")
  },
  {
    path: "/submitsuccess",
    name: "submitsuccess",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/submitsuccess.vue")
  },
  {
    path: "/reportRecord",
    name: "reportRecord",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/reportRecord.vue")
  },
  {
    path: "/jubao",
    name: "jubao",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/jubao.vue")
  },
  {
    path: "/mycompany",
    name: "mycompany",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mycompany.vue")
  },
  {
    path: "/mycontent",
    name: "mycontent",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mycontent.vue")
  },
  {
    path: "/mylist",
    name: "mylist",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mylist.vue")
  },

  {
    path: "/resumption",
    name: "resumption",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumption.vue")
  },
  {
    path: "/resumptionSuccess",
    name: "resumptionSuccess",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumptionSuccess.vue")
  },
  {
    path: "/resumptionList",
    name: "resumptionList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumptionList.vue")
  },
  {
    path: "/resumptionDetails",
    name: "resumptionDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumptionDetails.vue")
  },
  {
    path: "/staffHealthy",
    name: "staffHealthy",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/staffHealthy.vue")
  },
  {
    path: "/staffHealthySuccess",
    name: "staffHealthySuccess",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/staffHealthySuccess.vue")
  },
  {
    path: "/staffHealthyList",
    name: "staffHealthyList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/staffHealthyList.vue")
  },
  {
    path: "/staffHealthyDetails",
    name: "staffHealthyDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/staffHealthyDetails.vue")
  },
  {
    path: "/disinfection",
    name: "disinfection",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/disinfection.vue")
  },
  {
    path: "/disinfectionSuccess",
    name: "disinfectionSuccess",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/disinfectionSuccess.vue")
  },
  {
    path: "/disinfectionList",
    name: "disinfectionList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/disinfectionList.vue")
  },
  {
    path: "/disinfectionDeatils",
    name: "disinfectionDeatils",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/disinfectionDeatils.vue")
  },
  {
    path: "/materialSolicitationRegister",
    name: "materialSolicitationRegister",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialSolicitationRegister.vue"
      )
  },
  {
    path: "/materialGrant",
    name: "materialGrant",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialGrant.vue"
      )
  },
  {
    path: "/materialDemandRelease",
    name: "materialDemandRelease",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialDemandRelease.vue"
      )
  },
  {
    path: "/materialInformationQuery",
    name: "materialInformationQuery",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialInformationQuery.vue"
      )
  },
  {
    path: "/materialSumbitRecord",
    name: "materialSumbitRecord",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialSumbitRecord"
      )
  },
  {
    path: "/materialSumbitSuccess",
    name: "materialSumbitSuccess",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialSumbitSuccess"
      )
  },
  {
    path: "/tijiao",
    name: "tijiao",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tijiao.vue")
  },
  {
    path: "/personaldetails",
    name: "personaldetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/personaldetails.vue")
  },
  {
    path: "/newlist",
    name: "newlist",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/msgList.vue")
  },
  {
    path: "/newContent/:id",
    name: "newContent",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/msgContent.vue")
  },
  {
    path: "/issueDemandForm",
    name: "issueDemandForm",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/issueDemandForm.vue")
  },
  {
    path: "/materialDemandList",
    name: "materialDemandList",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/materialDemandList.vue"
      )
  },
  {
    path: "/caseworkList",
    name: "caseworkList",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/caseworkList.vue"
      )
  },
  {
    path: "/caseinternalPage/:id",
    name: "caseinternalPage",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/caseinternalPage.vue"
      )
  },
  {
    path: "/caseformAdd",
    name: "caseformAdd",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/caseformAdd.vue"
      )
  },
  {
    path: "/fangkong",
    name: "fangkong",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/prevention/fangkong.vue")
  },
  {
    path: "/fangkongLogin",
    name: "fangkongLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/prevention/fklogin.vue")
  },
  {
    path: "/my",
    name: "my",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/prevention/my.vue")
  },
  {
    path: "/updateName",
    name: "updateName",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/updateName.vue"
      )
  },
  {
    path: "/updatePwd",
    name: "updatePwd",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/updatePwd.vue"
      )
  },
  {
    path: "/fangkongMsg",
    name: "fangkongMsg",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/prevention/msg.vue")
  },
  {
    path: "/addTask",
    name: "addTask",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/prevention/addTask.vue")
  },
  {
    path: "/taskDetails",
    name: "taskDetails",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/taskDetails.vue"
      )
  },
  {
    path: "/taskSubmit",
    name: "taskSubmit",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/taskSubmit.vue"
      )
  },
  {
    path: "/taskSubmitDetails",
    name: "taskSubmitDetails",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/prevention/taskSubmitDetails.vue"
      )
  },
  {
    path: "/taskList",
    name: "taskList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/prevention/taskList.vue")
  },
  {
    path: "/wuzi",
    name: "wuzi",
    component: () => import(/* webpackChunkName: "about" */ "../views/wuzi.vue")
  },
  {
    path: "/wzxq",
    name: "wzxq",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/MaterialCollection/wzxq.vue"
      )
  },
  {
    path: "/virusNews",
    name: "virusNews",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/virusNews.vue")
  },
  {
    path: "/virusNewsDetails/:id/:value",
    name: "virusNewsDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/virusNewsDetails.vue")
  },
  {
    path: "/residentSubmit",
    name: "residentSubmit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/residentSubmit.vue")
  },
  {
    path: "/residentList",
    name: "residentList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/residentList.vue")
  },
  {
    path: "/residentDetails/:id",
    name: "residentDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/residentDetails.vue")
  },
  {
    path: "/residentListCompeny",
    name: "residentListCompeny",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/residentListCompeny.vue")
  },
  {
    path: "/residentDetailsCompeny/:id",
    name: "residentDetailsCompeny",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/residentDetailsCompeny.vue"
      )
  },
  {
    path: "/reportList",
    name: "reportList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/reportList.vue")
  },
  {
    path: "/reportDetails",
    name: "reportDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/reportDetails.vue")
  },
  {
    path: "/employeeList",
    name: "employeeList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/企业员工列表.vue")
  },
  {
    path: "/employeeInfo/:id",
    name: "employeeInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/企业个人信息.vue")
  },
  {
    path: "/reg_enterprise",
    name: "reg_enterprise",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/reg_enterprise.vue")
  },
  {
    path: "/residentClockin",
    name: "residentClockin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/residentClockin.vue")
  },
  {
    path: "/residentClockinRecord",
    name: "residentClockinRecord",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/residentClockinRecord.vue"
      )
  },
  {
    path: "/residentClockinComeToVisit",
    name: "residentClockinComeToVisit",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/residentClockinComeToVisit.vue"
      )
  },
  {
    path: "/visitorRegister",
    name: "visitorRegister",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/VisitorRegister/visitorRegister.vue"
      )
  },
  {
    path: "/visitorRegisterSuccess",
    name: "visitorRegisterSuccess",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/VisitorRegister/visitorRegisterSuccess.vue"
      )
  },
  {
    path: "/employeePassSuccess",
    name: "employeePassSuccess",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/EmployeePasses/employeePassSuccess.vue"
      )
  },
  {
    path: "/employeePassFailed",
    name: "employeePassFailed",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/EmployeePasses/employeePassFailed.vue"
      )
  },
  {
    path: "/employeePassRegister",
    name: "employeePassRegister",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/EmployeePasses/employeePassRegister.vue"
      )
  },
  {
    path: "/residentClockinRecord",
    name: "residentClockinRecord",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/residentClockinRecord.vue"
      )
  },
  {
    path: "/visitorRegisterRecord",
    name: "visitorRegisterRecord",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/VisitorRegister/visitorRegisterRecord.vue"
      )
  },
  {
    path: "/choosePassType",
    name: "choosePassType",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/EmployeePasses/choosePassType.vue"
      )
  },
  {
    path: "/resumptionAddPerson",
    name: "resumptionAddPerson",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumptionAddPerson.vue")
  },
  {
    path: "/resumptionAdd",
    name: "resumptionAdd",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumptionAdd.vue")
  },
  {
    path: "/resumptionAddMaterial",
    name: "resumptionAddMaterial",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/resumptionAddMaterial.vue")
  },
  {
    path: "/resumptionPersonList",
    name: "resumptionPersonList",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/resumptionPersonList.vue"
      )
  },
  {
    path: "/regHospital",
    name: "regHospital",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/来院登记.vue")
  },
  {
    path: "/regHospitalList",
    name: "regHospitalList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/来院登记列表.vue")
  },
  {
    path: "/regHospitalDetail",
    name: "regHospitalDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/患者来院登记详情.vue")
  },
  {
    path: "/regHospitalCode",
    name: "regHospitalCode",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/来院登记二维码.vue")
  },
  {
    path: "/regHospitalCode",
    name: "regHospitalCode",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/员工复工登记表.vue")
  },
  {
    path: "/disabled_staff",
    name: "disabled_staff",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/disabled_staff.vue")
  },
  {
    path: "/addEmployee",
    name: "addEmployee",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/添加员工.vue")
  },
  {
    path: "/passwordLogin",
    name: "passwordLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/passwordLogin.vue")
  },
  {
    path: "/addPersonAlign",
    name: "addPersonAlign",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/addPersonAlign.vue")
  },

  //企业个人中心
  {
    path: "/qiyegrzx",
    name: "qiyegrzx",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/qiyegrzx.vue")
  },
  {
    path: "/zixun",
    name: "zixun",
    component: () => import(/* webpackChunkName: "about" */ "../views/资讯.vue")
  },
  {
    path: "/findCompany",
    name: "findCompany",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/添加公司.vue")
  },
  {
    path: "/checkList",
    name: "checkList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/查看员工详情列表.vue")
  },
  {
    path: "/updatePass",
    name: "updatePass",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/修改密码.vue")
  },
  {
    path: "/Mytemporary",
    name: "Mytemporary",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/临时通行证/我的通行证.vue")
  },
  {
    path: "/applyTemporary",
    name: "applyTemporary",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/临时通行证/申请通行证.vue")
  },
  {
    path: "/applySuccee",
    name: "applySuccee",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/临时通行证/申请成功.vue")
  },
  {
    path: "/temporaryDetails",
    name: "temporaryDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/临时通行证/通行证详情.vue")
  },
  {
    path: "/applyMaterials",
    name: "applyMaterials",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/证明材料上报.vue")
  },
  {
    path: "/MaterialsDetails",
    name: "MaterialsDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/证明材料详情.vue")
  },
  {
    path: "/EMaterialsDetails",
    name: "EMaterialsDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/企业证明材料详情.vue")
  },
  {
    path: "/recruitment",
    name: "recruitment",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/recruitment.vue")
  },
  {
    path: "/recruitmentSubmit",
    name: "recruitmentSubmit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/recruitmentSubmit.vue")
  },
  {
    path: "/recruitmentDetails",
    name: "recruitmentDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/recruitmentDetails.vue")
  },
  {
    path: "/updateUserinfo",
    name: "updateUserinfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/updateUserinfo.vue")
  },
  {
    path: "/checkUserinfo",
    name: "checkUserinfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/checkUserinfo.vue")
  },
];

const router = new VueRouter({
  routes
});

//权限白名单['路由name']
const write = [
  // "index",
  "login",
  "passwordLogin",
  "reg",
  "member",
  "fangkongLogin",
  "materialSumbitRecord",
  "reg_enterprise",
  "regHospital",
  "addEmployee",
  "employeePassSuccess",
  "visitorRegister",
  "regHospitalDetail",
  "qiyegrzx",
  "virusNewsDetails",
  "Cindex",
  "zixun"
];
// 联防联控的所有路由
const write2 = [
  "fangkong",
  "my",
  "updateName",
  "updatePwd",
  "fangkongMsg",
  "caseworkList",
  "caseinternalPage",
  "caseformAdd",
  "addTask",
  "taskDetails",
  "taskSubmit",
  "taskSubmitDetails",
  "taskList"
];
//to 即将进入的路由
//from 来自哪个路由

router.beforeEach((to, from, next) => {
  console.info(to.name);
  console.info(localStorage.getItem("link"));

  if (to.name == "index") {
    if (localStorage.getItem("link") == "mycenter") {
      next({
        path: "/index/userfugong"
      });
    } else if (localStorage.getItem("link") == "mycompany") {
      next({
        path: "/index/fugong"
      });
    } else {
      next({
        path: "/index/index"
      });
    }
    return;
  }

  if (write.indexOf(to.name) != -1 || write2.indexOf(to.name) != -1) {
    if (
      localStorage.getItem("Ptoken") == null &&
      write2.indexOf(to.name) != -1
    ) {
      next({
        name: "fangkongLogin"
      });
      return;
    }
    // 如果在白名单里面 就直接跳转
    next();
  } else {
    // 没在白名单中/ 进行检测 是否登录
    if (localStorage.getItem("token") != null) {
      if (to.name == "mycompany" || to.name == "mycenter") {
        if (to.name == localStorage.getItem("link")) {
          next();
        } else {
          next({
            name: "login"
          });
        }
      } else {
        next();
      }
    } else {
      next({
        name: "login"
      });
    }
  }
});

export default router;
