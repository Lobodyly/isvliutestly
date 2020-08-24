package com.yonyou.ucf.mdf;

import com.yonyou.ucf.mdd.common.interfaces.ref.IRefEventAdapter;
import com.yonyou.ucf.mdd.core.meta.MetaDaoDataAccessProxy;
import com.yonyou.ucf.mdd.core.service.RefEventAdapterImpl;
import org.imeta.spring.base.UnfiedBeanFactory;
import org.imeta.spring.support.cache.UnifiedMetaProperties;
import org.imeta.spring.support.db.ModelManager;
import org.imeta.spring.support.id.IdManager;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 本类主要用于
 *
 * @author liuhaoi
 * @since Created At 2020/6/9 10:50 上午
 */
@Configuration
public class IMetaAutoConfiguration {


    @Bean
    @ConditionalOnMissingBean
    public MetaDaoDataAccessProxy localDataAccessProxy() {
        return new MetaDaoDataAccessProxy();
    }

    /**
     * 修复编码规则检查重复不正确的问题
     *
     * @return
     */
    @Bean
    public UnfiedBeanFactory metaBeanFactory() {
        UnfiedBeanFactory unfiedBeanFactory = new UnfiedBeanFactory();
        unfiedBeanFactory.setConfigLocation("classpath:imeta-config.properties");
        return unfiedBeanFactory;
    }

    @Bean
    public ModelManager modelManager() {
        return new ModelManager();
    }

    @Bean
    @ConditionalOnMissingBean
    public IdManager idManager(UnfiedBeanFactory factory, MetaDaoDataAccessProxy proxy) {
        factory.setLocalDataAccessProxy(proxy);
        return new IdManager(1L, 1L);
    }

    @Bean
    @ConditionalOnMissingBean
    public IRefEventAdapter refEventAdapter() {
        return new RefEventAdapterImpl();
    }

    /**
     * 升级到imeta-2.0.21, 兼容使用
     *
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    public UnifiedMetaProperties unifiedMetaProperties() {
        return UnifiedMetaProperties.getInstance();
    }

}
