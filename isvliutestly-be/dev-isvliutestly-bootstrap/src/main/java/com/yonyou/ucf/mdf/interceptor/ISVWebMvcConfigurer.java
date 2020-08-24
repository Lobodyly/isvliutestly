package com.yonyou.ucf.mdf.interceptor;

import com.yonyoucloud.iuap.ucf.mdd.starter.core.UCFCoreProperties;
import com.yonyoucloud.iuap.ucf.mdd.starter.core.module.mvc.interceptor.AllowConfOriginCorsInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 本类主要用于
 *
 * @author liuhaoi
 * @since Created At 2020/6/2 11:13 上午
 */
@Component
@RequiredArgsConstructor
public class ISVWebMvcConfigurer implements WebMvcConfigurer {

    private final UCFCoreProperties properties;

    private final CookieValueInterceptor cookieValueInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LocaleInterceptor())
                .addPathPatterns("/**");
        registry.addInterceptor(cookieValueInterceptor)
                .addPathPatterns("/**");
        registry.addInterceptor(new AllowConfOriginCorsInterceptor(properties))
                .addPathPatterns("/**");
    }

}
