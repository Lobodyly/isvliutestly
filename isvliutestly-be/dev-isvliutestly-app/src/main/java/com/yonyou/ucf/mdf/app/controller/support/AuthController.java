package com.yonyou.ucf.mdf.app.controller.support;

import com.yonyou.ucf.mdd.isv.constant.OpenApiConstants;
import com.yonyou.ucf.mdd.isv.sso.model.LoginFreeResponse;
import com.yonyou.ucf.mdd.isv.sso.service.SessionService;
import com.yonyou.ucf.mdd.isv.util.WebUtils;
import com.yonyoucloud.iuap.ucf.mdd.error.UCFAuthenticationFailedException;
import com.yonyoucloud.iuap.ucf.mdd.error.UCFRemoteServiceException;
import com.yonyoucloud.iuap.ucf.mdd.starter.core.module.beans.BeanUtils;
import com.yonyoucloud.iuap.ucf.mdd.starter.core.module.network.ClientAddressUtil;
import com.yonyoucloud.iuap.ucf.mdd.starter.ucg.openapi.module.isv.auth.ISVAuthProvider;
import com.yonyoucloud.iuap.ucf.mdd.starter.ucg.openapi.module.isv.auth.pojo.TenantUserIdInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 本类主要用于
 *
 * @author liuhaoi
 * @since Created At 2020/6/2 1:52 下午
 */
@Slf4j
@RestController
@RequestMapping("/rest/v1/abpaas/isv/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final SessionService sessionService;

    private final ISVAuthProvider isvAuthProvider;

    @GetMapping(value = "code", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public LoginFreeResponse authByUnifyCode(@RequestParam String code,
                                             @CookieValue(required = false, name = OpenApiConstants.MDD_ACCESS_TOKEN) String isvAccessToken,
                                             HttpServletRequest request,
                                             HttpServletResponse response) {

        LoginFreeResponse sessionInfo = sessionService.getSession(isvAccessToken);
        if (sessionInfo != null) {
            return sessionInfo;
        }
        TenantUserIdInfo info;
        try {
            info = isvAuthProvider.queryUserByCode(code);
        } catch (UCFRemoteServiceException e) {
            throw new UCFAuthenticationFailedException("code invalid, code should be use in one minute", e);
        }
        String token = RandomStringUtils.randomAlphanumeric(32);
        sessionInfo = new LoginFreeResponse();
        BeanUtils.copyPropertiesIgnoresNull(info, sessionInfo);
        sessionService.saveSession(sessionInfo, token);

        Cookie cookie = WebUtils.createCookie(OpenApiConstants.MDD_ACCESS_TOKEN, token, true, 12 * 60 * 60, null);
        cookie.setDomain(ClientAddressUtil.getRootDomain(request));
        response.addCookie(cookie);
        log.info("set user cookie with user info {}", sessionInfo);

        return sessionInfo;
    }

}
