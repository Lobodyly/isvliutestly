package com.yonyou.ucf.mdf;

import com.yonyou.ucf.mdd.common.context.MddBaseContext;
import com.yonyou.ucf.mdd.print.service.PrintServiceImpl;
import org.imeta.spring.support.profile.DomainIsolationPropertyProfile;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.scheduling.annotation.EnableAsync;


/**
 * spring-boot 入口类
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, RabbitAutoConfiguration.class})
@ComponentScan(basePackageClasses = MDFApplication.class, basePackages = {"com.yonyoucloud.iuap.ucf.mdd", "com.yonyou.ucf.mdd.isv", "com.yonyou.ucf.mdd.core.meta", "com.yonyou.ucf.mdd.conf", "com.yonyou.ucf.mdd.dao", "com.yonyou.ucf.mdf.app", "com.yonyou.ucf.mdd.rule", "com.yonyou.ucf.mdd.uimeta.context", "com.yonyou.ucf.mdd.uimeta.service", "com.yonyou.ucf.mdd.ref.service", "com.yonyou.ucf.mdd.uimeta.filter.service", "com.yonyou.ucf.mdd.core.i18n.service.impl", "com.yonyou.ucf.mdd.uimeta.itemrule.service", "com.yonyou.ucf.mdd.builder.configuration", "com.yonyou.iuap.formula.service.impl", "com.yonyou.ucf.mdd.enums"})
@EnableAsync
@ImportResource("classpath:applicationContext-billNumber-service.xml")
public class MDFApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        ApplicationContext app = SpringApplication.run(MDFApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MDFApplication.class);
    }

    @Bean
    @ConditionalOnMissingBean
    public MddBaseContext mddBaseContext() {
        return new MddBaseContext();
    }


    /**
     * 处理远程参照查询问题,否则会到本地库查询
     *
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public DomainIsolationPropertyProfile domainIsolationPropertyProfile() {
        return new DomainIsolationPropertyProfile();
    }

    @Bean
    @ConditionalOnMissingBean
    public PrintServiceImpl mddPrintService() {
        return new PrintServiceImpl();
    }
}