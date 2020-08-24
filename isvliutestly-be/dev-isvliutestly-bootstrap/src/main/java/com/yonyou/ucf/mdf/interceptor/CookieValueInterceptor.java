package com.yonyou.ucf.mdf.interceptor;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.ucf.mdd.isv.constant.OpenApiConstants;
import com.yonyou.ucf.mdd.isv.sso.model.LoginFreeResponse;
import com.yonyou.ucf.mdd.isv.sso.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.stream.Stream;

/**
 * 本类主要用于
 *
 * @author liuhaoi
 * @since Created At 2020/6/1 9:56 下午
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CookieValueInterceptor extends HandlerInterceptorAdapter {

    public static final String YHT_ACCESS_TOKEN = "yht_access_token";
    public static final String USER_ID = "userId";

    private final SessionService sessionService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return true;
        }
        Stream.of(cookies).forEach(cookie -> {
            if (YHT_ACCESS_TOKEN.equals(cookie.getName())) {
                InvocationInfoProxy.setToken(cookie.getValue());
                InvocationInfoProxy.setExtendAttribute(OpenApiConstants.YHT_ACCESS_TOKEN, cookie.getValue());
            }
            if (USER_ID.equals(cookie.getName())) {
                InvocationInfoProxy.setUserid(cookie.getValue());
            }
            if (OpenApiConstants.MDD_ACCESS_TOKEN.equals(cookie.getName())) {
                LoginFreeResponse session = sessionService.getSession(cookie.getValue());
                if (session != null) {
                    InvocationInfoProxy.setTenantid(session.getTenantId());
                    InvocationInfoProxy.setUserid(session.getYhtUserId());
                }
            }
        });

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        InvocationInfoProxy.reset();
    }
}
