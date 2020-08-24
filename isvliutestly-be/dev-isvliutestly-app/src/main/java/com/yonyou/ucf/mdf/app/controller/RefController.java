package com.yonyou.ucf.mdf.app.controller;

import com.yonyou.ucf.mdd.api.dto.RefDataParam;
import com.yonyou.ucf.mdd.common.dto.BaseReqDto;
import com.yonyou.ucf.mdd.common.model.Pager;
import com.yonyou.ucf.mdd.common.model.ref.RefEntity;
import com.yonyou.ucf.mdd.common.model.ref.RefInfo;
import com.yonyou.ucf.mdd.common.model.uimeta.UIMetaBaseInfo;
import com.yonyou.ucf.mdd.uimeta.api.UIMetaEngine;
import com.yonyou.ucf.mdd.uimeta.util.UIMetaUtils;
import com.yonyou.ucf.mdf.app.common.ResultMessage;
import com.yonyou.ucf.mdf.app.util.CommonUtil;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/pub/ref")//保持和 原前端请求路径一致
public class RefController extends BaseController {

    @RequestMapping("/getRefMeta")//保持和 原前端请求路径一致
    public <T> void getRefMeta(BaseReqDto refReqDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            // 传入TenantId，进行数据隔离
            if (null == refReqDto.getTenantId() || StringUtils.isBlank(refReqDto.getTenantId().toString())) {
                refReqDto.setTenantId(CommonUtil.getTenantId());
            }
            //TODO 对于元素可见控制需要实现封装 ViewControlParams
            RefInfo refInfo = UIMetaEngine.getInstance().getRefMeta(refReqDto);
            String protocolType = StringUtils.isBlank(request.getParameter("protocolType")) ? "0" : request.getParameter("protocolType");
            refInfo = (RefInfo) UIMetaUtils.processRefMetaBeforeReturn(refInfo, protocolType);
            renderJson(response, ResultMessage.data(refInfo));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.toString()));
        }
    }

    @RequestMapping("/getRefData")
    public void getRefData(@RequestBody RefDataQueryRequest queryRequest, HttpServletResponse response) throws Exception {
        try {
            Object refData = this.getRefApi(queryRequest.getRefEntity().getDomain(), null, null).getRefData(queryRequest.getBaseInfo(), queryRequest.getRefEntity(), queryRequest.getRefParam());
            renderJson(response, ResultMessage.data(refData));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.toString()));
        }
    }


    /**
     * 查询树装数据 供非 MDD 框架提供服务和调用使用
     *
     * @param refDataParam
     * @return
     */
    @RequestMapping("/getTreeData")
    public void getTreeData(@RequestBody RefDataParam refDataParam, HttpServletResponse response) {
        try {
            List<? extends Map> treeData = this.getRefApi(refDataParam.getRefEntity().getDomain(), null, null).getTreeData(refDataParam);
            renderJson(response, ResultMessage.data(treeData));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.toString()));
        }
    }

    /**
     * 查询列表数据
     *
     * @param refDataParam
     * @return
     */
    @RequestMapping("/getGridData")
    public void getGridData(@RequestBody RefDataParam refDataParam, HttpServletResponse response) {
        try {
            Pager gridData = this.getRefApi(refDataParam.getRefEntity().getDomain(), null, null).getGridData(refDataParam);
            renderJson(response, ResultMessage.data(gridData));
        } catch (Exception e) {
            renderJson(response, ResultMessage.error(e.toString()));
        }
    }


    @Data
    public static class RefDataQueryRequest {

        private UIMetaBaseInfo baseInfo;

        private RefEntity refEntity;

        private Map<String, Object> refParam;
    }
}
