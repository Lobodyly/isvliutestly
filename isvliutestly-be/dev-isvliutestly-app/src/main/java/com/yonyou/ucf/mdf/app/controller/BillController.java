package com.yonyou.ucf.mdf.app.controller;

import com.yonyou.ucf.mdd.common.dto.BaseReqDto;
import com.yonyou.ucf.mdd.common.enums.OperationTypeEnum;
import com.yonyou.ucf.mdd.common.model.Pager;
import com.yonyou.ucf.mdd.common.model.ResultList;
import com.yonyou.ucf.mdd.common.model.rule.RuleExecuteResult;
import com.yonyou.ucf.mdd.common.model.uimeta.filter.vo.FilterVO;
import com.yonyou.ucf.mdd.common.utils.json.GsonHelper;
import com.yonyou.ucf.mdd.uimeta.api.UIMetaEngine;
import com.yonyou.ucf.mdf.app.common.ResultMessage;
import com.yonyou.ucf.mdf.app.service.IBillService;
import com.yonyou.ucf.mdf.app.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/bill")
public class BillController extends BaseController {

    private Logger logger = LoggerFactory.getLogger(BillController.class);

    @Autowired
    private IBillService billService;
//    @Autowired
//    private IPOIService poiService;

    @RequestMapping("/list")
    public void list(@RequestBody BaseReqDto queryParam, HttpServletRequest request, HttpServletResponse response) {
        Pager pager;
        try {
            pager = billService.queryByPage(queryParam);
            renderJson(response, ResultMessage.data(pager));
        } catch (Exception e) {
            logger.error(e.getMessage());
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    @RequestMapping("/detail")
    public void detail(String billnum, String id, Long groupSchemaId, HttpServletRequest request, HttpServletResponse response) {

        try {
            BaseReqDto bill = new BaseReqDto();
            bill.setId(id);
            bill.setBillnum(billnum);
            bill.setTenantId(CommonUtil.getTenantId());
            bill.setUserId(CommonUtil.getUserId());
            bill.setGroupSchemaId(groupSchemaId);
            Map map = billService.detail(bill);
            renderJson(response, ResultMessage.data(map));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    @RequestMapping("/print")
    public void print(String billnum, String ids, Long groupSchemaId, HttpServletRequest request, HttpServletResponse response) {
        try {
            BaseReqDto<String,String,String> bill = new BaseReqDto<>();
            bill.setId(ids);
            bill.setBillnum(billnum);
            bill.setTenantId(CommonUtil.getTenantId());
            bill.setUserId(CommonUtil.getUserId());
            bill.setGroupSchemaId(groupSchemaId);
            Map map = billService.print(bill, "print");//printnow
            renderJson(response, GsonHelper.ToJSon(map));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    @RequestMapping("/add")
    public void add(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {

        try {
            String json = billService.add(bill);
            renderJson(response, ResultMessage.toMap(json, true));
        } catch (Exception e) {
            logger.error("exception when do bill add", e);
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

    @RequestMapping("/delete")
    public void delete(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            String json = billService.delete(bill);
            renderJson(response, ResultMessage.toMap(json, true));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
            //e.printStackTrace();
        }
    }
//
//    @RequestMapping("/export")
//    public void export(@RequestBody POIDto poiDto, HttpServletRequest request, HttpServletResponse response) {
//        try {
//            UIMetaBaseInfo baseInfo = UIMetaHelper.getUIMetaBaseInfo(poiDto.getBillnum(), CommonUtil.getTenantId());
//            POIDto queryBill=new POIDto();
//            BeanUtils.copyProperties(poiDto,queryBill);
//            queryBill.setAction("query");
//            queryBill.setIncludeMeta(true);
//            poiDto.setTenantId(CommonUtil.getTenantId());
//            poiDto.setUserId(CommonUtil.getUserId());
//            // 如果模板信息需要过滤需要传入ViewControlParams参数
//            // poiDto.setViewControlParams(null);
//            String[] ruleLvs = new String[3];
//            ruleLvs[0] = "common";
//            ruleLvs[1] = baseInfo.getSubid();
//            ruleLvs[2] = baseInfo.getBillnum();
//            poiDto.setRuleLvs(ruleLvs);
//            // poiDto.setDataTransferFields();
//            IPerdicateHandler perdicateHandler = MddBaseContext.getBean(IPerdicateHandler.class);
//            if (null == perdicateHandler) {
//                perdicateHandler = new DefaultPerdicateHandler();
//            }
//            ExcelExportData excelData = poiService.export(poiDto, perdicateHandler);
//            String fileName = StringUtils.isNotBlank(poiDto.getFileName()) ? poiDto.getFileName() : poiDto.getBillnum() + DateKit.getCurrTime();
//            StreamParam streamParam = new StreamParam(fileName, excelData, response);
//            poiService.downLoadToResponse(streamParam);
//        } catch (Exception e) {
//            logger.error(e.getMessage());
//            renderJson(response, ResultMessage.error(e.getMessage()));
//        }
//    }
//
//    /**
//     * 单据 导入数据
//     *
//     * @param file
//     * @param billnum
//     * @param request
//     * @param response
//     */
//
//    @RequestMapping("/billImport")
//    public void billImport(@RequestParam("file") MultipartFile file,
//                           @RequestParam(value = "billnum", required = false) String billnum,
//                           @RequestParam(value = "asyncKey", required = false) String asyncKey,
//                                   HttpServletRequest request,
//                           HttpServletResponse response) {
//        try {
//            POIDto poiDto = new POIDto();
//            poiDto.setBillnum(billnum);
//            poiDto.setUserId(CommonUtil.getUserId());
//            poiDto.setTenantId(CommonUtil.getTenantId());
//            poiDto.setAsyncKey(asyncKey);
//            UIMetaBaseInfo baseInfo = UIMetaHelper.getUIMetaBaseInfo(poiDto.getBillnum(), CommonUtil.getTenantId());
//            String[] ruleLvs = new String[3];
//            ruleLvs[0] = "common";
//            ruleLvs[1] = baseInfo.getSubid();
//            ruleLvs[2] = baseInfo.getBillnum();
//            poiDto.setRuleLvs(ruleLvs);
//            Map<String, Object> importData = poiService.getImportData(file);
//            InvocationInfoProxy.setExtendAttribute("sourcetype","billData");
//            Map<String,String> otherContext = new HashMap(InvocationInfoProxy.getParamters());
//            otherContext.put("userid",InvocationInfoProxy.getUserid());
//            ResultList resultList = null;
//            if (StringUtils.isNotEmpty(poiDto.getAsyncKey())){
//                poiService.initPOICacheResultList(poiDto.getAsyncKey());
//                poiService.importDataAsync(importData, poiDto, null, MddBaseContext.getToken(),MddBaseContext.getTenantId(),otherContext,"billData");
//            }else{
//                resultList = poiService.importDataSync(importData, poiDto, null,MddBaseContext.getToken(),MddBaseContext.getTenantId(),otherContext,"billData");
//            }
//            if(StringUtils.isNotEmpty(asyncKey)){
//                renderJson(response, ResultMessage.data("succeed"));
//            }else{
//                renderJson(response, ResultMessage.data(resultList));
//            }
//        } catch (Exception e) {
//            renderJson(response, ResultMessage.error(e.getMessage()));
//            //e.printStackTrace();
//        }
//    }

    /**
     * 保存业务数据
     *
     * @param bill
     * @param request
     * @param response
     */
    @RequestMapping("/save")
    public void save(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate("save", bill);
            renderJson(response, ResultMessage.data(result.getData(), false));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    /**
     * 批量删除
     *
     * @param bill
     * @param request
     * @param response
     */
    @RequestMapping("/batchdelete")
    public void batchdelete(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (bill.getData() != null) {
                bill.setAction(request.getParameter("action"));
                ResultList resultList = billService.batchdelete(bill);
                renderJson(response, ResultMessage.data(resultList));
            } else {
                renderJson(response, ResultMessage.error("no data"));
            }
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }


    @RequestMapping("/ref/getRefData") //保持和 原前端请求路径一致
    public void getRefData(@RequestBody(required = false) BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            //TODO 对于元素可见控制需要实现封装 ViewControlParams
            if (null == baseReqDto.getTenantId() || StringUtils.isBlank(baseReqDto.getTenantId().toString())) {// 指定租户查询
                baseReqDto.setTenantId(CommonUtil.getTenantId());
            }
            Object refData = UIMetaEngine.getInstance().getRefData(baseReqDto);
            renderJson(response, ResultMessage.data(refData));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.toString()));
        }
    }

    @RequestMapping("/querytree")
    public void querytree(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            List list = billService.querytree(baseReqDto);
            renderJson(response, ResultMessage.data(list));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
            e.printStackTrace();
        }

    }

    //-------------------move x-----------------------------------------
//    @RequestMapping("/enter")
//    public void enter(String billnum, String id, HttpServletRequest request, HttpServletResponse response) {
//        try {
//            BaseReqDto baseReqDto = new BaseReqDto();
//            baseReqDto.setId(id);
//            baseReqDto.setBillnum(billnum);
//            Map map = billService.enter(baseReqDto);
//            renderJson(response, ResultMessage.permissions(map));
//        } catch (Exception e) {
//            renderJson(response, ResultMessage.error(e.getMessage()));
//        }
//
//    }

    @RequestMapping("/movefirst")
    public void movefirst(String billnum, String condition, @RequestBody FilterVO filterVO, HttpServletRequest request, HttpServletResponse response) {

        try {
            BaseReqDto baseReqDto = new BaseReqDto();
            baseReqDto.setBillnum(billnum);
            FilterVO fv = parseFilterVO(condition,filterVO,request);
            baseReqDto.setCondition(fv);
            Map map = billService.movefirst(baseReqDto);
            renderJson(response, ResultMessage.data(map));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

    @RequestMapping("/moveprev")
    public void moveprev(String billnum, String id, String condition, FilterVO filterVO, HttpServletRequest request, HttpServletResponse response) {

        try {
            BaseReqDto baseReqDto = new BaseReqDto();
            baseReqDto.setBillnum(billnum);
            baseReqDto.setId(id);
            //baseReqDto.setCondition(parseFilterVO(condition,filterVO,request));
            Map map = billService.moveprev(baseReqDto);
            renderJson(response, ResultMessage.data(map));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

    @RequestMapping("/movenext")
    public void movenext(String billnum, String id, String condition, FilterVO filterVO, HttpServletRequest request, HttpServletResponse response) {

        try {
            BaseReqDto baseReqDto = new BaseReqDto();
            baseReqDto.setBillnum(billnum);
            baseReqDto.setId(id);
            //baseReqDto.setCondition(parseFilterVO(condition,filterVO,request));
            Map map = billService.movenext(baseReqDto);
            renderJson(response, ResultMessage.data(map));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

    @RequestMapping("/movelast")
    public void movelast(String billnum, String condition, @RequestBody FilterVO filterVO, HttpServletRequest request, HttpServletResponse response) {
        try {
            BaseReqDto baseReqDto = new BaseReqDto();
            baseReqDto.setBillnum(billnum);
            FilterVO fv = parseFilterVO(condition, filterVO, request);
            baseReqDto.setCondition(fv);
            Map map = billService.movelast(baseReqDto);
            renderJson(response, ResultMessage.data(map));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    @RequestMapping("/check")
    public void check(@RequestBody BaseReqDto checkItem, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.check(checkItem);
            renderJson(response, ResultMessage.data(result.getData()));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }


    @RequestMapping("/submit")
    public void submit(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate(OperationTypeEnum.SUBMIT.getValue(), baseReqDto);
            renderJson(response, ResultMessage.data(result.getData(), false));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }
    
    @RequestMapping("/stop")
    public void stop(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate(OperationTypeEnum.STOP.getValue(), baseReqDto);
            renderJson(response, ResultMessage.data(result.getData(), false));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }
    
    @RequestMapping("/unstop")
    public void unstop(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate(OperationTypeEnum.UNSTOP.getValue(), baseReqDto);
            renderJson(response, ResultMessage.data(result.getData(), false));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    @RequestMapping("/unsubmit")
    public void unsubmit(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate(OperationTypeEnum.UNSUBMIT.getValue(), baseReqDto);
            renderJson(response, ResultMessage.data(result.getData(), true));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    /**
     * 批量提交
     *
     * @param bill
     * @param request
     * @param response
     */
    @RequestMapping("/batchsubmit")
    public void batchsubmit(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (bill.getData() != null) {
                bill.setAction(request.getParameter("action"));
                ResultList resultList = billService.batchsubmit(bill);
                renderJson(response, ResultMessage.data(resultList));
            } else {
                renderJson(response, ResultMessage.error("no data"));
            }
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));

            //e.printStackTrace();
        }

    }
    /**
     * 批量撤回
     *
     * @param bill
     * @param request
     * @param response
     */
    @RequestMapping("/batchunsubmit")
    public void batchunsubmit(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (bill.getData() != null) {
                bill.setAction(request.getParameter("action"));
                ResultList resultList = billService.batchunsubmit(bill);
                renderJson(response, ResultMessage.data(resultList));
            } else {
                renderJson(response, ResultMessage.error("no data"));
            }
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));

            //e.printStackTrace();
        }

    }
    
    /**
     * 审核操作
     * @param baseReqDto
     * @param request
     * @param response
     */
    @RequestMapping("/audit")
    public void audit(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate(OperationTypeEnum.AUDIT.getValue(), baseReqDto);
            renderJson(response, ResultMessage.data(result.getData(), false));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }
    
    @RequestMapping("/batchaudit")
    public void batchaudit(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (bill.getData() != null) {
                ResultList resultList = billService.batchDo(bill, OperationTypeEnum.AUDIT.getValue());
                renderJson(response, ResultMessage.data(resultList));
            } else {
                renderJson(response, ResultMessage.error("no data"));
            }
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

    /**
     * 弃审操作
     * @param baseReqDto
     * @param request
     * @param response
     */
    @RequestMapping("/unaudit")
    public void unaudit(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            RuleExecuteResult result = billService.executeUpdate(OperationTypeEnum.UNAUDIT.getValue(), baseReqDto);
            renderJson(response, ResultMessage.data(result.getData(), false));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }
    
    @RequestMapping("/batchunaudit")
    public void batchunaudit(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (bill.getData() != null) {
                ResultList resultList = billService.batchDo(bill, OperationTypeEnum.UNAUDIT.getValue());
                renderJson(response, ResultMessage.data(resultList));
            } else {
                renderJson(response, ResultMessage.error("no data"));
            }
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }
    
    @RequestMapping("/batchDo")
    public void batchDo(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (bill.getData() != null) {
            	String action = request.getParameter("action");
                ResultList resultList = billService.batchDo(bill, action);
                renderJson(response, ResultMessage.data(resultList));
            } else {
                renderJson(response, ResultMessage.error("no data"));
            }
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

    @PostMapping("/executeFormulaCalculate")
    public void executeFormulaCalculate(@RequestBody BaseReqDto baseReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            //TODO trigger fields
            baseReqDto.setAction("recalculate");
            Object result = billService.doAction(baseReqDto);
            renderJson(response, ResultMessage.data(result, true));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }
    }

    @RequestMapping("/copy")
    public void copy(@RequestBody BaseReqDto bill, HttpServletRequest request, HttpServletResponse response) {

        try {
            String json = billService.copy(bill);
            renderJson(response, ResultMessage.toMap(json, true));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.getMessage()));
        }

    }

}